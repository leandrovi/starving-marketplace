import Nullstack, { TextareaHTMLAttributes } from "nullstack";
import { AppClientContext } from "../../client";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  description?: string;
}

class Textarea extends Nullstack<TextareaProps> {
  render({
    bind,
    label,
    required,
    helperText,
    description,
    ...rest
  }: AppClientContext<TextareaProps>) {
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
        <textarea
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

export default Textarea;
