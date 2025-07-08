import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { catService, CatData } from '@/services/catService';
import { PedigreeTree } from '@/types/pedigree';

interface PedigreeModalProps {
  cat: CatData;
  isOpen: boolean;
  onClose: () => void;
}

const PedigreeModal = ({ cat, isOpen, onClose }: PedigreeModalProps) => {
  const [pedigreeTree, setPedigreeTree] = useState<PedigreeTree | null>(null);
  const [parentModalOpen, setParentModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<CatData | null>(null);

  useEffect(() => {
    if (isOpen && cat) {
      try {
        const tree = catService.getPedigreeTree(cat.id);
        setPedigreeTree(tree);
      } catch (error) {
        console.error('Failed to load pedigree tree:', error);
        setPedigreeTree(null);
      }
    }
  }, [isOpen, cat]);

  const openParentModal = (parent: CatData) => {
    setSelectedParent(parent);
    setParentModalOpen(true);
  };

  const closeParentModal = () => {
    setParentModalOpen(false);
    setSelectedParent(null);
  };

  if (!isOpen) return null;

  const parents = catService.getParents(cat.id);
  const { mother, father } = parents;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#F5F4F0] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="font-playfair text-2xl font-semibold text-black">
              Родословие
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Семейно дърво на {cat.name}
            </p>
          </div>
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-full w-10 h-10 p-0 border-black text-black hover:bg-black hover:text-white"
          >
            ×
          </Button>
        </div>

        {/* Pedigree Tree */}
        <div className="p-8">
          <div className="flex flex-col items-center space-y-8">
            {/* Header Info */}
            <div className="text-center mb-4">
              <h3 className="font-playfair text-xl text-black mb-2">
                {cat.name}
              </h3>
              <p className="text-gray-600 text-sm">
                Връзка: radanov-pride.com/{cat.id}
              </p>
            </div>

            {/* Main Cat Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg text-black mb-2">
                {cat.name}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                {cat.subtitle}
              </p>
              <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
                <span>{cat.gender === 'male' ? '♂' : '♀'}</span>
                <span>•</span>
                <span>{cat.age}</span>
                <span>•</span>
                <span>{cat.color}</span>
              </div>
            </div>

            {/* Connection Lines */}
            {(mother || father) && (
              <div className="relative flex flex-col items-center">
                {/* Vertical line down */}
                <div className="w-px h-8 bg-gray-400"></div>
                {/* Horizontal line */}
                <div className="w-64 h-px bg-gray-400"></div>
                {/* Two vertical lines up to parents */}
                <div className="relative w-64 h-8">
                  <div className="absolute left-16 top-0 w-px h-8 bg-gray-400"></div>
                  <div className="absolute right-16 top-0 w-px h-8 bg-gray-400"></div>
                </div>
              </div>
            )}

            {/* Parents Section */}
            {(mother || father) && (
              <div className="flex justify-center items-start gap-16">
                {/* Mother */}
                <div className="flex flex-col items-center">
                  {mother ? (
                    <div className="bg-white rounded-lg shadow-lg p-4 w-64 text-center cursor-pointer hover:shadow-xl transition-shadow"
                         onClick={() => openParentModal(mother)}>
                      <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-3">
                        <img
                          src={mother.image}
                          alt={mother.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-black mb-1">
                        {mother.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {mother.subtitle}
                      </p>
                      <div className="flex justify-center items-center gap-1 text-xs text-gray-500 mb-2">
                        <span>♀</span>
                        <span>•</span>
                        <span>{mother.age}</span>
                      </div>
                      <div className="text-xs text-blue-600 hover:text-blue-800">
                        Кликни за повече информация
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-4 w-64 h-40 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <p className="font-medium mb-1">Майка</p>
                        <p className="text-sm">Няма данни</p>
                      </div>
                    </div>
                  )}
                  <div className="mt-2 text-sm font-medium text-pink-600">
                    Майка
                  </div>
                </div>

                {/* Father */}
                <div className="flex flex-col items-center">
                  {father ? (
                    <div className="bg-white rounded-lg shadow-lg p-4 w-64 text-center cursor-pointer hover:shadow-xl transition-shadow"
                         onClick={() => openParentModal(father)}>
                      <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-3">
                        <img
                          src={father.image}
                          alt={father.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-black mb-1">
                        {father.name}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {father.subtitle}
                      </p>
                      <div className="flex justify-center items-center gap-1 text-xs text-gray-500 mb-2">
                        <span>♂</span>
                        <span>•</span>
                        <span>{father.age}</span>
                      </div>
                      <div className="text-xs text-blue-600 hover:text-blue-800">
                        Кликни за повече информация
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-4 w-64 h-40 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <p className="font-medium mb-1">Баща</p>
                        <p className="text-sm">Няма данни</p>
                      </div>
                    </div>
                  )}
                  <div className="mt-2 text-sm font-medium text-blue-600">
                    Баща
                  </div>
                </div>
              </div>
            )}

            {/* No Parents Message */}
            {!mother && !father && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  Няма налична информация за родителите
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Родословието все още не е въведено в системата
                </p>
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
              <h4 className="font-semibold text-lg text-black mb-4">
                Информация за котката
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Име:</span>
                  <span className="ml-2 font-medium">{cat.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Възраст:</span>
                  <span className="ml-2 font-medium">{cat.age}</span>
                </div>
                <div>
                  <span className="text-gray-600">Цвят:</span>
                  <span className="ml-2 font-medium">{cat.color}</span>
                </div>
                <div>
                  <span className="text-gray-600">Статус:</span>
                  <span className={`ml-2 font-medium ${
                    cat.status === 'Достъпен' ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {cat.status}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Цена:</span>
                  <span className="ml-2 font-medium">{cat.price}</span>
                </div>
                <div>
                  <span className="text-gray-600">Пол:</span>
                  <span className="ml-2 font-medium">
                    {cat.gender === 'male' ? 'Мъжки' : 'Женски'}
                  </span>
                </div>
              </div>
              
              {cat.description && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              )}

              {cat.freeText && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-black mb-2">
                    Допълнителна информация:
                  </h5>
                  <p className="text-gray-700 leading-relaxed">
                    {cat.freeText}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Parent Modal */}
      {parentModalOpen && selectedParent && (
        <PedigreeModal
          cat={selectedParent}
          isOpen={parentModalOpen}
          onClose={closeParentModal}
        />
      )}
    </div>
  );
};

export default PedigreeModal;