"use client";

import React, { useState } from "react";

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
            <div>
                <h1>Mis Medicamentos</h1>
                <p>Historial completo de tratamientos activos e inactivos</p>
                <button>Agregar medicamento</button>
            </div>

            <div>
                <input
                    placeholder="Buscar medicamento..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {(Object.keys(filterLabels) as MedFilter[]).map((f) => (
                    <button key={f} onClick={() => setFilter(f)}>
                        {filterLabels[f]}
                    </button>
                ))}
            </div>

            <div>
                <div>Rx — Prescrito por médico</div>
                <div>Propio — Agregado por ti</div>
            </div>

            <div>
                {filtered.map((m) => {
                    const adherence = Math.round((m.taken / m.total) * 100);
                    const isRx      = m.source === "doctor";
                    return (
                        <div key={m.id}>
                            <div>
                                <div>{/* Icon */}</div>
                                <div>
                                    <div>
                                        <span>{m.name}</span>
                                        <span>{isRx ? "Rx" : "Propio"}</span>
                                        {!m.is_active && <span>Inactivo</span>}
                                    </div>
                                    <div>{m.dosage} · cada {m.frequency_hours}h</div>
                                </div>
                            </div>

                            <div>{m.instructions}</div>

                            <div>
                                <div>
                                    <span>Adherencia</span>
                                    <span>{adherence}%</span>
                                </div>
                                <div>{/* ProgressBar */}</div>
                                <div>{m.taken} de {m.total} tomas completadas</div>
                            </div>

                            <div>
                                Inicio: {m.start_date}
                                {m.end_date  && <> · Fin: {m.end_date}</>}
                                {!m.end_date && <> · Crónico</>}
                            </div>

                            {!isRx && (
                                <div>
                                    <button>Editar</button>
                                    {m.is_active && <button>Eliminar</button>}
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