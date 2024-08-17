import { BiSpreadsheet } from "react-icons/bi";

import siteConfig from "../../configs/site-config";

interface LogoProps {
  hasText?: boolean;
}

const Logo = ({ hasText = false }: LogoProps) => {
  return (
    <div className="flex items-center justify-center space-x-1">
      <BiSpreadsheet className="size-8 p-1 rounded-full text-primary" />
      {hasText && (
        <span className="text-pretty font-semibold text-lg text-primary">
          {siteConfig.name}
        </span>
      )}
    </div>
  );
};

export default Logo;
