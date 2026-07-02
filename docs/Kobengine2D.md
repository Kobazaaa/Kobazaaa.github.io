---
layout: home

hero:
  name: Kobengine2D
  tagline: ... is a small, custom, 2D Game-Engine made from scratch in C++!
  actions:
    - theme: alt
      text: View on GitHub
      link: https://github.com/Kobazaaa/Kobengine2D
---

<div class="page-wrapper">

## What is Kobengine2D?

Kobengine2D is a custom-built 2D game engine written from scratch in C++.  
I had been using game engines such as Unity and Unreal Engine before, but how do they actually work under the hood? How do they handle certain things?
This custom engine is a challenge to better understand how game engines work.
<br><br>
It features a component-based system, input handling, asset loading, and a basic UI layer. It’s meant to be simple, fast, and flexible.
How do you test if your game engine works though? Well you make a game in it! For that I recreated the classic game *Burger Time* in my own engine, which you can find [here](/Burger%20Time).

## Framework Features

<FeatureList
  :features="[ 
    {
      title: 'Game Objects',
      icon: 'Gamepad2',
      description: 'Custom game objects to manage entities and interactions within the engine.'
    },
    {
      title: 'Components',
      icon: 'Puzzle',
      description: 'Modular components system for adding behavior, rendering, and physics to game objects.'
    },
    {
      title: 'Events',
      icon: 'Zap',
      description: 'Event system for triggering actions and managing interactions between game entities.'
    },
    {
      title: 'Service Locator',
      icon: 'MapPinned',
      description: 'Centralized access to various systems in the engine, making it easier to manage services like audio.'
    },
    {
      title: 'Update Loop',
      icon: 'Hourglass',
      description: 'A core update loop for managing the game’s flow and keeping everything running smoothly each frame.'
    },
    {
      title: 'Input Handling',
      icon: 'TextCursorInput',
      description: 'Handling all types of player input from keyboard, mouse, or gamepad for full interactivity.'
    },
    {
      title: 'Animation System',
      icon: 'GalleryHorizontalEnd',
      description: 'Controls sprite-based character animations using sprite sheets.'
    },
    {
      title: 'UI',
      icon: 'Monitor',
      description: 'Custom UI rendering using the engine’s draw system, with optional integration of ImGui.'
    },
    {
      title: 'Collision',
      icon: 'Swords',
      description: 'Collision detection and response for game objects, including basic physics interaction and hit detection. (only triggers)'
    },
    {
      title: 'Commands',
      icon: 'SquareTerminal',
      description: 'Command interface to execute input actions.'
    }
  ]"
  :columns="3"
/>

## Deep Dives

### Update Loop

The update loop is crucial to be correct in order to ensure predictable behaviour. We need to make sure everything happens in the correct order per frame.

<div style="margin: 20px 0">
  <img style="width: 350px;" src="/images/Kobengine2D/UpdateLoop.png" alt="UpdateLoop"/>
</div>

### Components

The engine uses a component-based architecture. Game objects are composed of reusable components, some provided by the engine, others made by the user. Some components that are a part of the engine are an Image Renderer, Text Renderer, Animator, Collider, and more.

### Events

For communication, the user has the option to use events that are built into the engine. Kobengine2D tries to mimic Unity events in C++, binding (member) functions and/or lambdas to events, which get called once the event gets invoked. Kobengine2D already supports events to have lambdas and event listeners as its listeners, but the user can always make a new class that inherits from EventListener to have extra functionality if they need.

### Service Locator & Singletons
Both the Sound System and Collision System are part of the Service Locator Pattern and can be swapped out by a personal implementation if wanted. For some other classes such as the Timer class, this is not possible, as it is a purey static class.

</div>
