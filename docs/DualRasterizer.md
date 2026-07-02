---
layout: home

hero:
  name: CPU/GPU Dual Rasterizer
  tagline: A toggleable software (CPU) and hardware (DX11) rasterizer built to explore the math and mechanics of real-time rasterization.
  actions:
    - theme: alt
      text: View on GitHub
      link: https://github.com/Kobazaaa/GP1_DualRasterizer
---

<div class="page-wrapper">

## Goals

The Dual Rasterizer project was created with three main goals in mind.
<br><br>
The first goal was to understand the math and logic behind real-time 3D rendering. Starting with a software rasterizer on the CPU forced me to do everything manually, from vertex transformations, perspective projection, and triangle rasterization to depth testing, shading, and more. Doing it all manually really helped me understand what each step in the graphics pipeline does, instead of letting the GPU "just handle it".
<br><br>
Once I had the basics down on the CPU side, the second goal was to take those same ideas and apply them to a GPU renderer using DirectX 11. That part was about learning how the graphics pipeline works in a real-world setting, working with shaders, buffers, sampler states, and all that. Having done it all in a software version first made it way easier to understand what the GPU pipeline is actually doing, instead of just copying examples.
<br><br>
The third goal was to combine the two. Allowing you to switch between the software and hardware rasterizer at runtime while still maintaining clean code.

## Features

<FeatureList
  :features="[  
    {
      title: 'Dual Backend',
      icon: 'Repeat',
      description: 'Switch between a custom CPU rasterizer and a DX11-based GPU implementation for comparison and learning.'
    },
    {
      title: 'Normal Mapping',
      icon: 'Hexagon',
      description: 'Both renderers support tangent-space normal mapping for added surface detail.'
    },
    {
      title: 'Transparency',
      icon: 'Blend',
      description: 'Basic transparency is supported in both renderers using alpha blending.'
    },
    {
      title: 'Cull Mode Toggle',
      icon: 'Compass',
      description: 'Easily switch between backface, frontface, or no culling to inspect geometry rendering.'
    },
    {
      title: 'Depth & Normal Visualizations (CPU)',
      icon: 'Microscope',
      description: 'Debugging tools to visualize depth buffer, normals, and wireframe views.'
    },
    {
      title: 'Bounding Box Display (CPU)',
      icon: 'Package',
      description: 'Enables visual debugging by drawing AABBs around mesh geometry.'
    },
    {
      title: 'Shadow Mapping (GPU)',
      icon: 'Moon',
      description: 'The GPU rasterizer supports directional shadow mapping.'
    },
    {
      title: 'Sampler State Toggle (GPU)',
      icon: 'Sliders',
      description: 'Switch between point, linear, and anisotropic sampling at runtime.'
    }
  ]"
  :columns="3"/>

## Display

<div style="max-width: 80%; margin: 24px auto;">
<ImageSlider
  :images="[
    { src: '/images/DualRasterizer/FinalRender.png', title: 'Final Render' },
    { src: '/images/DualRasterizer/FinalRenderNoShadow.png', title: 'No Shadow' },
    { src: '/images/DualRasterizer/FinalRenderNoFire.png', title: 'Vehicle' },
    { src: '/images/DualRasterizer/BoundingBoxes.png', title: 'Bounding Box' },
    { src: '/images/DualRasterizer/Wireframe.png', title: 'Wireframe' },
  ]"
/>
</div>

</div>
