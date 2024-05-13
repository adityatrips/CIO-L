import { Button, Image, ScrollView, Text, View } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { Dimensions, RefreshControl, Vibration } from 'react-native';
import { colors, vibrateHeavy } from '@/constants';
import ankit from '@/assets/images/Ankit.png';
import globe from '@/assets/images/Globe.png';
import Divider from '@/components/Divider';
import logo from '@/assets/images/Logo_GreenBlack.png';
import LoadingComp from '@/components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Pencil } from '@tamagui/lucide-icons';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import PTRView from 'react-native-pull-to-refresh';
import HeaderComp from '@/components/Header';
import evt from '@/assets/icons/evt.png';
import home from '@/assets/icons/home.png';
import points from '@/assets/icons/points.png';
import profile from '@/assets/icons/profile.png';
import kc from '@/assets/icons/kc.png';
import Toast from 'react-native-root-toast';
import RegisteredCard from '@/components/RegisteredCard';
import MissedCard from '@/components/MissedCard';
const height = Dimensions.get('screen').height * 0.75;
const width = Dimensions.get('screen').width;

export default function ProfileScreen() {
	const router = useRouter();
	const { userToken } = useContext(AuthContext);
	const [userProfile, setUserProfile] = useState({});
	const [attendedEvents, setAttendedEvents] = useState([]);
	const [registeredEvents, setRegisteredEvents] = useState([]);
	const [missedEvents, setMissedEvents] = useState([]);
	const [profileLoading, setProfileLoading] = useState(true);
	const [attendedEventLoading, setAttendedEventLoading] = useState(true);
	const [registeredEventLoading, setRegisteredEventLoading] = useState(true);
	const [missedEventLoading, setMissedEventLoading] = useState(true);

	const logout = async () => {
		await SecureStore.deleteItemAsync('userToken');
		await SecureStore.deleteItemAsync('userInfo');

		router.push('/');
	};

	useEffect(() => {
		getProfile().then(() => {
			getEvents();
		});
	}, []);

	const getProfile = async () => {
		setProfileLoading(true);
		const prof = await axios.get(
			'https://cioleader.azurewebsites.net/api/member/',
			{
				headers: {
					Authorization: `Token ${userToken}`,
				},
			}
		);
		setUserProfile(prof.data);
		setProfileLoading(false);
	};

	const getEvents = async () => {
		setAttendedEventLoading(true);
		setMissedEventLoading(true);
		setRegisteredEventLoading(true);
		try {
			const evt = await axios.get(
				'https://cioleader.azurewebsites.net/api/event/past/all',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setAttendedEvents(evt.data.filter((evt) => evt.registered === '2'));
			setMissedEvents(evt.data.filter((evt) => evt.registered === '3'));
			setAttendedEventLoading(false);
			setMissedEventLoading(false);
			const allEvts = await axios.get(
				'https://cioleader.azurewebsites.net/api/event/all/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setRegisteredEvents(allEvts.data.filter((evt) => evt.registered === '1'));
			setRegisteredEventLoading(false);
		} catch (error) {
			Toast.show('Error fetching details. Please try again in some time', {
				duration: Toast.durations.SHORT,
			});
			vibrateHeavy();
		} finally {
			setAttendedEventLoading(false);
			setMissedEventLoading(false);
			setRegisteredEventLoading(false);
		}
	};

	return profileLoading ? (
		<LoadingComp />
	) : (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<HeaderComp title='Profile' />
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						onRefresh={() => {
							getData();
						}}
						refreshing={profileLoading}
					/>
				}
				flex={1}
			>
				<Button
					position='absolute'
					top={10}
					right={10}
					zIndex={2}
					icon={() => <Pencil />}
					backgroundColor={'#FFFFFF00'}
					borderColor={'#FFFFFF'}
					borderWidth={2}
					onPress={() => router.push('/screenEditProfile')}
					pressStyle={{
						backgroundColor: colors.primaryDark,
						borderColor: '#fff',
					}}
				>
					<Text
						fontSize={14}
						fontFamily={'InterSemiBold'}
					>
						Edit Profile
					</Text>
				</Button>
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
								width={width * 0.9}
								height={height * 0.5}
								source={globe}
								resizeMode='contain'
							/>
							<Image
								height={110}
								width={120}
								marginLeft={Dimensions.get('screen').width * 0.05}
								borderRadius={20}
								source={{
									uri: userProfile.profilepicture || ankit,
								}}
							/>
							<View>
								<Text
									fontSize={22}
									fontFamily={'InterBold'}
									width={width * 0.55}
								>
									{`${userProfile.fname} ${userProfile.lname}` || 'Ankit'}
								</Text>
								<Text
									width={width * 0.55}
									fontSize={16}
									fontFamily={'InterMedium'}
								>
									{userProfile.designation || 'Founder'}
								</Text>
								<Text
									fontSize={16}
									fontFamily={'InterMedium'}
									width={width * 0.55}
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
					{registeredEventLoading ? (
						<LoadingComp small />
					) : (
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
								Total {registeredEvents.length.toString()}{' '}
								{registeredEvents.length === 1 ? 'Event' : 'Events'}
							</Text>
						</View>
					)}
					<Divider spacing={20} />

					{registeredEventLoading ? (
						<LoadingComp small />
					) : (
						<View gap={10}>
							{registeredEvents.length > 0 ? (
								registeredEvents.map((event, index) => (
									<RegisteredCard
										key={index}
										data={event}
									/>
								))
							) : (
								<Text
									color='#000'
									marginBottom={20}
								>
									You haven't registered for any events till yet...
								</Text>
							)}
						</View>
					)}

					{attendedEventLoading ? (
						<LoadingComp small />
					) : (
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
								Total {attendedEvents.length.toString()}{' '}
								{attendedEvents.length === 1 ? 'Event' : 'Events'}
							</Text>
						</View>
					)}
					<Divider spacing={20} />

					{attendedEventLoading ? (
						<LoadingComp small />
					) : (
						<View gap={10}>
							{attendedEvents.length > 0 ? (
								attendedEvents.map((event, index) => (
									<UpcomingEventCard
										attended
										srcRoute='Profile'
										key={index}
										data={event}
									/>
								))
							) : (
								<Text
									color='#000'
									marginBottom={20}
								>
									You haven't attended any events till yet...
								</Text>
							)}
						</View>
					)}

					{missedEventLoading ? (
						<LoadingComp small />
					) : (
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
								Total {missedEvents.length.toString()}{' '}
								{missedEvents.length === 1 ? 'Event' : 'Events'}
							</Text>
						</View>
					)}
					<Divider spacing={20} />

					{missedEventLoading ? (
						<LoadingComp small />
					) : (
						<View gap={10}>
							{missedEvents.length > 0 ? (
								missedEvents.map((event, index) => (
									<MissedCard
										key={index}
										srcRoute='Profile'
										data={event}
										missed
									/>
								))
							) : (
								<Text
									color='#000'
									marginBottom={20}
								>
									You haven't missed any events, keep it up!
								</Text>
							)}
						</View>
					)}

					<Button
						backgroundColor={colors.primary}
						borderColor={colors.primary}
						pressStyle={{
							backgroundColor: colors.primary,
							borderColor: colors.primary,
						}}
						width={'90%'}
						borderRadius={100 / 2}
						onPress={logout}
						marginTop={20}
						marginBottom={40}
					>
						SIGNOUT
					</Button>
					<Text fontSize={20}>Profile</Text>
				</View>
			</ScrollView>
			<View
				height={60}
				position='absolute'
				bottom={0}
				left={0}
				width={width}
				backgroundColor={'#6BB943'}
				flexDirection='row'
				justifyContent='space-between'
				paddingHorizontal={20}
				alignItems='center'
				borderTopLeftRadius={Dimensions.get('screen').width * 0.05}
				borderTopRightRadius={Dimensions.get('screen').width * 0.05}
			>
				<View
					flexGrow={1}
					padding={5}
					onPress={() => {
						router.push('/home');
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						source={home}
						height={25}
						width={'auto'}
						aspectRatio={0.89}
					/>
					<Text
						fontSize={10}
						fontFamily={'InterSemiBold'}
						textTransform='uppercase'
					>
						Home
					</Text>
				</View>
				<View
					flexGrow={1}
					padding={5}
					onPress={() => {
						router.push('/home');
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						source={evt}
						height={25}
						width={25}
					/>
					<Text
						fontSize={10}
						fontFamily={'InterSemiBold'}
						textTransform='uppercase'
					>
						Events
					</Text>
				</View>
				<View
					flexGrow={1}
					padding={5}
					onPress={() => {
						router.push('/home');
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						source={kc}
						height={25}
						width={25}
					/>
					<Text
						fontSize={10}
						fontFamily={'InterSemiBold'}
						textTransform='uppercase'
					>
						KC
					</Text>
				</View>
				<View
					flexGrow={1}
					padding={5}
					onPress={() => {
						router.push('/home');
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						source={points}
						height={25}
						width={'auto'}
						aspectRatio={1.25}
					/>
					<Text
						fontSize={10}
						fontFamily={'InterSemiBold'}
						textTransform='uppercase'
					>
						Points
					</Text>
				</View>
				<View
					flexGrow={1}
					padding={5}
					justifyContent='center'
					alignItems='center'
					backgroundColor={'#FFFFFF50'}
					borderRadius={100 / 2}
					aspectRatio={1 / 1}
					width={30}
				>
					<Image
						source={profile}
						height={25}
						width={'auto'}
						aspectRatio={0.87}
					/>
					<Text
						fontSize={10}
						fontFamily={'InterSemiBold'}
						textTransform='uppercase'
					>
						Profile
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
