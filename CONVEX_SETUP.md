# Convex Database Setup Guide

This guide will help you set up Convex as the database for your Radanov Pride Gallery Showcase application.

## Prerequisites

- Node.js (v18 or later)
- npm or bun
- Convex account (free at https://convex.dev)

## Step 1: Install Convex CLI

```bash
npm install -g convex
```

## Step 2: Initialize Convex Project

1. Navigate to your project root directory
2. Run the following command to initialize Convex:

```bash
npx convex dev
```

This will:
- Create a new Convex project (if you don't have one)
- Generate environment variables
- Set up the development environment

## Step 3: Configure Environment Variables

Create a `.env.local` file in your project root with the following content:

```env
# Convex
VITE_CONVEX_URL=https://your-deployment-url.convex.cloud
```

Replace `your-deployment-url` with the actual URL provided by Convex during setup.

## Step 4: Deploy Convex Functions

Deploy your schema and functions to Convex:

```bash
npx convex deploy
```

This will create all the necessary tables and functions in your Convex database.

## Step 5: Seed the Database

To populate your database with the initial cat data, you'll need to run the seed function:

```bash
npx convex run seed:seedDatabase
```

This will create:
- 6 sample cats (Oliver, Bella, Luna, Maximus, Aurora, Thor)
- Sample pedigree connections (Luna as child of Oliver and Bella)

## Step 6: Update Application Configuration

The application is already configured to use Convex. Make sure your `src/main.tsx` includes the ConvexProvider:

```tsx
import { ConvexProvider } from 'convex/react'
import convex from './lib/convex.ts'

// ... other imports

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      {/* ... rest of your app */}
    </ConvexProvider>
  </StrictMode>,
)
```

## Step 7: Choose Authentication Provider

You have two authentication options:

### Option A: Use Convex Authentication (Recommended)
Update your `src/main.tsx` to use the new ConvexAuthProvider:

```tsx
import { ConvexAuthProvider } from './hooks/useConvexAuth.tsx'

// Replace AdminAuthProvider with ConvexAuthProvider
<ConvexAuthProvider>
  <App />
</ConvexAuthProvider>
```

### Option B: Keep Existing Authentication
Keep using the existing `AdminAuthProvider` if you prefer the current setup.

## Available Convex Functions

### Cat Management
- `cats:getAllCats` - Get all cats
- `cats:getDisplayedCats` - Get only displayed cats
- `cats:getCatById` - Get cat by ID
- `cats:createCat` - Create new cat
- `cats:updateCat` - Update existing cat
- `cats:deleteCat` - Delete cat
- `cats:toggleCatDisplay` - Toggle cat visibility
- `cats:searchCats` - Search cats by criteria

### Pedigree Management
- `pedigree:getAllConnections` - Get all parent-child connections
- `pedigree:getParents` - Get parents of a cat
- `pedigree:getChildren` - Get children of a cat
- `pedigree:addConnection` - Add parent-child relationship
- `pedigree:removeConnection` - Remove relationship
- `pedigree:generateFamilyTree` - Generate family tree
- `pedigree:savePedigreeTree` - Save family tree
- `pedigree:getSavedPedigreeTrees` - Get saved trees

### Authentication
- `auth:login` - Admin login with session
- `auth:logout` - Logout and invalidate session
- `auth:validateSession` - Check session validity
- `auth:extendSession` - Extend session duration

### Contact Management
- `contact:submitContact` - Submit contact form
- `contact:getAllContacts` - Get all contact submissions
- `contact:updateContactStatus` - Update contact status
- `contact:getContactStatistics` - Get contact statistics

## Using Convex in Components

### Example: Using Cat Data

```tsx
import { useDisplayedCats, useCreateCat } from '@/services/convexCatService';

function CatList() {
  const cats = useDisplayedCats();
  const createCat = useCreateCat();

  const handleCreateCat = async (catData) => {
    try {
      await createCat(catData);
      console.log('Cat created successfully!');
    } catch (error) {
      console.error('Failed to create cat:', error);
    }
  };

  if (cats === undefined) {
    return <div>Loading cats...</div>;
  }

  return (
    <div>
      {cats.map(cat => (
        <div key={cat._id}>{cat.name}</div>
      ))}
    </div>
  );
}
```

### Example: Using Authentication

```tsx
import { useConvexAuth } from '@/hooks/useConvexAuth';

function AdminLogin() {
  const { login, isAuthenticated, isLoading } = useConvexAuth();

  const handleLogin = async (password: string) => {
    const success = await login(password);
    if (success) {
      console.log('Logged in successfully!');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <div>Welcome, Admin!</div>;

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleLogin(formData.get('password') as string);
    }}>
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Development Commands

```bash
# Start Convex development server
npx convex dev

# Deploy to production
npx convex deploy

# View dashboard
npx convex dashboard

# Run seed function
npx convex run seed:seedDatabase

# Clear database (development only)
npx convex run seed:clearDatabase

# Re-seed database
npx convex run seed:reseedDatabase
```

## Database Schema

### Cats Table
- `name`: string - Cat name
- `subtitle`: string - Cat subtitle
- `image`: string - Main image URL
- `description`: string - Cat description
- `age`: string - Cat age
- `color`: string - Cat color/pattern
- `status`: string - Availability status
- `price`: string - Price
- `gallery`: array of strings - Gallery image URLs
- `gender`: "male" | "female" - Cat gender
- `birthDate`: string - Birth date
- `registrationNumber`: string (optional) - Registration number
- `isDisplayed`: boolean - Whether cat is shown publicly
- `freeText`: string (optional) - Additional notes

### Pedigree Connections Table
- `parentId`: Cat ID - Parent cat
- `childId`: Cat ID - Child cat
- `type`: "mother" | "father" - Parent type

### Admin Sessions Table
- `sessionId`: string - Unique session identifier
- `isValid`: boolean - Session validity
- `expiresAt`: number - Expiration timestamp

### Contact Submissions Table
- `name`: string - Contact name
- `email`: string - Contact email
- `message`: string - Contact message
- `status`: "new" | "read" | "replied" - Contact status

## Troubleshooting

### Common Issues

1. **"Cannot find Convex URL"**
   - Make sure your `.env.local` file contains the correct `VITE_CONVEX_URL`
   - Restart your development server after adding environment variables

2. **"Schema validation error"**
   - Run `npx convex deploy` to sync your schema changes
   - Check that your data matches the schema definitions

3. **"Function not found"**
   - Ensure you've deployed your functions with `npx convex deploy`
   - Check function names and imports

4. **Authentication not working**
   - Verify you're using the correct authentication provider in your app
   - Check session storage in browser dev tools

### Getting Help

- Check the [Convex documentation](https://docs.convex.dev)
- Join the [Convex Discord](https://discord.gg/convex)
- Review the console logs for detailed error messages

## Production Deployment

1. Create a production deployment:
   ```bash
   npx convex deploy --prod
   ```

2. Update your production environment variables with the production Convex URL

3. Run the seed function in production (if needed):
   ```bash
   npx convex run seed:seedDatabase --prod
   ```

Your cat gallery is now fully integrated with Convex for robust, scalable data management! 