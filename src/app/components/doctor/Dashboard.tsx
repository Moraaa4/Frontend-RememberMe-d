"use client";

import React, { useState } from "react";

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
        <div>

            {/* Welcome */}
            <div>
                <div>Martes 22 de abril, 2026</div>
                <h1>Panel Médico</h1>
                <p>Bienvenida, <strong>Dra. Ana López</strong></p>
            </div>

            {/* Stats */}
            <div>
                <div>
                    <div>Pacientes</div>
                    <div>{doctorPatients.length}</div>
                    <div>Vinculados activos</div>
                </div>
                <div>
                    <div>Adherencia promedio</div>
                    <div>{avgAdherence}%</div>
                    <div>Todos los pacientes</div>
                </div>
                <div>
                    <div>Alertas activas</div>
                    <div>{alerts}</div>
                    <div>Requieren atención</div>
                </div>
                <div>
                    <div>Esta semana</div>
                    <div>148</div>
                    <div>Tomas registradas</div>
                </div>
            </div>

            {/* Alert strip */}
            {alerts > 0 && (
                <div>
                    <div>Pacientes que requieren atención</div>
                    <div>
                        {doctorPatients.filter((p) => p.alert).map((p) => (
                            <div key={p.id} onClick={() => onSelectPatient(p)}>
                                <div>{p.full_name}</div>
                                <div>
                                    {p.adherence_pct < 70
                                        ? `Adherencia baja: ${p.adherence_pct}%`
                                        : "Síntoma de alta severidad"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main grid */}
            <div>

                {/* Patient list */}
                <div>
                    <div>
                        <div>Mis Pacientes</div>
                        <input
                            placeholder="Buscar paciente..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        {filtered.map((p) => (
                            <div key={p.id} onClick={() => onSelectPatient(p)}>
                                <div>{p.full_name}</div>
                                <div>
                                    <span>{p.full_name}</span>
                                    {p.alert && <span>Alerta</span>}
                                </div>
                                <div>{p.conditions} · {p.meds} medicamentos</div>
                                <div>
                                    <div>{p.adherence_pct}%</div>
                                    <div>adherencia</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div>

                    {/* Link code */}
                    <div>
                        <div>Vincular nuevo paciente</div>
                        <p>Genera un código único. Tu paciente deberá ingresarlo en las próximas 24 horas.</p>
                        <div>{/* GenerateLinkCode */}</div>
                    </div>

                    {/* Weekly summary */}
                    <div>
                        <div>Resumen de la semana</div>
                        {[
                            { label: "Tomas registradas",   value: "148" },
                            { label: "Síntomas reportados", value: "23"  },
                            { label: "Alertas generadas",   value: "5"   },
                        ].map((x) => (
                            <div key={x.label}>
                                <span>{x.label}</span>
                                <span>{x.value}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
};

export { doctorPatients };
export default DoctorDashboard;