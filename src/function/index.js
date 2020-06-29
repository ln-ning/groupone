import moment from "moment";
export default {

    setLoginUser: function(data) {
        sessionStorage.setItem('user', JSON.stringify(data))
    },
    getLoginUser: function() {
        return JSON.parse(sessionStorage.getItem('user'))
    },
    hasValInArrayObj: function(arr, key, val) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][key] == val)
                return i;
        }
        return -1;
    },
    //处理时间戳的    13位
    formatDate: function(now) {
        var year = now.getFullYear(); //取得4位数的年份
        var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
        var date = now.getDate(); //返回日期月份中的天数（1到31）
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        return year + "-" + month + "-" + date;
    },
    //处理时间戳  10位
    //此方法仅适用于el-table-column内
    dateFormat(row, column) {
        var date = row[column.property];
        if (date == null) {
            return "";
        }
        return moment.unix(date).format("YYYY-MM-DD");
    },
}