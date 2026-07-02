---
layout: home

hero:
  name: PPGA Game Project
  tagline: A 2D game made without any vector or matrix math, but rather only Plane Perspective Geometric Algebra (PPGA).
  actions:
    - theme: alt
      text: View on GitHub
      link: https://github.com/Kobazaaa/GEOA_ExamAssignment_PPGA_ArcaderGame
---

<div class="page-wrapper">

## Goals
The goal of the project was to make a simple 2D arcader game using only PPGA math, and incorporating the special features it has into the gameplay.
In the game you play as a bear with a turret on it's back, trying to catch spiky fish to eat. The bear can move in 3 ways.

### Translation
Thank to PPGA's unique way of translating objects, we can translate the bear in a straight line for linear movement.

### Rotation
PPGA also allows for an easy to use rotation, which the bear's second way of movement. Rotating with the bear will also rotate the turret on it's back in a different direction.

### Teleportation
The portals can be moved around by the player. If the bear enter one of the portals it will get spit out of the other portal. This is done with PPGA's point reflection abilities. This of course costs some extra energy to counteract abusing it.

<div style="width: 90%; margin: 24px auto;">
<img src="/images/PPGAGame/Gameplay.png"
     class="framed-image"
     style="box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25); transition: transform 0.2s ease;"/>
</div>

## PPGA Report
In this report I wrote for this project, I highlight 3 unique ways of how I use PPGA's unique abilities in my project.

<div style="max-width: 950px; margin: 0 auto; padding: 2rem; text-align: center;">
  <iframe 
    src="documents/PPGAReport.pdf" 
    width="100%" 
    height="1200px" 
    style="border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
  </iframe>
</div>

</div>
