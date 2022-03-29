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
            await axios({
                method: 'post',
                url: 'http://localhost:3001/api/v1/user/login',
                data: steveLogin,
            })
                .then(function (response) {
                    //console.log(response);
                    setToken(response.data.body.token);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getToken();
    });
    return { token };
}

export function useCallAPIProfile(token) {
    useEffect(() => {
        async function getProfile() {
            await axios({
                method: 'post',
                url: 'http://localhost:3001/api/v1/user/profile',
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getProfile();
    });
}
