import { createAction } from 'redux-actions'

export const USER_TABLE_LOADING = 'USER_TABLE_LOADING'

export const LOAD_DATA = 'LOAD_DATA'
export const TABLE_LOADING = 'TABLE_LOADING'
export const SHOW_FORM = 'SHOW_FORM'
export const HIDE_FORM = 'HIDE_FORM'
export const CONFIRM_LOADING = 'CONFIRM_LOADING'
export const DO_SAVE = 'DO_SAVE'
export const DO_DELETE = 'DO_DELETE'

export const LOADING_SUCCESS = 'LOADING_SUCCESS'
export const LOADING_FAILURE = 'LOADING_FAILURE'

export const loadData = createAction(LOAD_DATA, data => (data))
export const showForm = createAction(SHOW_FORM)
export const hideForm = createAction(HIDE_FORM)
export const confirmLoading = createAction(CONFIRM_LOADING)
export const doSave = createAction(DO_SAVE, data => (data))
export const doDelete = createAction(DO_DELETE, data => (data))



