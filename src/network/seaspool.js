//导入request
import {
    mylin
} from './request'
//import qs from "qs";
//获取公海池信息
export function allpool(qqq) {
    return mylin({
        method: 'post',
        url: '/api/ghc/index',
        data: qqq
    })
}
//申领
export function slpool(www) {
    return mylin({
        method: 'post',
        url: '/api/ghc/sl',
        data: www
    })
}