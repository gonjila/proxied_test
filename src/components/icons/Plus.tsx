interface IProps {
  width?: number;
  height?: number;
  color?: string;
}

function Plus({ width, height, color }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={height || "24px"}
      height={width || "24px"}
      fill={color || "#e8eaed"}
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
}

export default Plus;
