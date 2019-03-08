import { put, takeLatest, call } from 'redux-saga/effects'
import * as apis from '@apis/userApis'
import * as actions from '../actions/userActions'
import { delay } from 'redux-saga';

export function* watchRequestUsers() {
    yield takeLatest(actions.loadData, loadData)
}

function* loadData(action) {
    try {
        const res = yield call(() => apis.getUsers(action.payload))
        yield put({ type: actions.LOADING_SUCCESS, payload: res })
    } catch (e) {
        console.log(e)
        yield put({ type: actions.LOADING_FAILURE, payload: { text: e.message } })
    }
}

export function* watchDoSave() {
    yield takeLatest(actions.doSave, doSave)
}

function* doSave(action) {
    try {
        const { data, tableState } = action.payload
        const res1 = yield call(() => apis.doSave(data))
        if(res1.success) {
            yield put({ type: actions.HIDE_FORM })
            yield put({ type: actions.LOAD_DATA, payload: tableState })
        } else {
            yield put({ type: actions.LOADING_SUCCESS, payload: { text: res1.message } })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: actions.LOADING_SUCCESS, payload: { text: e.message } })
    }
}

export function* watchDoDelete() {
    yield takeLatest(actions.doDelete, doDelete)
}

function* doDelete(action) {
    try {
        const res1 = yield call(() => apis.doDelete(action.payload.ids))
        if(res1.success) {
            const res2 = yield call(() => apis.getUsers(action.payload.tableState))
            yield put({ type: actions.LOADING_SUCCESS, payload: res2 })
        } else {
            yield put({ type: actions.LOADING_SUCCESS, payload: { text: res1.message } })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: actions.LOADING_SUCCESS, payload: { text: e.message } })
    }
}