import Nullstack, { InputHTMLAttributes } from "nullstack";
import { AppClientContext } from "../../../client";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

class Input extends Nullstack<InputProps> {
  render({ bind, label, required, ...rest }: AppClientContext<InputProps>) {
    return (
      <div class="flex flex-col mt-7">
        {label && (
          <label class="text-lg drop-shadow-[0_0_14px_rgba(255,255,255,0.7)] mb-1 font-light">
            {label}
            {required && " *"}
          </label>
        )}
        <input
          class="bg-darkGray border border-color-white py-3.5 px-4 text-base font-normal disabled:bg-gray"
          bind={bind}
          {...rest}
        />
      </div>
    );
  }
}

export default Input;
