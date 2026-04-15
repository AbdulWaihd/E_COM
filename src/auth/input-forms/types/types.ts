interface TextInputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    name: string;
}

interface SelectOption {
    label: string;
    value: string;
}

interface TextSelectInputProps {
    label: string;
    id: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    error?: string;
    required?: boolean;
}

export type { TextSelectInputProps, SelectOption, TextInputProps };