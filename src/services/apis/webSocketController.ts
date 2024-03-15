// @ts-ignore
/* eslint-disable */
import request from '@/plugins/axios';

/** getWs POST /api/ws/ */
export async function getWsUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWsUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/ws/', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
