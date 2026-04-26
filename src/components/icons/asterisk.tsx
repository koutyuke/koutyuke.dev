import type { FC } from "react";

import type { IconProps } from "./type";

export const AsteriskIcon: FC<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      {...props}
    >
      <path d="M6 0.75V11.25M0.75 6H11.25M2.25 2.25L9.75 9.75M9.75 2.25L2.25 9.75" />
    </svg>
  );
};
