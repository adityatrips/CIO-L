import { forwardRef, useContext, useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'tamagui';
import { AuthContext } from '@/context/AuthContext';
import { colors, vibrateHeavy } from '@/constants';
import { Dimensions, RefreshControl, ScrollView } from 'react-native';
import evt from '@/assets/icons/evt.png';
import home from '@/assets/icons/home.png';
import points from '@/assets/icons/points.png';
import profile from '@/assets/icons/profile.png';
import kc from '@/assets/icons/kc.png';
import earn from '@/assets/icons/earn.png';
import rem from '@/assets/icons/rem.png';
import ankit from '@/assets/images/Ankit.png';
import globe from '@/assets/images/Globe.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '@/components/Divider';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import KnowledgeCard from '@/components/KnowledgeCard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import HeaderComp from '@/components/Header';
import ResourceCard from '@/components/ResourceCard';
import PodcastCard from '@/components/PodcastCard';
import EditorialMags from '@/components/EditorialMags';
import moment from 'moment';
import CollapsibleText from '../../../components/CollapsableText';
import triangle from '@/assets/images/triangle.png';
import coin from '@/assets/images/Coin1.png';
import SelectDropdown from 'react-native-select-dropdown';
import { ChevronDown } from '@tamagui/lucide-icons';
import axios from 'axios';
import LoadingComp from '@/components/Loading';
import FilteredResults from '@/components/FilteredResults';
import Toast from 'react-native-root-toast';
import { useNetInfoInstance } from '@react-native-community/netinfo';

const height = Dimensions.get('screen').height * 0.75;
const width = Dimensions.get('screen').width;

const HomeScreen = () => {
	const [userProfile, setUserProfile] = useState({});
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [knowledgeCards, setKnowledgeCards] = useState([]);
	const [pointsData, setPoints] = useState({});
	const [ResourceData, setResourceData] = useState([]);
	const [podcastData, setPodcastData] = useState([]);
	const [magData, setMagData] = useState([]);
	const [regions, setRegions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filteredRegion, setFilteredRegion] = useState(0);
	const [filteredMode, setFilteredMode] = useState(0);
	const [offsetY, setOffsetY] = useState({
		home: {
			start: 0,
			end: 0,
		},
		evt: {
			start: 0,
			end: 0,
		},
		kc: {
			start: 0,
			end: 0,
		},
		pts: {
			start: 0,
			end: 0,
		},
	});
	const [currScroll, setCurrScroll] = useState(0);
	const router = useRouter();
	const homeRef = React.useRef(null);
	const eventRef = React.useRef(null);
	const kcRef = React.useRef(null);
	const ptsRef = React.useRef(null);
	const scrollRef = React.useRef(null);
	const { userToken } = useContext(AuthContext);
	const [regionLoading, setRegionLoading] = useState(true);
	const [eventLoading, setEventLoading] = useState(true);
	const [transactionLoading, setTransactionLoading] = useState(true);
	const [magazineLoading, setMagazineLoading] = useState(true);
	const [resourceLoading, setResourceLoading] = useState(true);
	const [knowledgeLoading, setKnowledgeLoading] = useState(true);
	const [podcastLoading, setPodcastLoading] = useState(true);
	const [profileLoading, setProfileLoading] = useState(true);

	const refresh = () => {
		getUserProfileData().then(() => {
			getRegionData();
			getEventData();
			getTransactionData();
			getMagazineData();
			getResourceData();
			getKnowledgeData();
			getPodcastData();
		});
	};

	useEffect(() => {
		refresh();
	}, []);

	const getRegionData = async () => {
		setRegionLoading(true);
		try {
			const reg = await axios.get(
				'https://cioleader.azurewebsites.net/api/regions/all/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setRegions(reg.data);
		} catch (error) {
			Toast.show({});
		} finally {
			setRegionLoading(false);
		}
	};

	const getEventData = async () => {
		setEventLoading(true);
		try {
			const evnt = await axios.get(
				'https://cioleader.azurewebsites.net/api/event/all/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setUpcomingEvents(evnt.data);
		} catch (error) {
			Toast.show('Error: ' + error, { duration: Toast.durations.SHORT });
			vibrateHeavy();
		} finally {
			setEventLoading(false);
		}
	};

	const getTransactionData = async () => {
		setTransactionLoading(true);
		try {
			const pt = await axios.get(
				'https://cioleader.azurewebsites.net/api/transactions/all?offset=0&limit=5',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setPoints(pt.data);
		} catch (error) {
			Toast.show('Error: ' + error, { duration: Toast.durations.SHORT });
			vibrateHeavy();
		} finally {
			setTransactionLoading(false);
		}
	};

	const getMagazineData = async () => {
		setMagazineLoading(true);
		try {
			const mg = await axios.get(
				'https://cioleader.azurewebsites.net/api/editorial/all',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setMagData(mg.data);
		} catch (error) {
			Toast.show('Error: ' + error, { duration: Toast.durations.SHORT });
			vibrateHeavy();
		} finally {
			setMagazineLoading(false);
		}
	};

	const getResourceData = async () => {
		setResourceLoading(true);
		try {
			const rsc = await axios.get(
				'https://cioleader.azurewebsites.net/api/resource/all/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setResourceData(rsc.data);
		} catch (error) {
			Toast.show('Error: ' + error, { duration: Toast.durations.SHORT });
			vibrateHeavy();
		} finally {
			setResourceLoading(false);
		}
	};

	const getKnowledgeData = async () => {
		setKnowledgeLoading(true);
		try {
			const kcard = await axios.get(
				'https://cioleader.azurewebsites.net/api/whitepaper/all/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setKnowledgeCards(kcard.data);
		} catch (error) {
			Toast.show('Error: ' + error, { duration: Toast.durations.SHORT });
			vibrateHeavy();
		} finally {
			setKnowledgeLoading(false);
		}
	};

	const getUserProfileData = async () => {
		setProfileLoading(true);
		try {
			const uprof = await axios.get(
				'https://cioleader.azurewebsites.net/api/member/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setUserProfile(uprof.data);

			if (uprof.data.status === '2' || uprof.data.status === '3') {
				router.push({
					pathname: 'modal',
					params: {
						status: 'ApprovalPending',
					},
				});
			}
		} catch (error) {
			Toast.show('Error: ' + error, { duration: Toast.durations.SHORT });
			vibrateHeavy();
		} finally {
			setProfileLoading(false);
		}
	};

	const getPodcastData = async () => {
		setPodcastData(true);
		try {
			const pcast = await axios.get(
				'https://cioleader.azurewebsites.net/api/podcast/all/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setPodcastData(pcast.data);
		} catch (error) {
			Toast.show('Error: ' + error, { duration: Toast.durations.SHORT });
			vibrateHeavy();
		} finally {
			setPodcastLoading(false);
		}
	};

	const scrollTo = (off) => {
		scrollRef.current.scrollTo({
			y: off + 1,
			animated: true,
		});
	};

	return profileLoading ? (
		<LoadingComp />
	) : (
		<SafeAreaView
			edges={['top', 'bottom', 'right', 'left']}
			flex={1}
		>
			<StatusBar style='dark' />
			<HeaderComp title='Welcome' />
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				onScroll={(e) => {
					setCurrScroll(e.nativeEvent.contentOffset.y);
				}}
				refreshControl={
					<RefreshControl
						refreshing={profileLoading}
						onRefresh={refresh}
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
					ref={homeRef}
					onLayout={(e) => {
						setOffsetY({
							...offsetY,
							home: {
								start: e.nativeEvent.layout.y,
								end: e.nativeEvent.layout.y + e.nativeEvent.layout.height,
							},
						});
					}}
				/>
				<View alignItems='center'>
					<View
						width={width}
						alignItems='center'
						justifyContent='center'
						position='relative'
						overflow='visible'
						backgroundColor={colors.primary}
					>
						<View
							width={width}
							paddingTop={30}
							alignItems='center'
							justifyContent='center'
							overflow='visible'
							backgroundColor={colors.primary}
						>
							<View
								top={Dimensions.get('screen').height * 0.1}
								position='absolute'
							>
								<Image
									src={globe}
									resizeMode='contain'
									height={Dimensions.get('screen').height * 0.4}
									aspectRatio={1}
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
								src={userProfile.profilepicture}
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
							paddingBottom={30}
							paddingTop={20}
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
										src={earn}
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
										src={rem}
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
							paddingTop={20}
						>
							Your unique QR code
						</Text>

						<Image
							src={userProfile.qrcode}
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
				</View>
				<Divider
					spacing={20}
					ref={eventRef}
					onLayout={(e) => {
						setOffsetY({
							...offsetY,
							evt: {
								start: e.nativeEvent.layout.y,
								end: e.nativeEvent.layout.y + e.nativeEvent.layout.height,
							},
						});
					}}
				/>
				{eventLoading ? (
					<LoadingComp small />
				) : (
					<View
						paddingHorizontal={Dimensions.get('screen').width * 0.05}
						width={width}
						gap={10}
						marginBottom={10}
						flex={1}
					>
						<Text
							fontSize={16}
							fontFamily={'InterBold'}
							color={'#616161'}
						>
							Upcoming Events
						</Text>
						<FilteredResults
							upcomingEvents={upcomingEvents}
							filteredMode={filteredMode}
							filteredRegion={filteredRegion}
							setFilteredMode={setFilteredMode}
							setFilteredRegion={setFilteredRegion}
							regions={regions}
						/>
					</View>
				)}
				<Divider
					spacing={20}
					ref={kcRef}
					onLayout={(e) => {
						setOffsetY({
							...offsetY,
							kc: {
								start: e.nativeEvent.layout.y,
								end: e.nativeEvent.layout.y + e.nativeEvent.layout.height,
							},
						});
					}}
				/>
				{knowledgeLoading ? (
					<LoadingComp small />
				) : (
					<View
						flex={1}
						paddingHorizontal={Dimensions.get('screen').width * 0.05}
						width={width}
					>
						<Text
							color='#616161'
							fontSize={16}
							fontFamily={'InterBold'}
						>
							Knowledge Center
						</Text>
						<Text
							color='#616161'
							marginBottom={20}
							fontSize={14}
							fontFamily={'InterMedium'}
						>
							Whitepaper & Reports
						</Text>
						{knowledgeCards.length > 0 ? (
							<ScrollView
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								horizontal
								gap={10}
								marginBottom={10}
							>
								{knowledgeCards.map((item, index) => (
									<KnowledgeCard
										getFn={getKnowledgeData}
										setIsLoading={setKnowledgeLoading}
										key={index}
										data={item}
									/>
								))}
							</ScrollView>
						) : (
							<Text
								color='#000'
								textAlign='center'
								marginBottom={20}
							>
								No whitepapers available...
							</Text>
						)}

						<Text
							color='#616161'
							marginBottom={20}
							fontSize={14}
							fontFamily={'InterMedium'}
						>
							Editorial Magazines
						</Text>

						{magazineLoading ? (
							<LoadingComp small />
						) : magData.filter((mag) => mag.magzine === '1').length > 1 ? (
							<ScrollView
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								horizontal
								gap={10}
								marginBottom={10}
							>
								{magData
									.filter((mag) => mag.magzine === '1')
									.map((item, index) => (
										<EditorialMags
											getFn={getMagazineData}
											setIsLoading={setMagazineLoading}
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
										getFn={getMagazineData}
										setIsLoading={setMagazineLoading}
										key={index}
										data={item}
									/>
								))
						)}
						{magazineLoading ? (
							<LoadingComp small />
						) : magData.filter((mag) => mag.magzine === '2').length > 1 ? (
							<ScrollView
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								horizontal
								gap={10}
								marginBottom={10}
							>
								{magData
									.filter((mag) => mag.magzine === '2')
									.map((item, index) => (
										<EditorialMags
											getFn={getMagazineData}
											setIsLoading={setMagazineLoading}
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
										getFn={getMagazineData}
										setIsLoading={setMagazineLoading}
										key={index}
										data={item}
									/>
								))
						)}
					</View>
				)}

				<Text
					color='#616161'
					width={width * 0.9}
					marginBottom={20}
					fontSize={14}
					fontFamily={'InterMedium'}
				>
					Podcast
				</Text>

				{podcastLoading ? (
					<LoadingComp small />
				) : podcastData.length > 0 ? (
					<ScrollView
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						horizontal
						width={width * 0.9}
						gap={10}
						marginBottom={10}
					>
						{podcastData.map((item, index) => (
							<PodcastCard
								getFn={getPodcastData}
								setIsLoading={setPodcastLoading}
								key={index}
								data={item}
								width={width * 0.9}
							/>
						))}
					</ScrollView>
				) : podcastData.length === 1 ? (
					<View width={width * 0.9}>
						<PodcastCard
							getFn={getPodcastData}
							setIsLoading={setPodcastLoading}
							data={podcastData}
						/>
					</View>
				) : (
					<Text
						color='#000'
						textAlign='center'
						marginBottom={20}
						width={width * 0.9}
					>
						No podcast available...
					</Text>
				)}

				<Text
					color='#616161'
					marginBottom={20}
					fontSize={14}
					fontFamily={'InterMedium'}
					width={width * 0.9}
				>
					Resource Libraries
				</Text>

				{resourceLoading ? (
					<LoadingComp small />
				) : ResourceData.length > 1 ? (
					<ScrollView
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						width={width * 0.9}
						horizontal
						gap={10}
						marginBottom={10}
					>
						{ResourceData.map((item, index) => (
							<ResourceCard
								getFn={getResourceData}
								setIsLoading={setResourceLoading}
								key={index}
								data={item}
							/>
						))}
					</ScrollView>
				) : ResourceData.length === 1 ? (
					ResourceData.map((item, index) => (
						<ResourceCard
							width={width * 0.9}
							getFn={getResourceData}
							setIsLoading={setResourceLoading}
							key={index}
							data={item}
						/>
					))
				) : (
					<Text
						color='#000'
						textAlign='center'
					>
						No blogs available...
					</Text>
				)}

				<Divider
					spacing={20}
					onLayout={(e) => {
						setOffsetY({
							...offsetY,
							pts: {
								start: e.nativeEvent.layout.y,
								end: e.nativeEvent.layout.y + e.nativeEvent.layout.height,
							},
						});
					}}
					ref={ptsRef}
				/>

				<View width={width * 0.9}>
					<Text
						color='#616161'
						fontSize={14}
						fontFamily={'InterSemiBold'}
						marginBottom={20}
					>
						CIO&Leader Loyalty Point History
					</Text>
					{transactionLoading ? (
						<LoadingComp small />
					) : pointsData.results && pointsData.results.length > 0 ? (
						<View width={width * 0.9}>
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
													padding={10}
													borderBottomColor={'#61616150'}
													borderBottomWidth={0.5}
													paddingVertical={10}
												>
													<Text
														textAlign={'center'}
														flex={0.25}
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
														flex={0.5}
														textTransform={'uppercase'}
														color={'#616161'}
														fontSize={10}
													>
														<CollapsibleText text={item.description} />
													</Text>
													<View
														flex={0.25}
														flexDirection={'row'}
														alignItems={'center'}
														justifyContent={'center'}
														fontSize={10}
													>
														<Image
															src={coin}
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
										router.push('/pts');
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
											Total Earning
										</Text>
										<View
											alignItems={'center'}
											justifyContent={'center'}
											flexDirection={'row'}
										>
											<Image
												src={coin}
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
												src={coin}
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
												src={coin}
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
						<View>
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
				</View>
				<Image
					src={triangle}
					marginTop={-20}
					width={width}
					height={height * 0.5}
					bottom={-100}
				/>
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
						currScroll >= offsetY.home.end && currScroll <= offsetY.evt.start
							? '#FFFFFF50'
							: 'transparent'
					}
				>
					<Image
						src={home}
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
						scrollTo(offsetY.evt.start);
					}}
					justifyContent='center'
					alignItems='center'
					borderRadius={100 / 2}
					aspectRatio={1 / 1}
					width={30}
					backgroundColor={
						currScroll >= offsetY.evt.start && currScroll <= offsetY.kc.start
							? '#FFFFFF50'
							: 'transparent'
					}
				>
					<Image
						src={evt}
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
						scrollTo(offsetY.kc.start);
					}}
					justifyContent='center'
					alignItems='center'
					borderRadius={100 / 2}
					aspectRatio={1 / 1}
					width={30}
					backgroundColor={
						currScroll >= offsetY.kc.start && currScroll < offsetY.pts.start
							? '#FFFFFF50'
							: 'transparent'
					}
				>
					<Image
						src={kc}
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
						scrollTo(offsetY.pts.start);
					}}
					justifyContent='center'
					alignItems='center'
					borderRadius={100 / 2}
					aspectRatio={1 / 1}
					width={30}
					backgroundColor={
						currScroll >= offsetY.pts.start ? '#FFFFFF50' : 'transparent'
					}
				>
					<Image
						src={points}
						height={25}
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
						router.push('/pro');
					}}
					justifyContent='center'
					alignItems='center'
				>
					<Image
						src={{ uri: profile }}
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
};
export default HomeScreen;
