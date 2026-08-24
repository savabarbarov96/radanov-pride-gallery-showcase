import { Link } from "react-router-dom";
import { ArrowRight, Check, ExternalLink, ShieldCheck, Syringe, Dna, Trophy } from "lucide-react";
import { Helmet } from "react-helmet-async";
import ModernNavigation from "@/components/ModernNavigation";
import Footer from "@/components/Footer";
import { useActivePageMedia } from "@/services/convexPageMediaService";

type PageKey = "breeding" | "kittens" | "litters" | "shows" | "health";

const babhRegistryUrl = "https://public-iisr.bfsa.bg/BABHRegsExt/pagesPublic/registers/registerAnimalDefault.xhtml?reg=56";

const fallbackImages = {
  breeding: "/page-media/breeding-cats.webp",
  kittens: "/page-media/available-kittens.webp",
  litters: "/page-media/past-litters.webp",
  shows: "/page-media/shows.webp",
} as const;

const pages: Record<PageKey, { eyebrow: string; title: string; intro: string; sections: { title: string; body: string; items?: string[] }[] }> = {
  breeding: {
    eyebrow: "Maine Coon Radanov Pride",
    title: "Развъдни котки",
    intro: "Запознайте се с котките, които са в основата на нашата развъдна програма — подбрани с внимание към здравето, характера, типа и произхода.",
    sections: [
      { title: "Здраве и характер преди всичко", body: "В развъдната ни програма подбираме котки с балансиран темперамент, хармонична структура и проследим произход. Генетиката и благополучието са водещи при всяко решение." },
      { title: "Полидактилни Maine Coon", body: "Полидактилията е естествена генетична особеност, при която котката има допълнителни пръстчета. За нас тя е част от историята и уникалността на породата, но винаги върви заедно с отговорен подбор и високи стандарти на отглеждане." },
    ],
  },
  kittens: {
    eyebrow: "Вашият бъдещ семеен любимец",
    title: "Налични котенца",
    intro: "Разгледайте котенцата, които търсят своето семейство. Всеки малък Maine Coon расте в домашна среда с ежедневна грижа, внимание и социализация.",
    sections: [
      { title: "Подготвени за новия си дом", body: "Всяко коте Radanov Pride напуска развъдника с необходимата профилактика и документи.", items: ["3-кратна ваксинация с Purevax", "3-кратно обезпаразитяване", "Троен тест", "Европейски паспорт", "Микрочип"] },
      { title: "Искате да научите повече?", body: "Изберете коте от галерията или изпратете резервация. Ще се свържем с вас, за да обсъдим характера, произхода и най-подходящия начин за бъдещото ви съжителство." },
    ],
  },
  litters: {
    eyebrow: "Историята на Radanov Pride",
    title: "Минали котила",
    intro: "Всяко котило е специална глава от историята на развъдника. Тук ще събираме спомени, снимки и информация за вече порасналите ни Maine Coon котки.",
    sections: [
      { title: "С любов от първия ден", body: "Котенцата растат в спокойна домашна среда, с човешко внимание, качествено хранене и ветеринарно наблюдение. Ранната социализация е важна част от подготовката им за щастлив семеен живот." },
      { title: "Следете новините", body: "Нови снимки и информация за котилата ще бъдат добавяни тук, когато са готови за споделяне." },
    ],
  },
  shows: {
    eyebrow: "Тип, движение и признание",
    title: "Изложби",
    intro: "Изложбите са възможност да споделим красотата на Maine Coon, да получим професионална оценка и да продължим да развиваме развъдната си програма.",
    sections: [
      { title: "Нашият подход", body: "Участието в изложби е част от стремежа ни към развитие, познание и уважение към породата. Оценяваме не само впечатляващата визия, но и характера, структурата и общото състояние на котките." },
      { title: "Предстои", body: "Тук ще публикуваме бъдещи участия, резултати и моменти от изложбения живот на Radanov Pride." },
    ],
  },
  health: {
    eyebrow: "Отговорност към всяко животно",
    title: "Здраве и грижа — основата на Radanov Pride",
    intro: "Развъждането за нас е отговорност към породата и към всяко животно, което се ражда при нас. Затова здравето, благополучието и грижата са в центъра на всичко, което правим.",
    sections: [
      { title: "🧬 Генетично тествани развъдни котки", body: "Нашите развъдни котки преминават генетични изследвания, свързани със здравето и наследствените заболявания при породата Maine Coon. Резултатите се съхраняват като част от здравната документация. Поради съдържащата се лична информация не публикуваме документите онлайн, но при сериозен интерес към коте можем да предоставим допълнителна информация." },
      { title: "🏛️ Регистриран развъдник в БАБХ", body: "Radanov Pride е официално регистриран развъдник за котки в Българската агенция по безопасност на храните.", items: ["Регистрационен номер: 2760-0773", "Вид обект: Развъдник", "Вид животно: котка", "Капацитет: 10 котки"] },
      { title: "💉 Ваксинирани и подготвени за новия си дом", body: "Всяко коте Radanov Pride получава необходимата профилактика и документи преди да започне новия си живот.", items: ["3-кратна ваксинация с Purevax", "3-кратно обезпаразитяване", "Троен тест", "Европейски паспорт", "Микрочип"] },
      { title: "🐾 Полидактилни Maine Coon", body: "Полидактилията е естествена генетична особеност, при която котката има допълнителни пръстчета на една или повече лапи. Maine Coon Polydactyl е официално признат от TICA и е част от породната група MC/MCP. При подбора здравето, произходът, структурата, типът, козината и характерът винаги са на първо място." },
    ],
  },
};

const icons = [Dna, ShieldCheck, Syringe, Trophy];

export default function InformationPage({ page }: { page: PageKey }) {
  const content = pages[page];
  const media = useActivePageMedia(page === "health" ? "breeding" : page);
  const activeMedia = page === "health" ? [] : media ?? [];
  const heroImage = activeMedia[0]?.url ?? (page === "health" ? undefined : fallbackImages[page]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet><title>{content.title} | Radanov Pride</title><meta name="description" content={content.intro} /></Helmet>
      <ModernNavigation />
      <main>
        <section className="relative isolate overflow-hidden border-b border-border/60 bg-muted px-6 py-20 md:py-28">
          {heroImage && <><img src={heroImage} alt={activeMedia[0]?.altText || content.title} className="absolute inset-0 -z-20 h-full w-full object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" /></>}
          <div className={`relative mx-auto max-w-6xl ${heroImage ? "text-white" : ""}`}>
            <p className={`mb-5 text-xs font-semibold uppercase tracking-[0.28em] ${heroImage ? "text-white/75" : "text-muted-foreground"}`}>{content.eyebrow}</p>
            <h1 className="max-w-4xl font-playfair text-4xl font-medium leading-tight md:text-6xl">{content.title}</h1>
            <p className={`mt-7 max-w-3xl text-lg leading-8 md:text-xl ${heroImage ? "text-white/80" : "text-muted-foreground"}`}>{content.intro}</p>
          </div>
        </section>
        {activeMedia.length > 1 && <section className="mx-auto grid max-w-6xl gap-4 px-6 pt-16 md:grid-cols-3"><div className="md:col-span-2"><img src={activeMedia[1].url} alt={activeMedia[1].altText} className="h-full max-h-[520px] min-h-[280px] w-full rounded-3xl object-cover" loading="lazy" /></div>{activeMedia.slice(2, 4).map((item) => <img key={item._id} src={item.url} alt={item.altText} className="h-64 w-full rounded-3xl object-cover md:h-full" loading="lazy" />)}</section>}
        <section className="mx-auto grid max-w-6xl gap-5 px-6 py-16 md:grid-cols-2 md:py-24">
          {content.sections.map((section, index) => {
            const Icon = icons[index % icons.length];
            return <article key={section.title} className="rounded-3xl border border-border/70 bg-card p-7 shadow-sm md:p-9">
              <Icon className="mb-7 h-7 w-7 text-foreground" strokeWidth={1.5} />
              <h2 className="font-playfair text-2xl font-medium md:text-3xl">{section.title}</h2>
              <p className="mt-4 leading-8 text-muted-foreground">{section.body}</p>
              {section.items && <ul className="mt-6 space-y-3">{section.items.map(item => <li key={item} className="flex gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0" /><span>{item}</span></li>)}</ul>}
              {page === "health" && index === 1 && <a className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4" href={babhRegistryUrl} target="_blank" rel="noreferrer">Провери регистрацията в БАБХ <ExternalLink className="h-4 w-4" /></a>}
            </article>;
          })}
        </section>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-4 px-6 pb-20">
          <Link to="/reservations" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">Изпрати резервация <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold">Към началото</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
