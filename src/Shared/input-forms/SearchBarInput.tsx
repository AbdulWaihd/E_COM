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
        <div className="relative w-full">
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="w-full px-4 py-2 pr-10 rounded-md outline outline-1 focus:outline-2"
                style={{
                    backgroundColor: "var(--header-search-bg)",
                    color: "var(--text)",
                }}
            />

            {/*  Search Icon (optional but recommended) */}
            <span className="absolute text-sm -translate-y-1/2 right-3 top-1/2 opacity-60">

            </span>
        </div>
    );
};

export { SearchBarInput };