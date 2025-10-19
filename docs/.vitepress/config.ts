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
      { icon: 'youtube', link: 'https://youtube.com/@kobe1545?si=Esrpws7TEge4U6Zh' },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
	<path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z" />
</svg>`
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
