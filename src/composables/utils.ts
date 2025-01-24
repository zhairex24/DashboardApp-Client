import { IUser } from "@/models/IUser";
import moment from "moment";
import { computed } from "vue";
import { get as getFromStore } from "@/local-storage";

const loggedUser = computed(() => getFromStore("logged.username"))

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

const filterNoAdminUsers = (users: IUser[]) => {
    let filteredData = users.filter(
        (user: IUser) => user.username !== loggedUser.value
    )

    return filteredData
}

export default { 
    formatDate, 
    formatDate1,
    extractValues,
    filterNoAdminUsers,
}