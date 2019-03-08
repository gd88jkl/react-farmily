
let _baseURI = '/api'
let _isMock = false

if(_isMock) {
    _baseURI = `/mock${_baseURI}`
}

export const timeout = '15000' // 接口超时限制(ms)
export const baseURI = _baseURI
