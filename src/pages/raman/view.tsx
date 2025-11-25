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
      title: "拉曼光谱图",
      subtitle: "拉曼光谱图",
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
    try {
      const params = new URLSearchParams(location.search);
      const csvId = params.get("id")

      if (!csvId) return;

      const idNum = Number(csvId);
      if (Number.isNaN(idNum)) {
        setError("csv id 不是有效的数字");
        return;
      }

      setLoading(true);
      getFile({ id: idNum })
        .then((text) => {
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
        <p className="ant-upload-text">本地拉曼光谱数据可视化</p>
        <p className="ant-upload-hint">可添加多个文件，文件不会上传</p>
      </Dragger>
    </div>
  );
};

export default RamanDetailPage;
