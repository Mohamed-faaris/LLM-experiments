import axios from "axios";

export const leetcodeAPI = axios.create({
    baseURL: process.env.LEETCODE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});