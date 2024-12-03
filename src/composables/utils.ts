import moment from "moment";

const formatDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD');
}

const formatDate1 = (date: Date) => {
    return moment(date).format('YY-MM-DD');
}

export default { formatDate, formatDate1 }