
import "../../index.css";
export interface TextInputProps {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ label, type = "text", id, placeholder, ...props }: TextInputProps) => {
    return (
        <div className="flex flex-row items-center gap-10"
            style={{ width: "40%" }}  >

            <label htmlFor={id} className="font-serif text-m mb-2 mt-4 pl-1.5 shrink-0">
                {label}
            </label>

            <div className="relative w-full">
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    {...props}
                    className="w-full px-2 py-2 pr-8 rounded-md outline-1"
                />


            </div>

        </div>
    );
};

export { TextInput };