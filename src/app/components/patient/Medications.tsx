"use client";

import React, { useState } from "react";

const allMedications = [
    { id: 1, name: "Metformina",  dosage: "850mg",   frequency_hours: 12, start_date: "2026-03-01", end_date: null,         instructions: "Tomar con alimentos",                      is_active: true,  taken: 18, total: 22, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 2, name: "Lisinopril",  dosage: "10mg",    frequency_hours: 24, start_date: "2026-03-15", end_date: "2026-06-15", instructions: "Por la mañana en ayunas",                   is_active: true,  taken: 14, total: 16, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 3, name: "Paracetamol", dosage: "500mg",   frequency_hours: 8,  start_date: "2026-04-18", end_date: "2026-04-25", instructions: "En caso de dolor. No exceder 4 dosis/día", is_active: true,  taken: 5,  total: 6,  source: "patient", prescriber: null             },
    { id: 4, name: "Omeprazol",   dosage: "20mg",    frequency_hours: 24, start_date: "2026-02-01", end_date: "2026-03-01", instructions: "Antes de desayunar",                        is_active: false, taken: 28, total: 28, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 5, name: "Vitamina D3", dosage: "1000 UI", frequency_hours: 24, start_date: "2026-04-01", end_date: null,         instructions: "Con el desayuno",                           is_active: true,  taken: 22, total: 22, source: "patient", prescriber: null             },
];

type MedFilter = "all" | "active" | "inactive" | "rx" | "own";

const filterLabels: Record<MedFilter, string> = {
    all: "Todos", active: "Activos", inactive: "Inactivos", rx: "Rx", own: "Propios",
};

const PatientMedications = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<MedFilter>("all");

    const filtered = allMedications.filter((m) => {
        const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter =
            filter === "all"      ? true :
                filter === "active"   ? m.is_active :
                    filter === "inactive" ? !m.is_active :
                        filter === "rx"       ? m.source === "doctor" :
                            m.source === "patient";
        return matchSearch && matchFilter;
    });

    return (
        <div>
            <div className="flex justify-between items-start mb-7 gap-4">
                <div>
                    <h1 className="text-[26px] font-extrabold m-0 text-gray-800">Mis Medicamentos</h1>
                    <p className="text-sm mt-1 mb-0 text-gray-400">Historial completo de tratamientos activos e inactivos</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-[9px] rounded-lg text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 border-none cursor-pointer transition-all shrink-0">
                    + Agregar medicamento
                </button>
            </div>

            <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div className="w-56">
                    <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 flex pointer-events-none text-sm">
              🔍
            </span>
                        <input
                            placeholder="Buscar medicamento..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full text-sm font-medium pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-blue-400 transition-all"
                        />
                    </div>
                </div>
                {(Object.keys(filterLabels) as MedFilter[]).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-[9px] rounded-lg text-[13px] font-semibold cursor-pointer transition-all duration-150 border-[1.5px] ${
                            filter === f
                                ? "border-blue-400 bg-blue-50 text-blue-500"
                                : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
                        }`}
                    >
                        {filterLabels[f]}
                    </button>
                ))}
            </div>

            <div className="flex gap-4 mb-5">
                {[
                    { cls: "bg-blue-500",   label: "Rx — Prescrito por médico" },
                    { cls: "bg-violet-500", label: "Propio — Agregado por ti"  },
                ].map((x) => (
                    <div key={x.label} className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${x.cls}`} />
                        <span className="text-xs font-semibold text-gray-400">{x.label}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {filtered.map((m) => {
                    const adherence   = Math.round((m.taken / m.total) * 100);
                    const isRx        = m.source === "doctor";
                    const accentCls   = isRx ? "border-l-blue-500"   : "border-l-violet-500";
                    const iconBg      = isRx ? "bg-blue-50 text-blue-500" : "bg-violet-50 text-violet-500";
                    const adhColor    = adherence >= 80 ? "text-blue-500 bg-blue-500" : "text-amber-400 bg-amber-400";
                    const [adhText, adhBg] = adhColor.split(" ");

                    return (
                        <div
                            key={m.id}
                            className={`bg-white rounded-[14px] border border-gray-100 p-5 shadow-sm border-l-4 ${accentCls} ${!m.is_active ? "opacity-65" : ""}`}
                        >
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                                        💊
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                            <span className="text-[15px] font-bold text-gray-800">{m.name}</span>
                                            {isRx ? (
                                                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Rx</span>
                                            ) : (
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-600">Propio</span>
                                            )}
                                            {!m.is_active && (
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Inactivo</span>
                                            )}
                                        </div>
                                        <div className="text-[13px] text-gray-400">
                                            {m.dosage} · cada {m.frequency_hours}h
                                            {isRx && m.prescriber && <span> · {m.prescriber}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 px-3 py-2 rounded-lg mb-3 text-[13px] bg-gray-100 text-gray-400">
                                <span>📋</span>
                                <span>{m.instructions}</span>
                            </div>

                            <div className="mb-3">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-[12px] font-semibold text-gray-400">Adherencia</span>
                                    <span className={`text-sm font-extrabold ${adhText}`}>{adherence}%</span>
                                </div>
                                <div className="w-full h-[7px] bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-[width] duration-300 ${adhBg}`}
                                        style={{ width: `${(m.taken / m.total) * 100}%` }}
                                    />
                                </div>
                                <div className="text-[11px] mt-1 text-gray-400">
                                    {m.taken} de {m.total} tomas completadas
                                </div>
                            </div>

                            <div className="text-[12px] mb-3 text-gray-400">
                                Inicio: {m.start_date}
                                {m.end_date  && <> · Fin: {m.end_date}</>}
                                {!m.end_date && <> · <span className="text-blue-500">Crónico</span></>}
                            </div>

                            {!isRx && (
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold text-gray-500 bg-transparent border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all">
                                        ✏
                                    </button>
                                    {m.is_active && (
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold text-gray-500 bg-transparent border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all">
                                            🗑
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PatientMedications;