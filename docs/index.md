---
layout: page
---

<div style="max-width: 1300px; margin: 0 auto; padding: 2rem;">

<div style="display: flex; align-items: flex-start; gap: 2rem; flex-wrap: wrap;">

  <!-- Image block -->
<div style="flex: 0 0 195px; margin: auto 0;">
  <img src="/images/Picture2.png" alt="Kobe Dereyne" 
       style="width: 195px; height: 195px; border-radius: 50%; object-fit: cover; object-position: 50% 10%; border: 1.5px solid #272c2aff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);" />
</div>

  <!-- Bio text -->
  <div style="flex: 2 0 300px; min-width: auto; max-width: 600px;">
    <h2 style="margin-top: 0;">Kobe Dereyne</h2>
    <p style="margin-top: 10px;">
        <p>
            I am a passionate C++ Programmer with a strong passion for Graphics & Engine Programming.
            Right now, I’m studying Game Development at Howest - Digital Arts & Entertainment in Belgium.
        </p>
        <br>
        <p>
            I like building things from the ground up and figuring out how to make things run faster or look better. <br>
            Math, science, and computer science have always been strong interests of mine, which led me to study Game Development. During my studies I discovered a love for Graphics & Engine Programming.
        </p>
    </p>
  </div>

<!-- Contact info -->
<div style="flex: 1;">
  <h2 style="margin-top: 0;">Contact</h2>

<p class="social-link">
  <a href="mailto:kobe.dereyne@outlook.com" class="link-item">
  <Mail :size="22"/>kobe.dereyne@outlook.com
  </a>
</p>
<p class="social-link">
  <a href="https://github.com/kobazaaa" target="_blank" class="link-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" class="link-icon" />
    GitHub
  </a>
</p>
<p class="social-link">
  <a href="https://www.linkedin.com/in/kobe-dereyne-925ba02a3/" target="_blank" class="link-item">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-plain.svg" alt="LinkedIn" class="link-icon" />
    LinkedIn
  </a>
</p>
</div>

</div>

## Projects

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">

<!-- Pompeii -->
<ProjectCard
  link="./Pompeii"
  img="./images/project-covers/Pompeii.png"
  alt="Pompeii"
  title="Pompeii | Vulkan Rasterizer"
  description="A simple 3D Graphics Rasterizer made with Vulkan. Actively evolving with new features, tweaks and improvements."
  status="Active Development"
/>

<!-- CPU Ray-Tracer -->
<ProjectCard
  link="./CPU Ray-Tracer"
  img="./images/project-covers/RayTracing.png"
  alt="CPU Ray-Tracer"
  title="CPU Ray-Tracer"
  description="A software ray-tracer made to learn and understand how ray-tracing and the math behind it works."
  status="Finished"
/>

<!-- Dual Rasterizer -->
<ProjectCard
  link="./DualRasterizer"
  img="./images/project-covers/HardwareRasterizerDX11.png"
  alt="DualRasterizer"
  title="CPU/GPU Rasterizer"
  description="A combined software & hardware rasterizer to learn the math behind rasterization and DX11."
  status="Finished"
/>

<!-- Kobengine -->
<ProjectCard
  link="./Kobengine"
  img="./images/project-covers/Kobengine.png"
  alt="Kobengine"
  title="Kobengine"
  description="A small, custom-made 2D Game Engine, applying several useful Design Patterns."
  status="On Hold"
/>

<!-- Ribbit Rampage -->
<ProjectCard
  link="./RibbitRampage"
  img="https://img.itch.zone/aW1hZ2UvMzMyNDI1My8yMTMzNjUxOS5qcGc=/original/6dwrzE.jpg"
  alt="Ribbit Rampage"
  title="Ribbit Rampage"
  description="Ribbit Rampage is a chaotic co-op boss fighting game for two players."
  status="Finished"
/>

<!-- Kirby's Adventure -->
<ProjectCard
  link="./Kirbys Adventure"
  img="./images/project-covers/KirbysAdventure.png"
  alt="Kirby's Adventure"
  title="Kirby's Adventure"
  description="A remake of the first levels of Kirby's Adventure in C++."
  status="Finished"
/>

</div>

<!-- Extra Projects -->
<style>
details summary {
  cursor: pointer;
  color: #888888;
  font-weight: 400;
  font-size: 0.95rem;
  text-align: center;
  list-style: none;
  position: relative;
}

details summary::after {
  content: "View More";
  display: inline-block;
  margin-left: 8px;
  font-weight: 400;
  color: #888888;
}

details[open] summary::after {
  content: "View Less";
}
</style>

<details ref="detailsRef" @toggle="toggleOpen" style="margin-top: 24px;">
  <summary></summary>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; margin-top: 16px;">
        <!-- Burger Time -->
        <ProjectCard
            link="./Burger Time"
            img="./images/project-covers/BurgerTime.png"
            alt="Burger TIme"
            title="Burger Time"
            description="A remake of the classic Burger Time game in my own custom 2D Game Engine in C++ (Kobengine)!"
            status="Finished"
        />
        <!-- EndlessPrototype -->
        <ProjectCard
            link="./EndlessPrototype"
            img="./images/project-covers/EndlessPrototype.png"
            alt="Endless Prototype"
            title="Endless Prototype"
            description="A prototpye of an endless survival horror game made in Unity, with the goal to survive as long as possible."
            status="Prototype"
        />
        <!-- PPGA Math Game -->
        <ProjectCard
            link="./PPGAGame"
            img="./images/project-covers/PPGA.png"
            alt="PPGAGame"
            title="PPGAGame"
            description="A 2D game made without any vector or matrix math, but rather only Plane Perspective Geometric Algebra (PPGA)."
            status="Prototype"
        />
        <!-- Forest Loner -->
        <ProjectCard
            link="./ForestLonerDiorama"
            img="./images/project-covers/ForestLoner.png"
            alt="Forest Loner"
            title="Forest Loner 3D Diorama"
            description="A small 3D Diorama set in a forest. Made with Blender + Adobe Photoshop."
            status="Finished"
        />
</div>
</details>


## Skills

### Languages

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
<!-- Dutch -->
<LanguageCard
    title="Dutch (native)"
    speaking="      🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜"
    understanding=" 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜"
    writing="       🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜"
/>
<!-- English -->
<LanguageCard
    title="English"
    speaking="      🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜⬜⬜"
    understanding=" 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜⬜"
    writing="       🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜⬜"
/>
<!-- French -->
<LanguageCard
    title="French"
    speaking="      🟩🟩🟩🟩🟩🟩⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜"
    understanding=" 🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜"
    writing="       🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜"
/>
</div>


### Programming Languages

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px;">
<!-- C++ -->
<SkillCard
    title="C++"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
/>
<!-- C# -->
<SkillCard
    title="C#"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"
/>
<!-- GLSL -->
<SkillCard
    title="GLSL"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opengl/opengl-original.svg"
/>
<!-- HLSL -->
<SkillCard
    title="HLSL"
    fallback="Code"
/>
<!-- Lua -->
<SkillCard
    title="Lua"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg"
/>
</div>

### Game Engines

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px;">
<!-- Unity -->
<SkillCard
    title="Unity"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg"
/>
<!-- Unreal -->
<SkillCard
    title="Unreal Engine"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg"
/>
<!-- S&box -->
<SkillCard
    title="s&box"
    fallback="Ampersand"
/>
</div>

### API's & Libraries

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px;">
<!-- Vulkan -->
<SkillCard
    title="Vulkan"
    img="https://upload.wikimedia.org/wikipedia/commons/f/f8/Vulkan_API_logo.svg"
/>
<!-- C++ STD -->
<SkillCard
    title="C++ Standard Library"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"
/>
<!-- DirectX11 -->
<SkillCard
    title="DirectX 11"
    fallback="Wrench"
/>
<!-- Dear ImGui -->
<SkillCard
    title="Dear ImGui"
    fallback="MonitorCheck"
/>
<!-- SDL -->
<SkillCard
    title="SDL"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sdl/sdl-original.svg"
/>
<!-- WPF -->
<SkillCard
    title="WPF"
    fallback="LayoutPanelTop"
/>
</div>

### Version Control

<!-- GitHub -->
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px;">
<SkillCard
    title="GitHub"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
/>
<!-- Perforce -->
<SkillCard
    title="Perforce"
    img="https://cdn.brandfolder.io/UEOJKODA/at/6tkxmv594k6vh53wj8kwq9x/logo-p4-icon-reg.svg"
/>
<!-- Git -->
<SkillCard
    title="Git"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
/>
</div>

### Collaboration & Tools

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px;">
<!-- Visual Studio -->
<SkillCard
    title="Visual Studio"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg"
/>
<!-- CMake -->
<SkillCard
    title="CMake"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg"
/>
<!-- Visual Studio Code -->
<SkillCard
    title="Visual Studio Code"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
/>
<!-- NVIDIA Nsight Graphics -->
<SkillCard
    title="NVIDIA Nsight Graphics"
    img="https://www.nvidia.com/favicon.ico"
/>
<!-- RenderDoc -->
<SkillCard
    title="RenderDoc"
    img="https://raw.githubusercontent.com/baldurk/renderdoc/v1.x/qrenderdoc/Resources/logo.svg"
/>
<!-- Notion -->
<SkillCard
    title="Notion"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg"
/>
<!-- Blender -->
<SkillCard
    title="Blender"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg"
/>
<!-- Photoshop -->
<SkillCard
    title="Photoshop"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg"
/>

</div>
</div>
