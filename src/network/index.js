//导入request
import { mywin } from './request'


export function getBanner() {
    return mywin({
        url: '/banner/read',
        params: {
            //数据 条数
            pagesize: 50000,
            //页数
            pageindex: 1
        }
    })
}