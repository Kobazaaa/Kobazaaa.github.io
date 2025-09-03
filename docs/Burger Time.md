---
layout: home

hero:
  name: Burger Time
  tagline: A remake of the classic game 'Burger Time' in my own, custom game engine 'Kobengine'.
  actions:
    - theme: alt
      text: View on GitHub
      link: https://github.com/Kobazaaa/BurgerTime
---

<div style="max-width: 1300px; margin: 0 auto; padding: 2rem;">

## Kobengine

This remake of *Burger Time* was entirely made in my custom 2D game engine [Kobengine](/Kobengine). The game has both Keyboard & Gamepad support, and features several different modes such as Single Player, Co-Op, and Versus Mode. You play across three different levels, racking up points for the leaderboard, until you run out of lives. When that happens, you're prompted to enter your high score (which is saved between sessions).

<div style="max-width: 100%; margin: 24px auto; text-align: center;">
  <img src="/images/BurgerTime/BurgerTime.png" alt="BurgerTime"
       style="border: 3px solid #42b983; border-radius: 15px; display: inline-block;" />
</div>
<div style="width: 90%; margin: auto;">
<ImageGrid :images="[
  { src: '/images/BurgerTime/Gameplay1.png', alt: 'Level1', caption: 'Early Level 01' },
  { src: '/images/BurgerTime/Gameplay2.png', alt: 'Level1', caption: 'Mid Level 01' },
  { src: '/images/BurgerTime/Gameplay3.png', alt: 'Level2', caption: 'Early Level 02' },
]" />
</div>

</div>
