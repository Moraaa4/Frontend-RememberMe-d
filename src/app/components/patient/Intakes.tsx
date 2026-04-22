"use client";

import React, { useState } from "react";

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

            {/* Header */}
            <div>
                <h1>Tomas del día</h1>
                <p><strong>{taken}</strong> / {total} tomas registradas</p>
            </div>

            {/* Global progress */}
            <div>
                <div>{/* ProgressBar */}</div>
                <div>
                    {[
                        { label: "Tomadas",    status: "taken"   },
                        { label: "Pendientes", status: "pending" },
                        { label: "Tarde",      status: "late"    },
                        { label: "Omitidas",   status: "skipped" },
                    ].map((s) => (
                        <div key={s.label}>
                            <div>{intakes.filter((t) => t.status === s.status).length}</div>
                            <div>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div>
                {hours.map((hour) => {
                    const group = intakes.filter((t) => t.scheduled_time === hour);
                    return (
                        <div key={hour}>
                            <div>{hour}</div>
                            <div>
                                {group.map((t) => (
                                    <div key={t.id}>
                                        <div>{/* Icon */}</div>
                                        <div>
                                            <div>{t.medication}</div>
                                            <div>{t.dosage}</div>
                                            {t.status === "taken" && (
                                                <div>✓ Registrado a las {t.taken_at}</div>
                                            )}
                                        </div>
                                        <div>
                                            {t.status === "pending" && (
                                                <>
                                                    <button onClick={() => confirm(t.id)}>Confirmar</button>
                                                    <button onClick={() => skip(t.id)}>Omitir</button>
                                                </>
                                            )}
                                            {t.status !== "pending" && (
                                                <span>{t.status}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default PatientIntakes;