import { Tooltip } from "antd";
import { VscGithub } from "react-icons/vsc";

const GithubStar = () => {
  return (
    <Tooltip title="Give a ⭐ on GitHub">
      <a
        href="https://github.com/codemitrayt/BLSheet"
        target="__blank"
        className="flex items-center justify-center text-sm"
      >
        <VscGithub className="size-7 text-gray-800" />
      </a>
    </Tooltip>
  );
};

export default GithubStar;
