---
layout: home

hero:
  name: Kobeditor
  tagline: ... is an editor built on top of Kobengine and Pompeii, internally codenamed Tadpole.
  actions:
    - theme: alt
      text: View on GitHub
      link: https://github.com/Kobazaaa/Tadpole
---

<div class="page-wrapper">

## What is Kobeditor?

Kobeditor (codename *Tadpole*) is the editor for my custom game engine [Kobengine](/Kobengine), which in turn renders through my Vulkan renderer [Pompeii](/Pompeii). It is the top layer of the stack: a Dear ImGui application that hooks into the engine's layer system and turns the raw engine into something you can actually *work* in. Inspect the scene, tweak components, import models, and watch it all render live in the viewport.
<br><br>
Where [Pompeii](/Pompeii) answers "how do I draw this?" and [Kobengine](/Kobengine) answers "how do I structure a game?", Kobeditor tries to answer "how do I *build* with all of that?".

## Active Development

Kobeditor is in active development, growing alongside the engine and renderer. Look around here, or at the code on [GitHub](https://github.com/Kobazaaa/Tadpole) to see where it stands!

<div style="max-width: 100%; margin: 24px auto; text-align: center;">
  <img src="/images/Kobeditor/FullEditor.png" alt="Full editor preview" class="framed-image" style="display: inline-block;" />
</div>

## Editor Features

<FeatureList
  :features="[
  {
    title: 'Docking & Layouts',
    icon: 'LayoutDashboard',
    description: 'Fully dockable panels with a sensible default layout, plus saving and loading custom layouts to disk.'
  },
  {
    title: 'Scene Hierarchy',
    icon: 'ListTree',
    description: 'Tree view of the scene with selection, drag-and-drop reparenting, context menus, and keyboard shortcuts.'
  },
  {
    title: 'Inspector',
    icon: 'SlidersHorizontal',
    description: 'Edit the selected object: transform, camera, lights, meshes, ... .'
  },
  {
    title: 'Live Viewport',
    icon: 'AppWindow',
    description: 'The renderer\'s output displayed as a texture inside the editor, with aspect-ratio presets and a stats overlay.'
  },
  {
    title: 'Console',
    icon: 'Terminal',
    description: 'Engine log with severity filters, live counts, text search, collapse mode, and copy-to-clipboard.'
  },
  {
    title: 'Stats Panel',
    icon: 'Activity',
    description: 'Frame-time graph, scene statistics, and per-heap video memory usage straight from the GPU allocator.'
  },
  {
    title: 'Model Import',
    icon: 'Import',
    description: 'Import models through a file dialog. The editor creates the object and components for you.'
  },
  {
    title: 'Custom Theme',
    icon: 'Paintbrush',
    description: 'A custom dark theme with an orange accent and the JetBrains Mono font.'
  }
]"   :columns="3"/>

## The Panels

The editor UI is built out of self-contained panels, each implementing a small `IPanel` interface (activate, render, deactivate). The `EditorLayer` owns them all, draws the main menu bar, and hosts the dockspace they live in.
<br><br>
This makes it really easy to add new panels with their own logic.

<div style="width: 100%; margin: 24px auto;">
<Carrousel
  :images="[
    '/images/Kobeditor/FullEditor_01.png',
    '/images/Kobeditor/Viewport.png',
    '/images/Kobeditor/Viewport_01.png',
  ]"
/>
</div>


## The Future

Kobeditor is where most upcoming engine features will surface: scene serialization (save/load), undo/redo, transform gizmos in the viewport, a play/stop mode, and an asset browser are all on the roadmap.

## Third-Party Libraries

<FeatureList
  :features="[ 
    {
      title: 'Dear ImGui (docking branch)',
      icon: 'PanelsTopLeft',
      description: 'The immediate-mode UI framework powering every panel, with docking and the GLFW + Vulkan backends.'
    },
    {
      title: 'ImGuiFileDialog',
      icon: 'FolderOpen',
      description: 'File dialogs for importing models and saving/loading editor layouts.'
    },
    {
      title: 'Kobengine & Pompeii',
      icon: 'Blocks',
      description: 'Not third-party, my own engine and renderer, which the editor builds on. The editor links only against Kobengine.'
    },
  ]"
  :columns="3"
/>

</div>
