import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, Text, View } from 'tamagui';
import { colors } from '@/constants';
import { ActivityIndicator, Dimensions, ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
import LoadingComp from './Loading';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftCircle, ChevronRightCircle } from '@tamagui/lucide-icons';
import axios from 'axios';

const PointsTableHome = ({
	data,
	results,
	getData,
	userToken,
	isOnHome = false,
}) => {
	const [loading, setLoading] = useState(true);
	const router = useRouter();

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
				height: 'auto',
			}}
		>
			<ScrollView flex={1}>
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
											{item.description}
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
			</ScrollView>
		</SafeAreaView>
	);
};

export default PointsTableHome;
