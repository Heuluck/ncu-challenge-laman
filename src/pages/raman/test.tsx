import { Line, type LineConfig } from "@ant-design/charts";
import { useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { csvToData } from "../../utils/csv";

const { Dragger } = Upload;

const DemoLine = () => {
  const [data, setData] = useState<{
    name: string;
    data: { wavelength: number; intensity: number }[];
  }>();

  const config: LineConfig = {
    data: data?.data,
    title: {
      title: data?.name || "拉曼光谱示例图",
      subtitle: "拉曼光谱示例图",
    },
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
      {data && (
        <div className="w-full max-w-[900px] overflow-scroll">
          <div className="w-[900px]">
            <Line {...config} />
          </div>
        </div>
      )}
      <Dragger
        name="file"
        className="w-full"
        multiple={false}
        maxCount={1}
        onChange={(info) => {
          const currentFile = info.fileList?.[0];
          if (currentFile) {
            const file = currentFile.originFileObj as File;
            const reader = new FileReader();
            reader.onload = (e) => {
              const text = e.target?.result as string;
              const parsed = csvToData(text);
              setData({
                name:
                  currentFile.originFileObj?.name?.replace(/\.csv$/i, "") ||
                  "未知文档名",
                data: parsed,
              });
            };
            reader.readAsText(file);
          }
        }}
        beforeUpload={() => false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">上传拉曼光谱数据</p>
        <p className="ant-upload-hint">本地测试 csv 处理用的</p>
      </Dragger>
    </div>
  );
};

export default DemoLine;
