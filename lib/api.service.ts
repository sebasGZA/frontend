'use client';
import api from "./api";

export const getRequest = async (url: string, params = {}) => {

    const res = await api.get(url, { params });
    return res.data;
};

export const postRequest = async (url: string, data = {}) => {
    try {
        const res = await api.post(url, data);
        return res.data;
    } catch (error) {
        console.error(error)
        throw error;
    }
};

export const putRequest = async (url: string, data = {}) => {
    const res = await api.put(url, data);
    return res.data;
};

export const deleteRequest = async (url: string) => {
    const res = await api.delete(url);
    return res.data;
};