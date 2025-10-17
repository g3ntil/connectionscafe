import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, Clock, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import darkInteriorImage from 'figma:asset/cec4e7eb2f572e074d9de08f05deaf8b94af3179.png';
import buildingImage from 'figma:asset/374783557e8472dc3a4e9a7df05708010a2e4077.png';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => {
          const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920);
          const randomY = typeof window !== 'undefined' ? window.innerHeight + 50 : 1080;
          const randomDuration = Math.random() * 12 + 18;
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
          src={buildingImage}
          alt="Connections Café building exterior"
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
      
      {/* Left Side - Fixed Image with Blur Effect */}
      <div className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:w-1/2 h-screen overflow-hidden z-0">
        <ImageWithFallback
          src={darkInteriorImage}
          alt="Connections Café cozy dining area with warm yellow lighting"
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Mail className="w-16 h-16 text-[#5B3A29] mx-auto mb-6" />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-[#5B3A29] to-transparent mb-8 max-w-xs mx-auto"
            />
            <h1 className="text-white text-5xl md:text-6xl font-['Playfair_Display'] tracking-wide drop-shadow-2xl">
              CONTACT US
            </h1>
            <p className="text-gray-300 mt-4 text-lg">We'd love to hear from you</p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-px bg-gradient-to-r from-transparent via-[#5B3A29] to-transparent mt-8 max-w-xs mx-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="relative w-full lg:ml-[50%] lg:w-1/2 bg-black lg:bg-transparent min-h-screen z-10">
        <div className="relative z-10 px-5 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-16 max-w-4xl">
          <div className="max-w-xl mx-auto lg:mx-0">
            <h2 className="text-[#5B3A29] text-2xl sm:text-3xl font-['Playfair_Display'] tracking-wider mb-2 sm:mb-3">
              GET IN TOUCH
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed">
              Have a question or want to make a reservation? Send us a message and we'll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Name */}
              <div>
                <label className="block text-white mb-2 sm:mb-2.5 text-xs sm:text-sm tracking-wide">Full Name *</label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900/30 border-zinc-800/50 text-white text-sm sm:text-base placeholder:text-gray-500 focus:border-[#5B3A29] rounded-lg sm:rounded-xl h-11 sm:h-12 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white mb-2.5 text-sm tracking-wide">Email Address *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900/30 border-zinc-800/50 text-white placeholder:text-gray-500 focus:border-[#5B3A29] rounded-xl h-12 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white mb-2.5 text-sm tracking-wide">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-zinc-900/30 border-zinc-800/50 text-white placeholder:text-gray-500 focus:border-[#5B3A29] rounded-xl h-12 transition-all duration-300"
                  placeholder="+250 788 000 000"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-white mb-2.5 text-sm tracking-wide">Subject *</label>
                <Input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-zinc-900/30 border-zinc-800/50 text-white placeholder:text-gray-500 focus:border-[#5B3A29] rounded-xl h-12 transition-all duration-300"
                  placeholder="Reservation, Question, Feedback..."
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-white mb-2.5 text-sm tracking-wide">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-900/30 border border-zinc-800/50 text-white placeholder:text-gray-500 focus:border-[#5B3A29] rounded-xl p-4 min-h-[160px] focus:outline-none focus:ring-1 focus:ring-[#5B3A29] transition-all duration-300"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#5B3A29] hover:bg-[#4A2F1F] text-white py-6 rounded-xl transition-all duration-300 tracking-wide"
              >
                Send Message
              </Button>

              <p className="text-gray-500 text-xs text-center leading-relaxed">
                By submitting this form, you agree that we may contact you regarding your inquiry.
              </p>
            </form>

            {/* Divider */}
            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-black px-4 text-zinc-600">⬥</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-[#5B3A29] text-xl font-['Playfair_Display'] tracking-wider mb-6">
                OTHER WAYS TO REACH US
              </h3>

              {/* Phone */}
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#5B3A29]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#5B3A29]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <p className="text-white">+250 788 340 651</p>
                    <p className="text-gray-500 text-sm mt-1">Daily: 7 AM - 11 PM</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#5B3A29]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#5B3A29]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white">connectionscafe@gmail.com</p>
                    <p className="text-gray-500 text-sm mt-1">We reply within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#5B3A29]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#5B3A29]" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Address</p>
                    <p className="text-white">Street 227, Ruhengeri</p>
                    <p className="text-white">Musanze City, Rwanda</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#5B3A29]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#5B3A29]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-3">Opening Hours</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white">Monday - Sunday</span>
                        <span className="text-gray-400">7 AM - 11 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
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

            {/* FAQ Quick Links */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 mb-12">
              <h3 className="text-[#5B3A29] text-xl font-['Playfair_Display'] tracking-wider mb-6">
                QUICK ANSWERS
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white mb-1">Do you take reservations?</p>
                  <p className="text-gray-400 text-sm">Yes, we accept reservations by phone or email. Walk-ins are also welcome based on availability.</p>
                </div>
                <div className="border-t border-zinc-800/50 pt-4">
                  <p className="text-white mb-1">Is there parking available?</p>
                  <p className="text-gray-400 text-sm">Yes, we have on-site parking available for our guests.</p>
                </div>
                <div className="border-t border-zinc-800/50 pt-4">
                  <p className="text-white mb-1">Do you accommodate dietary restrictions?</p>
                  <p className="text-gray-400 text-sm">Absolutely! Please inform us of any dietary requirements when contacting us.</p>
                </div>
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

            {/* Social Media */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 mb-16">
              <h3 className="text-[#5B3A29] text-xl font-['Playfair_Display'] tracking-wider mb-6">
                FOLLOW US
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Stay connected with us on Instagram for updates, special offers, and behind-the-scenes content.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://instagram.com/connectionscaferw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl px-5 py-3 hover:bg-zinc-900/80 hover:border-[#5B3A29]/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#5B3A29]/10 flex items-center justify-center group-hover:bg-[#5B3A29]/20 transition-colors">
                    <Instagram className="w-5 h-5 text-[#5B3A29]" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Instagram</p>
                    <p className="text-gray-500 text-xs">@connectionscaferw</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
