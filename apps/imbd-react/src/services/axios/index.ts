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
 * Interception for the REQUEST of main API Client
 */
apiClient.interceptors.request.use((request: AxiosRequestConfig) => {
  console.log('interceptors.request', request);

  console.log('accessToken', apiConfigs.TOKEN);
  if (apiConfigs.TOKEN) {
    request.url = `${request.url}&api_key=${apiConfigs.TOKEN}`;
    console.log('final request', request);
  }
  return request;
});
/**
 * Interception for the RESPONSE of main API Client
 */
apiClient.interceptors.response.use(undefined, (error) => {
  const interceptResponse: AxiosResponse = error.response;
  const { data } = interceptResponse;
  console.log('interceptResponse', interceptResponse);
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

export default apiClient;
