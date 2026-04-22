"use client";

import React from "react";

const Btn = ({ children, variant = "primary", size = "md", onClick, icon, full, className }) => (
    <button
        onClick={onClick}
        className={className}
        style={{ width: full ? "100%" : undefined }}
    >
        {icon && <span>{icon}</span>}
        {children}
    </button>
);

export default Btn;