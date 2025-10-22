import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { SetupDatabase } from './components/SetupDatabase';
import { ManualSetup } from './components/ManualSetup';
import { DatabaseCheck } from './components/DatabaseCheck';
import { Dashboard } from './components/Dashboard';
import { MenuDebug } from './components/MenuDebug';
import { RouteTest } from './components/RouteTest';
import { SEOHead } from './components/SEOHead';
import { Toaster } from './components/ui/sonner';
import { 
  organizationSchema, 
  websiteSchema, 
  breadcrumbSchema,
  menuSchema,
  localBusinessSchema 
} from './components/StructuredData';
import logoImage from 'figma:asset/31fbf51d49bc0b31739ecb68e046e20c3d4faabe.png';
import { initializeMenuData } from './utils/initializeMenuData';

// SEO configuration for each page
const seoConfig: Record<string, any> = {
  home: {
    title: 'Connections Café - Coffee Shop in Musanze Rwanda | Where Minds Meet Over Coffee',
    description: 'Visit Connections Café in Musanze, Rwanda for quality coffee, smoothies, and beverages. A calm, inspiring space open 7 AM - 11 PM daily. Free WiFi, parking available.',
    keywords: 'connections cafe, musanze coffee shop, rwanda cafe, coffee musanze, cafe ruhengeri, smoothies rwanda, coffee shop northern province',
    canonicalUrl: 'https://connectionscafe.com',
    ogImage: logoImage,
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [organizationSchema, websiteSchema, localBusinessSchema]
    }
  },
  menu: {
    title: 'Menu - Coffee, Smoothies & Beverages | Connections Café Musanze',
    description: 'Browse our complete menu featuring 61+ items: hot & iced coffee, tea, fresh juices, smoothies, milkshakes, soft drinks, wine & beer. Prices in RWF.',
    keywords: 'connections cafe menu, musanze coffee prices, rwanda cafe menu, coffee prices musanze, smoothie menu rwanda, cafe drinks menu',
    canonicalUrl: 'https://connectionscafe.com/menu',
    ogImage: logoImage,
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        menuSchema,
        breadcrumbSchema([
          { name: 'Home', url: 'https://connectionscafe.com' },
          { name: 'Menu', url: 'https://connectionscafe.com/menu' }
        ])
      ]
    }
  },
  about: {
    title: 'About Us - Our Story & Philosophy | Connections Café Musanze Rwanda',
    description: 'Learn about Connections Café - Musanze\'s social hub since 2025. Quality food, comfort, and connection. Open Mon-Sun 7 AM - 11 PM. Street 227, Ruhengeri.',
    keywords: 'connections cafe about, musanze cafe story, rwanda cafe philosophy, cafe musanze hours, connections cafe location',
    canonicalUrl: 'https://connectionscafe.com/about',
    ogImage: logoImage,
    structuredData: breadcrumbSchema([
      { name: 'Home', url: 'https://connectionscafe.com' },
      { name: 'About', url: 'https://connectionscafe.com/about' }
    ])
  },
  contact: {
    title: 'Contact Us - Reservations & Inquiries | Connections Café Musanze',
    description: 'Contact Connections Café for reservations, questions, or feedback. Phone: +250 788 340 651 | Email: connectionscafe@gmail.com | Street 227, Ruhengeri, Musanze.',
    keywords: 'connections cafe contact, musanze cafe phone, cafe reservations rwanda, connections cafe email, musanze cafe address',
    canonicalUrl: 'https://connectionscafe.com/contact',
    ogImage: logoImage,
    structuredData: breadcrumbSchema([
      { name: 'Home', url: 'https://connectionscafe.com' },
      { name: 'Contact', url: 'https://connectionscafe.com/contact' }
    ])
  }
};

// Component to handle SEO based on current route
function SEOManager() {
  const location = useLocation();
  
  const getSEOConfig = () => {
    const path = location.pathname;
    if (path === '/menu') return seoConfig.menu;
    if (path === '/about') return seoConfig.about;
    if (path === '/contact') return seoConfig.contact;
    return seoConfig.home;
  };

  const currentSEO = getSEOConfig();

  return <SEOHead {...currentSEO} />;
}

// NotFound component - simple redirect to home
function NotFound() {
  const location = useLocation();
  
  useEffect(() => {
    console.log('404 detected, path:', location.pathname);
    // Redirect to home
    window.location.href = '/';
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#5B3A29] border-t-transparent rounded-full mx-auto mb-4 animate-spin"></div>
        <p className="text-gray-400 text-sm">Redirecting to homepage...</p>
      </div>
    </div>
  );
}

// Layout component for pages with header
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  // Pages that don't need the header
  const noHeaderPaths = [
    '/preview_page.html', 
    '/secure-portal-musanze-2025',
    '/setup', 
    '/setup-db', 
    '/db-check', 
    '/menu-debug',
    '/route-test'
  ];
  
  const hideHeader = noHeaderPaths.includes(location.pathname);

  return (
    <>
      <SEOManager />
      <div className="min-h-screen bg-black overflow-x-hidden">
        {!hideHeader && <Header />}
        <main className="page-transition" role="main">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

// Main App Routes component
function AppRoutes() {
  const location = useLocation();
  
  // Log route changes for debugging
  useEffect(() => {
    console.log('=== ROUTE CHANGE ===');
    console.log('Current path:', location.pathname);
    console.log('Current search:', location.search);
    console.log('Current hash:', location.hash);
    console.log('===================');
  }, [location]);
  
  // Initialize menu data on first load
  useEffect(() => {
    const initMenu = async () => {
      const initialized = localStorage.getItem('menuDataInitialized');
      if (!initialized) {
        try {
          console.log('Initializing menu data in database...');
          await initializeMenuData();
          localStorage.setItem('menuDataInitialized', 'true');
          console.log('Menu data initialization complete!');
        } catch (error) {
          console.error('Failed to initialize menu data:', error);
        }
      }
    };
    
    initMenu();
  }, []);

  // Set up essential meta tags and favicon
  useEffect(() => {
    // Set viewport meta tag
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
      document.head.appendChild(viewport);
    }

    // Set charset
    let charset = document.querySelector('meta[charset]');
    if (!charset) {
      charset = document.createElement('meta');
      charset.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(charset, document.head.firstChild);
    }

    // Set language attribute
    document.documentElement.lang = 'en';

    // Update favicon to use Connections Café logo with multiple sizes
    const setFavicon = () => {
      // Remove any existing favicons
      document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
      
      // Add 32x32 favicon
      const link32 = document.createElement('link');
      link32.rel = 'icon';
      link32.type = 'image/png';
      link32.sizes = '32x32';
      link32.href = logoImage;
      document.head.appendChild(link32);
      
      // Add 16x16 favicon
      const link16 = document.createElement('link');
      link16.rel = 'icon';
      link16.type = 'image/png';
      link16.sizes = '16x16';
      link16.href = logoImage;
      document.head.appendChild(link16);
      
      // Add shortcut icon
      const shortcut = document.createElement('link');
      shortcut.rel = 'shortcut icon';
      shortcut.href = logoImage;
      document.head.appendChild(shortcut);
    };

    // Set apple touch icon to use Connections Café logo
    let appleIcon = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
    if (!appleIcon) {
      appleIcon = document.createElement('link');
      appleIcon.rel = 'apple-touch-icon';
      appleIcon.href = logoImage;
      document.head.appendChild(appleIcon);
    } else {
      appleIcon.href = logoImage;
    }

    // Set manifest
    let manifest = document.querySelector("link[rel='manifest']") as HTMLLinkElement;
    if (!manifest) {
      manifest = document.createElement('link');
      manifest.rel = 'manifest';
      manifest.href = '/manifest.json';
      document.head.appendChild(manifest);
    }
    
    setFavicon();
  }, []);

  return (
    <Layout>
      <Routes>
        {/* Public Pages - Main Site */}
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Admin Dashboard - Two entry points */}
        <Route path="/preview_page.html" element={<Dashboard />} />
        <Route path="/secure-portal-musanze-2025" element={<Dashboard />} />
        
        {/* Setup & Debug Pages */}
        <Route path="/setup" element={<SetupDatabase />} />
        <Route path="/setup-db" element={<ManualSetup />} />
        <Route path="/db-check" element={<DatabaseCheck />} />
        <Route path="/menu-debug" element={<MenuDebug />} />
        <Route path="/route-test" element={<RouteTest />} />
        
        {/* 404 - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

// Root App component
export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </BrowserRouter>
  );
}
