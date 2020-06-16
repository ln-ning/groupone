//引用
import axios from 'axios'
//注册实例1
export function mywin(config) {
    const myrequest = axios.create({
        baseURL: "http://39.97.117.62:8080",
        timeout: 5000
    })
    return myrequest(config)
}
//注册实例2
export function mylin(config) {
    const merequest = axios.create({
        baseURL: "http://api.switchyl.online",
        timeout: 5000
    })
    return merequest(config)
}
export function allAxios(promiseArray) {
    // 这个其实可以直接axios.all(promiseArray)，为何需要再增加一层Promise？
    // 这里是有原因的：
    // 1、如果直接axios.all(promiseArray)，请求成功或失败的处理是交由使用者
    // 2、这里封装多一层Promise，是便于此处封装时考虑添加公共处理如开启遮罩层关闭遮罩层，之后才抛出调用结果给调用方，而不应该由调用方赖关闭遮罩层
    return new Promise((resolve, reject) => {
        axios.all(promiseArray)

        .then(allResponse => {
                resolve(allResponse)
            })
            .catch((error) => {
                reject(error)
            })

    })

}