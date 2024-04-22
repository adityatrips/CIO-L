import { useContext, useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'tamagui';
import { AuthContext } from '@/context/AuthContext';
import { colors } from '@/constants';
import {
	Dimensions,
	RefreshControl,
	ScrollView,
	ToastAndroid,
} from 'react-native';
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
import { useRouter } from 'expo-router';
import LoadingComp from '@/components/Loading';
import { StatusBar } from 'expo-status-bar';
import HeaderComp from '@/components/Header';
import ResourceCard from '@/components/ResourceCard';
import PodcastCard from '@/components/PodcastCard';
import EditorialMags from '@/components/EditorialMags';
import moment from 'moment';

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
	const [podcastData, setPodcastData] = useState([]);
	const [magData, setMagData] = useState([]);
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
		scrollRef.current.scrollTo({
			y: off + 60,
			animated: true,
		});
	};

	const getUpcomingEvents = async () => {
		setIsLoading(true);
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
				ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
				setUserProfile([]);
			}
		}
	};

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
				setPoints(res.data);
			} catch (error) {
				ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			}
		}
	};

	const getMags = async () => {
		setIsLoading(true);
		if (userToken !== '' || userToken !== null || userToken !== undefined) {
			try {
				const res = await axios.get(
					'https://cioleader.azurewebsites.net/api/editorial/all',
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);
				setMagData(res.data);
			} catch (error) {
				ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			}
		}
	};

	const getResourceList = async () => {
		setIsLoading(true);
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
				ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			}
		}
	};

	const getKnowledgeCards = async () => {
		setIsLoading(true);
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
				ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			}
		}
	};

	const [currScroll, setCurrScroll] = useState(0);

	const getUserProfile = async () => {
		setIsLoading(true);
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
					router.push({
						pathname: 'modal',
						params: {
							status: 'UserSubmittedTheQuiz',
						},
					});
				} else {
					setUserProfile(res.data);
				}
			} catch (error) {
				setUserProfile({});
				ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			}
		}
	};

	const getPodcasts = async () => {
		setIsLoading(true);
		if (userToken !== '' || userToken !== null || userToken !== undefined) {
			try {
				const res = await axios.get(
					'https://cioleader.azurewebsites.net/api/podcast/all/',
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);
				setPodcastData(res.data);
			} catch (error) {
				setPodcastData([]);
				ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			}
		}
	};

	useEffect(() => {
		getUserProfile();
		getUpcomingEvents();
		getKnowledgeCards();
		getResourceList();
		getPodcasts();
		getPoints();
		getMags();
		setIsLoading(false);
	}, []);

	return !isLoading && !loading ? (
		<SafeAreaView
			edges={['top', 'bottom', 'right', 'left']}
			flex={1}
		>
			<StatusBar style='dark' />
			<HeaderComp title='Welcome' />
			<ScrollView
				onScroll={(e) => {
					setCurrScroll(e.nativeEvent.contentOffset.y);
				}}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={() => {
							setIsLoading(true);
							getUserProfile();
							getUpcomingEvents();
							getKnowledgeCards();
							getResourceList();
							getPodcasts();
							getPoints();
							getMags();
							setIsLoading(false);
						}}
					/>
				}
				ref={scrollRef}
				style={{
					bottom: 10,
					flex: 1,
					marginBottom: 20,
				}}
				contentContainerStyle={{
					alignItems: 'center',
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
								No upcoming events for now...
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
				{knowledgeCards.length > 0 ? (
					<ScrollView
						horizontal
						gap={10}
						marginBottom={10}
						width='90%'
					>
						{knowledgeCards.map((item, index) => (
							<KnowledgeCard
								getFn={getKnowledgeCards}
								setIsLoading={setIsLoading}
								key={index}
								data={item}
							/>
						))}
					</ScrollView>
				) : (
					<Text
						color='#000'
						textAlign='center'
						width={Dimensions.get('screen').width * 0.9}
						marginBottom={20}
					>
						No whitepapers available...
					</Text>
				)}

				<Text
					width={'90%'}
					color='#616161'
					marginBottom={20}
					fontSize={14}
					fontFamily={'InterMedium'}
				>
					Editorial Magazines
				</Text>

				{/* {magData.length > 0 ? (
					magData.filter((mag) => mag.magzine === '1').length > 1 ? (
						<ScrollView
							horizontal
							gap={10}
							marginBottom={10}
							width='90%'
						>
							{magData
								.filter((mag) => mag.magzine === '1')
								.map((item, index) => (
									<EditorialMags
										getFn={getMags}
										setIsLoading={setIsLoading}
										key={index}
										data={item}
									/>
								))}
						</ScrollView>
					) : (
						magData
							.filter((mag) => mag.magzine === '1')
							.map((item, index) => (
								<EditorialMags
									getFn={getMags}
									setIsLoading={setIsLoading}
									key={index}
									data={item}
									width={'90%'}
								/>
							))
					)
				) : magData.filter((mag) => mag.magzine === '2').length > 1 ? (
					<ScrollView
						horizontal
						gap={10}
						marginBottom={10}
						width='90%'
					>
						{magData
							.filter((mag) => mag.magzine === '2')
							.map((item, index) => (
								<EditorialMags
									getFn={getMags}
									setIsLoading={setIsLoading}
									key={index}
									data={item}
								/>
							))}
					</ScrollView>
				) : magData
						.filter((mag) => mag.magzine === '2')
						.map((item, index) => (
							<EditorialMags
								getFn={getMags}
								setIsLoading={setIsLoading}
								key={index}
								data={item}
								width={'90%'}
							/>
						)) ? (
					<Text
						color='#000'
						textAlign='center'
						width={Dimensions.get('screen').width * 0.9}
						marginBottom={20}
					>
						No new magazines...
					</Text>
				) : (
					<Text
						color='#000'
						textAlign='center'
						width={Dimensions.get('screen').width * 0.9}
						marginBottom={20}
					>
						No new magazines...
					</Text>
				)} */}
				{magData.filter((mag) => mag.magzine === '1').length > 1 ? (
					<ScrollView
						horizontal
						gap={10}
						marginBottom={10}
						width='90%'
					>
						{magData
							.filter((mag) => mag.magzine === '1')
							.map((item, index) => (
								<EditorialMags
									getFn={getMags}
									setIsLoading={setIsLoading}
									key={index}
									data={item}
								/>
							))}
					</ScrollView>
				) : (
					magData
						.filter((mag) => mag.magzine === '1')
						.map((item, index) => (
							<EditorialMags
								getFn={getMags}
								setIsLoading={setIsLoading}
								key={index}
								data={item}
								width={'90%'}
							/>
						))
				)}
				{magData.filter((mag) => mag.magzine === '2').length > 1 ? (
					<ScrollView
						horizontal
						gap={10}
						marginBottom={10}
						width='90%'
					>
						{magData
							.filter((mag) => mag.magzine === '2')
							.map((item, index) => (
								<EditorialMags
									getFn={getMags}
									setIsLoading={setIsLoading}
									key={index}
									data={item}
								/>
							))}
					</ScrollView>
				) : (
					magData
						.filter((mag) => mag.magzine === '2')
						.map((item, index) => (
							<EditorialMags
								getFn={getMags}
								setIsLoading={setIsLoading}
								key={index}
								data={item}
								width={'90%'}
							/>
						))
				)}

				<Text
					width={'90%'}
					color='#616161'
					marginBottom={20}
					fontSize={14}
					fontFamily={'InterMedium'}
				>
					Podcast
				</Text>

				{podcastData.length > 0 ? (
					<ScrollView
						horizontal
						gap={10}
						marginBottom={10}
						width='90%'
					>
						{podcastData.map((item, index) => (
							<PodcastCard
								getFn={getPodcasts}
								setIsLoading={setIsLoading}
								key={index}
								data={item}
							/>
						))}
					</ScrollView>
				) : podcastData.length === 1 ? (
					<View width={'90%'}>
						<PodcastCard
							getFn={getPodcasts}
							setIsLoading={setIsLoading}
							data={podcastData}
						/>
					</View>
				) : (
					<Text
						color='#000'
						textAlign='center'
						width={Dimensions.get('screen').width * 0.9}
						marginBottom={20}
					>
						No podcast available...
					</Text>
				)}

				<Text
					width={'90%'}
					color='#616161'
					marginBottom={20}
					fontSize={14}
					fontFamily={'InterMedium'}
				>
					Resource Libraries
				</Text>

				{resourceData.length > 1 ? (
					<ScrollView
						horizontal
						gap={10}
						marginBottom={10}
						width='90%'
					>
						{resourceData.map((item, index) => (
							<ResourceCard
								getFn={getResourceList}
								setIsLoading={setIsLoading}
								key={index}
								data={item}
							/>
						))}
					</ScrollView>
				) : resourceData.length === 1 ? (
					resourceData.map((item, index) => (
						<ResourceCard
							getFn={getResourceList}
							setIsLoading={setIsLoading}
							key={index}
							data={item}
							width={'90%'}
						/>
					))
				) : (
					<Text
						color='#000'
						textAlign='center'
						width={Dimensions.get('screen').width * 0.9}
					>
						No blogs available...
					</Text>
				)}

				<Divider />
				<Text
					width={'90%'}
					color='#616161'
					fontSize={14}
					fontFamily={'InterSemiBold'}
					marginBottom={20}
				>
					CIO&Leader Loyalty Point History
				</Text>
				{pointsData.results && pointsData.results.length > 0 ? (
					<View
						ref={ptsRef}
						onLayout={(e) => {
							setOffsetY({
								...offsetY,
								pts: e.nativeEvent.layout.y,
							});
						}}
						width={Dimensions.get('window').width * 0.9}
					>
						<View
							flexDirection={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							backgroundColor={'#EbEBEB'}
							padding={10}
							borderTopRightRadius={20}
							borderTopLeftRadius={20}
							borderWidth={0.5}
							borderColor='#61616150'
							width={Dimensions.get('window').width * 0.9}
						>
							<Text
								textAlign={'center'}
								flex={0.2}
								textTransform={'uppercase'}
								fontSize={10}
								fontFamily={'InterBold'}
								color={'#616161'}
							>
								Date
							</Text>
							<Text
								textAlign={'center'}
								flex={0.6}
								textTransform={'uppercase'}
								fontSize={10}
								fontFamily={'InterBold'}
								color={'#616161'}
							>
								Activity
							</Text>
							<Text
								textAlign={'center'}
								flex={0.2}
								textTransform={'uppercase'}
								fontSize={10}
								fontFamily={'InterBold'}
								color={'#616161'}
							>
								Points
							</Text>
						</View>
						<View
							borderBottomRightRadius={20}
							borderBottomLeftRadius={20}
							marginBottom={20}
							borderColor='#61616150'
							borderWidth={0.5}
							backgroundColor={'#fff'}
						>
							{pointsData.results &&
								pointsData.results.map((item, index) => {
									return (
										item && (
											<View
												key={index}
												flexDirection={'row'}
												justifyContent={'space-between'}
												alignItems={'center'}
												width={Dimensions.get('window').width * 0.9}
												padding={10}
												borderBottomColor={'#61616150'}
												borderBottomWidth={0.5}
												paddingVertical={10}
											>
												<Text
													textAlign={'center'}
													flex={0.2}
													textTransform={'uppercase'}
													color={'#616161'}
													fontSize={10}
												>
													{moment(item.date, 'YYYY-MM-DD').format(
														'MMM DD, YYYY'
													)}
												</Text>
												<Text
													textAlign={'center'}
													flex={0.6}
													textTransform={'uppercase'}
													color={'#616161'}
													fontSize={10}
												>
													{item.description}
												</Text>
												<View
													flex={0.2}
													flexDirection={'row'}
													alignItems={'center'}
													justifyContent={'center'}
													fontSize={10}
												>
													<Image
														source={require('@/assets/images/Coin1.png')}
														height={20}
														width={20}
													/>
													<Text
														textAlign={'center'}
														textTransform={'uppercase'}
														color={item.type === '1' ? 'green' : '#CC3340'}
														fontSize={11}
														fontFamily={'InterMedium'}
													>
														{item.type === '1' ? '+' : '-'}
														{item.amount}
													</Text>
												</View>
											</View>
										)
									);
								})}
							<Button
								onPress={() => {
									router.push('/authUser/pts');
								}}
								textAlign='right'
								color='#fff'
								backgroundColor={colors.primary}
								borderColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primary,
									borderColor: colors.primary,
								}}
								fontSize={12}
								fontFamily='InterMedium'
								height={30}
								marginVertical={5}
								marginRight={5}
								width={'40%'}
								alignSelf='flex-end'
							>
								View More
							</Button>

							<View
								backgroundColor={'#FFFFFF'}
								borderRadius={20}
								justifyContent={'space-between'}
								alignItems={'center'}
								flexDirection={'row'}
								padding={10}
								width={Dimensions.get('window').width * 0.9}
								marginBottom={5}
							>
								<View
									justifyContent={'space-between'}
									alignItems={'center'}
									borderRightWidth={1}
									borderColor={'#61616150'}
									flexGrow={1}
									flex={1}
								>
									<Text
										fontWeight={'bold'}
										textTransform={'uppercase'}
										fontSize={10}
										color={'green'}
									>
										Total Earned
									</Text>
									<View
										alignItems={'center'}
										justifyContent={'center'}
										flexDirection={'row'}
									>
										<Image
											source={require('@/assets/images/Coin1.png')}
											height={20}
											width={20}
										/>
										<Text
											color={'green'}
											fontWeight={'bold'}
											fontSize={10}
										>
											{pointsData.earned}
										</Text>
									</View>
								</View>

								<View
									justifyContent={'space-between'}
									alignItems={'center'}
									borderRightWidth={1}
									borderColor={'#61616150'}
									width={'90%'}
									flexGrow={1}
									flex={1}
								>
									<Text
										fontWeight={'bold'}
										textTransform={'uppercase'}
										fontSize={10}
										color={'#CC3340'}
									>
										Total Redeem
									</Text>
									<View
										alignItems={'center'}
										justifyContent={'center'}
										flexDirection={'row'}
									>
										<Image
											source={require('@/assets/images/Coin1.png')}
											height={20}
											width={20}
										/>
										<Text
											color={'#CC3340'}
											fontWeight={'bold'}
											fontSize={10}
										>
											{pointsData.redeemed}
										</Text>
									</View>
								</View>

								<View
									justifyContent={'space-between'}
									alignItems={'center'}
									flexGrow={1}
									flex={1}
								>
									<Text
										fontWeight={'bold'}
										textTransform={'uppercase'}
										fontSize={10}
										color={'#616161'}
									>
										Balance
									</Text>
									<View
										alignItems={'center'}
										justifyContent={'center'}
										flexDirection={'row'}
									>
										<Image
											source={require('@/assets/images/Coin1.png')}
											height={20}
											width={20}
										/>
										<Text
											color={'green'}
											fontWeight={'bold'}
											fontSize={10}
										>
											{pointsData.balance}
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				) : (
					<View width={'90%'}>
						<Text
							textAlign='center'
							color={colors.text}
							marginBottom={50}
						>
							No transactions currently, perform some activities...
						</Text>
					</View>
				)}
				<Button
					marginBottom={40}
					marginTop={5}
					width={'90%'}
					borderRadius={100 / 2}
					backgroundColor={colors.primary}
					borderColor={colors.primary}
					pressStyle={{
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					}}
					onPress={() => {
						router.push('/screenStore');
					}}
					height={50}
				>
					<Text
						fontSize={14}
						fontFamily={'InterBold'}
					>
						REDEEM POINTS
					</Text>
				</Button>
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
					borderRadius={100 / 2}
					aspectRatio={1 / 1}
					width={30}
					backgroundColor={
						currScroll >= -100 && currScroll < offsetY.evt + 60
							? '#FFFFFF50'
							: 'transparent'
					}
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
					borderRadius={100 / 2}
					aspectRatio={1 / 1}
					width={30}
					backgroundColor={
						currScroll >= offsetY.evt && currScroll < offsetY.kc + 60
							? '#FFFFFF50'
							: 'transparent'
					}
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
					borderRadius={100 / 2}
					aspectRatio={1 / 1}
					width={30}
					backgroundColor={
						currScroll >= offsetY.kc && currScroll < offsetY.pts + 60
							? '#FFFFFF50'
							: 'transparent'
					}
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
					borderRadius={100 / 2}
					aspectRatio={1 / 1}
					width={30}
					backgroundColor={
						currScroll >= offsetY.pts ? '#FFFFFF50' : 'transparent'
					}
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
