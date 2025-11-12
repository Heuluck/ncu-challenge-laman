import type { ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";

export type TableListItem = {
  id: number; // 编号
  abbr: string; // 缩写
  time: number; // 时间（时间戳）
  name: string; // 姓名
  serialNo: string; // 流水号
  inpatientOutpatient: string; // 住院/门诊
  gender: string; // 性别
  age: number; // 年龄
  caseNo: string; // 病案号
  diagnosis: string; // 诊断
  tStage: string; // T 分期
  nStage: string; // N 分期
  mStage: string; // M 分期
  stage: string; // 分期组合
  preTreatment: string; // 采样前是否接受治疗
  treatmentType: string; // 接受何种治疗
  memo: string; // 备注
};

const tableListDataSource: TableListItem[] = [
  {
    id: 1,
    abbr: "XM",
    time: 8.12,
    name: "小明",
    serialNo: "1234",
    inpatientOutpatient: "住院",
    gender: "女",
    age: 50,
    caseNo: "1234567",
    diagnosis: "直肠腺癌",
    tStage: "T2",
    nStage: "N0",
    mStage: "M0",
    stage: "无",
    preTreatment: "是",
    treatmentType: "无",
    memo: "采样前一两日有做根治切除（手术）",
  },
  {
    id: 2,
    abbr: "XM",
    time: 8.12,
    name: "小明",
    serialNo: "1234",
    inpatientOutpatient: "住院",
    gender: "女",
    age: 50,
    caseNo: "1234567",
    diagnosis: "直肠腺癌",
    tStage: "T2",
    nStage: "N0",
    mStage: "M0",
    stage: "无",
    preTreatment: "是",
    treatmentType: "无",
    memo: "采样前一两日有做根治切除（手术）",
  },
];

const columns: ProColumns<TableListItem>[] = [
  {
    title: "编号",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    width: 60,
    sorter: (a, b) => a.id - b.id,
  },
  { title: "姓名", dataIndex: "name", key: "name", fixed: "left", width: 70 },
  { title: "缩写", dataIndex: "abbr", key: "abbr" },
  { title: "时间", dataIndex: "time", key: "time" },
  { title: "流水号", dataIndex: "serialNo", key: "serialNo" },
  {
    title: "住院/门诊",
    dataIndex: "inpatientOutpatient",
    key: "inpatientOutpatient",
  },
  { title: "性别", dataIndex: "gender", key: "gender" },
  { title: "年龄", dataIndex: "age", key: "age" },
  { title: "病案号", dataIndex: "caseNo", key: "caseNo" },
  { title: "诊断", dataIndex: "diagnosis", key: "diagnosis" },
  {
    title: "TNM 分期",
    key: "tnmStage",
    children: [
      { title: "T", dataIndex: "tStage", key: "tStage" },
      { title: "N", dataIndex: "nStage", key: "nStage" },
      { title: "M", dataIndex: "mStage", key: "mStage" },
    ],
  },
  {
    title: "分期组合",
    key: "stageCombination",
    children: [{ title: "分期", dataIndex: "stage", key: "stage" }],
  },
  {
    title: "采样前是否接受治疗",
    dataIndex: "preTreatment",
    key: "preTreatment",
  },
  { title: "接受何种治疗", dataIndex: "treatmentType", key: "treatmentType" },
  { title: "备注", dataIndex: "memo", key: "memo", width: 200 },
];

function IndexPage() {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      cardBordered
      search={{
        labelWidth: "auto",
      }}
      scroll={{ x: 1400 }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      dateFormatter="string"
      headerTitle="表格标题"
      toolBarRender={() => [
        <Button key="out">导出数据</Button>,
        <Button type="primary" key="primary">
          创建数据
        </Button>,
      ]}
    />
  );
};

export default IndexPage;