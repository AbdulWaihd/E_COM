import { Search } from "lucide-react";
import "../../index.css";

interface SearchBarInputProps {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBarInput = ({
    id,
    placeholder = "Search products...",
    value,
    onChange,
    onKeyDown,
}: SearchBarInputProps) => {
    return (
        <div className="relative w-full group">
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="w-full px-6 py-2.5 pr-12 text-sm transition-all bg-slate-100 border-none rounded-full outline-none ring-0 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:shadow-sm"
                style={{
                    color: "var(--text)",
                }}
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <Search size={18} className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
        </div>
    );
};

export { SearchBarInput };