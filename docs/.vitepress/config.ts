export default {
  lang: 'en-US',
  title: "Kobe Dereyne",
  description: "",

  themeConfig: {
    base: '/',
    appearance: false,
    logo: "",
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kobazaaa' },
      {
        icon: {
          svg: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" style="width: 1.2em; height: 1.2em;" />`
        },
        link: 'https://www.linkedin.com/in/kobe-dereyne-925ba02a3/'
      },
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
