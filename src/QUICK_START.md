# Quick Start Guide

## 🚀 Get Started in 2 Minutes

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open in Browser

```
http://localhost:5173
```

That's it! Your website is now running.

---

## 📄 Pages Available

- **Home** - Beautiful landing page with hero section
- **Menu** - Complete beverage menu (61 items across 7 categories)
- **About** - Information about the café
- **Contact** - Location and contact details

---

## 🎨 Customizing the Menu

Edit `/components/MenuPage.tsx` and update the `menuData` array:

```typescript
const menuData = [
  {
    id: 1,
    name: 'Hot Coffee',
    icon: Coffee,
    color: '#8B4513',
    items: [
      { name: 'Espresso', price: '1,500 RWF', description: '' },
      // Add or edit items here
    ],
  },
  // Add or edit categories here
];
```

---

## 📦 Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack

- React + TypeScript
- Tailwind CSS
- Motion/React (animations)
- Lucide Icons
- Vite

---

## 📚 Documentation

- Full details: `README.md`
- Project overview: `PROJECT_SUMMARY.md`
- Attributions: `Attributions.md`

---

**Questions?** Check `README.md` for detailed documentation.
