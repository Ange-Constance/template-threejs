import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedImage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Material
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('https://www.thisiscolossal.com/wp-content/uploads/2014/03/120430.gif');
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      renderer.dispose();
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default AnimatedImage;
