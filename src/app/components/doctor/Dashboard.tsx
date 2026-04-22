"use client";

import React, { useState } from "react";

const doctorPatients = [
    { id: 3, full_name: "Juan Pérez López",   age: 31, linked_at: "2026-03-01", adherence_pct: 87, streak: 5,  conditions: "Diabetes tipo 2, Hipertensión", last_symptom: "2026-04-22", alert: false, meds: 3 },
    { id: 5, full_name: "Carla Ruiz Morales", age: 46, linked_at: "2026-02-14", adherence_pct: 62, streak: 0,  conditions: "Hipotiroidismo",                last_symptom: "2026-04-21", alert: true,  meds: 2 },
    { id: 7, full_name: "Roberto Gómez Díaz", age: 58, linked_at: "2026-01-20", adherence_pct: 94, streak: 12, conditions: "Diabetes tipo 2",                last_symptom: "2026-04-20", alert: false, meds: 4 },
    { id: 9, full_name: "Laura Mendoza Cruz", age: 34, linked_at: "2026-03-18", adherence_pct: 45, streak: 0,  conditions: "Hipertensión, Ansiedad",         last_symptom: "2026-04-22", alert: true,  meds: 3 },
];

const adColorClass = (pct: number) =>
    pct >= 80 ? "text-blue-500" : pct >= 60 ? "text-amber-400" : "text-red-400";

const adBgClass = (pct: number) =>
    pct >= 80 ? "bg-blue-500" : pct >= 60 ? "bg-amber-400" : "bg-red-400";

const DoctorDashboard = ({ onSelectPatient }) => {
    const [search, setSearch] = useState("");

    const avgAdherence = Math.round(
        doctorPatients.reduce((a, p) => a + p.adherence_pct, 0) / doctorPatients.length
    );
    const alerts = doctorPatients.filter((p) => p.alert).length;

    const filtered = doctorPatients.filter((p) =>
        p.full_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">

            {/* Welcome */}
            <div className="mb-7">
                <div className="text-[13px] font-semibold mb-0.5 text-gray-400">
                    Martes 22 de abril, 2026
                </div>
                <h1 className="text-[26px] font-extrabold m-0 text-gray-800">
                    Panel Médico
                </h1>
                <p className="text-sm mt-1 mb-0 text-gray-400">
                    Bienvenida, <strong className="text-gray-800">Dra. Ana López</strong>
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3.5 mb-7">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-[10px] bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        👥
                    </div>
                    <div>
                        <div className="text-2xl font-extrabold text-gray-800">{doctorPatients.length}</div>
                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Pacientes</div>
                        <div className="text-xs text-gray-400">Vinculados activos</div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${avgAdherence >= 80 ? "bg-blue-50 text-blue-500" : "bg-amber-50 text-amber-500"}`}>
                        📊
                    </div>
                    <div>
                        <div className={`text-2xl font-extrabold ${avgAdherence >= 80 ? "text-blue-500" : "text-amber-400"}`}>{avgAdherence}%</div>
                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Adherencia promedio</div>
                        <div className="text-xs text-gray-400">Todos los pacientes</div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${alerts > 0 ? "bg-red-50 text-red-400" : "bg-blue-50 text-blue-500"}`}>
                        🔔
                    </div>
                    <div>
                        <div className={`text-2xl font-extrabold ${alerts > 0 ? "text-red-400" : "text-blue-500"}`}>{alerts}</div>
                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Alertas activas</div>
                        <div className="text-xs text-gray-400">Requieren atención</div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-[10px] bg-violet-50 text-violet-500 flex items-center justify-center shrink-0">
                        💊
                    </div>
                    <div>
                        <div className="text-2xl font-extrabold text-violet-500">148</div>
                        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Esta semana</div>
                        <div className="text-xs text-gray-400">Tomas registradas</div>
                    </div>
                </div>
            </div>

            {/* Alert strip */}
            {alerts > 0 && (
                <div className="bg-red-50 border-l-4 border-red-400 rounded-2xl p-5 mb-5">
                    <div className="flex items-center gap-2.5 mb-3">
                        <span className="text-red-400">🔔</span>
                        <div className="font-bold text-[15px] text-red-700">
                            Pacientes que requieren atención
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {doctorPatients.filter((p) => p.alert).map((p) => (
                            <div
                                key={p.id}
                                onClick={() => onSelectPatient(p)}
                                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] cursor-pointer flex-1 bg-white border border-red-200 hover:bg-red-50 transition-colors"
                            >
                                <div className="w-9 h-9 rounded-full bg-red-400 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                    {p.full_name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-bold truncate text-gray-800">
                                        {p.full_name}
                                    </div>
                                    <div className="text-xs font-semibold text-red-400">
                                        {p.adherence_pct < 70
                                            ? `Adherencia baja: ${p.adherence_pct}%`
                                            : "Síntoma de alta severidad"}
                                    </div>
                                </div>
                                <span className="text-red-400 text-sm">›</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main grid */}
            <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 320px" }}>

                {/* Patient list */}
                <div className="bg-white