import "../../index.css";
import type { TextSelectInputProps } from "./types/types";
import { ChevronDown } from "lucide-react";

const TextSelectInput = ({
    label,
    id,
    name,
    value,
    onChange,
    options = [],
    error,
    required,
}: TextSelectInputProps) => {
    return (
        <div className="flex flex-col w-full gap-1">

            {/* Label */}
            <label className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>

            {/* Select Wrapper (same structure as input) */}
            <div className="relative">
                <select
                    id={id}
                    name={name}
                    value={value ?? ""}
                    onChange={onChange}
                    className={`w-full px-3 py-2 pr-10 rounded-md border outline-none transition appearance-none
            ${error
                            ? "border-red-500 focus:ring-2 focus:ring-red-400"
                            : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                        }`}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Optional dropdown arrow */}
                <div className="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-2 top-1/2">
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export { TextSelectInput };