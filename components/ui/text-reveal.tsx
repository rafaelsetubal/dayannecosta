"use client";

import { useEffect } from "react";

const selector = "h1, h2, h3, h4, .eyebrow, .hero-statement, .hero-description, .about-copy > p, .card p";

export function TextReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("text-reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    document.querySelectorAll<HTMLElement>(selector).forEach((target) => {
      if (target.dataset.revealReady) return;
      target.dataset.revealReady = "true";
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      let node = walker.nextNode();
      while (node) {
        if (node.textContent?.trim()) nodes.push(node as Text);
        node = walker.nextNode();
      }
      let index = 0;
      nodes.forEach((textNode) => {
        const fragment = document.createDocumentFragment();
        textNode.textContent?.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return void fragment.append(part);
          const word = document.createElement("span");
          word.className = "word-reveal";
          word.style.setProperty("--word-delay", `${index++ * 100}ms`);
          word.textContent = part;
          fragment.append(word);
        });
        textNode.replaceWith(fragment);
      });
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
