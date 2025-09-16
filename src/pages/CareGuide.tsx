import ModernNavigation from "@/components/ModernNavigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/useLanguage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BackgroundAnimations from "@/components/BackgroundAnimations";

type CareGuideContent = {
  heroTitle: string;
  heroDescription: string;
  badges: string[];
  introTitle: string;
  introBody: string;
  accordion: { title: string; content: string | string[] }[];
  closingTitle: string;
  closingBody: string;
  recommendedTitle: string;
  recommendedItems: string[];
  quickTipsTitle: string;
  quickTips: string[];
};

const careGuideContent: Record<"bg" | "en", CareGuideContent> = {
  bg: {
    heroTitle: "Грижа за Мейн Куун",
    heroDescription:
      "Практично ръководство за първите ви дни у дома с котенце Мейн Куун – подбрани съвети, списъци и препоръки.",
    badges: ["Котенце", "Мейн Куун"],
    introTitle: "🐾 Добре дошли у дома, малко мейн кун съкровище!",
    introBody:
      "Грижата за мейн кун котенце е приключение, изпълнено с нежност и много пух. Събрахме важните неща за най-доброто начало.",
    accordion: [
      {
        title: "1️⃣ Просторна и удобна затворена котешка тоалетна",
        content:
          "Изберете затворена тоалетна с големи размери, широк вход и филтър против миризми. Съчетавайте с бентонитова или биоразградима постелка.",
      },
      {
        title: "2️⃣ Купички и автоматизация за хранене и вода",
        content:
          "Ползвайте метални или керамични купички. Фонтан-поилка насърчава пиенето на вода. Автоматични хранилки са удобни за заети дни.",
      },
      {
        title: "3️⃣ Премиум храна за котенца – високо протеинова",
        content:
          "Изберете храна с висок животински протеин, без излишни пълнители. Подходящи марки: Orijen Kitten, Farmina N&D Kitten, Applaws, Carnilove, Royal Canin Maine Coon Kitten, Purina Pro Plan Kitten, Concept for Life Maine Coon Kitten.",
      },
      {
        title: "4️⃣ Катерушка – царството на мейн куна",
        content:
          "Голяма, стабилна катерушка (мин. 150 см) с дебели стълбове, сисал и меки зони за почивка. Поставете я до прозорец за любимо наблюдение.",
      },
      {
        title: "5️⃣ Играчки за интелигентно и активно коте",
        content:
          "Въдици с пера, интерактивни тунели и топки, играчки-пъзели. Въртете играчките през няколко дни за поддържане на интереса.",
      },
      {
        title: "6️⃣ Грууминг – грижа за пищната козина",
        content: [
          "Гребен с дълги зъби, сликер четка, ножица за нокти. За баня: Groomers Goop Degreaser & Shampoo или сух шампоан/натурална пудра.",
          "Започнете отрано и превърнете грижата в ритуал на доверие.",
        ],
      },
      {
        title: "7️⃣ Здраве – ваксини и обезпаразитяване",
        content:
          "Годишни ваксини; вътрешно обезпаразитяване на ~3 месеца; външна защита целогодишно. Работете с доверен ветеринар и поддържайте здравен картон.",
      },
      {
        title: "8️⃣ Безопасност у дома",
        content:
          "Обезопасете балкони и прозорци с метални мрежи; не оставяйте прозорци „на ножица“; заключвайте тъч котлони; комарниците не са надеждни.",
      },
    ],
    closingTitle: "❤️ Финални думи",
    closingBody:
      "Мейн Куун не е просто порода – това е душа с характер и привързаност. Подготовката, вниманието и любовта са ключът към дълъг и щастлив живот.",
    recommendedTitle: "Препоръчани аксесоари",
    recommendedItems: [
      "Фонтан-поилка за свежа вода",
      "Катерушка 150+ см със сисал",
      "Гребен и сликер четка",
      "Играчки-пъзели",
    ],
    quickTipsTitle: "Бързи съвети",
    quickTips: [
      "Вода винаги чиста и течаща при възможност",
      "Седмичен грууминг; ежедневна проверка за сплъстявания",
      "Социализация чрез игра всеки ден",
      "Безопасни прозорци и балкони",
    ],
  },
  en: {
    heroTitle: "Maine Coon Care Guide",
    heroDescription:
      "Practical, theme-matched care guide for your first days at home with a Maine Coon kitten.",
    badges: ["Kitten", "Maine Coon"],
    introTitle: "🐾 Welcome home, little Maine Coon treasure!",
    introBody:
      "Caring for a Maine Coon kitten is an adventure full of gentleness and fluff. Here are the essentials to make your start together effortless.",
    accordion: [
      {
        title: "1️⃣ Spacious enclosed litter box",
        content:
          "Pick a large, enclosed litter box with a wide entrance and odor filter. Pair it with bentonite or biodegradable litter.",
      },
      {
        title: "2️⃣ Feeding bowls and smart automation",
        content:
          "Use stainless-steel or ceramic bowls. A drinking fountain keeps the water fresh, while automatic feeders help on busy days.",
      },
      {
        title: "3️⃣ Premium kitten food – high in animal protein",
        content:
          "Choose food rich in animal protein and free from unnecessary fillers. Recommended brands: Orijen Kitten, Farmina N&D Kitten, Applaws, Carnilove, Royal Canin Maine Coon Kitten, Purina Pro Plan Kitten, Concept for Life Maine Coon Kitten.",
      },
      {
        title: "4️⃣ Cat tree – the Maine Coon kingdom",
        content:
          "A tall, sturdy tree (min. 150 cm) with thick posts, sisal rope and soft lounging spots. Place it by a window for the best view.",
      },
      {
        title: "5️⃣ Toys for a curious, active kitten",
        content:
          "Feather wands, interactive tunnels, puzzle toys and chase balls. Rotate the toys every few days to keep curiosity high.",
      },
      {
        title: "6️⃣ Grooming – caring for that plush coat",
        content: [
          "A long-tooth comb, slicker brush and claw scissors are must-haves. For bath time try Groomers Goop Degreaser & Shampoo or a dry shampoo/natural powder.",
          "Start early and turn grooming into a bonding ritual.",
        ],
      },
      {
        title: "7️⃣ Health – vaccines and parasite control",
        content:
          "Annual vaccines; internal deworming roughly every three months; year-round external protection. Partner with a trusted vet and keep the health card up to date.",
      },
      {
        title: "8️⃣ Home safety basics",
        content:
          "Secure balconies and windows with sturdy metal mesh, avoid leaving tilt windows open, lock touch-control stoves and never rely solely on insect screens.",
      },
    ],
    closingTitle: "❤️ Final words",
    closingBody:
      "A Maine Coon is more than a breed – it is a soulful companion. Preparation, attention and love are the keys to a long and happy life together.",
    recommendedTitle: "Recommended accessories",
    recommendedItems: [
      "Fresh-water fountain",
      "150+ cm cat tree with sisal",
      "Comb and slicker brush",
      "Puzzle toys",
    ],
    quickTipsTitle: "Quick tips",
    quickTips: [
      "Keep the water clean and running when possible",
      "Weekly grooming with daily tangle checks",
      "Daily playtime for socialisation",
      "Secure windows and balconies",
    ],
  },
};

const CareGuide = () => {
  const { language } = useLanguage();
  const content = careGuideContent[language];

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimations />
      <div className="relative z-10">
        <Helmet>
          <title>{language === "bg" ? "Грижа за Мейн Куун - Ръководство" : "Maine Coon Care Guide"}</title>
          <meta
            name="description"
            content={
              language === "bg"
                ? "Пълно ръководство за грижа за котенце Мейн Куун: тоалетна, храна, катерушка, играчки, грууминг, здраве и безопасност."
                : "Complete Maine Coon kitten care guide: litter box, food, tree, toys, grooming, health and home safety."
            }
          />
        </Helmet>

        <ModernNavigation />

        {/* Hero */}
        <section className="relative">
          <div
            className="w-full h-[42vh] md:h-[52vh] bg-center bg-cover"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)), url('/cats/2071859f-7f45-484c-94fb-ff3327c92edd.jpg')",
            }}
          >
            <div className="container mx-auto px-6 lg:px-8 h-full flex items-end pb-10">
              <div>
                <h1 className="text-3xl md:text-5xl font-playfair font-semibold text-white tracking-tight">
                  {content.heroTitle}
                </h1>
                <p className="mt-3 text-white/90 max-w-2xl">{content.heroDescription}</p>
                <div className="mt-4 flex gap-2">
                  {content.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="bg-white/90 text-foreground">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-6 lg:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left rail */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-card">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-playfair font-semibold">{content.introTitle}</h2>
                  <p className="mt-4 text-muted-foreground leading-7">{content.introBody}</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="divide-y">
                    {content.accordion.map((item, index) => (
                      <AccordionItem key={item.title} value={`item-${index + 1}`} className="px-6 md:px-8">
                        <AccordionTrigger className="text-left text-lg font-medium py-5">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-muted-foreground leading-7 space-y-2">
                          {Array.isArray(item.content) ? (
                            item.content.map((paragraph, paragraphIndex) => (
                              <p key={paragraphIndex} className={paragraphIndex > 0 ? "text-sm" : undefined}>
                                {paragraph}
                              </p>
                            ))
                          ) : (
                            <p>{item.content}</p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-playfair font-semibold">{content.closingTitle}</h3>
                  <p className="mt-4 text-muted-foreground leading-7">{content.closingBody}</p>
                </CardContent>
              </Card>
            </div>

            {/* Right rail */}
            <aside className="space-y-6">
              <Card className="shadow-card overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src="/cats/f8a10b0a-5ca9-484c-afe3-c1b626fa6730.jpg"
                    alt="Maine Coon cat portrait"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="font-medium">{content.recommendedTitle}</h4>
                    <Separator className="my-3" />
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {content.recommendedItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <h4 className="font-medium">{content.quickTipsTitle}</h4>
                  <Separator className="my-3" />
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {content.quickTips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default CareGuide;
