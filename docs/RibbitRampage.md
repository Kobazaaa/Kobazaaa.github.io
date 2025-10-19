---
layout: home

hero:
  name: 🐸 Ribbit Rampage
  tagline: ...is a chaotic co-op boss fighting game for two players.
  actions:
    - theme: alt
      text: View on Itch
      link: https://vikkever.itch.io/ribbit-rampage
---

<div style="max-width: 1300px; margin: 0 auto; padding: 2rem;">

## About
We were tasked to create a vertical slice of a fun game, starting from scratch. We came up with the great idea of frogs fighting a heron, getting insperation from various other games such as CupHead and Rayman Legends. After submission, this is the project we made!
<br><br>
We scored <u>**4th**</u> place in the "Idea" category and <u>**8th**</u> in the "Fun" category, out of 32 entries!
We also posted a DevLog each week over on our [Itch page](https://vikkever.itch.io/ribbit-rampage), which provides an in-depth look at our development cycle.


<div style="width: 90%; margin: 20px auto;">
<Carrousel :images="[
  'https://img.itch.zone/aW1hZ2UvMzMyNDI1My8yMTMzNjUyMC5qcGc=/original/J%2B9B6E.jpg',
  'https://img.itch.zone/aW1hZ2UvMzMyNDI1My8yMTMzNjUyNS5qcGc=/original/8g5Zq%2F.jpg',
  'https://img.itch.zone/aW1hZ2UvMzMyNDI1My8yMTMzNjUxOS5qcGc=/original/6dwrzE.jpg'
]" />
</div>

## Trailer

<div style="display: flex; justify-content: center; align-items: center; margin: 20px 0; ">
  <iframe width="840" height="475" src="https://www.youtube.com/embed/uCM72R7KH5s?si=C-n6YuH7JWJnIvyl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border-radius: 15px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);"></iframe>
</div>

## My Job

My responsibilities and contributions included:
<div class='vp-doc'>

- Unique attacks (Soundwave, Sonic Boom, Talon & Wing Attacks)
- UI implementation
- Game state screens (Main Menu, Game Over)
- Audio
- Polish such as platforms and lillypads moving in the wind
- Phase transitions
- ...
</div>

### Soundwave
The soundwave is the frog's base attack, used to damage and scare away the hungry heron. However, if you accidentally hit your teammate, it will push them around the arena, so aim carefully!

### Sonic Boom
The Sonic Boom is the frog’s powerful special attack. It’s triggered when two soundwaves collide, creating an explosive blast. This deals heavy damage to the heron, but also causes significant knockback.

### Talon Attack
The Talon Attack is one of the heron’s most dangerous abilities. The heron will extend one of its legs rapidly into the arena towards one of the frogs, in an attempt to catch it, before slowly retreating. If it caught you as bait, there's nothing you can do to save yourself... However your friend is still here to help out. If the other frog hits the heron enough times, it will drop its victim and rapidly retreat.

### Wing Attack
The Wing Attack is fast and hard to dodge. The heron sweeps its wings across the arena from the sides, aiming to hit a frog. You’ll need sharp reflexes to dodge this one.


## Our Team

<script setup>
import { VPTeamMembers } from 'vitepress/theme';
</script>

<VPTeamMembers size="small" :members="[
  {
    name: 'Twan Paemeleire',
    title: 'Programmer',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/twan-paemeleire/' },
    ]
  },
  {
    name: 'Kobe Dereyne',
    title: 'Programmer',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/kobe-dereyne-925ba02a3/' },
    ]
  },
  {
    name: 'Viktor Cloes',
    title: 'Programmer',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/viktor-cloes-81587334b/'},
    ]
  },
  {
    name: 'Eleonora Ciccarelli',
    title: 'Artist',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/eleonora-ciccarelli/' },
    ]
  },
  {
    name: 'Paula Szklarz',
    title: 'Artist',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/paula-szklarz/' },
    ]
  },
]" />

</div>
