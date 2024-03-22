// @ts-ignore
/* eslint-disable */
import request from '@/plugins/axios';

/** doSubmit POST /api/question_submit/ */
export async function doSubmitUsingPost(
  body: API.QuestionSubmitAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/question_submit/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** doDebug POST /api/question_submit/debug */
export async function doDebugUsingPost(
  body: API.QuestionDebugRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/question_submit/debug', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getQuestionSubmitVOById GET /api/question_submit/get/vo */
export async function getQuestionSubmitVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionSubmitVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestionSubmitVO_>('/api/question_submit/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listQuestionSubmitByPage POST /api/question_submit/list/page/vo */
export async function listQuestionSubmitByPageUsingPost(
  body: API.QuestionSubmitQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionSubmitVO_>('/api/question_submit/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
