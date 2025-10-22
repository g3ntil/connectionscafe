# Database Integration - Connections Café Menu System

## Overview

The Connections Café website now uses **Supabase database** for managing all menu items. Menu data is stored in the key-value store and fetched dynamically on page load.

## Database Structure

### Storage Design

The menu data is organized using a **hierarchical key-value structure** in Supabase:

```
menu:{mainCategory}:category:{categoryId}
menu:{mainCategory}:items:{categoryId}:{itemIndex}
```

### Main Categories
- **eats** - All food items (9 categories)
- **drinks** - All beverages (7 categories)

### Data Organization

#### Categories
Each category contains:
- `id` - Unique identifier
- `name` - Category name (e.g., "Breakfast", "Hot Coffee")
- `icon` - Icon name (mapped to Lucide icons)
- `color` - Hex color for UI styling
- `note` (optional) - Additional information displayed above items

#### Menu Items
Each item contains:
- `name` - Item name
- `price` - Price in RWF format (e.g., "8,000 RWF")
- `description` - Item description (can be empty string)
- `order` - Display order within category

## API Endpoints

### Base URL
```
https://{projectId}.supabase.co/functions/v1/make-server-786b768a
```

### Available Endpoints

1. **Get Complete Menu**
   ```
   GET /menu/complete/{mainCategory}
   ```
   Returns all categories with their items for a main category (eats or drinks)

2. **Get Categories**
   ```
   GET /menu/categories/{mainCategory}
   ```
   Returns all categories for a main category without items

3. **Get Items by Category**
   ```
   GET /menu/items/{mainCategory}/{categoryId}
   ```
   Returns all items for a specific category

4. **Initialize Menu Data** (Internal use)
   ```
   POST /menu/initialize
   ```
   Populates the database with menu data (called automatically on first load)

## How It Works

### 1. First Load
- When the app loads for the first time, it checks `localStorage` for initialization flag
- If not found, it calls `initializeMenuData()` to populate the database
- Menu data is sent to Supabase and stored in the KV store
- Flag is set in `localStorage` to prevent re-initialization

### 2. Subsequent Loads
- MenuPage component fetches menu data from Supabase on mount
- Data is cached during the session
- UI remains exactly the same, only data source changes

### 3. Data Flow
```
Database (KV Store) 
    ↓
Server API (/menu/complete/*)
    ↓
MenuPage Component
    ↓
User Interface
```

## Menu Content

### EATS (9 categories, 74 items)
1. **Breakfast** (9 items) - Full breakfast, omelettes, avocado toast
2. **Soup** (4 items) - Vegetable, mushroom, chicken, fisherman soup
3. **Salad** (5 items) - Garden, chicken, steak, tuna, chef salad
4. **Sandwiches & Wraps** (14 items) - Burgers, sandwiches, wraps
5. **Mains** (17 items) - Fish, chicken, beef dishes
6. **Local Food** (7 items) - Agotogo, ugali, kahunga, boil
7. **Pizza** (10 items) - Various pizza options
8. **Pasta** (3 items) - Bolognese, tagliatelle, alfredo
9. **Kids Corner** (4 items) - Child-friendly menu

### DRINKS (7 categories, 61 items)
1. **Hot Coffee** (11 items) - Espresso, lattes, mochas
2. **Iced Coffee** (9 items) - Cold brew, iced lattes
3. **Tea** (7 items) - Various tea types, hot chocolate
4. **Juices** (9 items) - Fresh juices, detox drinks
5. **Smoothies & Milkshakes** (13 items) - Various smoothie blends
6. **Soft Drinks** (6 items) - Sodas, water
7. **Wine & Beer** (6 items) - Alcoholic beverages

**Total: 135 menu items**

## Features Preserved

✅ **All existing functionality maintained:**
- Split-screen desktop layout
- Continuous scroll navigation
- Category auto-detection while scrolling
- Smooth animations and transitions
- Mobile-responsive design
- Sticky category navigation
- Floating review button
- All visual styling and effects

✅ **Only changed:**
- Data source (from hardcoded arrays → database)
- Added loading state
- Added error handling

## Future Enhancements

The database structure allows for easy future additions:
- Admin panel for menu management
- Real-time menu updates
- Price changes without code deployment
- Seasonal menu items
- Item availability status
- Multi-language support
- Item images
- Dietary restrictions/allergens

## Technical Notes

- Uses Supabase Edge Functions (Deno runtime)
- KV store provides fast, simple data access
- No complex migrations needed
- Data is structured for easy querying
- Icon mapping handled client-side
- Graceful error handling with fallbacks

## Troubleshooting

If menu doesn't load:
1. Check browser console for errors
2. Verify Supabase connection in `/utils/supabase/info.tsx`
3. Clear `localStorage` and refresh to re-initialize
4. Check server logs for API errors

## Database Reset

To reset the menu data:
1. Clear `localStorage` in browser DevTools
2. Refresh the page
3. Data will be re-initialized from `/utils/initializeMenuData.ts`
