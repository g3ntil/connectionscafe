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
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Icon mapping
const iconMap: { [key: string]: any } = {
  Coffee,
  Snowflake,
  Leaf,
  Citrus,
  Droplets,
  Wine,
  Egg,
  SoupIcon,
  SaladIcon,
  Sandwich,
  UtensilsCrossed,
  PizzaIcon,
  Cookie,
  Baby,
};

interface MenuItem {
  name: string;
  price: string;
  description: string;
}

interface MenuCategory {
  id: number;
  name: string;
  icon: any;
  color: string;
  note?: string;
  items: MenuItem[];
}

export function MenuPage() {
  console.log('MenuPage component mounted');
  
  // State
  const [mainCategory, setMainCategory] = useState<'eats' | 'drinks'>('eats');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [eatsMenuData, setEatsMenuData] = useState<MenuCategory[]>([]);
  const [drinksMenuData, setDrinksMenuData] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewButtonExpanded, setReviewButtonExpanded] = useState(false);
  
  // Refs
  const categoryRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const desktopScrollContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileNavScrollRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingProgrammatically = useRef(false);
  const lastUserScrollTime = useRef(0);

  const currentMenuData = mainCategory === 'eats' ? eatsMenuData : drinksMenuData;

  // ============================================================================
  // DATA FETCHING
  // ============================================================================
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError(null);
        const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-786b768a`;

        const [eatsResponse, drinksResponse] = await Promise.all([
          fetch(`${baseUrl}/menu/complete/eats`, {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` },
          }),
          fetch(`${baseUrl}/menu/complete/drinks`, {
            headers: { 'Authorization': `Bearer ${publicAnonKey}` },
          }),
        ]);

        if (!eatsResponse.ok || !drinksResponse.ok) {
          throw new Error('Failed to fetch menu data');
        }

        const eatsData = await eatsResponse.json();
        const drinksData = await drinksResponse.json();

        const mapIcons = (menu: any[]) => {
          return menu.map(category => ({
            ...category,
            icon: iconMap[category.icon] || Coffee,
          }));
        };

        const mappedEats = mapIcons(eatsData.menu);
        const mappedDrinks = mapIcons(drinksData.menu);

        setEatsMenuData(mappedEats);
        setDrinksMenuData(mappedDrinks);

        // Set initial active category
        if (mappedEats.length > 0) {
          setActiveCategory(mappedEats[0].id);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu data:', err);
        setError('Failed to load menu. Please refresh the page.');
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // ============================================================================
  // MAIN CATEGORY SWITCHING
  // ============================================================================
  const handleMainCategorySwitch = (category: 'eats' | 'drinks') => {
    if (category === mainCategory) return;
    
    setMainCategory(category);
    const targetMenu = category === 'eats' ? eatsMenuData : drinksMenuData;
    
    if (targetMenu.length > 0) {
      // Set to first category of new main category
      setActiveCategory(targetMenu[0].id);
      
      // Scroll to top
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        desktopScrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // ============================================================================
  // NAVIGATION CLICK HANDLER (COMPLETELY REWRITTEN)
  // ============================================================================
  const handleCategoryClick = (categoryId: number) => {
    console.log('Category clicked:', categoryId);
    
    // Immediately set as active
    setActiveCategory(categoryId);
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Mark that we're scrolling programmatically
    isScrollingProgrammatically.current = true;
    
    // Wait for next frame to ensure ref is available
    requestAnimationFrame(() => {
      const targetElement = categoryRefs.current[categoryId];
      
      if (!targetElement) {
        console.warn('Target element not found for category:', categoryId);
        isScrollingProgrammatically.current = false;
        return;
      }

      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        // MOBILE: Scroll to category accounting for fixed headers
        const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const headerHeight = 64; // Header height
        const navHeight = 56; // Sticky nav height
        const padding = 20; // Extra padding
        const offset = headerHeight + navHeight + padding;
        
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth',
        });
        
        console.log('Mobile scroll to:', elementTop - offset);
      } else {
        // DESKTOP: Scroll within the right panel
        const container = desktopScrollContainerRef.current;
        if (!container) {
          isScrollingProgrammatically.current = false;
          return;
        }
        
        const containerTop = container.getBoundingClientRect().top;
        const elementTop = targetElement.getBoundingClientRect().top;
        const offset = 120; // Padding from top
        const scrollTarget = container.scrollTop + (elementTop - containerTop) - offset;
        
        container.scrollTo({
          top: scrollTarget,
          behavior: 'smooth',
        });
        
        console.log('Desktop scroll to:', scrollTarget);
      }

      // Reset programmatic scroll flag after scroll animation
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingProgrammatically.current = false;
        console.log('Programmatic scroll ended');
      }, 1000);
    });
  };

  // ============================================================================
  // AUTO-SCROLL NAV BUTTON INTO VIEW
  // ============================================================================
  useEffect(() => {
    if (activeCategory === null) return;
    
    // Scroll the active nav button into view
    const isMobile = window.innerWidth < 1024;
    if (isMobile && mobileNavScrollRef.current) {
      const activeButton = mobileNavScrollRef.current.querySelector(
        `[data-category-id="${activeCategory}"]`
      );
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeCategory]);

  // ============================================================================
  // SCROLL EVENT LISTENERS FOR AUTO-HIGHLIGHTING
  // ============================================================================
  useEffect(() => {
    if (loading || currentMenuData.length === 0) return;

    const isMobile = window.innerWidth < 1024;
    let scrollTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Don't update during programmatic scrolling
      if (isScrollingProgrammatically.current) {
        return;
      }
      
      // Mark that user is scrolling
      lastUserScrollTime.current = Date.now();
      
      // Clear existing timer
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      
      // Debounce the scroll handler
      scrollTimer = setTimeout(() => {
        updateActiveCategory();
      }, 100);
    };
    
    const updateActiveCategory = () => {
      if (isScrollingProgrammatically.current) return;
      
      const isMobile = window.innerWidth < 1024;
      let bestMatch: { id: number; distance: number } | null = null;
      
      currentMenuData.forEach((category) => {
        const element = categoryRefs.current[category.id];
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        let targetY: number;
        
        if (isMobile) {
          // Mobile: account for header + sticky nav
          targetY = 64 + 56 + 40; // header + nav + small offset
        } else {
          // Desktop: target position in scrollable container
          const container = desktopScrollContainerRef.current;
          if (!container) return;
          targetY = 150; // Target position from top of container
        }
        
        // Calculate distance from target position
        const distance = Math.abs(rect.top - targetY);
        
        // Check if element is in viewport
        const inViewport = rect.top >= 0 && rect.top <= window.innerHeight;
        
        if (inViewport && (!bestMatch || distance < bestMatch.distance)) {
          bestMatch = { id: category.id, distance };
        }
      });
      
      if (bestMatch && bestMatch.id !== activeCategory) {
        setActiveCategory(bestMatch.id);
        console.log('Auto-highlighted category:', bestMatch.id);
      }
    };
    
    // Attach scroll listener
    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      const container = desktopScrollContainerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll, { passive: true });
      }
    }
    
    return () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      window.removeEventListener('scroll', handleScroll);
      const container = desktopScrollContainerRef.current;
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [mainCategory, loading, currentMenuData, activeCategory]);

  // ============================================================================
  // REVIEW BUTTON AUTO-EXPAND
  // ============================================================================
  useEffect(() => {
    const expandInterval = setInterval(() => {
      setReviewButtonExpanded(true);
      setTimeout(() => setReviewButtonExpanded(false), 8000);
    }, 60000);

    const initialTimeout = setTimeout(() => {
      setReviewButtonExpanded(true);
      setTimeout(() => setReviewButtonExpanded(false), 8000);
    }, 5000);

    return () => {
      clearInterval(expandInterval);
      clearTimeout(initialTimeout);
    };
  }, []);

  // ============================================================================
  // CLEANUP
  // ============================================================================
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // ============================================================================
  // LOADING STATE
  // ============================================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#5B3A29] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400 text-sm">Loading menu...</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // ERROR STATE
  // ============================================================================
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-4 max-w-sm mx-auto">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">⚠</span>
          </div>
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-[#5B3A29] text-white text-sm rounded-lg active:bg-[#6B4A39] transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <>
      {/* ====================================================================== */}
      {/* DESKTOP VIEW */}
      {/* ====================================================================== */}
      <div className="hidden lg:flex h-screen overflow-hidden bg-black pt-24">
        {/* LEFT PANEL - Navigation */}
        <div className="w-1/2 h-full flex flex-col relative overflow-y-auto scrollbar-thin scrollbar-thumb-[#5B3A29] scrollbar-track-black/50">
          {/* Background Image */}
          <div className="fixed top-0 left-0 w-1/2 h-screen">
            <ImageWithFallback
              src={interiorTopView}
              alt="Connections Café interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#5B3A29]/10 via-transparent to-black/30"
              animate={{opacity: [0.3, 0.5, 0.3]}}
              transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />
            
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

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full justify-between items-center px-16 py-16">
            <div className="flex-shrink-0 h-16"></div>
            
            <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md">
              {/* Header */}
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
                  Discover our carefully curated selection of food and beverages
                </p>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Star className="w-4 h-4 text-[#5B3A29] fill-[#5B3A29]" />
                  <Star className="w-4 h-4 text-[#5B3A29] fill-[#5B3A29]" />
                  <Star className="w-4 h-4 text-[#5B3A29] fill-[#5B3A29]" />
                </div>
              </motion.div>

              {/* Main Category Toggle */}
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.1, duration: 0.6}}
                className="flex gap-3 mb-8 w-full max-w-xs"
              >
                <button
                  onClick={() => handleMainCategorySwitch('eats')}
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
                  onClick={() => handleMainCategorySwitch('drinks')}
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

              {/* Category Navigation */}
              <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/5 rounded-full">
                  <motion.div
                    className="w-full bg-[#5B3A29] rounded-full"
                    style={{height: `${(100 / currentMenuData.length)}%`}}
                    initial={false}
                    animate={{
                      top: `${((currentMenuData.findIndex(cat => cat.id === activeCategory)) / currentMenuData.length) * 100}%`
                    }}
                    transition={{type: "spring", stiffness: 300, damping: 30}}
                  />
                </div>
                
                <motion.div
                  key={mainCategory}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.2, duration: 0.6}}
                  className="flex flex-col gap-3 w-full pl-4 pr-2"
                >
                  {currentMenuData.map((category, index) => {
                    const IconComponent = category.icon;
                    const isActive = activeCategory === category.id;
                    
                    return (
                      <motion.button
                        key={category.id}
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.05 * index, duration: 0.4}}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`
                          flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-300 text-left
                          ${isActive
                            ? 'bg-[#5B3A29] text-white shadow-2xl shadow-[#5B3A29]/30 scale-105'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white backdrop-blur-sm border border-white/5 hover:border-[#5B3A29]/30'
                          }
                        `}
                      >
                        <IconComponent 
                          className="w-4 h-4 flex-shrink-0" 
                          style={{color: isActive ? 'white' : category.color}}
                        />
                        <div className="flex-1">
                          <div className="text-sm">{category.name}</div>
                        </div>
                        <div className="text-xs opacity-60">{category.items.length}</div>
                        <div className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'bg-white' : 'bg-transparent'}`}></div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Footer */}
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

        {/* RIGHT PANEL - Menu Items */}
        <div 
          ref={desktopScrollContainerRef}
          className="w-1/2 h-screen overflow-y-auto bg-black relative scroll-smooth"
          style={{scrollbarWidth: 'thin', scrollbarColor: '#5B3A29 transparent'}}
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#5B3A29] rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 left-20 w-80 h-80 bg-[#5B3A29] rounded-full blur-3xl"></div>
          </div>
          
          <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#5B3A29]/20 pointer-events-none z-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#5B3A29]/20 pointer-events-none z-10"></div>
          
          <div className="relative px-12 pb-12 pt-32">
            {currentMenuData.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  ref={(el) => { categoryRefs.current[category.id] = el; }}
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

                  {/* Menu Items */}
                  <div className="grid gap-5">
                    {category.items.map((item, index) => (
                      <motion.div
                        key={`${category.id}-${item.name}`}
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
                              <p className="text-gray-500 text-sm leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <p className="text-[#5B3A29] font-medium whitespace-nowrap">
                              {item.price}
                            </p>
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

      {/* ====================================================================== */}
      {/* MOBILE VIEW */}
      {/* ====================================================================== */}
      <div className="lg:hidden min-h-screen bg-black">
        {/* Background Image */}
        <div className="fixed inset-0 w-full h-full z-0">
          <ImageWithFallback
            src={interiorTopView}
            alt="Connections Café interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/85"></div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#5B3A29]/15 via-transparent to-transparent"
            animate={{opacity: [0.4, 0.6, 0.4]}}
            transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/90 to-transparent"></div>
        </div>
        
        {/* Header Section */}
        <div className="relative z-10 pt-20 pb-6 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-[#5B3A29]"></div>
              <Sparkles className="w-4 h-4 text-[#5B3A29]" />
              <div className="w-8 h-px bg-[#5B3A29]"></div>
            </div>
            
            <h1 className="text-white text-3xl sm:text-4xl mb-3 font-['Playfair_Display']">Our Menu</h1>
            
            <div className="w-16 h-1 bg-[#5B3A29] mx-auto mb-4"></div>
            
            <p className="text-gray-300 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Discover our carefully curated selection
            </p>

            {/* Main Category Toggle */}
            <div className="flex gap-3 max-w-sm mx-auto mb-6">
              <motion.button
                onClick={() => handleMainCategorySwitch('eats')}
                className={`flex-1 px-5 py-3 rounded-xl transition-all duration-300 ${
                  mainCategory === 'eats'
                    ? 'bg-[#5B3A29] text-white shadow-xl shadow-[#5B3A29]/40'
                    : 'bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10 active:bg-white/20'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <UtensilsCrossed className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm font-medium">Eats</div>
              </motion.button>
              <motion.button
                onClick={() => handleMainCategorySwitch('drinks')}
                className={`flex-1 px-5 py-3 rounded-xl transition-all duration-300 ${
                  mainCategory === 'drinks'
                    ? 'bg-[#5B3A29] text-white shadow-xl shadow-[#5B3A29]/40'
                    : 'bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10 active:bg-white/20'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Coffee className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm font-medium">Drinks</div>
              </motion.button>
            </div>

            {/* Category Count */}
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Star className="w-3 h-3 text-[#5B3A29] fill-[#5B3A29]" />
              <span>{currentMenuData.length} Categories</span>
              <Star className="w-3 h-3 text-[#5B3A29] fill-[#5B3A29]" />
            </div>
          </motion.div>
        </div>

        {/* Sticky Category Navigation */}
        <div className="sticky top-16 z-30 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <div className="px-4 py-3">
            <div 
              ref={mobileNavScrollRef}
              className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-1 px-1 scroll-smooth"
            >
              {currentMenuData.map((category) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
                  <motion.button
                    key={category.id}
                    data-category-id={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                      isActive
                        ? 'bg-[#5B3A29] text-white shadow-lg shadow-[#5B3A29]/30'
                        : 'bg-white/5 text-gray-400 border border-white/5 active:bg-white/10'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent 
                      className="w-4 h-4" 
                      style={{color: isActive ? 'white' : category.color}}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeCategoryMobile"
                        className="w-1 h-1 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="relative z-10 px-4 py-6">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
            <div className="absolute top-20 right-10 w-64 h-64 bg-[#5B3A29] rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 left-10 w-48 h-48 bg-[#5B3A29] rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            {currentMenuData.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              
              return (
                <div
                  key={category.id}
                  ref={(el) => { categoryRefs.current[category.id] = el; }}
                  data-category-id={category.id}
                  className={categoryIndex > 0 ? 'mt-16' : 'mt-2'}
                >
                  {/* Category Header */}
                  <motion.div 
                    className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5B3A29]/30 to-transparent blur-xl"></div>
                      <div className="relative w-12 h-12 bg-zinc-900/50 rounded-xl flex items-center justify-center border border-white/10">
                        <IconComponent 
                          className="w-6 h-6" 
                          style={{color: category.color}}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-white text-xl sm:text-2xl font-['Playfair_Display'] mb-1">
                        {category.name}
                      </h2>
                      <p className="text-gray-500 text-xs">
                        {category.items.length} item{category.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </motion.div>

                  {/* Category Note */}
                  {category.note && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-5 p-3.5 bg-[#5B3A29]/10 border border-[#5B3A29]/20 rounded-xl backdrop-blur-sm"
                    >
                      <p className="text-gray-400 text-xs italic leading-relaxed">{category.note}</p>
                    </motion.div>
                  )}

                  {/* Menu Items */}
                  <div className="space-y-3.5">
                    {category.items.map((item, index) => (
                      <motion.div
                        key={`${category.id}-${item.name}`}
                        className="group bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-4 hover:bg-zinc-900/60 hover:border-[#5B3A29]/30 transition-all duration-300 active:scale-[0.98]"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white text-base font-medium mb-1.5 leading-snug group-hover:text-[#5B3A29] transition-colors">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-gray-500 text-xs leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            <div className="bg-[#5B3A29]/20 px-3 py-1.5 rounded-lg group-hover:bg-[#5B3A29]/30 transition-colors">
                              <p className="text-[#5B3A29] text-sm font-semibold whitespace-nowrap">
                                {item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 mb-6 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-12 h-px bg-zinc-800"></div>
                <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
                <div className="w-12 h-px bg-zinc-800"></div>
              </div>
              <p className="text-gray-600 text-xs mb-1">Street 227, Ruhengeri</p>
              <p className="text-gray-600 text-xs">Musanze City, Rwanda</p>
            </motion.div>

            {/* Bottom Spacer */}
            <div className="h-24"></div>
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* FLOATING REVIEW BUTTON */}
      {/* ====================================================================== */}
      <motion.a
        href="https://search.google.com/local/writereview?placeid=ChIJS4RqK9Vb3BkR82u6VjZzR0Q"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-4 lg:bottom-6 lg:right-6 z-50 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          delay: 1
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-[#5B3A29]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        
        {/* Button */}
        <motion.div
          className="relative flex items-center gap-2.5 bg-gradient-to-r from-yellow-500 via-[#5B3A29] to-yellow-600 text-white px-4 py-3.5 lg:px-5 lg:py-4 rounded-full shadow-2xl shadow-[#5B3A29]/50 cursor-pointer touch-manipulation overflow-hidden"
          animate={{ 
            width: reviewButtonExpanded ? 'auto' : '56px',
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
        >
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          />
          
          {/* Content */}
          <div className="relative flex items-center gap-2.5">
            {/* Star icon with animation */}
            <motion.div
              animate={{
                rotate: reviewButtonExpanded ? [0, -15, 15, -15, 0] : 0,
                scale: reviewButtonExpanded ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              <Star className="w-5 h-5 lg:w-6 lg:h-6 fill-white flex-shrink-0 drop-shadow-lg" />
            </motion.div>
            
            {/* Text with animation */}
            <AnimatePresence>
              {reviewButtonExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden flex items-center gap-1.5"
                >
                  <span className="text-sm lg:text-base font-semibold whitespace-nowrap drop-shadow-md">
                    Leave a Review
                  </span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <MessageCircle className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 border-2 border-yellow-400/50 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.a>
    </>
  );
}