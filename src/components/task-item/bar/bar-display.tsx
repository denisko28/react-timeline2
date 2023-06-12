import React from "react";
import style from "./bar.module.css";
import { BarHighlight } from "../../../types/bar-task";

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
  highlights?: BarHighlight[];
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export const BarDisplay: React.FC<BarDisplayProps> = ({
  x,
  y,
  width,
  height,
  isSelected,
  progressX,
  progressWidth,
  barCornerRadius,
  styles,
  onMouseDown,
  highlights,
}) => {
  const getProcessColor = () => {
    return isSelected ? styles.progressSelectedColor : styles.progressColor;
  };

  const getBarColor = () => {
    return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
  };

  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.barBackground}
      />
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />
      {highlights?.map(highlight => {
        const width = highlight.x2 - highlight.x1;
        return (
          <rect
            key={highlight.x1}
            x={highlight.x1}
            width={width > 0 ? width : 10}
            y={y}
            height={height}
            rx={barCornerRadius}
            ry={barCornerRadius}
            fill={highlight.color ?? "grey"}
          />
        );
      })}
    </g>
  );
};
