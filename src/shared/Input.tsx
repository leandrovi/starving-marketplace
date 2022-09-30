import Nullstack, { InputHTMLAttributes } from "nullstack";
import { AppClientContext } from "../../client";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  required?: boolean;
  helperText?: string;
}

class Input extends Nullstack<InputProps> {
  render({
    bind,
    label,
    description,
    required,
    helperText,
    ...rest
  }: AppClientContext<InputProps>) {
    return (
      <div class="flex flex-col mt-7">
        {label && (
          <label class="text-lg drop-shadow-[0_0_14px_rgba(255,255,255,0.7)] mb-1 font-light">
            {label}
            {required && " *"}
          </label>
        )}
        {description && (
          <p class="text-base text-lightGray2 font-light max-w-[340px] leading-[22px] mb-5">
            {description}
          </p>
        )}
        <input
          class="bg-darkGray border border-color-white py-3.5 px-4 text-base font-light disabled:bg-gray"
          bind={bind}
          {...rest}
        />
        {helperText && (
          <span class="text-sm text-lightGray font-light mt-[11px]">
            {helperText}
          </span>
        )}
      </div>
    );
  }
}

export default Input;
