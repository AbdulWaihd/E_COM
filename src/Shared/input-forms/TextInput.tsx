import "../../index.css";

export interface TextInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const TextInput = ({
  label,
  type = "text",
  id,
  placeholder,
  ...props
}: TextInputProps) => {

  return (

    <div
      className="flex items-center w-full gap-4"
    >

      <label
        htmlFor={id}
        className="w-32 font-serif text-md"
      >
        {label}
      </label>

      <div className="flex-1">

        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...props}
          className="w-full px-4 py-2 border rounded-md outline-none "
        />

      </div>

    </div>

  );
};

export { TextInput };