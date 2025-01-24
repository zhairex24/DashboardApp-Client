import { AxiosResponse, AxiosError } from "axios";

import api from "../api";
import { IUser } from "@/models/IUser";
import { IPasswordUpdate } from "@/models/IPasswordUpdate";

const URLS = {
    users: "users/"
}

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        api.get(URLS.users, {})
        .then((response: AxiosResponse) => {
            if(response.status === 200) {
                resolve(response.data);
            } else {
                reject();
            }
        })
        .catch((error: AxiosError) => {
            console.log('error in load usersss', error);
        });
    });
}

export const getUser = (userId: string) => {
    return new Promise((resolve, reject) => {
        api.get(URLS.users + userId + "/", {})
        .then((response: any) => {
            if(response.status === 200) {
                resolve(response.data);
            } else {
                reject();
            }
        })
        .catch((error) => {
            console.log('error in get user', error);
        });
    });
}

export const addUser = (body: Partial<IUser>) => {
    return api
        .post(URLS.users + `new`, {
            username: body.username,
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            is_staff: body.is_staff,
            passwd: body.password,
        })
        .catch((error) => {
            console.error("Error in add user ==> ", error)
        })
    
    
    // return new Promise((resolve, reject) => {
    //     api.get(URLS.users, {})
    //     .then((response: AxiosResponse) => {
    //         if(response.status === 200) {
    //             resolve(response.data);
    //         } else {
    //             reject();
    //         }
    //     })
    //     .catch((error: AxiosError) => {
    //         console.log('error in load usersss', error);
    //     });
    // });
}


export const deleteUser = (id: string) => {
    return api
        .delete(URLS.users + `${id}/`)
        .catch((error) => {
            console.error("Error in delete user ==> ", error)
        })
}

export const unblockUser = (username: string) => {
    return api
        .post(URLS.users + "admin-reset-login-attempts", {
            blocked_user: username
        })
        .catch((error) => {
            console.error("Error in unblock user ==> ", error)
        })
}

export const updateUserPassword = (params: IPasswordUpdate) => {
    console.log('params', params)
    return api
        .post(URLS.users + "admin-reset-password", {
            new_passwd: params.new_passwd,
            target_user: params.target_user
        })
        .catch((error) => {
            console.error("Error in update user password ==> ", error)
        })
}

export const updateOwnProfile = (body: Partial<IUser>) => {
    return api
        .put(URLS.users + `update`, {
            username: body.username,
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
        })
        .catch((error) => {
            console.error("Error in update own profile ==> ", error)
        })
    
    
    // return new Promise((resolve, reject) => {
    //     api.get(URLS.users, {})
    //     .then((response: AxiosResponse) => {
    //         if(response.status === 200) {
    //             resolve(response.data);
    //         } else {
    //             reject();
    //         }
    //     })
    //     .catch((error: AxiosError) => {
    //         console.log('error in load usersss', error);
    //     });
    // });
}