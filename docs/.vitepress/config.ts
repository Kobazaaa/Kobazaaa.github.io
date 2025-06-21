export default {
  lang: 'en-US',
  title: "Portfolio",
  description: "The portfolio of Kobe Dereyne - showcasing game development, graphics programming, and other projects.",

  themeConfig: {
    appearance: 'dark',
    base: '/',
    logo: "",
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kobazaaa' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/kobe-dereyne-925ba02a3/' },
      { icon: 'youtube', link: 'https://github.com/kobazaaa' },
      {
        icon: {
          svg: `<span style="font-size: 1.5rem;">📧</span>`
        },
        link: 'mailto:kobe.dereyne@outlook.com'
      }
    ],
    nav: [
      { text: 'About Me', link: '/' },
      {
        text: 'Projects',
        items: [
          {
            text: 'Graphics',
            items: [
              { text: 'Pompeii', link: './projects/Pompeii.md' },
              { text: 'CPU Ray-Tracer', link: './projects/CPU Ray-Tracer.md' },
              { text: 'CPU Rasterizer', link: './projects/CPU Rasterizer.md' },
              { text: 'DirectX11 Rasterizer', link: './projects/DirectX11 Rasterizer.md' }
            ]
          },
          {
            text: 'Engine',
            items: [
              { text: 'Kobengine', link: './projects/Kobengine.md' },
              { text: 'Burger Time', link: './projects/Burger Time.md' }
            ]
          },
          {
            text: 'Other',
            items: [
              { text: 'Ribbit Rampage', link: 'https://vikkever.itch.io/ribbit-rampage' },
              { text: 'Kirby\'s Adventure Remake', link: './projects/Kirbys Adventure.md' },
            ]
          }
        ]
      },
      { text: 'Resume', link: './resume/Resume.md' }
    ],
    footer: {
      copyright: 'Copyright © 2025-present Kobe Dereyne'
    },
  }
}
