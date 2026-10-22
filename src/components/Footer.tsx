import React from 'react';
import { Gamepad2, ShieldCheck, Heart, Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-[#1f2734] bg-[#090b0e] text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Project Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#107C10] via-[#1db92c] to-[#2ee455] p-0.5 shadow-md shadow-[#107C10]/30">
                <div className="w-full h-full bg-[#0d1014] rounded-[14px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-[#2ee455]" />
                </div>
              </div>
              <span className="text-2xl font-black text-white tracking-wider">
                GAMEZONE
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Plataforma desarrollada para la actividad escolar de la <strong className="text-[#2ee455]">Unidad 3: Seguridad, Web Services y APIs</strong> en la materia de Desarrollo Web con un diseño moderno y temático gamer.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#12161f] border border-[#222b38] text-[11px] text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-[#2ee455]" />
              <span>Servidor Node.js + Express + Helmet + Bcrypt</span>
            </div>
          </div>

          {/* Navegación Rápida */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Pantallas de la Aplicación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#2ee455] transition-colors cursor-pointer"
                >
                  Pantalla 1: Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('register')}
                  className="hover:text-[#2ee455] transition-colors cursor-pointer"
                >
                  Pantalla 2: Registro de Usuario
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#2ee455] transition-colors cursor-pointer"
                >
                  Pantalla 3: Explorar Videojuegos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('security')}
                  className="hover:text-[#2ee455] transition-colors cursor-pointer"
                >
                  Panel de Web Services & Seguridad
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs')}
                  className="hover:text-[#2ee455] transition-colors cursor-pointer"
                >
                  Manual de Instalación en Windows
                </button>
              </li>
            </ul>
          </div>

          {/* Temas de la Unidad 3 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Criterios de Evaluación Unidad 3
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2ee455] shrink-0 mt-0.5" />
                <span>Seguridad: Cifrado con Bcrypt y cabeceras HTTP con Helmet.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2ee455] shrink-0 mt-0.5" />
                <span>Web Services: Endpoints RESTful con formato JSON y códigos de estado.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2ee455] shrink-0 mt-0.5" />
                <span>APIs Externas: Consumo seguro en backend protegiendo secretos en .env.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-6 border-t border-[#1f2734] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 GameZone. Proyecto escolar con fines académicos.</p>
          <p className="flex items-center gap-1.5">
            <span>Desarrollado con dedicación para la Unidad 3</span>
            <Heart className="w-3.5 h-3.5 text-[#2ee455] fill-[#2ee455]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
