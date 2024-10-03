import { Image } from "antd";
import GridEffect from "../../../components/effects/grid-effect";

const DemoImg = () => {
  return (
    <div className="relative bg-turnary py-6">
      <div className="w-[90%] mx-auto overflow-hidden rounded-lg border p-8 bg-primary shadow-sm relative">
        <GridEffect />
        <div className="border border-white/50 rounded-lg overflow-hidden">
          <Image src="/bl-demo-img.png" alt="demo img" preview={false} />
        </div>
      </div>
    </div>
  );
};

export default DemoImg;
