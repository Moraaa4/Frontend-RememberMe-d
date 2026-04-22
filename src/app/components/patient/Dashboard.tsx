"use client";

import React from "react";

const patientDashboardMeds = [
    { id: 1, name: "Metformina",  dosage: "850mg",   frequency_hours: 12, start_date: "2026-03-01", end_date: null,         instructions: "Tomar con alimentos",     is_active: true, taken: 18, total: 22, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 2, name: "Lisinopril",  dosage: "10mg",    frequency_hours: 24, start_date: "2026-03-15", end_date: "2026-06-15", instructions: "Por la mañana en ayunas", is_active: true, taken: 14, total: 16, source: "doctor",  prescriber: "Dra. Ana López" },
    { id: 3, name: "Paracetamol", dosage: "500mg",   frequency_hours: 8,  start_date: "2026-04-18", end_date: "2026-04-25", instructions: "En caso de dolor",        is_active: true, taken: 5,  total: 6,  source: "patient", prescriber: null },
    { id: 5, name: "Vitamina D3", dosage: "1000 UI", frequency_hours: 24, start_date: "2026-04-01", end_date: null,         instructions: "Con el desayuno",         is_active: true, taken: 22, total: 22, source: "patient", prescriber: null },
];

const todayIntakes = [
    { id: 1, medication: "Metformina",  dosage: "850mg", scheduled_time: "08:00", status: "taken",   taken_at: "08:14" },
    { id: 2, medication: "Lisinopril",  dosage: "10mg",  scheduled_time: "08:00", status: "taken",   taken_at: "08:14" },
    { id: 3, medication: "Paracetamol", dosage: "500mg", scheduled_time: "08:00", status: "taken",   taken_at: "08:30" },
    { id: 4, medication: "Metformina",  dosage: "850mg", scheduled_time: "14:00", status: "pending", taken_at: null    },
    { id: 5, medication: "Paracetamol", dosage: "500mg", scheduled_time: "16:00", status: "pending", taken_at: null    },
    { id: 6, medication: "Paracetamol", dosage: "500mg", scheduled_time: "00:00", status: "pending", taken_at: null    },
];

const recentSymptoms = [
    { id: 1, symptom_name: "Dolor abdominal", severity: 6, notes: "Leve, después de comer",           entry_date: "2026-04-22", high_severity_alert: false },
    { id: 3, symptom_name: "Mareo",           severity: 9, notes: "Episodio de 10 min al levantarse", entry_date: "2026-04-20", high_severity_alert: true  },
    { id: 4, symptom_name: "Cefalea",         severity: 5, notes: "Tensional leve",                   entry_date: "2026-04-19", high_severity_alert: false },
];

const statusStyles = {
    taken:   { bg: "bg-blue-50",  text: "text-blue-500",  badge: "bg-blue-100 text-blue-500",   label: "Tomado"    },
    pending: { bg: "bg-amber-50", text: "text-amber-500", badge: "bg-amber-100 text-amber-500", label: "Pendiente" },
    late:    { bg: "bg-red-50",   text: "text-red-400",   badge: "bg-red-100 text-red-400",     label: "Tarde"     },
    skipped: { bg: "bg-gray-100", text: "text-gray-400",  badge: "bg-gray-200 text-gray-400",   label: "Omitido"   },
};

const PatientDashboard = () => {
    const taken   = todayIntakes.filter((t) => t.status === "taken").length;
    const pending = todayIntakes.filter((t) => t.status === "pending").length;

    return (
        <div>

            {/* Welcome */}
            <div className="mb-7">
                <div className="text-[13px] font-semibold mb-0.5 text-gray-400">
                    Martes 22 de abril, 2026
                </div>
                <h1 className="text-[26px] font-extrabold m-0 text-gray-800">
                    Buenos días, Juan 👋
                </h1>
                <p className="text-sm mt-1 mb-0 text-gray-400">
                    Llevas <strong className="text-gray-800">5 días</strong> con adherencia perfecta. ¡Sigue así!
                </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3.5 mb-7">
                <div className="px-5 py-4 rounded-[12px] bg-blue-50">
                    <div className="text-[28px] font-extrabold text-blue-500">87%</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Adherencia mensual</div>
                </div>
                <div className="px-5 py-4 rounded-[12px] bg-amber-50">
                    <div className="text-[28px] font-extrabold text-amber-500">{pending}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Tomas pendientes</div>
                </div>
                <div className="px-5 py-4 rounded-[12px] bg-gray-100">
                    <div className="text-[28px] font-extrabold text-gray-800">5🔥</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Días de racha</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">

                {/* Today's intakes */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="font-bold text-[15px] mb-4 text-gray-800">
                        Tomas de hoy
                        <span className="text-[13px] font-normal ml-2 text-gray-400">
              {taken}/{todayIntakes.length}
            </span>
                    </div>
                    <div className="w-full h-[6px] bg-gray-100 rounded-full overflow-hidden mb-4">
                        <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(taken / todayIntakes.length) * 100}%` }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        {todayIntakes.map((t) => {
                            const s = statusStyles[t.status];
                            return (
                                <div
                                    key={t.id}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg gap-2 ${s.bg}`}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[13px] font-semibold truncate text-gray-800">
                                            {t.medication}
                                        </div>
                                        <div className="text-[11px] text-gray-400">
                                            {t.dosage} · {t.scheduled_time}
                                        </div>
                                    </div>
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${s.badge}`}>
                    {s.label}
                  </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-4">

                    {/* Active meds */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="font-bold text-[15px] mb-4 text-gray-800">
                            Medicamentos activos
                        </div>
                        <div className="flex flex-col gap-3">
                            {patientDashboardMeds.map((m) => {
                                const adh = m.total > 0 ? Math.round((m.taken / m.total) * 100) : 0;
                                const isDoc = m.source === "doctor";
                                const colTx = adh >= 80 ? "text-blue-500" : "text-amber-400";
                                const colBg = adh >= 80 ? "bg-blue-500"   : "bg-amber-400";
                                return (
                                    <div key={m.id} className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 text-base ${isDoc ? "bg-blue-50 text-blue-500" : "bg-violet-50 text-violet-500"}`}>
                                            💊
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <span className="text-sm font-bold truncate text-gray-800">{m.name}</span>
                                                <span className="text-xs text-gray-400">{m.dosage}</span>
                                            </div>
                                            <div className="w-full h-[4px] bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${colBg}`}
                                                    style={{ width: `${(m.taken / m.total) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className={`text-sm font-bold shrink-0 ${colTx}`}>{adh}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent symptoms */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="font-bold text-[15px] mb-4 text-gray-800">
                            Síntomas recientes
                        </div>
                        <div className="flex flex-col gap-2">
                            {recentSymptoms.map((s) => (
                                <div
                                    key={s.id}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg gap-2 ${s.high_severity_alert ? "bg-red-50" : "bg-gray-100"}`}
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[13px] font-semibold truncate text-gray-800">
                                            {s.symptom_name}
                                        </div>
                                        <div className="text-[11px] text-gray-400">{s.entry_date}</div>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {s.high_severity_alert && (
                                            <span className="bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">⚠</span>
                                        )}
                                        <span className={`w-3 h-3 rounded-full inline-block ${s.severity >= 8 ? "bg-red-500" : s.severity >= 5 ? "bg-amber-400" : "bg-green-400"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default PatientDashboard;