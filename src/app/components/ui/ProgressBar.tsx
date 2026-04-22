import React from "react";

const ProgressBar = ({ value, max = 100, color = "#60a5fa", height = 6 }) => {
    const pct = Math.min(100, Math.round((value / max) * 100));

    return (
        <div
            className="w-full rounded-full overflow-hidden bg-gray-100"
            style={{ height }}
        >
            <div
                className="h-full rounded-full transition-[width] duration-300 ease-in-out"
                style={{ width: `${pct}%`, background: color }}
            />
        </div>
    );
};

export default ProgressBar;