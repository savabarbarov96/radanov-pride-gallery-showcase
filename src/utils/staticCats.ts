// Static cat data using images from /public/cats/
export interface StaticCatData {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  age: string;
  color: string;
  status: string;
  gallery: string[];
  gender: 'male' | 'female';
  category: 'kitten' | 'adult';
  isJonaliMaineCoon?: boolean;
}

export const staticCats: StaticCatData[] = [
  {
    id: "14fc2162-3763-4a37-8f97-eb7ac21c085d",
    name: "Аврора",
    subtitle: "Елегантна принцеса",
    image: "/cats/14fc2162-3763-4a37-8f97-eb7ac21c085d.jpg",
    description: "Аврора е изключително красива котка с нежен характер и величествена осанка. Тя обича да наблюдава света от високо място и да получава внимание.",
    age: "2 години",
    color: "Кремаво-бял",
    status: "Достъпна",
    gallery: [],
    gender: "female",
    category: "adult"
  },
  {
    id: "1686e1a3-9356-4416-887d-62cf35aa68cf",
    name: "Максимус",
    subtitle: "Благороден господин",
    image: "/cats/1686e1a3-9356-4416-887d-62cf35aa68cf.jpg",
    description: "Максимус е внушителен мейн кун с царствена осанка. Той е спокоен, интелигентен и много привързан към семейството си.",
    age: "3 години",
    color: "Тъмно кафяв табби",
    status: "Достъпен",
    gallery: [],
    gender: "male",
    category: "adult"
  },
  {
    id: "2071859f-7f45-484c-94fb-ff3327c92edd",
    name: "Луна",
    subtitle: "Мистична красавица",
    image: "/cats/2071859f-7f45-484c-94fb-ff3327c92edd.jpg",
    description: "Луна притежава магнетична красота и игрив дух. Тя е любопитна и активна, обича да изследва всеки ъгъл от дома.",
    age: "1.5 години",
    color: "Сребристо сиво",
    status: "Достъпна",
    gallery: [],
    gender: "female",
    category: "adult"
  },
  {
    id: "311b6cf8-a6aa-4314-99a6-3d8be864aea5",
    name: "Титан",
    subtitle: "Могъщ воин",
    image: "/cats/311b6cf8-a6aa-4314-99a6-3d8be864aea5.jpg",
    description: "Титан е впечатляващ мейн кун с силен характер и нежно сърце. Въпреки размерите си, той е изключително нежен с деца.",
    age: "4 години",
    color: "Червен табби",
    status: "Достъпен",
    gallery: [],
    gender: "male",
    category: "adult"
  },
  {
    id: "3e53631a-57b1-4efe-93cc-bb18c1e31b88",
    name: "Белла",
    subtitle: "Сладко съкровище",
    image: "/cats/3e53631a-57b1-4efe-93cc-bb18c1e31b88.jpg",
    description: "Белла е очарователно котенце с игрив характер и безкрайна енергия. Тя обича да се играе и да изследва света около себе си.",
    age: "6 месеца",
    color: "Крем и кафяво",
    status: "Достъпна",
    gallery: [],
    gender: "female",
    category: "kitten"
  },
  {
    id: "707ac156-a428-4c3c-9585-44cbf9f2af07",
    name: "Оливър",
    subtitle: "Малкия джентълмен",
    image: "/cats/707ac156-a428-4c3c-9585-44cbf9f2af07.jpg",
    description: "Оливър е очарователно котенце с любознателен нрав. Той е социален и обича да бъде в центъра на вниманието.",
    age: "5 месеца",
    color: "Кафяв табби",
    status: "Достъпен",
    gallery: [],
    gender: "male",
    category: "kitten"
  },
  {
    id: "83ba538a-d468-41b3-b667-c1b921e30a5f",
    name: "София",
    subtitle: "Мъдрата принцеса",
    image: "/cats/83ba538a-d468-41b3-b667-c1b921e30a5f.jpg",
    description: "София е елегантна котка с изискан вкус и спокоен темперамент. Тя предпочита тихите моменти и нежните галежи.",
    age: "2.5 години",
    color: "Сиво-бял",
    status: "Достъпна",
    gallery: [],
    gender: "female",
    category: "adult"
  },
  {
    id: "ac9cd5e7-9503-4fb8-97c3-9b5a8c066e7f",
    name: "Аполон",
    subtitle: "Златният принц",
    image: "/cats/ac9cd5e7-9503-4fb8-97c3-9b5a8c066e7f.jpg",
    description: "Аполон е величествен мейн кун със златист цвят и благороден характер. Той е лоялен и защитнически настроен към семейството си.",
    age: "3.5 години",
    color: "Златист крем",
    status: "Достъпен",
    gallery: [],
    gender: "male",
    category: "adult"
  },
  {
    id: "beed2196-c47f-47f5-ba92-8940e07791be",
    name: "Мила",
    subtitle: "Нежна душа",
    image: "/cats/beed2196-c47f-47f5-ba92-8940e07791be.jpg",
    description: "Мила е сладко котенце с изключително нежен характер. Тя обича да се сгушва и да спи в топлите места.",
    age: "4 месеца",
    color: "Многоцветен",
    status: "Достъпна",
    gallery: [],
    gender: "female",
    category: "kitten"
  },
  {
    id: "e11886d6-4f6d-40c8-82fa-6ab0a167625d",
    name: "Виктор",
    subtitle: "Смелия изследовател",
    image: "/cats/e11886d6-4f6d-40c8-82fa-6ab0a167625d.jpg",
    description: "Виктор е авантюристично котенце, което обича да изследва и да се катери. Той е игрив и винаги готов за нови приключения.",
    age: "7 месеца",
    color: "Тъмен табби",
    status: "Достъпен",
    gallery: [],
    gender: "male",
    category: "kitten"
  },
  {
    id: "f8a10b0a-5ca9-484c-afe3-c1b626fa6730",
    name: "Диана",
    subtitle: "Грациозната ловкиня",
    image: "/cats/f8a10b0a-5ca9-484c-afe3-c1b626fa6730.jpg",
    description: "Диана е елегантна котка с грациозни движения и внимателен поглед. Тя е интелигентна и обича интерактивните игри.",
    age: "2 години",
    color: "Сиво-табби",
    status: "Достъпна",
    gallery: [],
    gender: "female",
    category: "adult"
  },
  {
    id: "f9e12623-74b9-4863-8554-de2a7cb23a54",
    name: "Александър",
    subtitle: "Величественият цар",
    image: "/cats/f9e12623-74b9-4863-8554-de2a7cb23a54.jpg",
    description: "Александър е впечатляващ мейн кун с царска осанка и силен характер. Той е уверен в себе си и много защитнически настроен.",
    age: "4.5 години",
    color: "Кафяво-черен табби",
    status: "Достъпен",
    gallery: [],
    gender: "male",
    category: "adult"
  }
];

// Filter functions to match the existing Convex service patterns
export const getStaticCatsByCategory = (category: 'all' | 'kitten' | 'adult'): StaticCatData[] => {
  if (category === 'all') {
    return staticCats;
  }
  return staticCats.filter(cat => cat.category === category);
};

export const getStaticCatById = (id: string): StaticCatData | undefined => {
  return staticCats.find(cat => cat.id === id);
};

export const getStaticCatsByGender = (gender: 'male' | 'female'): StaticCatData[] => {
  return staticCats.filter(cat => cat.gender === gender);
};