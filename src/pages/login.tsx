import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import useBack from "../hook/useBack";
import { message } from "antd";
import { Login, Me } from "../api/user/user";
import { useNavigate } from "react-router";
import useUserStore from "../store/user";
import { useEffect } from "react";
import background from "../assets/bg.png"

function LoginPage() {
  const back = useBack("/");
  const navigate = useNavigate();
  const userStore = useUserStore();
  useEffect(() => {
    if (localStorage.getItem("authToken") && localStorage.getItem("userData")) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-center bg-cover"
    style={{
      backgroundImage: `url(${background})`
    }}>
      <div
        className="relative h-min rounded-lg bg-white/70 backdrop-blur-sm shadow-lg"
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
          <LoginForm
            title="拉曼光谱数据库"
            onFinish={async (e: { username: string; password: string }) => {
              try {
                const res = await Login(e);
                if (!res.data) {
                  message.error(res.msg || "登录失败");
                  return;
                }
                localStorage.setItem("authToken", res.data);
                try {
                  const meRes = await Me();
                  if (!meRes.data) {
                    message.error("获取用户信息失败");
                    return;
                  }
                  userStore.setUserData(meRes.data);
                  localStorage.setItem("userData", JSON.stringify(meRes.data));
                  navigate("/");
                } catch (_err) {
                  localStorage.removeItem("authToken");
                  message.error(res.msg || "登录并获取用户信息失败");
                }
              } catch (err) {
                console.log(err);
                return;
              }
            }}
          >
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
}

export default LoginPage;
