// Sample content data for detail views
export const SAMPLE_CONTENT_DETAILS = {
    movie: {
      id: "emmanuelle-2024",
      title: "Emmanuelle",
      type: "movie",
      color: "bg-amber-900",
      year: 2024,
      runtime: 104, // 1h 44min
      rating: "18+",
      genre: ["Drama", "Film"],
      description: "Die junge Emmanuelle begibt sich auf eine Geschäftsreise nach Hongkong, wo sie unerwartet ihre Lust und Sinnlichkeit neu entdeckt. Die Begegnung mit dem geheimnisvollen Kei lässt sie in eine Welt voller erotischer Fantasien eintauchen.",
      language: "DE",
      subtitles: "DE",
      type: "rental",
      price: "6.90",
      cast: [
        { name: "Naomi Watts", role: "Emmanuelle" },
        { name: "Will Sharpe", role: "Kei" },
        { name: "Jamie Campbell Bower", role: "Henri" },
        { name: "Chacha Huang", role: "Mei" },
        { name: "Anthony Chau-Sang Wong", role: "Manager" }
      ],
      similar: [
        { title: "Fifty Shades of Grey", color: "bg-gray-800", price: "3.50" },
        { title: "Freunde mit gewissen Vorzügen", color: "bg-blue-800", price: "3.50" },
        { title: "Call Me by Your Name", color: "bg-blue-600", price: "4.50" },
        { title: "Anora", color: "bg-pink-700", price: "7.90" },
        { title: "Back to Black", color: "bg-black", price: "3.50" },
        { title: "Jane Austen's Emma", color: "bg-yellow-700", price: "4.50" }
      ]
    },
    
    tvShow: {
      id: "tagesschau-20250318",
      title: "Tagesschau",
      type: "tvShow",
      color: "bg-red-900",
      year: 2025,
      runtime: 30,
      genre: "News",
      description: "In dieser Sendung werden aktuelle Ereignisse aus der Schweiz und der Welt präsentiert.",
      language: "DE",
      subtitles: "DE",
      channel: "SRF 1",
      availableUntil: "25 Mar 2025, 19:30",
      availableOnTV: true,
      cast: [],
      similar: []
    },
    
    series: {
      id: "blacklist-s01e01",
      title: "The Blacklist",
      type: "series",
      color: "bg-red-800",
      season: 1,
      episode: 1,
      year: 2023,
      runtime: 45,
      rating: "16+",
      genre: ["Crime", "Drama", "Thriller"],
      description: "Raymond 'Red' Reddington, einer der meistgesuchten Flüchtigen des FBI, stellt sich in Washington D.C. der Behörde. Er behauptet, dass er und das FBI die gleichen Interessen haben: Er will gefährliche Kriminelle und Terroristen ausschalten. Reddington kooperiert jedoch nur unter einer Bedingung: Er spricht ausschließlich mit Elizabeth Keen, einer jungen FBI-Profilerin.",
      language: "DE",
      subtitles: "DE",
      availableUntil: "15 Apr 2025",
      seasons: 10,
      totalEpisodes: 218,
      cast: [
        { name: "James Spader", role: "Raymond Reddington" },
        { name: "Megan Boone", role: "Elizabeth Keen" },
        { name: "Diego Klattenhoff", role: "Donald Ressler" },
        { name: "Harry Lennix", role: "Harold Cooper" },
        { name: "Hisham Tawfiq", role: "Dembe Zuma" }
      ],
      similar: [
        { title: "Blindspot", color: "bg-blue-900", season: 1 },
        { title: "The Americans", color: "bg-red-700", season: 1 },
        { title: "Homeland", color: "bg-yellow-800", season: 1 },
        { title: "Criminal Minds", color: "bg-gray-800", season: 1 },
        { title: "24", color: "bg-orange-800", season: 1 },
        { title: "Bosch", color: "bg-gray-700", season: 1 }
      ],
      episodes: [
        { number: 1, title: "Pilot", duration: 45 },
        { number: 2, title: "The Freelancer", duration: 43 },
        { number: 3, title: "Wujing", duration: 42 },
        { number: 4, title: "The Stewmaker", duration: 44 },
        { number: 5, title: "The Courier", duration: 43 }
      ]
    },
    
    replay: {
      id: "kassensturz-20250318",
      title: "Kassensturz",
      type: "replay",
      color: "bg-blue-800",
      year: 2025,
      runtime: 40,
      genre: "Consumer, Business, Finance",
      description: "Ahnungslose Opfer erhalten Rechnungen für Waren, die sie nie bestellt haben. Fremde haben unter ihrem Namen Ware bestellt. Wie kann man sich dagegen schützen? Ausserdem wird über den Ärger bei der Mehrwertsteuer-Rückerstattung berichtet.",
      language: "DE",
      subtitles: "DE",
      channel: "SRF 1",
      aired: "Tue 18 Mar, 21:00",
      availableUntil: "25 Mar 2025, 21:00",
      availableOnTV: true,
      cast: [],
      similar: []
    }
  };
  
  // Helper function to get content details based on type
  export const getContentById = (contentId) => {
    // In a real application, you'd fetch this from an API
    // For our mockup, we'll just return a sample content item
    const allContent = Object.values(SAMPLE_CONTENT_DETAILS);
    const content = allContent.find(item => item.id === contentId);
    
    return content || SAMPLE_CONTENT_DETAILS.movie; // Default to movie if not found
  };
  
  // Content for the home page featured section
  export const FEATURED_CONTENT = [
    {
      id: "wicked-2024",
      title: "Wicked",
      description: "Misunderstood because of her green skin, a young woman named Elphaba forges an unlikely but profound friendship with Glinda, a student with an unflinching desire for popularity.",
      color: "bg-green-800",
      type: "movie"
    },
    {
      id: "venom3-2024",
      title: "Venom 3",
      description: "Eddie Brock and Venom find themselves on the run from both alien and human enemies as they try to build a new life.",
      color: "bg-purple-900",
      type: "movie"
    },
    {
      id: "tagesschau-20250320",
      title: "Tagesschau",
      description: "Die wichtigsten Meldungen des Tages aus der Schweiz und der Welt.",
      color: "bg-red-800",
      type: "replay"
    }
  ];