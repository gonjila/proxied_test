import React from "react";

type IProps = {
  width?: number;
  height?: number;
  color?: string;
};

function Check({ width, height, color }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={height || "24px"}
      height={width || "24px"}
      fill={color || "#e8eaed"}
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}

export default Check;
