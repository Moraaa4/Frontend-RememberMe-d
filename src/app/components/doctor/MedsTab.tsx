"use client";

import React, { useState } from "react";

const MedsTab = ({ patient }) => {
    const [meds, setMeds] = useState(initialDetailMeds);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        name: "", dosage: "", freq: "8",
        start: "2026-04-22", end: "", instructions: "",
    });

    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    const prescribe = () => {
        if (!form.name.trim() || !form.dosage.trim()) return;
        const freq = parseInt(form.freq);
        setMeds((prev) => [{
            id: Date.now(), name: form.name, dosage: form.dosage,
            freq, taken: 0, total: Math.round(24 / freq), is_active: true, source: "doctor",
        }, ...prev]);
        setForm({ name: "", dosage: "", freq: "8", start: "2026-04-22", end: "", instructions: "" });
        setShowForm(false);
    };

    const removeMed = (id) => setMeds((prev) => prev.filter((m) => m.id !== id));

    return (
        <div>

            {/* Header */}
            <div>
                <div>
                    Medicamentos del paciente
                    <span>{meds.filter((m) => m.is_active).length} activos</span>
                </div>
                <button onClick={() => setShowForm(!showForm)}>
                    Prescribir medicamento
                </button>
            </div>

            {/* Prescription form */}
            {showForm && (
                <div>
                    <div>Nueva prescripción para {patient.full_name}</div>
                    <div>
                        <input placeholder="Ej. Metformina" value={form.name} onChange={set("name")} />
                        <input placeholder="Ej. 850mg"      value={form.dosage} onChange={set("dosage")} />
                        <select value={form.freq} onChange={set("freq")}>
                            {[["4","Cada 4h"],["6","Cada 6h"],["8","Cada 8h"],["12","Cada 12h"],["24","Una vez al día"]].map(([v, l]) => (
                                <option key={v} value={v}>{l}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input type="date" value={form.start} onChange={set("start")} />
                        <input type="date" value={form.end}   onChange={set("end")} />
                    </div>
                    <input placeholder="Ej. Tomar con alimentos..." value={form.instructions} onChange={set("instructions")} />
                    <div>
                        <button onClick={prescribe}>Guardar prescripción</button>
                        <button onClick={() => setShowForm(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {/* Medication list */}
            <div>
                {meds.map((m) => {
                    const adh = m.total > 0 ? Math.round((m.taken / m.total) * 100) : 0;
                    const isRx = m.source === "doctor";
                    return (
                        <div key={m.id}>
                            <div>{/* Icon */}</div>
                            <div>
                                <div>
                                    <span>{m.name}</span>
                                    <span>{m.dosage}</span>
                                    <span>{isRx ? "Rx" : "Propio"}</span>
                                </div>
                                <div>Cada {m.freq}h</div>
                            </div>
                            <div>
                                <div>{m.taken}/{m.total} tomas · {adh}%</div>
                                <div>{/* ProgressBar */}</div>
                            </div>
                            {isRx && (
                                <button onClick={() => removeMed(m.id)}>Eliminar</button>
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default MedsTab;