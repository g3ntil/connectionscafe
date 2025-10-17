import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Snowflake, 
  Leaf, 
  Citrus, 
  Droplets, 
  Wine, 
  Sparkles, 
  Star, 
  Egg, 
  Soup as SoupIcon, 
  Salad as SaladIcon, 
  Sandwich, 
  UtensilsCrossed, 
  Pizza as PizzaIcon, 
  Cookie, 
  Baby,
  MessageCircle 
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import interiorTopView from 'figma:asset/7da2820ab6d94df8fcb9b546482f5019ce6f4a69.png';

// EATS Menu Data
const eatsMenuData = [
  {
    id: 101,
    name: 'Breakfast',
    icon: Egg,
    color: '#FFB347',
    items: [
      { name: 'Full Breakfast', price: '8,000 RWF', description: 'tea, fruits, 2 eggs of your choice, toast' },
      { name: 'Special Breakfast', price: '10,000 RWF', description: 'juice, eggs, sausage, toast, home fries' },
      { name: 'Plain Omelette', price: '2,000 RWF', description: '3 eggs' },
      { name: 'Chips Omelette', price: '3,000 RWF', description: '' },
      { name: 'Rolex Omelette', price: '3,000 RWF', description: '' },
      { name: 'Ham and Cheese Omelette', price: '5,000 RWF', description: '' },
      { name: 'Special Omelette', price: '5,000 RWF', description: 'chips, onions, tomato, green pepper, and beef or chicken or fish' },
      { name: 'Spanish Omelette', price: '3,000 RWF', description: 'tomato, onions, green pepper' },
      { name: 'Avocado Toast', price: '4,000 RWF', description: 'toast with avocado and 2 eggs of your choice' },
    ],
  },
  {
    id: 102,
    name: 'Soup',
    icon: SoupIcon,
    color: '#E67E22',
    items: [
      { name: 'Vegetable Soup', price: '4,000 RWF', description: '' },
      { name: 'Mushroom Soup', price: '4,000 RWF', description: '' },
      { name: 'Chicken Soup', price: '5,000 RWF', description: '' },
      { name: 'Fisherman Soup', price: '6,000 RWF', description: '' },
    ],
  },
  {
    id: 103,
    name: 'Salad',
    icon: SaladIcon,
    color: '#27AE60',
    items: [
      { name: 'Garden Salad', price: '4,000 RWF', description: 'Lettuce, onion, carrot, avocado, tomato' },
      { name: 'Chicken Salad', price: '5,500 RWF', description: 'Lettuce, onion, carrot, avocado, tomato, chicken' },
      { name: 'Steak Salad', price: '7,000 RWF', description: 'Lettuce, onion, carrot, avocado, tomato, beef' },
      { name: 'Tuna Salad', price: '6,000 RWF', description: 'Lettuce, onion, carrot, avocado, tomato, tuna' },
      { name: 'Chef Salad', price: '8,000 RWF', description: 'Boiled eggs, ham, cheese, avocado, onion, tomato, lettuce' },
    ],
  },
  {
    id: 104,
    name: 'Sandwiches & Wraps',
    icon: Sandwich,
    color: '#F39C12',
    note: 'Served with chips or an accompaniment of your choice',
    items: [
      { name: 'Vegetable Sandwich', price: '4,000 RWF', description: 'Fresh onions, lettuce, tomato, and avocado' },
      { name: 'Tuna Sandwich', price: '5,500 RWF', description: 'Tuna, lettuce, tomato, onion' },
      { name: 'Italian Sausage Sandwich', price: '5,500 RWF', description: 'Juicy Italian sausage with sauteed peppers and onion, mozzarella cheese, and tomato sauce' },
      { name: 'Hot Honey Crispy Chicken', price: '6,000 RWF', description: 'Crispy chicken coated in spicy honey, lettuce, tomatoes, and onion' },
      { name: 'Chicken Sandwich', price: '5,000 RWF', description: 'Chicken, onion, sauce, lettuce, tomato' },
      { name: 'Ham & Cheese Sandwich', price: '5,500 RWF', description: 'Ham, lettuce, tomato, onion, cheese' },
      { name: 'Club Sandwich', price: '6,000 RWF', description: 'Chicken, cheese, omelette, onion' },
      { name: 'Beef Burger', price: '5,000 RWF', description: 'Beef patty, onions, lettuce, tomatoes, burger sauce' },
      { name: 'Cheeseburger', price: '5,500 RWF', description: 'Beef patty, onions, lettuce, tomatoes, burger sauce, cheese' },
      { name: 'Chicken Burger', price: '5,500 RWF', description: '' },
      { name: 'Vegetable Burger', price: '4,000 RWF', description: '' },
      { name: 'Chicken Wrap', price: '5,000 RWF', description: '' },
      { name: 'Beef Wrap', price: '5,000 RWF', description: '' },
      { name: 'Vegetable Wrap', price: '4,000 RWF', description: 'Lettuce, onion, tomato, zucchini' },
    ],
  },
  {
    id: 105,
    name: 'Mains',
    icon: UtensilsCrossed,
    color: '#C0392B',
    note: 'Served with two accompaniments',
    items: [
      { name: 'Fish Fillet', price: '7,000 RWF', description: 'Tender fish fillet served with your choice of tomato, mushroom, or onion sauce' },
      { name: 'Coconut Fish', price: '8,000 RWF', description: 'Delicate fish fillet pieces simmered in a creamy coconut milk sauce' },
      { name: 'Fish & Chips', price: '7,500 RWF', description: 'Crispy fried fish fillet served with chips and your choice of salad or steamed vegetables' },
      { name: 'Fish Curry', price: '7,000 RWF', description: '' },
      { name: 'Fajita Fries Supreme', price: '7,000 RWF', description: 'Crispy chips topped with seasoned chicken, sauteed peppers and onions, a rich cheese sauce, and fresh sliced avocado' },
      { name: 'Chicken Leg', price: '6,000 RWF', description: 'Juicy chicken leg served with your choice of tomato, mushroom, peanut, or onion sauce' },
      { name: 'Coconut Chicken', price: '7,500 RWF', description: 'Juicy chicken cooked in a creamy coconut milk sauce' },
      { name: 'Chicken Stew', price: '5,000 RWF', description: 'Onion, chicken, pepper, red sauce' },
      { name: 'Chicken Curry', price: '5,500 RWF', description: '' },
      { name: 'Chicken Wings', price: '5,000 RWF', description: '3 wings coated in breadcrumbs and baked or fried' },
      { name: 'Whole Chicken', price: '24,000 RWF', description: 'Served with chips and salad' },
      { name: 'Half Chicken', price: '12,000 RWF', description: 'With chips and salad' },
      { name: 'Chicken Fried Rice', price: '26,000 RWF', description: 'Rice, whole chicken, chips or salad. A big plate for 4-5 people' },
      { name: 'Beef Steak', price: '7,500 RWF', description: 'A tender 200g beef steak, grilled to your liking and served with your choice of tomato, mushroom, onion sauce, or green pepper sauce' },
      { name: 'Beef Cordon Bleu', price: '8,000 RWF', description: 'Tender beef wrapped around cheese and ham' },
      { name: 'Beef Stroganoff', price: '7,000 RWF', description: 'Slices of tender beef, onions, and green peppers in creamy mushroom sauce' },
      { name: 'Beef Stew', price: '6,000 RWF', description: '' },
      { name: 'Beef Curry', price: '6,000 RWF', description: '' },
    ],
  },
  {
    id: 106,
    name: 'Local Food',
    icon: UtensilsCrossed,
    color: '#8E44AD',
    items: [
      { name: 'Agotogo Chicken', price: '5,500 RWF', description: '' },
      { name: 'Agotogo Beef', price: '5,500 RWF', description: '' },
      { name: 'Agotogo Fish', price: '6,000 RWF', description: '' },
      { name: 'Agotogo Vegetable', price: '4,000 RWF', description: '' },
      { name: 'Ugali', price: '6,000 RWF', description: 'Fish, sambaza, chicken, or beef' },
      { name: 'Kahunga', price: '6,000 RWF', description: 'Fish, sambaza, chicken, or beef' },
      { name: 'Boil', price: '5,500 RWF', description: 'Chicken or beef' },
    ],
  },
  {
    id: 107,
    name: 'Pizza',
    icon: PizzaIcon,
    color: '#E74C3C',
    items: [
      { name: 'Margarita', price: '4,000 RWF', description: 'Tomato sauce, tomato, cheese, oregano' },
      { name: 'Vegetable', price: '5,000 RWF', description: 'Tomato, onion, green bean, green peppers, carrots, oregano' },
      { name: 'Beef', price: '6,000 RWF', description: 'Beef, onion, oregano, cheese' },
      { name: 'Bolognese', price: '6,000 RWF', description: 'Mince meat, onion, carrot, green pepper, oregano, cheese' },
      { name: 'Ham', price: '6,000 RWF', description: 'Ham, garlic, oregano, cheese' },
      { name: 'Chicken', price: '6,000 RWF', description: 'Chicken, onion, oregano, cheese' },
      { name: 'Hawaiian', price: '7,000 RWF', description: 'Ham & pineapple, cheese, oregano' },
      { name: 'Beef Sausage', price: '6,000 RWF', description: 'Sausage, garlic, onion, oregano, cheese' },
      { name: 'Mixed', price: '10,000 RWF', description: 'Choose 3 meats (beef, chicken, sausage, ham), oregano, cheese' },
      { name: '4 Season', price: '8,000 RWF', description: 'Ham, mushroom, vegetables, tuna' },
    ],
  },
  {
    id: 108,
    name: 'Pasta',
    icon: Cookie,
    color: '#D35400',
    items: [
      { name: 'Spaghetti Bolognese', price: '6,000 RWF', description: 'Classic spaghetti served with a hearty meat sauce, simmered to perfection' },
      { name: 'Vegetable Tagliatelle', price: '5,500 RWF', description: 'Tagliatelle pasta tossed with onions, green peppers, carrots, and zucchini, all coated in a savory red sauce' },
      { name: 'Chicken Alfredo Pasta', price: '8,000 RWF', description: 'Tender penne with juicy chicken in a creamy alfredo sauce' },
    ],
  },
  {
    id: 109,
    name: 'Kids Corner',
    icon: Baby,
    color: '#FF6B9D',
    note: 'Served with chips and salad',
    items: [
      { name: 'Fish Finger', price: '5,000 RWF', description: '' },
      { name: 'Chicken Strips', price: '4,500 RWF', description: '' },
      { name: 'Mini Burger', price: '4,000 RWF', description: 'Beef or chicken' },
      { name: 'Plain Chips with Salad', price: '3,000 RWF', description: '' },
    ],
  },
];

// DRINKS Menu Data
const drinksMenuData = [
  {
    id: 1,
    name: 'Hot Coffee',
    icon: Coffee,
    color: '#8B4513',
    items: [
      { name: 'Espresso', price: '1,500 RWF', description: '' },
      { name: 'Americano', price: '1,500 RWF', description: '' },
      { name: 'Macchiato', price: '2,000 RWF', description: '' },
      { name: 'Cappuccino', price: '2,500 RWF', description: '' },
      { name: 'Latte', price: '2,500 RWF', description: '' },
      { name: 'Cinnamon Latte', price: '3,000 RWF', description: '' },
      { name: 'Vanilla Latte', price: '3,000 RWF', description: '' },
      { name: 'Caramel Latte', price: '3,000 RWF', description: '' },
      { name: 'Mocha', price: '3,000 RWF', description: '' },
      { name: 'Pour Over', price: '3,000 RWF', description: '' },
      { name: 'African Coffee', price: '3,000 RWF', description: '' },
    ],
  },
  {
    id: 2,
    name: 'Iced Coffee',
    icon: Snowflake,
    color: '#4682B4',
    items: [
      { name: 'Cold Brew', price: '3,000 RWF', description: '' },
      { name: 'Sweet Cream Cold Brew', price: '3,500 RWF', description: '' },
      { name: 'Iced Americano', price: '2,000 RWF', description: '' },
      { name: 'Iced Cappuccino', price: '3,000 RWF', description: '' },
      { name: 'Iced Mocha', price: '3,500 RWF', description: '' },
      { name: 'Iced Latte', price: '3,000 RWF', description: '' },
      { name: 'Iced Cinnamon Latte', price: '3,500 RWF', description: '' },
      { name: 'Iced Vanilla Latte', price: '3,500 RWF', description: '' },
      { name: 'Iced Caramel Latte', price: '3,500 RWF', description: '' },
    ],
  },
  {
    id: 3,
    name: 'Tea',
    icon: Leaf,
    color: '#228B22',
    items: [
      { name: 'African Tea', price: '2,000 RWF', description: '' },
      { name: 'Black Tea', price: '2,000 RWF', description: '' },
      { name: 'Spice Tea', price: '2,500 RWF', description: '' },
      { name: 'Green Tea', price: '2,000 RWF', description: '' },
      { name: 'Mint Tea', price: '2,500 RWF', description: '' },
      { name: 'Lemon Tea', price: '2,000 RWF', description: '' },
      { name: 'Hot Chocolate', price: '2,500 RWF', description: '' },
    ],
  },
  {
    id: 4,
    name: 'Juices',
    icon: Citrus,
    color: '#FF8C00',
    items: [
      { name: 'Pineapple Juice', price: '2,500 RWF', description: '' },
      { name: 'Passion Juice', price: '2,500 RWF', description: '' },
      { name: 'Watermelon Juice', price: '2,500 RWF', description: '' },
      { name: 'Tree Tomato Juice', price: '3,000 RWF', description: '' },
      { name: 'Mango Juice', price: '3,000 RWF', description: '' },
      { name: 'Mocktail Juice', price: '3,500 RWF', description: '' },
      { name: 'Beetroot Special', price: '4,500 RWF', description: 'Beetroot, ginger, lemon, honey' },
      { name: 'Green Detox', price: '4,500 RWF', description: 'Mint, pineapple, cucumber, spinach, lemon' },
      { name: 'Lemonade', price: '3,000 RWF', description: '' },
    ],
  },
  {
    id: 5,
    name: 'Smoothies & Milkshakes',
    icon: Droplets,
    color: '#FF69B4',
    items: [
      { name: 'BananaRama Smoothie', price: '3,500 RWF', description: 'Banana, vanilla yogurt' },
      { name: 'Mango Mania Smoothie', price: '3,500 RWF', description: 'Mango, strawberry yogurt, simple syrup' },
      { name: 'Mango Berry Smoothie', price: '3,500 RWF', description: 'Mango, strawberry ice cream, simple syrup' },
      { name: 'Green Smoothie', price: '3,500 RWF', description: 'Baby spinach, banana, pineapple, ginger, simple syrup, mint' },
      { name: 'Yellow Move Smoothie', price: '3,500 RWF', description: 'Peanut butter, paw paw, mango, vanilla yogurt' },
      { name: 'Yeah Smoothie', price: '3,500 RWF', description: 'Apple, baby spinach, avocado, simple syrup, mint' },
      { name: 'Pina Pina Smoothie', price: '3,500 RWF', description: 'Pineapple, banana, coconut milk, vanilla yogurt' },
      { name: 'Kidney Smoothie', price: '4,000 RWF', description: 'Strawberry, banana, peanut butter, vanilla yogurt, simple syrup' },
      { name: 'Mixed Smoothie', price: '4,000 RWF', description: 'Mango, pineapple, strawberry, avocado, apple, orange, vanilla yogurt' },
      { name: 'Vanilla Milkshake', price: '4,000 RWF', description: '' },
      { name: 'Chocolate Milkshake', price: '4,000 RWF', description: '' },
      { name: 'Strawberry Milkshake', price: '4,000 RWF', description: '' },
      { name: 'Coconut Milkshake', price: '4,000 RWF', description: '' },
    ],
  },
  {
    id: 6,
    name: 'Soft Drinks',
    icon: Droplets,
    color: '#DC143C',
    items: [
      { name: 'Coca Cola', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Coke Zero', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Sprite', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Fanta', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Vitalo', price: '1,000 / 1,500 RWF', description: '' },
      { name: 'Water', price: '1,000 RWF', description: '' },
    ],
  },
  {
    id: 7,
    name: 'Wine & Beer',
    icon: Wine,
    color: '#722F37',
    items: [
      { name: 'Mutzing', price: '1,500 RWF', description: '' },
      { name: 'Heineken', price: '2,000 RWF', description: '' },
      { name: 'Virunga', price: '1,500 RWF', description: '' },
      { name: 'Amstel', price: '2,000 RWF', description: '' },
      { name: 'Glass of Wine', price: '5,000 RWF', description: '' },
      { name: 'Bottle of Wine', price: '20,000 RWF', description: 'Ask for list of bottles' },
    ],
  },
];

export function MenuPage() {
  const [mainCategory, setMainCategory] = useState<'eats' | 'drinks'>('eats'); // Default to Eats
  const [selectedCategory, setSelectedCategory] = useState(eatsMenuData[0].id);
  const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingProgrammatically = useRef(false);
  const [reviewButtonExpanded, setReviewButtonExpanded] = useState(false);

  const currentMenuData = mainCategory === 'eats' ? eatsMenuData : drinksMenuData;

  // Auto-expand review button every 60 seconds
  useEffect(() => {
    const expandInterval = setInterval(() => {
      setReviewButtonExpanded(true);
      // Auto-collapse after 8 seconds
      setTimeout(() => {
        setReviewButtonExpanded(false);
      }, 8000);
    }, 60000); // Every 60 seconds

    // Initial expansion after 5 seconds
    const initialTimeout = setTimeout(() => {
      setReviewButtonExpanded(true);
      setTimeout(() => {
        setReviewButtonExpanded(false);
      }, 8000);
    }, 5000);

    return () => {
      clearInterval(expandInterval);
      clearTimeout(initialTimeout);
    };
  }, []);

  // When switching main category, select first subcategory
  const handleMainCategoryChange = (category: 'eats' | 'drinks') => {
    setMainCategory(category);
    setSelectedCategory(category === 'eats' ? eatsMenuData[0].id : drinksMenuData[0].id);
  };

  // Scroll to category when clicked
  const scrollToCategory = (categoryId: number) => {
    const targetElement = categoryRefs.current[categoryId];
    if (!targetElement) return;

    isScrollingProgrammatically.current = true;
    setSelectedCategory(categoryId);

    // Check if we're on desktop (with scroll container) or mobile
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      // Mobile: scroll in window with offset for sticky header
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 200; // Account for sticky header (64px header + 150px sticky nav)
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      // Desktop: scroll within the container
      const container = scrollContainerRef.current;
      if (container) {
        // Get the position of the target relative to the scrollable container
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const relativeTop = targetRect.top - containerRect.top;
        const currentScrollTop = container.scrollTop;
        const offset = 120; // Offset from top
        
        container.scrollTo({
          top: currentScrollTop + relativeTop - offset,
          behavior: 'smooth',
        });
      }
    }
    
    // Reset the flag after scrolling completes
    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 1000);
  };

  // Intersection Observer to detect visible category
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const observerOptions = {
      root: isMobile ? null : scrollContainerRef.current,
      rootMargin: isMobile ? '-200px 0px -40% 0px' : '-20% 0px -60% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingProgrammatically.current) return;

      // Find the most visible category
      let maxRatio = 0;
      let mostVisibleCategory = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          const categoryId = Number(entry.target.getAttribute('data-category-id'));
          if (categoryId && !isNaN(categoryId)) {
            mostVisibleCategory = categoryId;
          }
        }
      });

      if (mostVisibleCategory !== null) {
        setSelectedCategory(mostVisibleCategory);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all category sections
    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [mainCategory]);

  return (
    <>
      {/* DESKTOP VIEW - Split Screen with Continuous Scroll */}
      <div className="hidden lg:flex h-screen overflow-hidden bg-black">
        {/* LEFT SIDE - Fixed Navigation */}
        <div className="w-1/2 h-screen flex flex-col relative overflow-y-auto scrollbar-thin scrollbar-thumb-[#5B3A29] scrollbar-track-black/50">
          {/* Background Image - Fixed */}
          <div className="fixed top-0 left-0 w-1/2 h-screen">
            <ImageWithFallback
              src={interiorTopView}
              alt="Connections Café interior top view with elegant seating"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay with blur for better text readability */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
            
            {/* Animated Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#5B3A29]/10 via-transparent to-black/30"
              animate={{opacity: [0.3, 0.5, 0.3]}}
              transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />
            
            {/* Decorative corner accents with animation */}
            <motion.div 
              className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-[#5B3A29]/30"
              animate={{borderColor: ["rgba(91, 58, 41, 0.3)", "rgba(91, 58, 41, 0.5)", "rgba(91, 58, 41, 0.3)"]}}
              transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-[#5B3A29]/30"
              animate={{borderColor: ["rgba(91, 58, 41, 0.3)", "rgba(91, 58, 41, 0.5)", "rgba(91, 58, 41, 0.3)"]}}
              transition={{duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2}}
            />
          </div>

          {/* Content over image - Properly Spaced */}
          <div className="relative z-10 flex flex-col h-full justify-between items-center px-16 py-16">
            {/* Top spacer */}
            <div className="flex-shrink-0 h-16"></div>
            
            {/* Main content container */}
            <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md">
              {/* Header - Centered */}
              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="text-center mb-10"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#5B3A29]"></div>
                  <Sparkles className="w-5 h-5 text-[#5B3A29]" />
                  <div className="w-8 h-px bg-[#5B3A29]"></div>
                </div>
                
                <h1 className="text-white mb-4 text-center">Our Menu</h1>
                
                <div className="w-24 h-1 bg-[#5B3A29] mx-auto mb-6"></div>
                
                <p className="text-gray-400 max-w-sm mx-auto text-center leading-relaxed">
                  Discover our carefully curated selection of food and beverages, crafted with passion and served with love
                </p>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Star className="w-4 h-4 text-[#5B3A29] fill-[#5B3A29]" />
                  <Star className="w-4 h-4 text-[#5B3A29] fill-[#5B3A29]" />
                  <Star className="w-4 h-4 text-[#5B3A29] fill-[#5B3A29]" />
                </div>
              </motion.div>

              {/* Main Category Toggle - Eats / Drinks */}
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.1, duration: 0.6}}
                className="flex gap-3 mb-8 w-full max-w-xs"
              >
                <button
                  onClick={() => handleMainCategoryChange('eats')}
                  className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 ${
                    mainCategory === 'eats'
                      ? 'bg-[#5B3A29] text-white shadow-lg shadow-[#5B3A29]/30'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <UtensilsCrossed className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-sm">Eats</div>
                </button>
                <button
                  onClick={() => handleMainCategoryChange('drinks')}
                  className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 ${
                    mainCategory === 'drinks'
                      ? 'bg-[#5B3A29] text-white shadow-lg shadow-[#5B3A29]/30'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <Coffee className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-sm">Drinks</div>
                </button>
              </motion.div>

              {/* Category Navigation - Centered with Scroll Indicator */}
              <div className="relative w-full">
                {/* Scroll Indicator Line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/5 rounded-full">
                  <motion.div
                    className="w-full bg-[#5B3A29] rounded-full"
                    style={{height: `${(100 / currentMenuData.length)}%`}}
                    initial={false}
                    animate={{top: `${((currentMenuData.findIndex(cat => cat.id === selectedCategory)) / currentMenuData.length) * 100}%`}}
                    transition={{type: "spring", stiffness: 300, damping: 30}}
                  />
                </div>
                
                {/* Category List */}
                <motion.div
                  key={mainCategory}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.2, duration: 0.6}}
                  className="flex flex-col gap-3 w-full pl-4 pr-2"
                >
                  {currentMenuData.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.1 * index, duration: 0.4}}
                        onClick={() => scrollToCategory(category.id)}
                        className={`
                          flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-300 text-left group
                          ${selectedCategory === category.id
                            ? 'bg-[#5B3A29] text-white shadow-2xl shadow-[#5B3A29]/30 scale-105'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white backdrop-blur-sm border border-white/5 hover:border-[#5B3A29]/30'
                          }
                        `}
                      >
                        <IconComponent 
                          className="w-4 h-4 flex-shrink-0" 
                          style={{color: selectedCategory === category.id ? 'white' : category.color}}
                        />
                        <div className="flex-1">
                          <div className="text-sm">{category.name}</div>
                        </div>
                        <div className="text-xs opacity-60">{category.items.length}</div>
                        <div className={`
                          w-1.5 h-1.5 rounded-full transition-all
                          ${selectedCategory === category.id ? 'bg-white' : 'bg-transparent'}
                        `}></div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Footer - Centered */}
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.8, duration: 0.6}}
              className="flex-shrink-0 text-center mt-8"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-12 h-px bg-zinc-700"></div>
                <div className="w-1 h-1 bg-zinc-700 rounded-full"></div>
                <div className="w-12 h-px bg-zinc-700"></div>
              </div>
              <p className="text-gray-500 text-xs mb-1">Street 227, Ruhengeri</p>
              <p className="text-gray-500 text-xs">Musanze City, Rwanda</p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - Continuous Scrollable Menu Items */}
        <div 
          ref={scrollContainerRef}
          className="w-1/2 h-screen overflow-y-auto bg-black relative scroll-smooth"
          style={{scrollbarWidth: 'thin', scrollbarColor: '#5B3A29 transparent'}}
        >
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#5B3A29] rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 left-20 w-80 h-80 bg-[#5B3A29] rounded-full blur-3xl"></div>
          </div>
          
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#5B3A29]/20 pointer-events-none z-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#5B3A29]/20 pointer-events-none z-10"></div>
          
          <div className="relative px-12 pb-12 pt-32">
            {/* All Categories - Continuous Scroll */}
            {currentMenuData.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  ref={(el) => {
                    categoryRefs.current[category.id] = el;
                  }}
                  data-category-id={category.id}
                  className={categoryIndex > 0 ? 'mt-20' : ''}
                >
                  {/* Category Header */}
                  <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                    className="flex items-center justify-between mb-10 pb-6 border-b border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#5B3A29]/30 to-transparent blur-xl"></div>
                        <IconComponent 
                          className="w-12 h-12 relative" 
                          style={{color: category.color}}
                        />
                      </div>
                      <div>
                        <h2 className="text-white text-3xl font-['Playfair_Display'] tracking-wide mb-1">
                          {category.name}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {category.items.length} item{category.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-full border-2 border-[#5B3A29]/20 flex items-center justify-center">
                      <span className="text-[#5B3A29] text-sm">{mainCategory === 'eats' ? '🍽️' : '☕'}</span>
                    </div>
                  </motion.div>

                  {/* Category Note */}
                  {category.note && (
                    <motion.div
                      initial={{opacity: 0}}
                      whileInView={{opacity: 1}}
                      viewport={{once: true}}
                      transition={{delay: 0.1}}
                      className="mb-6 p-4 bg-[#5B3A29]/10 border border-[#5B3A29]/20 rounded-xl"
                    >
                      <p className="text-gray-400 text-sm italic">{category.note}</p>
                    </motion.div>
                  )}

                  {/* Menu Items Grid */}
                  <div className="grid gap-5">
                    {category.items.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, margin: "-50px"}}
                        transition={{delay: index * 0.03, duration: 0.3}}
                        className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-900/50 hover:border-[#5B3A29]/30 transition-all duration-300 group"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-white text-lg mb-2 group-hover:text-[#5B3A29] transition-colors">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-gray-400 text-sm leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="text-[#5B3A29] font-['Playfair_Display'] tracking-wide">
                              {item.price}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE VIEW - Continuous Scroll with Background */}
      <div className="lg:hidden min-h-screen bg-black relative overflow-hidden">
        {/* Background Image with High Contrast */}
        <div className="fixed inset-0 z-0">
          <ImageWithFallback
            src={interiorTopView}
            alt="Connections Café interior background"
            className="w-full h-full object-cover"
          />
          {/* High contrast dark overlay with blur */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        </div>
        
        {/* Animated background decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
          <motion.div 
            className="absolute top-20 -right-20 w-64 h-64 bg-[#5B3A29]/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-40 -left-20 w-80 h-80 bg-[#5B3A29]/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="relative z-10 pb-24 pt-24 sm:pt-28">
          {/* Header */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className="text-center mb-6 sm:mb-8 px-4 sm:px-5"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-6 sm:w-8 h-px bg-[#5B3A29]"></div>
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#5B3A29]" />
              <div className="w-6 sm:w-8 h-px bg-[#5B3A29]"></div>
            </div>
            
            <h1 className="text-white mb-2 sm:mb-3 text-2xl sm:text-3xl">Our Menu</h1>
            
            <p className="text-gray-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              Discover our carefully curated selection
            </p>
          </motion.div>

          {/* Sticky Category Navigation Container */}
          <div className="sticky top-16 z-30 bg-black/95 backdrop-blur-xl border-b border-zinc-800/50 pb-3 sm:pb-4 mb-6 sm:mb-8">
            {/* Main Category Toggle - Mobile - Minimal */}
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.2, duration: 0.6}}
              className="flex gap-2 mb-3 sm:mb-4 justify-center pt-3 sm:pt-4"
            >
              <button
                onClick={() => handleMainCategoryChange('eats')}
                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
                  mainCategory === 'eats'
                    ? 'bg-[#5B3A29] text-white shadow-lg shadow-[#5B3A29]/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <UtensilsCrossed className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span className="text-xs sm:text-sm">Eats</span>
              </button>
              <button
                onClick={() => handleMainCategoryChange('drinks')}
                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
                  mainCategory === 'drinks'
                    ? 'bg-[#5B3A29] text-white shadow-lg shadow-[#5B3A29]/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Coffee className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span className="text-xs sm:text-sm">Drinks</span>
              </button>
            </motion.div>

            {/* Category Pills - Horizontal Scroll */}
            <div className="overflow-x-auto hide-scrollbar px-4 sm:px-5">
              <motion.div
                key={mainCategory}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.3, duration: 0.6}}
                className="flex gap-1.5 sm:gap-2 min-w-min"
              >
                {currentMenuData.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className={`
                        flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full whitespace-nowrap transition-all duration-300 flex-shrink-0
                        ${selectedCategory === category.id
                          ? 'bg-[#5B3A29] text-white shadow-lg shadow-[#5B3A29]/30 scale-105'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                        }
                      `}
                    >
                      <IconComponent 
                        className="w-3.5 sm:w-4 h-3.5 sm:h-4" 
                        style={{color: selectedCategory === category.id ? 'white' : category.color}}
                      />
                      <span className="text-[11px] sm:text-xs">{category.name}</span>
                      <span className="text-[9px] sm:text-[10px] opacity-60">({category.items.length})</span>
                    </button>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* All Categories - Continuous Scroll */}
          <div className="px-4 sm:px-5">
            {currentMenuData.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  ref={(el) => {
                    categoryRefs.current[category.id] = el;
                  }}
                  data-category-id={category.id}
                  className={categoryIndex > 0 ? 'mt-12 sm:mt-16' : ''}
                >
                  {/* Category Header */}
                  <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                    className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5B3A29]/20 to-transparent blur-lg"></div>
                      <IconComponent 
                        className="w-7 sm:w-8 h-7 sm:h-8 relative" 
                        style={{color: category.color}}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-white text-lg sm:text-xl font-['Playfair_Display'] tracking-wide">
                        {category.name}
                      </h2>
                      <p className="text-gray-500 text-[11px] sm:text-xs">
                        {category.items.length} items
                      </p>
                    </div>
                  </motion.div>

                  {/* Category Note - Mobile */}
                  {category.note && (
                    <motion.div
                      initial={{opacity: 0}}
                      whileInView={{opacity: 1}}
                      viewport={{once: true}}
                      className="mb-4 sm:mb-5 p-2.5 sm:p-3 bg-[#5B3A29]/10 border border-[#5B3A29]/20 rounded-lg sm:rounded-xl"
                    >
                      <p className="text-gray-400 text-[11px] sm:text-xs italic text-center leading-relaxed">{category.note}</p>
                    </motion.div>
                  )}

                  {/* Menu Items */}
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {category.items.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, margin: "-50px"}}
                        transition={{delay: index * 0.02, duration: 0.3}}
                        className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-zinc-900/60 hover:border-[#5B3A29]/30 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start gap-3 sm:gap-4 mb-1.5 sm:mb-2">
                          <h3 className="text-white flex-1 text-sm sm:text-base leading-snug">
                            {item.name}
                          </h3>
                          <div className="text-[#5B3A29] font-['Playfair_Display'] tracking-wide flex-shrink-0 text-xs sm:text-sm">
                            {item.price}
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Google Review Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.a
          href="https://search.google.com/local/writereview?placeid=ChIJS4RqK9Vb3BkR82u6VjZzR0Q"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setReviewButtonExpanded(true)}
          onMouseLeave={() => setReviewButtonExpanded(false)}
          className="flex items-center gap-3 bg-gradient-to-r from-[#5B3A29] to-[#4A2F1F] text-white rounded-full shadow-2xl hover:shadow-[#5B3A29]/50 transition-all duration-300 group cursor-pointer overflow-hidden"
          animate={{
            width: reviewButtonExpanded ? "auto" : "56px",
            paddingRight: reviewButtonExpanded ? "20px" : "0px",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Icon Container - Always Visible */}
          <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 relative">
            <motion.div
              animate={{
                rotate: reviewButtonExpanded ? [0, -10, 10, -10, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </motion.div>
            {/* Ping Animation */}
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
            </span>
          </div>

          {/* Text - Shown When Expanded */}
          <AnimatePresence>
            {reviewButtonExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="whitespace-nowrap pr-1"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-wide">Leave a Review</span>
                  <span className="text-xs text-yellow-200 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>

        {/* Tooltip - Desktop Only */}
        {!reviewButtonExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Share your experience
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-black/90"></div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
