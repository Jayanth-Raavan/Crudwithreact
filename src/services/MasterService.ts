import { User } from '../Model/UserModel'
import axios from 'axios';
// const BASEURL = "http://localhost:4000/users";
const BASEURL = "https://localhost:7167/api/Employee"
export const ADD = (payload: User) => {
    try {
        return axios.post(BASEURL, payload);
    } catch (error) {
        console.error(error);
    }
}

export const UPDATE = (payload: User) => {
    try {
        // console.log(`${BASEURL}/${payload?.id}`, "LOAD", payload)
        return axios.put(BASEURL + `/${payload?.id}`, payload);
    } catch (error) {
        console.error(error);
    }
}

export const GET = (id?: string) => {
    try {
        if (id) {
            return axios.get(BASEURL + `/${id}`);
        } else {
            return axios.get(BASEURL);
        }
    } catch (error) {
        console.error(error);
    }
}

export const DELETE = (id: string) => {
    try {
        return axios.delete(BASEURL + `/${id}`);
    } catch (error) {
        console.error(error);
    }
}