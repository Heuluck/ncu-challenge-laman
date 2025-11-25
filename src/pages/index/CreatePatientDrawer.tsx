import React from "react";
import type { ActionType, ProFormInstance } from "@ant-design/pro-components";
import {
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormDependency,
  ProFormDatePicker,
  ProFormRadio,
  ProFormDigit,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import patientApi from "../../api/patient/patient";
import type { PatientListItem } from "../../api/patient/patient-res";

const { CreatePatient, UpdatePatient } = patientApi;

type Props = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  formRef: React.RefObject<ProFormInstance<unknown> | null>;
  editData: { id: number; isEdit: boolean };
  setEditData: (v: { id: number; isEdit: boolean }) => void;
  actionRef: React.RefObject<ActionType | null>;
  requestGroups: () => Promise<{ label: string; value: string }[]>;
};

function CreatePatientDrawer({
  formOpen,
  setFormOpen,
  formRef,
  editData,
  setEditData,
  actionRef,
  requestGroups,
}: Props) {
  const [form] = Form.useForm<{ name: string; company: string }>();

  return (
    <DrawerForm<Omit<PatientListItem, "id">>
      open={formOpen}
      onOpenChange={setFormOpen}
      title={editData.isEdit ? "编辑病人数据" : "添加病人数据"}
      formRef={formRef}
      form={form}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            if (editData.isEdit)
              setEditData({
                id: -1,
                isEdit: false,
              });
          }}
        >
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
        if (editData.isEdit) {
          if (!values.isTested) {
            values.group = null;
            values.tStage = null;
            values.nStage = null;
            values.mStage = null;
            values.stage = null;
          }
          if (!values.preTreatment) {
            values.treatmentType = null;
          }
          try {
            values.time = dayjs(values.time).valueOf() / 1000;
            await UpdatePatient({ id: editData.id, ...values });
            actionRef.current?.reload();
            message.success("修改成功");
            formRef.current?.resetFields();
            return true;
          } catch (_e) {
            message.error("修改失败，请重试");
            return false;
          }
        }
        try {
          values.time = dayjs(values.time).valueOf() / 1000;
          await CreatePatient(values);
          actionRef.current?.reload();
          message.success("提交成功");
          formRef.current?.resetFields();
          return true;
        } catch (_e) {
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
          rules={[{ required: true }]}
        />
        <ProFormText
          name="abbr"
          width="md"
          label="缩写"
          placeholder="请输入病人姓名的拼音缩写"
          rules={[{ required: true }]}
        />
        <ProFormSelect
          name="gender"
          label="性别"
          width="md"
          options={["男", "女", "未知", "其他"]}
          placeholder="请选择性别"
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name="age"
          width="md"
          min={0}
          label="年龄"
          placeholder="请输入病人年龄"
          rules={[{ required: true }]}
        />
      </ProForm.Group>
      <ProFormSelect
        name="inpatientOutpatient"
        label="住院/门诊"
        width="md"
        options={["住院", "门诊"]}
        placeholder="请选择住院/门诊"
        rules={[{ required: true }]}
      />
      <ProForm.Group>
        <ProFormDatePicker
          name="time"
          label="时间"
          width="md"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="diagnosis"
          width="md"
          label="诊断"
          placeholder="请输入诊断信息"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="serialNo"
          width="md"
          label="流水号"
          placeholder="请输入流水号"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="caseNo"
          width="md"
          label="病案号"
          placeholder="请输入病案号"
          rules={[{ required: true }]}
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
        rules={[{ required: true }]}
      />
      <ProFormDependency name={["isTested"]}>
        {({ isTested }) => {
          if (isTested) {
            return (
              <>
                <ProFormRadio.Group
                  name="isNewGroup"
                  radioType="button"
                  label="是否为新组别"
                  options={[
                    { label: "新建组别", value: true },
                    { label: "已有组别", value: false },
                  ]}
                  rules={[{ required: true }]}
                />
                <ProFormDependency name={["isNewGroup"]}>
                  {({ isNewGroup }) => {
                    if (isNewGroup) {
                      return (
                        <ProFormText
                          name="group"
                          width="md"
                          label="组别"
                          placeholder="请输入组别"
                          rules={[{ required: true }]}
                        />
                      );
                    }
                    return (
                      <ProFormSelect
                        name="group"
                        width="md"
                        label="组别"
                        placeholder="请输入组别"
                        showSearch
                        request={requestGroups}
                        rules={[{ required: true }]}
                      />
                    );
                  }}
                </ProFormDependency>
                <ProForm.Group>
                  <ProFormText
                    name="tStage"
                    width="sm"
                    label="T 分期"
                    placeholder="请输入 T 分期"
                    rules={[{ required: true }]}
                  />
                  <ProFormText
                    name="nStage"
                    width="sm"
                    label="N 分期"
                    placeholder="请输入 N 分期"
                    rules={[{ required: true }]}
                  />
                  <ProFormText
                    name="mStage"
                    width="sm"
                    label="M 分期"
                    placeholder="请输入 M 分期"
                    rules={[{ required: true }]}
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
      <ProFormRadio.Group
        name="preTreatment"
        radioType="button"
        label="采样前是否接受治疗"
        options={[
          { label: "是", value: true },
          { label: "否", value: false },
        ]}
        rules={[{ required: true }]}
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
                rules={[{ required: true }]}
              />
            );
          }
          return null;
        }}
      </ProFormDependency>
      <ProFormTextArea name="memo" label="备注" placeholder="请输入备注信息" />
    </DrawerForm>
  );
}

export default CreatePatientDrawer;
