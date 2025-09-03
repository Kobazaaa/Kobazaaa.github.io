---
layout: home

hero:
  name: Unity Prototype Game
  tagline: An endless survival horror game with the goal to kill as many alien offspring as possible.
---

<div style="max-width: 1300px; margin: 0 auto; padding: 2rem;">

## Gameplay Footage

<div style="max-width: 75%; margin: 24px auto; ">
<div style="padding:56.25% 0 0 0;position:relative;">
  <iframe src="https://www.youtube.com/embed/jOZMBzucyY8" frameborder="0" allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="border: 3px solid #42b883; border-radius: 15px; position:absolute;top:0;left:0;width:100%;height:100%;" title="gameplay footage prototype" referrerpolicy="strict-origin-when-cross-origin"></iframe>
</div>
</div>

## Screenshots

<div style="width: 90%; margin: 20px auto;">
<Carrousel :images="[
  '/images/EndlessPrototype/image1.png',
  '/images/EndlessPrototype/image2.png',
  '/images/EndlessPrototype/image3.png',
  '/images/EndlessPrototype/image4.png',
  '/images/EndlessPrototype/image5.png',
]" />
</div>

## Enemies

<div class="vp-doc">
The prototype features **six distinct enemy types**:

- **Basic Enemy**  
  This is the most common enemy, a pink-ish, three-eyed alien. It simply chases the player and deals damage upon contact.

- **Bomber**  
  The second enemy introduced. It has red skin and carries a bomb, clearly signaling to the player that it can explode on impact.

- **Speedster**  
  A smaller, faster variant of the basic enemy. It’s colored blue and leaves a visual trail behind to emphasize its speed.

- **Immune Enemy**  
These green enemies are immune to bullets, forcing the player to get up close and use their crowbar to defeat them.

- **Brute**  
  A large, brown alien with horns. Brutes are tougher than other enemies, with higher health and increased damage output.

- **Hallucinatory Alien**  
  This alien isn't real, it's a product of the player’s deteriorating sanity. It has a small chance of appearing when the player's sanity is high, but becomes more frequent as sanity decreases. It doesn’t deal any damage, but will chase the player, acting as a nuisance and a warning sign that it might be time to look for sanity pills.
  
</div>

## Player Feedback

Player feedback is crucial! The prototype uses visual and audio cues to ensure players immediately understand what’s happening. Each enemy type is designed to be instantly recognizable, allowing players to react appropriately based on color, size, behavior, and sound.
<br><br>
Thanks to numerous playtesting sessions with a variety of players, I was able to identify several areas of improvement in the prototype. These sessions provided valuable feedback on everything from core mechanics to enemy behavior, player clarity, and difficulty balance. Some players pointed out confusing elements, while others helped uncover bugs or edge cases I hadn’t noticed. Based on this feedback, I made several adjustments, including clearer visual cues, better feedback for taking damage, and more intuitive enemy designs.

</div>
