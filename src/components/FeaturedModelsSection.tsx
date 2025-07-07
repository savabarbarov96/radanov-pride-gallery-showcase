import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import modelCat1 from "@/assets/model-cat-1.jpg";
import modelCat2 from "@/assets/model-cat-2.jpg";
import modelCat3 from "@/assets/model-cat-3.jpg";

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

  const featuredCats: Cat[] = [
    {
      id: 1,
      name: "OLIVER",
      subtitle: "CLASSIC ELEGANCE",
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
      name: "SOPHIA",
      subtitle: "SILVER GRACE",
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
      name: "AURORA",
      subtitle: "CREAM PERFECTION",
      image: modelCat3,
      description: "Нежна красавица с кремав цвят и изключителни качества. Идеална за ценители на рядката красота.",
      age: "8 месеца",
      color: "Cream с бели акценти",
      status: "Резервиран",
      price: "3000 лв",
      gallery: [modelCat3, modelCat1, modelCat2]
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
      <section id="models" className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm text-muted-foreground tracking-wide uppercase mb-2">
              from muse to masterpiece
            </p>
            <h2 className="font-playfair text-4xl lg:text-5xl font-light text-modern-dark">
              Our Featured Models
            </h2>
          </div>

          {/* Models Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredCats.map((cat, index) => (
              <Card 
                key={cat.id} 
                className="group overflow-hidden bg-white shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer border-0 rounded-xl"
                onClick={() => openGallery(cat)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                      cat.status === "Достъпен" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-orange-100 text-orange-800"
                    }`}>
                      {cat.status}
                    </span>
                  </div>

                  {/* Overlay with price */}
                  <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                    <div className="text-white">
                      <div className="text-2xl font-bold">{cat.price}</div>
                    </div>
                    <Button variant="minimal" size="sm" className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-modern-dark">
                      View Gallery
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-playfair text-xl font-semibold text-modern-dark">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">
                        {cat.subtitle}
                      </p>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Възраст:</span>
                      <span className="font-medium">{cat.age}</span>
                    </div>
                  </div>
                </CardContent>

                <div className="px-6 pb-6">
                  <Button 
                    variant="minimal" 
                    className="w-full justify-center rounded-none border-modern-dark/20 hover:border-modern-dark"
                  >
                    Use Model →
                  </Button>
                </div>
              </Card>
            ))}

            {/* Add Model Card */}
            <Card className="group overflow-hidden bg-gradient-subtle shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer border-2 border-dashed border-modern-dark/20 rounded-xl">
              <CardContent className="p-12 flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-modern-dark/30 flex items-center justify-center group-hover:border-modern-dark transition-colors">
                  <svg className="w-8 h-8 text-modern-dark/60 group-hover:text-modern-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-modern-dark mb-1">Create Your Model</h3>
                  <p className="text-sm text-muted-foreground">Добавете нов модел</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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