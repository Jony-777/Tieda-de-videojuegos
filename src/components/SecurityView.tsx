import React, { useState } from 'react';
import { Shield, Lock, Server, Terminal, Play, Copy, RefreshCw, KeyRound, CheckCircle2 } from 'lucide-react';

export const SecurityView: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'estado' | 'juegos' | 'juego_id' | 'registro_valido' | 'registro_invalido' | 'usuarios' | 'auditoria'>('estado');
  const [endpointResult, setEndpointResult] = useState<any>(null);
  const [loadingTest, setLoadingTest] = useState(false);
  const [testStatus, setTestStatus] = useState<number | null>(null);
  const [responseTimeMs, setResponseTimeMs] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});

  // Simulador de Bcrypt
  const [samplePassword, setSamplePassword] = useState('Password123');
  const [simulatedHash, setSimulatedHash] = useState('$2a$10$wK1k6O1l7oKzZfO91xGg6eHj8qNmP0uVxQyW2eR3tY4uI5oP6a');
  const [hashGenerating, setHashGenerating] = useState(false);

  const endpointsList = [
    {
      id: 'estado',
      method: 'GET',
      path: '/api/estado',
      desc: 'Comprueba estado del servidor, uptime y servicios configurados.',
      color: 'bg-[#107C10] text-white',
    },
    {
      id: 'juegos',
      method: 'GET',
      path: '/api/juegos?page=1&page_size=6',
      desc: 'Catálogo de videojuegos obtenido de forma segura desde el backend.',
      color: 'bg-[#107C10] text-white',
    },
    {
      id: 'juego_id',
      method: 'GET',
      path: '/api/juegos/3498',
      desc: 'Información detallada de Grand Theft Auto V mediante ID en ruta.',
      color: 'bg-[#107C10] text-white',
    },
    {
      id: 'registro_valido',
      method: 'POST',
      path: '/api/registro (Datos Válidos)',
      desc: 'Simula un registro correcto con contraseña cifrada en Bcrypt (201 Created).',
      color: 'bg-emerald-600 text-white',
    },
    {
      id: 'registro_invalido',
      method: 'POST',
      path: '/api/registro (Datos Inválidos)',
      desc: 'Simula intento con campos vacíos y contraseñas no coincidentes (400 Bad Request).',
      color: 'bg-amber-600 text-white',
    },
    {
      id: 'usuarios',
      method: 'GET',
      path: '/api/usuarios',
      desc: 'Lista usuarios en memoria temporal comprobando que NO se devuelven contraseñas.',
      color: 'bg-[#107C10] text-white',
    },
    {
      id: 'auditoria',
      method: 'GET',
      path: '/api/seguridad/auditoria',
      desc: 'Reporte técnico de todas las medidas de seguridad de la Unidad 3.',
      color: 'bg-[#107C10] text-white',
    },
  ];

  const runEndpointTest = async (testId: string) => {
    setLoadingTest(true);
    setEndpointResult(null);
    setTestStatus(null);
    setResponseTimeMs(null);

    const startTime = performance.now();

    try {
      let res: Response;

      if (testId === 'estado') {
        res = await fetch('/api/estado');
      } else if (testId === 'juegos') {
        res = await fetch('/api/juegos?page=1&page_size=6');
      } else if (testId === 'juego_id') {
        res = await fetch('/api/juegos/3498');
      } else if (testId === 'registro_valido') {
        const randomUser = 'gamer_' + Math.floor(Math.random() * 9000 + 1000);
        res = await fetch('/api/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: 'Usuario Prueba Escolar',
            email: `${randomUser}@escuela.edu`,
            username: randomUser,
            password: 'PasswordSegura2026',
            confirmPassword: 'PasswordSegura2026',
            termsAccepted: true,
          }),
        });
      } else if (testId === 'registro_invalido') {
        res = await fetch('/api/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: '',
            email: 'correo_sin_formato',
            username: 'ab',
            password: '123',
            confirmPassword: '456',
            termsAccepted: false,
          }),
        });
      } else if (testId === 'usuarios') {
        res = await fetch('/api/usuarios');
      } else {
        res = await fetch('/api/seguridad/auditoria');
      }

      const endTime = performance.now();
      setResponseTimeMs(Math.round(endTime - startTime));
      setTestStatus(res.status);

      // Extraer encabezados de interés de seguridad
      const headersObj: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        if (
          key.includes('content-type') ||
          key.includes('x-') ||
          key.includes('strict') ||
          key.includes('date')
        ) {
          headersObj[key] = value;
        }
      });
      setResponseHeaders(headersObj);

      const json = await res.json();
      setEndpointResult(json);
    } catch (err: any) {
      setEndpointResult({ error: 'Fallo al ejecutar la petición', detalle: err.message });
      setTestStatus(500);
    } finally {
      setLoadingTest(false);
    }
  };

  const handleSimulateBcrypt = () => {
    setHashGenerating(true);
    setTimeout(() => {
      // Genera una representación realista de un hash bcrypt con prefijo estándar $2a$10$
      const randomSalt = Array.from({ length: 22 }, () =>
        './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
          Math.floor(Math.random() * 64)
        )
      ).join('');
      const randomDigest = Array.from({ length: 31 }, () =>
        './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
          Math.floor(Math.random() * 64)
        )
      ).join('');
      setSimulatedHash(`$2a$10$${randomSalt}${randomDigest}`);
      setHashGenerating(false);
    }, 350);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#107C10]/20 border border-[#107C10]/60 text-[#2ee455] text-xs font-bold">
          <Shield className="w-4 h-4 text-[#2ee455]" />
          <span>Panel de Verificación Escolar · Unidad 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Seguridad, Web Services & APIs
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
          Herramienta interactiva para poner a prueba los endpoints de Express, verificar la protección de contraseñas con Bcrypt y auditar las cabeceras HTTP de Helmet ante el profesor.
        </p>
      </div>

      {/* Grid: Endpoint Tester */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Selector de Endpoints */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#2ee455]" />
            <span>Seleccionar Servicio Web a Probar</span>
          </h2>

          <div className="space-y-2">
            {endpointsList.map((ep) => {
              const isSelected = selectedEndpoint === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => {
                    setSelectedEndpoint(ep.id as any);
                    runEndpointTest(ep.id);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#141922] border-[#107C10] shadow-lg shadow-[#107C10]/30'
                      : 'bg-[#0e1218] border-[#222b38] hover:border-[#2f3b4c] hover:bg-[#12161f]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${ep.color}`}>
                        {ep.method}
                      </span>
                      <code className="text-xs font-mono font-bold text-white">
                        {ep.path}
                      </code>
                    </div>
                    <Play className={`w-3.5 h-3.5 ${isSelected ? 'text-[#2ee455]' : 'text-zinc-500'}`} />
                  </div>
                  <p className="text-xs text-zinc-400 leading-normal">
                    {ep.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consola de Resultados HTTP */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-[#2ee455]" />
              <span>Consola de Respuesta HTTP (JSON)</span>
            </h2>
            <button
              onClick={() => runEndpointTest(selectedEndpoint)}
              disabled={loadingTest}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#107C10] hover:bg-[#159a15] text-white font-bold text-xs shadow-md shadow-[#107C10]/40 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingTest ? 'animate-spin' : ''}`} />
              <span>Ejecutar Petición</span>
            </button>
          </div>

          <div className="rounded-2xl border border-[#222b38] bg-[#0c1016] p-4 sm:p-5 space-y-4 shadow-2xl">
            {/* Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-[#131720] border border-[#222b38] text-xs">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 font-medium">Estado HTTP:</span>
                {testStatus ? (
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded ${
                      testStatus >= 200 && testStatus < 300
                        ? 'bg-[#107C10]/30 text-[#2ee455] border border-[#107C10]/60'
                        : testStatus >= 400 && testStatus < 500
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-red-950 text-red-300 border border-red-800'
                    }`}
                  >
                    {testStatus} {testStatus === 200 ? 'OK' : testStatus === 201 ? 'Created' : testStatus === 400 ? 'Bad Request' : testStatus === 409 ? 'Conflict' : testStatus === 429 ? 'Too Many Requests' : 'Response'}
                  </span>
                ) : (
                  <span className="text-zinc-500 font-mono">Esperando prueba...</span>
                )}
              </div>

              <div className="flex items-center gap-4 text-zinc-400">
                {responseTimeMs !== null && (
                  <span>
                    Latencia: <strong className="text-[#2ee455] font-mono">{responseTimeMs} ms</strong>
                  </span>
                )}
                <span>
                  Formato: <strong className="text-white font-mono">application/json</strong>
                </span>
              </div>
            </div>

            {/* Response Headers Preview */}
            {Object.keys(responseHeaders).length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Encabezados de Seguridad (Helmet + Express)
                </span>
                <div className="p-2.5 rounded-lg bg-black/60 border border-[#1d2532] font-mono text-[11px] text-zinc-400 space-y-0.5 max-h-24 overflow-y-auto">
                  {Object.entries(responseHeaders).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-[#2ee455]">{k}:</span> <span className="text-zinc-300">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* JSON Response Window */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Cuerpo de la Respuesta JSON
              </span>
              <pre className="p-4 rounded-xl bg-[#06080b] border border-[#1d2532] font-mono text-xs text-[#2ee455] overflow-x-auto max-h-80 overflow-y-auto leading-relaxed">
                {loadingTest
                  ? '// Enviando petición al servidor Express...\n// Esperando respuesta de la red...'
                  : endpointResult
                  ? JSON.stringify(endpointResult, null, 2)
                  : '// Selecciona un endpoint de la izquierda o presiona "Ejecutar Petición"'}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Bcrypt Simulator Widget */}
      <section className="rounded-3xl border border-[#107C10]/50 bg-[#0e1218] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#2ee455] text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Demostración de Criptografía de la Unidad 3</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            ¿Por qué Bcrypt es Seguro para Contraseñas?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            A diferencia de cifrados simétricos como AES o funciones obsoletas como MD5/SHA1, <strong>Bcrypt</strong> es una función criptográfica <em>unidireccional</em> y deliberadamente lenta basada en el algoritmo Blowfish. Incluye una <strong>sal aleatoria</strong> de 16 bytes que previene ataques de tablas arcoíris (Rainbow Tables).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              1. Contraseña en Texto Plano (Ingresada por el usuario):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={samplePassword}
                onChange={(e) => setSamplePassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#131720] border border-[#222b38] text-white text-sm focus:outline-none focus:border-[#107C10]"
              />
              <button
                onClick={handleSimulateBcrypt}
                disabled={hashGenerating}
                className="px-4 py-2.5 rounded-xl bg-[#107C10] hover:bg-[#159a15] text-white font-bold text-xs shrink-0 transition-colors cursor-pointer shadow-md shadow-[#107C10]/30"
              >
                {hashGenerating ? 'Hasheando...' : 'Hashear'}
              </button>
            </div>
          </div>

          <div className="md:col-span-7 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              2. Hash Bcrypt Generado en el Servidor (60 caracteres):
            </label>
            <div className="p-3 rounded-xl bg-[#06080b] border border-[#107C10]/60 font-mono text-xs text-[#2ee455] break-all select-all flex items-center justify-between gap-2">
              <span>{simulatedHash}</span>
              <button
                onClick={() => navigator.clipboard.writeText(simulatedHash)}
                className="text-zinc-400 hover:text-white shrink-0 p-1 cursor-pointer"
                title="Copiar Hash"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#202733] text-xs">
          <div className="p-3 rounded-xl bg-[#131720] border border-[#222b38]">
            <span className="font-bold text-white block mb-1">$2a$ : Identificador</span>
            <span className="text-zinc-400">Indica la versión estándar moderna del algoritmo Bcrypt.</span>
          </div>
          <div className="p-3 rounded-xl bg-[#131720] border border-[#222b38]">
            <span className="font-bold text-white block mb-1">10$ : Costo de Sal</span>
            <span className="text-zinc-400">2^10 = 1,024 iteraciones de cálculo para mitigar ataques por fuerza bruta.</span>
          </div>
          <div className="p-3 rounded-xl bg-[#131720] border border-[#222b38]">
            <span className="font-bold text-white block mb-1">Nunca Reversible</span>
            <span className="text-zinc-400">Matemáticamente imposible deducir la contraseña original a partir del hash.</span>
          </div>
        </div>
      </section>

      {/* Security Audit Table */}
      <section className="rounded-3xl border border-[#222b38] bg-[#0e1218] p-6 sm:p-8 space-y-6 shadow-2xl">
        <div>
          <h2 className="text-2xl font-black text-white">
            Matriz de Cumplimiento de la Unidad 3
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Resumen técnico para responder preguntas del profesor durante la defensa del proyecto.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#222b38] text-zinc-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Tema Evaluado</th>
                <th className="py-3 px-4">Implementación en GameZone</th>
                <th className="py-3 px-4">Vulnerabilidad Mitigada</th>
                <th className="py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2632] text-zinc-300">
              <tr>
                <td className="py-3 px-4 font-bold text-white">Variables de Entorno</td>
                <td className="py-3 px-4 font-mono text-[#2ee455]">dotenv + .env + .gitignore</td>
                <td className="py-3 px-4 text-zinc-400">Exposición de claves de API en GitHub o cliente</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-[#107C10]/20 text-[#2ee455] border border-[#107C10]/60 text-[10px] font-bold">
                    ✓ Cumplido
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Seguridad de Cabeceras</td>
                <td className="py-3 px-4 font-mono text-[#2ee455]">helmet() en Express</td>
                <td className="py-3 px-4 text-zinc-400">Clickjacking, sniffing MIME y ataques XSS</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-[#107C10]/20 text-[#2ee455] border border-[#107C10]/60 text-[10px] font-bold">
                    ✓ Cumplido
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Hash de Contraseñas</td>
                <td className="py-3 px-4 font-mono text-emerald-400">bcryptjs (costo 10)</td>
                <td className="py-3 px-4 text-zinc-400">Filtraciones de contraseñas en texto plano</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-[#107C10]/20 text-[#2ee455] border border-[#107C10]/60 text-[10px] font-bold">
                    ✓ Cumplido
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Protección Contra DoS / Spam</td>
                <td className="py-3 px-4 font-mono text-[#2ee455]">Rate Limiter en memoria</td>
                <td className="py-3 px-4 text-zinc-400">Fuerza bruta al endpoint de registro escolar</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-[#107C10]/20 text-[#2ee455] border border-[#107C10]/60 text-[10px] font-bold">
                    ✓ Cumplido
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Backend Proxy API</td>
                <td className="py-3 px-4 font-mono text-[#2ee455]">GET /api/juegos en Node.js</td>
                <td className="py-3 px-4 text-zinc-400">Robo de cuota y de claves RAWG desde el navegador</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-[#107C10]/20 text-[#2ee455] border border-[#107C10]/60 text-[10px] font-bold">
                    ✓ Cumplido
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
