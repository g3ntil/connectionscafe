import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Coffee, Wifi, Users, Clock } from 'lucide-react';
import buildingImage from 'figma:asset/374783557e8472dc3a4e9a7df05708010a2e4077.png';
import interiorImage from 'figma:asset/96c5fb5b647e1f85d658410dc3465406826430ca.png';
import darkInteriorImage from 'figma:asset/cec4e7eb2f572e074d9de08f05deaf8b94af3179.png';
import interiorTopView from 'figma:asset/7da2820ab6d94df8fcb9b546482f5019ce6f4a69.png';
import interiorStairs from 'figma:asset/9359ea498ea46ca0a7bba3adb5f65cf75f8bf94a.png';

const heroImages = [
  { src: buildingImage, alt: "Connections Café building exterior - Musanze, Rwanda" },
  { src: interiorImage, alt: "Connections Café warm interior with wooden ceiling" },
  { src: darkInteriorImage, alt: "Connections Café cozy dining area with warm lighting" },
  { src: interiorTopView, alt: "Connections Café interior top view with elegant seating" },
  { src: interiorStairs, alt: "Connections Café multi-level interior with wooden stairs" },
];

export function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Rotating Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={heroImages[currentImageIndex].src}
            alt={heroImages[currentImageIndex].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-[#5B3A29] to-transparent mb-6 max-w-xs mx-auto"
          />
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] tracking-wide px-4">
            WHERE MINDS MEET OVER COFFEE
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-[#5B3A29] to-transparent mt-6 max-w-xs mx-auto"
          />
        </motion.div>

        {/* Services Grid */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { icon: Coffee, title: "Premium Coffee" },
              { icon: Wifi, title: "Free WiFi" },
              { icon: Users, title: "Cozy Space" },
              { icon: Clock, title: "7 AM - 11 PM" },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-[#5B3A29]/50">
                    <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-[#5B3A29] mx-auto mb-3" />
                    <h3 className="text-white text-center text-sm lg:text-base">
                      {service.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Location Info - Bottom Left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 text-white"
      >
        <p className="text-xs text-[#5B3A29] mb-1">/ FIND US</p>
        <p className="text-xs sm:text-sm">Street 227, Ruhengeri</p>
        <p className="text-xs sm:text-sm">Musanze City, Rwanda</p>
      </motion.div>
      
      {/* Since Badge - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#5B3A29]/50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm">
          <p className="text-gray-300 text-[10px] tracking-widest">SINCE</p>
          <p className="text-[#5B3A29] text-2xl sm:text-3xl font-['Playfair_Display']">2025</p>
        </div>
      </motion.div>

    </div>
  );
}