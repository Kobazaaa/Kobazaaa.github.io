---
layout: home

hero:
  name: Pompeii
  tagline: ...is a Vulkan-based Graphics Renderer written in C++. It is a learning project to explore the Vulkan API.
  actions:
    - theme: alt
      text: View on GitHub
      link: https://github.com/Kobazaaa/Pompeii
---

<div class="page-wrapper">

## Active Development

This project is in active development, meaning it is actively evolving and being worked on, as there is always something new to add, tweak, or improve!
<br>
Look around here, or at the code on [GitHub](https://github.com/Kobazaaa/Pompeii) to see what Pompeii has become so far!

## Main Features

<FeatureList
  :features="[
  {
    title: 'Dynamic Rendering',
    icon: 'RefreshCcw',
    description: 'Real-time dynamic rendering with smooth transitions and frame buffers.'
  },
  {
    title: 'Bindless Rendering',
    icon: 'Link',
    description: 'Efficient memory management by using bindless resources in shaders.'
  },
  {
    title: 'Deferred Rendering',
    icon: 'Layers',
    description: 'Optimized rendering technique for handling complex lighting and shadows.'
  },
  {
    title: 'Physically Based Rendering (PBR)',
    icon: 'Lightbulb',
    description: 'Realistic material and light interaction using physically accurate models.'
  },
  {
    title: 'Image Based Lighting (IBL)',
    icon: 'Image',
    description: 'High-quality lighting from environmental textures for realistic scenes.'
  },
  {
    title: 'Auto-Exposure',
    icon: 'Sun',
    description: 'Automatic adjustment of exposure settings for consistent image brightness, using compute shaders.'
  },
  {
    title: 'Tone Mapping',
    icon: 'Palette',
    description: 'Converts HDR images to fit within a display’s limited dynamic range.'
  },
  {
    title: 'Shadow Mapping',
    icon: 'Moon',
    description: 'Efficiently renders shadows by using depth information from the light’s perspective.'
  },
  {
    title: 'Alpha Cutout',
    icon: 'Scissors',
    description: 'Optimized transparency rendering by discarding pixels based on alpha values.'
  },
  {
    title: 'Mipmap Generation',
    icon: 'ZoomIn',
    description: 'Improves texture rendering performance by generating multiple resolution levels.'
  },
  {
    title: 'Debug Utils',
    icon: 'Wrench',
    description: 'Provides tools for debugging graphics and performance in real-time.'
  },
  {
    title: 'Interactable Camera',
    icon: 'Video',
    description: 'A physical camera for the user to traverse the scene.'
  }
]"   :columns="3"/>


## Render Passes

<div style="max-width: 80%; margin: 0 auto;">
<ImageSlider
  :images="[
    { src: '/images/Pompeii/SponzaDepth.png', title: 'Depth Pre-Pass' },
    { src: '/images/Pompeii/SponzaAlbedo.png', title: 'G-Buf Albedo' },
    { src: '/images/Pompeii/SponzaNormal.png', title: 'G-Buf Normals' },
    { src: '/images/Pompeii/SponzaMetalRough.png', title: 'G-Buf Rough-Metal' },
    { src: '/images/Pompeii/SponzaHDR.png', title: 'Light Pass (HDR)' },
    { src: '/images/Pompeii/SponzaLDR.png', title: 'Blit Pass (LDR)' },
  ]"
  :start="100"
/>
</div>

## Process

#### Early Graphics Experience
I already had some graphics programming experience, mainly with my [Software Ray-Tracer](/CPU%20Ray-Tracer) and [Rasterizer](DualRasterizer). From these, I learned the fundamentals of the graphics pipeline and how the GPU works, though everything was implemented on the CPU.
<br>
Later, I explored hardware rendering by adding DirectX 11 support to my rasterizer, which was a great way to understand working with the GPU through an API. However, I wanted to dive into something more modern, which led me to discover Vulkan.

#### Learning Vulkan
I started out by following the [Vulkan tutorial](https://vulkan-tutorial.com), which was great. It taught me how to work with Vulkan and explained how the API worked. Although at the end of the tutorial, you end up with 1 main file with all your code which is over 1000 lines long. This was far from ideal for what I wnated to achieve.
<br>
The next step was to refactor all that code into something more useable and reuseable. I created my own wrapper around Vulkan with classes, helper functions, builder pattern, and more, aiming for a structure that made it easier to extend and maintain.

#### Adding Advanced Features
One I completed the main ideas of my refactor, I started working on adding new features such as dynamic and bindless rendering, switching from forward to deferred rendering, and even adding shadowmapping and Image Based Lighting, as well as more features. At this stage, I had a fully functional Vulkan 3D rasterizer, but it still wasn’t exactly what I envisioned.

#### The Future
I wanted to add more to Pompeii, expand it further, make a user interface to control objects in the scene, add logic to objects, and slowly turn it into a useable engine of sorts. That's where I am today, working on splitting rendering from logic, and making Pompeii into a useable framework.

## Auto Exposure

Automatic adjustment of the Exposure Value based on the average luminance, which is computed using compute shaders.

<div style="max-width: 75%; margin: 24px auto; ">
<div class="video-embed">
  <iframe src="/images/Pompeii/autoexp.mp4" frameborder="0" allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" title="gameplay footage prototype" referrerpolicy="strict-origin-when-cross-origin"></iframe>
</div>
</div>

## User Interface

As I am trying to turn Pompeii into something easy to work with, and something I can use to *make* stuff in, one of the first steps was providing a user interface to manipulate objects.
<div style="width: 100%; margin: 24px auto;">
<Carrousel
  :images="[
    '/images/Pompeii/UI_Model.png',
    '/images/Pompeii/UI_Camera.png',
  ]"
/>
</div>

## How did we get here?

Enjoy these *interesting* bugs and errors I got while experimenting and messing around!

<div style="width: 90%; margin: 24px auto;">
<ImageGrid :images="[
  { src: '/images/Pompeii/Collapse.png', alt: 'Vertices collapsing' },
  { src: '/images/Pompeii/NormalFormatMismatch.png', alt: 'Normal Image Format Mismatch', caption: 'A mismatch in the normal image format' },
  { src: '/images/Pompeii/NormalGarbage.png', alt: 'Garbage Normals' },
  { src: '/images/Pompeii/Purple.png', alt: 'Everything is purple' },
  { src: '/images/Pompeii/Zebra.png', alt: 'Zebra Effect', caption: 'I call this one the zebra shader' },
  { src: '/images/Pompeii/Toon.png', alt: 'Toon Effect', caption: 'Unintentionally made a toon-like shader' },
]" />
</div>

## Post-Processing

This is the fragment shader in the Blit Pass. Here I receive the HDR Image produced by the lighting pass, and I apply (auto) exposure and tonemapping to convert the image back to LDR, ready for presentation.
<div class="vp-doc">

```glsl
#version 450 core
#extension GL_GOOGLE_include_directive : require

// -- Includes --
#include "helpers_exposure.glsl"

// -- Data --
layout(set = 0, binding = 0) uniform sampler2D Render;
layout(set = 0, binding = 1) uniform CameraSettings
{
	float aperture;
	float shutterspeed;
	float iso;
} camSettings;
layout(set = 0, binding = 2) uniform sampler2D AverageLum;

// -- Input --
layout(location = 0) in vec2 fragTexCoord;

// -- Output --
layout(location = 0) out vec4 outColor;

// -- Shader --
void main()
{
	// -- Base Color --
	vec3 hdrColor = texture(Render, fragTexCoord).rgb;
	
	// -- Camera Exposure --
	const float EV100 = CalculateEV100(camSettings.aperture, camSettings.shutterspeed, camSettings.iso);
	const float exposure = EV100ToExposure(EV100);

	float averageLum = texelFetch(AverageLum, ivec2(0,0), 0).x;
	const float autoEV100 = AverageLuminanceToEV100(averageLum);
	const float autoExposure = EV100ToExposure(autoEV100);
	hdrColor = hdrColor * autoExposure;

	// -- Tone Mapping (WIP to switch dynamically) --
	const vec3 aces = ACESFilmToneMapping(hdrColor);
	const vec3 reinhard = ReinhardToneMapping(hdrColor);
	const vec3 uncharted2 = Uncharted2ToneMapping(hdrColor);
	vec3 ldrColor = reinhard;

	// -- Output --
	outColor = vec4(ldrColor, 1.0);
}
```
</div>


## Resources

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">

<BadgeCard
    title="Graphics Programming Teachers at Howest University - DAE"
    fallback="GraduationCap"
/>
<a href="https://vulkan-tutorial.com" target="_blank" style="text-decoration: none;">
  <BadgeCard
    title="The Vulkan Tutorial"
    fallback="BookOpen"
  />
</a>
<a href="https://casual-effects.com/data" target="_blank" style="text-decoration: none;">
<BadgeCard
    title="Morgan McGuire's Computer Graphics Archive"
    fallback="Database"
/>
</a>
<a href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main" target="_blank" style="text-decoration: none;">
<BadgeCard
    title="Khronos Group's glTF Sample Assets"
    fallback="Package"
/>
</a>
<a href="https://learnopengl.com" target="_blank" style="text-decoration: none;">
<BadgeCard
    title="OpenGL's Tutorials at Learn OpenGL"
    fallback="Code"
/>
</a>
<a href="https://github.com/Kobazaaa/PompeiiResources.git" target="_blank" style="text-decoration: none;">
<BadgeCard
    title="Pompeii Resources Repository"
    fallback="FolderSymlink"
/>
</a>

</div>

## Third-Party Libraries

<FeatureList
  :features="[ 
    {
      title: 'Vulkan API',
      icon: 'Flame',
      description: 'Real-time dynamic rendering, low-level graphics API for high-performance rendering.'
    },
    {
      title: 'Vulkan Memory Allocator (VMA)',
      icon: 'Brain',
      description: 'Efficient memory management and resource allocation for Vulkan applications.'
    },
    {
      title: 'GLFW',
      icon: 'Monitor',
      description: 'Cross-platform windowing and input management.'
    },
    {
      title: 'glm',
      icon: 'Calculator',
      description: 'Mathematics library for handling transformations, matrices, and vector operations.'
    },
    {
      title: 'stb',
      icon: 'Palette',
      description: 'Single-header library for image loading, texture management, and other utility functions.'
    },
    {
      title: 'Open Asset Import Library (Assimp)',
      icon: 'Package',
      description: 'Supports loading 3D models in various formats to simplify asset integration.'
    },
  ]"
  :columns="2"
/>

</div>
