"use client";

import React, { useState } from "react";

const AppShell = ({ role, onLogout }) => {
    const [screen, setScreen] = useState("dashboard");
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleSelectPatient = (p) => {
        setSelectedPatient(p);
        setScreen("patient-detail");
    };

    const handleNav = (id) => {
        setSelectedPatient(null);
        setScreen(id);
    };

    const renderContent = () => {
        if (role === "PATIENT") {
            switch (screen) {
                case "dashboard":   return <div>PatientDashboard</div>;
                case "medications": return <div>PatientMedications</div>;
                case "intakes":     return <div>PatientIntakes</div>;
                case "symptoms":    return <div>PatientSymptoms</div>;
                case "doctor":      return <div>PatientMyDoctor</div>;
                case "profile":     return <div>PatientProfile</div>;
                default:            return <div>PatientDashboard</div>;
            }
        }

        if (role === "DOCTOR") {
            switch (screen) {
                case "dashboard":
                case "patients":
                    return <div>DoctorDashboard</div>;
                case "patient-detail":
                    return <div>PatientDetail</div>;
                case "profile":
                    return <div>PatientProfile</div>;
                default:
                    return <div>DoctorDashboard</div>;
            }
        }

        return null;
    };

    return (
        <div>
            <div>{/* Sidebar */}</div>
            <main>
                {renderContent()}
            </main>
        </div>
    );
};

const App = () => {
    const [state, setState] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("rm_state") ?? "{}");
        } catch {
            return {};
        }
    });

    const login = (selectedRole) => {
        const r = selectedRole ?? "PATIENT";
        const newState = { authed: true, role: r };
        setState(newState);
        localStorage.setItem("rm_state", JSON.stringify(newState));
    };

    const logout = () => {
        localStorage.removeItem("rm_state");
        setState({});
    };

    if (!state.authed) return <div>AuthScreen</div>;
    return <AppShell role={state.role} onLogout={logout} />;
};

export { App };
export default AppShell;