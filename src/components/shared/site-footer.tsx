import siteConfig from "../../configs/site-config";

const SiteFooter = () => {
  return (
    <footer className="h-14 border-t border-gray-300">
      <div className="px-5 sm:container flex items-center h-full">
        <div className="text-balance text-center text-sm leading-loose md:text-left">
          Built by ❤️ {siteConfig.name}. © {new Date().getFullYear()}. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
