import moment from "moment";

const formatDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD');
}

const formatDate1 = (date: Date) => {
    return moment(date).format('YY-MM-DD');
}

const extractValues = (data: any) => {
    var names = data.map((item: any) => {
        return item[String(Object.keys(item))]
    })

    return names;
}

export default { 
    formatDate, 
    formatDate1,
    extractValues
}