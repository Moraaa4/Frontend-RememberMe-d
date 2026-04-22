import React from "react";

const Card = ({ children, style, pad = 20, className }) => (
    <div
        className={`bg-white rounded-[14px] border border-gray-100 shadow-sm ${className ?? ""}`}
        style={{ padding: pad, ...style }}
    >
        {children}
    </div>
);

export default Card;