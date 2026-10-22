import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Calendar, Monitor, Globe, Building2, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { GameItem } from '../types';

interface GameDetailViewProps {
  game: GameItem;
  onBack: () => void;
}

export const GameDetailView: React.FC<GameDetailViewProps> = ({ game, onBack }) => {
  const [detailData, setDetailData] = useState<GameItem>(game);
  const [loading, setLoading] = useState(false);
  const [rawJsonResponse, setRawJsonResponse] = useState<any>(null);
  const [showJsonInspector, setShowJsonInspector] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Al montar la pantalla de detalles, consultar el endpoint específico GET /api/juegos/:id
    const fetchGameDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/juegos/${game.id}`);
        const data = await response.json();
        setRawJsonResponse(data);
        if (data.success && data.juego) {
          setDetailData(data.juego);
        }
      } catch (err) {
        console.error('Error al obtener detalles del videojuego:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [game.id]);

  const copyJsonToClipboard = () => {
    if (rawJsonResponse) {
      navigator.clipboard.writeText(JSON.stringify(rawJsonResponse, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Botón de Regreso */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141922] hover:bg-[#107C10] text-zinc-200 hover:text-white font-bold text-xs sm:text-sm transition-all border border-[#263140] cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Regresar al Catálogo de Videojuegos</span>
        </button>

        {/* Toggle Inspector de API para Unidad 3 */}
        <button
          onClick={() => setShowJsonInspector(!showJsonInspector)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#107C10]/20 hover:bg-[#107C10]/30 border border-[#107C10]/60 text-[#2ee455] text-xs font-bold transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{showJsonInspector ? 'Ocultar JSON API' : 'Ver JSON GET /api/juegos/:id'}</span>
        </button>
      </div>

      {/* JSON Inspector Modal/Box */}
      {showJsonInspector && (
        <div className="rounded-2xl bg-[#0a0d11] border border-[#107C10]/60 p-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#107C10] text-white font-black">GET</span>
              <code className="text-[#2ee455] font-mono">/api/juegos/{game.id}</code>
              <span className="text-zinc-400">· Demostración de Web Service escolar</span>
            </div>
            <button
              onClick={copyJsonToClipboard}
              className="px-2.5 py-1 rounded bg-[#161d27] hover:bg-[#202936] text-zinc-300 text-[11px] font-medium transition-colors cursor-pointer"
            >
              {copySuccess ? '¡Copiado!' : 'Copiar JSON'}
            </button>
          </div>
          <pre className="max-h-64 overflow-y-auto p-4 rounded-xl bg-[#06080b] text-[#2ee455] font-mono text-[11px] leading-relaxed border border-[#1b2533]">
            {JSON.stringify(rawJsonResponse || { estado: 'Cargando respuesta...' }, null, 2)}
          </pre>
        </div>
      )}

      {/* Main Game Banner Container */}
      <div className="relative rounded-3xl overflow-hidden border border-[#222b38] bg-[#0e1218] shadow-2xl">
        <div className="relative h-64 sm:h-96 w-full overflow-hidden">
          <img
            src={detailData.background_image}
            alt={detailData.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1218] via-[#0e1218]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1218] via-transparent to-transparent" />

          {/* Badges on banner */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap gap-2">
                {detailData.genres.map((g) => (
                  <span
                    key={g.id}
                    className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#107C10]/30 text-[#2ee455] border border-[#107C10]/60"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {detailData.name}
              </h1>
            </div>

            {/* Ratings & Score */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-[#107C10]/60 text-emerald-300">
                <Star className="w-5 h-5 fill-[#2ee455] text-[#2ee455]" />
                <div className="text-right">
                  <span className="text-lg font-black">{detailData.rating ? detailData.rating.toFixed(1) : 'S/C'}</span>
                  <span className="text-[10px] text-zinc-400 block -mt-1">/ 5.0 Estrellas</span>
                </div>
              </div>

              {detailData.metacritic && (
                <div className="px-4 py-2 rounded-xl bg-[#107C10] backdrop-blur-md text-white text-center shadow-lg shadow-[#107C10]/30">
                  <span className="text-lg font-black">{detailData.metacritic}</span>
                  <span className="text-[10px] text-zinc-200 block -mt-1 font-bold">METACRITIC</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Details Grid */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Description & Media */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#2ee455]" />
                <span>Descripción del Videojuego</span>
              </h2>
              <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  {detailData.description_raw ||
                    'Este título es reconocido en la comunidad gamer por sus mecánicas inmersivas, diseño de niveles y experiencia interactiva de alta fidelidad.'}
                </p>
              </div>
            </div>

            {/* Plataformas Disponibles */}
            <div className="space-y-4 pt-4 border-t border-[#202733]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#2ee455]" />
                <span>Plataformas Compatibles</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {detailData.platforms && detailData.platforms.length > 0 ? (
                  detailData.platforms.map((p, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-[#131720] border border-[#222b38] text-zinc-300 text-xs font-semibold flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2ee455]" />
                      <span>{p.platform?.name || 'Plataforma'}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-zinc-500">PC, PlayStation, Switch</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Meta Information Sidebar */}
          <div className="lg:col-span-4 space-y-6 bg-[#131720] p-6 rounded-2xl border border-[#222b38] h-fit">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-300 border-b border-[#222b38] pb-3">
              Ficha Técnica
            </h3>

            <div className="space-y-4 text-xs">
              {/* Fecha de lanzamiento */}
              <div>
                <p className="text-zinc-400 mb-1 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Fecha de Lanzamiento</span>
                </p>
                <p className="font-bold text-white text-sm">
                  {detailData.released || 'No especificada'}
                </p>
              </div>

              {/* Desarrollador */}
              <div>
                <p className="text-zinc-400 mb-1 flex items-center gap-1.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Desarrollador / Estudio</span>
                </p>
                <p className="font-bold text-white text-sm">
                  {detailData.developers && detailData.developers.length > 0
                    ? detailData.developers.map((d) => d.name).join(', ')
                    :                     'Estudio del juego'}                </p>
              </div>

              {/* Distribuidor / Publisher */}
              <div>
                <p className="text-zinc-400 mb-1 flex items-center gap-1.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Distribuidor (Publisher)</span>
                </p>
                <p className="font-bold text-white text-sm">
                  {detailData.publishers && detailData.publishers.length > 0
                    ? detailData.publishers.map((p) => p.name).join(', ')
                    : 'Publicadora Oficial'}
                </p>
              </div>

              {/* Sitio web oficial si existe */}
              {detailData.website && (
                <div className="pt-2">
                  <a
                    href={detailData.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[#2ee455] hover:text-emerald-300 font-bold underline text-xs"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Visitar Sitio Web Oficial</span>
                  </a>
                </div>
              )}
            </div>

            {/* Academic verification badge */}
            <div className="pt-4 border-t border-[#222b38] space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-[#2ee455] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Datos validados por Web Service</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-normal">
                Este detalle se solicitó a través del endpoint dinámico con parámetro de ruta <code className="text-zinc-400">/api/juegos/:id</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
