import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Image, Text, ScrollView } from 'tamagui';
import { BackHandler, Dimensions, StatusBar, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, vibrateHeavy } from '@/constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import LoadingComp from '@/components/Loading';
import moment from 'moment';
import HeaderComp from '@/components/Header';
import coin from '@/assets/images/Coin1.png';
import * as Linking from 'expo-linking';
import Share from 'react-native-share';
import Toast from 'react-native-root-toast';

const EventScreen = () => {
	const { event } = useLocalSearchParams();
	const { userToken } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [evtData, setEvtData] = useState({});
	const router = useRouter();
	const url = Linking.useURL();

	const { srcRoute } = useLocalSearchParams();

	BackHandler.addEventListener('hardwareBackPress', () => {
		router.push('/home');
	});

	const getOneEvent = async () => {
		setLoading(true);
		try {
			const res = await axios.get(
				`https://cioleader.azurewebsites.net/api/event/${event}/`,
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setEvtData(res.data);
		} catch (error) {
			Toast.show('An error has occurred', { duration: Toast.durations.SHORT });
			vibrateHeavy();
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getOneEvent();
	}, [event]);

	return loading ? (
		<LoadingComp />
	) : (
		<SafeAreaView
			edges={['top', 'bottom', 'left', 'right']}
			style={{ flexGrow: 1, backgroundColor: colors.primaryDark }}
		>
			<HeaderComp title={evtData.name} />
			<StatusBar barStyle='light' />
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				style={{
					flex: 1,
				}}
			>
				<View style={{ flex: 1 }}>
					<Image
						source={{ uri: evtData.picture }}
						width={wW}
						height={wH * 0.3}
					/>
					<View
						style={{
							justifyContent: 'center',
							paddingVertical: 20,
							width: wW * 0.9,
							position: 'relative',
							alignSelf: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 12,
								color: '#FFF',
								fontWeight: 'bold',
								textTransform: 'uppercase',
							}}
						>
							{evtData.meta || ''}
						</Text>
						<Text
							style={{
								fontSize: 21,
								color: '#FFF',
								fontWeight: 'bold',
								textTransform: 'uppercase',
							}}
						>
							{evtData.name}
						</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginTop: 20,
							}}
						>
							<View
								style={{
									borderTopColor: '#FFF',
									borderTopWidth: 1,
									flex: 1,
									padding: 10,
								}}
							>
								<Text
									style={{
										color: '#FFF',
										fontFamily: 'InterBold',
										fontSize: 13,
									}}
								>
									{moment(evtData.date, 'YYYY-MM-DD').format('MMM DD, YYYY')}
								</Text>
								<Text
									style={{
										color: '#FFF',
										fontFamily: 'InterBold',
										fontSize: 13,
									}}
								>
									{moment(evtData.time, 'HH:mm:ss').format('hh:mm A')}
								</Text>
							</View>
							<View
								style={{
									borderTopColor: '#FFF',
									borderTopWidth: 5,
									flex: 1,
									padding: 10,
								}}
							>
								<Text
									style={{
										textTransform: 'uppercase',
										fontWeight: 'bold',
										fontSize: 13,
										color: '#FFF',
									}}
								>
									{evtData.venue}
								</Text>
								<Text
									style={{
										color: '#FFF',
										fontSize: 12,
									}}
								>
									{evtData.address}
								</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								gap: 10,
								justifyContent: 'space-between',
							}}
						>
							<Button
								backgroundColor={colors.primary}
								borderColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primary,
									borderColor: colors.primary,
								}}
								width={wW * 0.4}
								borderRadius={100 / 2}
								height={30}
								fontSize={10}
								fontFamily={'InterBold'}
								onPress={async () => {
									try {
										const res = await axios.post(
											'https://cioleader.azurewebsites.net/api/register/create/',
											{
												event: event,
											},
											{
												headers: {
													Authorization: `Token ${userToken}`,
												},
											}
										);
										router.push({
											pathname: '/modal',
											params: {
												status: 'eventRegistrationSuccess',
												point: evtData.attendingpoint,
											},
										});
									} catch (error) {
										if (error.code === 'ERR_BAD_REQUEST') {
											Toast.show('You have already registered for the event.', {
												duration: Toast.durations.SHORT,
											});
											vibrateHeavy();
										} else {
											Toast.show(
												'Thank you for showing interest in this event!',
												{ duration: Toast.durations.SHORT }
											);
											vibrateHeavy();
										}
									}
								}}
							>
								<Text
									fontSize={10}
									fontFamily={'InterBold'}
									textTransform='uppercase'
								>
									Register
								</Text>
								<View
									flexDirection='row'
									alignItems='center'
								>
									<Image
										source={coin}
										height={25}
										width={25}
									/>
									<Text
										fontSize={10}
										fontFamily={'InterBold'}
									>
										+{evtData.attendingpoint}
									</Text>
								</View>
							</Button>
							<Button
								width={wW * 0.4}
								borderRadius={100 / 2}
								height={30}
								fontSize={10}
								fontFamily={'InterBold'}
								backgroundColor={colors.primary}
								borderColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primary,
									borderColor: colors.primary,
								}}
								onPress={async () => {
									router.push({
										pathname: '/pdf',
										params: {
											uri: evtData.agenda,
										},
									});
								}}
							>
								<Text
									fontSize={10}
									fontFamily={'InterBold'}
									textTransform='uppercase'
								>
									View Agenda
								</Text>
							</Button>
						</View>
					</View>
					<View
						style={{
							backgroundColor: '#FFF',
							padding: 20,
							paddingVertical: 20,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: 'bold',
								color: '#616161',
								marginBottom: 10,
							}}
						>
							Speaker / Panellists
						</Text>
						<View
							style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								gap: 10,
							}}
						>
							{evtData.speakers.length <= 6 ? (
								evtData.speakers.map((speaker, index) => (
									<View key={index}>
										<View
											key={index}
											width={wW / 3 - 20}
											borderRadius={20}
											borderWidth={1}
											borderColor={'#000'}
											overflow='hidden'
										>
											<Image
												source={{ uri: speaker.profile }}
												width={'100%'}
												aspectRatio={1 / 1}
												overflow='hidden'
											/>
										</View>
										<View>
											<Text
												style={{
													fontSize: 12,
													fontWeight: 'bold',
													color: '#616161',
													textAlign: 'center',
												}}
											>
												{speaker.name}
											</Text>
											<Text
												style={{
													fontSize: 9,
													color: '#616161',
													textAlign: 'center',
												}}
											>
												{speaker.designation}
											</Text>
											<Text
												style={{
													fontSize: 9,
													color: '#616161',
													textAlign: 'center',
												}}
											>
												{speaker.company}
											</Text>
										</View>
									</View>
								))
							) : (
								<ScrollView
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
									horizontal
									contentContainerStyle={{
										gap: 10,
									}}
								>
									{evtData.speakers.map((speaker, index) => (
										<View>
											<View
												key={index}
												width={wW / 3 - 20}
												borderRadius={20}
												borderWidth={1}
												borderColor={'#000'}
												overflow='hidden'
											>
												<Image
													source={{ uri: speaker.profile }}
													width={'100%'}
													aspectRatio={1 / 1}
													overflow='hidden'
												/>
											</View>
											<View>
												<Text
													style={{
														fontSize: 12,
														fontWeight: 'bold',
														color: '#616161',
														textAlign: 'center',
													}}
												>
													{speaker.name}
												</Text>
												<Text
													style={{
														fontSize: 9,
														color: '#616161',
														textAlign: 'center',
													}}
												>
													{speaker.designation}
												</Text>
												<Text
													style={{
														fontSize: 9,
														color: '#616161',
														textAlign: 'center',
													}}
												>
													{speaker.company}
												</Text>
											</View>
										</View>
									))}
								</ScrollView>
							)}
						</View>
					</View>
					<View
						style={{
							padding: 20,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: 'bold',
								color: '#fff',
								marginBottom: 10,
							}}
						>
							Event Description
						</Text>
						<Text
							style={{
								color: '#fff',
								fontSize: 11,
								textAlign: 'justify',
								marginBottom: 30,
							}}
							width={'100%'}
						>
							{evtData.description}
						</Text>

						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
								flexWrap: 'wrap',
								gap: 10,
							}}
						>
							<Button
								width={wW * 0.4}
								backgroundColor={colors.primary}
								borderColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primary,
									borderColor: colors.primary,
								}}
								borderRadius={100 / 2}
								height={30}
								onPress={async () => {
									const encUrl = encodeURIComponent(
										`cioleader://event/${event}`
									);
									const finUrl = `https://cioleader.azurewebsites.net/redirect/?url=${encUrl}`;

									Share.open({
										message: `CIO&Leader\n\nJoin me at Test Event 6 on ${moment(
											evtData.data
										).format('LL')} ${moment(evtData.time, 'HH:mm:ss').format(
											'hh:mm A'
										)} at ${
											evtData.name
										} for an amazing event. Click the link below to know more about the event.\n\nRegister now at CIO&Leader.\n\n`,
										url: finUrl,
									});
								}}
							>
								<Text
									fontSize={10}
									fontFamily={'InterBold'}
									textTransform='uppercase'
								>
									Share Event
								</Text>
							</Button>
							{srcRoute === 'Profile' && (
								<>
									<Button
										backgroundColor={colors.primary}
										borderColor={colors.primary}
										pressStyle={{
											backgroundColor: colors.primary,
											borderColor: colors.primary,
										}}
										width={wW * 0.4}
										borderRadius={100 / 2}
										height={30}
										fontSize={10}
										fontFamily={'InterBold'}
									>
										<Text
											fontSize={10}
											fontFamily={'InterBold'}
											textTransform='uppercase'
										>
											Share Selfie
										</Text>
									</Button>
									<Button
										backgroundColor={colors.primary}
										borderColor={colors.primary}
										pressStyle={{
											backgroundColor: colors.primary,
											borderColor: colors.primary,
										}}
										width={wW * 0.4}
										borderRadius={100 / 2}
										height={30}
										fontSize={10}
										fontFamily={'InterBold'}
										onPress={() => {}}
									>
										<Text
											fontSize={10}
											fontFamily={'InterBold'}
											textTransform='uppercase'
										>
											Share Feedback
										</Text>
									</Button>
								</>
							)}
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

export default EventScreen;
