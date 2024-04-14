import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseUri } from '@/constants';
import * as SecureStore from 'expo-secure-store';

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
				console.log('AuthCtx:useEffect:: ', userToken);
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
		} catch (error) {
			setError(error);
			console.log('AuthCtx:lookupUser::error:: ', error);
		} finally {
			setLoading(false);
		}
	};

	const login = async (username, password) => {
		setLoading(true);
		console.log('AuthCtx:login:: ', username, password);
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
				console.log('AuthCtx:login:: ', res.data);
				await SecureStore.setItemAsync('userToken', res.data.token);
			}
		} catch (error) {
			setError(error);
			console.log('AuthCtx:login::error:: ', error);
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
