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

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5573988169657&text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Dayanne%20e%20gostaria%20de%20conversar%20sobre%20uma%20parceria.&type=phone_number&app_absent=0";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.menu}>
      <button className={styles.trigger} type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
        {open ? <X size={22}/> : <Menu size={24}/>}
      </button>
      {open && (
        <div className={styles.panel}>
          {links.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pink-button"
            style={{ marginTop: 12, padding: "12px 14px", fontSize: 11, textAlign: "center", justifyContent: "center" }}
            onClick={() => setOpen(false)}
          >
            TRABALHE COMIGO
          </a>
        </div>
      )}
    </div>
  );
}
