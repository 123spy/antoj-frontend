import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import {Space, Tabs, message, theme} from 'antd';
import type {CSSProperties} from 'react';
import {useState} from 'react';
import {APP_LOGO, APP_SUB_TITLE, APP_TITLE} from "@/constants/AppConstant";
import {Helmet, Link, useLocation, useModel, useRoutes} from "@@/exports";
import {userLoginUsingPost} from "@/services/apis/userController";
import {history} from "@umijs/max";

type LoginType = 'phone' | 'account';

export default () => {
  const {token} = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('account');
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;

  const onLogin = async (values) => {
    const res = await userLoginUsingPost(values);
    if (res.code == 0) {
      setInitialState(() => {
        return {
          ...initialState,
          currentUser: res.data
        }
      });
      history.push("/");
      message.success("登陆成功");
    } else {
      message.error("登陆失败," + res?.message);
    }

  }

  const items = [
    {
      key: 'account',
      label: '账号密码登录',
    },
    // {
    //   key: 'phone',
    //   label: '手机号登录',
    // },
  ];

  return (
    <ProConfigProvider hashed={false}>
      <Helmet>
        <title>登录 - {APP_TITLE}</title>
      </Helmet>
      <div style={{backgroundColor: token.colorBgContainer}}>
        <LoginForm
          logo={APP_LOGO}
          title={APP_TITLE}
          subTitle={APP_SUB_TITLE}
          onFinish={onLogin}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            items={items}
          >
            {/*<Tabs.TabPane key={'account'} tab={'账号密码登录'}/>*/}
            {/*<Tabs.TabPane key={'phone'} tab={'手机号登录'} />*/}
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'用户账号: 123456789'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户账号!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'}/>,
                  strengthText:
                    '建议密码应包含数字、字母和特殊字符，长度至少为 8 个字符。',
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{color: token.colorWarning}}>
                          强度：中
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{color: token.colorSuccess}}>
                          强度：强
                        </div>
                      );
                    }
                    return (
                      <div style={{color: token.colorError}}>强度：弱</div>
                    );
                  },
                }}
                placeholder={'密码: 123456789'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <Link to={'/user/register'}>注册</Link>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
