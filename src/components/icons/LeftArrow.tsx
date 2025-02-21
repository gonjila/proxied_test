interface IProps {
  width?: number;
  height?: number;
  color?: string;
}

function LeftArrow({ width, height, color }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={height || "24px"}
      height={width || "24px"}
      fill={color || "#e8eaed"}
    >
      <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
    </svg>
  );
}

export default LeftArrow;
