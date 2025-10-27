/**
 * Structured Data (Schema.org) configurations for Connections Café
 * These help search engines understand the business and improve rich snippets in search results
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://connectionscafe.com/#organization",
  "name": "Connections Café",
  "alternateName": "Connections Cafe Rwanda",
  "url": "https://connectionscafe.com",
  "logo": "https://connectionscafe.com/logo.png",
  "description": "A calm and inspiring café in Musanze, Rwanda where people connect over quality coffee, smoothies, and beverages. Open 7 AM - 11 PM daily.",
  "image": [
    "https://connectionscafe.com/cafe-interior.jpg",
    "https://connectionscafe.com/coffee-service.jpg",
    "https://connectionscafe.com/menu-showcase.jpg"
  ],
  "telephone": "+250788340651",
  "email": "connectionscafe@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Street 227, Ruhengeri",
    "addressLocality": "Musanze",
    "addressRegion": "Northern Province",
    "postalCode": "",
    "addressCountry": "RW"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -1.4981,
    "longitude": 29.6344
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "07:00",
      "closes": "23:00"
    }
  ],
  "priceRange": "RWF 1,000 - 5,000",
  "servesCuisine": ["Coffee", "Beverages", "Smoothies", "Juices"],
  "acceptsReservations": "True",
  "paymentAccepted": ["Cash", "Mobile Money"],
  "currenciesAccepted": "RWF",
  "sameAs": [
    "https://www.instagram.com/connectionscaferw"
  ],
  "hasMenu": "https://connectionscafe.com/menu",
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Free WiFi",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "On-site Parking",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Takeout Available",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Delivery Available",
      "value": true
    }
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://connectionscafe.com/#website",
  "url": "https://connectionscafe.com",
  "name": "Connections Café - Where Minds Meet Over Coffee",
  "description": "Quality coffee, smoothies, and beverages in Musanze, Rwanda. A social hub for meaningful conversations and connections.",
  "publisher": {
    "@id": "https://connectionscafe.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://connectionscafe.com/menu?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const menuSchema = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": "https://connectionscafe.com/menu#menu",
  "name": "Connections Café Full Menu",
  "description": "Complete menu featuring hot coffee, iced coffee, tea, juices, smoothies, soft drinks, wine & beer",
  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Hot Coffee",
      "description": "Espresso-based hot coffee beverages",
      "hasMenuItem": [
        { "@type": "MenuItem", "name": "Espresso", "offers": { "@type": "Offer", "price": "1500", "priceCurrency": "RWF" } },
        { "@type": "MenuItem", "name": "Americano", "offers": { "@type": "Offer", "price": "1500", "priceCurrency": "RWF" } },
        { "@type": "MenuItem", "name": "Cappuccino", "offers": { "@type": "Offer", "price": "2500", "priceCurrency": "RWF" } },
        { "@type": "MenuItem", "name": "Latte", "offers": { "@type": "Offer", "price": "2500", "priceCurrency": "RWF" } }
      ]
    },
    {
      "@type": "MenuSection",
      "name": "Iced Coffee",
      "description": "Refreshing cold coffee beverages",
      "hasMenuItem": [
        { "@type": "MenuItem", "name": "Cold Brew", "offers": { "@type": "Offer", "price": "3000", "priceCurrency": "RWF" } },
        { "@type": "MenuItem", "name": "Iced Latte", "offers": { "@type": "Offer", "price": "3000", "priceCurrency": "RWF" } }
      ]
    },
    {
      "@type": "MenuSection",
      "name": "Smoothies & Milkshakes",
      "description": "Fresh fruit smoothies and creamy milkshakes",
      "hasMenuItem": [
        { "@type": "MenuItem", "name": "Mango Mania Smoothie", "offers": { "@type": "Offer", "price": "3500", "priceCurrency": "RWF" } },
        { "@type": "MenuItem", "name": "Vanilla Milkshake", "offers": { "@type": "Offer", "price": "4000", "priceCurrency": "RWF" } }
      ]
    }
  ]
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://connectionscafe.com/#localbusiness",
  "name": "Connections Café",
  "image": "https://connectionscafe.com/cafe-front.jpg",
  "url": "https://connectionscafe.com",
  "telephone": "+250788340651",
  "email": "connectionscafe@gmail.com",
  "priceRange": "RWF 1,000 - 20,000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Street 227, Ruhengeri",
    "addressLocality": "Musanze",
    "addressRegion": "Northern Province",
    "addressCountry": "RW"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -1.4981,
    "longitude": 29.6344
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "07:00",
      "closes": "23:00"
    }
  ]
};
