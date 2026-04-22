import React from "react";
import type { StatCardProps } from "@/types";
import { C } from "@/lib/Colors";

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, icon, accent }) => {
    const col = accent ?? C.primary;

    return (
        <div
            className="bg-white rounded-[14px] border border-[#E5E7EB] p-5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] relative overflow-hidden"
        >
            <div className="text-[13px] font-semibold mb-2" style={{ color: C.textMuted }}>
                {label}
            </div>
            <div className="text-[28px] font-extrabold" style={{ color: col, lineHeight: 1.1 }}>
                {value}
            </div>
            {sub && (
                <div className="text-xs mt-1.5" style={{ color: C.textMuted }}>{sub}</div>
            )}
            {icon && (
                <div
                    style={{
                        position: "absolute", top: 16, right: 16,
                        color: col, opacity: 0.3,
                    }}
                >
                    {icon}
                </div>
            )}
        </div>
    );
};

export default StatCard;