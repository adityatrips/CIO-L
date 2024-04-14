import { Button, Image, ScrollView, Text, View } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { colors } from '@/constants';
import ankit from '@/assets/images/Ankit.png';
import globe from '@/assets/images/Globe.png';
import Divider from '@/components/Divider';

import Hybrid from '@/assets/images/Hybrid.png';
import Online from '@/assets/images/Online.png';
import Offline from '@/assets/images/Offline.png';
import LoadingComp from '../../../components/Loading';

const height = Dimensions.get('screen').height * 0.75;
const width = Dimensions.get('screen').width;

export default function ProfileScreen() {
	const router = useRouter();
	const { userToken } = useContext(AuthContext);
	const [userProfile, setUserProfile] = useState({});
	const [pastEvents, setPastEvents] = useState([]);
	const [loading, setLoading] = useState(false);

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
		setLoading(true);
		getPastEvents();
		getUserProfile();
		setLoading(false);
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

	return loading ? (
		<LoadingComp />
	) : (
		<ScrollView flex={1}>
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
							<View
								key={index}
								minHeight={Dimensions.get('screen').height * 0.3}
								borderRadius={20}
								width={Dimensions.get('screen').width * 0.9}
								backgroundColor={colors.primary}
								position={'relative'}
							>
								<View
									position={'absolute'}
									top={0}
									left={0}
									height={'100%'}
									width={'50%'}
									borderRadius={20}
									backgroundColor={'#000'}
								>
									<Image
										src={event.sponsorpicture}
										borderRadius={20}
										width={'100%'}
										height={'100%'}
										resizeMode='contain'
									/>
								</View>
								<View
									position={'absolute'}
									justifyContent='space-between'
									top={0}
									right={0}
									height={'100%'}
									width={'50%'}
									padding={10}
									borderRadius={20}
								>
									<View
										flexDirection='row'
										alignItems='center'
										justifyContent='center'
										gap={10}
										marginBottom={10}
										padding={10}
										borderRadius={10}
										backgroundColor={
											event.type === '1'
												? colors.primaryDark
												: event.type === '2'
												? colors.primary
												: '#444'
										}
									>
										<Image
											source={
												event.type === '1'
													? Online
													: event.type === '2'
													? Offline
													: Hybrid
											}
											width={50}
											height={50}
										/>
										<Text>
											{event.type === '1'
												? 'Online'
												: event.type === '2'
												? 'Offline'
												: 'Hybrid'}
										</Text>
									</View>
									<Text>{event.name}</Text>
									<View
										flexDirection='row'
										alignItems='center'
										justifyContent='space-between'
										marginTop={10}
									>
										<View
											height={2}
											width={'50%'}
											backgroundColor={'#fff'}
										></View>
										<View
											height={5}
											width={'50%'}
											backgroundColor={'#fff'}
										></View>
									</View>
									<View>
										<Text>
											{event.venue} | {event.time}
										</Text>
										<Text>{event.date}</Text>
									</View>
									<Button
										borderRadius={100 / 2}
										backgroundColor={colors.primaryDark}
										borderColor={colors.primary}
										pressStyle={{
											backgroundColor: colors.primary,
											borderColor: colors.primaryDark,
										}}
										onPress={() => {
											router.push(`/authUser/event/${event.id}`);
										}}
									>
										View Details
									</Button>
								</View>
							</View>
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

				<Button
					backgroundColor={colors.primary}
					borderColor={colors.primary}
					pressStyle={{
						backgroundColor: colors.primaryDark,
						borderColor: colors.primary,
					}}
					width={'90%'}
					borderRadius={100 / 2}
					onPress={logout}
					marginTop={20}
				>
					SIGNOUT
				</Button>
				<Text fontSize={20}>Profile</Text>
			</View>
		</ScrollView>
	);
}
