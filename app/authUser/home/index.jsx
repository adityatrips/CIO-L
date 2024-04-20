import { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'tamagui';
import { AuthContext } from '@/context/AuthContext';
import { colors } from '@/constants';
import { Dimensions, ScrollView, ToastAndroid } from 'react-native';
import evt from '@/assets/icons/evt.png';
import home from '@/assets/icons/home.png';
import points from '@/assets/icons/points.png';
import profile from '@/assets/icons/profile.png';
import kc from '@/assets/icons/kc.png';
import earn from '@/assets/icons/earn.png';
import rem from '@/assets/icons/rem.png';
import ankit from '@/assets/images/Ankit.png';
import globe from '@/assets/images/Globe.png';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '@/components/Divider';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import KnowledgeCard from '@/components/KnowledgeCard';
import PointsTable from '@/components/PointsTable';
import { useRouter } from 'expo-router';
import LoadingComp from '@/components/Loading';
import { StatusBar } from 'expo-status-bar';
import PTRView from 'react-native-pull-to-refresh';
import HeaderComp from '@/components/Header';

const height = Dimensions.get('screen').height * 0.75;
const width = Dimensions.get('screen').width;

export default function HomeScreen() {
	const { userToken, userInfo, loading, error, login, lookupUser, toggleAuth } =
		useContext(AuthContext);
	const [userProfile, setUserProfile] = useState({});
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [knowledgeCards, setKnowledgeCards] = useState([]);
	const [pointsData, setPoints] = useState({});
	const [resourceData, setResourceData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [offsetY, setOffsetY] = useState({
		home: 0,
		evt: 0,
		kc: 0,
		pts: 0,
	});
	const router = useRouter();
	const homeRef = React.useRef(null);
	const eventRef = React.useRef(null);
	const kcRef = React.useRef(null);
	const ptsRef = React.useRef(null);
	const scrollRef = React.useRef(null);
	const [currentScroll, setCurrentScroll] = useState(0);

	const scrollTo = (off) => {
		scrollRef.current.scrollTo({
			y: off,
			animated: true,
		});
	};

	const getUpcomingEvents = async () => {
		if (userToken !== '' || userToken !== null || userToken !== undefined) {
			try {
				const res = await axios.get(
					'https://cioleader.azurewebsites.net/api/event/all/',
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);
				setUpcomingEvents(res.data);
			} catch (error) {
				ToastAndroid.show('Error fetching events', ToastAndroid.SHORT);
				setUserProfile([]);
			}
		}
	};

	const getPoints = async () => {
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
				setPoints(res.data);
			} catch (error) {
				ToastAndroid.show('Error fetching points', ToastAndroid.SHORT);
			}
		}
	};

	const getResourceList = async () => {
		if (userToken !== '' || userToken !== null || userToken !== undefined) {
			try {
				const res = await axios.get(
					'https://cioleader.azurewebsites.net/api/resource/all/',
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);
				setResourceData(res.data);
			} catch (error) {
				ToastAndroid.show('Error fetching resources', ToastAndroid.SHORT);
			}
		}
	};

	const getKnowledgeCards = async () => {
		if (userToken !== '' || userToken !== null || userToken !== undefined) {
			try {
				const res = await axios.get(
					'https://cioleader.azurewebsites.net/api/whitepaper/all/',
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);
				setKnowledgeCards(res.data);
			} catch (error) {
				ToastAndroid.show('Error fetching knowledge cards', ToastAndroid.SHORT);
			}
		}
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

				if (res.data.status === '2' || res.data.status === '3') {
					router.push('modal');
				} else {
					setIsLoading(false);
					setUserProfile(res.data);
				}
			} catch (error) {
				setUserProfile({});
				ToastAndroid.show('Error fetching user profile', ToastAndroid.SHORT);
			}
		}
	};

	useEffect(() => {
		setIsLoading(true);
		getUserProfile();
		getUpcomingEvents();
		getKnowledgeCards();
		getResourceList();
		getPoints();
		setIsLoading(false);
	}, []);

	return !isLoading ? (
		<SafeAreaView
			edges={['top', 'bottom', 'right', 'left']}
			flex={1}
		>
			<StatusBar style='dark' />
			<HeaderComp title='Welcome' />
			<ScrollView
				onScroll={(e) => {
					setCurrentScroll(e.nativeEvent.contentOffset.y);
				}}
				ref={scrollRef}
			>
				<PTRView
					style={{
						bottom: 10,
						flex: 1,
						marginBottom: 20,
					}}
					contentContainerStyle={{
						alignItems: 'center',
					}}
					onRefresh={() => {
						getUserProfile();
						getUpcomingEvents();
						getKnowledgeCards();
						getResourceList();
						getPoints();
					}}
				>
					<View
						height={height * 0.7}
						ref={homeRef}
						onLayout={(e) => {
							setOffsetY({
								...offsetY,
								home: e.nativeEvent.layout.y,
							});
						}}
					>
						<View
							height={height * 0.6}
							width={width}
							alignItems='center'
							justifyContent='center'
							position='relative'
							overflow='visible'
							backgroundColor={colors.primary}
						>
							<View
								top={Dimensions.get('screen').height * 0.1}
								position='absolute'
							>
								<Image
									source={globe}
									resizeMode='contain'
								/>
							</View>
							<Text
								fontSize={35}
								fontFamily={'InterBold'}
							>
								WELCOME!!
							</Text>
							<Image
								height={110}
								width={120}
								borderRadius={20}
								source={{
									uri: userProfile.profilepicture || ankit,
								}}
								marginBottom={10}
							/>
							<Text
								fontSize={18}
								fontFamily={'InterBold'}
							>
								{`${userProfile.fname} ${userProfile.lname}` || 'Ankit'}
							</Text>
							<Text
								fontSize={15}
								fontFamily={'InterMedium'}
							>
								{userProfile.designation || 'Founder'}
							</Text>
						</View>
						<View
							position='absolute'
							bottom={20}
							flexDirection='row'
							justifyContent='space-between'
							alignItems='center'
							width={width}
							paddingHorizontal={20}
						>
							<View
								alignItems='center'
								justifyContent='center'
								padding={10}
								borderRadius={20}
								elevationAndroid={10}
								flexDirection='column'
								width={width * 0.425}
								height={100}
								backgroundColor={colors.primaryDark}
							>
								<View
									flexDirection='row'
									alignItems='center'
									gap={10}
								>
									<Image
										source={earn}
										height={35}
										width={'auto'}
										aspectRatio={0.837}
									/>
									<Text
										textAlign='center'
										fontSize={32}
										fontFamily={'InterBold'}
									>
										{userProfile.earnmonth || '0'}
									</Text>
								</View>
								<Text
									textAlign='center'
									fontSize={13}
									fontFamily={'InterSemiBold'}
								>
									Total Earned
								</Text>
							</View>
							<View
								alignItems='center'
								flexDirection='column'
								justifyContent='center'
								padding={10}
								borderRadius={20}
								elevationAndroid={10}
								width={width * 0.425}
								height={100}
								backgroundColor={colors.primaryDark}
							>
								<View
									flexDirection='row'
									alignItems='center'
									gap={10}
								>
									<Image
										source={rem}
										height={40}
										width={'auto'}
										aspectRatio={1.04}
									/>
									<Text
										textAlign='center'
										fontSize={32}
										fontFamily={'InterBold'}
									>
										{userProfile.points || '0'}
									</Text>
								</View>
								<Text
									textAlign='center'
									fontSize={13}
									fontFamily={'InterSemiBold'}
								>
									Remaining points
								</Text>
							</View>
						</View>
					</View>
					<View>
						<Text
							color='#616161'
							textAlign='center'
							textTransform='uppercase'
							fontSize={15}
							fontFamily={'InterBold'}
						>
							Your unique QR code
						</Text>

						<Image
							source={{
								uri: userProfile.qrcode,
							}}
							height={200}
							width={200}
						/>

						<Text
							color={'#616161'}
							fontSize={15}
							fontFamily={'InterSemiBold'}
							textTransform='uppercase'
							textAlign='center'
						>
							CIO&L Privilege Code
						</Text>
						<Text
							color={'#6BB943'}
							fontSize={21}
							fontFamily={'InterBold'}
							textTransform='uppercase'
							textAlign='center'
						>
							{userProfile.code}
						</Text>
					</View>
					<Divider
						ref={eventRef}
						onLayout={(e) => {
							setOffsetY({
								...offsetY,
								evt: e.nativeEvent.layout.y,
							});
						}}
					/>
					<Text
						fontSize={16}
						fontFamily={'InterBold'}
						color={'#616161'}
						width={'90%'}
						marginBottom={20}
					>
						Upcoming Events
					</Text>
					<View
						gap={10}
						marginBottom={10}
					>
						{upcomingEvents.length > 0 ? (
							upcomingEvents.map((item, index) => (
								<UpcomingEventCard
									key={index}
									data={item}
								/>
							))
						) : (
							<View width={'90%'}>
								<Text
									textAlign='left'
									color={colors.text}
								>
									Nothing to show here...
								</Text>
							</View>
						)}
					</View>
					<Divider
						ref={kcRef}
						onLayout={(e) => {
							setOffsetY({
								...offsetY,
								kc: e.nativeEvent.layout.y,
							});
						}}
					/>
					<View></View>

					<Text
						width={'90%'}
						color='#616161'
						fontSize={16}
						fontFamily={'InterBold'}
					>
						Knowledge Center
					</Text>
					<Text
						width={'90%'}
						color='#616161'
						marginBottom={20}
						fontSize={14}
						fontFamily={'InterMedium'}
					>
						Whitepaper & Reports
					</Text>
					<ScrollView
						horizontal
						gap={10}
						marginBottom={10}
						width='90%'
					>
						{knowledgeCards.map((item, index) => (
							<KnowledgeCard
								key={index}
								data={item}
							/>
						))}
					</ScrollView>

					<Text
						width={'90%'}
						color='#616161'
						marginBottom={20}
						fontSize={14}
						fontFamily={'InterMedium'}
					>
						Editorial Magazines
					</Text>

					<Text
						width={'90%'}
						color='#616161'
						marginBottom={20}
						fontSize={14}
						fontFamily={'InterMedium'}
					>
						Podcast
					</Text>

					<Text
						width={'90%'}
						color='#616161'
						marginBottom={20}
						fontSize={14}
						fontFamily={'InterMedium'}
					>
						Resource Libraries
					</Text>

					<ScrollView
						horizontal
						gap={10}
						marginBottom={10}
						width='90%'
					>
						{resourceData.map((item, index) => (
							<KnowledgeCard
								key={index}
								data={item}
							/>
						))}
					</ScrollView>

					<Divider />
					{pointsData.results && pointsData.results.length > 0 ? (
						<>
							<Text
								width={'90%'}
								color='#616161'
								fontSize={14}
								fontFamily={'InterSemiBold'}
							>
								CIO&Leader Loyalty Point History
							</Text>
							<View
								ref={ptsRef}
								onLayout={(e) => {
									setOffsetY({
										...offsetY,
										pts: e.nativeEvent.layout.y,
									});
								}}
								marginLeft={Dimensions.get('screen').width * 0.1}
								width={'100%'}
							>
								<PointsTable
									isOnHome
									userToken={userToken}
									link='https://cioleader.azurewebsites.net/api/transactions/all?offset=0&limit=5'
								/>
							</View>
						</>
					) : (
						<View width={'90%'}>
							<Text
								textAlign='left'
								color={colors.text}
							>
								Nothing to show here...
							</Text>
						</View>
					)}
				</PTRView>
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
						scrollTo(0);
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
						scrollTo(offsetY.evt);
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
						scrollTo(offsetY.kc);
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
						scrollTo(offsetY.pts);
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
					onPress={() => {
						router.push('/authUser/pro');
					}}
					justifyContent='center'
					alignItems='center'
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
	) : (
		<LoadingComp />
	);
}
