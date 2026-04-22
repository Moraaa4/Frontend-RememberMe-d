"use client";

import React, { useState } from "react";

const PatientMyDoctor = () => {
    const [linked, setLinked] = useState(true);
    const [code, setCode]     = useState("");

    const handleClaim = () => {
        if (code.trim().length >= 4) setLinked(true);
    };

    if (linked) {
        return (
            <div>
                <div>
                    <h1>Mi Médico</h1>
                    <p>Médico vinculado activamente</p>
                </div>

                <div>
                    {/* Doctor card */}
                    <div>
                        <div>
                            <div>{/* Avatar */}</div>
                            <div>
                                <div>Dra. Ana López Ramírez</div>
                                <div>Endocrinología</div>
                                <div>Clínica San José</div>
                            </div>
                        </div>

                        {[
                            { label: "Vinculados desde",  value: "2026-03-01"      },
                            { label: "Reportes enviados", value: "12 reportes"     },
                            { label: "Acceso a mis datos",value: "Meds + síntomas" },
                        ].map((f) => (
                            <div key={f.label}>
                                <div>{f.label}</div>
                                <div>{f.value}</div>
                            </div>
                        ))}

                        <button onClick={() => setLinked(false)}>
                            Desvincular médico
                        </button>
                    </div>

                    {/* Right column */}
                    <div>
                        {/* What can the doctor see */}
                        <div>
                            <div>¿Qué puede ver tu médico?</div>
                            <div>
                                {[
                                    "Tu historial de tomas y adherencia",
                                    "Registro de síntomas con severidad",
                                    "Lista de medicamentos activos y propios",
                                    "Estadísticas de evolución clínica",
                                ].map((item) => (
                                    <div key={item}>
                                        <span>✓</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Change doctor */}
                        <div>
                            <div>¿Quieres cambiar de médico?</div>
                            <p>
                                Primero deberás desvincular a tu médico actual. Luego podrás
                                ingresar un nuevo código de vinculación.
                            </p>
                            <button onClick={() => setLinked(false)}>Solicitar cambio</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h1>Vincular con un médico</h1>
                <p>Ingresa el código que te proporcionó tu médico</p>
            </div>

            <div>
                <div>{/* Icon */}</div>
                <input
                    placeholder="Ej. AB3X7K"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                />
                <button onClick={handleClaim}>Vincular con médico</button>
                <p>El código expira en 24 horas. Solicita uno nuevo si ya venció.</p>
            </div>
        </div>
    );
};

export default PatientMyDoctor;