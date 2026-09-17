import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: 'https://fatihbykl.github.io',
  integrations: [
    mermaid({
      autoTheme: true,
    }),
    starlight({
      title: 'Fuzzy Logic Labs — Docs',
      social: {
        github: 'https://github.com/fatihbykl',
      },
      components: {
        Sidebar: './src/components/StarlightSidebar.astro',
        Pagination: './src/components/StarlightPagination.astro',
      },
      sidebar: [
        {
          label: '← Back to Publisher',
          link: '/publisher',
        },
        {
          label: 'Tensio: Advanced Rope Physics',
          items: [
            {
              label: 'Welcome & Overview',
              link: '/docs/tensio/',
            },
            {
              label: 'Getting Started',
              items: [
                {
                  label: 'Installation & Dependencies',
                  link: '/docs/tensio/installation/',
                },
                {
                  label: 'Quick Start Guide',
                  link: '/docs/tensio/quick-start/',
                },
              ],
            },
            {
              label: 'Core Components',
              items: [
                {
                  label: 'Rope Controller',
                  link: '/docs/tensio/core-components/rope-controller/',
                },
                {
                  label: 'Rope Renderer',
                  link: '/docs/tensio/core-components/rope-renderer/',
                },
                {
                  label: 'Rope Chain Renderer',
                  link: '/docs/tensio/core-components/rope-chain-renderer/',
                },
                {
                  label: 'Interaction Tools (Winch & Cutter)',
                  link: '/docs/tensio/core-components/interaction-tools/',
                },
                {
                  label: 'Rope Audio',
                  link: '/docs/tensio/core-components/rope-audio/',
                },
              ],
            },
            {
              label: 'Editor Tools & Windows',
              items: [
                {
                  label: 'Bezier Point Window & Scene Toolbar',
                  link: '/docs/tensio/toolbars/bezier-point-window/',
                },
                {
                  label: 'Make Colliders Rope-Ready',
                  link: '/docs/tensio/toolbars/make-colliders-rope-ready/',
                },
              ],
            },
            {
              label: 'Advanced Systems',
              items: [
                {
                  label: 'Rendering Optimization & Batching',
                  link: '/docs/tensio/advanced/rendering-optimization/',
                },
                {
                  label: 'Collision Systems (World, Proxy, Inter-Rope)',
                  link: '/docs/tensio/advanced/collision-system/',
                },
                {
                  label: 'LOD System',
                  link: '/docs/tensio/advanced/lod-system/',
                },
                {
                  label: 'Case Study: Grappling Hook',
                  link: '/docs/tensio/advanced/grappling-hook/',
                },
              ],
            },
            {
              label: 'C# Scripting API Reference',
              link: '/docs/tensio/api-reference/',
            },
            {
              label: 'Frequently Asked Questions (FAQ)',
              link: '/docs/tensio/faq/',
            },
          ],
        },
        {
          label: 'FuzzyIDE: Integrated Code & Terminal Environment',
          items: [
            {
              label: 'Overview & Getting Started',
              link: '/docs/fuzzyide/',
            },
            {
              label: 'User Guide',
              items: [
                {
                  label: 'Toolbar & Core Navigation',
                  link: '/docs/fuzzyide/guide/toolbar/',
                },
                {
                  label: 'Editor Windows & Layout Docking',
                  link: '/docs/fuzzyide/guide/windows/',
                },
                {
                  label: 'Live Watch Tracker',
                  link: '/docs/fuzzyide/guide/live-watch/',
                },
                {
                  label: 'Integrated CLI Terminal',
                  link: '/docs/fuzzyide/guide/terminal/',
                },
                {
                  label: 'AI Assistant & Co-Pilot',
                  link: '/docs/fuzzyide/guide/ai-assistant/',
                },
                {
                  label: 'Smart Drag & Drop',
                  link: '/docs/fuzzyide/guide/drag-drop/',
                },
                {
                  label: 'Context Menu & Quick Actions',
                  link: '/docs/fuzzyide/guide/context-menu/',
                },
                {
                  label: 'IDE Preferences & Settings',
                  link: '/docs/fuzzyide/guide/settings/',
                },
                {
                  label: 'Keyboard Shortcuts',
                  link: '/docs/fuzzyide/guide/shortcuts/',
                },
              ],
            },
            {
              label: 'API & Architecture',
              items: [
                {
                  label: 'Core Classes & Architecture',
                  link: '/docs/fuzzyide/api/core-classes/',
                },
                {
                  label: 'LiveStateTracker API Reference',
                  link: '/docs/fuzzyide/api/live-state-tracker/',
                },
              ],
            },
          ],
        },
        {
          label: 'FuzzySave: Visual & Zero-Code Persistence',
          items: [
            {
              label: 'Overview & Quick Start',
              link: '/docs/fuzzysave/',
            },
            {
              label: 'Architecture & Core Pipeline',
              items: [
                {
                  label: '01. Architecture & Philosophy',
                  link: '/docs/fuzzysave/architecture-overview/',
                },
                {
                  label: '02. Async Pipeline & Zero-Hitch',
                  link: '/docs/fuzzysave/async-pipeline/',
                },
                {
                  label: '03. Storage, Security & Integrity',
                  link: '/docs/fuzzysave/storage-and-security/',
                },
              ],
            },
            {
              label: 'Visual Editor Suite',
              items: [
                {
                  label: '04. Visual Save Studio',
                  link: '/docs/fuzzysave/visual-save-studio/',
                },
                {
                  label: '05. Play Mode Live Debugger',
                  link: '/docs/fuzzysave/live-debugger/',
                },
              ],
            },
            {
              label: 'Core Systems & Persistence',
              items: [
                {
                  label: '06. Scene Tracking & Graveyard',
                  link: '/docs/fuzzysave/scene-tracking/',
                },
                {
                  label: '07. No-Code Runtime Components',
                  link: '/docs/fuzzysave/nocode-components/',
                },
                {
                  label: '08. Slot Metadata & Thumbnails',
                  link: '/docs/fuzzysave/slot-metadata/',
                },
                {
                  label: '09. Cloud Synchronization',
                  link: '/docs/fuzzysave/cloud-sync/',
                },
                {
                  label: '10. Schema Migrations & Versioning',
                  link: '/docs/fuzzysave/schema-migrations/',
                },
                {
                  label: '11. Attributes & Code-First',
                  link: '/docs/fuzzysave/attributes/',
                },
                {
                  label: 'DTOs & Zero-Allocation Structs',
                  link: '/docs/fuzzysave/dto-serialization/',
                },
              ],
            },
            {
              label: 'Samples & API Reference',
              items: [
                {
                  label: '12. Samples & Benchmark Suite',
                  link: '/docs/fuzzysave/tutorials/',
                },
                {
                  label: '13. C# Scripting API Reference',
                  link: '/docs/fuzzysave/api-reference/',
                },
              ],
            },
          ],
        },
        {
          label: 'FuzzyTypo: Centralized Text & Theme Management',
          items: [
            {
              label: 'Overview & Quick Start',
              link: '/docs/fuzzytypo/',
            },
            {
              label: 'C# API Reference',
              link: '/docs/fuzzytypo/api-reference/',
            },
          ],
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});

