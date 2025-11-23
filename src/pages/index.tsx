import type { ActionType, ProColumns } from "@ant-design/pro-components";
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
  ProFormDateRangePicker,
  ProFormSlider,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import {
  CreatePatient,
  GetPatientGroups,
  GetPatientList,
} from "../api/patient/patient";
import type { PatientListItem } from "../api/patient/patient-res";
import dayjs from "dayjs";
import { useRef } from "react";

const columns: ProColumns<PatientListItem>[] = [
  {
    title: "编号",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    width: 60,
    sorter: (a, b) => (a?.id ?? 0) - (b?.id ?? 0),
    hideInSearch: true,
  },
  { title: "姓名", dataIndex: "name", key: "name", fixed: "left", width: 70 },
  { title: "缩写", dataIndex: "abbr", key: "abbr" },
  { title: "性别", dataIndex: "gender", key: "gender" },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    renderFormItem: () => (
      <ProFormSlider
        min={0}
        max={150}
        range
        fieldProps={{ defaultValue: [0, 150] }}
      />
    ),
    search: {
      transform: (value) => ({
        ageMin: value[0],
        ageMax: value[1],
      }),
    },
  },
  {
    title: "住院/门诊",
    dataIndex: "inpatientOutpatient",
    key: "inpatientOutpatient",
    width: 80,
    valueType: "select",
    valueEnum: {
      住院: { text: "住院" },
      门诊: { text: "门诊" },
    },
  },
  {
    title: "组别",
    dataIndex: "group",
    key: "group",
    valueType: "select",
    width: 100,
    renderFormItem(_, config, form) {
      return <ProFormSelect showSearch {...config} {...form} />;
    },
    request: async () => {
      try {
        const data = await GetPatientGroups();
        const groups = data.data?.groups || [];
        return groups.map((group) => ({
          label: group,
          value: group,
        }));
      } catch (e) {
        console.error("获取组别列表失败:", e);
      }
      return [];
    },
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
    valueType: "dateTime",
    renderFormItem: () => (
      <ProFormDateRangePicker fieldProps={{ allowEmpty: true }} />
    ),
    search: {
      transform: (value) => ({
        timeStart: Math.floor(dayjs(value[0]).valueOf() / 1000),
        timeEnd: Math.floor(dayjs(value[1]).valueOf() / 1000),
      }),
    },
    width: 120,
    render: (_, record) =>
      record.time
        ? dayjs(Number(record.time) * 1000)
            .locale("zh-cn")
            .format("YYYY-MM-DD")
        : undefined,
  },
  { title: "流水号", dataIndex: "serialNo", key: "serialNo" },
  { title: "病案号", dataIndex: "caseNo", key: "caseNo" },
  { title: "诊断", dataIndex: "diagnosis", key: "diagnosis", width: 150 },
  {
    title: "是否已检",
    dataIndex: "isTested",
    key: "isTested",
    valueType: "select",
    valueEnum: {
      true: { text: "是" },
      false: { text: "否" },
    },
  },
  {
    title: "TNM 分期",
    key: "tnmStage",
    children: [
      { title: "T", dataIndex: "tStage", key: "tStage" },
      { title: "N", dataIndex: "nStage", key: "nStage" },
      { title: "M", dataIndex: "mStage", key: "mStage" },
    ],
    hideInSearch: true,
  },
  {
    title: "分期组合",
    key: "stageCombination",
    children: [{ title: "分期", dataIndex: "stage", key: "stage" }],
    hideInSearch: true,
  },
  {
    title: "采样前是否接受治疗",
    dataIndex: "preTreatment",
    key: "preTreatment",
    valueType: "select",
    valueEnum: {
      true: { text: "是" },
      false: { text: "否" },
    },
  },
  { title: "接受何种治疗", dataIndex: "treatmentType", key: "treatmentType" },
  {
    title: "备注",
    dataIndex: "memo",
    key: "memo",
    width: 120,
    ellipsis: true,
  },
];

function IndexPage() {
  const actionRef = useRef<ActionType>(null);

  const renderCreateAction = () => {
    const [form] = Form.useForm<{ name: string; company: string }>();

    return (
      <DrawerForm<Omit<PatientListItem, "id">>
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
          try {
            values.time = dayjs(values.time).valueOf() / 1000;
            await CreatePatient(values);
            actionRef.current?.reload();
            message.success("提交成功");
            return true;
          } catch (e) {
            message.error("提交失败，请重试");
            return false;
          }
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
          options={[
            { label: "是", value: true },
            { label: "否", value: false },
          ]}
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormDependency name={["isTested"]}>
          {({ isTested }) => {
            if (isTested) {
              return (
                <>
                  <ProFormText
                    name="group"
                    width="md"
                    label="组别"
                    placeholder="请输入组别"
                  />
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
            options={[
              { label: "是", value: true },
              { label: "否", value: false },
            ]}
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormDependency name={["preTreatment"]}>
            {({ preTreatment }) => {
              if (preTreatment) {
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
    <ProTable<PatientListItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params, _sorter, _filter) => {
        const { current: page = 1, pageSize: limit = 10, ...rest } = params;
        const data = await GetPatientList({
          page,
          limit,
          ...rest,
        });
        return Promise.resolve({
          data: data.data?.items || [],
          total: data.data?.pagination?.total || 0,
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
        pageSize: 10,
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
