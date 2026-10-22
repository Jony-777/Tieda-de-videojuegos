import React, { useState } from 'react';
import { UserPlus, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff, Lock, Mail, User, Check, Users } from 'lucide-react';
import { RegisterFormData, RegisteredUser } from '../types';

export const RegisterView: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<{
    message: string;
    usuario: RegisteredUser;
    seguridad: any;
  } | null>(null);

  const [registeredUsersList, setRegisteredUsersList] = useState<RegisteredUser[]>([]);
  const [loadingUsersList, setLoadingUsersList] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);

  // Validaciones en tiempo real para el medidor de contraseña
  const passwordChecks = {
    length: formData.password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    matches: Boolean(
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    ),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Limpiar error del campo modificado
    if (clientErrors[name]) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setServerError(null);
  };

  const validateClientSide = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'El nombre completo es obligatorio.';
    }

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Ingresa un correo electrónico válido (ejemplo: usuario@correo.com).';
      }
    }

    if (!formData.username.trim()) {
      errors.username = 'El nombre de usuario es obligatorio.';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'El nombre de usuario debe tener mínimo 3 caracteres.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username.trim())) {
      errors.username = 'Solo se permiten letras, números y guiones bajos (_).';
    }

    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria.';
    } else {
      if (!passwordChecks.length || !passwordChecks.hasLetter || !passwordChecks.hasNumber) {
        errors.password = 'La contraseña debe tener mínimo 8 caracteres, al menos una letra y un número.';
      }
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Debes confirmar tu contraseña.';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (!formData.termsAccepted) {
      errors.termsAccepted = 'Debes aceptar los términos y condiciones para continuar.';
    }

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // 1. Validación en el cliente (Frontend)
    if (!validateClientSide()) {
      return;
    }

    setSubmitting(true);

    try {
      // 2. Envío al endpoint seguro de Express (Backend)
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errores) {
          setClientErrors(data.errores);
        }
        setServerError(data.message || data.error || 'Error al procesar el registro.');
      } else {
        // Éxito: El backend guardó el usuario en memoria y encriptó la contraseña con bcrypt
        setRegistrationSuccess({
          message: data.message,
          usuario: data.usuario,
          seguridad: data.seguridad,
        });

        // Limpiar formulario
        setFormData({
          fullName: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          termsAccepted: false,
        });
        setClientErrors({});
      }
    } catch (err: any) {
      console.error('Error de red al registrar:', err);
      setServerError('No fue posible contactar con el servidor Express (/api/registro). Verifica que esté encendido.');
    } finally {
      setSubmitting(false);
    }
  };

  const fetchUsersInMemory = async () => {
    setLoadingUsersList(true);
    setShowUsersModal(true);
    try {
      const response = await fetch('/api/usuarios');
      const data = await response.json();
      if (data.success) {
        setRegisteredUsersList(data.usuarios || []);
      }
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    } finally {
      setLoadingUsersList(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#107C10]/20 border border-[#107C10]/60 text-[#2ee455] text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#2ee455]" />
          <span>Pantalla 2 · Registro de Perfil</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Crea tu Cuenta en{' '}
          <span className="bg-gradient-to-r from-white via-zinc-200 to-[#2ee455] bg-clip-text text-transparent">
            GameZone
          </span>
        </h1>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          Crea tu Gamertag con validaciones activas en frontend y backend. Tu contraseña será encriptada en el servidor con <strong className="text-[#2ee455]">Bcrypt</strong>.
        </p>
      </div>

      {/* Success Notification Alert */}
      {registrationSuccess && (
        <div className="rounded-2xl bg-[#0c1c11] border border-[#107C10]/80 p-6 space-y-4 shadow-xl shadow-[#107C10]/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-xl bg-[#107C10]/30 text-[#2ee455] shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-emerald-200">
                {registrationSuccess.message}
              </h3>
              <p className="text-xs text-emerald-300/80">
                El usuario ha sido registrado en la memoria temporal del servidor Express mediante el endpoint <code className="bg-[#07130b] px-1 py-0.5 rounded border border-[#107C10]/60">POST /api/registro</code>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-[#08160e] border border-[#107C10]/40 text-xs">
            <div>
              <span className="text-[#2ee455] font-bold">Gamertag:</span>{' '}
              <span className="text-white font-bold">@{registrationSuccess.usuario.username}</span>
            </div>
            <div>
              <span className="text-[#2ee455] font-bold">Correo:</span>{' '}
              <span className="text-white font-semibold">{registrationSuccess.usuario.email}</span>
            </div>
            <div>
              <span className="text-[#2ee455] font-bold">ID Generado:</span>{' '}
              <span className="text-emerald-300 font-mono text-[11px]">{registrationSuccess.usuario.id}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-emerald-300 border-t border-[#107C10]/40">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2ee455]" />
              <span>Seguridad: Contraseña hasheada con Bcrypt (SaltRounds = 10). Ningún secreto devuelto al cliente.</span>
            </div>
            <button
              onClick={fetchUsersInMemory}
              className="text-xs font-bold text-white bg-[#107C10] hover:bg-[#159a15] px-3.5 py-1.5 rounded-lg border border-[#2ee455]/40 transition-colors cursor-pointer"
            >
              Verificar en memoria &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Main Form Card */}
      <div className="rounded-3xl border border-[#222b38] bg-[#0e1218] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#107C10]/15 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          {serverError && (
            <div className="p-4 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-300">Error en el registro</p>
                <p className="text-red-200/90">{serverError}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Campo 1: Nombre Completo */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                Nombre Completo <span className="text-[#2ee455]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Ej. Carlos Mendoza Silva"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#131720] border text-white text-sm focus:outline-none transition-all placeholder:text-zinc-600 ${
                    clientErrors.fullName
                      ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#222b38] focus:border-[#107C10] focus:ring-1 focus:ring-[#107C10]'
                  }`}
                />
              </div>
              {clientErrors.fullName && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{clientErrors.fullName}</span>
                </p>
              )}
            </div>

            {/* Campo 2: Correo Electrónico */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                Correo Electrónico <span className="text-[#2ee455]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ejemplo@correo.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#131720] border text-white text-sm focus:outline-none transition-all placeholder:text-zinc-600 ${
                    clientErrors.email
                      ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#222b38] focus:border-[#107C10] focus:ring-1 focus:ring-[#107C10]'
                  }`}
                />
              </div>
              {clientErrors.email && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{clientErrors.email}</span>
                </p>
              )}
            </div>

            {/* Campo 3: Nombre de Usuario */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                Nombre de Usuario (Gamertag) <span className="text-[#2ee455]">*</span>
              </label>
              <div className="relative">
                <span className="text-zinc-500 text-sm font-bold absolute left-3.5 top-2.5">@</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="gamer_master99"
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#131720] border text-white text-sm focus:outline-none transition-all placeholder:text-zinc-600 ${
                    clientErrors.username
                      ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#222b38] focus:border-[#107C10] focus:ring-1 focus:ring-[#107C10]'
                  }`}
                />
              </div>
              <p className="text-[11px] text-zinc-500">Mínimo 3 caracteres, letras, números y guiones bajos.</p>
              {clientErrors.username && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{clientErrors.username}</span>
                </p>
              )}
            </div>

            {/* Campo 4: Contraseña */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                Contraseña <span className="text-[#2ee455]">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#131720] border text-white text-sm focus:outline-none transition-all placeholder:text-zinc-600 ${
                    clientErrors.password
                      ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#222b38] focus:border-[#107C10] focus:ring-1 focus:ring-[#107C10]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {clientErrors.password && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{clientErrors.password}</span>
                </p>
              )}
            </div>

            {/* Campo 5: Confirmación de Contraseña */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                Confirmar Contraseña <span className="text-[#2ee455]">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#131720] border text-white text-sm focus:outline-none transition-all placeholder:text-zinc-600 ${
                    clientErrors.confirmPassword
                      ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-[#222b38] focus:border-[#107C10] focus:ring-1 focus:ring-[#107C10]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {clientErrors.confirmPassword && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{clientErrors.confirmPassword}</span>
                </p>
              )}
            </div>

          </div>

          {/* Validador visual interactivo de requisitos de contraseña */}
          <div className="p-3.5 rounded-xl bg-[#131720] border border-[#202733] space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              Requisitos de Seguridad de Contraseña (Unidad 3)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className={`flex items-center gap-1.5 ${passwordChecks.length ? 'text-[#2ee455] font-bold' : 'text-zinc-500'}`}>
                {passwordChecks.length ? <Check className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />}
                <span>8+ caracteres</span>
              </div>
              <div className={`flex items-center gap-1.5 ${passwordChecks.hasLetter ? 'text-[#2ee455] font-bold' : 'text-zinc-500'}`}>
                {passwordChecks.hasLetter ? <Check className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />}
                <span>Al menos 1 letra</span>
              </div>
              <div className={`flex items-center gap-1.5 ${passwordChecks.hasNumber ? 'text-[#2ee455] font-bold' : 'text-zinc-500'}`}>
                {passwordChecks.hasNumber ? <Check className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />}
                <span>Al menos 1 número</span>
              </div>
              <div className={`flex items-center gap-1.5 ${passwordChecks.matches ? 'text-[#2ee455] font-bold' : 'text-zinc-500'}`}>
                {passwordChecks.matches ? <Check className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />}
                <span>Coinciden</span>
              </div>
            </div>
          </div>

          {/* Campo 6: Términos y Condiciones */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#107C10] focus:ring-[#107C10]"
              />
              <span className="text-xs text-zinc-300 leading-relaxed">
                Acepto los <span className="text-[#2ee455] font-semibold underline">Términos y Condiciones</span> y reconozco que mis datos serán procesados de forma segura conforme a las políticas del proyecto escolar de la Unidad 3.
              </span>
            </label>
            {clientErrors.termsAccepted && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1 pl-7">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{clientErrors.termsAccepted}</span>
              </p>
            )}
          </div>

          {/* Botón de Enviar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl bg-[#107C10] hover:bg-[#159a15] text-white font-black text-sm sm:text-base shadow-lg shadow-[#107C10]/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <UserPlus className="w-5 h-5" />
              <span>{submitting ? 'Validando y encriptando con Bcrypt...' : 'Crear Cuenta en GameZone'}</span>
            </button>

            <button
              type="button"
              onClick={fetchUsersInMemory}
              className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#18202b] hover:bg-[#202a38] text-zinc-300 hover:text-white text-xs sm:text-sm font-bold border border-[#273447] transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#2ee455]" />
              <span>Ver Base de Datos en Memoria</span>
            </button>
          </div>

        </form>
      </div>

      {/* Modal/Panel para ver usuarios en memoria */}
      {showUsersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0e1218] border border-[#222b38] rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#222b38] pb-3">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#2ee455]" />
                <h3 className="text-lg font-bold text-white">
                  Usuarios en Memoria Temporal (Servidor Express)
                </h3>
              </div>
              <button
                onClick={() => setShowUsersModal(false)}
                className="text-zinc-400 hover:text-white text-sm px-2 py-1 cursor-pointer"
              >
                Cerrar ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Datos obtenidos de <code className="text-[#2ee455]">GET /api/usuarios</code>. Demuestra que el servidor guarda los usuarios temporalmente sin base de datos, y comprueba que <strong>nunca se exponen contraseñas ni hashes</strong>.
            </p>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {loadingUsersList ? (
                <div className="text-center py-8 text-xs text-zinc-500">
                  Consultando servidor Express...
                </div>
              ) : registeredUsersList.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-500 bg-[#131720] rounded-xl border border-[#222b38]">
                  Aún no hay usuarios registrados en la sesión actual. Completa el formulario para registrar el primero.
                </div>
              ) : (
                registeredUsersList.map((usr) => (
                  <div
                    key={usr.id}
                    className="p-3 rounded-xl bg-[#131720] border border-[#222b38] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <p className="font-bold text-white">{usr.fullName}</p>
                      <p className="text-zinc-400">
                        @{usr.username} · {usr.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#107C10]/20 text-[#2ee455] border border-[#107C10]/50 font-bold">
                        Hash Bcrypt Protegido
                      </span>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        {new Date(usr.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowUsersModal(false)}
                className="px-4 py-2 rounded-xl bg-[#18202b] hover:bg-[#222c3c] text-xs text-white font-semibold cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
