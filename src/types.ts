export interface GameItem {
  id: number;
  name: string;
  slug: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number | null;
  genres: Array<{ id: number; name: string; slug: string }>;
  platforms: Array<{ platform: { id: number; name: string; slug: string } }>;
  description_raw?: string;
  website?: string;
  developers?: Array<{ id: number; name: string }>;
  publishers?: Array<{ id: number; name: string }>;
}

export interface GamesApiResponse {
  success: boolean;
  count: number;
  page: number;
  pageSize: number;
  origenDatos: string;
  apiExternaConectada: boolean;
  claveOcultaEnBackend: boolean;
  juegos: GameItem[];
  error?: string;
  message?: string;
}

export interface GameDetailResponse {
  success: boolean;
  origenDatos: string;
  juego: GameItem;
  error?: string;
  message?: string;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface RegisteredUser {
  id: string;
  fullName: string;
  email: string;
  username: string;
  createdAt: string;
  proteccion?: string;
}

export interface ServerStatusResponse {
  success: boolean;
  mensaje: string;
  proyecto: string;
  timestamp: string;
  uptimeSegundos: number;
  entorno: string;
  seguridad: {
    helmetProteccionCabeceras: boolean;
    bcryptHashContrasenas: boolean;
    limitePeticionesRateLimit: boolean;
    proteccionVariablesEntornoDotenv: boolean;
    contrasenasTextoPlanoOcultas: boolean;
  };
  serviciosWeb: {
    endpointsDisponibles: string[];
    apiExterna: {
      proveedor: string;
      claveConfiguradaEnEnv: boolean;
      modoOperacion: string;
    };
  };
}

export interface SecurityPoint {
  tema: string;
  implementacion: string;
  beneficio: string;
  cumplimiento: string;
}

export interface SecurityAuditResponse {
  success: boolean;
  unidad: string;
  puntosEvaluados: SecurityPoint[];
}
