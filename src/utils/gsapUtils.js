import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a staggered reveal animation for grid items or lists.
 * @param {string | HTMLElement | NodeList} elements - The targets to animate.
 * @param {string | HTMLElement} trigger - The container element to trigger the scroll animation.
 */
export const revealStagger = (elements, trigger) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger,
        start: 'top 85%', // Triggers when the top of the container hits 85% from the top of the viewport
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Creates a smooth fade-up animation for text elements.
 * @param {string | HTMLElement | NodeList} elements - The targets to animate.
 * @param {string | HTMLElement} trigger - The element to trigger the scroll animation.
 * @param {number} delay - Optional delay before animation starts.
 */
export const fadeUpText = (elements, trigger, delay = 0) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: trigger || elements,
        start: 'top 90%',
        end: 'top 60%',
        scrub: 1,
      },
    }
  );
};

/**
 * Cleanup function to kill all active ScrollTriggers on unmount.
 */
export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(t => t.kill());
};
