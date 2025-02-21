import Cart from "./Cart";
import LeftArrow from "./LeftArrow";
import Plus from "./Plus";

interface IconProps {
  iconName: IconNameType;
  width?: number;
  height?: number;
  color?: string;
}

type IconNameType = "cart" | "leftArrow" | "plus";

const Icon = ({ iconName, width, height, color }: IconProps) => {
  let IconComponet = null;

  switch (iconName) {
    case "cart":
      IconComponet = Cart;
      break;
    case "leftArrow":
      IconComponet = LeftArrow;
      break;
    case "plus":
      IconComponet = Plus;
      break;
    default: {
      return null;
    }
  }

  return <IconComponet width={width} height={height} color={color} />;
};

export default Icon;
