import { Line, type LineConfig } from "@ant-design/charts";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Spin, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { csvToData } from "../../utils/csv";
import { getFile } from "../../api/file/file";

const { Dragger } = Upload;

const RamanDetailPage = () => {
  const [ramanData, setRamanData] =
    useState<
      { wavelength: number; intensity: number; category: string | undefined }[]
    >();

  const config: LineConfig = {
    data: ramanData,
    title: {
      title: "拉曼光谱示例图",
      subtitle: "拉曼光谱示例图",
    },
    xField: "wavelength",
    yField: "intensity",
    width: 900,
    height: 500,
    tooltip: {
      title: "",
      items: [
        (datum) => ({
          name: datum.category,
          value: `(${datum.wavelength},${datum.intensity})`,
          custom: "...",
        }),
      ],
    },
    axis: {
      x: {
        title: "拉曼波长（1/cm）",
      },
      y: {
        title: "强度",
      },
    },
    colorField: "category",
    style: {
      lineWidth: 2,
    },
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    // 从 URL 的 searchParams 中读取 csv id（支持 csvId / id / fileId / file）
    try {
      const params = new URLSearchParams(location.search);
      const csvId =
        params.get("csvId") || params.get("id") || params.get("fileId") || params.get("file");

      if (!csvId) return;

      const idNum = Number(csvId);
      if (Number.isNaN(idNum)) {
        setError("csv id 不是有效的数字");
        return;
      }

      setLoading(true);
      // 调用后端 API 获取 csv 文本（getFile 返回的就是文本）
      getFile({ id: idNum })
        .then((text) => {
          // 解析 csv 文本并写入图表数据
          const parsed = csvToData(text, `csv-${idNum}`);
          setRamanData(parsed.sort((a, b) => a.wavelength - b.wavelength));
        })
        .catch((e) => {
          setError(String(e?.message || e));
        })
        .finally(() => setLoading(false));
    } catch (err) {
      setError(String(err));
    }
  }, [location.search]);
  return (
    <div className="flex flex-col items-center overflow-hidden">
      {loading ? (
        <div className="flex h-[530px] w-full flex-col items-center justify-center">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="flex h-[530px] w-full flex-col items-center justify-center text-red-500">
          {error}
        </div>
      ) : ramanData ? (
        ramanData.length > 0 ? (
          <div className="h-[530px] w-full max-w-[900px] overflow-scroll pb-4">
            <div className="w-[900px]">
              <Line {...config} />
            </div>
          </div>
        ) : (
          <div className="flex h-[530px] w-full flex-col items-center justify-center">
            <Spin size="large" />
          </div>
        )
      ) : null}
      <Dragger
        name="file"
        className="w-full"
        multiple={true}
        maxCount={5}
        onChange={(info) => {
          const currentFiles = info.fileList;
          if (currentFiles && currentFiles.length > 0) {
            setRamanData([]);
            currentFiles.forEach((currentFiles) => {
              const file = currentFiles.originFileObj as File;
              const reader = new FileReader();
              reader.onload = (e) => {
                const text = e.target?.result as string;
                const parsed = csvToData(
                  text,
                  currentFiles.originFileObj?.name?.replace(/\.csv$/i, "") ||
                    "未知文档",
                );
                setRamanData((prev) => {
                  const newData = [...(prev || []), ...parsed];
                  return newData.sort((a, b) => a.wavelength - b.wavelength);
                });
              };
              reader.readAsText(file);
            });
          } else {
            setRamanData(undefined);
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

export default RamanDetailPage;
