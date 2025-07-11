'use client';

import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    const speed = 0.1; // Adjust for how slow or fast the cursor trails

    const updateCursor = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      if (cursor) {
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
      }

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleSectionEnter = (e) => {
      const target = e.currentTarget;
      const cursorType = target.getAttribute("data-cursor");
      if (cursorType && cursor) {
        cursor.classList.add(cursorType);
      }
    };

    const handleSectionLeave = (e) => {
      const target = e.currentTarget;
      const cursorType = target.getAttribute("data-cursor");
      if (cursorType && cursor) {
        cursor.classList.remove(cursorType);
      }
    };

    const attachCursorListeners = () => {
      const cursorSections = document.querySelectorAll("[data-cursor]");
      cursorSections.forEach((section) => {
        section.removeEventListener("mouseenter", handleSectionEnter);
        section.removeEventListener("mouseleave", handleSectionLeave);
        section.addEventListener("mouseenter", handleSectionEnter);
        section.addEventListener("mouseleave", handleSectionLeave);
      });
    };

    // Start animation loop
    updateCursor();

    // Attach listeners on load
    attachCursorListeners();
    window.addEventListener("mousemove", handleMouseMove);

    const observer = new MutationObserver(() => {
      attachCursorListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return <div className="custom-cursor" />;
};

export default CustomCursor;
