export default {
  theme: '@vitepress/theme-default',
  lang: 'en-US',
  title: "Kobe Dereyne",
  titleTemplate: false,
  description: "The portfolio page of Kobe Dereyne, showcasing game development, graphics programming, and other projects.",
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/logo-dark.png' }],
  ],

  themeConfig: {
    appearance: 'dark',
    base: '/',
    logo: { dark: './images/logo-dark.png', light: './images/logo-light.png' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kobazaaa' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/kobe-dereyne-925ba02a3/' },
      { icon: 'youtube', link: 'https://github.com/kobazaaa' },
      {
        icon: {
          svg: `<span style="font-size: 1.25rem;">✉️</span>`
        },
        link: 'mailto:kobe.dereyne@outlook.com'
      }
    ],
    nav: [
      { text: 'About Me', link: '/' },
      {
        text: 'All Projects',
        items: [
          {
            text: 'Graphics',
            items: [
              { text: 'Pompeii', link: './Pompeii.md' },
              { text: 'CPU Ray-Tracer', link: './CPU Ray-Tracer.md' },
              { text: 'CPU/GPU Rasterizer', link: './DualRasterizer.md' },
            ]
          },
          {
            text: 'Engine',
            items: [
              { text: 'Kobengine', link: './Kobengine.md' },
              { text: 'Burger Time', link: './Burger Time.md' }
            ]
          },
          {
            text: 'Games',
            items: [
              { text: 'Ribbit Rampage', link: './RibbitRampage.md' },
              { text: 'Endless Prototype', link: './EndlessPrototype.md' },
              { text: 'Kirby\'s Adventure Remake', link: './Kirbys Adventure.md' },
              { text: 'PPGA Math Game', link: './PPGAGame.md' },
            ]
          },
          {
            text: 'Art',
            items: [
              { text: 'Forest Loner Diorama', link: './ForestLonerDiorama.md' },
            ]
          },
        ]
      },
      { text: 'Resume', link: './Resume.md' }
    ],
    footer: {
      copyright: 'Copyright © 2025-present Kobe Dereyne'
    },
  }
}
