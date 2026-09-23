"use client";

import Image from "next/image";
import { ArrowUpRight, AtSign, Check, Copy, MessageCircle, Music2, Ticket, Tv, Users, X } from "lucide-react";
import { useState } from "react";
import styles from "./community-hub.module.css";

type LinkItem = { title: string; detail: string; href: string; image: string; icon: typeof Users; status?: string };
type Coupon = LinkItem & { code: string };

const events: LinkItem[] = [
  { title: "Grupo dos Treinões", detail: "Comunidade Corre Fofo", href: "https://chat.whatsapp.com/Iw4lvsegoOUClnWNkWotog?s=cl&p=i&ilr=2", image: "/corre-fofo.png", icon: Users },
  { title: "Evento Corre Fofo", detail: "Itabuna · Ilhéus", href: "https://www.centraldasinscricoes.com.br/evento/corre-fofo-itabuna-ilheus", image: "/evento-corre-fofo.png", icon: Ticket, status: "ENCERRADA" },
];
const coupons: Coupon[] = [
  { title: "Kaisan", detail: "Copie o cupom antes de acessar", href: "https://www.kaisan.com.br", image: "/fashion/fashion-01.jpg", icon: Ticket, code: "DAYCOSTA" },
  { title: "Nutrimix", detail: "Copie o cupom antes de acessar", href: "https://www.nutrimixsuplementos.com.br", image: "/fashion/fashion-02.jpg", icon: Ticket, code: "DAY15" },
];
const connections: LinkItem[] = [
  { title: "WhatsApp", detail: "Contato para parcerias", href: "https://api.whatsapp.com/send/?phone=5573988169657&text=Olá!%20Vim%20pelo%20site%20da%20Dayanne%20e%20gostaria%20de%20conversar%20sobre%20uma%20parceria.&type=phone_number&app_absent=0", image: "/dayanne-about.png", icon: MessageCircle },
  { title: "Instagram", detail: "@dayannecostaig", href: "https://www.instagram.com/dayannecostaig/", image: "/fashion/fashion-01.jpg", icon: AtSign },
  { title: "TikTok", detail: "@djdaycosta", href: "https://www.tiktok.com/@djdaycosta", image: "/fashion/fashion-05.jpg", icon: Tv },
  { title: "Playlists", detail: "Playlist da Day", href: "https://open.spotify.com/user/daycsanttos?si=zYzn2JkuQbeKNDfo_DCKSQ&nd=1&dlsi=60ef76ee19f44e46", image: "/fashion/fashion-03.jpg", icon: Music2 },
];

function LinkCard({ item }: { item: LinkItem }) { const Icon = item.icon; return <a className={styles.card} href={item.href} target="_blank" rel="noreferrer"><div className={styles.image}><Image fill sizes="(max-width: 800px) 48vw, 33vw" src={item.image} alt=""/>{item.status && <span className={styles.status}>{item.status}</span>}</div><div className={styles.cardBody}><Icon className={styles.icon} size={21}/><h3>{item.title}</h3><p>{item.detail}</p><ArrowUpRight className={styles.arrow} size={17}/></div></a>; }

export function CommunityHub() {
  const [selected, setSelected] = useState<Coupon | null>(null);
  const [copied, setCopied] = useState(false);
  const copy = async () => { if (!selected) return; await navigator.clipboard?.writeText(selected.code); setCopied(true); };
  return <section id="comunidade" className={styles.section}><header className={styles.intro}><p className="eyebrow">COMUNIDADE</p><h2>VAMOS<br/><i>JUNTAS?</i></h2><p>Treinos, eventos, cupons, playlists e muito mais. Tudo em um só lugar.</p></header><div className={styles.groups}><div className={styles.group}><h3>EVENTOS &amp; COMUNIDADE</h3><div className={styles.grid}>{events.map((item) => <LinkCard item={item} key={item.title}/>)}</div></div><div className={styles.group}><h3>CUPONS</h3><div className={`${styles.grid} ${styles.couponGrid}`}>{coupons.map((item) => <button className={styles.card} onClick={() => { setSelected(item); setCopied(false); }} key={item.title}><div className={styles.image}><Image fill sizes="(max-width: 800px) 48vw, 20vw" src={item.image} alt=""/></div><Ticket className={styles.icon} size={23}/><h4>{item.title}</h4><p>{item.detail}</p><Copy className={styles.arrow} size={17}/></button>)}</div></div><div className={styles.group}><h3>CONEXÕES</h3><div className={styles.grid}>{connections.map((item) => <LinkCard item={item} key={item.title}/>)}</div></div></div>{selected && <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-label={`Cupom ${selected.title}`}><div className={styles.modal}><button className={styles.close} onClick={() => setSelected(null)} aria-label="Fechar"><X size={18}/></button><p className="eyebrow">CUPOM {selected.title.toUpperCase()}</p><h3>{selected.code}</h3><p>Copie o cupom para liberar o acesso ao site.</p><button className={styles.copyButton} onClick={() => void copy()}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "CUPOM COPIADO" : "COPIAR CUPOM"}</button><a className={copied ? styles.visit : `${styles.visit} ${styles.disabled}`} href={copied ? selected.href : undefined} target={copied ? "_blank" : undefined} rel="noreferrer" aria-disabled={!copied}>ACESSAR SITE <ArrowUpRight size={16}/></a></div></div>}</section>;
}
