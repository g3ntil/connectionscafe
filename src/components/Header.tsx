import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from 'figma:asset/31fbf51d49bc0b31739ecb68e046e20c3d4faabe.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = currentPage === 'home';
  
  const handleNavigation = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Header - Centered on Home, Centered on Left Side for Other Pages */}
      <header className={`fixed z-50 hidden lg:block ${
        isHomePage 
          ? 'top-8 left-1/2 -translate-x-1/2' 
          : 'top-8 left-1/4 -translate-x-1/2'
      }`}>
        <div className="bg-[#1a1a1a] backdrop-blur-md rounded-full px-8 py-3 flex items-center gap-8 border border-zinc-800/50 shadow-xl">
          <button 
            onClick={() => handleNavigation('home')}
            className="hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img 
              src={logoImage} 
              alt="Connections Café" 
              className="h-12 w-auto object-contain"
            />
          </button>
          
          <div className="w-px h-8 bg-zinc-700"></div>
          
          <nav className="flex items-center gap-8">
            <button
              onClick={() => handleNavigation('menu')}
              className={`text-sm tracking-wide transition-colors ${
                currentPage === 'menu' ? 'text-[#5B3A29]' : 'text-white hover:text-[#5B3A29]'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className={`text-sm tracking-wide transition-colors ${
                currentPage === 'about' ? 'text-[#5B3A29]' : 'text-white hover:text-[#5B3A29]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavigation('contact')}
              className={`text-sm tracking-wide transition-colors ${
                currentPage === 'contact' ? 'text-[#5B3A29]' : 'text-white hover:text-[#5B3A29]'
              }`}
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Header - Enhanced Design */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="relative bg-gradient-to-b from-black/95 via-[#1a1a1a]/95 to-[#1a1a1a]/90 backdrop-blur-xl border-b border-[#5B3A29]/20 shadow-2xl">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5B3A29] to-transparent"></div>
          
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <button 
              onClick={() => handleNavigation('home')}
              className="hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            >
              <img 
                src={logoImage} 
                alt="Connections Café" 
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-lg"
              />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative text-white hover:text-[#5B3A29] transition-all duration-300 p-2.5 sm:p-3 rounded-full bg-zinc-900/50 hover:bg-[#5B3A29]/10 border border-zinc-800/50 hover:border-[#5B3A29]/50"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                {mobileMenuOpen ? (
                  <X className="w-4.5 h-4.5 sm:w-5 sm:h-5 animate-in spin-in-180 duration-300" />
                ) : (
                  <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown - Enhanced */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="flex flex-col border-t border-zinc-800/30 bg-black/40 backdrop-blur-lg">
              <button
                onClick={() => handleNavigation('menu')}
                className={`px-4 sm:px-6 py-4 sm:py-5 text-left text-sm sm:text-base tracking-wide transition-all duration-300 border-b border-zinc-800/30 flex items-center justify-between group ${
                  currentPage === 'menu' 
                    ? 'text-white bg-gradient-to-r from-[#5B3A29]/30 to-transparent border-l-4 border-l-[#5B3A29]' 
                    : 'text-gray-300 hover:text-white hover:bg-zinc-900/40 hover:border-l-4 hover:border-l-[#5B3A29]/50'
                }`}
              >
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${currentPage === 'menu' ? 'bg-[#5B3A29]' : 'bg-gray-600 group-hover:bg-[#5B3A29]'}`}></span>
                  Menu
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 group-hover:text-[#5B3A29]">→</span>
              </button>
              <button
                onClick={() => handleNavigation('about')}
                className={`px-4 sm:px-6 py-4 sm:py-5 text-left text-sm sm:text-base tracking-wide transition-all duration-300 border-b border-zinc-800/30 flex items-center justify-between group ${
                  currentPage === 'about' 
                    ? 'text-white bg-gradient-to-r from-[#5B3A29]/30 to-transparent border-l-4 border-l-[#5B3A29]' 
                    : 'text-gray-300 hover:text-white hover:bg-zinc-900/40 hover:border-l-4 hover:border-l-[#5B3A29]/50'
                }`}
              >
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${currentPage === 'about' ? 'bg-[#5B3A29]' : 'bg-gray-600 group-hover:bg-[#5B3A29]'}`}></span>
                  About
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 group-hover:text-[#5B3A29]">→</span>
              </button>
              <button
                onClick={() => handleNavigation('contact')}
                className={`px-4 sm:px-6 py-4 sm:py-5 text-left text-sm sm:text-base tracking-wide transition-all duration-300 flex items-center justify-between group ${
                  currentPage === 'contact' 
                    ? 'text-white bg-gradient-to-r from-[#5B3A29]/30 to-transparent border-l-4 border-l-[#5B3A29]' 
                    : 'text-gray-300 hover:text-white hover:bg-zinc-900/40 hover:border-l-4 hover:border-l-[#5B3A29]/50'
                }`}
              >
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${currentPage === 'contact' ? 'bg-[#5B3A29]' : 'bg-gray-600 group-hover:bg-[#5B3A29]'}`}></span>
                  Contact
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 group-hover:text-[#5B3A29]">→</span>
              </button>
            </nav>
            {/* Decorative bottom fade */}
            <div className="h-2 bg-gradient-to-b from-black/40 to-transparent"></div>
          </div>
        </div>
      </header>
    </>
  );
}
