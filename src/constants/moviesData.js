export const MOVIES_CATEGORIES = [
    { id: 'DISCOVER', label: 'DISCOVER' },
    { id: 'MOVIES', label: 'MOVIES' },
    { id: 'SERIES', label: 'SERIES' },
    { id: 'KIDS', label: 'KIDS' }
  ];
  
  export const GENRE_FILTERS = [
    { id: 'all', label: 'ALL MOVIES', icon: 'film' },
    { id: 'comedy', label: 'COMEDY', icon: 'smile' },
    { id: 'action', label: 'ACTION', icon: 'zap' },
    { id: 'romance', label: 'ROMANCE', icon: 'heart' },
    { id: 'thriller', label: 'THRILLER', icon: 'alert-triangle' },
    { id: 'family', label: 'FAMILY', icon: 'users' },
    { id: 'drama', label: 'DRAMA', icon: 'theater-mask' },
    { id: 'scifi', label: 'SCI-FI', icon: 'rocket' }
  ];
  
  export const FEATURED_MOVIES = [
    {
      id: 'wicked',
      title: 'Wicked',
      thumbnail: 'bg-green-800',
      description: 'Misunderstood because of her green skin, a young woman named Elphaba forges an unlikely but profound friendship with Glinda, a student with an unflinching desire for popularity.',
      year: 2025,
      duration: '150 min',
      genre: ['Fantasy', 'Musical'],
      rating: 'PG-13'
    },
    {
      id: 'spiderman',
      title: 'Spider-Man: Across The Spider-Verse',
      thumbnail: 'bg-red-700',
      description: 'Miles Morales returns for the next chapter of the Spider-Verse saga, a journey across the Multiverse where he encounters others who protect their universe from various threats.',
      year: 2023,
      duration: '140 min',
      genre: ['Animation', 'Action', 'Adventure'],
      rating: 'PG'
    },
    {
      id: 'renfield',
      title: 'Renfield',
      thumbnail: 'bg-purple-900',
      description: 'Renfield, the tortured aide to his narcissistic boss, Dracula, is forced to find new meaning in life when he falls for a traffic cop named Rebecca Quincy.',
      year: 2023,
      duration: '93 min',
      genre: ['Horror', 'Comedy'],
      rating: 'R'
    }
  ];
  
  export const MOVIE_CATEGORIES = [
    {
      title: 'New',
      items: [
        {
          id: 'm1',
          title: 'Verliebt auf Island',
          thumbnail: 'bg-blue-800',
          year: 2025,
          duration: '95 min',
          genre: ['Romance', 'Drama']
        },
        {
          id: 'm2',
          title: 'Last and First Men',
          thumbnail: 'bg-gray-800',
          year: 2024,
          duration: '110 min',
          genre: ['Sci-Fi', 'Documentary']
        },
        {
          id: 'm3',
          title: 'The First Purge',
          thumbnail: 'bg-red-900',
          year: 2024,
          duration: '105 min',
          genre: ['Horror', 'Thriller']
        },
        {
          id: 'm4',
          title: 'Amsel im Bromberstrauch',
          thumbnail: 'bg-green-700',
          year: 2025,
          duration: '117 min',
          genre: ['Drama']
        }
      ]
    },
    {
      title: 'Popular Movies',
      items: [
        {
          id: 'm5',
          title: 'Venom 3',
          thumbnail: 'bg-black',
          year: 2024,
          duration: '120 min',
          genre: ['Action', 'Sci-Fi']
        },
        {
          id: 'm6',
          title: 'The Blacklist',
          thumbnail: 'bg-red-800',
          year: 2023,
          duration: '133 min',
          genre: ['Thriller', 'Crime']
        },
        {
          id: 'm7',
          title: 'Quantumania',
          thumbnail: 'bg-purple-800',
          year: 2023,
          duration: '125 min',
          genre: ['Action', 'Adventure', 'Sci-Fi']
        },
        {
          id: 'm8',
          title: 'Spirit in the Blue',
          thumbnail: 'bg-blue-900',
          year: 2024,
          duration: '115 min',
          genre: ['Drama', 'Fantasy']
        }
      ]
    }
  ];
  
  export const SERIES_CATEGORIES = [
    {
      title: 'All Series',
      items: [
        {
          id: 's1',
          title: 'Gute Zeiten, schlechte Zeiten',
          thumbnail: 'bg-pink-800',
          seasons: 15,
          episodes: 254,
          genre: ['Soap', 'Drama']
        },
        {
          id: 's2',
          title: 'Behringer und die Toten',
          thumbnail: 'bg-gray-700',
          seasons: 3,
          episodes: 18,
          genre: ['Crime', 'Mystery']
        },
        {
          id: 's3',
          title: 'Promis unter Palmen',
          thumbnail: 'bg-green-600',
          seasons: 4,
          episodes: 32,
          genre: ['Reality', 'Entertainment']
        },
        {
          id: 's4',
          title: 'Wendland',
          thumbnail: 'bg-blue-700',
          seasons: 2,
          episodes: 14,
          genre: ['Crime', 'Drama']
        }
      ]
    },
    {
      title: 'Sitcoms',
      items: [
        {
          id: 's5',
          title: 'Two and a Half Men',
          thumbnail: 'bg-gray-900',
          seasons: 12,
          episodes: 262,
          genre: ['Comedy']
        },
        {
          id: 's6',
          title: 'The Big Bang Theory',
          thumbnail: 'bg-blue-600',
          seasons: 12,
          episodes: 279,
          genre: ['Comedy']
        },
        {
          id: 's7',
          title: 'Young Sheldon',
          thumbnail: 'bg-amber-800',
          seasons: 7,
          episodes: 120,
          genre: ['Comedy', 'Drama']
        },
        {
          id: 's8',
          title: 'King of Queens',
          thumbnail: 'bg-yellow-600',
          seasons: 9,
          episodes: 207,
          genre: ['Comedy']
        }
      ]
    }
  ];