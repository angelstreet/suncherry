Adding Supabase for authentication, database, and storage capabilities will enhance your SunriseTV application. Here's how to incorporate Supabase into your project structure:

# SunriseTV App Structure with Supabase Integration

```
src/
├── lib/
│   └── supabase/                # Supabase client configuration
│       ├── client.ts            # Main Supabase client
│       ├── auth.ts              # Auth-specific methods
│       ├── storage.ts           # Storage-specific methods
│       └── db.ts                # Database-specific methods
│
├── hooks/
│   ├── useAuth.ts               # Authentication hooks
│   ├── useProfile.ts            # User profile data hooks
│   ├── useContent.ts            # Content fetching hooks
│   ├── useStorage.ts            # File storage hooks
│   └── ...
│
├── context/
│   ├── AuthContext.tsx          # Authentication context
│   └── ...
│
├── types/
│   ├── database.ts              # Database schema types
│   ├── auth.ts                  # Auth-related types
│   └── ...
│
├── services/
│   ├── contentService.ts        # Content APIs using Supabase
│   ├── profileService.ts        # User profile APIs
│   ├── watchlistService.ts      # Watchlist APIs
│   ├── recordingService.ts      # Recording APIs
│   ├── historyService.ts        # Viewing history APIs  
│   └── ...
│
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── ForgotPassword.tsx
│   │   └── ResetPassword.tsx
│   └── ...
│
├── components/
│   ├── auth/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── PasswordResetForm/
│   │   └── SocialLogin/
│   └── ...
```

## Implementation Details:

### 1. Supabase Client Setup

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### 2. Authentication Context

```typescript
// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase/client';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get session from Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signIn = (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  };

  const signOut = () => {
    return supabase.auth.signOut();
  };

  const resetPassword = (email: string) => {
    return supabase.auth.resetPasswordForEmail(email);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        loading, 
        signIn, 
        signUp, 
        signOut, 
        resetPassword 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 3. Content Service with Supabase

```typescript
// services/contentService.ts
import { supabase } from '../lib/supabase/client';
import { ContentType, Content } from '../types/content';

export const contentService = {
  getHomeContent: async () => {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .order('featured', { ascending: false })
      .limit(10);
      
    if (error) throw error;
    return data;
  },
  
  getContentByType: async (type: ContentType) => {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },
  
  getContentById: async (id: string) => {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  searchContent: async (query: string) => {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .textSearch('title', query);
      
    if (error) throw error;
    return data;
  }
};
```

### 4. User Profile and Preferences

```typescript
// services/profileService.ts
import { supabase } from '../lib/supabase/client';
import { Profile, UserPreferences } from '../types/auth';

export const profileService = {
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data as Profile;
  },
  
  updateProfile: async (userId: string, updates: Partial<Profile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
      
    if (error) throw error;
    return data;
  },
  
  getUserPreferences: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) throw error;
    return data as UserPreferences;
  },
  
  updateUserPreferences: async (userId: string, preferences: Partial<UserPreferences>) => {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({ 
        user_id: userId,
        ...preferences
      });
      
    if (error) throw error;
    return data;
  }
};
```

### 5. Storage Management

```typescript
// services/storageService.ts
import { supabase } from '../lib/supabase/client';

export const storageService = {
  uploadAvatar: async (userId: string, file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-avatar.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });
      
    if (error) throw error;
    return data;
  },
  
  getAvatarUrl: (userId: string, fileName: string) => {
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
      
    return data.publicUrl;
  },
  
  // For storing user-generated content like comments/reviews
  uploadContentAsset: async (contentId: string, file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${contentId}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('content-assets')
      .upload(fileName, file);
      
    if (error) throw error;
    return data;
  }
};
```

### 6. Watchlist and Viewing History

```typescript
// services/watchlistService.ts
import { supabase } from '../lib/supabase/client';
import { WatchlistItem } from '../types/watchlist';

export const watchlistService = {
  getWatchlist: async (userId: string) => {
    const { data, error } = await supabase
      .from('watchlist')
      .select(`
        *,
        content:content_id(*)
      `)
      .eq('user_id', userId);
      
    if (error) throw error;
    return data;
  },
  
  addToWatchlist: async (userId: string, contentId: string) => {
    const { data, error } = await supabase
      .from('watchlist')
      .insert({ 
        user_id: userId, 
        content_id: contentId,
        added_at: new Date().toISOString()
      });
      
    if (error) throw error;
    return data;
  },
  
  removeFromWatchlist: async (userId: string, contentId: string) => {
    const { data, error } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', userId)
      .eq('content_id', contentId);
      
    if (error) throw error;
    return data;
  }
};

// services/historyService.ts
import { supabase } from '../lib/supabase/client';

export const historyService = {
  getViewingHistory: async (userId: string) => {
    const { data, error } = await supabase
      .from('viewing_history')
      .select(`
        *,
        content:content_id(*)
      `)
      .eq('user_id', userId)
      .order('watched_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },
  
  addToHistory: async (userId: string, contentId: string, progress: number) => {
    const { data, error } = await supabase
      .from('viewing_history')
      .upsert({ 
        user_id: userId, 
        content_id: contentId,
        progress,
        watched_at: new Date().toISOString()
      });
      
    if (error) throw error;
    return data;
  },
  
  clearHistory: async (userId: string) => {
    const { data, error } = await supabase
      .from('viewing_history')
      .delete()
      .eq('user_id', userId);
      
    if (error) throw error;
    return data;
  }
};
```

## Database Schema Design

When setting up your Supabase project, you'll need to define these tables:

1. **profiles** - User profiles
   - id (references auth.users.id)
   - username
   - avatar_url
   - created_at
   - updated_at

2. **user_preferences** - User app settings
   - id
   - user_id (references profiles.id)
   - theme ('dark', 'light')
   - language
   - parental_control_enabled
   - parental_control_pin

3. **content** - TV shows, movies, etc.
   - id
   - title
   - description
   - type ('movie', 'series', 'tv_show')
   - genre
   - release_date
   - duration
   - thumbnail_url
   - video_url
   - is_featured
   - age_restriction
   - created_at

4. **episodes** - For series
   - id
   - content_id (references content.id)
   - title
   - description
   - episode_number
   - season_number
   - duration
   - thumbnail_url
   - video_url
   - release_date

5. **watchlist** - User watchlist
   - id
   - user_id (references profiles.id)
   - content_id (references content.id)
   - added_at

6. **viewing_history** - User viewing history
   - id
   - user_id (references profiles.id)
   - content_id (references content.id)
   - progress (percentage watched)
   - watched_at

7. **recordings** - User recordings
   - id
   - user_id (references profiles.id)
   - content_id (references content.id)
   - recorded_at
   - status ('scheduled', 'recording', 'completed')
   - storage_path

## Implementing Authentication Flow

In your main application:

```typescript
// App.tsx
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
```

Protected routes:

```typescript
// routes/index.tsx
import { useAuth } from '../context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
// Other imports...

const AppRoutes = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      
      {/* Protected routes */}
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/watchlist" element={user ? <Watchlist /> : <Navigate to="/login" />} />
      {/* More routes... */}
    </Routes>
  );
};

export default AppRoutes;
```

This structure provides a solid foundation for building your SunriseTV application with Supabase. The authentication, database, and storage are tightly integrated, making it easy to implement features like user accounts, content browsing, watchlists, and viewing history.