---
layout: page
---

<div class="page-wrapper">

<div style="display: flex; align-items: flex-start; gap: 2rem; flex-wrap: wrap;">

  <!-- Image block -->
<div style="flex: 0 0 195px; margin: auto 0;">
  <img src="/images/Picture2.png" alt="Kobe Dereyne" 
       style="width: 195px; height: 195px; border-radius: 50%; object-fit: cover; object-position: 50% 10%; border: 1.5px solid #272c2aff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);" />
</div>

  <!-- Bio text -->
  <div style="flex: 2 1 300px; min-width: 0; max-width: 600px;">
    <h2 style="margin-top: 0;">Kobe Dereyne</h2>
  <p class="subtitle">Graphics & Engine Programmer</p>
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
<div class="contact-divider">
<p class="social-link">
  <a href="/Resume" class="link-item">
    <FileText :size="22"/>
    View my Resume
  </a>
</p>
</div>
</div>

</div>

## Projects

<ProjectsGrid />

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
<!-- Gitea -->
<SkillCard
    title="Gitea"
    img="https://upload.wikimedia.org/wikipedia/commons/b/bb/Gitea_Logo.svg"
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
<!-- YouTrack -->
<SkillCard
    title="YouTrack"
    img="https://upload.wikimedia.org/wikipedia/commons/8/8d/YouTrack_Icon.svg"
/>
<!-- Notion -->
<SkillCard
    title="Notion"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg"
/>
<!-- Slack -->
<SkillCard
    title="Slack"
    img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg"
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
