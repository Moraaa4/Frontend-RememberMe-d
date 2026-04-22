import React from "react";

const Card = ({ children, style, pad = 20, className }) => (
    <div className={className} style={{ padding: pad, ...style }}>
        {children}
    </div>
);

export default Card;