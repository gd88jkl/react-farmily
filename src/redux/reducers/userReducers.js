import * as actions from '../actions/userActions'
import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

const tableInit = {
    data: [],
    total: 0,
    loading: false,
}

const formInit = {
    confirmLoading: false,
    formVisible: false,
}

const tableState = handleActions({
    [actions.LOAD_DATA]: (state) => {
        return {
            ...state,
            loading: true,
        }
    },
    [actions.DO_DELETE]: (state) => {
        return {
            ...state,
            loading: true,
        }
    },
    [actions.LOADING_SUCCESS]: (state, { payload }) => {
        return {
            ...payload,
            loading: false
        }
    },
    [actions.LOADING_FAILURE]: () => {
        return {
            loading: false
        }
    },
}, tableInit);

const formState = handleActions({
    [actions.SHOW_FORM]: () => {
        return {
            formVisible: true,
            confirmLoading: false,
        }
    },
    [actions.HIDE_FORM]: () => {
        return {
            formVisible: false,
            confirmLoading: false,
        }
    },
    [actions.DO_SAVE]: () => {
        return {
            formVisible: true,
            confirmLoading: true,
        }
    },
}, formInit);

export default combineReducers({
    tableState,
    formState
})