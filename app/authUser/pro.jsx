import { Button, Image, Text, View } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { colors } from '@/constants';
import ankit from '@/assets/images/Ankit.png';
import globe from '@/assets/images/Globe.png';
import Divider from '@/components/Divider';
import UpcomingEventCard from '@/components/UpcomingEventCard';

const height = Dimensions.get('screen').height * 0.75;
const width = Dimensions.get('screen').width;

export default function ProfileScreen() {
	const router = useRouter();
	const { userToken } = useContext(AuthContext);
	const [userProfile, setUserProfile] = useState({});
	const [pastEvents, setPastEvents] = useState([]);

	const logout = async () => {
		await SecureStore.deleteItemAsync('userToken');
		await SecureStore.deleteItemAsync('userInfo');

		router.push('/');
	};

	const getUserProfile = async () => {
		if (userToken !== '' || userToken !== null || userToken !== undefined) {
			try {
				const res = await axios.get(
					'https://cioleader.azurewebsites.net/api/member/',
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);
				setUserProfile(res.data);
			} catch (error) {
				console.log('HomeScreen::getUserProfile::error:: ', error);
				setUserProfile({});
			}
		}
	};

	useEffect(() => {
		getPastEvents();
		getUserProfile();
	}, []);

	const getPastEvents = async () => {
		try {
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/event/past/all',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setPastEvents(res.data);
		} catch (error) {
			console.log('ProfileScreen::getPastEvents::error:: ', error);
		}
	};

	return (
		<View
			flex={1}
			alignItems='center'
		>
			<View height={height * 0.5}>
				<View
					height={height * 0.5}
					width={width}
					alignItems='center'
					justifyContent='center'
					flexDirection='row'
					position='relative'
					overflow='visible'
					backgroundColor={colors.primary}
					gap={20}
				>
					<Image
						position='absolute'
						source={globe}
						resizeMode='contain'
					/>
					<Image
						height={100}
						width={100}
						borderRadius={20}
						source={{
							uri: userProfile.profilepicture || ankit,
						}}
					/>
					<View>
						<Text
							fontSize={24}
							fontWeight={'bold'}
						>
							{`${userProfile.fname} ${userProfile.lname}` || 'Ankit'}
						</Text>
						<Text fontSize={16}>{userProfile.designation || 'Founder'}</Text>
						<Text fontSize={16}>
							{`${
								userProfile.company === 'N/A'
									? 'No company'
									: userProfile.company
							}` || 'Ankit'}
						</Text>
					</View>
				</View>
			</View>
			<View
				flexDirection='row'
				justifyContent='space-between'
				width={width * 0.9}
				paddingTop={20}
			>
				<Text color='#000'>My past events</Text>
				<Text color='#000'>Total {pastEvents.length.toString()} events</Text>
			</View>
			<Divider spacing={20} />

			<View gap={10}>
				{pastEvents.length > 0 ? (
					pastEvents.map((event, index) => (
						<UpcomingEventCard
							key={index}
							event={event}
						/>
					))
				) : (
					<Text
						color='#000'
						marginBottom={20}
					>
						No past events
					</Text>
				)}
			</View>

			<Button onPress={logout}>SIGNOUT</Button>
			<Text fontSize={20}>Profile</Text>
		</View>
	);
}
