import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { notification } from 'antd';
import localStore from 'store';
import { IEndpointConfig } from '@imbd-react-testing/interfaces';

const apiConfigs: IEndpointConfig = localStore.get('config');

/**
 * create instance for api client
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: apiConfigs.REST_EP,
  headers: {
    // 'X-Custom-Header': 'foobar'
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

/**
 * create instance for api client
 */
const listApiClient: AxiosInstance = axios.create({
  baseURL: apiConfigs.REST_EP_4,
  headers: {
    // 'X-Custom-Header': 'foobar'
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * Interception for the REQUEST of main API Client
 */
apiClient.interceptors.request.use((request: AxiosRequestConfig) => {
  if (apiConfigs.TOKEN) {
    request.url = `${request.url}&api_key=${apiConfigs.TOKEN}`;
    console.log('apiClient final request', request);
  }
  return request;
});
listApiClient.interceptors.request.use((request: AxiosRequestConfig) => {
  console.log(request);
  if (apiConfigs.TOKEN) {
    request.url = `${request.url}&api_key=${apiConfigs.TOKEN}`;
    request.headers.Authorization = `Bearer ${apiConfigs.TOKEN_4}`;
  }
  return request;
});
/**
 * Interception for the RESPONSE of main API Client
 */
apiClient.interceptors.response.use(undefined, (error) => {
  const interceptResponse: AxiosResponse = error.response;
  const { data } = interceptResponse;
  // const httpStatusCode = interceptResponse.status
  // const requestURL = interceptResponse.config.url
  // const { statusCode } = data

  console.log(typeof data.message, data.message);
  console.log(interceptResponse.status);

  // Errors handling
  if (data && typeof data.message !== 'object') {
    notification.warning({
      // message: data,
      message: data.message,
    });
  }

  return Promise.reject(data);
});
listApiClient.interceptors.response.use(undefined, (error) => {
  const interceptResponse: AxiosResponse = error.response;
  const { data } = interceptResponse;
  // Errors handling
  if (data && typeof data.message !== 'object') {
    notification.warning({
      // message: data,
      message: data.message,
    });
  }

  return Promise.reject(data);
});

export default apiClient;
export { listApiClient };
