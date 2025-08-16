import ModernNavigation from "@/components/ModernNavigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/useLanguage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BackgroundAnimations from "@/components/BackgroundAnimations";

const CareGuide = () => {
	const { t, language } = useLanguage();

	return (
		<div className="min-h-screen bg-background relative">
			<BackgroundAnimations />
			<div className="relative z-10">
				<Helmet>
					<title>{language === 'bg' ? 'Грижа за Мейн Куун - Ръководство' : 'Maine Coon Care Guide'}</title>
					<meta name="description" content={language === 'bg' ? 'Пълно ръководство за грижа за котенце Мейн Куун: тоалетна, храна, катерушка, играчки, грууминг, здраве и безопасност.' : 'Complete Maine Coon kitten care guide: litter box, food, tree, toys, grooming, health and home safety.'} />
				</Helmet>

				<ModernNavigation />

				{/* Hero */}
				<section className="relative">
					<div
						className="w-full h-[42vh] md:h-[52vh] bg-center bg-cover"
						style={{
							backgroundImage:
								"linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)), url('https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1800&auto=format&fit=crop')",
						}}
					>
						<div className="container mx-auto px-6 lg:px-8 h-full flex items-end pb-10">
							<div>
								<h1 className="text-3xl md:text-5xl font-playfair font-semibold text-white tracking-tight">
									{language === 'bg' ? 'Грижа за Мейн Куун' : 'Maine Coon Care Guide'}
								</h1>
								<p className="mt-3 text-white/90 max-w-2xl">
									{language === 'bg'
										? 'Практично ръководство за първите ви дни у дома с котенце Мейн Куун – подбрани съвети, списъци и препоръки.'
										: 'Practical, theme-matched care guide for your first days at home with a Maine Coon kitten.'}
								</p>
								<div className="mt-4 flex gap-2">
									<Badge variant="secondary" className="bg-white/90 text-foreground">Kitten</Badge>
									<Badge variant="secondary" className="bg-white/90 text-foreground">Maine Coon</Badge>
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
									<h2 className="text-2xl md:text-3xl font-playfair font-semibold">🐾 Добре дошли у дома, малко мейн кун съкровище!</h2>
									<p className="mt-4 text-muted-foreground leading-7">
										Грижата за мейн кун котенце е приключение, изпълнено с нежност и много пух. Събрахме важните неща за най-доброто начало.
									</p>
								</CardContent>
							</Card>

							<Card className="shadow-card">
								<CardContent className="p-0">
									<Accordion type="single" collapsible className="divide-y">
										<AccordionItem value="item-1" className="px-6 md:px-8">
											<AccordionTrigger className="text-left text-lg font-medium py-5">1️⃣ Просторна и удобна затворена котешка тоалетна</AccordionTrigger>
											<AccordionContent className="pb-6 text-muted-foreground leading-7">
												Изберете затворена тоалетна с големи размери, широк вход и филтър против миризми. Съчетавайте с бентонитова или биоразградима постелка.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-2" className="px-6 md:px-8">
											<AccordionTrigger className="text-left text-lg font-medium py-5">2️⃣ Купички и автоматизация за хранене и вода</AccordionTrigger>
											<AccordionContent className="pb-6 text-muted-foreground leading-7">
												Ползвайте метални или керамични купички. Фонтан-поилка насърчава пиенето на вода. Автоматични хранилки са удобни за заети дни.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-3" className="px-6 md:px-8">
											<AccordionTrigger className="text-left text-lg font-medium py-5">3️⃣ Премиум храна за котенца – високо протеинова</AccordionTrigger>
											<AccordionContent className="pb-6 text-muted-foreground leading-7">
												Изберете храна с висок животински протеин, без излишни пълнители. Подходящи марки: Orijen Kitten, Farmina N&D Kitten, Applaws, Carnilove, Royal Canin Maine Coon Kitten, Purina Pro Plan Kitten, Concept for Life Maine Coon Kitten.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-4" className="px-6 md:px-8">
											<AccordionTrigger className="text-left text-lg font-medium py-5">4️⃣ Катерушка – царството на мейн куна</AccordionTrigger>
											<AccordionContent className="pb-6 text-muted-foreground leading-7">
												Голяма, стабилна катерушка (мин. 150 см) с дебели стълбове, сисал и меки зони за почивка. Поставете я до прозорец за любимо наблюдение.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-5" className="px-6 md:px-8">
											<AccordionTrigger className="text-left text-lg font-medium py-5">5️⃣ Играчки за интелигентно и активно коте</AccordionTrigger>
											<AccordionContent className="pb-6 text-muted-foreground leading-7">
												Въдици с пера, интерактивни тунели и топки, играчки-пъзели. Въртете играчките през няколко дни за поддържане на интереса.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-6" className="px-6 md:px-8">
											<AccordionTrigger className="text-left text-lg font-medium py-5">6️⃣ Грууминг – грижа за пищната козина</AccordionTrigger>
											<AccordionContent className="pb-6 text-muted-foreground leading-7 space-y-2">
												<p>Гребен с дълги зъби, сликер четка, ножица за нокти. За баня: Groomers Goop Degreaser & Shampoo или сух шампоан/натурална пудра.</p>
												<p className="text-sm">Започнете отрано и превърнете грижата в ритуал на доверие.</p>
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-7" className="px-6 md:px-8">
											<AccordionTrigger className="text-left text-lg font-medium py-5">7️⃣ Здраве – ваксини и обезпаразитяване</AccordionTrigger>
											<AccordionContent className="pb-6 text-muted-foreground leading-7">
												Годишни ваксини; вътрешно обезпаразитяване на ~3 месеца; външна защита целогодишно. Работете с доверен ветеринар и поддържайте здравен картон.
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="item-8" className="px-6 md:px-8">
											<AccordionTrigger className="text-left text-lg font-medium py-5">8️⃣ Безопасност у дома</AccordionTrigger>
											<AccordionContent className="pb-6 text-muted-foreground leading-7">
												Обезопасете балкони и прозорци с метални мрежи; не оставяйте прозорци „на ножица“; заключвайте тъч котлони; комарниците не са надеждни.
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</CardContent>
							</Card>

							<Card className="shadow-card">
								<CardContent className="p-6 md:p-8">
									<h3 className="text-xl md:text-2xl font-playfair font-semibold">❤️ Финални думи</h3>
									<p className="mt-4 text-muted-foreground leading-7">
										Мейн Куун не е просто порода – това е душа с характер и привързаност. Подготовката, вниманието и любовта са ключът към дълъг и щастлив живот.
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Right rail */}
						<aside className="space-y-6">
							<Card className="shadow-card overflow-hidden">
								<CardContent className="p-0">
									<img
										src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80&w=1200&auto=format&fit=crop"
										alt="Maine Coon cat portrait"
										className="w-full h-48 object-cover"
									/>
									<div className="p-6">
										<h4 className="font-medium">Препоръчани аксесоари</h4>
										<Separator className="my-3" />
										<ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
											<li>Фонтан-поилка за свежа вода</li>
											<li>Катерушка 150+ см със сисал</li>
											<li>Гребен и сликер четка</li>
											<li>Играчки-пъзели</li>
										</ul>
									</div>
								</CardContent>
							</Card>

							<Card className="shadow-card">
								<CardContent className="p-6">
									<h4 className="font-medium">Бързи съвети</h4>
									<Separator className="my-3" />
									<ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
										<li>Вода винаги чиста и течаща при възможност</li>
										<li>Седмичен грууминг; ежедневна проверка за сплъстявания</li>
										<li>Социализация чрез игра всеки ден</li>
										<li>Безопасни прозорци и балкони</li>
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


