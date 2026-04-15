import { useState } from "react";
import "../../index.css";
import type { TextInputProps } from "./types/types";



const TextInput = ({
    label,
    type = "text",
    placeholder,
    error,
    required,
    name,
    onChange,
    value,
    
}: TextInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
        <div className="flex flex-col w-full gap-1">
            {/* Label */}
            <label
                className="text-sm font-medium text-gray-700" 
            >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            <div className="relative">
                <input
                    type={isPassword && showPassword ? "text" : type}
                    onChange={onChange}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    className={`w-full px-3 py-2 pr-10 rounded-md border outline-none transition
            ${error
                            ? "border-red-500 focus:ring-2 focus:ring-red-400"
                            : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                        }`}
                />

                {/*  Password Toggle */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute text-sm text-gray-500 -translate-y-1/2 right-2 top-1/2"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export { TextInput };