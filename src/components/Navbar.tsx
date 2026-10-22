import React, { useState } from 'react';
import { Gamepad2, ShieldCheck, Compass, UserPlus, FileText, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  serverOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, serverOnline }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Gamepad2 },
    { id: 'catalog', label: 'Explorar Juegos', icon: Compass },
    { id: 'register', label: 'Registro', icon: UserPlus },
    { id: 'security', label: 'Web Services & Seguridad', icon: ShieldCheck, badge: 'Unidad 3' },
    { id: 'docs', label: 'Guía y Entrega', icon: FileText },
  ];

  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0e12]/95 backdrop-blur-md border-b border-[#1f2732]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleSelectTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#107C10] via-[#1db92c] to-[#2ee455] p-0.5 shadow-lg shadow-[#107C10]/30 group-hover:shadow-[#2ee455]/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0d1014] rounded-[14px] flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-[#2ee455] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-wider bg-gradient-to-r from-white via-zinc-100 to-[#2ee455] bg-clip-text text-transparent">
                  GAMEZONE
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-[#107C10]/20 text-[#2ee455] border border-[#107C10]/60">
                  U3
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
                Videojuegos & Web Services
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-[#107C10]/20 text-[#2ee455] border border-[#107C10]/60 shadow-sm shadow-[#107C10]/20'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2ee455]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-[#107C10]/40 text-[#2ee455] border border-[#107C10]/60">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#107C10] to-[#2ee455] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Server Status Indicator */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14181f] border border-[#262e3a] text-xs">
              <span className="relative flex h-2.5 w-2.5">
                {serverOnline && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ee455] opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${serverOnline ? 'bg-[#107C10]' : 'bg-amber-500'}`}></span>
              </span>
              <span className="text-zinc-300 font-medium">
                {serverOnline ? 'Servidor GameZone Activo' : 'Conectando Express...'}
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#107C10]/20 text-[#2ee455] border border-[#107C10]/60'
                      : 'text-zinc-300 hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#2ee455]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#107C10]/40 text-[#2ee455] border border-[#107C10]/60">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
