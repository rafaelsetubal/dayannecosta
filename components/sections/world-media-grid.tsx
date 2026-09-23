"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./world-media-grid.module.css";

type MediaItem = { number: string; label: string; title: string; microcopy: string; video: string; direction: "up" | "down"; className: string };

const media: MediaItem[] = [
  { number: "01", label: "RUNNING", title: "Running", microcopy: "Corre. Supera. Vive.", video: "/Running/hover.mp4", direction: "up", className: "card-0" },
  { number: "02", label: "FITNESS", title: "Fitness", microcopy: "Força que faz parte da rotina.", video: "/Fitness/hover.mp4", direction: "down", className: "card-1" },
  { number: "03", label: "LIFESTYLE", title: "Lifestyle", microcopy: "Estilo, viagens e momentos reais.", video: "/Lifestyle/hover.mp4", direction: "up", className: "card-2" },
  { number: "04", label: "BRANDS", title: "Marcas", microcopy: "Conteúdo que encontra marcas.", video: "/Marcas/hover.mp4", direction: "down", className: "card-3" },
  { number: "05", label: "MODA", title: "Moda", microcopy: "Estilo também é movimento.", video: "/fashion/fashion-01.jpg", direction: "up", className: "card-4" },
];

const fashionPhotos = Array.from({ length: 6 }, (_, index) => `/fashion/fashion-${String(index + 1).padStart(2, "0")}.jpg`);

export function WorldMediaGrid() {
  const grid = useRef<HTMLDivElement>(null);
  const [fashionSlide, setFashionSlide] = useState(0);
  const [previousFashionSlide, setPreviousFashionSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setFashionSlide((current) => { setPreviousFashionSlide(current); return (current + 1) % fashionPhotos.length; }), 1900);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !grid.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const cards = Array.from(grid.current.querySelectorAll<HTMLElement>("[data-world-card]"));
    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.fromTo(card, { opacity: 0 }, { opacity: 1, duration: .65, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 88%" } });
        const startsAbove = index % 2 === 0;
        gsap.fromTo(card, { y: startsAbove ? -40 : 40 }, { y: startsAbove ? 40 : -40, ease: "none", scrollTrigger: { trigger: grid.current, start: "top bottom", end: "bottom top", scrub: .65 } });
      });
      const videos = cards.map((card) => card.querySelector(".world-video")).filter((video): video is HTMLVideoElement => video instanceof HTMLVideoElement);
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        const card = entry.target as HTMLElement;
        const candidate = card.querySelector(".world-video");
        if (!(candidate instanceof HTMLVideoElement)) return;
        if (entry.isIntersecting) { card.classList.add("is-playing"); void candidate.play().catch(() => undefined); }
        else { card.classList.remove("is-playing"); candidate.pause(); }
      }), { threshold: .2 });
      cards.forEach((card) => observer.observe(card));
      return () => { observer.disconnect(); videos.forEach((video) => video.pause()); };
    }, grid);
    return () => context.revert();
  }, []);

  return <div className={`world-grid ${styles.grid}`} ref={grid}>{media.map((item) => <article className={`world-card media-card ${item.className} ${styles.card}`} data-world-card key={item.title}>
    <div className={`world-motion ${styles.motion}`} data-world-motion>{item.label === "MODA" ? <><img className={`${styles.fashionImage} ${styles.fashionPrevious} world-video`} src={fashionPhotos[previousFashionSlide]} alt="" aria-hidden="true"/><img key={fashionSlide} className={`${styles.fashionImage} ${styles.fashionCurrent} world-video`} src={fashionPhotos[fashionSlide]} alt="Dayanne Costa em editorial de moda" /></> : <div className={`world-motion-inner ${styles.motionInner}`}><video className="world-video" autoPlay muted playsInline loop preload="auto" src={item.video} aria-label={`Vídeo de ${item.title}`} /></div>}</div>
    <div className={styles.label}><span className={styles.number}>{item.number}</span><h3>{item.label}</h3><p className={styles.microcopy}>{item.microcopy}</p><ArrowUpRight/></div>
  </article>)}</div>;
}
