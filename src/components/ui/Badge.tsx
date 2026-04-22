import React from "react";
import type { BadgeProps } from "@/types";
import { C } from "@/lib/Colors";

type BadgeStyle = { bg: string; color: string };

const map: Record<NonNullable<BadgeProps["variant"]>, BadgeStyle> = {
    taken:    { bg: C.primaryLight, color: C.primaryDark },
    pending:  { bg: C.amberLight,   color: C.amberDark   },
    late:     { bg: C.coralLight,   color: C.coralDark   },
    skipped:  { bg: C.borderLight,  color: C.textMuted   },
    active:   { bg: C.primaryLight, color: C.primaryDark },
    inactive: { bg: C.borderLight,  color: C.textMuted   },
    alert:    { bg: C.coralLight,   color: C.coralDark   },
    doctor:   { bg: C.violetLight,  color: C.violet      },
    patient:  { bg: C.primaryLight, color: C.primaryDark },
    default:  { bg: C.borderLight,  color: C.textMuted   },
};

const Badge: React.FC<BadgeProps> = ({ label, variant = "default", dot }) => {
    const s = map[variant] ?? map.default;
    return (
        <span
            style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: 11, fontWeight: 700,
                background: s.bg, color: s.color,
                padding: "4px 10px", borderRadius: 999,
                whiteSpace: "nowrap",
            }}
        >
      {dot && (
          <span
              style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: s.color, flexShrink: 0,
              }}
          />
      )}
            {label}
    </span>
    );
};

export default Badge;