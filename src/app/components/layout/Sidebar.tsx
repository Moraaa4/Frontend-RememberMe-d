"use client";

import React from "react";

const patientNav = [
    { id: "dashboard",   label: "Inicio",        badge: undefined },
    { id: "medications", label: "Medicamentos",  badge: undefined },
    { id: "intakes",     label: "Tomas del día", badge: "3"       },
    { id: "symptoms",    label: "Mi Evolución",  badge: undefined },
    { id: "doctor",      label: "Mi Médico",     badge: undefined },
    { id: "profile",     label: "Mi Perfil",     badge: undefined },
];

const doctorNav = [
    { id: "dashboard", label: "Panel médico",  badge: undefined },
    { id: "patients",  label: "Mis Pacientes", badge: undefined },
    { id: "profile",   label: "Mi Perfil",     badge: undefined },
];

const Sidebar = ({ role, active, onNav, onLogout }) => {
    const nav  = role === "DOCTOR" ? doctorNav : patientNav;
    const user = role === "DOCTOR"
        ? { name: "Dra. Ana López", sub: "Endocrinología", initials: "DA" }
        : { name: "Juan Pérez",     sub: "Paciente",       initials: "JP" };

    const isActive = (id) =>
        active === id || (id === "patients" && active.startsWith("patient"));

    return (
        <div className="flex flex-col h-screen shrink-0 fixed top-0 left-0 z-10 w-[240px] bg-white border-r border-gray-100">

            <div className="px-5 pt-6 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-blue-50 text-blue-500 text-base">
                        💊
                    </div>
                    <div>
                        <div className="text-[15px] font-extrabold tracking-[-0.02em] text-gray-800">
                            RememberMe<span className="text-gray-300">-d</span>
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-400">
                            {role === "DOCTOR" ? "Panel Médico" : "Portal Paciente"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] bg-gray-50">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 bg-blue-100 text-blue-500">
                        {user.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold truncate text-gray-800">{user.name}</div>
                        <div className="text-[11px] text-gray-400">{user.sub}</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-3 overflow-y-auto">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] px-2 py-1 mb-1 text-gray-300">
                    Navegación
                </div>
                {nav.map((item) => {
                    const on = isActive(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNav(item.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-[9px] rounded-[9px] mb-0.5 border-none cursor-pointer text-left text-sm transition-all duration-150
                ${on
                                ? "bg-blue-50 text-blue-500 font-bold"
                                : "bg-transparent text-gray-400 font-medium hover:bg-gray-100"
                            }`}
                        >
                            <span className="flex shrink-0 text-base">•</span>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                                <span className="text-[11px] font-bold px-[7px] py-px rounded-full bg-amber-400 text-white">
                  {item.badge}
                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-gray-100">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-[9px] rounded-[9px] border-none cursor-pointer text-sm font-medium text-gray-400 bg-transparent hover:bg-gray-100 transition-all duration-150"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;