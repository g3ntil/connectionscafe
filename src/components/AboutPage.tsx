import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import interiorImage from 'figma:asset/96c5fb5b647e1f85d658410dc3465406826430ca.png';
import interiorStairs from 'figma:asset/9359ea498ea46ca0a7bba3adb5f65cf75f8bf94a.png';
import darkInteriorImage from 'figma:asset/cec4e7eb2f572e074d9de08f05deaf8b94af3179.png';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => {
          const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920);
          const randomY = typeof window !== 'undefined' ? window.innerHeight + 50 : 1080;
          const randomDuration = Math.random() * 15 + 20;
          const randomDelay = Math.random() * 5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#5B3A29]/20 rounded-full"
              initial={{x: randomX, y: randomY, opacity: 0}}
              animate={{y: -50, opacity: [0, 0.5, 0]}}
              transition={{duration: randomDuration, repeat: Infinity, delay: randomDelay, ease: "linear"}}
            />
          );
        })}
      </div>

      {/* Mobile Background Image with Blur and High Contrast */}
      <div className="lg:hidden fixed inset-0 z-0">
        <ImageWithFallback
          src={interiorStairs}
          alt="Connections Café warm interior with wooden ceiling and ambient lighting"
          className="w-full h-full object-cover"
        />
        {/* Blur and dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        
        {/* Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-[#5B3A29]/10 via-transparent to-black/50"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Left Side - Fixed Image and Title with Blur Effect */}
      <div className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:w-1/2 h-screen overflow-hidden z-0">
        <ImageWithFallback
          src={interiorStairs}
          alt="Connections Café multi-level interior with wooden stairs"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay with subtle blur for text contrast */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"></div>
        
        {/* Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#5B3A29]/10 via-transparent to-black/30"
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-[#5B3A29] to-transparent mb-8 max-w-xs mx-auto"
            />
            <h1 className="text-white text-5xl md:text-6xl font-['Playfair_Display'] tracking-wide drop-shadow-2xl">
              ABOUT US
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-[#5B3A29] to-transparent mt-8 max-w-xs mx-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="relative w-full lg:ml-[50%] lg:w-1/2 bg-black lg:bg-transparent min-h-screen z-10">
        <div className="relative z-10 px-5 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-16 max-w-4xl">
          {/* History Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 transition-all duration-300 hover:bg-zinc-900/50 hover:border-zinc-700/50 group"
          >
            <h2 className="text-[#5B3A29] text-xl sm:text-2xl font-['Playfair_Display'] tracking-wider mb-3 sm:mb-4">
              OUR STORY
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
              Connections Café was founded in 2025 to create a calm and inspiring space for everyone — a place where people can come, think, and connect over good food and great coffee.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
              It's more than a café — it's a social hub designed for meaningful conversations, creativity, and relaxation. Whether you're working on your next big idea, meeting friends for a chat, or simply enjoying a quiet moment with a book, Connections Café is your sanctuary.
            </p>
            <motion.div 
              className="relative h-48 sm:h-56 md:h-64 rounded-lg sm:rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src={interiorImage}
                alt="Connections Café warm interior with wooden ceiling"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <motion.div 
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] drop-shadow-lg">Connections Café</h3>
                <p className="text-gray-200 text-xs sm:text-sm mt-1 drop-shadow-md">Musanze City, Rwanda</p>
              </motion.div>
            </motion.div>
            
            {/* Decorative glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5B3A29]/0 via-[#5B3A29]/5 to-[#5B3A29]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="relative my-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 flex items-center">
              <motion.div 
                className="w-full border-t border-zinc-800/50"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="relative flex justify-center">
              <motion.span 
                className="bg-black px-4 text-zinc-600"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                ⬥
              </motion.span>
            </div>
          </motion.div>

          {/* Opening Hours Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 transition-all duration-300 hover:bg-zinc-900/50 hover:border-zinc-700/50 group"
          >
            <h2 className="text-[#5B3A29] text-xl sm:text-2xl font-['Playfair_Display'] tracking-wider mb-4 sm:mb-6">
              OPENING HOURS
            </h2>
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-white">Monday - Sunday</span>
                <span className="text-gray-400">7:00 AM - 11:00 PM</span>
              </div>
              <div className="border-t border-zinc-800/50 pt-3 mt-3">
                <p className="text-gray-400 text-sm mb-3">Service Times:</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Breakfast</span>
                    <span className="text-gray-500">7:00 AM - 11:00 AM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Lunch</span>
                    <span className="text-gray-500">12:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Dinner</span>
                    <span className="text-gray-500">5:00 PM - 10:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[#5B3A29] hover:gap-3 transition-all group">
              <span>Contact Us to Reserve</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Decorative glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5B3A29]/0 via-[#5B3A29]/5 to-[#5B3A29]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
          </motion.div>

          {/* Divider */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-4 text-zinc-600">⬥</span>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="space-y-8 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="relative h-80 rounded-2xl overflow-hidden border border-zinc-800/50"
            >
              <ImageWithFallback
                src={interiorImage}
                alt="Connections Café interior with warm ambiance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-[#5B3A29] text-2xl font-['Playfair_Display'] tracking-wider mb-3 drop-shadow-lg">
                  OUR PHILOSOPHY
                </h2>
                <p className="text-gray-100 leading-relaxed drop-shadow-md">
                  Our philosophy is simple: <strong className="text-white drop-shadow-lg">serve quality food, create comfort, and inspire connection.</strong> Every cup of coffee is carefully crafted, every dish thoughtfully prepared, and every guest warmly welcomed.
                </p>
              </div>
            </motion.div>

            {/* Restaurant Interior Image */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative h-80 rounded-2xl overflow-hidden border border-zinc-800/50"
            >
              <ImageWithFallback
                src={darkInteriorImage}
                alt="Connections Café cozy atmosphere"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-[#5B3A29] text-sm tracking-widest mb-2 drop-shadow-lg">/ COMMUNITY</p>
                <h3 className="text-white text-3xl font-['Playfair_Display'] drop-shadow-lg">A Space for Everyone</h3>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-4 text-zinc-600">⬥</span>
            </div>
          </div>

          {/* Services */}
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 mb-8">
            <h3 className="text-[#5B3A29] text-xl font-['Playfair_Display'] tracking-wider mb-6">
              WHAT WE OFFER
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-gray-300">✓ Takeout & Delivery</div>
              <div className="text-gray-300">✓ Events & Group Bookings</div>
              <div className="text-gray-300">✓ Catering Services</div>
              <div className="text-gray-300">✓ On-site Parking</div>
              <div className="text-gray-300">✓ Free Wi-Fi</div>
              <div className="text-gray-300">✓ Mobile Money Accepted</div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-4 text-zinc-600">⬥</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 mb-16">
            <h2 className="text-[#5B3A29] text-2xl font-['Playfair_Display'] tracking-wider mb-6">
              VISIT US
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Address</p>
                <p className="text-white">Street 227, Ruhengeri</p>
                <p className="text-white">Musanze City, Rwanda</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Contact</p>
                <p className="text-white">Phone: +250 788 340 651</p>
                <p className="text-white">Email: connectionscafe@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
