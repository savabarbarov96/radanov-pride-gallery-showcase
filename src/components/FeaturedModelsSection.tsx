import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import modelCat1 from "@/assets/model-cat-1.jpg";
import modelCat2 from "@/assets/model-cat-2.jpg";
import modelCat3 from "@/assets/model-cat-3.jpg";
import LayoutGridDemo from "@/components/ui/layout-grid-demo";

interface Cat {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  age: string;
  color: string;
  status: string;
  price: string;
  gallery: string[];
}

const FeaturedModelsSection = () => {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { elementRef: sectionRef, isVisible: sectionVisible } = useScrollAnimation(0.1);
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation(0.3);
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation(0.2);

  const featuredCats: Cat[] = [
    {
      id: 1,
      name: "OLIVER",
      subtitle: "GINGER MAGIC",
      image: modelCat1,
      description: "Величествен мъжки мейн кун с изключителни родословни линии. Характеризира се с благородна осанка и нежен темперамент.",
      age: "2 години",
      color: "Brown tabby с бели маркировки",
      status: "Достъпен",
      price: "2500 лв",
      gallery: [modelCat1, modelCat2, modelCat3]
    },
    {
      id: 2,
      name: "TONY",
      subtitle: "TABBY JUNGLE",
      image: modelCat2,
      description: "Елегантна женска с прекрасни сребристи маркировки и изключително социален характер. Перфектна за семейство.",
      age: "1.5 години",
      color: "Silver tabby",
      status: "Достъпен",
      price: "2800 лв",
      gallery: [modelCat2, modelCat1, modelCat3]
    },
    {
      id: 3,
      name: "SALMA",
      subtitle: "WHITE GLAM",
      image: modelCat3,
      description: "Нежна красавица с кремав цвят и изключителни качества. Идеална за ценители на рядката красота.",
      age: "8 месеца",
      color: "Cream с бели акценти",
      status: "Резервиран",
      price: "3000 лв",
      gallery: [modelCat3, modelCat1, modelCat2]
    },
    {
      id: 4,
      name: "KATHERINE",
      subtitle: "LE ARTISAN NOIR",
      image: modelCat1,
      description: "Изискана черна красавица с благородни черти и изключителен характер.",
      age: "1 година",
      color: "Solid black",
      status: "Достъпен",
      price: "2700 лв",
      gallery: [modelCat1, modelCat2, modelCat3]
    },
    {
      id: 5,
      name: "ROB",
      subtitle: "NOIR ELEGANCE",
      image: modelCat2,
      description: "Интелигентен мъжки с очила на модата и изключителни качества.",
      age: "3 години",
      color: "Brown tabby",
      status: "Достъпен",
      price: "2900 лв",
      gallery: [modelCat2, modelCat1, modelCat3]
    }
  ];

  const openGallery = (cat: Cat) => {
    setSelectedCat(cat);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedCat(null);
  };

  return (
    <>
      <section ref={sectionRef} className="py-20 bg-[#F5F4F0] mb-24">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-24 transition-all duration-1000 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-sm text-gray-600 tracking-wide uppercase mb-2">
              от вдъхновение до шедьовър
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-light text-black">
              Нашите избрани модели
            </h2>
          </div>

          {/* Models Grid */}
          <div 
            ref={gridRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1000 ${
              gridVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {featuredCats.map((cat, index) => (
              <Card 
                key={cat.id} 
                className={`group overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-0 scroll-hidden ${
                  gridVisible ? 'scroll-visible' : ''
                }`}
                onClick={() => openGallery(cat)}
                style={{
                  animationDelay: `${index * 0.15}s`,
                  transitionDelay: gridVisible ? `${index * 0.1}s` : '0s'
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Dark overlay with name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="font-bold text-xl mb-1">{cat.name}</h3>
                      <p className="text-sm uppercase tracking-wide text-gray-300">{cat.subtitle}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center border-black text-black hover:bg-black hover:text-white transition-colors"
                  >
                    Избери този модел
                  </Button>
                </div>
              </Card>
            ))}

            {/* Add Model Card */}
            <Card 
              className={`group overflow-hidden bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-300 scroll-hidden ${
                gridVisible ? 'scroll-visible' : ''
              }`}
              style={{
                transitionDelay: gridVisible ? `${featuredCats.length * 0.1}s` : '0s'
              }}
            >
              <CardContent className="p-12 flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center group-hover:border-black transition-colors">
                  <svg className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">Създай свой модел</h3>
                  <p className="text-sm text-gray-600">Добавете нов модел</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-[#F5F4F0]">
        <LayoutGridDemo />
      </section>

      {/* Gallery Modal */}
      {isGalleryOpen && selectedCat && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div>
                <h3 className="font-playfair text-2xl font-semibold text-modern-dark">
                  {selectedCat.name}
                </h3>
                <p className="text-muted-foreground uppercase tracking-wide text-sm">
                  {selectedCat.subtitle}
                </p>
              </div>
              <Button 
                variant="minimal" 
                size="sm" 
                onClick={closeGallery}
                className="rounded-full w-10 h-10 p-0"
              >
                ×
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Gallery */}
                <div className="space-y-4">
                  <img 
                    src={selectedCat.image} 
                    alt={selectedCat.name}
                    className="w-full rounded-xl"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {selectedCat.gallery.slice(1).map((img, index) => (
                      <img 
                        key={index}
                        src={img} 
                        alt={`${selectedCat.name} ${index + 2}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <p className="text-foreground leading-relaxed">
                    {selectedCat.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Възраст</span>
                      <span className="font-medium">{selectedCat.age}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Цвят</span>
                      <span className="font-medium">{selectedCat.color}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">Статус</span>
                      <span className={`font-medium ${selectedCat.status === "Достъпен" ? "text-green-600" : "text-orange-600"}`}>
                        {selectedCat.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Цена</span>
                      <span className="font-bold text-lg">{selectedCat.price}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button variant="modern" className="w-full">
                      Заявете сега
                    </Button>
                    <Button variant="minimal" className="w-full">
                      Повече информация
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedModelsSection;