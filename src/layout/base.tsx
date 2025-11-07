import { LockFilled, SmileFilled } from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

function BaseLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <ProLayout
        onPageChange={(loc) => {
          if (loc?.pathname) {
            console.log(loc.pathname);
            navigate(loc.pathname);
          }
        }}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item, dom) =>
          item.path ? (
            <Link to={item.path}>
              {dom}
            </Link>
          ) : (
            dom
          )
        }
        route={{
          path: '/',
          routes: [
            {
              path: '/',
              name: '首页',
              icon: <SmileFilled />,
            },
            {
              path: '/login',
              name: '登录',
              icon: <LockFilled />,
            },
          ],
        }}>
        <PageContainer>
          <ProCard>
            <Outlet />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </>
  );
}

export default BaseLayout;
