import React from "react";

export interface ButtonProps {
    btnTxt?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const Button = ({ 
    btnTxt, 
    onClick, 
    type = "button", 
    className = "", 
    style = {},
    children 
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${className}`}
            style={style}
        >
            {children || btnTxt}
        </button>
    )
}
export default Button;