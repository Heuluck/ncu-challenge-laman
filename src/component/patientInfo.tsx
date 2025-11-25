import { Descriptions } from "antd";
import type { PatientListItem } from "../api/patient/patient-res";
import dayjs from "dayjs";

const PatientInfo: React.FC<{ patient: PatientListItem | undefined }> = (props) => {
  return <Descriptions bordered className="w-full" items={patientListItemToInfo(props.patient)} />;
};

function patientListItemToInfo(item: PatientListItem | undefined) {
  const time = item?.time ? dayjs(item.time).format("YYYY-MM-DD HH:mm:ss") : "-";
  const stage =
    [item?.tStage, item?.nStage, item?.mStage].filter(Boolean).join(" | ") || "-";
  const isTested =
    item?.isTested !== undefined ? (item.isTested ? "是" : "否") : "-";
  const isPreTreatment =
    item?.preTreatment !== undefined ? (item.preTreatment ? "是" : "否") : "-";

  return [
    { key: "1", label: "病人姓名", children: item?.name ?? "-" },
    { key: "2", label: "流水号", children: item?.serialNo ?? "-" },
    { key: "3", label: "病案号", children: item?.caseNo ?? "-" },
    { key: "4", label: "缩写", children: item?.abbr ?? "-" },
    { key: "5", label: "登记时间", children: time },
    { key: "6", label: "住院/门诊", children: item?.inpatientOutpatient ?? "-" },
    { key: "7", label: "性别", children: item?.gender ?? "-" },
    {
      key: "8",
      label: "年龄",
      children: item?.age != null ? String(item.age) : "-",
    },
    { key: "9", label: "诊断", children: item?.diagnosis ?? "-" },
    { key: "10", label: "已检", children: isTested },
    { key: "11", label: "组别", children: item?.group ?? "-" },
    { key: "12", label: "TNM分期", children: stage ?? "-" },
    { key: "13", label: "分期", children: item?.stage ?? "-" },
    {
      key: "14",
      label: "采样前是否接受治疗",
      children: isPreTreatment,
    },
    { key: "15", label: "治疗方式", children: item?.treatmentType ?? "-" },
    { key: "16", label: "备注", children: item?.memo ?? "-" },
  ];
}

export default PatientInfo;
