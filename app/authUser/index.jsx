import { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'tamagui';
import { AuthContext } from '@/context/AuthContext';
import { colors } from '@/constants';
import { Dimensions, ScrollView } from 'react-native';

import ankit from '@/assets/images/Ankit.png';
import globe from '@/assets/images/Globe.png';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '@/components/Divider';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import { ActivityIndicator } from 'react-native-web';
import KnowledgeCard from '../../components/KnowledgeCard';
import PointsTable from '../../components/PointsTable';
import { useRouter } from 'expo-router';

const height = Dimensions.get('screen').height * 0.75;
const width = Dimensions.get('screen').width;

export default function TabOneScreen() {
	const router = useRouter();
	const { userToken, userInfo, loading, error, login, lookupUser, toggleAuth } =
		useContext(AuthContext);
	const [userProfile, setUserProfile] = useState({});
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [knowledgeCards, setKnowledgeCards] = useState([]);
	const [pointsData, setPoints] = useState([]);
	const [isLoading, setIsLoading] = useState();

	const getUpcomingEvents = async () => {
		setIsLoading(true);
		if (!loading && userToken) {
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
				console.log(error);
			}
		}
	};

	const getPoints = async () => {
		setIsLoading(true);
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
			console.log(error);
		}
		setIsLoading(false);
	};

	const getKnowledgeCards = async () => {
		setIsLoading(true);
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
		} catch (error) {}
	};

	const getUserProfile = async () => {
		setIsLoading(true);
		if (!loading && userToken) {
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
				console.log(error);
				setUserProfile({});
			}
		}
	};

	useEffect(() => {
		getUserProfile();
		getUpcomingEvents();
		getKnowledgeCards();
		getPoints();
		setIsLoading(false);
	}, []);

	return !isLoading && !loading ? (
		<SafeAreaView
			edges={['right', 'left']}
			flex={1}
		>
			<ScrollView
				contentContainerStyle={{
					alignItems: 'center',
				}}
			>
				<View height={height * 0.7}>
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
							<Text
								textAlign='center'
								fontSize={20}
							>
								{userProfile.earnmonth}
							</Text>
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
							<Text
								textAlign='center'
								fontSize={20}
							>
								{userProfile.points}
							</Text>
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
						<>
							<KnowledgeCard
								key={index}
								data={item}
							/>
							<KnowledgeCard
								key={index + 1}
								data={item}
							/>
							<KnowledgeCard
								key={index + 2}
								data={item}
							/>
						</>
					))}
				</ScrollView>

				<Divider />

				<PointsTable
					isOnHome
					data={pointsData}
				/>
			</ScrollView>
		</SafeAreaView>
	) : (
		<View
			flex={1}
			alignItems='center'
			justifyContent='center'
		>
			<ActivityIndicator
				size='large'
				color={colors.primary}
			/>
		</View>
	);
}
