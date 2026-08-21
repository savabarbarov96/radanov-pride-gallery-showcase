import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialContactModal from "./SocialContactModal";

const links = [
  ["/", "Начало"], ["/breeding-cats", "Развъдни котки"], ["/available-kittens", "Налични котенца"],
  ["/past-litters", "Минали котила"], ["/shows", "Изложби"], ["/health-care", "Здраве и грижа"], ["/reservations", "Резервации"],
] as const;

export default function ModernNavigation() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return <>
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center gap-6 px-5 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Radanov Pride начало"><img src="/radanov-pride-logo.png" alt="Radanov Pride" className="h-14 w-14 object-contain" /></Link>
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">{links.map(([path, label]) => <Link key={path} to={path} className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${isActive(path) ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{label}</Link>)}</div>
        <div className="ml-auto hidden items-center gap-3 xl:flex"><LanguageSwitcher /><Button size="sm" onClick={() => setContactOpen(true)} className="rounded-full px-5">Контакт</Button></div>
        <button className="ml-auto rounded-full p-2 hover:bg-muted xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Затвори менюто" : "Отвори менюто"}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-border/60 px-5 pb-5 pt-3 xl:hidden"><div className="mx-auto grid max-w-2xl gap-1">{links.map(([path, label]) => <Link key={path} to={path} onClick={() => setOpen(false)} className={`rounded-xl px-4 py-3 text-sm font-medium ${isActive(path) ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`}>{label}</Link>)}</div><div className="mx-auto mt-3 flex max-w-2xl items-center justify-between gap-3 px-4"><LanguageSwitcher /><Button size="sm" className="rounded-full" onClick={() => { setContactOpen(true); setOpen(false); }}>Контакт</Button></div></div>}
    </nav>
    <SocialContactModal cat={null} isOpen={contactOpen} onClose={() => setContactOpen(false)} />
  </>;
}
