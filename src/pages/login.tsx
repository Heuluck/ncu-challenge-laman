import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import useBack from "../hook/useBack";

function LoginPage() {
  const back = useBack("/");
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div
        className="relative h-min rounded-lg bg-white shadow-lg"
        style={{
          backgroundImage:
            "radial-gradient(circle at 93% 1e+02%, rgba(22, 119, 255, 0.17) 0%, rgba(255, 255, 255, 0.05) 23%, rgba(255, 255, 255, 0.03) 87%, rgba(22, 119, 255, 0.12) 109%)",
        }}
      >
        <button
          onClick={() => back()}
          className="absolute top-3 left-3 h-8 w-8 cursor-pointer rounded-full border border-gray-200 bg-white p-1 shadow-2xl shadow-black hover:bg-gray-50"
        >
          <LeftOutlined />
        </button>
        <div className="m-8">
          <LoginForm title="拉曼光谱数据库">
            <div className="mt-8" />
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
              }}
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
          </LoginForm>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
