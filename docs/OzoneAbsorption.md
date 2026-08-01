---
layout: home

hero:
  name: Ozone Absorption
  tagline: The effects of Ozone Absorption in a Single Atmospheric Scattering model. Made with C++ and Vulkan.
  actions:
    - theme: alt
      text: View on GitHub
      link: https://github.com/Kobazaaa/Ashen
---

<div class="page-wrapper">

## Overview

The aim of this research is to investigate how incorporating an **additional physical effect**, such as **ozone absorption**, influences the
perceived colour of the sky (as well as perceived realism), and how using different phase function approximations affects both the visual result
and the computational performance of real-time rendering models.
<br><br>
More specifically, how does this additional physical effect influence the perceived color of the sky in a **Single-Scattering Atmospheric Scattering Model**. So in short, the question I sought out to answer was:
<div>

> How does a single-scattering atmospheric scattering model compare visually and computationally when extended with ozone absorption and alternative phase function approximations?

</div>

Performance differences can be measured directly through profiling. Evaluating visual differences, however, is inherently subjective. To address this, a **pairwise comparison survey** was conducted where participants selected the more realistic image without knowing which model was used.

## Process

The project is built on a **physically-based single scattering model**, implemented from scratch using **Vulkan**. Unlike many real-time approaches, this implementation avoids lookup tables and instead evaluates the scattering integrals directly in the shader using numerical integration.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap: 16px; margin: 24px auto">

<TextCard
  title="Model"
  icon="Layers"
  description="Rayleigh and Mie scattering are evaluated separately using numerical integration."
/>
<TextCard
  title="Ozone"
  icon="Cloud"
  description="Added as an absorption term, subtly shifting sky colour without scattering."
/>
<TextCard
  title="Integration"
  icon="Sigma"
  description="Midpoint sampling along the view ray, sample count controls quality vs cost."
/>

</div>

#### Shader Flow

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap: 16px; margin: 24px auto">

<TextCard
  title="Vertex Shader"
  icon="GitCommitHorizontal"
  description="Performs numerical integration along the view ray & outputs accumulated Rayleigh and Mie scattering."
/>
<TextCard
  title="Fragment Shader"
  icon="Brush"
  description="Applies phase functions & computes final colour contribution."
/>
<TextCard
  title="Post Processing"
  icon="BanknoteArrowDown"
  description="HDR rendering with exposure tone mapping."
/>

</div>

## Pairwise Comparison

<div style="display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 950px; margin: 0 auto;">

<ImageSlider
  :images="[
    { src: '/images/OzoneAbsorption/Ozone_Low.png', title: 'Ozone' },
    { src: '/images/OzoneAbsorption/NoOzone_Low.png', title: 'No Ozone' },
  ]"
  :start="50"
/>
<ImageSlider
  :images="[
    { src: '/images/OzoneAbsorption/Ozone_Medium.png', title: 'Ozone' },
    { src: '/images/OzoneAbsorption/NoOzone_Medium.png', title: 'No Ozone' },
  ]"
  :start="50"
/>
<ImageSlider
  :images="[
    { src: '/images/OzoneAbsorption/Ozone_High.png', title: 'Ozone' },
    { src: '/images/OzoneAbsorption/NoOzone_High.png', title: 'No Ozone' },
  ]"
  :start="50"
/>
</div>

## Results

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr)); gap: 24px;">

<TextCard
  title="Survey Findings"
  icon="Users"
  description="Blind pairwise comparison (44 participants)<br> - High sun: ozone preferred<br> - Low sun: non-ozone preferred"
/>
<TextCard
  title="Performance"
  icon="Gauge"
  description="Ozone absorption and phase function selection introduce negligible overhead.<br> - Ozone absorption: minimal cost<br> - Phase function: negligible impact"
/>
</div>

## Controls 

<FeatureList
  :features="[
  {
    title: 'Adjust Sample Count',
    icon: 'Layers',
    description: 'Use the \'+\' and \'-\' keys to increase or decrease the sample count along the scattering ray. The default value is 16 samples.'
  },
  {
    title: 'Scattering parameter g',
    icon: 'MoveHorizontal',
    description: 'Use the \'3\' key to increase the scattering parameter g. Use \'L-Shift + 3\' to decrease it. The default value is -0.990.'
  },
  {
    title: 'Sun Intensity',
    icon: 'Sun',
    description: 'Use the \'4\' key to increase the sun\'s intensity. Use \'L-Shift + 4\' to decrease it. The default value is 20.'
  },
  {
    title: 'Exposure',
    icon: 'Aperture',
    description: 'Use the \'8\' key to increase the exposure value. Use \'L-Shift + 8\' to decrease it. The default value is 2.0.'
  },
  {
    title: 'Speed',
    icon: 'Plus',
    description: 'Use the \'R-Shift\' key with any of the aforementioned settings to speed up the rate of change.'
  },
  {
    title: 'Light Preset',
    icon: 'Lightbulb',
    description: 'Use the \'9\' key to go to the next set sun angle. Use \'L-Shift + 9\' to go to the previous one. The set angles are low, medium and high. The default value is at a low sun angle.'
  },
  {
    title: 'Ozone Toggle',
    icon: 'Umbrella',
    description: 'Use the \'O\' key to toggle Ozone Absorption on and off. The default value is on.'
  },
  {
    title: 'Phase Function Toggle',
    icon: 'SquareFunction',
    description: 'Use the \'F\' key to toggle between the following phase functions: Henyey-Greenstein, Cornette-Shanks, and Double Henyey-Greenstein. The default value is Henyey-Greenstein.'
  },
  {
    title: 'HDR',
    icon: 'Contrast',
    description: 'use the \'Tab\' key to toggle HDR Rendering on or off. The default value is on.'
  },
  {
    title: 'Movement',
    icon: 'Camera',
    description: 'Use the \'WASD\' keys to move forwards, left, backward, and right. Use the \'QE\' keys to move down and up.'
  },
  {
    title: 'Rotation',
    icon: 'RefreshCw',
    description: 'Use \'LMB + Drag\' to rotate the camera.'
  }
]"   :columns="3"/>

## Images of Results

<div style="width: 90%; margin: 24px auto;">
<ImageGrid :images="[
  { src: '/images/OzoneAbsorption/Ozone_Low.png',      alt: 'Sunset with Ozone', caption: 'Sunset with Ozone' },
  { src: '/images/OzoneAbsorption/Ozone_Medium.png',   alt: 'Late Morning with Ozone', caption: 'Late Morning with Ozone' },
  { src: '/images/OzoneAbsorption/Ozone_High.png',     alt: 'High Noon with Ozone', caption: 'High Noon with Ozone' },
  { src: '/images/OzoneAbsorption/NoOzone_Low.png',    alt: 'Sunset without Ozone', caption: 'Sunset without Ozone' },
  { src: '/images/OzoneAbsorption/NoOzone_Medium.png', alt: 'Late Morning without Ozone', caption: 'Late Morning without Ozone' },
  { src: '/images/OzoneAbsorption/NoOzone_High.png',   alt: 'High Noon without Ozone', caption: 'High Noon without Ozone' },
]"
 />
</div>


## Read More

<div style="max-width: 100%; margin: 0 auto; padding: 2rem; text-align: center;">
  <div style="position: relative;
              width: 100%;
              height: 0;
              padding-top: 141.4286%;
              padding-bottom: 0;
              box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16);
              margin-top: 1.6em;
              margin-bottom: 0.9em;
              overflow: hidden;
              border-radius: 8px;
              will-change: transform;">
    <iframe loading="lazy"
            style=" position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0; 
                    left: 0;
                    border: none;
                    padding: 0;
                    margin: 0;"
                    src="documents/GW2526_Dereyne_Kobe_EN_Paper.pdf"
                    allowfullscreen="allowfullscreen"
                    allow="fullscreen">
    </iframe>
  </div>
</div>


</div>
