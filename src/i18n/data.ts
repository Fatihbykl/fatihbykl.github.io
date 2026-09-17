export interface GameItem {
  id: string;
  title: string;
  genre: string;
  releaseYear: string;
  description: string;
  tags: string[];
  image?: string;
  steamUrl?: string;
  itchUrl?: string;
  webglUrl?: string;
  featured?: boolean;
}

export interface ToolItem {
  id: string;
  name: string;
  subtitle?: string;
  version: string;
  unityVersion: string;
  category: string;
  description: string;
  features: string[];
  docUrl: string;
  image?: string;
  assetStoreUrl?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
}



export const games: GameItem[] = [
  {
    id: 'neon-drift',
    title: 'Neon Drift: Cyber Odyssey',
    genre: '3D Arcade / Sci-Fi Racer',
    releaseYear: '2024',
    description: 'High-speed anti-gravity racing across neon-drenched cyberpunk tracks. Engineered with custom raycast suspension physics and dynamic synthwave audio reactive systems.',
    tags: ['Unity 2022.3', '3D Physics', 'URP Post-Processing', 'New Input System'],
    steamUrl: 'https://store.steampowered.com',
    itchUrl: 'https://itch.io',
    webglUrl: 'https://itch.io',
    featured: true,
  },
  {
    id: 'chrono-pulse',
    title: 'Chrono Pulse: Time Rewind',
    genre: '2D Puzzle Platformer',
    releaseYear: '2023',
    description: 'Precision physics time-manipulation platformer. Replay your past movements as cooperative ghost clones using deterministic state recording with zero GC allocations.',
    tags: ['Custom 2D Controller', 'Time Travel Physics', 'Pixel Art', 'Audio Reactive'],
    steamUrl: 'https://store.steampowered.com',
    itchUrl: 'https://itch.io',
    webglUrl: 'https://itch.io',
    featured: true,
  },
  {
    id: 'quantum-core',
    title: 'Quantum Core Breach',
    genre: 'Top-Down Sci-Fi Roguelite',
    releaseYear: '2023',
    description: 'Fast-paced survival combat inside procedurally generated derelict space stations. Features modular weapon component crafting and high-density particle FX.',
    tags: ['Procedural Dungeon', 'Object Pooling', '2D Lighting', 'Steam Achievements'],
    steamUrl: 'https://store.steampowered.com',
    itchUrl: 'https://itch.io',
    webglUrl: '',
    featured: false,
  },
  {
    id: 'kinetic-mayhem',
    title: 'Kinetic Mayhem: Ragdoll Arena',
    genre: 'Physics Party Brawler',
    releaseYear: '2022',
    description: 'Fully physics-driven brawler featuring active ragdoll fighters, emergent environmental destruction, and local/online multiplayer support.',
    tags: ['Active Ragdolls', 'Netcode for GameObjects', 'Physics Simulation'],
    itchUrl: 'https://itch.io',
    webglUrl: 'https://itch.io',
    featured: false,
  },
];

export const tools: ToolItem[] = [
  {
    id: 'tensio',
    name: 'Tensio: Advanced Rope Physics',
    version: 'v1.0.0',
    unityVersion: 'Unity 2022.3+',
    category: 'Physics & Dynamics',
    description: 'High-performance, physically accurate rope and chain simulation for Unity. Powered by the Jobs System and Burst Compiler, Tensio delivers stable XPBD physics and procedural rendering.',
    features: [
      "Advanced XPBD Physics: Smooth motion interpolation, isometric bending resistance, fictitious mass scaling to prevent unnatural stretch under heavy loads, and realistic two-way Rigidbody coupling.",
      "Workflow & Editor Tools: Smart debris cleanup for severed ropes, native Unity Splines integration, 1-click static mesh baking for environment dressing, and jitter-free zero-pop initialization.",
      "Runtime Control & API: Real-time dynamic slicing, explosive force application, interactive winching/length adjustment, and dynamic weight attachment.",
      "Procedural Rendering & Collisions: Stress-reactive braided geometry, dynamic rope thinning and color shifts, aerodynamic wind handling, and reliable self/inter-rope collision support.",
      "Dynamic 3D Spatial Audio: Tension-modulated creaks and snaps paired with 3D audio sources that slide along cables to track the player's listener in real time."
    ],
    docUrl: '/docs/tensio/',
    image: '/images/tools/tensio.png',
    assetStoreUrl: 'https://assetstore.unity.com/packages/slug/358842',
    isFeatured: true,
    isPublished: true,
  },
  {
    id: 'fuzzyide',
    name: 'FuzzyIDE: Integrated Code & Terminal Environment',
    version: 'v1.0.0',
    unityVersion: 'Unity 6+',
    category: 'Editor Tools',
    description: 'A premium C# editor for Unity 6. Edit scripts, track live variables, run tools in the built-in CLI terminal, and navigate 10k+ line files with zero lag using our UI Toolkit Virtualization Engine.',
    features: [
      'Zero Context Switching: Read, analyze, and edit your C# scripts seamlessly as a dockable window inside Unity. Keep your eyes on the scene and your code at the same time.',
      'Live State Tracker (Visual Debugging): Say goodbye to console spam. Watch variable values change in real-time at 60FPS. FuzzyIDE injects tracking logic directly into the AST, displaying live values in a clean UI panel and right next to your code lines, all without massive GC allocations.',
      'Blazing Fast Virtualization: Opening a 10,000-line State Machine? No problem. Our custom UI Toolkit virtualization engine only renders what\'s visible on your screen. Enjoy buttery-smooth scrolling with zero lag or memory spikes.',
      'Integrated CLI Terminal: Execute command-line tools and background processes directly inside Unity. Our embedded terminal ensures you never have to open an external command prompt, keeping your workflow centralized.',
      'Integrated Minimap & Navigation: Navigate massive scripts instantly with an IDE-standard minimap. Jump exactly to where you need to be with a single click.',
      'Safe & Non-Destructive: Under the hood, FuzzyIDE uses C# Roslyn to ensure code injections (like the Live Watchers) are structurally safe. Removing a tracker safely rewrites the syntax tree, leaving your original code completely intact and beautifully formatted.'
    ],
    docUrl: '/docs/fuzzyide/',
    image: '/images/tools/fuzzyide.png',
    assetStoreUrl: 'https://assetstore.unity.com/packages/slug/395140',
    isFeatured: true,
    isPublished: true,
  },
  {
    id: 'fuzzysave',
    name: 'FuzzySave: Visual & Zero-Code Persistence',
    version: 'v1.0.0',
    unityVersion: 'Unity 2022.3+',
    category: 'Data Persistence',
    description: 'Zero-code, visual save system powered by Source Generators. Drag, drop, and persist your entire game state, scene transforms, and events without writing a single line of code.',
    features: [
      "Visual Save Studio: Intuitive hierarchy dashboard to visually map variables and scenes into logical Save Groups without manual boilerplate.",
      "Compile-Time Performance: Powered by C# source generators (Zero Reflection), ensuring maximum frame rates and zero garbage collection (GC) allocations.",
      "Event-Driven & Spatial Persistence: Auto-save via drag-and-drop Unity/C# events, with built-in GUID tracking for static objects and dynamically spawned prefabs.",
      "Production-Grade Security & Reliability: Crash-safe atomic writes, AES-256 encryption, HMAC checksum validation, automatic backups, and asynchronous background I/O.",
      "Editor Tooling & Broad Support: Includes no-code trigger/UI components, live Play Mode variable inspection/debugging, and out-of-the-box support for primitives, Unity structs, collections, ScriptableObjects, and asset references."
    ],
    docUrl: '/docs/fuzzysave/',
    image: '/images/tools/fuzzysave.png',
    assetStoreUrl: 'https://assetstore.unity.com/packages/slug/398110',
    isFeatured: true,
    isPublished: true,
  },
  {
    id: 'fuzzytypo',
    name: 'FuzzyTypo: Central Typography & Text Style Manager for TextMeshPro',
    version: 'v1.0.0',
    unityVersion: 'Unity 2022.3+',
    category: 'Text & Typography',
    description: 'Manage your TextMeshPro objects with a centralized design system. Automate your UI workflow completely with style definition, live synchronization, theme engine, and auto-integration.',
    features: [
      "Centralized Style Presets: Define unlimited text presets (Fonts, Sizes, Colors, Spacing, Alignment) via ScriptableObjects managed through a single UI Toolkit dashboard.",
      "High Performance & Zero GC: Operates with zero Update overhead, featuring a 'Bake & Strip' mode that burns styles directly into assets and removes runtime script references for build optimization.",
      "Automated Migration & Localization Tools: Smart auto-migrator scans and maps existing TMP objects into your design system, while the Missing Glyph Analyzer prevents missing-character square boxes across font atlases.",
      "Runtime Theme Engine: Seamlessly toggle between Light, Dark, or custom accessibility themes with a single line of C# code.",
      "Workflow & Prefab Safety: Offers live multi-scene synchronization, granular property overrides, batch TMP material swaps, and native support for nested prefabs and variants."
    ],
    docUrl: '/docs/fuzzytypo/',
    image: '/images/tools/fuzzytypo.png',
    assetStoreUrl: 'https://assetstore.unity.com/packages/slug/404698',
    isFeatured: false,
    isPublished: false,
  },

];

export function getGames(): GameItem[] {
  return games;
}

export function getFeaturedGames(): GameItem[] {
  return games.filter(g => g.featured);
}

export function getTools(): ToolItem[] {
  return tools;
}

export function getFeaturedTools(): ToolItem[] {
  return tools.filter(t => t.isFeatured);
}

export interface ContactLinks {
  personal: {
    name: string;
    email: string;
    linkedin: string;
    github: string;
    itchio: string;
  };
  publisher: {
    name: string;
    supportEmail: string;
    discord: string;
    assetStore: string;
  };
  ecosystem: Array<{
    label: string;
    url: string;
  }>;
  navigation: Array<{
    label: string;
    href: string;
  }>;
}

export const contactLinks: ContactLinks = {
  personal: {
    name: 'Fatih Baykal',
    email: 'fatih.baykal54@hotmail.com',
    linkedin: 'https://www.linkedin.com/in/mfbaykal/',
    github: 'https://github.com/Fatihbykl',
    itchio: 'https://fuzzzzy.itch.io/',
  },
  publisher: {
    name: 'Fuzzy Logic Labs',
    supportEmail: 'devbayk@gmail.com',
    discord: 'https://discord.gg/CGpunqn49e',
    assetStore: 'https://assetstore.unity.com/publishers/134738',
  },
  ecosystem: [
    { label: 'Unity Asset Store', url: 'https://assetstore.unity.com/publishers/134738' },
    { label: 'Itch.io', url: 'https://fuzzzzy.itch.io/' },
    { label: 'GitHub', url: 'https://github.com/Fatihbykl' },
  ],
  navigation: [
    { label: 'About Publisher', href: '/' },
    { label: 'Fuzzy Logic Labs', href: '/publisher' },
  ],
};

