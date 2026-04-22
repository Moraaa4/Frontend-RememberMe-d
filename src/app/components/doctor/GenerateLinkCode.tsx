"use client";

import React, { useState } from "react";

const GenerateLinkCode = () => {
    const [code, setCode] = useState(null);

    const generate = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        const newCode = Array.from(
            { length: 6 },
            () => chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        setCode(newCode);
    };

    if (code) {
        return (
            <div>
                <div>
                    <div>Código de vinculación</div>
                    <div>{code}</div>
                    <div>Expira en 24 horas</div>
                </div>
                <button onClick={() => setCode(null)}>
                    Generar nuevo código
                </button>
            </div>
        );
    }

    return (
        <button onClick={generate}>
            Generar código
        </button>
    );
};

export default GenerateLinkCode;