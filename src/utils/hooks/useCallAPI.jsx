/**These hooks aren't call in the app. They were used before Redux implementation */

import { useEffect, useState } from 'react';
import axios from 'axios';

export function useCallAPIToken() {
    const tonyLogin = {
        email: 'tony@stark.com',
        password: 'password123',
    };
    const steveLogin = {
        email: 'steve@rogers.com',
        password: 'password456',
    };
    const [token, setToken] = useState();
    useEffect(() => {
        async function getToken() {
            try {
                const response = await axios({
                    method: 'post',
                    url: 'http://localhost:3001/api/v1/user/login',
                    data: tonyLogin,
                });
                console.log(response);
                setToken(response.data.body.token);
            } catch (error) {
                console.log(error);
            }
        }
        getToken();
    });
    return { token };
}

export function useCallAPIProfile(token) {
    const [datas, setDatas] = useState();
    useEffect(() => {
        async function getProfile() {
            try {
                const response = await axios({
                    method: 'post',
                    url: 'http://localhost:3001/api/v1/user/profile',
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDatas(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getProfile();
    }, [token]);
    return { datas };
}

export function useCallAPIChangeProfile(token) {
    useEffect(() => {
        async function changeProfile() {
            await axios({
                method: 'put',
                url: 'http://localhost:3001/api/v1/user/profile',
                headers: { Authorization: `Bearer ${token}` },
                data: { firstName: 'Fred', lastName: 'Dou' },
            })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        changeProfile();
    });
}
