import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

type FocusMode = 'all' | 'web' | 'voice' | 'automation';

// Module-level scratch math vectors to prevent runtime GC
const _targetCamPos = new THREE.Vector3();
const _scratchVec = new THREE.Vector3();
const _dummy = new THREE.Object3D();

export const ThreeHeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<FocusMode>('all');
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  // References to communicate with Three.js loop without re-renders
  const modeRef = useRef<FocusMode>('all');
  const userInteractingRef = useRef(false);

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Software-WebGL Probe (detect headless/software environments safely)
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3. Scene, Camera, & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060911, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.2, 7.5);

    // 4. Studio Environment Map (PMREMGenerator + RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0x93c5fd, 2.2);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc084fc, 1.4);
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.2);
    scene.add(hemiLight);

    // 6. Master Procedural Composite Subject: "Quantum Web & AI Core" (THREE.Group with 9 parts)
    const techCoreGroup = new THREE.Group();
    techCoreGroup.position.set(0, -0.6, 0);
    scene.add(techCoreGroup);

    // PART 1: Chamfered Hexagonal Server Pedestal Base (flush at ground)
    const baseGeo = new THREE.CylinderGeometry(2.3, 2.6, 0.45, 6);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.88,
      roughness: 0.22,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.22;
    techCoreGroup.add(baseMesh);

    // PART 2: Base Circuit Glow Ring
    const circuitRingGeo = new THREE.TorusGeometry(2.1, 0.035, 16, 64);
    const circuitRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const circuitRingMesh = new THREE.Mesh(circuitRingGeo, circuitRingMat);
    circuitRingMesh.rotation.x = Math.PI / 2;
    circuitRingMesh.position.y = 0.46;
    techCoreGroup.add(circuitRingMesh);

    // PART 3: Soft Radial Contact Shadow Disc (flush at ground y=0.01)
    const shadowGeo = new THREE.PlaneGeometry(6.5, 6.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 5, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    techCoreGroup.add(shadowMesh);

    // PART 4: Inner Quantum Crystalline Core (MeshPhysicalMaterial)
    const coreGeo = new THREE.OctahedronGeometry(0.9, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.82,
      opacity: isSoftwareGl ? 0.75 : 1.0,
      transparent: true,
    });
    const quantumCore = new THREE.Mesh(coreGeo, coreMat);
    quantumCore.position.y = 1.75;
    techCoreGroup.add(quantumCore);

    // PART 5: Dual Gyroscopic Orbital Gimbal Rings (Cobalt & Purple)
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.045, 16, 64);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.9,
      roughness: 0.18,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.position.y = 1.75;
    techCoreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.95, 0.04, 16, 64);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.92,
      roughness: 0.15,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.position.y = 1.75;
    techCoreGroup.add(ring2);

    // PART 6: Floating Holographic Web Interface Panel (Represents Website Dev)
    const webPanelGroup = new THREE.Group();
    webPanelGroup.position.set(0, 1.75, 1.3);

    // Procedural canvas texture for realistic floating browser code/wireframe
    const webCanvas = document.createElement('canvas');
    webCanvas.width = 256;
    webCanvas.height = 180;
    const wCtx = webCanvas.getContext('2d');
    if (wCtx) {
      wCtx.fillStyle = '#0f172a';
      wCtx.fillRect(0, 0, 256, 180);
      // Window header
      wCtx.fillStyle = '#1e293b';
      wCtx.fillRect(0, 0, 256, 30);
      wCtx.fillStyle = '#ef4444';
      wCtx.beginPath();
      wCtx.arc(15, 15, 4, 0, Math.PI * 2);
      wCtx.fill();
      wCtx.fillStyle = '#eab308';
      wCtx.beginPath();
      wCtx.arc(30, 15, 4, 0, Math.PI * 2);
      wCtx.fill();
      wCtx.fillStyle = '#22c55e';
      wCtx.beginPath();
      wCtx.arc(45, 15, 4, 0, Math.PI * 2);
      wCtx.fill();
      // Code lines
      wCtx.fillStyle = '#38bdf8';
      wCtx.fillRect(15, 45, 120, 8);
      wCtx.fillStyle = '#818cf8';
      wCtx.fillRect(25, 62, 160, 6);
      wCtx.fillRect(25, 76, 110, 6);
      wCtx.fillStyle = '#a78bfa';
      wCtx.fillRect(15, 95, 80, 8);
      // Interactive card wireframe
      wCtx.strokeStyle = '#3b82f6';
      wCtx.lineWidth = 1.5;
      wCtx.strokeRect(15, 115, 100, 48);
      wCtx.strokeRect(125, 115, 115, 48);
      wCtx.fillStyle = '#60a5fa';
      wCtx.fillRect(25, 128, 60, 6);
      wCtx.fillRect(135, 128, 70, 6);
    }
    const webTex = new THREE.CanvasTexture(webCanvas);
    webTex.colorSpace = THREE.SRGBColorSpace;
    webTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const webPanelGeo = new THREE.PlaneGeometry(1.6, 1.15);
    const webPanelMat = new THREE.MeshStandardMaterial({
      map: webTex,
      transparent: true,
      opacity: 0.88,
      roughness: 0.2,
      metalness: 0.3,
      side: THREE.DoubleSide,
    });
    const webPanelMesh = new THREE.Mesh(webPanelGeo, webPanelMat);
    webPanelGroup.add(webPanelMesh);

    // Beveled frame around web panel
    const frameGeo = new THREE.BoxGeometry(1.68, 1.22, 0.04);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.95,
      roughness: 0.1,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -0.025;
    webPanelGroup.add(frameMesh);
    techCoreGroup.add(webPanelGroup);

    // PART 7: AI Voice Acoustic Sphere with Sound Waves (Represents AI Call Agents)
    const voiceGroup = new THREE.Group();
    voiceGroup.position.set(0, 1.75, -1.3);

    const voiceOrbGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const voiceOrbMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.7,
      wireframe: true,
    });
    const voiceOrbMesh = new THREE.Mesh(voiceOrbGeo, voiceOrbMat);
    voiceGroup.add(voiceOrbMesh);

    // Concentric acoustic pulse rings
    const soundWave1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.02, 12, 36),
      new THREE.MeshBasicMaterial({ color: 0xc084fc })
    );
    soundWave1.rotation.y = Math.PI / 4;
    voiceGroup.add(soundWave1);

    const soundWave2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.05, 0.018, 12, 36),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.7 })
    );
    soundWave2.rotation.y = -Math.PI / 4;
    voiceGroup.add(soundWave2);

    techCoreGroup.add(voiceGroup);

    // PART 8: Orbiting Automation Satellite Nodes (InstancedMesh of 6 micro hubs)
    const nodeCount = 6;
    const nodeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
    });
    const nodeInstancedMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    techCoreGroup.add(nodeInstancedMesh);

    // PART 9: Ambient Floating Data Sparks (InstancedMesh of 35 particles)
    const sparkCount = 35;
    const sparkGeo = new THREE.TetrahedronGeometry(0.045, 0);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
    const sparkInstancedMesh = new THREE.InstancedMesh(sparkGeo, sparkMat, sparkCount);
    techCoreGroup.add(sparkInstancedMesh);

    const sparkData = Array.from({ length: sparkCount }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 5.5,
        0.5 + Math.random() * 3.5,
        (Math.random() - 0.5) * 5.5
      ),
      speedY: 0.2 + Math.random() * 0.3,
      rotSpeed: (Math.random() - 0.5) * 2,
    }));

    // Interactive Drag / Touch Controls
    let isPointerDown = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotY = 0;
    let currentRotY = 0;
    let targetRotX = 0;
    let currentRotX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isPointerDown = true;
      userInteractingRef.current = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isPointerDown) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - prevPointerX;
      const dy = clientY - prevPointerY;
      targetRotY += dx * 0.006;
      targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX + dy * 0.004));
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const onPointerUp = () => {
      isPointerDown = false;
      setTimeout(() => {
        userInteractingRef.current = false;
        setIsInteracting(false);
      }, 1200);
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 7. Animation Loop with Software-WebGL Pacing & Exponential Damping
    const clock = new THREE.Clock();
    let frameId = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Exponential damping for rotation
      const dampFactor = 1 - Math.exp(-6 * delta);
      currentRotY += (targetRotY - currentRotY) * dampFactor;
      currentRotX += (targetRotX - currentRotX) * dampFactor;

      // Auto-rotation when user is not manually dragging
      if (!userInteractingRef.current) {
        targetRotY += 0.28 * delta;
      }

      techCoreGroup.rotation.y = currentRotY;
      techCoreGroup.rotation.x = currentRotX;

      // Part micro-animations
      quantumCore.rotation.x = time * 0.6;
      quantumCore.rotation.y = time * 0.8;
      ring1.rotation.x = Math.PI / 3 + Math.sin(time * 0.8) * 0.2;
      ring1.rotation.y = time * 0.9;
      ring2.rotation.x = -Math.PI / 4 + Math.cos(time * 0.7) * 0.2;
      ring2.rotation.z = -time * 0.7;

      // Voice orb pulse
      voiceOrbMesh.rotation.y = time * 1.2;
      soundWave1.scale.setScalar(0.9 + Math.sin(time * 3) * 0.15);
      soundWave2.scale.setScalar(0.9 + Math.cos(time * 3 + 1) * 0.15);

      // Web panel gentle float
      webPanelGroup.position.y = 1.75 + Math.sin(time * 1.5) * 0.08;

      // Satellite Automation nodes orbital placement
      for (let i = 0; i < nodeCount; i++) {
        const angle = time * 0.7 + (i * Math.PI * 2) / nodeCount;
        const radius = 2.4 + Math.sin(time + i) * 0.2;
        const ny = 1.75 + Math.sin(time * 2 + i) * 0.4;
        _dummy.position.set(Math.cos(angle) * radius, ny, Math.sin(angle) * radius);
        _dummy.rotation.set(time * 2, time * 1.5, 0);
        _dummy.scale.setScalar(1);
        _dummy.updateMatrix();
        nodeInstancedMesh.setMatrixAt(i, _dummy.matrix);
      }
      nodeInstancedMesh.instanceMatrix.needsUpdate = true;

      // Sparks float
      for (let i = 0; i < sparkCount; i++) {
        const sp = sparkData[i];
        sp.pos.y += sp.speedY * delta;
        if (sp.pos.y > 4.2) {
          sp.pos.y = 0.5;
        }
        _dummy.position.copy(sp.pos);
        _dummy.rotation.y += sp.rotSpeed * delta;
        _dummy.updateMatrix();
        sparkInstancedMesh.setMatrixAt(i, _dummy.matrix);
      }
      sparkInstancedMesh.instanceMatrix.needsUpdate = true;

      // Mode Camera Targets using smooth exponential damping
      const mode = modeRef.current;
      if (mode === 'all') {
        _targetCamPos.set(0, 3.2, 7.5);
      } else if (mode === 'web') {
        _targetCamPos.set(0, 2.0, 5.0);
      } else if (mode === 'voice') {
        _targetCamPos.set(0, 2.5, -5.2);
      } else if (mode === 'automation') {
        _targetCamPos.set(3.5, 4.2, 5.2);
      }

      camera.position.x += (_targetCamPos.x - camera.position.x) * dampFactor;
      camera.position.y += (_targetCamPos.y - camera.position.y) * dampFactor;
      camera.position.z += (_targetCamPos.z - camera.position.z) * dampFactor;
      _scratchVec.set(0, 1.4, 0);
      camera.lookAt(_scratchVec);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      renderer.dispose();
      if (dom && dom.parentElement) {
        dom.parentElement.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b1021] to-[#060911] border border-cyan-500/20 shadow-2xl shadow-cyan-950/40">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none select-none"
        title="Interactive 3D Core: Drag to rotate view"
      />

      {/* Top minimal spec badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-md bg-[#0f172a]/90 text-[11px] font-mono font-medium text-cyan-300 border border-cyan-500/30">
          THREE.JS PBR CORE
        </span>
        <span className="px-2.5 py-1 rounded-md bg-[#0f172a]/90 text-[11px] font-mono text-slate-400 border border-slate-700/50 hidden sm:inline-block">
          {isInteracting ? 'Manual Orbit' : 'Damped 60FPS Loop'}
        </span>
      </div>

      {/* Interactive Helper Hint */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full bg-slate-900/80 text-[11px] text-slate-400 border border-slate-800 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Drag or swipe to rotate
        </span>
      </div>

      {/* Bottom Collapsible HUD Dock (<= 15% viewport footprint, solid rgba surfaces, no backdrop-filter over WebGL) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[560px]">
        {/* Toggle Bar */}
        <div className="flex justify-center mb-1.5">
          <button
            type="button"
            onClick={() => setIsControlsOpen(!isControlsOpen)}
            className="px-3 py-1 rounded-t-lg bg-[#0f172a] text-[11px] font-medium text-slate-400 hover:text-cyan-300 border border-b-0 border-slate-700/60 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {isControlsOpen ? '▾ Hide 3D Modes' : '▴ Show 3D Modes'}
          </button>
        </div>

        {/* Control Dock */}
        {isControlsOpen && (
          <div className="p-2.5 rounded-2xl bg-[#0b1120] border border-cyan-500/25 shadow-xl shadow-black/80">
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveMode('all')}
                className={`px-2 py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer text-center ${
                  activeMode === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/40'
                    : 'bg-[#131b2e] text-slate-300 hover:bg-[#1a243d] border border-slate-700/40'
                }`}
              >
                <div className="text-sm">🌐</div>
                <div className="truncate mt-0.5">Full Stack</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('web')}
                className={`px-2 py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer text-center ${
                  activeMode === 'web'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/25 border border-cyan-400/40'
                    : 'bg-[#131b2e] text-slate-300 hover:bg-[#1a243d] border border-slate-700/40'
                }`}
              >
                <div className="text-sm">💻</div>
                <div className="truncate mt-0.5">Websites</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('voice')}
                className={`px-2 py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer text-center ${
                  activeMode === 'voice'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 border border-purple-400/40'
                    : 'bg-[#131b2e] text-slate-300 hover:bg-[#1a243d] border border-slate-700/40'
                }`}
              >
                <div className="text-sm">🎙️</div>
                <div className="truncate mt-0.5">AI Agents</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('automation')}
                className={`px-2 py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer text-center ${
                  activeMode === 'automation'
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-teal-500/25 border border-teal-400/40'
                    : 'bg-[#131b2e] text-slate-300 hover:bg-[#1a243d] border border-slate-700/40'
                }`}
              >
                <div className="text-sm">⚡</div>
                <div className="truncate mt-0.5">Automation</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
