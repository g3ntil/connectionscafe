import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { MenuPage } from './components/MenuPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { SEOHead } from './components/SEOHead';
import { 
  organizationSchema, 
  websiteSchema, 
  breadcrumbSchema,
  menuSchema,
  localBusinessSchema 
} from './components/StructuredData';
import logoImage from 'figma:asset/31fbf51d49bc0b31739ecb68e046e20c3d4faabe.png';

export default function App() {
  // Get initial page from URL path
  const getPageFromPath = () => {
    const path = window.location.pathname;
    if (path === '/menu') return 'menu';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromPath());

  // Handle navigation with URL updates
  const handleNavigate = (page: string) => {
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
    setCurrentPage(page);
  };

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  const currentSEO = seoConfig[currentPage] || seoConfig.home;

  return (
    <>
      {/* SEO Meta Tags and Structured Data */}
      <SEOHead {...currentSEO} />
      
      <div className="min-h-screen bg-black overflow-x-hidden">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main key={currentPage} className="page-transition" role="main">
          {renderPage()}
        </main>
      </div>
    </>
  );
}
