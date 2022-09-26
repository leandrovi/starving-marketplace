import Nullstack, {
  NullstackClientContext,
  MouseEventHandler,
} from "nullstack";

interface ButtonProps {
  bg?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onclick?: MouseEventHandler<HTMLButtonElement>;
}

class Button extends Nullstack<ButtonProps> {
  render({
    bg = "#FF8896",
    isLoading,
    onclick,
    children,
    disabled,
  }: NullstackClientContext<ButtonProps>) {
    return (
      <button
        class="disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] active:brightness-50 bg-pink text-black font-bold text-[18px] py-[18px] px-[27.5px] hover:brightness-90 ease-linear duration-200"
        style={`background-color: ${bg}`}
        onclick={onclick}
        disabled={disabled}
      >
        {isLoading ? (
          <img class="h-[27px] m-auto" src="/icons/loader.gif" />
        ) : (
          children
        )}
      </button>
    );
  }
}

export default Button;
