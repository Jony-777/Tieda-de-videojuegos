# 🎮 GameZone - Plataforma de Videojuegos
**Actividad Escolar · Unidad 3: Seguridad, Web Services y APIs**  
*Materia: Desarrollo Web*

---

## 📌 1. Descripción del Proyecto
**GameZone** es una aplicación web moderna, interactiva y responsiva inspirada en plataformas de videojuegos. Fue desarrollada como proyecto integral para la **Unidad 3**, demostrando la implementación de:
1. **Seguridad web y criptografía:** Encabezados HTTP con `helmet`, encriptación de contraseñas con `bcryptjs`, protección contra fuerza bruta (rate limiting) y manejo de variables de entorno con `dotenv`.
2. **Web Services RESTful:** Endpoints desarrollados con **Node.js y Express** que intercambian datos exclusivamente en formato **JSON** utilizando códigos de estado HTTP semánticos (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict`, `429 Too Many Requests`).
3. **Consumo de APIs externas:** Integración de la API de videojuegos **RAWG** mediante una arquitectura de *Backend Proxy*, protegiendo la clave privada en el servidor para que jamás se exponga en el navegador.

---

## 🛠️ 2. Tecnologías Utilizadas

- **Frontend:**
  - HTML5 semántico y accesible.
  - Tailwind CSS y CSS3 moderno (tema oscuro gamer con acentos cian y violeta neón).
  - React + TypeScript con componentes desacoplados.
  - Lucide Icons para iconografía limpia.
- **Backend (Web Services):**
  - Node.js (entorno de ejecución).
  - Express.js (servidor web y enrutador de microservicios).
  - Helmet (seguridad HTTP).
  - Bcrypt.js (algoritmo de sal y hash de 10 rondas para contraseñas).
  - Dotenv (lectura segura de variables de entorno).
- **API Externa:**
  - RAWG Video Games Database API (`https://api.rawg.io/docs/`) con fallback automático y seguro.

---

## 📂 3. Estructura del Proyecto

```
gamezone/
├── .env.example              # Plantilla pública sin secretos
├── .env                      # Variables privadas (protegido por .gitignore)
├── .gitignore                # Excluye .env y node_modules de GitHub
├── package.json              # Dependencias y scripts de ejecución
├── server.ts                 # Servidor Express: Web Services, Seguridad y Proxy
├── tsconfig.json             # Configuración del compilador TypeScript
├── vite.config.ts            # Configuración de empaquetado y plugins
├── index.html                # Entrada HTML5 con tipografías y metadatos
├── README.md                 # Este manual técnico de entrega
└── src/
    ├── types.ts              # Modelos TypeScript de datos y respuestas JSON
    ├── index.css             # Estilos globales y paleta de colores gamer
    ├── main.tsx              # Inicialización de la aplicación
    ├── App.tsx               # Controlador principal de navegación
    └── components/
        ├── Navbar.tsx        # Navegación y monitor de salud del servidor
        ├── HomeView.tsx      # Pantalla 1: Inicio ("Descubre tu próximo videojuego...")
        ├── RegisterView.tsx  # Pantalla 2: Formulario de registro seguro con Bcrypt
        ├── CatalogView.tsx   # Pantalla 3: Explorar catálogo con buscador y filtros
        ├── GameDetailView.tsx# Pantalla 4: Ficha técnica y detalles del videojuego
        ├── SecurityView.tsx  # Panel interactivo de Web Services y auditoría U3
        ├── DocsView.tsx      # Manual interactivo integrado en la interfaz
        └── Footer.tsx        # Pie de página con créditos académicos
```

---

## 🚀 4. Instrucciones de Instalación y Ejecución en Windows

### Paso 1: Programas necesarios
- **Node.js** (versión 18 LTS o 20 LTS): Descargar e instalar desde [https://nodejs.org](https://nodejs.org).
- **Editor de código:** Recomendado [Visual Studio Code](https://code.visualstudio.com/).
- **Git** (opcional, para clonar el repositorio).

### Paso 2: Abrir la terminal
En Windows, presiona `Windows + R`, escribe `powershell` o `cmd` y presiona Enter. Navega a la carpeta del proyecto:
```bash
cd C:\ruta\hacia\gamezone
```

### Paso 3: Instalar las dependencias
Ejecuta el siguiente comando para descargar todos los paquetes necesarios (`express`, `helmet`, `bcryptjs`, `dotenv`, etc.):
```bash
npm install
```

### Paso 4: Configurar el archivo `.env`
Copia el archivo de plantilla `.env.example` y crea un nuevo archivo llamado `.env`:
```bash
# En Windows (PowerShell):
cp .env.example .env

# O en CMD:
copy .env.example .env
```
Abre `.env` en tu editor y define las variables:
```env
PORT=3000
NODE_ENV=development
RAWG_API_KEY=tu_clave_de_rawg_aqui
```
> **Nota sobre la clave de API:** Puedes obtener una clave gratuita en [https://rawg.io/apidocs](https://rawg.io/apidocs). Si dejas el valor por defecto, GameZone activará automáticamente el catálogo seguro en vivo para que el proyecto funcione al 100% sin caídas.

### Paso 5: Ejecutar el servidor
Inicia el servidor backend y el entorno de desarrollo:
```bash
npm run dev
```

### Paso 6: Abrir en el navegador
Abre tu navegador (Chrome, Edge o Firefox) en la siguiente URL:
```
http://localhost:3000
```

---

## 🌐 5. Endpoints y Web Services Desarrollados

Todos los endpoints responden en formato JSON y utilizan códigos de estado HTTP correctos:

### 1. `GET /api/estado`
- **Propósito:** Comprueba el estado de salud del servidor Express y la configuración de seguridad.
- **Código HTTP:** `200 OK`
- **Ejemplo de Respuesta JSON:**
```json
{
  "success": true,
  "mensaje": "Servidor GameZone en ejecución y listo para responder peticiones.",
  "uptimeSegundos": 124,
  "seguridad": {
    "helmetProteccionCabeceras": true,
    "bcryptHashContrasenas": true,
    "limitePeticionesRateLimit": true,
    "proteccionVariablesEntornoDotenv": true
  }
}
```

### 2. `GET /api/juegos`
- **Propósito:** Retorna el catálogo de videojuegos obtenido desde la API externa de forma segura.
- **Parámetros opcionales:** `?search=witcher&genre=action&page=1&page_size=12`
- **Código HTTP:** `200 OK`
- **Ejemplo de Respuesta JSON:**
```json
{
  "success": true,
  "count": 12,
  "page": 1,
  "origenDatos": "API Externa RAWG Oficial (Petición segura desde servidor Node.js)",
  "claveOcultaEnBackend": true,
  "juegos": [
    {
      "id": 3498,
      "name": "Grand Theft Auto V",
      "released": "2013-09-17",
      "background_image": "https://media.rawg.io/media/games/...",
      "rating": 4.47,
      "genres": [{ "id": 4, "name": "Acción" }]
    }
  ]
}
```

### 3. `GET /api/juegos/:id`
- **Propósito:** Retorna la información completa de un videojuego específico por su identificador.
- **Código HTTP:** `200 OK` (o `404 Not Found` si el juego no existe).
- **Ejemplo:** `GET /api/juegos/3498`

### 4. `POST /api/registro`
- **Propósito:** Procesa el registro de usuario, valida campos, aplica hash `bcrypt` y guarda en memoria temporal.
- **Cabecera requerida:** `Content-Type: application/json`
- **Cuerpo JSON:**
```json
{
  "fullName": "Carlos Silva",
  "email": "carlos@correo.com",
  "username": "carlos_gamer",
  "password": "Password123",
  "confirmPassword": "Password123",
  "termsAccepted": true
}
```
- **Código HTTP:** `201 Created` en éxito | `400 Bad Request` si los datos son inválidos | `409 Conflict` si ya existe el correo/usuario | `429 Too Many Requests` si se excede la tasa de registro.
- **Ejemplo de Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "¡Registro completado exitosamente en GameZone!",
  "usuario": {
    "id": "usr_k8s9f2",
    "fullName": "Carlos Silva",
    "email": "carlos@correo.com",
    "username": "carlos_gamer",
    "createdAt": "2026-10-20T20:00:00.000Z"
  },
  "seguridad": {
    "hashAlgoritmo": "bcrypt (saltRounds = 10)",
    "contrasenaEnTextoPlanoOculta": true
  }
}
```

### 5. `GET /api/usuarios`
- **Propósito:** Lista los usuarios registrados en memoria temporal (demostrando que se crearon y que sus contraseñas no se exponen).
- **Código HTTP:** `200 OK`

---

## 🔒 6. Medidas de Seguridad Implementadas (Unidad 3)

| Medida de Seguridad | Archivo donde se aplica | Vulnerabilidad Mitigada |
| :--- | :--- | :--- |
| **Variables de Entorno** | `.env` y `server.ts` | Oculta la clave privada de RAWG (`RAWG_API_KEY`) del navegador y de GitHub. |
| **Protección Git** | `.gitignore` | Regla `.env*` previene subir secretos por accidente. |
| **Cifrado de Contraseñas** | `server.ts` con `bcryptjs` | Nunca guarda contraseñas en texto plano. Aplica sal de 16 bytes y costo 10. |
| **Cabeceras HTTP Seguras** | `server.ts` con `helmet` | Evita ataques de Clickjacking, MIME sniffing y Cross-Site Scripting (XSS). |
| **Validación Dual** | Frontend (`RegisterView.tsx`) y Backend (`server.ts`) | Evita el envío de datos corruptos o bypass del formulario del cliente. |
| **Rate Limiting** | `server.ts` (middleware) | Limita a 10 registros por minuto por IP para evitar ataques de fuerza bruta / DoS. |
| **Principio de Mínimo Privilegio** | `server.ts` | Nunca se devuelven contraseñas ni hashes al cliente en las respuestas JSON. |

---

## 🧪 7. Pruebas para Demostración Escolar (Paso a Paso)

1. **Prueba de Pantalla 1 (Inicio):**
   - Entra a `http://localhost:3000`.
   - Verifica el texto de bienvenida: *"Descubre tu próximo videojuego favorito"*.
   - Comprueba la sección de videojuegos destacados y juegos populares.

2. **Prueba de Pantalla 2 (Registro):**
   - Ve a la pestaña **Registro**.
   - Intenta presionar "Crear Cuenta" con los campos vacíos: observarás los mensajes de error en rojo.
   - Escribe una contraseña corta (ej. `123`): el medidor indicará que faltan requisitos (8 caracteres, letra y número).
   - Escribe contraseñas que no coincidan: el validador alertará el error.
   - Llena los datos válidos y acepta los términos: verás el mensaje verde de éxito y podrás hacer clic en *"Verificar en memoria"* para ver el usuario guardado con su contraseña protegida.

3. **Prueba de Pantalla 3 (Catálogo):**
   - Ve a **Explorar Juegos**.
   - Escribe "Witcher" o "Cyberpunk" en el buscador y observa el filtrado en tiempo real.
   - Filtra por categorías (Acción, RPG, etc.) y prueba ordenar por *"Mejor Calificados"*.

4. **Prueba de Pantalla 4 (Detalles):**
   - Haz clic en *"Consultar Más Información"* en cualquier videojuego.
   - Comprueba la descripción completa, plataformas, calificación y fecha.
   - Presiona el botón *"Ver JSON GET /api/juegos/:id"* para mostrar al profesor el servicio web en vivo.
   - Presiona *"Regresar al Catálogo"* para volver.

5. **Prueba de Panel de Seguridad (Unidad 3):**
   - Ve a la pestaña **Web Services & Seguridad**.
   - Ejecuta los diferentes botones de endpoints (`GET /api/estado`, `POST /api/registro`, etc.) y muestra la respuesta JSON en tiempo real con sus cabeceras HTTP de Helmet.
   - Prueba el simulador interactivo de **Bcrypt** para explicar al profesor cómo funciona la sal y por qué el hash generado es irreversible.

---

## ❓ 8. Solución de Problemas Frecuentes

- **El puerto 3000 está ocupado:** Modifica la variable `PORT=3001` en el archivo `.env` o cierra la aplicación anterior con `npx kill-port 3000`.
- **Falta un módulo al iniciar:** Ejecuta `npm install` en la raíz del proyecto.
- **¿Cómo comprobar que `.env` no subirá a GitHub?:** Ejecuta `git status` en la terminal; verás que `.env` está ignorado gracias a `.gitignore`.

---
*GameZone · Actividad Escolar Unidad 3 · Proyecto evaluado con los más altos estándares de calidad académica.*
