import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Calendar, Monitor, RefreshCw, Layers, Gamepad } from 'lucide-react';
import { GameItem } from '../types';

interface CatalogViewProps {
  games: GameItem[];
  loading: boolean;
  onSelectGame: (game: GameItem) => void;
  onRefresh: () => void;
  apiDataSource: string;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  games,
  loading,
  onSelectGame,
  onRefresh,
  apiDataSource,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'released'>('rating');

  // Géneros disponibles para filtrar
  const genres = [
    { id: 'all', label: 'Todos los Géneros' },
    { id: 'action', label: 'Acción' },
    { id: 'role-playing-games-rpg', label: 'RPG' },
    { id: 'adventure', label: 'Aventura' },
    { id: 'shooter', label: 'Shooter' },
    { id: 'indie', label: 'Indie' },
    { id: 'puzzle', label: 'Puzle' },
    { id: 'racing', label: 'Carreras' },
  ];

  // Filtrado y ordenación en el cliente
  const filteredGames = useMemo(() => {
    let result = games.filter((game) => {
      const matchName = game.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGenre =
        selectedGenre === 'all' ||
        game.genres.some(
          (g) =>
            g.slug.toLowerCase().includes(selectedGenre) ||
            g.name.toLowerCase().includes(selectedGenre)
        );
      return matchName && matchGenre;
    });

    // Ordenación
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'released') {
        return new Date(b.released || 0).getTime() - new Date(a.released || 0).getTime();
      }
      return 0;
    });

    return result;
  }, [games, searchTerm, selectedGenre, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#222b38] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#107C10]/20 border border-[#107C10]/60 text-[#2ee455] text-xs font-bold mb-2">
            <CompassIcon className="w-3.5 h-3.5 text-[#2ee455]" />
            <span>Pantalla 3 · Catálogo de Videojuegos</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Explora el Catálogo de GameZone
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Datos reales consultados a través del servicio web <code className="text-[#2ee455] font-mono">GET /api/juegos</code>
          </p>
        </div>

        {/* API Origin & Refresh Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] text-zinc-400">Origen de los datos:</p>
            <p className="text-xs font-bold text-[#2ee455]">{apiDataSource || 'Servidor Node.js Express'}</p>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#141922] hover:bg-[#1b222e] text-zinc-300 hover:text-white border border-[#263140] transition-colors disabled:opacity-50 cursor-pointer"
            title="Refrescar catálogo"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#2ee455]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4 bg-[#0e1218] p-4 sm:p-5 rounded-2xl border border-[#222b38]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Buscador */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar videojuego por título o género..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#131720] border border-[#222b38] text-white text-sm focus:outline-none focus:border-[#107C10] transition-all placeholder:text-zinc-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-zinc-500 hover:text-white cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Selector de Género */}
          <div className="md:col-span-3">
            <div className="relative">
              <Filter className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-[#131720] border border-[#222b38] text-white text-sm focus:outline-none focus:border-[#107C10] transition-all appearance-none cursor-pointer"
              >
                {genres.map((g) => (
                  <option key={g.id} value={g.id} className="bg-[#131720] text-white">
                    {g.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                ▼
              </div>
            </div>
          </div>

          {/* Selector de Ordenación */}
          <div className="md:col-span-3">
            <div className="relative">
              <Layers className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-[#131720] border border-[#222b38] text-white text-sm focus:outline-none focus:border-[#107C10] transition-all appearance-none cursor-pointer"
              >
                <option value="rating" className="bg-[#131720] text-white">Mejor Calificados ★</option>
                <option value="name" className="bg-[#131720] text-white">Nombre (A - Z)</option>
                <option value="released" className="bg-[#131720] text-white">Fecha de Lanzamiento</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Quick Genre Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="text-zinc-400 text-[11px] font-bold uppercase mr-1">Filtros rápidos:</span>
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGenre(g.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all font-semibold cursor-pointer ${
                selectedGenre === g.id
                  ? 'bg-[#107C10] text-white font-black shadow-md shadow-[#107C10]/40'
                  : 'bg-[#18202b] text-zinc-300 hover:bg-[#202936] hover:text-white'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>
          Mostrando <strong className="text-white">{filteredGames.length}</strong> videojuegos
          {searchTerm && <span> para "{searchTerm}"</span>}
          {selectedGenre !== 'all' && <span> en categoría seleccionada</span>}
        </span>
        {(searchTerm || selectedGenre !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('all');
            }}
            className="text-[#2ee455] hover:underline cursor-pointer"
          >
            Restablecer filtros
          </button>
        )}
      </div>

      {/* Games Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-[#12161e] rounded-2xl p-4 border border-[#222b38] space-y-3 animate-pulse">
              <div className="aspect-[16/10] bg-[#1a212d] rounded-xl" />
              <div className="h-4 bg-[#1a212d] rounded w-3/4" />
              <div className="h-3 bg-[#1a212d] rounded w-1/2" />
              <div className="h-8 bg-[#1a212d] rounded w-full mt-4" />
            </div>
          ))}
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="text-center py-16 bg-[#0e1218] rounded-3xl border border-[#222b38] p-8 space-y-4">
          <Gamepad className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No se encontraron videojuegos</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            No encontramos ningún título que coincida con tus criterios de búsqueda. Prueba modificando los filtros o el texto.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGenre('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#107C10] hover:bg-[#159a15] text-white font-bold text-xs cursor-pointer shadow-md shadow-[#107C10]/30"
          >
            Ver todos los juegos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="group bg-[#12161e] rounded-2xl overflow-hidden border border-[#222b38] hover:border-[#107C10] hover:shadow-2xl hover:shadow-[#107C10]/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Cover Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0f14]">
                <img
                  src={game.background_image}
                  alt={game.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12161e] via-transparent to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#107C10]/60 text-emerald-300 text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-[#2ee455] text-[#2ee455]" />
                  <span>{game.rating ? game.rating.toFixed(1) : 'S/C'}</span>
                </div>

                {/* Metacritic Badge */}
                {game.metacritic && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#107C10] text-white text-[10px] font-black shadow-md">
                    {game.metacritic} META
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Genres */}
                  <div className="flex flex-wrap gap-1">
                    {game.genres.slice(0, 3).map((g) => (
                      <span
                        key={g.id}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#18202b] text-[#2ee455] border border-[#273344]"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#2ee455] transition-colors line-clamp-1">
                    {game.name}
                  </h3>

                  {/* Release Date & Platform Count */}
                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{game.released}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                      <Monitor className="w-3.5 h-3.5" />
                      <span>{game.platforms?.length || 1} platf.</span>
                    </div>
                  </div>
                </div>

                {/* Consultar Información Button */}
                <button
                  type="button"
                  onClick={() => onSelectGame(game)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1b222c] hover:bg-[#107C10] text-zinc-200 hover:text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Consultar Más Información</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
