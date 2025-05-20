import { FC } from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`text-white font-black relative mx-auto select-none ${className}`}>
      {children}
    </div>
  );
};

export default GlitchText; 