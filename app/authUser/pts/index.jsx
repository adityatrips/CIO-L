import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, ToastAndroid } from 'react-native';
import { View, Text, Image, ScrollView, Button } from 'tamagui';
import { AuthContext } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants';
import LoadingComp from '@/components/Loading';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftCircle, ChevronRightCircle } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import HeaderComp from '@/components/Header';
import moment from 'moment';

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

export default function PointsScreen() {
	const { userToken } = useContext(AuthContext);

	const [data, setData] = useState({});
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getPoints = async () => {
		try {
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/transactions/all?offset=0&limit=10',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setData(res.data);
		} catch (error) {
			ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
		}
	};

	const router = useRouter();

	useEffect(() => {
		setIsLoading(true);
		getPoints();
		setIsLoading(false);
	}, []);

	const getPaginatedData = async (newLink) => {
		try {
			const res = await axios.get(newLink, {
				headers: {
					Authorization: `Token ${userToken}`,
				},
			});
			setData(res.data);
			setResults(res.data.results);
		} catch (error) {
			ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
		}
	};

	return !isLoading ? (
		<SafeAreaView flex={1}>
			<LinearGradient
				colors={[colors.primary, colors.primaryDark]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<HeaderComp />
				<Text
					color={'#FFF'}
					fontSize={16}
					fontFamily={'InterBold'}
					width={'90%'}
					paddingVertical={20}
				>
					CIO&Leader Loyalty Point History
				</Text>
				{data.results && data.results.length > 0 ? (
					<ScrollView
						flex={1}
						borderRadius={20}
						paddingHorizontal={Dimensions.get('window').width * 0.05}
					>
						<View
							flexDirection={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							backgroundColor={'#EBEBEB'}
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
							{results &&
								results.map((item, index) => {
									return (
										item && (
											<View
												key={index}
												flexDirection={'row'}
												justifyContent={'space-between'}
												alignItems={'center'}
												flex={0.2}
												width={'100%'}
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
											{data.earned}
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
											source={require('@/assets/images/Coin1.png')}
											height={20}
											width={20}
										/>
										<Text
											color={'#CC3340'}
											fontWeight={'bold'}
											fontSize={10}
										>
											{data.redeemed}
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
											{data.balance}
										</Text>
									</View>
								</View>
							</View>
						</View>
						<View
							flexDirection={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<ChevronLeftCircle
								color={data.links.previous ? colors.primary : '#ffffff00'}
								size={30}
								borderRadius={100 / 2}
								backgroundColor={data.links.previous ? '#fff' : '#ffffff00'}
								onPress={() =>
									getPaginatedData(
										data.links &&
											data.links.previous.replace('http://', 'https://')
									)
								}
							/>

							{data.links.next && (
								<ChevronRightCircle
									color={data.links.next ? colors.primary : '#ffffff00'}
									size={30}
									borderRadius={100 / 2}
									backgroundColor={data.links.next ? '#fff' : '#ffffff00'}
									onPress={() => {
										getPaginatedData(
											data.links &&
												data.links.next.replace('http://', 'https://')
										);
									}}
								/>
							)}
						</View>
					</ScrollView>
				) : (
					<View
						flexShrink={1}
						justifyContent={'center'}
						alignItems={'center'}
						paddingHorizontal={20}
						height={wH * 0.9}
					>
						<Text>
							No data available. Please check back later or contact support.
						</Text>
					</View>
				)}
				{/* </> */}
			</LinearGradient>
		</SafeAreaView>
	) : (
		<LoadingComp />
	);
}
