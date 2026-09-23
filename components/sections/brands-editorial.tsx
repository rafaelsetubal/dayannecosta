"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./brands-editorial.module.css";

const campaigns = [
  { src: "/Marcas/hover.mp4", type: "video", logo: "ALLP FIT", tag: "CAMPANHA" },
  { src: "/fashion/fashion-01.jpg", type: "image", logo: "BANZAY", tag: "MODA" },
  { src: "/Running/hover.mp4", type: "video", logo: "CORRE FOFO", tag: "RUNNING" },
  { src: "/fashion/fashion-02.jpg", type: "image", logo: "NUTRIMIX", tag: "SUPLEMENTOS" },
  { src: "/fashion/fashion-03.jpg", type: "image", logo: "KAISAN", tag: "FITNESS" },
  { src: "/Lifestyle/hover.mp4", type: "video", logo: "DAY COSTA", tag: "LIFESTYLE" },
] as const;

export function BrandsEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef(false);
  const isTouching = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const isHovered = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const isVisible = useRef(true);
  const scrollPos = useRef(0);

  const loop = [...campaigns, ...campaigns, ...campaigns, ...campaigns];

  const move = useCallback((direction: number) => {
    if (!rail.current) return;
    const amount = window.innerWidth < 800 ? 240 : 340;
    scrollPos.current += direction * amount;
    rail.current.scrollTo({ left: scrollPos.current, behavior: "smooth" });
  }, []);

  // Mouse Drag Handlers (Desktop only)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    isMouseDown.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = rail.current?.scrollLeft || 0;
    dragDistance.current = 0;
    if (rail.current) {
      rail.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !isMouseDown.current || !rail.current) return;
    const diff = e.clientX - startX.current;
    dragDistance.current = Math.abs(diff);
    const walk = diff * 1.2;
    scrollPos.current = startScrollLeft.current - walk;
    rail.current.scrollLeft = scrollPos.current;
  };

  const handlePointerUp = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (isMouseDown.current) {
      isMouseDown.current = false;
      if (rail.current) {
        scrollPos.current = rail.current.scrollLeft;
        rail.current.style.cursor = "grab";
      }
    }
  };

  // Touch Handlers (Mobile)
  const handleTouchStart = () => {
    isTouching.current = true;
    dragDistance.current = 0;
  };

  const handleTouchMove = () => {
    dragDistance.current = 10;
  };

  const handleTouchEnd = () => {
    isTouching.current = false;
    if (rail.current) {
      scrollPos.current = rail.current.scrollLeft;
    }
  };

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const element = rail.current;
      const shouldPause = isMouseDown.current || isTouching.current || isHovered.current || isPaused;

      if (element && !shouldPause && isVisible.current) {
        const delta = Math.min((now - previous) * 0.055, 3);
        scrollPos.current += delta;

        const maxScroll = element.scrollWidth / 4;
        if (scrollPos.current >= maxScroll * 3) {
          scrollPos.current -= maxScroll;
        } else if (scrollPos.current <= 0) {
          scrollPos.current += maxScroll;
        }

        element.scrollLeft = scrollPos.current;
      }
      previous = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.current = entry.isIntersecting;
          if (entry.isIntersecting && rail.current) {
            scrollPos.current = rail.current.scrollLeft;
          }
        });
      },
      { threshold: 0.01 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [isPaused]);

  return (
    <section id="marcas" ref={sectionRef} className={styles.section} aria-label="Parcerias">
      <div className={styles.header}>
        <div>
          <p className="eyebrow">PARCERIAS</p>
          <h2>MUITO ALÉM<br/>DE UMA <i>PUBLICAÇÃO.</i></h2>
        </div>
        <div className={styles.headerSide}>
          <p>Conteúdo, experiências, eventos e presença digital em colaboração autêntica com marcas.</p>
          <div className={styles.controls}>
            <button type="button" onClick={() => move(-1)} aria-label="Ver marcas anteriores">
              <ArrowLeft size={18}/>
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Ver próximas marcas">
              <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      </div>

      <div
        className={styles.marquee}
        ref={rail}
        aria-label="Portfolio visual de parcerias"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") {
            isHovered.current = true;
          }
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") {
            isHovered.current = false;
            handlePointerUp(e);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div className={styles.track}>
          {loop.map((campaign, index) => (
            <article
              className={styles.item}
              key={`${campaign.logo}-${index}`}
              onClick={() => {
                if (dragDistance.current < 6) {
                  setIsPaused((prev) => !prev);
                }
              }}
              title={isPaused ? "Clique para despausar o carrossel" : "Clique para pausar o carrossel"}
            >
              <div className={styles.frame}>
                {campaign.type === "video" ? (
                  <video
                    muted
                    autoPlay
                    playsInline
                    loop
                    preload="metadata"
                    src={campaign.src}
                    aria-label={`Vídeo de ${campaign.logo}`}
                  />
                ) : (
                  <Image
                    fill
                    sizes="(max-width: 800px) 56vw, 22vw"
                    src={campaign.src}
                    alt={campaign.logo}
                  />
                )}
                <div className={styles.frameShade} />
                <div className={styles.logoCenter}>
                  <span className={styles.logoText}>{campaign.logo}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
