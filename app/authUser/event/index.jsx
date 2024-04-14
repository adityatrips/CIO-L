import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Image, Text, ScrollView } from 'tamagui';
import Carousel from '@/components/Carousel';
import { ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import UpcomingEventCard from '@/components/UpcomingEventCard';

const EventScreen = () => {
	const { userToken } = useContext(AuthContext);
	const [evtData, setEvtData] = useState([]);
	const [loading, setLoading] = useState(false);

	const getAllEvts = async () => {
		try {
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/event/all/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setEvtData(res.data);
		} catch (error) {
			console.log('Event::getAllEvts::error::', error);
		}
	};

	useEffect(() => {
		setLoading(true);
		getAllEvts();
		setLoading(false);
	}, []);

	return loading ? (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ActivityIndicator
				size='large'
				color={colors.primary}
			/>
		</View>
	) : (
		<SafeAreaView
			edges={['bottom', 'left', 'right']}
			style={{ flexGrow: 1 }}
		>
			<ScrollView
				style={{
					flex: 1,
					alignSelf: 'center',
				}}
			>
				<View
					gap={10}
					marginBottom={10}
				>
					{evtData.map((evt, index) => (
						<UpcomingEventCard
							key={index}
							data={evt}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

export default EventScreen;
