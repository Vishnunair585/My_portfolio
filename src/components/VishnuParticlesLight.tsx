
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERTEX_SHADER = `
precision highp float;

attribute vec2 aUV;
attribute float aRandom;

uniform sampler2D uImage;

uniform float uTime;
uniform float uProgress;
uniform float uImageAspect;
uniform float uSpread;
uniform float uMouseStrength;
uniform vec2 uMouse;

varying float vStrength;
varying vec3 vColor;

void main() {

  vec4 pixel =
    texture2D(
      uImage,
      aUV
    );
  
  vColor = pixel.rgb;

  float luminance =
    dot(
      pixel.rgb,
      vec3(
        0.2126,
        0.7152,
        0.0722
      )
    );

  float imageAlpha =
    pixel.a;

  /*
   * Portrait coordinates.
   */
  vec2 p =
    vec2(
      (aUV.x - 0.5) *
        uImageAspect,

      (aUV.y - 0.5)
    );

  /*
   * Organic floating motion drastically reduced
   * to ensure 1080p crystal-clear alignment.
   */
  float movementX =
    sin(
      uTime * 0.8 +
      aRandom * 17.0
    );

  float movementY =
    cos(
      uTime * 0.65 +
      aRandom * 23.0
    );

  p.x +=
    movementX *
    uSpread *
    0.0005;

  p.y +=
    movementY *
    uSpread *
    0.0005;

  /*
   * Tiny depth movement.
   */
  float depth =
    sin(
      aRandom * 30.0 +
      uTime
    ) *
    0.015;

  /*
   * Cursor repulsion with aesthetic swirl.
   */
  vec2 delta =
    p - uMouse;

  float distanceToMouse =
    length(delta);

  float force =
    smoothstep(
      0.45,
      0.0,
      distanceToMouse
    );

  if (
    distanceToMouse >
    0.001
  ) {
    vec2 dir = normalize(delta);
    vec2 tangent = vec2(-dir.y, dir.x);
    
    // Smooth, aesthetic, and gentle swirling dispersion
    p += (dir * 0.015 + tangent * 0.02) * force * uMouseStrength;
    depth += force * uMouseStrength * 0.05;
  }

  /*
   * Smooth aesthetic transition from top right (1,1) to bottom left (0,0)
   */
  float delay = (2.0 - aUV.x - aUV.y) * 0.5; // 0.0 top-right, 1.0 bottom-left
  float localProgress = clamp((uProgress - delay) * 3.0, 0.0, 1.0);
  float easeProgress = 1.0 - pow(1.0 - localProgress, 3.0); // cubic ease out
  
  // Fly in from top right corner
  vec2 startPos = vec2(1.5, 1.5);
  p = mix(startPos, p, easeProgress);
  depth *= easeProgress;

  vec3 position =
    vec3(
      p,
      depth
    );

  vec4 mvPosition =
    modelViewMatrix *
    vec4(
      position,
      1.0
    );

  gl_Position =
    projectionMatrix *
    mvPosition;

  /*
   * Keep all parts of the image solid.
   * Do not fade out light or dark areas.
   * Multiply by easeProgress for transition.
   */
  vStrength = imageAlpha * easeProgress;

  /*
   * Consistent, pixel-perfect particle size.
   */
  gl_PointSize = 1.8 * (1.0 + force * 2.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying float vStrength;
varying vec3 vColor;

void main() {

  /*
   * Soft circular particle.
   */
  vec2 p =
    gl_PointCoord -
    vec2(0.5);

  float d =
    length(p);

  float soft =
    1.0 -
    smoothstep(
      0.05,
      0.5,
      d
    );

  if (
    soft < 0.02 ||
    vStrength < 0.03
  ) {
    discard;
  }

  /*
   * Use EXACTLY original image colors for 100% accuracy.
   */
  vec3 particleColor = vColor;

  gl_FragColor =
    vec4(
      particleColor,
      soft * vStrength
    );
}
`;

export default function VishnuParticlesLight({ src }: { src: string }) {

  const containerRef =
    useRef<HTMLDivElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const container =
      containerRef.current;

    const canvas =
      canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    let disposed = false;

    let animationId = 0;

    /*
     * THREE SCENE
     */
    const scene =
      new THREE.Scene();

    /*
     * CAMERA
     */
    const camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        -10,
        10
      );

    camera.position.z = 2;

    /*
     * TRANSPARENT WEBGL CANVAS
     *
     * The background is provided
     * by the wrapper, NOT WebGL.
     */
    const renderer =
      new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference:
          "high-performance",
      });

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

    renderer.setClearColor(
      0x000000,
      0
    );

    /*
     * IMAGE LOADER
     */
    const loader =
      new THREE.TextureLoader();

    loader.setCrossOrigin(
      "anonymous"
    );

    const texture =
      loader.load(
        src,
        (loadedTexture) => {

          if (disposed) {
            return;
          }

          loadedTexture.colorSpace =
            THREE.SRGBColorSpace;

          loadedTexture.minFilter =
            THREE.LinearFilter;

          loadedTexture.magFilter =
            THREE.LinearFilter;

          loadedTexture.generateMipmaps =
            false;

          const image = loadedTexture.image as HTMLImageElement;

          const imageWidth =
            image.width;

          const imageHeight =
            image.height;

          const imageAspect =
            imageWidth /
            imageHeight;

          /*
           * PARTICLE RESOLUTION
           * Massive resolution for true 1080p accuracy.
           */
          const maxDimension =
            800;

          const scale =
            Math.min(
              1,
              maxDimension /
                Math.max(
                  imageWidth,
                  imageHeight
                )
            );

          const width =
            Math.max(
              1,
              Math.floor(
                imageWidth * scale
              )
            );

          const height =
            Math.max(
              1,
              Math.floor(
                imageHeight * scale
              )
            );

          /*
           * OFFSCREEN SAMPLING CANVAS
           */
          const sampleCanvas =
            document.createElement(
              "canvas"
            );

          sampleCanvas.width =
            width;

          sampleCanvas.height =
            height;

          const ctx =
            sampleCanvas.getContext(
              "2d",
              {
                willReadFrequently:
                  true,
              }
            );

          if (!ctx) {
            return;
          }

          ctx.clearRect(
            0,
            0,
            width,
            height
          );

          ctx.drawImage(
            image,
            0,
            0,
            width,
            height
          );

          const imageData =
            ctx.getImageData(
              0,
              0,
              width,
              height
            );

          const data =
            imageData.data;

          /*
           * PARTICLE DATA
           */
          const uvData: number[] = [];

          const randomData: number[] = [];

          /*
           * SAMPLE TRANSPARENT PNG
           */
          for (
            let y = 0;
            y < height;
            y++
          ) {

            for (
              let x = 0;
              x < width;
              x++
            ) {

              const i =
                (y * width + x) *
                4;

              const alpha =
                data[i + 3];

              /*
               * Transparent pixels
               * are ignored.
               */
              if (alpha < 35) {
                continue;
              }

              const luminance =
                (
                  0.2126 *
                    data[i] +

                  0.7152 *
                    data[i + 1] +

                  0.0722 *
                    data[i + 2]
                ) / 255;

              /*
               * Keep all particles
               * for full clarity and accuracy.
               */
              const keepProbability = 1.0;

              if (
                Math.random() >
                keepProbability
              ) {
                continue;
              }

              uvData.push(
                x / (width - 1),
                1 -
                  y /
                    (height - 1)
              );

              randomData.push(
                Math.random()
              );
            }
          }

          /*
           * GEOMETRY
           */
          const geometry =
            new THREE.BufferGeometry();

          geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
              new Float32Array(
                (uvData.length / 2) * 3
              ),
              3
            )
          );

          geometry.setAttribute(
            "aUV",
            new THREE.Float32BufferAttribute(
              new Float32Array(
                uvData
              ),
              2
            )
          );

          geometry.setAttribute(
            "aRandom",
            new THREE.Float32BufferAttribute(
              new Float32Array(
                randomData
              ),
              1
            )
          );

          /*
           * UNIFORMS
           */
          const uniforms = {

            uImage: {
              value:
                loadedTexture,
            },

            uTime: {
              value: 0,
            },

            uImageAspect: {
              value:
                imageAspect,
            },

            uProgress: {
              value: 0.0,
            },

            uSpread: {
              value: 1.0,
            },

            uMouseStrength: {
              value: 0.0,
            },

            uMouse: {
              value:
                new THREE.Vector2(
                  10,
                  10
                ),
            },
          };

          /*
           * SHADER MATERIAL
           *
           * NormalBlending is used
           * instead of AdditiveBlending
           * for dark particles.
           */
          const material =
            new THREE.ShaderMaterial({

              uniforms,

              vertexShader:
                VERTEX_SHADER,

              fragmentShader:
                FRAGMENT_SHADER,

              transparent: true,

              depthWrite: false,

              blending:
                THREE.NormalBlending,
            });

          /*
           * PARTICLE SYSTEM
           */
          const particles =
            new THREE.Points(
              geometry,
              material
            );

          scene.add(
            particles
          );

          /*
           * MOUSE
           */
          const mouseTarget =
            new THREE.Vector2(
              10,
              10
            );

          const mouseCurrent =
            new THREE.Vector2(
              10,
              10
            );

          /*
           * RESIZE
           */
          const resize = () => {

            const w =
              Math.max(
                1,
                container.clientWidth
              );

            const h =
              Math.max(
                1,
                container.clientHeight
              );

            const aspect =
              w / h;

            renderer.setSize(
              w,
              h,
              false
            );

            /*
             * Preserve the original
             * portrait aspect ratio.
             */
            const halfHeight =
              Math.max(
                0.5,
                (imageAspect /
                  aspect) *
                  0.5
              );

            const halfWidth =
              halfHeight *
              aspect;

            camera.left =
              -halfWidth;

            camera.right =
              halfWidth;

            camera.top =
              halfHeight;

            camera.bottom =
              -halfHeight;

            camera.updateProjectionMatrix();
          };

          /*
           * POINTER
           */
          const onPointerMove =
            (event: PointerEvent) => {

              const rect =
                canvas.getBoundingClientRect();

              const nx =
                (event.clientX -
                  rect.left) /
                rect.width;

              const ny =
                1 -
                (
                  event.clientY -
                  rect.top
                ) /
                  rect.height;

              const aspect =
                rect.width /
                rect.height;

              const halfHeight =
                Math.max(
                  0.5,
                  (imageAspect /
                    aspect) *
                    0.5
                );

              const halfWidth =
                halfHeight *
                aspect;

              mouseTarget.set(
                (nx - 0.5) *
                  2 *
                  halfWidth,

                (ny - 0.5) *
                  2 *
                  halfHeight
              );
            };

          const onPointerLeave =
            () => {

              mouseTarget.set(
                10,
                10
              );
            };

          resize();

          const observer =
            new ResizeObserver(
              resize
            );

          observer.observe(
            container
          );

          canvas.addEventListener(
            "pointermove",
            onPointerMove
          );

          canvas.addEventListener(
            "pointerleave",
            onPointerLeave
          );

          /*
           * ANIMATION LOOP
           */
          const clock =
            new THREE.Clock();

          const animate = () => {

            if (disposed) {
              return;
            }

            animationId =
              requestAnimationFrame(
                animate
              );

            const delta =
              Math.min(
                clock.getDelta(),
                0.05
              );

            uniforms.uTime.value +=
              delta;

            // Animate transition from 0 to 1.5
            if (uniforms.uProgress.value < 1.5) {
              uniforms.uProgress.value += delta * 0.6;
            }

            mouseCurrent.lerp(
              mouseTarget,
              0.08
            );

            uniforms.uMouse.value.copy(
              mouseCurrent
            );

            const mouseDistance =
              mouseCurrent.length();

            uniforms.uMouseStrength.value =
              mouseDistance < 5
                ? 1.0
                : 0.0;

            renderer.render(
              scene,
              camera
            );
          };

          animate();

          /*
           * CLEANUP
           */
          return () => {

            observer.disconnect();

            canvas.removeEventListener(
              "pointermove",
              onPointerMove
            );

            canvas.removeEventListener(
              "pointerleave",
              onPointerLeave
            );

            geometry.dispose();

            material.dispose();

            loadedTexture.dispose();
          };
        }
      );

    return () => {

      disposed = true;

      cancelAnimationFrame(
        animationId
      );

      texture.dispose();

      renderer.dispose();
    };

  }, [src]);

  return (
    <div
      ref={containerRef}
      className="
        relative
        h-full
        w-full
        overflow-hidden
      "
    >
      <canvas
        ref={canvasRef}
        className="
          block
          h-full
          w-full
        "
      />
    </div>
  );
}
