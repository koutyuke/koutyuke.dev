import type { FC } from "react";

import { resolveStrokeIconProps } from "./lucide-props";
import type { IconProps } from "./type";

export const AsteriskIcon: FC<IconProps> = (props) => {
  const { color, size, strokeWidth, svgProps } = resolveStrokeIconProps(props, 0.75);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      {...svgProps}
    >
      <path d="M6 0.75V11.25M0.75 6H11.25M2.25 2.25L9.75 9.75M9.75 2.25L2.25 9.75" />
    </svg>
  );
};
