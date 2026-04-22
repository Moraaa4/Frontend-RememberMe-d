"use client";

import React from "react";

const PatientDashboard = () => {
    const taken   = todayIntakes.filter((t) => t.status === "taken").length;
    const pending = todayIntakes.filter((t) => t.status === "pending").length;

    return (
        <div>

            {/* Welcome */}
            <div>
                <div>Martes 22 de abril, 2026</div>
                <h1>Buenos días, Juan 👋</h1>
                <p>Llevas <strong>5 días</strong> con adherencia perfecta. ¡Sigue así!</p>
            </div>

            {/* Stats row */}
            <div>
                <div>
                    <div>87%</div>
                    <div>Adherencia mensual</div>
                </div>
                <div>
                    <div>{pending}</div>
                    <div>Tomas pendientes</div>
                </div>
                <div>
                    <div>5🔥</div>
                    <div>Días de racha</div>
                </div>
            </div>

            <div>

                {/* Today's intakes */}
                <div>
                    <div>
                        Tomas de hoy
                        <span>{taken}/{todayIntakes.length}</span>
                    </div>
                    <div>{/* ProgressBar */}</div>
                    <div>
                        {todayIntakes.map((t) => (
                            <div key={t.id}>
                                <div>
                                    <div>{t.medication}</div>
                                    <div>{t.dosage} · {t.scheduled_time}</div>
                                </div>
                                <span>{t.status}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div>

                    {/* Active meds */}
                    <div>
                        <div>Medicamentos activos</div>
                        <div>
                            {patientDashboardMeds.map((m) => {
                                const adh = m.total > 0 ? Math.round((m.taken / m.total) * 100) : 0;
                                return (
                                    <div key={m.id}>
                                        <div>{/* Icon */}</div>
                                        <div>
                                            <div>
                                                <span>{m.name}</span>
                                                <span>{m.dosage}</span>
                                            </div>
                                            <div>{/* ProgressBar */}</div>
                                        </div>
                                        <div>{adh}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent symptoms */}
                    <div>
                        <div>Síntomas recientes</div>
                        <div>
                            {recentSymptoms.map((s) => (
                                <div key={s.id}>
                                    <div>
                                        <div>{s.symptom_name}</div>
                                        <div>{s.entry_date}</div>
                                    </div>
                                    <div>
                                        {s.high_severity_alert && <span>⚠</span>}
                                        <span>{s.severity}</span>
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