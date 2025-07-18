import { useState } from "react";
import { ChevronDown, ChevronRight, Heart, Shield, Award, Users } from "lucide-react";
import ModernNavigation from "@/components/ModernNavigation";
import BackgroundAnimations from "@/components/BackgroundAnimations";
import FloatingSeparator from "@/components/FloatingSeparator";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Information = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const faqData = [
    {
      question: "Каква е разликата между мъжките и женските Мейн Куун котки?",
      answer: "Мъжките обикновено са по-едри (6-9 кг), с по-изразени черти на лицето и често са по-общителни. Женските са по-малки (4-6 кг), но са по-независими и често по-ловни."
    },
    {
      question: "Колко време живеят Мейн Куун котките?",
      answer: "При добра грижа, Мейн Куун котките живеят между 12-15 години. Редовните ветеринарни прегледи и качествената храна са ключови за дълголетието."
    },
    {
      question: "Нуждаят ли се от специална грижа за козината?",
      answer: "Да, дългата им козина изисква ежедневно четкане за предотвратяване на заплитане. Препоръчваме четка с метални зъбци и гребен с широки зъбци."
    },
    {
      question: "Подходящи ли са за семейства с деца?",
      answer: "Абсолютно! Мейн Куун котките са известни със своята нежност и търпение към деца. Те са игриви, но не агресивни."
    },
    {
      question: "Каква е цената на котенце от Radanov Pride?",
      answer: "Цените варират в зависимост от родословието, качеството и предназначението. Свържете се с нас за актуални цени и наличност."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimations />
      <div className="relative z-10">
        <ModernNavigation />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Информация за породата Мейн Куун
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Научете всичко за тази величествена порода - от характеристики до грижа
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4" />
                <span>Чистокръвни линии</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Здравни гаранции</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4" />
                <span>Любов и грижа</span>
              </div>
            </div>
          </div>
        </section>

        <FloatingSeparator size="medium" variant="dots" className="my-8" />

        {/* Main Content */}
        <div className="container mx-auto px-6 max-w-6xl">
          <Tabs defaultValue="breed" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="breed">Породата</TabsTrigger>
              <TabsTrigger value="care">Грижа</TabsTrigger>
              <TabsTrigger value="health">Здраве</TabsTrigger>
              <TabsTrigger value="breeding">Развъждане</TabsTrigger>
            </TabsList>

            <TabsContent value="breed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Характеристики на породата
                  </CardTitle>
                  <CardDescription>
                    Мейн Куун е най-голямата домашна порода котки в света
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Физически характеристики</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Тегло: Мъжки 6-9 кг, Женски 4-6 кг</li>
                        <li>• Дължина: До 100 см включително опашката</li>
                        <li>• Козина: Полудълга, водоустойчива</li>
                        <li>• Опашка: Дълга и пухкава</li>
                        <li>• Уши: Големи с четчички на върховете</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Характер и темперамент</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Нежни великани с кротък характер</li>
                        <li>• Много социални и привързани към семейството</li>
                        <li>• Интелигентни и лесно обучими</li>
                        <li>• Обичат водата (рядко за котки)</li>
                        <li>• Издават мелодични звуци</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>История на породата</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Мейн Куун произхожда от щата Мейн в САЩ и е една от най-старите породи в Северна Америка. 
                    Легендите разказват различни истории за произхода им, но най-вероятното е, че са резултат от 
                    кръстосване между домашни котки и дългокосмести котки, донесени от моряци. Породата почти 
                    изчезна в началото на 20-ти век, но беше възстановена благодарение на усилията на запалени 
                    развъдници.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ежедневна грижа</CardTitle>
                  <CardDescription>
                    Основни указания за грижа за вашата Мейн Куун котка
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Грижа за козината</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Ежедневно четкане с метална четка</li>
                        <li>• Използвайте гребен за областите склонни към заплитане</li>
                        <li>• Банята е необходима само при нужда</li>
                        <li>• Редовно подстригване на ноктите</li>
                        <li>• Почистване на ушите веднъж седмично</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Хранене</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Висококачествена храна за котки</li>
                        <li>• Количество според възрастта и активността</li>
                        <li>• Прясна вода винаги на разположение</li>
                        <li>• Избягвайте опасни за котки храни</li>
                        <li>• Редовни хранителни режими</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Среда и условия</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Подходящи условия</h3>
                      <p className="text-sm text-muted-foreground">
                        Мейн Куун котките се адаптират добре към различни условия, но предпочитат 
                        по-хладни температури поради дебелата си козина. Нуждаят се от достатъчно 
                        пространство за движение и игра.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Игра и активност</h3>
                      <p className="text-sm text-muted-foreground">
                        Осигурете високи повърхности за катерене, интерактивни играчки и възможности 
                        за лов. Мейн Куун котките остават игриви и в зряла възраст.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Здравословни аспекти
                  </CardTitle>
                  <CardDescription>
                    Информация за здравето и превенцията при Мейн Куун
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Общи здравословни проблеми</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Хипертрофична кардиомиопатия (HCM)</li>
                        <li>• Спинална мускулна атрофия (SMA)</li>
                        <li>• Поликистоза на бъбреците (PKD)</li>
                        <li>• Дисплазия на тазобедрената става</li>
                        <li>• Гингивит и зъбни проблеми</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Превенция и грижа</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Редовни ветеринарни прегледи</li>
                        <li>• Генетични тестове на родителите</li>
                        <li>• Правилно хранене и контрол на теглото</li>
                        <li>• Ваксинации и дегелминтизация</li>
                        <li>• Стерилизация/кастрация</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Нашите здравни гаранции</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Всички наши котенца идват с:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Ветеринарен паспорт с актуални ваксини</li>
                      <li>• Генетични тестове на родителите</li>
                      <li>• Здравна гаранция за първата година</li>
                      <li>• Пълно ветеринарно изследване</li>
                      <li>• Консултация и подкрепа след осиновяването</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breeding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Нашата развъдна програма
                  </CardTitle>
                  <CardDescription>
                    Radanov Pride - отдадени на качеството и стандартите
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Развъдни стандарти</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Строго селектирани родители</li>
                        <li>• Пълни генетични тестове</li>
                        <li>• Съответствие с международни стандарти</li>
                        <li>• Здравословни изследвания</li>
                        <li>• Родословие от чемпиони</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Процес на осиновяване</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Запознаване с котенцата</li>
                        <li>• Обсъждане на нуждите</li>
                        <li>• Подготовка на дома</li>
                        <li>• Предаване с документи</li>
                        <li>• Продължаваща подкрепа</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Нашите принципи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      В Radanov Pride вярваме в отговорното развъждане. Всяко котенце е отглеждано 
                      в семейна среда с много любов и грижа. Целим да произвеждаме здрави, 
                      красиви и темпераментни котки, които ще бъдат чудесни семейни спътници.
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>Любов към породата</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span>Здравни гаранции</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span>Високи стандарти</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <FloatingSeparator size="medium" variant="circles" className="my-12" />

        {/* FAQ Section */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Често задавани въпроси</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Collapsible key={index} className="border rounded-lg">
                  <CollapsibleTrigger
                    className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50"
                    onClick={() => toggleSection(`faq-${index}`)}
                  >
                    <h3 className="font-medium">{faq.question}</h3>
                    {openSections.includes(`faq-${index}`) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        <FloatingSeparator size="small" variant="lines" className="my-8" />

        <Footer />
      </div>
    </div>
  );
};

export default Information;