import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import featuredCat1 from "@/assets/featured-cat-1.jpg";
import featuredCat2 from "@/assets/featured-cat-2.jpg";

const FeaturedCatsSection = () => {
  const cats = [
    {
      id: 1,
      name: "Аристократ Радан",
      image: featuredCat1,
      color: "Brown tabby с бели маркировки",
      age: "2 години",
      status: "Производител",
      description: "Величествен мъжки с отлични родословни линии и изключителен характер."
    },
    {
      id: 2,
      name: "Принцеса Мила",
      image: featuredCat2,
      color: "Silver tabby",
      age: "8 месеца",
      status: "Наличен",
      description: "Очарователно женско коте с игрив характер и прекрасни характеристики."
    }
  ];

  return (
    <section id="cats" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-luxury-brown mb-6">
            Наши котки
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Запознайте се с нашите великолепни мейн кун котки - всяка със своя уникална 
            красота и неповторим характер
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cats.map((cat) => (
            <Card key={cat.id} className="overflow-hidden shadow-luxury hover:shadow-gold transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    cat.status === "Наличен" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-luxury-gold text-luxury-brown"
                  }`}>
                    {cat.status}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-luxury-brown mb-3">
                  {cat.name}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Цвят:</span>
                    <span className="font-medium">{cat.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Възраст:</span>
                    <span className="font-medium">{cat.age}</span>
                  </div>
                </div>
                
                <p className="text-foreground leading-relaxed">
                  {cat.description}
                </p>
              </CardContent>
              
              <CardFooter className="px-6 pb-6">
                <Button variant="luxury" className="w-full">
                  Още информация
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="gold" size="lg">
            Вижте всички котки
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCatsSection;