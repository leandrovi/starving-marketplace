import Nullstack, { NullstackClientContext } from "nullstack";

interface IconTitleProps {
  iconSrc: string;
  iconAlt: string;
}

class IconTitle extends Nullstack<IconTitleProps> {
  render({
    children,
    iconSrc,
    iconAlt,
  }: NullstackClientContext<IconTitleProps>) {
    return (
      <div class="flex flex-row items-center">
        <img class="w-full max-w-[40px] mr-4" src={iconSrc} alt={iconAlt} />
        <h2 class="text-3xl drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]">
          {children}
        </h2>
      </div>
    );
  }
}

export default IconTitle;
