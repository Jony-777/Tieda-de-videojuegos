import React from 'react';
import { Compass, UserPlus, Shield, Zap, Sparkles, Star, ArrowRight, Server, KeyRound } from 'lucide-react';
import { GameItem } from '../types';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onSelectGame: (game: GameItem) => void;
  featuredGames: GameItem[];
  loading: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectGame,
  featuredGames,
  loading,
}) => {
  const heroGame = featuredGames.length > 0 ? featuredGames[0] : null;
  const topPicks = featuredGames.slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-[#222a36] bg-[#0e1218] p-6 sm:p-10 lg:p-14 game-grid shadow-2xl">
        {/* Glow ambient effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#107C10]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2ee455]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#107C10]/20 border border-[#107C10]/60 text-[#2ee455] text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-[#2ee455] animate-pulse" />
              <span>Proyecto Escolar Oficial · Unidad 3</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Descubre tu próximo{' '}
              <span className="bg-gradient-to-r from-[#2ee455] via-emerald-300 to-[#107C10] bg-clip-text text-transparent">
                videojuego favorito
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Bienvenido a <span className="font-extrabold text-[#2ee455]">GameZone</span>, la plataforma diseñada para explorar los mejores títulos del catálogo mundial. Impulsada por un backend en <span className="text-white font-semibold">Node.js y Express</span> con consumo seguro de APIs externas y protección avanzada de datos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('catalog')}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#107C10] hover:bg-[#159a15] text-white font-black text-sm sm:text-base shadow-lg shadow-[#107C10]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                <span>Explorar Videojuegos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('register')}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#141922] text-zinc-200 hover:text-white font-bold text-sm sm:text-base border border-[#273241] hover:border-[#2ee455]/70 hover:bg-[#1a212d] transition-all cursor-pointer"
              >
                <UserPlus className="w-5 h-5 text-[#2ee455]" />
                <span>Crear Cuenta Segura</span>
              </button>

              <button
                onClick={() => onNavigate('security')}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-zinc-400 hover:text-[#2ee455] font-semibold text-xs sm:text-sm hover:bg-[#141820]/70 transition-all cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Auditoría de Seguridad</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#202733] max-w-lg">
              <div>
                <p className="text-2xl font-black text-[#2ee455]">100%</p>
                <p className="text-xs text-zinc-400">Backend Proxy API</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-400">Bcrypt</p>
                <p className="text-xs text-zinc-400">Hash de Contraseñas</p>
              </div>
              <div>
                <p className="text-2xl font-black text-lime-400">Helmet</p>
                <p className="text-xs text-zinc-400">Seguridad HTTP</p>
              </div>
            </div>
          </div>

          {/* Hero Featured Game Preview Card */}
          <div className="lg:col-span-5">
            {heroGame ? (
              <div
                onClick={() => onSelectGame(heroGame)}
                className="group relative rounded-2xl overflow-hidden border border-[#222b38] bg-[#12161f] shadow-2xl transition-all duration-300 hover:border-[#107C10] hover:shadow-2xl hover:shadow-[#107C10]/30 cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={heroGame.background_image}
                    alt={heroGame.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1218] via-[#0e1218]/40 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#107C10]/60 text-emerald-300 text-xs font-black">
                    <Star className="w-3.5 h-3.5 fill-[#2ee455] text-[#2ee455]" />
                    <span>{heroGame.rating.toFixed(1)} / 5</span>
                  </div>

                  {/* Metacritic Badge */}
                  {heroGame.metacritic && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#107C10] text-white text-xs font-black shadow-md">
                      META {heroGame.metacritic}
                    </div>
                  )}

                  {/* Bottom details */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1">
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#2ee455]">
                      Juego Destacado
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#2ee455] transition-colors">
                      {heroGame.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {heroGame.genres.slice(0, 3).map((g) => (
                        <span
                          key={g.id}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#18202b] text-zinc-300 border border-[#253040]"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#12161f] border-t border-[#1f2733] flex items-center justify-between text-xs text-zinc-400">
                  <span>Lanzamiento: {heroGame.released}</span>
                  <span className="text-[#2ee455] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Ver ficha completa &rarr;
                  </span>
                </div>
              </div>
            ) : (
              <div className="aspect-[16/10] rounded-2xl bg-[#141922] animate-pulse border border-[#222b38] flex items-center justify-center text-zinc-500 text-sm">
                Cargando juego destacado...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#2ee455] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Los más aclamados</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Juegos Populares de la Plataforma
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2ee455] hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <span>Ver catálogo completo ({featuredGames.length} juegos)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Popular games cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topPicks.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game)}
              className="group bg-[#12161e] rounded-2xl overflow-hidden border border-[#222b38] hover:border-[#107C10] hover:shadow-xl hover:shadow-[#107C10]/20 transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0f14]">
                <img
                  src={game.background_image}
                  alt={game.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12161e] via-transparent to-transparent" />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-emerald-300 flex items-center gap-1 border border-[#107C10]/50">
                  <Star className="w-3 h-3 fill-[#2ee455] text-[#2ee455]" />
                  <span>{game.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {game.genres.slice(0, 2).map((g) => (
                      <span
                        key={g.id}
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#18202b] text-[#2ee455] border border-[#273344]"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#2ee455] transition-colors line-clamp-1">
                    {game.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Lanzamiento: {game.released}
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full py-2 rounded-xl bg-[#1b222c] hover:bg-[#107C10] text-zinc-200 hover:text-white text-xs font-bold transition-all text-center cursor-pointer shadow-sm"
                >
                  Ver Información
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Unidad 3 Architecture & Learning Objectives */}
      <section className="rounded-3xl border border-[#222b38] bg-[#0f131a] p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black tracking-widest text-[#2ee455] uppercase">
            Demostración Pedagógica
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Tres Pilares de la Unidad 3 Implementados
          </h2>
          <p className="text-sm text-zinc-400">
            Esta plataforma implementa rigurosamente los estándares de ingeniería web solicitados para la evaluación con una estética moderna y funcional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pilar 1: Seguridad */}
          <div className="p-6 rounded-2xl bg-[#141922] border border-[#242e3d] space-y-4 hover:border-[#107C10] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#107C10]/20 border border-[#107C10]/50 flex items-center justify-center text-[#2ee455]">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Seguridad y Criptografía</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Las contraseñas de los usuarios jamás se guardan en texto plano. Se procesan con el algoritmo criptográfico <strong className="text-[#2ee455]">Bcrypt (costo 10)</strong>, y las cabeceras HTTP están blindadas mediante <strong className="text-[#2ee455]">Helmet</strong>.
            </p>
            <div className="text-[11px] font-mono text-[#2ee455] bg-[#0c1015] p-2 rounded-lg border border-[#1b2533]">
              POST /api/registro &rarr; bcrypt.hash()
            </div>
          </div>

          {/* Pilar 2: Web Services & REST */}
          <div className="p-6 rounded-2xl bg-[#141922] border border-[#242e3d] space-y-4 hover:border-[#107C10] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#107C10]/20 border border-[#107C10]/50 flex items-center justify-center text-[#2ee455]">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Web Services RESTful</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Servidor desacoplado en <strong className="text-[#2ee455]">Express</strong> con endpoints que devuelven JSON estándar y códigos HTTP semánticos (<code className="text-emerald-300">200</code>, <code className="text-emerald-300">201</code>, <code className="text-emerald-300">400</code>, <code className="text-emerald-300">409</code>, <code className="text-emerald-300">429</code>).
            </p>
            <div className="text-[11px] font-mono text-[#2ee455] bg-[#0c1015] p-2 rounded-lg border border-[#1b2533]">
              GET /api/estado | GET /api/juegos
            </div>
          </div>

          {/* Pilar 3: APIs Externas & .env */}
          <div className="p-6 rounded-2xl bg-[#141922] border border-[#242e3d] space-y-4 hover:border-[#107C10] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#107C10]/20 border border-[#107C10]/50 flex items-center justify-center text-[#2ee455]">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">3. API Externa & Secretos</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Consumo de la API de videojuegos RAWG mediante un <strong className="text-[#2ee455]">Backend Proxy</strong>. La clave secreta se gestiona con <code className="text-emerald-300">dotenv</code> y jamás se expone al cliente web.
            </p>
            <div className="text-[11px] font-mono text-[#2ee455] bg-[#0c1015] p-2 rounded-lg border border-[#1b2533]">
              .env privado &rarr; .gitignore &rarr; seguro
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Registration Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-[#107C10]/30 via-[#141a24] to-[#0f141c] border border-[#107C10]/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-[#107C10]/10">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            ¿Listo para poner a prueba el sistema?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300">
            Regístrate en GameZone y comprueba en vivo cómo viaja la petición segura al servidor Express.
          </p>
        </div>
        <button
          onClick={() => onNavigate('register')}
          className="px-6 py-3 rounded-xl bg-[#107C10] hover:bg-[#159a15] text-white font-black text-sm shadow-lg shadow-[#107C10]/40 transition-all shrink-0 cursor-pointer"
        >
          Ir al Formulario de Registro
        </button>
      </section>
    </div>
  );
};
