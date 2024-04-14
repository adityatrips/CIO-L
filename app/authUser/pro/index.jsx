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
import logo from '@/assets/images/Logo_GreenBlack.png';
import LoadingComp from '@/components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from '@tamagui/lucide-icons';
import UpcomingEventCard from '@/components/UpcomingEventCard';

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
			setPastEvents(res.data);
		} catch (error) {
			console.log('ProfileScreen::getPastEvents::error:: ', error);
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
			<View
				backgroundColor={'#fff'}
				flexDirection='row'
				justifyContent='center'
				alignItems='center'
				paddingHorizontal={20}
				width={Dimensions.get('screen').width}
			>
				<ChevronLeft
					position='absolute'
					left={20}
					color='#000'
					onPress={() => {
						router.back();
					}}
				/>
				<Image
					source={{
						uri: logo,
					}}
					height={Dimensions.get('screen').height * 0.08}
					width={Dimensions.get('screen').width * 0.4}
					resizeMode='contain'
				/>
			</View>
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
							My Past Events
						</Text>
						<Text
							fontSize={14}
							fontFamily={'InterMedium'}
							color='#616161'
						>
							Total {pastEvents.length.toString()} Events
						</Text>
					</View>
					<Divider spacing={20} />

					<View gap={10}>
						{pastEvents.length > 0 ? (
							pastEvents.map((event, index) => (
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
		</SafeAreaView>
	);
}
