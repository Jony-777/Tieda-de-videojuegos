/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { RegisterView } from './components/RegisterView';
import { CatalogView } from './components/CatalogView';
import { GameDetailView } from './components/GameDetailView';
import { SecurityView } from './components/SecurityView';
import { DocsView } from './components/DocsView';
import { Footer } from './components/Footer';
import { GameItem, GamesApiResponse } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [games, setGames] = useState<GameItem[]>([]);
  const [loadingGames, setLoadingGames] = useState<boolean>(true);
  const [apiDataSource, setApiDataSource] = useState<string>('');
  const [serverOnline, setServerOnline] = useState<boolean>(false);

  // 1. Comprobar salud del servidor Express
  const checkServerHealth = async () => {
    try {
      const res = await fetch('/api/estado');
      if (res.ok) {
        setServerOnline(true);
      } else {
        setServerOnline(false);
      }
    } catch {
      setServerOnline(false);
    }
  };

  // 2. Obtener el catálogo inicial de videojuegos mediante el Web Service
  const fetchGames = async () => {
    setLoadingGames(true);
    try {
      const res = await fetch('/api/juegos?page=1&page_size=20');
      const data: GamesApiResponse = await res.json();
      if (data.success && Array.isArray(data.juegos)) {
        setGames(data.juegos);
        setApiDataSource(data.origenDatos || 'Servidor Express');
      }
    } catch (err) {
      console.error('Error al consultar /api/juegos:', err);
    } finally {
      setLoadingGames(false);
    }
  };

  useEffect(() => {
    checkServerHealth();
    fetchGames();
    const interval = setInterval(checkServerHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectGame = (game: GameItem) => {
    setSelectedGame(game);
    setCurrentTab('detail');
  };

  const handleBackToCatalog = () => {
    setSelectedGame(null);
    setCurrentTab('catalog');
  };

  const handleNavigate = (tab: string) => {
    if (tab !== 'detail') {
      setSelectedGame(null);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090c0f] text-slate-100 flex flex-col font-sans selection:bg-[#107C10] selection:text-white">
      {/* Barra de Navegación Principal */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleNavigate}
        serverOnline={serverOnline}
      />

      {/* Contenido Principal según la pantalla activa */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectGame={handleSelectGame}
            featuredGames={games}
            loading={loadingGames}
          />
        )}

        {currentTab === 'catalog' && (
          <CatalogView
            games={games}
            loading={loadingGames}
            onSelectGame={handleSelectGame}
            onRefresh={fetchGames}
            apiDataSource={apiDataSource}
          />
        )}

        {currentTab === 'register' && <RegisterView />}

        {currentTab === 'detail' && selectedGame && (
          <GameDetailView
            game={selectedGame}
            onBack={handleBackToCatalog}
          />
        )}

        {currentTab === 'security' && <SecurityView />}

        {currentTab === 'docs' && <DocsView />}
      </main>

      {/* Pie de Página */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
