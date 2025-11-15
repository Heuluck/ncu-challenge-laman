import type { ProColumns } from "@ant-design/pro-components";
import { PlusOutlined } from "@ant-design/icons";
import {
  ProTable,
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormDependency,
  ProFormDatePicker,
  ProFormRadio,
  ProFormDigit,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

export type TableListItem = {
  id: number; // 编号
  abbr: string; // 缩写
  time: number; // 时间（时间戳）
  name: string; // 姓名
  serialNo: string; // 流水号
  inpatientOutpatient: string; // 住院/门诊
  group: string; // 组别
  gender: string; // 性别
  age: number; // 年龄
  caseNo: string; // 病案号
  diagnosis: string; // 诊断
  isTested: string; // 是否已检
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
    group: "26.13.32组",
    gender: "女",
    age: 50,
    caseNo: "1234567",
    diagnosis: "直肠腺癌",
    isTested: "是",
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
    abbr: "XH",
    time: 8.12,
    name: "小花",
    serialNo: "1234",
    inpatientOutpatient: "住院",
    group: "26.13.32组",
    gender: "男",
    age: 90,
    caseNo: "7654321",
    diagnosis: "胃癌",
    isTested: "是",
    tStage: "T1",
    nStage: "N2",
    mStage: "M3",
    stage: "无",
    preTreatment: "是",
    treatmentType: "无",
    memo: "采样前一两日未做根治切除（手术）",
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
  { title: "性别", dataIndex: "gender", key: "gender" },
  { title: "年龄", dataIndex: "age", key: "age" },
  {
    title: "住院/门诊",
    dataIndex: "inpatientOutpatient",
    key: "inpatientOutpatient",
    width: 80,
  },
  { title: "组别", dataIndex: "group", key: "group", width: 100 },
  { title: "时间", dataIndex: "time", key: "time" },
  { title: "流水号", dataIndex: "serialNo", key: "serialNo" },
  { title: "病案号", dataIndex: "caseNo", key: "caseNo" },
  { title: "诊断", dataIndex: "diagnosis", key: "diagnosis" },
  { title: "是否已检", dataIndex: "isTested", key: "isTested" },
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
  { title: "备注", dataIndex: "memo", key: "memo", width: 200, ellipsis: true },
];

function IndexPage() {
  const renderCreateAction = () => {
    const [form] = Form.useForm<{ name: string; company: string }>();

    return (
      <DrawerForm<Omit<TableListItem, "id">>
        title="添加病人数据"
        form={form}
        trigger={
          <Button type="primary">
            <PlusOutlined />
            添加数据
          </Button>
        }
        autoFocusFirstInput
        drawerProps={{
          destroyOnHidden: true,
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          console.log(values);
          message.success("提交成功");
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="name"
            width="md"
            label="病人姓名"
            placeholder="请输入病人姓名"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormText
            name="abbr"
            width="md"
            label="缩写"
            placeholder="请输入病人姓名的拼音缩写"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormSelect
            name="gender"
            label="性别"
            width="md"
            options={["男", "女", "未知", "其他"]}
            placeholder="请选择性别"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormDigit
            name="age"
            width="md"
            min={0}
            label="年龄"
            placeholder="请输入病人年龄"
            rules={[
              {
                required: true,
              },
            ]}
          />
        </ProForm.Group>
        <ProFormSelect
          name="inpatientOutpatient"
          label="住院/门诊"
          width="md"
          options={["住院", "门诊"]}
          placeholder="请选择住院/门诊"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProForm.Group>
          <ProFormDatePicker
            name="time"
            label="时间"
            width="md"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormText
            name="diagnosis"
            width="md"
            label="诊断"
            placeholder="请输入诊断信息"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormText
            name="serialNo"
            width="md"
            label="流水号"
            placeholder="请输入流水号"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormText
            name="caseNo"
            width="md"
            label="病案号"
            placeholder="请输入病案号"
            rules={[
              {
                required: true,
              },
            ]}
          />
        </ProForm.Group>
        <ProFormRadio.Group
          name="isTested"
          radioType="button"
          label="是否已检"
          options={["是", "否"]}
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormDependency name={["isTested"]}>
          {({ isTested }) => {
            if (isTested === "是") {
              return (
                <>
                  <ProForm.Group>
                    <ProFormText
                      name="tStage"
                      width="sm"
                      label="T 分期"
                      placeholder="请输入 T 分期"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    />
                    <ProFormText
                      name="nStage"
                      width="sm"
                      label="N 分期"
                      placeholder="请输入 N 分期"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    />
                    <ProFormText
                      name="mStage"
                      width="sm"
                      label="M 分期"
                      placeholder="请输入 M 分期"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    />
                  </ProForm.Group>
                  <ProFormText
                    name="stage"
                    width="md"
                    label="分期组合"
                    placeholder="请输入分期组合"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  />
                </>
              );
            }
            return null;
          }}
        </ProFormDependency>
        <ProForm.Group>
          <ProFormRadio.Group
            name="preTreatment"
            radioType="button"
            label="采样前是否接受治疗"
            options={["是", "否"]}
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormDependency name={["preTreatment"]}>
            {({ preTreatment }) => {
              if (preTreatment === "是") {
                return (
                  <ProFormText
                    name="treatmentType"
                    width="md"
                    label="接受何种治疗"
                    placeholder="请输入接受的治疗类型"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  />
                );
              }
              return null;
            }}
          </ProFormDependency>
        </ProForm.Group>
        <ProFormText
          name="memo"
          width="lg"
          label="备注"
          placeholder="请输入备注信息"
        />
      </DrawerForm>
    );
  };

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
      scroll={{ x: 1600 }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      dateFormatter="string"
      headerTitle="表格标题"
      toolBarRender={() => [
        <Button key="out">导出数据</Button>,
        renderCreateAction(),
      ]}
    />
  );
}

export default IndexPage;
