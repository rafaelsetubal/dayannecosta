"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./fashion-editorial.module.css";

const photos = Array.from({ length: 6 }, (_, index) => `/fashion/fashion-${String(index + 1).padStart(2, "0")}.jpg`);

export function FashionEditorial() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => { if (stage.current) gsap.fromTo(stage.current, { opacity: .45, x: 18, scale: 1.015 }, { opacity: 1, x: 0, scale: 1, duration: .7, ease: "power3.out" }); }, [active]);
  const move = (amount: number) => setActive((current) => (current + amount + photos.length) % photos.length);
  return <section className={styles.section} aria-label="Editorial Fashion"><div className={styles.copy}><p className="eyebrow">FASHION</p><h2>ESTILO TAMBÉM É<br/><i>MOVIMENTO.</i></h2><p>Moda, personalidade e diferentes formas de se expressar.</p><div className={styles.controls}><button onClick={() => move(-1)} aria-label="Foto anterior"><ArrowLeft size={18}/></button><span>{String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span><button onClick={() => move(1)} aria-label="Próxima foto"><ArrowRight size={18}/></button></div></div><div className={styles.stage} ref={stage}><Image fill sizes="(max-width: 800px) 92vw, 70vw" src={photos[active]} alt={`Editorial de moda Dayanne Costa, foto ${active + 1}`} priority={active === 0}/></div><div className={styles.next}><Image fill sizes="28vw" src={photos[(active + 1) % photos.length]} alt="Próxima foto do editorial Fashion"/></div></section>;
}
