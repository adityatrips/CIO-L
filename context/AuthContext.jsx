import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseUri } from '@/constants';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userToken, setUserToken] = useState(null);
	const [userInfo, setUserInfo] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		(async () => {
			const userToken = await SecureStore.getItemAsync('userToken');
			const userInfo = await SecureStore.getItemAsync('userInfo');

			if (userToken && userInfo) {
				setUserToken(userToken);
				setUserInfo(JSON.parse(userInfo));
			}
		})();
		setLoading(false);
	}, []);

	const lookupUser = async (emailAddress) => {
		setLoading(true);
		try {
			const res = await axios.get(
				`${baseUri}/member/lookup?identity=${emailAddress}`
			);

			if (res.data) {
				setUserInfo(res.data);
				await SecureStore.setItemAsync('userInfo', JSON.stringify(res.data));
			}
		} catch (e) {
			ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			throw new Error(JSON.parse(JSON.stringify(e)).status);
		} finally {
			setLoading(false);
		}
	};

	const login = async (username, password) => {
		setLoading(true);

		try {
			const res = await axios.post(
				`https://cioleader.azurewebsites.net/api-token-auth/`,
				{
					username,
					password,
				}
			);

			if (res.data) {
				setUserToken(res.data.token);
				await SecureStore.setItemAsync('userToken', res.data.token);
			}
		} catch (e) {
			ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			throw new Error(JSON.parse(JSON.stringify(e)).status);
		} finally {
			setLoading(false);
		}
	};

	const toggleAuth = () => {
		setIsAuthenticated(!isAuthenticated);
		return isAuthenticated;
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				userToken,
				userInfo,
				loading,
				error,
				login,
				lookupUser,
				toggleAuth,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
