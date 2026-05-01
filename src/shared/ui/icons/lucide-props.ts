import type { IconProps } from "./type";

type IconSvgProps = Omit<IconProps, "absoluteStrokeWidth" | "color" | "size" | "strokeWidth">;

type ResolvedStrokeIconProps = {
  color: string;
  size: IconProps["size"];
  strokeWidth: IconProps["strokeWidth"];
  svgProps: IconSvgProps;
};

export function resolveStrokeIconProps(
  { absoluteStrokeWidth, color = "currentColor", size = 24, strokeWidth, ...svgProps }: IconProps,
  defaultStrokeWidth: IconProps["strokeWidth"] = 2,
): ResolvedStrokeIconProps {
  const resolvedStrokeWidth = strokeWidth ?? defaultStrokeWidth;
  const numericSize = typeof size === "number" ? size : Number.parseFloat(size);
  const numericStrokeWidth =
    typeof resolvedStrokeWidth === "number"
      ? resolvedStrokeWidth
      : Number.parseFloat(resolvedStrokeWidth);
  const scaledStrokeWidth =
    absoluteStrokeWidth && Number.isFinite(numericSize) && Number.isFinite(numericStrokeWidth)
      ? (numericStrokeWidth * 24) / numericSize
      : resolvedStrokeWidth;

  return {
    color,
    size,
    strokeWidth: scaledStrokeWidth,
    svgProps,
  };
}

export function resolveFillIconProps({
  absoluteStrokeWidth: _absoluteStrokeWidth,
  color = "currentColor",
  size = 24,
  strokeWidth: _strokeWidth,
  ...svgProps
}: IconProps) {
  void _absoluteStrokeWidth;
  void _strokeWidth;

  return {
    color,
    size,
    svgProps,
  };
}
