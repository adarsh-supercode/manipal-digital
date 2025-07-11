'use client';
import { useEffect, useState } from 'react';

export default function PreloadComponent({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if shaders are already in localStorage
    const vertex = localStorage.getItem('vertexShader');
    const fragment = localStorage.getItem('fragmentShader');

    if (vertex && fragment) {
      setIsReady(true); // Shaders are already cached, we can proceed
      return;
    }

    // Otherwise, fetch shaders from the server
    Promise.all([
      fetch('/shades/vertex.glsl?raw').then((res) => res.text()),
      fetch('/shades/fragment.glsl?raw').then((res) => res.text())
    ])
      .then(([vertexShader, fragmentShader]) => {
        // Save shaders in localStorage for next visits
        localStorage.setItem('vertexShader', vertexShader);
        localStorage.setItem('fragmentShader', fragmentShader);
        setIsReady(true);
      })
      .catch((err) => {
        console.error('❌ Failed to preload shaders:', err);
      });
  }, []);

  if (!isReady) {
    return (
      <div>Loading shaders...</div> // Show a loading message or spinner while preloading
    );
  }

  return children; // Render children once shaders are ready
}
