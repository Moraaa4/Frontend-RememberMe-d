"use client";

import React, { useState } from "react";

type AuthMode = "login" | "register";
type UserRole = "PATIENT" | "DOCTOR";

const brandFeatures = [
    "Recordatorios de tomas personalizados",
    "Seguimiento de síntomas diario",
    "Vinculación directa con tu médico",
];

const AuthScreen = ({ onLogin }) => {
    const [mode, setMode] = useState<AuthMode>("login");
    const [role, setRole] = useState<UserRole>("PATIENT");
    const [form, setForm] = useState({
        email: "", password: "", full_name: "", phone: "", dob: "",
    });

    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    return (
        <div className="flex h-screen" style={{ fontFamily: "Nunito, sans-serif" }}>

            <div className="flex flex-col justify-between shrink-0 relative overflow-hidden p-[44px_44px_48px] bg-blue-900" style={{ width: 480 }}>
                {[
                    { top: "-80px", left: "-80px", size: 320 },
                    { top: "-40px", left: "60%",   size: 180 },
                    { top: "70%",   left: "80%",   size: 240 },
                ].map((c, i) => (
                    <div
                        key={i}
                        className="absolute pointer-events-none rounded-full border border-white/[0.08]"
                        style={{ top: c.top, left: c.left, width: c.size, height: c.size }}
                    />
                ))}

                <div>
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15">
                            💊
                        </div>
                        <span className="text-xl font-extrabold tracking-[-0.02em] text-white">
              RememberMe<span className="opacity-60">-d</span>
            </span>
                    </div>
                    <h2 className="text-[32px] font-extrabold leading-[1.2] mb-4 text-white">
                        Tu adherencia terapéutica,<br />siempre contigo.
                    </h2>
                    <p className="text-[15px] leading-relaxed m-0 text-white/65">
                        Gestiona medicamentos, registra síntomas y mantén a tu médico informado en tiempo real.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {brandFeatures.map((label) => (
                        <div
                            key={label}
                            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] bg-white/[0.08]"
                        >
                            <span className="text-white/80 text-sm">✓</span>
                            <span className="text-[13px] font-semibold text-white/80">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-y-auto p-10 bg-gray-50">
                <div className="w-full max-w-[400px]">
                    <div className="mb-8">
                        <h1 className="text-[26px] font-extrabold mb-1.5 text-gray-800">
                            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
                        </h1>
                        <p className="text-sm m-0 text-gray-400">
                            {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
                            <button
                                onClick={() => setMode(mode === "login" ? "register" : "login")}
                                className="bg-transparent border-none font-bold cursor-pointer p-0 text-sm text-blue-500"
                                style={{ fontFamily: "Nunito, sans-serif" }}
                            >
                                {mode === "login" ? "Regístrate gratis" : "Inicia sesión"}
                            </button>
                        </p>
                    </div>

                    <div className="flex flex-col gap-3.5">
                        {mode === "register" && (
                            <>
                                <div>
                                    <label className="text-[13px] font-semibold block mb-[5px] text-gray-800">
                                        Nombre completo <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        placeholder="Ana González Martínez"
                                        value={form.full_name}
                                        onChange={set("full_name")}
                                        className="w-full text-sm font-medium px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-[13px] font-semibold block mb-2 text-gray-800">
                                        Tipo de cuenta <span className="text-red-400">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {[
                                            ["PATIENT", "Paciente", "Gestiona tu tratamiento"   ],
                                            ["DOCTOR",  "Médico",   "Monitorea a tus pacientes" ],
                                        ].map(([val, name, desc]) => (
                                            <div
                                                key={val}
                                                onClick={() => setRole(val as UserRole)}
                                                className={`px-4 py-3.5 rounded-[10px] cursor-pointer transition-all duration-150 border-2 ${
                                                    role === val
                                                        ? "border-blue-400 bg-blue-50"
                                                        : "border-gray-200 bg-white"
                                                }`}
                                            >
                                                <div className={`text-sm font-bold mb-0.5 text-gray-800`}>{name}</div>
                                                <div className="text-xs text-gray-400">{desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[13px] font-semibold block mb-[5px] text-gray-800">Teléfono</label>
                                    <input
                                        placeholder="+52 961 000 0000"
                                        value={form.phone}
                                        onChange={set("phone")}
                                        className="w-full text-sm font-medium px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-[13px] font-semibold block mb-[5px] text-gray-800">
                                        Fecha de nacimiento <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={form.dob}
                                        onChange={set("dob")}
                                        className="w-full text-sm font-medium px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-all"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="text-[13px] font-semibold block mb-[5px] text-gray-800">
                                Correo electrónico <span className="text-red-400">*</span>
                            </label>
                            <input
                                placeholder="correo@ejemplo.com"
                                type="email"
                                value={form.email}
                                onChange={set("email")}
                                className="w-full text-sm font-medium px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-[13px] font-semibold block mb-[5px] text-gray-800">
                                Contraseña <span className="text-red-400">*</span>
                            </label>
                            <input
                                placeholder="••••••••"
                                type="password"
                                value={form.password}
                                onChange={set("password")}
                                className="w-full text-sm font-medium px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-all"
                            />
                        </div>

                        <button
                            onClick={() => onLogin(mode === "register" ? role : null)}
                            className="w-full flex items-center justify-center py-3 rounded-lg text-[15px] font-semibold text-white bg-blue-500 hover:bg-blue-600 border-none cursor-pointer transition-all mt-1"
                            style={{ fontFamily: "Nunito, sans-serif" }}
                        >
                            {mode === "login" ? "Entrar a mi cuenta" : "Crear cuenta"}
                        </button>

                        {mode === "login" && (
                            <div className="flex gap-2.5">
                                {[
                                    { label: "Demo Paciente", val: "PATIENT" },
                                    { label: "Demo Médico",   val: "DOCTOR"  },
                                ].map((d) => (
                                    <button
                                        key={d.val}
                                        onClick={() => onLogin(d.val)}
                                        className="flex-1 py-[9px] rounded-lg text-sm font-semibold text-blue-500 bg-transparent border-[1.5px] border-blue-200 hover:bg-blue-50 cursor-pointer transition-all"
                                        style={{ fontFamily: "Nunito, sans-serif" }}
                                    >
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <p className="text-xs text-center mt-6 mb-0 leading-relaxed text-gray-300">
                        Al continuar aceptas los{" "}
                        <span className="cursor-pointer text-blue-500">Términos de uso</span>
                        {" "}y la{" "}
                        <span className="cursor-pointer text-blue-500">Política de privacidad</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;