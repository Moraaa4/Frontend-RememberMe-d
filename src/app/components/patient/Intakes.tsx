"use client";

import React, { useState } from "react";

const initialIntakes = [
    { id: 1, medication: "Metformina",  dosage: "850mg",   scheduled_time: "08:00", status: "taken",   taken_at: "08:14" },
    { id: 2, medication: "Lisinopril",  dosage: "10mg",    scheduled_time: "08:00", status: "taken",   taken_at: "08:14" },
    { id: 3, medication: "Paracetamol", dosage: "500mg",   scheduled_time: "08:00", status: "taken",   taken_at: "08:30" },
    { id: 4, medication: "Metformina",  dosage: "850mg",   scheduled_time: "14:00", status: "pending", taken_at: null    },
    { id: 5, medication: "Paracetamol", dosage: "500mg",   scheduled_time: "16:00", status: "pending", taken_at: null    },
    { id: 6, medication: "Vitamina D3", dosage: "1000 UI", scheduled_time: "08:00", status: "taken",   taken_at: "08:20" },
];

const statusLabel = { taken: "Tomado", pending: "Pendiente", late: "Tarde", skipped: "Omitido" };

const statusClasses = {
    taken:   { bg: "bg-blue-50",  text: "text-blue-500",  badge: "bg-blue-100 text-blue-500"   },
    pending: { bg: "bg-amber-50", text: "text-amber-500", badge: "bg-amber-100 text-amber-500" },
    late:    { bg: "bg-red-50",   text: "text-red-400",   badge: "bg-red-100 text-red-400"     },
    skipped: { bg: "bg-gray-100", text: "text-gray-400",  badge: "bg-gray-200 text-gray-400"   },
};

const PatientIntakes = () => {
    const [intakes, setIntakes] = useState(initialIntakes);

    const taken = intakes.filter((t) => t.status === "taken").length;
    const total = intakes.length;
    const hours = [...new Set(intakes.map((t) => t.scheduled_time))].sort();

    const confirm = (id) => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        setIntakes((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: "taken", taken_at: timeStr } : t))
        );
    };

    const skip = (id) => {
        setIntakes((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: "skipped" } : t))
        );
    };

    return (
        <div>

            <div className="mb-7">
                <h1 className="text-[26px] font-extrabold m-0 text-gray-800">Tomas del día</h1>
                <p className="text-sm mt-1 mb-0 text-gray-400">
                    <strong className="text-gray-800">{taken}</strong> / {total} tomas registradas
                </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
                <div className="w-full h-[10px] bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${(taken / total) * 100}%` }}
                    />
                </div>
                <div className="grid grid-cols-4 gap-3 mt-4">
                    {[
                        { label: "Tomadas",    status: "taken",   color: "text-blue-500"  },
                        { label: "Pendientes", status: "pending", color: "text-amber-500" },
                        { label: "Tarde",      status: "late",    color: "text-red-400"   },
                        { label: "Omitidas",   status: "skipped", color: "text-gray-400"  },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <div className={`text-2xl font-extrabold ${s.color}`}>
                                {intakes.filter((t) => t.status === s.status).length}
                            </div>
                            <div className="text-[11px] font-semibold text-gray-400">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-5">
                {hours.map((hour) => {
                    const group    = intakes.filter((t) => t.scheduled_time === hour);
                    const allTaken = group.every((t) => t.status === "taken");
                    return (
                        <div key={hour} className="flex gap-4">
                            <div className="text-right shrink-0 pt-1" style={{ width: 52 }}>
                                <div className={`text-sm font-bold ${allTaken ? "text-blue-500" : "text-gray-800"}`}>
                                    {hour}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 flex-1 relative">
                                <div
                                    className={`absolute left-0 top-0 bottom-0 w-0.5 -ml-2 ${allTaken ? "bg-blue-500" : "bg-gray-100"}`}
                                />
                                {group.map((t) => {
                                    const s = statusClasses[t.status];
                                    return (
                                        <div key={t.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 ${s.bg} ${s.text}`}>
                                                    ✓
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold truncate text-gray-800">{t.medication}</div>
                                                    <div className="text-[12px] text-gray-400">{t.dosage}</div>
                                                    {t.status === "taken" && (
                                                        <div className="text-[11px] font-semibold mt-0.5 text-blue-500">
                                                            ✓ Registrado a las {t.taken_at}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    {t.status === "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() => confirm(t.id)}
                                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 border-none cursor-pointer transition-colors"
                                                            >
                                                                ✓ Confirmar
                                                            </button>
                                                            <button
                                                                onClick={() => skip(t.id)}
                                                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-400 bg-transparent border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                                                            >
                                                                Omitir
                                                            </button>
                                                        </>
                                                    )}
                                                    {t.status !== "pending" && (
                                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${s.badge}`}>
                              {statusLabel[t.status]}
                            </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default PatientIntakes;