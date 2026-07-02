---
layout: home

hero:
  name: Kuisje Huisje
  tagline: ...is a gamified tool that helps psychologists map out the protective network of children who deal with domestic violence.
  actions:
    - theme: alt
      text: View on Itch
      link: https://ttritar.itch.io/kuisje-huisje
---

<div class="page-wrapper">

## About
Kuisje Huisje is a gamified tool that helps psychologists map out a child’s protective network. 
<br><br>
The game is intended to support psychologists working with children who have experienced domestic violence, offering a clearer and more efficient way to understand the child’s protective environment.

## Client
Developed within the Digital Arts & Entertainment (DAE) curriculum at Howest University of Applied Sciences, the project was created as a client assignment for Veilig Huis, part of the Flemish Department of Justice. 
<br><br>

## Trailer & Images

<div style="display: flex; justify-content: center; align-items: center; margin: 20px 0; ">
  <iframe width="840" height="475" src="https://www.youtube.com/embed/seeJ77kLk_k?si=7eSZ6suN34Gx8oki" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border-radius: 15px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);"></iframe>
</div>

<div style="width: 75%; margin: 20px auto;">
<Carrousel :images="[
  'https://img.itch.zone/aW1hZ2UvMzkxMzI0Ny8yNDU2MjQ4NC5qcGc=/original/oaDU6Z.jpg',
  'https://img.itch.zone/aW1hZ2UvMzkxMzI0Ny8yNDU2MjQ4NS5qcGc=/original/wBWgJ0.jpg',
  'https://img.itch.zone/aW1hZ2UvMzkxMzI0Ny8yNDU2MjQ4Ny5qcGc=/794x1000/TJpk9T.jpg',
  'https://img.itch.zone/aW1hZ2UvMzkxMzI0Ny8yNDU2MjQ4OC5qcGc=/794x1000/OMblWe.jpg',
  'https://img.itch.zone/aW1hZ2UvMzkxMzI0Ny8yNDU2MjQ4OS5qcGc=/794x1000/SNLnwT.jpg',  
]" />
</div>


## My Contributions

During development, I was responsible for designing and implementing several core gameplay systems and interactive features, including:

<ContributionsGrid :columns="3" :show-search="false" :show-sort="false" :items="[
  {
    title: 'World transition system + VFX',
    group: 'Systems',
    description: 'Built the transition pipeline and visual transition effects between worlds.'
  },
  {
    title: 'World switching gameplay flow',
    group: 'Gameplay',
    description: 'Designed how/when the player swaps worlds and how the flow stays readable.'
  },
  {
    title: 'NPC interactions + dialogue behaviour',
    group: 'Gameplay',
    description: 'Implemented interaction prompts and conversation behaviour.'
  },
  {
    title: 'Player action logging',
    group: 'Tools',
    description: 'Created a logging system to track gameplay events for analysis by the psychiatrist.'
  },
  {
    title: 'SFX + VFX integration',
    group: 'Polish',
    description: 'Hooked up sound and visual effects to gameplay events.'
  },
  {
    title: 'House cleaning mechanic',
    group: 'Gameplay',
    description: 'Developed the cleaning loop, interactions, and feedback.'
  },
  {
    title: 'Animated book page flip',
    group: 'UI',
    description: 'Implemented the page-flip animation used in the in-game book.'
  },
  {
    title: 'Item interaction + object behaviours',
    group: 'Systems',
    description: 'Built reusable interaction + behaviour logic for in-world objects.'
  },
  {
    title: 'Gift-giving mechanic',
    group: 'Gameplay',
    description: 'Designed and implemented the gift interaction loop.'
  },
  {
    title: 'Wizard onboarding / tutorial sequence',
    group: 'Gameplay',
    description: 'Developed tutorial onboarding with guided steps and feedback.'
  },
  {
    title: 'Core gameplay logic',
    group: 'Systems',
    description: 'Implemented key logic for NPC conversations, house assignments, and house-cleaning interactions.'
  },
  {
    title: 'Potion mechanic',
    group: 'Gameplay',
    description: 'Implemented potion interactions and their gameplay impact.'
  }
]" />

## Our Team

<script setup>
import { VPTeamMembers } from 'vitepress/theme';
</script>

<div style="width: 75%; margin: 20px auto;">
<VPTeamMembers size="small" :members="[
  {
    name: 'Colin Beerens',
    title: 'Programmer + Artist',
    avatar: 'https://unavatar.io/linkedin/colin-berens-1144942ba',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/colin-berens-1144942ba/' },
    ]
  },
  {
    name: 'Kobe Dereyne',
    title: 'Programmer',
    avatar: 'https://unavatar.io/linkedin/kobe-dereyne-925ba02a3',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/kobe-dereyne-925ba02a3/' },
    ]
  },
  {
    name: 'Thalia Tritar',
    title: 'Programmer',
    avatar: 'https://unavatar.io/linkedin/thalia-tritar',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/thalia-tritar/'},
    ]
  },
  {
    name: 'Sam Ferrari',
    title: 'Artist',
    avatar: 'https://unavatar.io/linkedin/sam-ferrari-04147517b',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/sam-ferrari-04147517b/' },
    ]
  },
  {
    name: 'Patrisija Purina',
    title: 'Artist',
    avatar: 'https://unavatar.io/linkedin/patrisija-purina-3bb7882ab',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/patrisija-purina-3bb7882ab/' },
    ]
  },
  {
    name: 'Nathan Dhaene',
    title: 'Artist',
    avatar: 'https://unavatar.io/linkedin/nathan-dhaene-68991724b',
    links: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/nathan-dhaene-68991724b/' },
    ]
  },
]" />

</div>
</div>
