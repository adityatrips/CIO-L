import { Button, Image, ScrollView, Text, View } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { Dimensions, ToastAndroid } from 'react-native';
import { colors } from '@/constants';
import ankit from '@/assets/images/Ankit.png';
import globe from '@/assets/images/Globe.png';
import Divider from '@/components/Divider';
import logo from '@/assets/images/Logo_GreenBlack.png';
import LoadingComp from '@/components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from '@tamagui/lucide-icons';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import PTRView from 'react-native-pull-to-refresh';
import HeaderComp from '../../../components/Header';

const height = Dimensions.get('screen').height * 0.75;
const width = Dimensions.get('screen').width;

export default function ProfileScreen() {
	const router = useRouter();
	const { userToken } = useContext(AuthContext);
	const [userProfile, setUserProfile] = useState({});
	const [pastAttendedEvents, setPastAttendedEvent] = useState([]);
	const [pastRegisterdEvents, setPastRegisterdEvents] = useState([]);
	const [pastMissedEvents, setPastMissedEvents] = useState([]);
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
				ToastAndroid.show('Error fetching user profile', ToastAndroid.SHORT);
				setUserProfile({});
				return error.status;
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
			setPastAttendedEvent(res.data.filter((evt) => evt.registered === '2'));
			setPastRegisterdEvents(res.data.filter((evt) => evt.registered === '1'));
			setPastAttendedEvent(res.data.filter((evt) => evt.registered === '3'));
		} catch (error) {
			ToastAndroid.show('Error fetching past events', ToastAndroid.SHORT);
		}
	};

	return loading ? (
		<LoadingComp />
	) : (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<HeaderComp title='Profile' />
			<PTRView
				onRefresh={() => {
					getPastEvents();
					getUserProfile();
				}}
			>
				<ScrollView flex={1}>
					<View
						flex={1}
						alignItems='center'
					>
						<View height={height * 0.35}>
							<View
								height={height * 0.35}
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
									height={110}
									width={120}
									borderRadius={20}
									source={{
										uri: userProfile.profilepicture || ankit,
									}}
								/>
								<View>
									<Text
										fontSize={22}
										fontFamily={'InterBold'}
									>
										{`${userProfile.fname} ${userProfile.lname}` || 'Ankit'}
									</Text>
									<Text
										fontSize={16}
										fontFamily={'InterMedium'}
									>
										{userProfile.designation || 'Founder'}
									</Text>
									<Text
										fontSize={16}
										fontFamily={'InterMedium'}
									>
										{`${
											userProfile.company === 'N/A'
												? 'No Company'
												: userProfile.company
										}` || 'Ankit'}
									</Text>
								</View>
							</View>
						</View>
						<View
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'
							width={width * 0.9}
							paddingTop={20}
						>
							<Text
								fontSize={16}
								fontFamily={'InterBold'}
								color='#616161'
							>
								Events Registered
							</Text>
							<Text
								fontSize={14}
								fontFamily={'InterMedium'}
								color='#616161'
							>
								Total {pastRegisterdEvents.length.toString()} Events
							</Text>
						</View>
						<Divider spacing={20} />

						<View gap={10}>
							{pastRegisterdEvents.length > 0 ? (
								pastRegisterdEvents.map((event, index) => (
									<UpcomingEventCard
										key={index}
										data={event}
										isOnProfile
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

						<View
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'
							width={width * 0.9}
							paddingTop={20}
						>
							<Text
								fontSize={16}
								fontFamily={'InterBold'}
								color='#616161'
							>
								Events Attended
							</Text>
							<Text
								fontSize={14}
								fontFamily={'InterMedium'}
								color='#616161'
							>
								Total {pastAttendedEvents.length.toString()} Events
							</Text>
						</View>
						<Divider spacing={20} />

						<View gap={10}>
							{pastAttendedEvents.length > 0 ? (
								pastAttendedEvents.map((event, index) => (
									<UpcomingEventCard
										key={index}
										data={event}
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

						<View
							flexDirection='row'
							alignItems='center'
							justifyContent='space-between'
							width={width * 0.9}
							paddingTop={20}
						>
							<Text
								fontSize={16}
								fontFamily={'InterBold'}
								color='#616161'
							>
								Events Missed
							</Text>
							<Text
								fontSize={14}
								fontFamily={'InterMedium'}
								color='#616161'
							>
								Total {pastMissedEvents.length.toString()} Events
							</Text>
						</View>
						<Divider spacing={20} />

						<View gap={10}>
							{pastMissedEvents.length > 0 ? (
								pastMissedEvents.map((event, index) => (
									<UpcomingEventCard
										key={index}
										data={event}
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
			</PTRView>
		</SafeAreaView>
	);
}
