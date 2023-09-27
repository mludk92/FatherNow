import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Worker Saga: will be fired on "FETCH_CHILDREN" actions
function* fetchChildren() {
  try {
    const response = yield axios.get('/api/child');
    yield put({ type: 'SET_CHILDREN', payload: response.data });
  } catch (error) {
    console.log('Children get request failed', error);
  }
}

function* childSaga() {
  yield takeLatest('FETCH_CHILDREN', fetchChildren);
}

export default childSaga;
