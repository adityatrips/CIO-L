import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, Text, View } from 'tamagui';
import { colors } from '@/constants';
import { ActivityIndicator, Dimensions, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
import LoadingComp from './Loading';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftCircle, ChevronRightCircle } from '@tamagui/lucide-icons';
import axios from 'axios';

const PointsTable = ({ userToken, dataState = {}, getFnState = () => {} }) => {
	const router = useRouter();
	const [data, setData] = useState(dataState);
	const [results, setResults] = useState(dataState.results);
	const [isLoading, setIsLoading] = useState(false);

	const getPoints = async () => {
		setIsLoading(true);
		if (userToken !== '' || userToken !== null || userToken !== undefined) {
			try {
				const res = await axios.get(
					'https://cioleader.azurewebsites.net/api/transactions/all?offset=0&limit=5',
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);
				setData(res.data);
				setResults(res.data.results);
			} catch (error) {
				ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			}
		}
	};

	useEffect(() => {
		getPoints();
	}, []);

	

	useEffect(() => {
		getFnState();
	}, []);

	return (
		
	);
};

export default PointsTable;
