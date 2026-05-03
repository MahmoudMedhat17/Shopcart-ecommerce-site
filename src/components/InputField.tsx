import {
  UseFormRegister,
  FieldError,
  RegisterOptions,
  Path,
  FieldValues,
} from "react-hook-form";
import { Label } from "@/components/ui/label";

type InputFieldProps<TFormValues extends FieldValues> = {
  id: Path<TFormValues>;
  label: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  error?: FieldError;
};

const InputField = <TFormValues extends FieldValues>({
  id,
  label,
  placeholder,
  type = "text",
  register,
  rules,
  error,
}: InputFieldProps<TFormValues>) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="font-semibold">
        {label}
      </Label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id, rules)}
        className="w-full p-2 rounded-md outline-none border border-gray-300 focus:border-shop-dark-green duration-300"
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;
