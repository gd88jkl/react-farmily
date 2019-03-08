import { all } from 'redux-saga/effects'
import { watchRequestUsers,watchDoSave,watchDoDelete } from './userSaga'

export default function* rootSaga() {
    yield all([
        watchRequestUsers(),
        watchDoSave(),
        watchDoDelete()
    ])
}
