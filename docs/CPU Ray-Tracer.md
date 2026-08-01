---
layout: home

hero:
  name: CPU Ray-Tracer
  tagline: A software ray-tracer built from scratch to dive deep into graphics programming, master the math behind it, and experiment with rendering concepts.
  actions:
    - theme: alt
      text: View on GitHub
      link: https://github.com/Kobazaaa/GP1_Raytracer
---

<div class="page-wrapper">

## Features

<FeatureList
  :features="[  
    {
      title: 'Anti-Aliasing',
      icon: 'Feather',
      description: 'Smooths jagged edges using multi-sampling for cleaner visuals.'
    },
    {
      title: 'Reflections',
      icon: 'FlipHorizontal',
      description: 'Accurately reflects rays off reflecting and smooth objects.'
    },
    {
      title: 'Post-Processing',
      icon: 'Sliders',
      description: 'Applies effects like vignette, gamma correction, and film grain after rendering.'
    },
    {
      title: 'Depth of Field',
      icon: 'Camera',
      description: 'Simulates camera-style blur based on distance from the focal plane.'
    },
    {
      title: 'Skyboxes',
      icon: 'Cloud',
      description: 'Renders a beautiful skybox around the environment.'
    },
    {
      title: 'Textures',
      icon: 'Grid',
      description: 'Supports simple texture mapping for meshes.'
    },
    {
      title: 'BVH Optimization',
      icon: 'Layers',
      description: 'Accelerates ray intersections using bounding volume hierarchies to reduce complexity.'
    },
    {
      title: 'Debug Tools',
      icon: 'Search',
      description: 'Visual overlays and toggles for inspecting BVH nodes, lighting modes, and more.'
    }
  ]"
  :columns="3"/>

<div style="max-width: 65%; margin: 24px auto;">
<Carrousel
  :images="[
    '/images/SoftwareRaytracer/Reflections.png',
    '/images/SoftwareRaytracer/Truck.png',
    '/images/SoftwareRaytracer/dragonRenderFinal.png',
    '/images/SoftwareRaytracer/Skybox.png',
    '/images/SoftwareRaytracer/TexturesFinal.png',
  ]"
/>

</div>
<br>
This is the 'main' render function. The one that gets called for every pixel visible. It is multi-threaded since there is no dependency from one pixel on another.
I calculate the center coordinate of the pixel, convert to Normalized Device Coordinates (NDC) and then "shoot" the ray into the screen, calculating what it collides and how it reacts, to finally end up with the final color of the pixel.
<div class="vp-doc">

```cpp
void Renderer::RenderPixel(Scene* pScene, uint32_t pixelIndex, float fov, float aspectRatio, const Matrix& cameraToWorld, const Vector3& cameraOrigin, const float focalDist) const
{
	auto& materials = pScene->GetMaterials();
	auto& lights	= pScene->GetLights();

	const uint32_t px{ pixelIndex % m_Width };
	const uint32_t py{ pixelIndex / m_Width };

	// Change the color (default black)
	ColorRGB finalColor{0, 0, 0};

	// HitRecord contains more information about a potential hit
	HitRecord closestHit{};
	Ray viewRay{};

	//  Go over every ray in each pixel (for loops will loop only once if AA is disabled)
	for (int rowIdx{}; rowIdx < (m_AntiAliasingEnabled ? m_AAPixelRows : 1); ++rowIdx)
	{
		for (int colIdx{}; colIdx < (m_AntiAliasingEnabled ? m_AAPixelCols : 1); ++colIdx)
		{
			// Calculate the offset within the pixel (middle of each cell of the pixel)
			float xOffset = (colIdx + 0.5f) / (m_AntiAliasingEnabled ? m_AAPixelRows : 1);
			float yOffset = (rowIdx + 0.5f) / (m_AntiAliasingEnabled ? m_AAPixelCols : 1);

			Vector3 pixelSample = { px + xOffset,
									py + yOffset,
									0.f };

			// Converting screen space coordinates to NDC
			float x = (2 * ((pixelSample.x) / m_Width) - 1) * fov * aspectRatio;
			float y = (1 - 2 * ((pixelSample.y) / m_Height)) * fov;
			Vector3 rayDirection = Vector3{ x, y, 1 };
			rayDirection = rayDirection.Normalized();

			// Transforming the viewDirection from camera space to world space
			rayDirection = cameraToWorld.TransformVector(rayDirection);

			// Sample multiple rays if DoF is enabled
			for (int dofSampleIdx{}; dofSampleIdx < (m_DepthOfFieldEnabled ? m_DoFSamples : 1); ++dofSampleIdx)
			{
				// Sample a random ray if DoF is enabled, but we aren't the first sample
				if (m_DepthOfFieldEnabled and dofSampleIdx != 0)
				{
					Vector3 right	= cameraToWorld.GetAxisX();
					Vector3 up		= cameraToWorld.GetAxisY();
					Vector3 forward = cameraToWorld.GetAxisZ();

					// Calculate the focal point
					Vector3 focalPoint = cameraOrigin + focalDist * rayDirection;

					// Get a random new position within the camera plane
					uint32_t seed = (pixelIndex + 1585) * (pixelIndex + 874552) * (dofSampleIdx + 1) * ((rowIdx + 15) * (colIdx - 58) + 15485) * (colIdx + 1);
					Vector3 randVec = Vector3::RandomVecInUnitDisk(seed);
					randVec /= m_DoFAperture;

					// Calculate the new ray origin
					Vector3 offset = right * randVec.x + up * randVec.y;
					Vector3 newOrigin = cameraOrigin + offset;

					// Calculate this sample's direction towards the focal point
					Vector3 newDir = (focalPoint - newOrigin).Normalized();

					// Ray going from the offset origin to the focal point
					viewRay = { newOrigin, newDir };
				}
				// If DoF is disabled, or we are the first sample, make the viewray the default ray without offsets
				else if (!m_DepthOfFieldEnabled or dofSampleIdx == 0)
				{
					// Ray going from the origin of the camera to the center of each pixel cell
					viewRay = { cameraOrigin, rayDirection };
				}
				pScene->GetClosestHit(viewRay, closestHit);

				if (closestHit.didHit)
				{
					// If we hit something, cast a new ray from the HitOrigin to every light in the scene, if that ray
					// hits another object, we need to cast a shadow (multiply the color by 0.5f)
					for (int lightIndex{}; lightIndex < lights.size(); ++lightIndex)
					{
						Vector3 lightDirection;
						Ray		lightRay;
						if (lights[lightIndex].type == LightType::Point)
						{
							lightDirection = { LightUtils::GetDirectionToLight(lights[lightIndex], closestHit.origin) };
							float	rayMaxValue = lightDirection.Normalize();
							lightRay = { closestHit.origin + closestHit.normal * 0.001f, lightDirection, 0.0001f, rayMaxValue };
						}
						else
						{
							lightDirection = { -lights[lightIndex].direction.Normalized() };
							lightRay = { closestHit.origin + closestHit.normal * 0.001f, lightDirection };
						}

						// If the ray from the point to our light hit something while shadows are enabled, skip this light (we are in shadow)
						if (m_ShadowsEnabled and pScene->DoesHit(lightRay)) continue;
						// If our point is not within the observable area of our light, skip this light
						float observedArea = Vector3::Dot(closestHit.normal, lightDirection);
						if (observedArea <= 0.f) continue;

						if (m_CurrentLightingMode == LightingMode::ObservedArea)
						{
							finalColor.r += observedArea;
							finalColor.g += observedArea;
							finalColor.b += observedArea;
						}
						else if (m_CurrentLightingMode == LightingMode::Radiance)
						{
							finalColor += LightUtils::GetRadiance(lights[lightIndex], closestHit.origin);
						}
						else if (m_CurrentLightingMode == LightingMode::BRDF)
						{
							finalColor += materials[closestHit.materialIndex]->Shade(closestHit, lightDirection, viewRay.direction, pScene, m_Bounces);
						}
						else if (m_CurrentLightingMode == LightingMode::Combined)
						{
							const ColorRGB RADIANCE = LightUtils::GetRadiance(lights[lightIndex], closestHit.origin);
							const ColorRGB BRDF = materials[closestHit.materialIndex]->Shade(closestHit, lightDirection, viewRay.direction, pScene, m_Bounces);

							finalColor += RADIANCE * BRDF * observedArea;
						}
					}
				}
				else
				{
					finalColor += pScene->GetBackgroundColor(viewRay.direction);
				}
			}
		}
	}

	// Average Color
	if (m_AntiAliasingEnabled) finalColor /= static_cast<float>(m_AAPixelCols * m_AAPixelRows);
	if (m_DepthOfFieldEnabled) finalColor /= static_cast<float>(m_DoFSamples);

	//Update Color in Buffer
	finalColor.MaxToOne();

	// Check if we need to color the selected pixel
	if (m_Select)
	{
		if (m_SelectPixelX == px and m_SelectPixelY == py ||
			m_SelectPixelX == px and m_SelectPixelY + 1 == py ||
			m_SelectPixelX == px and m_SelectPixelY - 1 == py ||
			m_SelectPixelX - 1 == px and m_SelectPixelY == py ||
			m_SelectPixelX + 1 == px and m_SelectPixelY == py)
		{
			finalColor = m_SelectColor;
		}
	}

	ColorRGB vignette	= CalculateVignetteFactor(px, py, aspectRatio);
	ColorRGB noise		= CalculateNoise();

	ColorRGB endColor;
	endColor = finalColor * vignette + noise;

	ApplyGamma(endColor);

	endColor.MaxToOne();

	{
		if (m_DebugBVHMode == 1)
		{
			endColor.r = viewRay.triCalcs / float(m_TriCalcLimit);
			endColor.g = viewRay.triCalcs / float(m_TriCalcLimit);
			endColor.b = viewRay.triCalcs / float(m_TriCalcLimit);
			if (viewRay.triCalcs > m_TriCalcLimit) endColor = colors::Red;
			if (viewRay.triCalcs == 0) endColor = colors::Gray;
		}
		if (m_DebugBVHMode == 2)
		{
			// DEBUG BVH CALS VIS
			endColor.r = viewRay.aabbCalcs / float(m_BVHCalcLimit);
			endColor.g = viewRay.aabbCalcs / float(m_BVHCalcLimit);
			endColor.b = viewRay.aabbCalcs / float(m_BVHCalcLimit);
			if (viewRay.aabbCalcs > m_BVHCalcLimit) endColor = colors::Red;
			if (viewRay.aabbCalcs == 1) endColor = colors::Gray;
		}
	}

	m_pBufferPixels[px + (py * m_Width)] = SDL_MapRGB(m_pBuffer->format,
		static_cast<uint8_t>(endColor.r * 255),
		static_cast<uint8_t>(endColor.g * 255),
		static_cast<uint8_t>(endColor.b * 255));
}
```
</div>

## Optimizations

Several optimizations have been applied to improve the Software Ray-Tracer, as they tend to be slow by default.
<br><br>

For efficient ray-triangle intersection calculations, I used the [**Möller–Trumbore**](https://en.wikipedia.org/wiki/Möller–Trumbore_intersection_algorithm#:~:text=The%20Möller–Trumbore%20ray-triangle,the%20plane%20containing%20the%20triangle.) algorithm.

Another clear performance boost is multi-threading the process for faster computations, which can easily be done using the C++ STL.


To improve the renderer even further, I implemented Bounding Volume Hierarchies (BVH) to reduce the amount of expensive ray-triangle intersection calculations, replacing them with simpler ray-AABB intersections. The following scene has nearly 300K triangles. Without BVH optimization, this would render extremely slowly. Thanks to BVH, it runs relatively smooth on the CPU. The GitHub README has a more in-depth look at how this works.
<br><br>

Here are some code samples of how the BVH was implemented:
<br>

First, the base BVH Node struct. This struct holds the information of a node. As the comment explains, the leftFirstIndex stores either the index of the node's left childs or the index of the first triangle. We don't need to store the right child's index, as that is leftFirstIndex + 1. And since a node either has children or triangles, and never both, we can combine it as one variable to save some space and have a neat memory alignment of 32 bytes.

<div class="vp-doc">

```cpp
// Each BVH Node is 32 bytes
struct BVHNode
{
    AABB nodeBounds;            // 3 x 4 bytes = 24 bytes
    uint32_t leftFirstIndex;    // 4 bytes                  // stores either the index of the left child or of the first triangle
    uint32_t triCount;          // 4 bytes

    bool IsLeaf() const { return triCount > 0; }
};
```
</div>
<br>
Second, we need to still do ray-mesh hit tests to know when a ray hits something. If the current node is a lead node, we do a ray-triangle intersection test with all triangle of that node to calculate the closest triangle and point. If the node is not a leaf, we recursevily check the left and right child of said node.
<div class="vp-doc">

```cpp
inline bool HitTest_TriangleMesh(const TriangleMesh& mesh, const int nodeIdx, const Ray& ray, HitRecord& hitRecord, bool ignoreHitRecord = false)
{
    const BVHNode& node = mesh.bvhNodes[nodeIdx];

    // If we are the root node, check if the ray hit's the root node AABB
    // This is only done for the root node, since for any subsequent children, this check is checked beforehand
    if (nodeIdx == 0 && HitTest_AABB(node.nodeBounds, ray) >= FLT_MAX - 1)
        return false;

	// If we are a leaf, check for the closest triangle hit
	if (node.IsLeaf())
	{
		HitRecord newClosestHit{};
		int closestIndex = -1;
		for (int triIdxOffset{}; triIdxOffset < node.triCount; ++triIdxOffset)
		{
			const int triIdx = (node.leftFirstIndex + triIdxOffset);
			const int triIdxPos = 3 * triIdx;

			const int v0Idx = mesh.indices[triIdxPos + 0];
			const int v1Idx = mesh.indices[triIdxPos + 1];
			const int v2Idx = mesh.indices[triIdxPos + 2];

			Triangle triangle(mesh.transformedPositions[v0Idx]
							, mesh.transformedPositions[v1Idx]
							, mesh.transformedPositions[v2Idx]
							, mesh.transformedNormals[triIdx]);
			triangle.cullMode = mesh.cullMode;
			triangle.materialIndex = mesh.materialIndex;


			// Calculate closest triangle hit
			GeometryUtils::HitTest_Triangle(triangle, ray, newClosestHit);
			if (!newClosestHit.didHit) continue;
			if (newClosestHit.t < hitRecord.t)
			{
				hitRecord = newClosestHit;
				closestIndex = triIdx;
			}
		}
		if(closestIndex != -1 and !ignoreHitRecord)
            mesh.CalculateUV(closestIndex, hitRecord);
		return hitRecord.didHit;
	}
    // if we are not a leaf node
	else
	{
		bool hitLeft = false;
		bool hitRight = false;

        // Calculate the distance from our ray to each of the children's bounding boxes
		const BVHNode& leftChildNode  = mesh.bvhNodes[node.leftFirstIndex];
		const float distLeft = HitTest_AABB(leftChildNode.nodeBounds, ray);

		const BVHNode& rightChildNode = mesh.bvhNodes[node.leftFirstIndex + 1];
		const float distRight = HitTest_AABB(rightChildNode.nodeBounds, ray);

		// If the left child is closer, check that one first
		if (distLeft < distRight)
		{
			// only actually check the bounding boxes if they're closer than anything else we've encountered
			if (distLeft < hitRecord.t) hitLeft = HitTest_TriangleMesh(mesh, node.leftFirstIndex, ray, hitRecord, ignoreHitRecord);
			if (distRight < hitRecord.t) hitRight = HitTest_TriangleMesh(mesh, node.leftFirstIndex + 1, ray, hitRecord, ignoreHitRecord);
			return hitLeft or hitRight;
		}
		// else check the right child first;
		else
		{
			// only actually check the bounding boxes if they're closer than anything else we've encountered
			if (distRight < hitRecord.t) hitRight = HitTest_TriangleMesh(mesh, node.leftFirstIndex + 1, ray, hitRecord, ignoreHitRecord);
			if (distLeft < hitRecord.t) hitLeft = HitTest_TriangleMesh(mesh, node.leftFirstIndex, ray, hitRecord, ignoreHitRecord);
			return hitLeft or hitRight;
		}
	}
}
```
</div>


## BVH Visualizations

<div style="max-width: 80%; margin: 24px auto;">
<ImageSlider
  :images="[
    { src: '/images/SoftwareRaytracer/FinalRender.png', title: 'Pre Post-Processing' },
    { src: '/images/SoftwareRaytracer/BVHCalc.png', title: 'BVH Visualization' },
    { src: '/images/SoftwareRaytracer/TriangleCalc.png', title: 'Triangle Visualization' },
    { src: '/images/SoftwareRaytracer/FinalRenderPostProc.png', title: 'Final Render' }
  ]"
/>
</div>

### Understanding the Visualizations

In the BVH Visualization tab, the whiter the area, the closer to 180 ray-aabb intersection calculations are happening for that pixel. Red means it's doing more than 180, which might seem high, but ray-AABB is relatively cheap to compute.
<br><br>
On the other hand, the Triangle Visualization tab shows how many ray-triangle intersection calculations are happening per pixel. The whiter the pixel, the closer it is to 20 calculations, and red means more. These calculations are more expensive, so it's ideal to keep them low.

</div>
