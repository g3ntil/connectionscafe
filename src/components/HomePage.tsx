import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Coffee, Wifi, Users, Clock, Star } from 'lucide-react';
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
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Hero Section with Rotating Background Images */}
      <div className="relative h-screen w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Animated Texture Overlays */}
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        
        {/* Floating Particles Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => {
            const randomX = Math.random() * window.innerWidth;
            const randomY = window.innerHeight + 50;
            const randomDuration = Math.random() * 10 + 15;
            const randomDelay = Math.random() * 5;
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#5B3A29]/20 rounded-full"
                initial={{x: randomX, y: randomY, opacity: 0}}
                animate={{y: -50, opacity: [0, 1, 0]}}
                transition={{duration: randomDuration, repeat: Infinity, delay: randomDelay, ease: "linear"}}
              />
            );
          })}
        </div>
        
        {/* Hero Text with Enhanced Animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center px-6"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-[#5B3A29] to-transparent mb-8 max-w-md mx-auto"
            />
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] tracking-wide drop-shadow-2xl px-4">
              WHERE MINDS MEET OVER COFFEE
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-[#5B3A29] to-transparent mt-8 max-w-md mx-auto"
            />
          </motion.div>

          {/* Google Rating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 bg-white/10 backdrop-blur-md px-5 sm:px-6 py-3 rounded-full border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + (i * 0.1), type: "spring" }}
                  >
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <div className="text-white text-xs sm:text-sm">
                <span className="font-semibold">4.8</span>
                <span className="text-white/70 ml-1">on Google</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Location Info - Bottom Left with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 text-white"
        >
          <p className="text-xs sm:text-sm tracking-wide mb-1 sm:mb-2 text-[#5B3A29]">/ FIND US</p>
          <p className="text-xs sm:text-sm drop-shadow-md">Street 227, Ruhengeri</p>
          <p className="text-xs sm:text-sm drop-shadow-md">Musanze City, Rwanda</p>
        </motion.div>
        
        {/* Since Badge - Bottom Right with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, type: "spring" }}
          className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-[#5B3A29]/50 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <p className="text-gray-300 text-[10px] sm:text-xs tracking-widest">SINCE</p>
              <p className="text-[#5B3A29] text-xl sm:text-2xl md:text-3xl font-['Playfair_Display']">2025</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* What We Offer Section */}
      <div className="relative bg-black py-16 sm:py-20 md:py-32 overflow-hidden">
        {/* Texture Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5B3A29] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5B3A29] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px bg-[#5B3A29] mx-auto mb-4 sm:mb-6"
            />
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] mb-3 sm:mb-4 px-4">
              What We Offer
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
              A perfect blend of comfort, quality, and community
            </p>
          </motion.div>

          {/* Offerings Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: Coffee, title: "Premium Coffee", desc: "Expertly crafted drinks" },
              { icon: Wifi, title: "Free WiFi", desc: "Stay connected always" },
              { icon: Users, title: "Cozy Space", desc: "Perfect for meetings" },
              { icon: Clock, title: "Long Hours", desc: "7 AM - 11 PM daily" },
            ].map((offering, index) => {
              const Icon = offering.icon;
              return (
                <motion.div
                  key={offering.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group"
                >
                  <div className="relative bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/10 transition-all duration-300 hover:border-[#5B3A29]/50 hover:shadow-2xl hover:shadow-[#5B3A29]/20">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#5B3A29]/20 flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:bg-[#5B3A29]/30 transition-colors duration-300"
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#5B3A29]" />
                    </motion.div>
                    
                    {/* Text */}
                    <h3 className="text-white text-center mb-1.5 sm:mb-2 text-sm sm:text-base">
                      {offering.title}
                    </h3>
                    <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm text-center leading-relaxed">
                      {offering.desc}
                    </p>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#5B3A29]/0 via-[#5B3A29]/0 to-[#5B3A29]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
