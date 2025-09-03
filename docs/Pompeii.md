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

<div style="max-width: 1300px; margin: 0 auto; padding: 2rem;">

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
/>
</div>

## Code Snippets

Here are some snippets and short explanations of my code in Pompeii!
<br><br>

The 'main' rendering loop. Here I wait for the fence of the previous frame (with this frame index) to be signalled to ensure everything is ready for use. Checking for resizing, setting up the semaphores for this frame and recording the command buffer for the GPU.
<div class="vp-doc">

```cpp
void pom::Renderer::Render()
{
	// -- Wait for the current frame to be done --
	const auto& frameSync = m_SyncManager.GetFrameSync(m_CurrentFrame);
	vkWaitForFences(m_Context.device.GetHandle(), 1, &frameSync.inFlight, VK_TRUE, UINT64_MAX);

	// -- Acquire new Image from SwapChain --
	uint32_t imageIndex;
	VkResult result = vkAcquireNextImageKHR(m_Context.device.GetHandle(), m_SwapChain.GetHandle(), UINT64_MAX, frameSync.imageAvailable, VK_NULL_HANDLE, &imageIndex);

	// -- If SwapChain Image not good, recreate Swap Chain --
	if (result == VK_ERROR_OUT_OF_DATE_KHR || result == VK_SUBOPTIMAL_KHR)
	{
		RecreateSwapChain();
		return;
	}
	if (result != VK_SUCCESS)
		throw std::runtime_error("Failed to acquire Swap Chain Image");

	// -- Reset Fence to be un-signaled (not done) --
	vkResetFences(m_Context.device.GetHandle(), 1, &frameSync.inFlight);

	// -- Record Command Buffer --
	CommandBuffer& cmdBuffer = m_Context.commandPool->GetBuffer(m_CurrentFrame);
	cmdBuffer.Reset();
	RecordCommandBuffer(cmdBuffer, imageIndex);

	// -- Submit Commands with Semaphores --
	const SemaphoreInfo semaphoreInfo
	{
		.vWaitSemaphores = { frameSync.imageAvailable },
		.vWaitStages = { VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT },
		.vSignalSemaphores = { frameSync.renderFinished }
	};
	cmdBuffer.Submit(m_Context.device.GetGraphicQueue(), false, semaphoreInfo, frameSync.inFlight);

	// -- Create Present Info --
	VkPresentInfoKHR presentInfo{};
	presentInfo.sType = VK_STRUCTURE_TYPE_PRESENT_INFO_KHR;
	presentInfo.waitSemaphoreCount = static_cast<uint32_t>(semaphoreInfo.vSignalSemaphores.size());
	presentInfo.pWaitSemaphores = semaphoreInfo.vSignalSemaphores.data();

	VkSwapchainKHR swapChains[] = { m_SwapChain.GetHandle() };
	presentInfo.swapchainCount = 1;
	presentInfo.pSwapchains = swapChains;
	presentInfo.pImageIndices = &imageIndex;
	presentInfo.pResults = nullptr;

	// -- Present --
	result = vkQueuePresentKHR(m_Context.device.GetPresentQueue(), &presentInfo);

	// -- If Present failed or out of date, recreate SwapChain --
	if (result == VK_ERROR_OUT_OF_DATE_KHR || result == VK_SUBOPTIMAL_KHR || m_pWindow->IsOutdated())
	{
		m_pWindow->ResetOutdated();
		RecreateSwapChain();
	}
	else if (result != VK_SUCCESS)
		throw std::runtime_error("Failed to present Swap Chain Image!");

	// -- Go to next frame --
	m_CurrentFrame = (m_CurrentFrame + 1) % m_MaxFramesInFlight;
}
```
</div>

<br>
The recording of the command buffers look as follows. Going through each step of the deferred pipeline, putting memory barriers in between the steps to ensure resources are synchronized and are only consumed when available.
<div class="vp-doc">

```cpp
void pom::Renderer::RecordCommandBuffer(CommandBuffer& commandBuffer, uint32_t imageIndex)
{
	Image& presentImage = m_SwapChain.GetImages()[imageIndex];
	Image& renderImage = m_vRenderTargets[imageIndex];
	Image& depthImage = m_vDepthImages[imageIndex];

	commandBuffer.Begin();
	{
		// -- Depth Pre-Pass --
		{
			// Transition the current Depth Image to be written to
			depthImage.TransitionLayout(commandBuffer,
				VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL,
				VK_ACCESS_2_NONE, VK_PIPELINE_STAGE_2_NONE,
				VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT, VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT,
				0, 1, 0, 1);

			// The Depth Pre-Pass renders the entire scene to the provided depth buffer.
			m_DepthPrePass.Record(m_Context, commandBuffer, m_GeometryPass, imageIndex, depthImage, m_pScene, m_pCamera);

			// Transition the current Depth Image to be read from
			depthImage.TransitionLayout(commandBuffer,
				VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL,
				VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT, VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT,
				VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT, VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT,
				0, 1, 0, 1);
		}

		// -- Geometry Pass --
		{
			// The Geometry Pass renders the entire scene to a GBuffer.
			m_GeometryPass.Record(m_Context, commandBuffer, imageIndex, depthImage, m_pScene, m_pCamera);
			// After it is done, the GBuffers are transitioned to a layout ready for being sampled from.
		}

		// -- Lighting Pass --
		{
			// Transition the current Depth Image to be sampled from
			depthImage.TransitionLayout(commandBuffer,
				VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL,
				VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT, VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT,
				VK_ACCESS_2_SHADER_SAMPLED_READ_BIT, VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT,
				0, 1, 0, 1);

			// Transition the current Render Image to be written to
			renderImage.TransitionLayout(commandBuffer,
				VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL,
				VK_ACCESS_2_NONE, VK_PIPELINE_STAGE_2_NONE,
				VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT, VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT,
				0, 1, 0, 1);

			// The Lighting Pass calculates all the heavy lighting calculations using the data from the Geometry Pass
			m_LightingPass.Record(m_Context, commandBuffer, imageIndex, renderImage, m_pScene, m_pCamera);

			// Transition the current Render Image to be used in the compute shader
			renderImage.TransitionLayout(commandBuffer,
				VK_IMAGE_LAYOUT_GENERAL,
				VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT, VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT,
				VK_ACCESS_2_SHADER_READ_BIT, VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT,
				0, 1, 0, 1);
		}

		// -- Blit Pass --
		{
			// The blit pass will blit the rendered image to the swapchain and potentially do post-processing.
			m_BlitPass.RecordCompute(m_Context, commandBuffer, imageIndex, renderImage);

			// Insert a barrier for the Render Image to be used in fragment
			renderImage.TransitionLayout(commandBuffer,
				VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL,
				VK_ACCESS_2_SHADER_READ_BIT, VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT,
				VK_ACCESS_2_SHADER_READ_BIT, VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT,
				0, 1, 0, 1);
			// Transition the current Present Image to be written to
			presentImage.TransitionLayout(commandBuffer,
				VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL,
				VK_ACCESS_2_NONE, VK_PIPELINE_STAGE_2_NONE,
				VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT, VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT,
				0, 1, 0, 1);

			m_BlitPass.RecordGraphic(m_Context, commandBuffer, imageIndex, presentImage, m_pCamera);

			// At last, transition the current Present Image to be presented
			presentImage.TransitionLayout(commandBuffer,
				VK_IMAGE_LAYOUT_PRESENT_SRC_KHR,
				VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT, VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT,
				VK_ACCESS_2_NONE, VK_PIPELINE_STAGE_2_NONE, 0, 1, 0, 1);
		}
	}
	commandBuffer.End();
}
```
</div>
<br>

Going another level deeper, here is then our look at the 'Render' function of the Depth Pre-Pass Stage.
<div class="vp-doc">

```cpp
void pom::DepthPrePass::Record(const Context& context, CommandBuffer& commandBuffer, const GeometryPass& gPass, uint32_t imageIndex, const Image& depthImage, const Scene* pScene, Camera* pCamera) const
{
	// -- Update Vertex UBO --
	UniformBufferVS ubo;
	ubo.view = pCamera->GetViewMatrix();
	ubo.proj = pCamera->GetProjectionMatrix();
	vmaCopyMemoryToAllocation(context.allocator, &ubo, m_vUniformBuffers[imageIndex].GetMemoryHandle(), 0, sizeof(ubo));

	// -- Set Up Attachments --
	VkRenderingAttachmentInfo depthAttachment{};
	depthAttachment.sType = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO;
	depthAttachment.imageView = depthImage.GetView().GetHandle();
	depthAttachment.imageLayout = depthImage.GetCurrentLayout();
	depthAttachment.loadOp = VK_ATTACHMENT_LOAD_OP_CLEAR;
	depthAttachment.storeOp = VK_ATTACHMENT_STORE_OP_STORE;
	depthAttachment.clearValue.depthStencil = { .depth = 1.0f, .stencil = 0 };

	// -- Render Info --
	VkRenderingInfo renderingInfo{};
	renderingInfo.sType = VK_STRUCTURE_TYPE_RENDERING_INFO;
	renderingInfo.renderArea = VkRect2D{ VkOffset2D{0, 0}, depthImage.GetExtent2D() };
	renderingInfo.layerCount = 1;
	renderingInfo.pDepthAttachment = &depthAttachment;

	// -- Render --
	const VkCommandBuffer& vCmdBuffer = commandBuffer.GetHandle();
	Debugger::BeginDebugLabel(commandBuffer, "Depth Pre-Pass", glm::vec4(0.6f, 0.2f, 0.8f, 1));
	vkCmdBeginRendering(vCmdBuffer, &renderingInfo);
	{
		// -- Set Dynamic Viewport --
		VkViewport viewport;
		viewport.x = 0.0f;
		viewport.y = 0.0f;
		viewport.width = static_cast<float>(depthImage.GetExtent2D().width);
		viewport.height = static_cast<float>(depthImage.GetExtent2D().height);
		viewport.minDepth = 0.0f;
		viewport.maxDepth = 1.0f;
		Debugger::InsertDebugLabel(commandBuffer, "Bind Viewport", glm::vec4(0.2f, 1.f, 0.2f, 1.f));
		vkCmdSetViewport(vCmdBuffer, 0, 1, &viewport);

		// -- Set Dynamic Scissors --
		VkRect2D scissor;
		scissor.offset = { .x = 0, .y = 0 };
		scissor.extent = depthImage.GetExtent2D();
		Debugger::InsertDebugLabel(commandBuffer, "Bind Scissor", glm::vec4(1.f, 1.f, 0.2f, 1.f));
		vkCmdSetScissor(vCmdBuffer, 0, 1, &scissor);

		// -- Bind Descriptor Sets --
		Debugger::InsertDebugLabel(commandBuffer, "Bind Uniform Buffer", glm::vec4(0.f, 1.f, 1.f, 1.f));
		vkCmdBindDescriptorSets(vCmdBuffer, VK_PIPELINE_BIND_POINT_GRAPHICS, m_PipelineLayout.GetHandle(), 0, 1, &m_vUniformDS[imageIndex].GetHandle(), 0, nullptr);

		Debugger::InsertDebugLabel(commandBuffer, "Bind Textures", glm::vec4(0.f, 1.f, 1.f, 1.f));
		vkCmdBindDescriptorSets(vCmdBuffer, VK_PIPELINE_BIND_POINT_GRAPHICS, m_PipelineLayout.GetHandle(), 1, 1, &gPass.GetTexturesDescriptorSet().GetHandle(), 0, nullptr);

		// -- Bind Pipeline --
		Debugger::InsertDebugLabel(commandBuffer, "Bind Pipeline (Depth PrePass)", glm::vec4(0.2f, 0.4f, 1.f, 1.f));
		vkCmdBindPipeline(vCmdBuffer, VK_PIPELINE_BIND_POINT_GRAPHICS, m_Pipeline.GetHandle());

		// -- Draw Models --
		for (const Model& model : pScene->GetModels())
		{
			// -- Bind Model Data --
			model.Bind(commandBuffer);

			// -- Draw Opaque --
			for (const Mesh& mesh : model.opaqueMeshes)
			{
				// -- Bind Push Constants --
				Debugger::InsertDebugLabel(commandBuffer, "Push Constants", glm::vec4(1.f, 0.6f, 0.f, 1.f));
				PCModelDataVS pcvs
				{
					.model = mesh.matrix
				};
				vkCmdPushConstants(vCmdBuffer, m_PipelineLayout.GetHandle(), VK_SHADER_STAGE_VERTEX_BIT, 0,
					sizeof(PCModelDataVS), &pcvs);

				glm::uvec3 pcfs
				{
					/*.diffuseIdx*/ mesh.material.albedoIdx,
					/*.opacityIdx*/ mesh.material.opacityIdx,
					/*.textureCount*/ gPass.GetBoundTextureCount(),
				};
				vkCmdPushConstants(vCmdBuffer, m_PipelineLayout.GetHandle(), VK_SHADER_STAGE_FRAGMENT_BIT, sizeof(PCModelDataVS),
					sizeof(pcfs), &pcfs);

				// -- Drawing Time! --
				vkCmdDrawIndexed(vCmdBuffer, mesh.indexCount, 1, mesh.indexOffset, mesh.vertexOffset, 0);
				Debugger::InsertDebugLabel(commandBuffer, "Draw Opaque Mesh - " + mesh.name, glm::vec4(0.4f, 0.8f, 1.f, 1.f));
			}
		}
	}
	vkCmdEndRendering(vCmdBuffer);
	Debugger::EndDebugLabel(commandBuffer);
}
```
</div>

## Auto Exposure

Automatic adjustment of the Exposure Value based on the average luminance, which is computed using compute shaders.

<div style="max-width: 75%; margin: 24px auto; ">
<div style="padding:56.25% 0 0 0;position:relative;">
  <iframe src="/images/Pompeii/autoexp.mp4" frameborder="0" allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="border: 3px solid #42b883; border-radius: 15px; position:absolute;top:0;left:0;width:100%;height:100%;" title="gameplay footage prototype" referrerpolicy="strict-origin-when-cross-origin"></iframe>
</div>
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

## Shaders

final fragment shader in the Blit Pass. Here I receive the HDR Image produced by the lighting pass, and I apply (auto) exposure and tonemapping to convert the image back to LDR, ready for presentation.
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

<SkillCard
    title="Graphics Programming Teachers at Howest University - DAE"
    fallback="GraduationCap"
    hoverEffect="true"
/>
<a href="https://vulkan-tutorial.com" target="_blank" style="text-decoration: none;">
  <SkillCard
    title="The Vulkan Tutorial"
    fallback="BookOpen"
    hoverEffect="true"
  />
</a>
<a href="https://casual-effects.com/data" target="_blank" style="text-decoration: none;">
<SkillCard
    title="Morgan McGuire's Computer Graphics Archive"
    fallback="Database"
    hoverEffect="true"
/>
</a>
<a href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main" target="_blank" style="text-decoration: none;">
<SkillCard
    title="Khronos Group's glTF Sample Assets"
    fallback="Package"
    hoverEffect="true"
/>
</a>
<a href="https://learnopengl.com" target="_blank" style="text-decoration: none;">
<SkillCard
    title="OpenGL's Tutorials at Learn OpenGL"
    fallback="Code"
    hoverEffect="true"
/>
</a>
<a href="https://github.com/Kobazaaa/PompeiiResources.git" target="_blank" style="text-decoration: none;">
<SkillCard
    title="Pompeii Resources Repository"
    fallback="FolderSymlink"
    hoverEffect="true"
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
