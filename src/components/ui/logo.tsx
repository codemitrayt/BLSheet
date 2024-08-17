import { BiSpreadsheet } from "react-icons/bi";

import siteConfig from "../../configs/site-config";
import { cn } from "../../utils";

interface LogoProps {
  hasText?: boolean;
  className?: string;
}

const Logo = ({ hasText = false, className }: LogoProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-1 text-primary",
        className
      )}
    >
      <BiSpreadsheet className="size-8 p-1 rounded-full" />
      {hasText && (
        <span className="text-pretty font-semibold text-lg">
          {siteConfig.name}
        </span>
      )}
    </div>
  );
};

export default Logo;
