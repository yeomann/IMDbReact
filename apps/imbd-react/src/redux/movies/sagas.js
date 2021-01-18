// import localIpUrl from "local-ip-url";
import { all, takeEvery, put, call, select, delay } from 'redux-saga/effects'
import { notification } from 'antd'
import actions from './actions'
// import { performC2C } from '../../services/jwt/imdb'

export function* PERFORM_COMMPEAK_C2C({ payload }) {
  console.log('PERFORM_COMMPEAK_C2C -> payload -> ', payload)
  const { phoneNumber, userId, agentId } = payload
  yield put({
    type: 'sales/SET_C2C_STATE',
    payload: {
      c2cloading: true,
    },
  })
  // number because we don't want + signs
  // const success = yield call(performC2C, Number(phoneNumber), userId, agentId)
  // notification.success({
  //   message: 'Call Action',
  //   description: 'Click to Call action was performed successfully!',
  // })
  // if (success) {
  //   // notification.success({
  //   //   message: 'Call Action',
  //   //   description: 'Click to Call action was performed successfully!',
  //   // })
  // }
  // if (!success) {
  //   // notification.error({
  //   //   message: 'Call Action',
  //   //   description: 'There was perfomaring click to call Action.',
  //   // })
  // }
  yield put({
    type: 'sales/SET_C2C_STATE',
    payload: {
      c2cloading: false,
    },
  })
  // yield delay(8000)
  // console.log(8000);
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SET_FAV, PERFORM_COMMPEAK_C2C)])
}
