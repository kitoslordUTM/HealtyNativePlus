import React from "react";

const HealthyText = ({ text ="", className="", size = "text-base" }) => {
  return (
    <span
      className={`text-blue-400 font-bold ${size} ${className}`}
      style={{ fontFamily: "'Pathway Gothic One', sans-serif" }}
    >
      {text}
    </span>
  );
};

export default HealthyText;
