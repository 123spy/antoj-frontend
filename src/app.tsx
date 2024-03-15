/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
import {getLoginUserUsingGet} from "@/services/apis/userController";

export async function getInitialState(): Promise<{
  currentUser?: any;
}> {
  // 请求用户信息
  const res: any = await getLoginUserUsingGet();
  if (res?.code === 0) {
    return {
      currentUser: res?.data
    }
  }
  return {
    currentUser: null
  };
}
