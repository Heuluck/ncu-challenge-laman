import {
  AreaChartOutlined,
  CloseCircleOutlined,
  ExperimentOutlined,
  GithubFilled,
  HomeFilled,
  LineChartOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  type ProLayoutProps,
} from "@ant-design/pro-components";
import { Avatar, ConfigProvider, Dropdown, message, Tooltip } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import useUserStore from "../store/user";

const routeList: ProLayoutProps["route"] = {
  path: "/",
  routes: [
    {
      path: "/",
      name: "病人列表",
      icon: <HomeFilled />,
      access: "basic",
    },
    {
      path: "/raman",
      name: "拉曼光谱",
      icon: <ExperimentOutlined />,
      access: "basic",
      routes: [
        {
          icon: <LineChartOutlined />,
          path: "/raman/view",
          name: "拉曼光谱详情",
          access: "basic",
        },
      ],
    },
    {
      path: "/user",
      name: "用户管理",
      icon: <UserOutlined />,
      access: "admin",
      routes: [
        {
          icon: <ProfileOutlined />,
          path: "/user/download-req",
          name: "下载请求",
          access: "super",
        },
      ],
    },
  ],
};

function BaseLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const userStore = useUserStore();

  function hasPermission(access: string | undefined) {
    if (!access) return true;
    if (!userStore.userData.userPermission) return false;
    if (access === "basic") {
      return true;
    }
    if (access === "user") {
      return (
        userStore.userData.userPermission === "用户" ||
        userStore.userData.userPermission === "管理员" ||
        userStore.userData.userPermission === "超级管理员"
      );
    }
    if (access === "admin") {
      return (
        userStore.userData.userPermission === "管理员" ||
        userStore.userData.userPermission === "超级管理员"
      );
    }
    if (access === "super") {
      return userStore.userData.userPermission === "超级管理员";
    }
    return true;
  }

  return (
    <div id="pro-layout-container">
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return (
              document.getElementById("pro-layout-container") || document.body
            );
          }}
        >
          <ProLayout
            title="拉曼光谱数据库"
            layout="mix"
            splitMenus
            logo={<AreaChartOutlined />}
            location={{
              pathname: location.pathname,
            }}
            menuItemRender={(item, dom) => {
              if (!hasPermission(item.access)) {
                return (
                  <button
                    className="flex cursor-pointer gap-2"
                    onClick={() => {
                      message.warning(`无权限访问`);
                    }}
                  >
                    {dom}
                    <CloseCircleOutlined style={{ color: "red" }} />
                  </button>
                );
              }
              return item.path ? <Link to={item.path}>{dom}</Link> : dom;
            }}
            route={routeList}
            token={{
              header: {
                colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
              },
            }}
            breadcrumbProps={{
              itemRender(route) {
                return <Link to={route?.linkPath || "/"}>{route.title}</Link>;
              },
            }}
            avatarProps={{
              src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
              size: "small",
              title: userStore.userData.username,
              render: (_props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "userinfo",
                          label: (
                            <div className="flex flex-row items-center gap-1 p-1">
                              <Avatar
                                src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
                                size="small"
                                style={{ marginRight: 8 }}
                              />
                              <div className="flex flex-col">
                                {userStore.userData.username}
                                <div style={{ fontSize: 12, color: "#999" }}>
                                  {userStore.userData.department &&
                                    `${userStore.userData.department} -`}
                                  {userStore.userData.userPermission}
                                </div>
                              </div>
                            </div>
                          ),
                        },
                        {
                          type: "divider",
                        },
                        {
                          key: "logout",
                          icon: <LogoutOutlined />,
                          onClick: () => {
                            localStorage.removeItem("authToken");
                            localStorage.removeItem("userData");
                            userStore.removeAllData();
                            navigate("/login");
                          },
                          label: "退出登录",
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === "undefined") return [];
              return [
                <Tooltip title="项目仓库">
                  <a
                    style={{ color: "#868686" }}
                    className="flex"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/heuluck/ncu-challenge-laman-DB"
                  >
                    <GithubFilled key="GithubFilled" />
                  </a>
                </Tooltip>,
              ];
            }}
          >
            <PageContainer>
              <ProCard>
                <Outlet />
              </ProCard>
            </PageContainer>
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
}

export default BaseLayout;
