# Connections Café Website

A beautiful, modern website for Connections Café in Musanze City, Rwanda.

## 🌟 Features

- **Elegant Homepage** - Hero section with café branding and atmosphere
- **Interactive Menu** - Complete beverage menu with 7 categories and 61+ items
- **About Page** - Information about the café and its story
- **Contact Page** - Location details and contact information
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - Professional transitions and interactions

## 🍵 Menu Categories

1. **Hot Coffee** (11 items) - Espresso, Latte, Cappuccino, and more
2. **Iced Coffee** (9 items) - Cold Brew, Iced Latte, and specialty iced drinks
3. **Tea** (7 items) - African Tea, Green Tea, Mint Tea, Hot Chocolate
4. **Juices** (9 items) - Fresh juices and detox specials
5. **Smoothies & Milkshakes** (13 items) - Creative blends and classic favorites
6. **Soft Drinks** (6 items) - Popular sodas and water
7. **Wine & Beer** (6 items) - Selection of beer and wine

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Motion/React** - Animations (Framer Motion)
- **Lucide Icons** - Icon library
- **Vite** - Build tool

## 📁 Project Structure

```
├── components/
│   ├── HomePage.tsx         # Landing page with hero section
│   ├── MenuPage.tsx         # Interactive menu display
│   ├── AboutPage.tsx        # About the café
│   ├── ContactPage.tsx      # Contact information
│   ├── Header.tsx           # Navigation header
│   └── ui/                  # ShadCN UI components
├── styles/
│   └── globals.css          # Global styles and typography
├── App.tsx                  # Main application component
└── README.md                # This file
```

## 🎨 Customization

### Updating Menu Items

Edit the `menuData` array in `/components/MenuPage.tsx`:

```typescript
const menuData = [
  {
    id: 1,
    name: 'Hot Coffee',
    icon: Coffee,
    color: '#8B4513',
    items: [
      { name: 'Espresso', price: '1,500 RWF', description: '' },
      // Add more items...
    ],
  },
  // Add more categories...
];
```

### Changing Colors

Update color values in `styles/globals.css`:
- Primary color: `#5B3A29` (Coffee brown)
- Accent color: `#3F5E45` (Forest green)

### Updating Content

- **Homepage**: Edit `/components/HomePage.tsx`
- **About**: Edit `/components/AboutPage.tsx`
- **Contact**: Edit `/components/ContactPage.tsx`

## 📍 Café Information

**Connections Café**
- Location: Street 227, Ruhengeri, Musanze City, Rwanda
- Established: 2025
- Tagline: "Where Minds Meet Over Coffee"

## 📄 License

All rights reserved © 2025 Connections Café

## 🙏 Attributions

See `Attributions.md` for image credits and third-party resources.

## 📞 Support

For questions or support, contact the café management.

---

**Built with ❤️ for Connections Café**
