import React from "react";

const StatCard = ({ label, value, sub, icon }) => (
    <div>
        <div>{label}</div>
        <div>{value}</div>
        {sub && <div>{sub}</div>}
        {icon && <div>{icon}</div>}
    </div>
);

export default StatCard;