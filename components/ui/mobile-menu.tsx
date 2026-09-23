"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./mobile-menu.module.css";

const links = [
  ["CONTEÚDO", "#mundo"],
  ["SOBRE", "#sobre"],
  ["MARCAS", "#marcas"],
  ["COMUNIDADE", "#comunidade"],
  ["MÍDIA KIT", "#contato"],
  ["CONTATO", "#contato"],
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className={styles.menu}><button className={styles.trigger} type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>{open ? <X size={22}/> : <Menu size={24}/>}</button>{open && <div className={styles.panel}>{links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}</div>}</div>;
}
