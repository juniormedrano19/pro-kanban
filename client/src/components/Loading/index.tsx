import styles from "./loading.module.css";
import clsx from "clsx";

interface LoadingProps {
  size?: number;
  opacity?: number;
  thickness?: number;
  className?: string;
  firstColor?: string;
  secondColor?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 25,
  opacity = 0.8,
  thickness = 2,
  className,
  firstColor = "#FFFFFF",
  secondColor = "#0033A0",
}) => {
  const dynamicStyles = {
    width: `${size}px`,
    height: `${size}px`,
    opacity: opacity,
    borderWidth: `${thickness}px`,
    borderColor: `${firstColor} ${secondColor} ${secondColor} ${firstColor}`,
  };

  return (
    <div
      className={clsx(styles.loading, className)}
      style={dynamicStyles}
    ></div>
  );
};

export default Loading;
