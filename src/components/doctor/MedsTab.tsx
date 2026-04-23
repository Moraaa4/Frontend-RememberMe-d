"use client";

import React, { useState, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import Btn from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { C } from "@/lib/Colors";
import { IcPlus, IcPill, IcCheck, IcTrash } from "@/components/ui/Icons";
import type { DoctorPatient } from "@/types";
import type { ApiMedication } from "@/types/api";

interface PrescribeForm {
    name: string;
    dosage: string;
    freq: string;
    start: string;
    end: string;
    instructions: string;
}

interface MedsTabProps {
    patient: DoctorPatient;
}

const freqOptions: [string, string][] = [
    ["4",  "Cada 4h"],
    ["6",  "Cada 6h"],
    ["8",  "Cada 8h"],
    ["12", "Cada 12h"],
    ["24", "Una vez al día"],
];

const MedsTab: React.FC<MedsTabProps> = ({ patient }) => {
    const [meds, setMeds]         = useState<ApiMedication[]>([]);
    const [loading, setLoading]   = useState<boolean>(true);
    const [error, setError]       = useState<string>("");
    
    const [showForm, setShowForm] = useState<boolean>(false);
    const [saving, setSaving]     = useState<boolean>(false);
    const [formError, setFormError] = useState<string>("");
    const [form, setForm]         = useState<PrescribeForm>({
        name: "", dosage: "", freq: "8",
        start: new Date().toISOString().slice(0, 10),
        end: "", instructions: "",
    });

    const loadMeds = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/links/patients/${patient.id}/medications`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Error al cargar medicamentos");
            setMeds(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error al cargar medicamentos");
        } finally {
            setLoading(false);
        }
    }, [patient.id]);

    useEffect(() => {
        void loadMeds();
    }, [loadMeds]);

    const set =
        (k: keyof PrescribeForm) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
                setFormError("");
                setForm((p) => ({ ...p, [k]: e.target.value }));
            };

    const prescribe = async (): Promise<void> => {
        if (!form.name.trim() || !form.dosage.trim()) {
            setFormError("El nombre y dosis son requeridos");
            return;
        }
        setSaving(true);
        setFormError("");
        try {
            const res = await fetch(`/api/links/patients/${patient.id}/medications`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    dosage: form.dosage,
                    frequency_hours: parseInt(form.freq),
                    start_date: form.start,
                    end_date: form.end || undefined,
                    instructions: form.instructions || undefined,
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Error al prescribir");
            
            setMeds((prev) => [data as ApiMedication, ...prev]);
            setForm({
                name: "", dosage: "", freq: "8",
                start: new Date().toISOString().slice(0, 10),
                end: "", instructions: "",
            });
            setShowForm(false);
        } catch (e) {
            setFormError(e instanceof Error ? e.message : "Error al prescribir");
        } finally {
            setSaving(false);
        }
    };

    const removeMed = async (id: number): Promise<void> => {
        if (!confirm("¿Eliminar este medicamento?")) return;
        try {
            await fetch(`/api/links/patients/${patient.id}/medications/${id}`, { method: "DELETE" });
            setMeds((prev) => prev.filter((m) => m.id !== id));
        } catch {
            // silent fail
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="text-[15px] font-bold" style={{ color: C.text }}>
                    Medicamentos del paciente
                    {!loading && !error && (
                        <span className="text-[13px] font-normal ml-2" style={{ color: C.textMuted }}>
                            {meds.filter((m) => m.is_active).length} activos esta sesión
                        </span>
                    )}
                </div>
                <Btn icon={<IcPlus size={16} />} onClick={() => setShowForm(!showForm)}>
                    Prescribir medicamento
                </Btn>
            </div>

            {showForm && (
                <Card
                    className="mb-4"
                    style={{ borderLeft: `4px solid ${C.primary}`, background: C.primaryLight }}
                >
                    <div className="font-bold text-sm mb-3.5" style={{ color: C.primaryDark }}>
                        Nueva prescripción para {patient.full_name}
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                        <Input
                            label="Medicamento"
                            placeholder="Ej. Metformina"
                            value={form.name}
                            onChange={set("name")}
                            required
                        />
                        <Input
                            label="Dosis"
                            placeholder="Ej. 850mg"
                            value={form.dosage}
                            onChange={set("dosage")}
                            required
                        />
                        <div>
                            <label
                                className="text-[13px] font-semibold block mb-[5px]"
                                style={{ color: C.text }}
                            >
                                Frecuencia
                            </label>
                            <select
                                value={form.freq}
                                onChange={set("freq")}
                                className="w-full text-sm px-3.5 py-2.5 rounded-lg outline-none"
                                style={{
                                    fontFamily: "Nunito, sans-serif",
                                    border: `1.5px solid ${C.border}`,
                                    background: C.surface,
                                    color: C.text,
                                }}
                            >
                                {freqOptions.map(([v, l]) => (
                                    <option key={v} value={v}>{l}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <Input label="Fecha inicio" type="date" value={form.start} onChange={set("start")} />
                        <Input label="Fecha fin (vacío = crónico)" type="date" value={form.end} onChange={set("end")} />
                    </div>

                    <Input
                        label="Indicaciones"
                        placeholder="Ej. Tomar con alimentos, en ayunas..."
                        value={form.instructions}
                        onChange={set("instructions")}
                    />

                    {formError && (
                        <div className="mt-3 px-3 py-2 rounded-lg text-[13px] font-semibold" style={{ background: C.coralLight, color: C.coralDark }}>
                            {formError}
                        </div>
                    )}

                    <div className="flex gap-2.5 mt-3">
                        <Btn icon={<IcCheck size={16} />} onClick={() => void prescribe()} disabled={saving}>
                            {saving ? "Guardando..." : "Guardar prescripción"}
                        </Btn>
                        <Btn variant="ghost" onClick={() => setShowForm(false)}>
                            Cancelar
                        </Btn>
                    </div>
                </Card>
            )}

            {loading ? (
                <div className="text-sm py-10 text-center" style={{ color: C.textMuted }}>
                    Cargando medicamentos...
                </div>
            ) : error ? (
                <div className="text-sm py-10 text-center" style={{ color: C.coral }}>
                    {error}
                </div>
            ) : meds.length === 0 ? (
                <div className="text-sm py-10 text-center" style={{ color: C.textMuted }}>
                    No hay medicamentos registrados para el paciente.
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {meds.map((m) => {
                        return (
                            <Card
                                key={m.id}
                                pad={16}
                                style={{ borderLeft: `4px solid ${C.primary}` }}
                            >
                                <div className="flex items-center gap-3.5">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                        style={{
                                            background: C.primaryLight,
                                            color: C.primary,
                                        }}
                                    >
                                        <IcPill size={22} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-[3px]">
                                            <span className="text-[15px] font-bold" style={{ color: C.text }}>{m.name}</span>
                                            <span className="text-sm font-normal" style={{ color: C.textMuted }}>{m.dosage}</span>
                                        </div>
                                        <div className="text-[13px]" style={{ color: C.textMuted }}>Cada {m.frequency_hours}h</div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Btn variant="ghost" size="sm" icon={<IcTrash size={14} />} onClick={() => void removeMed(m.id)}>
                                            {" "}
                                        </Btn>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MedsTab;
