import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Sample data migration from the original catService
export const migrateSampleData = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    // Clear existing data first
    const existingCats = await ctx.db.query("cats").collect();
    for (const cat of existingCats) {
      await ctx.db.delete(cat._id);
    }
    
    const existingConnections = await ctx.db.query("pedigreeConnections").collect();
    for (const connection of existingConnections) {
      await ctx.db.delete(connection._id);
    }

    // Insert sample cats
    const catData = [
      {
        name: 'OLIVER',
        subtitle: 'GINGER MAGIC',
        image: '/src/assets/model-cat-1.jpg',
        description: 'Величествен мъжки мейн кун с изключителни родословни линии.',
        age: '2 години',
        color: 'Brown tabby с бели маркировки',
        status: 'Достъпен',
        price: '2500 лв',
        gallery: ['/src/assets/model-cat-1.jpg'],
        gender: 'male' as const,
        birthDate: '2022-01-15',
        registrationNumber: 'MC-2022-001',
        isDisplayed: true,
        freeText: 'Изключителен характер, много социален'
      },
      {
        name: 'BELLA',
        subtitle: 'SILVER GRACE',
        image: '/src/assets/model-cat-2.jpg',
        description: 'Елегантна женска с прекрасни сребристи маркировки.',
        age: '3 години',
        color: 'Silver tabby',
        status: 'Достъпен',
        price: '2800 лв',
        gallery: ['/src/assets/model-cat-2.jpg'],
        gender: 'female' as const,
        birthDate: '2021-03-10',
        registrationNumber: 'MC-2021-002',
        isDisplayed: true,
        freeText: 'Перфектна майка, много грижовна'
      },
      {
        name: 'LUNA',
        subtitle: 'MIDNIGHT BEAUTY',
        image: '/src/assets/model-cat-3.jpg',
        description: 'Красива женска котка с тъмни маркировки.',
        age: '6 месеца',
        color: 'Brown tabby',
        status: 'Достъпен',
        price: '3000 лв',
        gallery: ['/src/assets/model-cat-3.jpg'],
        gender: 'female' as const,
        birthDate: '2024-06-15',
        registrationNumber: 'MC-2024-003',
        isDisplayed: true,
        freeText: 'Младо котенце, много игриво'
      },
      {
        name: 'MAXIMUS',
        subtitle: 'ROYAL THUNDER',
        image: '/src/assets/featured-cat-1.jpg',
        description: 'Мощен мъжки мейн кун с внушителни размери и благороден характер.',
        age: '4 години',
        color: 'Red classic tabby',
        status: 'Достъпен',
        price: '3200 лв',
        gallery: ['/src/assets/featured-cat-1.jpg'],
        gender: 'male' as const,
        birthDate: '2020-11-20',
        registrationNumber: 'MC-2020-004',
        isDisplayed: true,
        freeText: 'Отличен бащински инстинкт, спокоен темперамент'
      },
      {
        name: 'AURORA',
        subtitle: 'CRYSTAL SNOW',
        image: '/src/assets/featured-cat-2.jpg',
        description: 'Изящна котка с перфектни бели маркировки и лазурни очи.',
        age: '1 година',
        color: 'Blue silver tabby с бели',
        status: 'Достъпен',
        price: '2900 лв',
        gallery: ['/src/assets/featured-cat-2.jpg'],
        gender: 'female' as const,
        birthDate: '2023-08-12',
        registrationNumber: 'MC-2023-005',
        isDisplayed: true,
        freeText: 'Изключително красива, много фотогенична'
      },
      {
        name: 'THOR',
        subtitle: 'STORM WARRIOR',
        image: '/src/assets/istockphoto-1092493548-612x612.jpg',
        description: 'Внушителен мъжки с дива красота и силен характер.',
        age: '5 години',
        color: 'Brown mackerel tabby',
        status: 'Достъпен',
        price: '2700 лв',
        gallery: ['/src/assets/istockphoto-1092493548-612x612.jpg'],
        gender: 'male' as const,
        birthDate: '2019-04-08',
        registrationNumber: 'MC-2019-006',
        isDisplayed: true,
        freeText: 'Опитен бащински производител, много здрав'
      }
    ];

    // Insert cats and store their IDs
    const catIds: Record<string, any> = {};
    const catNames = ['OLIVER', 'BELLA', 'LUNA', 'MAXIMUS', 'AURORA', 'THOR'];
    
    for (let i = 0; i < catData.length; i++) {
      const catId = await ctx.db.insert("cats", catData[i]);
      catIds[catNames[i]] = catId;
    }

    // Insert sample pedigree connections (OLIVER father, BELLA mother of LUNA)
    await ctx.db.insert("pedigreeConnections", {
      parentId: catIds['OLIVER'],
      childId: catIds['LUNA'],
      type: 'father' as const
    });

    await ctx.db.insert("pedigreeConnections", {
      parentId: catIds['BELLA'],
      childId: catIds['LUNA'],
      type: 'mother' as const
    });

    return null;
  },
});