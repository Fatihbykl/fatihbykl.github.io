export type Lang = 'en';

export const defaultLang: Lang = 'en';

export const languages = {
  en: 'English',
} as const;

export const ui = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.games': 'Games',
    'nav.tools': 'Tools',
    'nav.docs': 'Documentation',
    'nav.tag': 'GAME DEV',
    'nav.openDocs': 'Docs',

    // About Me (Top Section)
    'about.badge': 'Unity Game Developer & Tool Architect',
    'about.title': 'Hi, I am Fatih — Crafting Gameplay & Unity Tools',
    'about.p1': 'I am a passionate game programmer and Unity tool architect with a strong foundation in C# and modern engine architecture. I focus on creating tight, responsive gameplay mechanics where player input feels immediate and satisfying.',
    'about.p2': 'Beyond games, I specialize in Unity Editor tooling. I develop custom inspectors, hierarchy extensions, and memory-efficient runtime libraries designed to remove friction from the production pipeline and empower development teams.',
    'about.focusTitle': 'Core Focus & Stack:',
    'about.connectTitle': 'Connect & Socials:',
    'about.getInTouch': 'Get in Touch',
    'about.email': 'Email Me',

    // Showreel / Video
    'showreel.badge': 'Gameplay Showcase',
    'showreel.title': 'Showreel & Gameplay Highlights',
    'showreel.desc': 'A quick look at physics prototypes, custom player controllers, and visual systems built inside Unity.',
    'showreel.watchLabel': 'Watch Gameplay Trailer',

    // Games section
    'games.sectionTitle': 'Games',
    'games.sectionDesc': 'Indie game projects and experimental prototypes. Playable directly on Itch.io.',
    'games.playOnItch': 'Play on Itch.io',
    'games.year': 'Year',

    // Tools section
    'tools.sectionTitle': 'Unity Tools',
    'tools.sectionDesc': 'Asset Store packages and developer tools engineered for speed, clean organization, and Zero-GC efficiency.',
    'tools.docsBtn': 'Docs',
    'tools.assetStoreBtn': 'Asset Store',

    // Footer
    'footer.bio': 'Software engineer and Unity game developer building high-performance games and developer tooling.',
    'footer.navTitle': 'Navigation',
    'footer.ecoTitle': 'Ecosystem',
    'footer.rights': 'All rights reserved.',
    'footer.developedWith': 'Crafted with',
  },
} as const;

export type TranslationKey = keyof typeof ui['en'];

export function useTranslations(lang?: Lang) {
  return function t(key: TranslationKey): string {
    return ui.en[key] || key;
  };
}

export function getLocalizedPath(path: string, _targetLang?: Lang): string {
  let cleanPath = path.replace(/^\/tr(\/|$)/, '/');
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  return cleanPath;
}

