import { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'tamagui';
import { AuthContext } from '@/context/AuthContext';
import { colors } from '@/constants';
import { Dimensions, ScrollView } from 'react-native';
import evt from '@/assets/icons/evt.png';
import home from '@/assets/icons/home.png';
import points from '@/assets/icons/points.png';
import profile from '@/assets/icons/profile.png';
import kc from '@/assets/icons/kc.png';
import earn from '@/assets/icons/earn.png';
import rem from '@/assets/icons/rem.png';
import ankit from '@/assets/images/Ankit.png';
import globe from '@/assets/images/Globe.png';
import logo from '@/assets/images/Logo_GreenBlack.png';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '@/components/Divider';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import KnowledgeCard from '@/components/KnowledgeCard';
import PointsTable from '@/components/PointsTable';
import { useRouter } from 'expo-router';
import LoadingComp from '../../../components/Loading';

const height = Dimensions.get('screen').height * 0.75;
const width = Dimensions.get('screen').width;

export default function HomeScreen() {
	const { userToken, userInfo, loading, error, login, lookupUser, toggleAuth } =
		useContext(AuthContext);
	const [userProfile, setUserProfile] = useState({});
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [knowledgeCards, setKnowledgeCards] = useState([]);
	const [pointsData, setPoints] = useState([]);
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

	const scrollTo = (off) => {
		scrollRef.current.scrollTo({ y: off, animated: true });
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
				setUserProfile([]);
				console.log('HomeScreen::getUpcomingEvents::error:: ', error);
			}
		}
	};

	const getPoints = async () => {
		if (userToken !== '' || userToken !== null || userToken !== undefined) {
			try {
				const res = await axios.get(
					'https://cioleader.azurewebsites.net/api/transactions/all?offset=0&limit=3',
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);
				setPoints(res.data.results);
			} catch (error) {
				console.log('HomeScreen::getPoints::error:: ', error);
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
				console.log('HomeScreen::getKnowledgeCards::error:: ', error);
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
				setUserProfile(res.data);
			} catch (error) {
				console.log('HomeScreen::getUserProfile::error:: ', error);
				setUserProfile({});
			}
		}
	};

	useEffect(() => {
		setIsLoading(true);
		console.log('HomeScreen::useEffect:: ', userToken);
		getUserProfile();
		getUpcomingEvents();
		getKnowledgeCards();
		getPoints();
		setIsLoading(false);
	}, []);

	return !isLoading ? (
		<SafeAreaView
			edges={['top', 'bottom', 'right', 'left']}
			flex={1}
		>
			<View
				height={Dimensions.get('screen').height * 0.1}
				backgroundColor={'#fff'}
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				paddingHorizontal={20}
			>
				<Image
					source={{
						uri: logo,
					}}
					height={Dimensions.get('screen').height * 0.08}
					width={Dimensions.get('screen').width * 0.5}
					resizeMode='contain'
				/>
			</View>
			<ScrollView
				ref={scrollRef}
				contentContainerStyle={{
					alignItems: 'center',
					bottom: 60,
				}}
			>
				<View
					height={height * 0.7}
					ref={homeRef}
					onLayout={(e) => {
						console.log(e.nativeEvent.layout.y);
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
						<Image
							position='absolute'
							source={globe}
							resizeMode='contain'
						/>
						<Text fontSize={40}>WELCOME!!</Text>
						<Image
							height={100}
							width={100}
							borderRadius={20}
							source={{
								uri: userProfile.profilepicture || ankit,
							}}
						/>
						<Text fontSize={20}>
							{`${userProfile.fname} ${userProfile.lname}` || 'Ankit'}
						</Text>
						<Text fontSize={16}>{userProfile.designation || 'Founder'}</Text>
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
							width={width * 0.4}
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
									height={30}
									width={30}
								/>
								<Text
									textAlign='center'
									fontSize={20}
								>
									{userProfile.earnmonth}
								</Text>
							</View>
							<Text
								textAlign='center'
								fontSize={16}
							>
								Total earned in the last month
							</Text>
						</View>
						<View
							alignItems='center'
							flexDirection='column'
							justifyContent='center'
							padding={10}
							borderRadius={20}
							elevationAndroid={10}
							width={width * 0.4}
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
									height={30}
									width={30}
								/>
								<Text
									textAlign='center'
									fontSize={20}
								>
									{userProfile.points}
								</Text>
							</View>
							<Text
								textAlign='center'
								fontSize={16}
							>
								Remaining points
							</Text>
						</View>
					</View>
				</View>
				<View>
					<Text
						color='#000'
						textAlign='center'
						textTransform='uppercase'
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
						color={'#000'}
						textAlign='center'
					>
						CIO&L Privilege Code
					</Text>
					<Text
						color={'#000'}
						textAlign='center'
					>
						{userProfile.code}
					</Text>
				</View>
				<Divider />
				<View
					ref={eventRef}
					onLayout={(e) => {
						console.log(e.nativeEvent.layout.y);
						setOffsetY({
							...offsetY,
							evt: e.nativeEvent.layout.y,
						});
					}}
				></View>
				<View
					gap={10}
					marginBottom={10}
				>
					{upcomingEvents.map((item, index) => (
						<UpcomingEventCard
							key={index}
							data={item}
						/>
					))}
				</View>
				<Divider />
				<View
					ref={kcRef}
					onLayout={(e) => {
						console.log(e.nativeEvent.layout.y);
						setOffsetY({
							...offsetY,
							kc: e.nativeEvent.layout.y,
						});
					}}
				></View>

				<Text
					width={'90%'}
					color='#000'
				>
					Knowledge Center
				</Text>
				<Text
					width={'90%'}
					color='#000'
					marginBottom={20}
				>
					Whitepaper Reports
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

				<Divider />

				<View
					ref={ptsRef}
					onLayout={(e) => {
						console.log(e.nativeEvent.layout.y);
						setOffsetY({
							...offsetY,
							pts: e.nativeEvent.layout.y,
						});
					}}
					marginLeft={Dimensions.get('screen').width * 0.1}
					width={'100%'}
					marginBottom={10}
				>
					<PointsTable
						isOnHome
						data={pointsData.length === 0 ? [] : pointsData}
					/>
				</View>
			</ScrollView>
			<View
				height={60}
				position='absolute'
				bottom={0}
				left={0}
				width={width}
				backgroundColor={colors.primary}
				flexDirection='row'
				justifyContent='space-between'
				paddingHorizontal={20}
				alignItems='center'
				borderTopLeftRadius={Dimensions.get('screen').width * 0.05}
				borderTopRightRadius={Dimensions.get('screen').width * 0.05}
			>
				<View
					onPress={() => {
						scrollTo(offsetY.home);
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						source={home}
						height={30}
						width={30}
					/>
					<Text>Home</Text>
				</View>
				<View
					onPress={() => {
						scrollTo(offsetY.evt);
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						source={evt}
						height={30}
						width={30}
					/>
					<Text>Events</Text>
				</View>
				<View
					onPress={() => {
						scrollTo(offsetY.kc);
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						source={kc}
						height={30}
						width={30}
					/>
					<Text>KC</Text>
				</View>
				<View
					onPress={() => {
						scrollTo(offsetY.pts);
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						source={points}
						height={30}
						width={30}
					/>
					<Text>Points</Text>
				</View>
				<View
					onPress={() => {
						router.push('/authUser/pro');
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						source={profile}
						height={30}
						width={30}
					/>
					<Text>Profile</Text>
				</View>
			</View>
		</SafeAreaView>
	) : (
		<LoadingComp />
	);
}
