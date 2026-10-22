import React, { useState } from 'react';
import { BookOpen, Terminal, CheckCircle2, Laptop, FolderTree, Key, HelpCircle } from 'lucide-react';

export const DocsView: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#107C10]/20 border border-[#107C10]/60 text-[#2ee455] text-xs font-bold">
          <BookOpen className="w-4 h-4 text-[#2ee455]" />
          <span>Manual de Instalación & Guía de Exposición Escolar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Guía Completa de Instalación y Defensa
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
          Toda la documentación requerida para ejecutar el proyecto en Windows de forma local, explicar la arquitectura al profesor y verificar cada requisito de la Unidad 3 con la nueva interfaz.
        </p>
      </div>

      {/* Quick Steps Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0e1218] border border-[#222b38] space-y-2 hover:border-[#107C10] transition-colors">
          <div className="w-8 h-8 rounded-lg bg-[#107C10]/20 text-[#2ee455] font-black flex items-center justify-center text-sm border border-[#107C10]/60">
            1
          </div>
          <h3 className="font-bold text-white text-sm">Instalación Local</h3>
          <p className="text-xs text-zinc-400">Node.js LTS, comandos npm y puesta en marcha en Windows.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1218] border border-[#222b38] space-y-2 hover:border-[#107C10] transition-colors">
          <div className="w-8 h-8 rounded-lg bg-[#107C10]/20 text-[#2ee455] font-black flex items-center justify-center text-sm border border-[#107C10]/60">
            2
          </div>
          <h3 className="font-bold text-white text-sm">Configuración de .env</h3>
          <p className="text-xs text-zinc-400">Clave de RAWG, puerto 3000 y exclusión en .gitignore.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1218] border border-[#222b38] space-y-2 hover:border-[#107C10] transition-colors">
          <div className="w-8 h-8 rounded-lg bg-[#107C10]/20 text-[#2ee455] font-black flex items-center justify-center text-sm border border-[#107C10]/60">
            3
          </div>
          <h3 className="font-bold text-white text-sm">Pruebas de Web Services</h3>
          <p className="text-xs text-zinc-400">Endpoints REST con JSON y códigos HTTP apropiados.</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1218] border border-[#222b38] space-y-2 hover:border-[#107C10] transition-colors">
          <div className="w-8 h-8 rounded-lg bg-[#107C10]/20 text-[#2ee455] font-black flex items-center justify-center text-sm border border-[#107C10]/60">
            4
          </div>
          <h3 className="font-bold text-white text-sm">Lista de Cotejo Escolar</h3>
          <p className="text-xs text-zinc-400">Puntos a verificar frente al profesor para obtener 100.</p>
        </div>
      </div>

      {/* Sección 1: Programas y Requisitos */}
      <section className="rounded-3xl border border-[#222b38] bg-[#0e1218] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Laptop className="w-6 h-6 text-[#2ee455]" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            1. Programas Necesarios en tu Computadora (Windows / Mac / Linux)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-2">
            <h4 className="font-bold text-white text-sm">Node.js (Versión 18 o 20 LTS)</h4>
            <p className="text-zinc-400 leading-relaxed">
              Descárgalo de <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="text-[#2ee455] underline">nodejs.org</a>. Incluye el gestor de paquetes <strong>npm</strong> para instalar Express y dependencias.
            </p>
            <div className="p-2 bg-[#06080b] rounded font-mono text-[#2ee455]">
              node -v && npm -v
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-2">
            <h4 className="font-bold text-white text-sm">Editor de Código</h4>
            <p className="text-zinc-400 leading-relaxed">
              Recomendado: <strong>Visual Studio Code</strong>. Permite ver la estructura de carpetas, terminal integrada y editar archivos <code>.env</code> y <code>server.ts</code>.
            </p>
            <div className="p-2 bg-[#06080b] rounded font-mono text-[#2ee455]">
              code .
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-2">
            <h4 className="font-bold text-white text-sm">Navegador Web Moderno</h4>
            <p className="text-zinc-400 leading-relaxed">
              Google Chrome, Microsoft Edge o Firefox para visualizar la interfaz gráfica y abrir las herramientas de desarrollador (F12).
            </p>
            <div className="p-2 bg-[#06080b] rounded font-mono text-[#2ee455]">
              http://localhost:3000
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Estructura del Proyecto */}
      <section className="rounded-3xl border border-[#222b38] bg-[#0e1218] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <FolderTree className="w-6 h-6 text-[#2ee455]" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            2. Estructura de Carpetas del Proyecto
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          El código está estrictamente dividido en capas: configuración de entorno, backend con Express (servicios web y seguridad) y frontend reactivo con componentes modulares:
        </p>

        <div className="relative">
          <pre className="p-5 rounded-2xl bg-[#06080b] border border-[#1b2533] font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
{`gamezone/
├── .env.example          # Plantilla pública con nombres de variables (sin secretos)
├── .env                  # Variables privadas reales (ignorado por Git)
├── .gitignore            # Reglas de exclusión para no subir .env ni node_modules
├── package.json          # Dependencias (express, helmet, bcryptjs, dotenv, etc.)
├── server.ts             # Servidor Express: Endpoints REST, seguridad y proxy RAWG
├── tsconfig.json         # Configuración de TypeScript
├── vite.config.ts        # Configuración del bundler y plugins
├── index.html            # Punto de entrada HTML5 con metadatos y fuentes
└── src/
    ├── types.ts          # Interfaces de videojuegos, formularios y respuestas
    ├── index.css         # Estilos Tailwind CSS v4 y tema oscuro
    ├── main.tsx          # Renderizado inicial de la aplicación
    ├── App.tsx           # Componente raíz con enrutador y estado global
    └── components/
        ├── Navbar.tsx        # Logotipo, navegación y estado del servidor
        ├── HomeView.tsx      # Pantalla 1: Inicio ("Descubre tu próximo videojuego...")
        ├── RegisterView.tsx  # Pantalla 2: Formulario de registro con validaciones y Bcrypt
        ├── CatalogView.tsx   # Pantalla 3: Explorar videojuegos con buscador y filtros
        ├── GameDetailView.tsx# Pantalla 4: Ficha técnica y detalles del videojuego
        ├── SecurityView.tsx  # Pantalla 5: Consola de Web Services y auditoría U3
        ├── DocsView.tsx      # Guía escolar y manual de instalación en Windows
        └── Footer.tsx        # Pie de página con créditos académicos`}
          </pre>
          <button
            onClick={() => copyToClipboard(`gamezone/\n├── .env.example\n├── server.ts\n├── package.json\n└── src/`, 'tree')}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#141922] hover:bg-[#107C10] text-zinc-300 hover:text-white text-xs font-bold border border-[#263140] transition-colors cursor-pointer"
          >
            {copiedItem === 'tree' ? '¡Copiado!' : 'Copiar Estructura'}
          </button>
        </div>
      </section>

      {/* Sección 3: Paso a Paso para Ejecutar en Windows */}
      <section className="rounded-3xl border border-[#222b38] bg-[#0e1218] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-[#2ee455]" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            3. Paso a Paso para Instalar y Ejecutar en Windows
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Paso A */}
          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-2">
            <h4 className="font-bold text-[#2ee455] flex items-center gap-2">
              <span>Paso 1: Abrir Terminal (PowerShell o CMD) en la carpeta del proyecto</span>
            </h4>
            <p className="text-zinc-400 text-xs">
              Navega a la carpeta donde descomprimiste el proyecto GameZone:
            </p>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#06080b] font-mono text-xs text-white border border-[#1b2533]">
              <code>cd C:\Users\TuUsuario\Proyectos\gamezone</code>
              <button
                onClick={() => copyToClipboard('cd gamezone', 'cd_cmd')}
                className="text-zinc-400 hover:text-[#2ee455] text-xs cursor-pointer"
              >
                {copiedItem === 'cd_cmd' ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Paso B */}
          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-2">
            <h4 className="font-bold text-[#2ee455] flex items-center gap-2">
              <span>Paso 2: Instalar dependencias con npm</span>
            </h4>
            <p className="text-zinc-400 text-xs">
              Este comando descargará Express, Helmet, Bcryptjs, Dotenv y las librerías necesarias:
            </p>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#06080b] font-mono text-xs text-white border border-[#1b2533]">
              <code>npm install</code>
              <button
                onClick={() => copyToClipboard('npm install', 'npm_i')}
                className="text-zinc-400 hover:text-[#2ee455] text-xs cursor-pointer"
              >
                {copiedItem === 'npm_i' ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Paso C */}
          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-2">
            <h4 className="font-bold text-[#2ee455] flex items-center gap-2">
              <Key className="w-4 h-4 text-[#2ee455]" />
              <span>Paso 3: Configurar el archivo .env</span>
            </h4>
            <p className="text-zinc-400 text-xs">
              Crea un archivo llamado <code>.env</code> copiando el contenido de <code>.env.example</code>:
            </p>
            <div className="p-3 rounded-lg bg-[#06080b] font-mono text-xs text-[#2ee455] space-y-1 border border-[#1b2533]">
              <p>PORT=3000</p>
              <p>NODE_ENV=development</p>
              <p>RAWG_API_KEY=tu_clave_de_rawg_aqui</p>
            </div>
            <p className="text-[11px] text-zinc-400">
              * Nota: Para obtener tu clave gratuita de RAWG, regístrate en <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer" className="text-[#2ee455] underline">rawg.io/apidocs</a>. Si dejas el valor por defecto, GameZone usará automáticamente el catálogo seguro de respaldo sin interrumpir la demostración.
            </p>
          </div>

          {/* Paso D */}
          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-2">
            <h4 className="font-bold text-[#2ee455] flex items-center gap-2">
              <span>Paso 4: Iniciar el servidor Express y la aplicación</span>
            </h4>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#06080b] font-mono text-xs text-white border border-[#1b2533]">
              <code>npm run dev</code>
              <button
                onClick={() => copyToClipboard('npm run dev', 'npm_dev')}
                className="text-zinc-400 hover:text-[#2ee455] text-xs cursor-pointer"
              >
                {copiedItem === 'npm_dev' ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Paso E */}
          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-2">
            <h4 className="font-bold text-[#2ee455] flex items-center gap-2">
              <span>Paso 5: Abrir en el navegador</span>
            </h4>
            <p className="text-zinc-400 text-xs">Abre tu navegador en la siguiente dirección local:</p>
            <div className="p-3 rounded-lg bg-[#06080b] font-mono text-xs text-[#2ee455] font-black border border-[#1b2533]">
              http://localhost:3000
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: Solución de Errores Comunes */}
      <section className="rounded-3xl border border-[#222b38] bg-[#0e1218] p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            4. Solución de Problemas Comunes en Windows
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-1">
            <h4 className="font-bold text-amber-400">Error: "EADDRINUSE: address already in use :::3000"</h4>
            <p className="text-zinc-400">
              Significa que otra aplicación está usando el puerto 3000. Puedes cambiar el puerto en tu archivo <code>.env</code> estableciendo <code>PORT=3001</code> o detener el proceso anterior en Windows con:
            </p>
            <code className="block p-2 bg-[#06080b] text-zinc-300 rounded font-mono border border-[#1b2533]">
              npx kill-port 3000
            </code>
          </div>

          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-1">
            <h4 className="font-bold text-amber-400">Error: "Cannot find module 'express' o 'bcryptjs'"</h4>
            <p className="text-zinc-400">
              No se han descargado las carpetas de <code>node_modules</code>. Ejecuta <code>npm install</code> en la raíz del proyecto para descargar todas las dependencias listadas en <code>package.json</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#131720] border border-[#222b38] space-y-1">
            <h4 className="font-bold text-amber-400">¿Cómo comprobar que .env no se subirá a GitHub?</h4>
            <p className="text-zinc-400">
              Abre la terminal y ejecuta <code>git status</code>. Observarás que el archivo <code>.env</code> no aparece en los archivos modificados ni rastreados, porque la regla <code>.env*</code> en <code>.gitignore</code> lo protege automáticamente.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 5: Lista de Cotejo para la Exposición Escolar */}
      <section className="rounded-3xl border border-[#107C10]/50 bg-[#0c1a10] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#2ee455]" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            5. Lista de Verificación para la Evaluación Escolar (100% Requisitos)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#09140c] border border-[#107C10]/40">
            <CheckCircle2 className="w-4 h-4 text-[#2ee455] shrink-0 mt-0.5" />
            <span className="text-zinc-200">Pantalla 1 (Inicio): Logotipo, hero "Descubre tu próximo videojuego favorito", juegos populares y CTAs.</span>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#09140c] border border-[#107C10]/40">
            <CheckCircle2 className="w-4 h-4 text-[#2ee455] shrink-0 mt-0.5" />
            <span className="text-zinc-200">Pantalla 2 (Registro): 6 campos requeridos, validaciones en tiempo real y hash seguro con Bcrypt.</span>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#09140c] border border-[#107C10]/40">
            <CheckCircle2 className="w-4 h-4 text-[#2ee455] shrink-0 mt-0.5" />
            <span className="text-zinc-200">Pantalla 3 (Catálogo): Tarjetas de videojuegos, buscador, filtro por categoría y ordenación.</span>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#09140c] border border-[#107C10]/40">
            <CheckCircle2 className="w-4 h-4 text-[#2ee455] shrink-0 mt-0.5" />
            <span className="text-zinc-200">Pantalla 4 (Detalles): Descripción completa, plataformas, calificación y botón para volver.</span>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#09140c] border border-[#107C10]/40">
            <CheckCircle2 className="w-4 h-4 text-[#2ee455] shrink-0 mt-0.5" />
            <span className="text-zinc-200">Seguridad: Helmet activo, .env protegido, Bcrypt saltRounds=10, Rate Limiting y cero claves en frontend.</span>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#09140c] border border-[#107C10]/40">
            <CheckCircle2 className="w-4 h-4 text-[#2ee455] shrink-0 mt-0.5" />
            <span className="text-zinc-200">Web Services: Endpoints /api/estado, /api/juegos, /api/juegos/:id y /api/registro funcionales con JSON.</span>
          </div>
        </div>
      </section>
    </div>
  );
};
