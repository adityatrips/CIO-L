import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, Text, View } from 'tamagui';
import { colors } from '@/constants';
import { ActivityIndicator, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import LoadingComp from './Loading';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftCircle, ChevronRightCircle } from '@tamagui/lucide-icons';
import axios from 'axios';

const PointsTable = ({
	link = 'https://cioleader.azurewebsites.net/api/transactions/all?offset=0&limit=9',
	userToken,
	isOnHome = false,
}) => {
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const [data, setData] = useState({});
	const [results, setResults] = useState([]);

	const getData = async (newLink = link) => {
		try {
			const res = await axios.get(newLink, {
				headers: {
					Authorization: `Token ${userToken}`,
				},
			});
			setData(res.data);
			setResults(res.data.results);
			return res.data.results;
		} catch (error) {
		} finally {
		}
	};

	useEffect(() => {
		setLoading(true);
		getData();
		setLoading(false);
	}, []);

	return loading && data ? (
		<SafeAreaView
			style={{
				height: Dimensions.get('window').height,
				alignItems: 'center',
				justifyContent: 'center',
				flex: 1,
			}}
		>
			<ActivityIndicator
				size='large'
				color={'#fff'}
			/>
		</SafeAreaView>
	) : (
		<SafeAreaView
			style={{
				position: 'relative',
				width: Dimensions.get('window').width * 0.9,
				height: !isOnHome
					? Dimensions.get('screen').height * 0.925
					: Dimensions.get('screen').height * 0.8,
			}}
		>
			<ScrollView flex={1}>
				{!isOnHome && (
					<View
						backgroundColor={'#FFFFFF'}
						borderRadius={20}
						justifyContent={'space-between'}
						alignItems={'center'}
						flexDirection={'row'}
						padding={20}
						width={'100%'}
						marginBottom={20}
					>
						<View
							justifyContent={'space-between'}
							alignItems={'center'}
							flex={1}
							borderRightWidth={1}
							borderColor={'#61616150'}
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
							flex={1}
							borderRightWidth={1}
							borderColor={'#61616150'}
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
				)}

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
						flex={1}
						textTransform={'uppercase'}
						fontSize={10}
						fontFamily={'InterBold'}
						color={'#616161'}
					>
						Date
					</Text>
					<Text
						textAlign={'center'}
						flex={1}
						textTransform={'uppercase'}
						fontSize={10}
						fontFamily={'InterBold'}
						color={'#616161'}
					>
						Activity
					</Text>
					<Text
						textAlign={'center'}
						flex={1}
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
										flex={1}
										width={'100%'}
										padding={10}
										borderBottomColor={'#61616150'}
										borderBottomWidth={0.5}
										paddingVertical={10}
									>
										<Text
											textAlign={'center'}
											flex={1}
											textTransform={'uppercase'}
											color={'#616161'}
											fontSize={10}
										>
											{moment(item.date, 'YYYY-MM-DD').format('MMM DD, YYYY')}
										</Text>
										<Text
											textAlign={'center'}
											flex={1}
											textTransform={'uppercase'}
											color={'#616161'}
											fontSize={10}
										>
											{item.description.length > 15
												? item.description.substring(0, 15).concat('...')
												: item.description}
										</Text>
										<View
											flex={1}
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
					{isOnHome && (
						<>
							<Button
								onPress={() => {
									router.push('/authUser/pts');
								}}
								textAlign='right'
								color='#fff'
								backgroundColor={colors.primary}
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
									flex={1}
									borderRightWidth={1}
									borderColor={'#61616150'}
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
									flex={1}
									borderRightWidth={1}
									borderColor={'#61616150'}
									width={'90%'}
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
						</>
					)}
				</View>
			</ScrollView>
			{!isOnHome && data.links && data.results.length <= 10 && (
				<View
					flexDirection={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					marginBottom={20}
					width={'100%'}
					position='absolute'
					bottom={'12%'}
				>
					<Button
						disabled={data.links.previous === null}
						onPress={() => getData(data.links.previous)}
						backgroundColor={colors.primary}
					>
						<ChevronLeftCircle />
					</Button>
					<Button
						disabled={data.links.next === null}
						onPress={() => getData(data.links.next)}
						backgroundColor={colors.primary}
					>
						<ChevronRightCircle />
					</Button>
				</View>
			)}
		</SafeAreaView>
	);
};

export default PointsTable;
