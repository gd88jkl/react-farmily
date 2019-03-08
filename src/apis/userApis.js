import axios from 'axios'
import { baseURI } from './config'

export const getUsers = payload => {
    console.log(payload)
    return axios({
        method: "POST",
        url: `${baseURI}/user/loadData`,
        data: payload,
        withCredentials: true
    }).then(function (res) {
        let result = {
            data: null,
            total: 0,
        }
        const success = res.data.success
        if(success) {
            const data = res.data.data
            result = {
                data: data.content,
                total: data.totalElements,
            }
        }
        return result
    }).catch(function (error) {
        throw error
    })
}

export const doSave = payload => {
    return axios({
        method: "POST",
        url: `${baseURI}/user/doSave`,
        params: payload,
        withCredentials: true
    }).then(function (res) {
        return res.data
    }).catch(function (error) {
        console.log(error);
    })
}

export const doDelete = payload => {
    return axios({
        method: "POST",
        url: `${baseURI}/user/deleteByIds`,
        params: {ids: payload + ''},
        withCredentials: true
    }).then(function (res) {
        return res.data
    }).catch(function (error) {
        console.log(error);
    })
}
