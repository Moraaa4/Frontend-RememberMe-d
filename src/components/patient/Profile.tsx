"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { C } from "@/lib/Colors";
import type { ApiUser, ApiMedicalProfile } from "@/types/api";

interface Props {
    userName: string;
    role: "PATIENT" | "DOCTOR";
}

function calcAge(dob: string | null): string {
    if (!dob) return "—";
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age--;
    return `${age} años`;
}

const PatientProfile: React.FC<Props> = ({ userName, role: userRole }) => {
    const [user, setUser]       = useState<ApiUser | null>(null);
    const [profile, setProfile] = useState<ApiMedicalProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving]   = useState(false);
    const [form, setForm]       = useState({
        allergies: "",
        chronic_conditions: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
    });

    useEffect(() => {
        const fetches = [fetch("/api/auth/profile").then((r) => r.json())];
        if (userRole === "PATIENT") {
            fetches.push(fetch("/api/medical-profiles/me").then((r) => (r.ok ? r.json() : null)));
        }
        
        Promise.all(fetches)
            .then(([u, p]) => {
                setUser(u as ApiUser);
                if (p) {
                    setProfile(p as ApiMedicalProfile);
                    setForm({
                        allergies: p.allergies || "",
                        chronic_conditions: p.chronic_conditions || "",
                        emergency_contact_name: p.emergency_contact_name || "",
                        emergency_contact_phone: p.emergency_contact_phone || "",
                    });
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [userRole]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/medical-profiles/me", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            const updated = await res.json() as ApiMedicalProfile;
            setProfile(updated);
            setEditing(false);
        } catch {
            alert("Error al guardar el perfil");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="text-sm text-center py-16" style={{ color: C.textMuted }}>
                Cargando perfil…
            </div>
        );
    }

    const displayName = user?.full_name ?? userName;
    const role        = user?.role ?? "PATIENT";
    const roleLabel   = role === "PATIENT" ? "Paciente" : "Médico";
    const roleBadge   = role === "PATIENT" ? "patient" : "doctor";

    const personalFields = [
        { label: "Correo electrónico",  value: user?.email ?? "—" },
        { label: "Teléfono",            value: user?.phone ?? "—" },
        { label: "Fecha de nacimiento", value: user?.date_of_birth
            ? `${new Date(user.date_of_birth).toLocaleDateString("es-MX")} (${calcAge(user.date_of_birth)})`
            : "—" },
        { label: "Registro",            value: user?.created_at
            ? new Date(user.created_at).toLocaleDateString("es-MX")
            : "—" },
    ];

    return (
        <div>
            <div className="mb-7 flex justify-between items-center">
                <div>
                    <h1 className="text-[26px] font-extrabold m-0" style={{ color: C.text }}>
                        Mi Perfil
                    </h1>
                    <p className="text-sm mt-1 mb-0" style={{ color: C.textMuted }}>
                        Información personal y perfil clínico
                    </p>
                </div>
                {role === "PATIENT" && !editing && (
                    <button 
                        onClick={() => setEditing(true)}
                        className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                        style={{ background: C.primary, color: "white" }}
                    >
                        Editar perfil clínico
                    </button>
                )}
            </div>

            <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="flex flex-col gap-4">
                    <Card>
                        <div className="flex items-center gap-4 mb-5">
                            <Avatar name={displayName} size={64} color={C.primary} />
                            <div>
                                <div className="text-lg font-extrabold" style={{ color: C.text }}>
                                    {displayName}
                                </div>
                                <div className="text-sm mb-1.5" style={{ color: C.textMuted }}>
                                    {user?.date_of_birth ? `${calcAge(user.date_of_birth)} · ` : ""}{roleLabel}
                                </div>
                                <Badge label={roleLabel} variant={roleBadge as "patient" | "doctor"} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            {personalFields.map((f) => (
                                <div key={f.label} className="px-3 py-2.5 rounded-lg bg-gray-100">
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.04em] mb-1" style={{ color: C.textMuted }}>
                                        {f.label}
                                    </div>
                                    <div className="text-sm font-semibold" style={{ color: C.text }}>
                                        {f.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {role === "PATIENT" && (
                    <div className="flex flex-col gap-4">
                        <Card>
                            <div className="font-bold text-[15px] mb-4 flex justify-between items-center" style={{ color: C.text }}>
                                <span>Perfil clínico</span>
                                {editing && (
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setEditing(false)}
                                            className="text-xs font-bold px-3 py-1.5 rounded-md bg-gray-100"
                                            style={{ color: C.textMuted }}
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="text-xs font-bold px-3 py-1.5 rounded-md"
                                            style={{ background: C.primary, color: "white" }}
                                        >
                                            {saving ? "Guardando..." : "Guardar"}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-3.5">
                                <div
                                    className="px-3.5 py-3 rounded-lg"
                                    style={{ background: C.coralLight, borderLeft: `3px solid ${C.coral}` }}
                                >
                                    <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1" style={{ color: C.coralDark }}>
                                        Alergias
                                    </div>
                                    {editing ? (
                                        <textarea 
                                            className="w-full bg-transparent text-sm outline-none border-b border-coral/20 focus:border-coral transition-all py-1"
                                            value={form.allergies}
                                            onChange={(e) => setForm({...form, allergies: e.target.value})}
                                            placeholder="Registra tus alergias..."
                                        />
                                    ) : (
                                        <div className="text-sm" style={{ color: C.text }}>
                                            {profile?.allergies || "Sin alergias registradas"}
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="px-3.5 py-3 rounded-lg"
                                    style={{ background: C.amberLight, borderLeft: `3px solid ${C.amber}` }}
                                >
                                    <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1" style={{ color: C.amberDark }}>
                                        Condiciones crónicas
                                    </div>
                                    {editing ? (
                                        <textarea 
                                            className="w-full bg-transparent text-sm outline-none border-b border-amber/20 focus:border-amber transition-all py-1"
                                            value={form.chronic_conditions}
                                            onChange={(e) => setForm({...form, chronic_conditions: e.target.value})}
                                            placeholder="Registra tus condiciones crónicas..."
                                        />
                                    ) : (
                                        <div className="text-sm" style={{ color: C.text }}>
                                            {profile?.chronic_conditions || "Sin condiciones crónicas registradas"}
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="px-3.5 py-3 rounded-lg"
                                    style={{ background: C.primaryLight, borderLeft: `3px solid ${C.primary}` }}
                                >
                                    <div className="text-[11px] font-bold uppercase tracking-[0.04em] mb-1" style={{ color: C.primaryDark }}>
                                        Contacto de emergencia
                                    </div>
                                    {editing ? (
                                        <div className="flex flex-col gap-2">
                                            <input 
                                                className="w-full bg-transparent text-sm outline-none border-b border-primary/20 focus:border-primary transition-all py-1"
                                                value={form.emergency_contact_name}
                                                onChange={(e) => setForm({...form, emergency_contact_name: e.target.value})}
                                                placeholder="Nombre del contacto"
                                            />
                                            <input 
                                                className="w-full bg-transparent text-sm outline-none border-b border-primary/20 focus:border-primary transition-all py-1"
                                                value={form.emergency_contact_phone}
                                                onChange={(e) => setForm({...form, emergency_contact_phone: e.target.value})}
                                                placeholder="Teléfono del contacto"
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-sm" style={{ color: C.text }}>
                                            {profile?.emergency_contact_name
                                                ? `${profile.emergency_contact_name}${profile.emergency_contact_phone ? ` · ${profile.emergency_contact_phone}` : ""}`
                                                : "Sin contacto de emergencia registrado"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientProfile;
