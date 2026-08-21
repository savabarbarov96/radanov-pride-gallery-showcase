import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, HeartPulse, ShieldCheck } from "lucide-react";

export default function ModernHeroSection() {
  return <section className="relative overflow-hidden bg-background">
    <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
      <div className="relative z-10 max-w-2xl">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Maine Coon Radanov Pride</p>
        <h1 className="font-playfair text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">Красота с характер.<br /><span className="text-muted-foreground">Грижа с мисия.</span></h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">Развъдник, посветен на великолепната порода Maine Coon и на отговорното, внимателно и целенасочено развъждане.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link to="/available-kittens" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">Налични котенца <ArrowRight className="h-4 w-4" /></Link><Link to="/health-care" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold">Здраве и грижа</Link></div>
        <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-border/70 pt-6"><div><BadgeCheck className="mb-2 h-5 w-5" /><p className="text-xs leading-5 text-muted-foreground">Член на TICA</p></div><div><ShieldCheck className="mb-2 h-5 w-5" /><p className="text-xs leading-5 text-muted-foreground">БАБХ № 2760-0773</p></div><div><HeartPulse className="mb-2 h-5 w-5" /><p className="text-xs leading-5 text-muted-foreground">Здравето е първо</p></div></div>
      </div>
      <div className="relative mx-auto w-full max-w-xl lg:max-w-none"><div className="relative aspect-[0.86] overflow-hidden rounded-[2rem] bg-muted shadow-2xl"><img src="/cats/14fc2162-3763-4a37-8f97-eb7ac21c085d.jpg" alt="Maine Coon Radanov Pride" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" /><div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white"><div><p className="text-xs uppercase tracking-[0.24em] text-white/70">Radanov Pride</p><p className="mt-2 font-playfair text-3xl">Maine Coon</p></div><span className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-xs backdrop-blur">Здраве · Тип · Характер</span></div></div><div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border/70 bg-card p-4 shadow-xl sm:block"><p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Домашна среда</p><p className="mt-1 font-playfair text-xl">Отглеждани с любов</p></div></div>
    </div>
  </section>;
}
