import { Line, type LineConfig } from "@ant-design/charts";
import ramanTestData from "../../test/raman-test-data";

const DemoLine = () => {
  const data = ramanTestData.data;
  const config: LineConfig = {
    data,
    title: { title: ramanTestData.name, subtitle: "拉曼光谱示例图" },
    xField: "wavelength",
    yField: "intensity",
    width: 900,
    axis: {
      x: {
        title: "拉曼波长（1/cm）",
      },
      y: {
        title: "强度",
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div className="overflow-scroll w-full max-w-[900px]">
        <div className="w-[900px]">
        <Line {...config} />
        </div>
      </div>
    </div>
  );
};

export default DemoLine;
