import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Image, Text, ScrollView } from 'tamagui';
import Carousel from '@/components/Carousel';
import { Dimensions, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import LoadingComp from '../../../../components/Loading';
const dummyData = [
	{
		name: 'Ankit Sharma',
		designation: 'Designation',
		company: 'Company',
		img: 'https://dummyimage.com/200x200/fff/000&text=Ankit+Sharma',
	},
	{
		name: 'Ankit Sharma',
		designation: 'Designation',
		company: 'Company',
		img: 'https://dummyimage.com/200x200/fff/000&text=Ankit+Sharma',
	},
	{
		name: 'Ankit Sharma',
		designation: 'Designation',
		company: 'Company',
		img: 'https://dummyimage.com/200x200/fff/000&text=Ankit+Sharma',
	},
	{
		name: 'Ankit Sharma',
		designation: 'Designation',
		company: 'Company',
		img: 'https://dummyimage.com/200x200/fff/000&text=Ankit+Sharma',
	},
	{
		name: 'Ankit Sharma',
		designation: 'Designation',
		company: 'Company',
		img: 'https://dummyimage.com/200x200/fff/000&text=Ankit+Sharma',
	},
	{
		name: 'Ankit Sharma',
		designation: 'Designation',
		company: 'Company',
		img: 'https://dummyimage.com/200x200/fff/000&text=Ankit+Sharma',
	},
];

const EventScreen = () => {
	const { event } = useLocalSearchParams();
	console.log(event);
	const { userToken } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [evtData, setEvtData] = useState({});

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
			console.log(res.data);
		} catch (error) {
			console.log('Event::getOneEvent::error::', error);
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
			edges={['bottom', 'left', 'right']}
			style={{ flexGrow: 1, backgroundColor: colors.primaryDark }}
		>
			<ScrollView
				style={{
					flex: 1,
				}}
			>
				<View style={{ flex: 1 }}>
					<Image
						src={evtData.picture}
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
							{evtData.id}
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
										fontWeight: 'bold',
										fontSize: 13,
									}}
								>
									{evtData.date}
								</Text>
								<Text
									style={{
										color: '#FFF',
										fontWeight: 'bold',
										fontSize: 13,
									}}
								>
									{evtData.time}
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
										fontSize: 13,
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
									backgroundColor: colors.primaryDark,
									borderColor: colors.primary,
								}}
								width={wW * 0.4}
								borderRadius={100 / 2}
							>
								<Text>Register</Text>
							</Button>
							<Button
								width={wW * 0.4}
								borderRadius={100 / 2}
								backgroundColor={colors.primary}
								borderColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primaryDark,
									borderColor: colors.primary,
								}}
								onPress={() => {
									Linking.openURL(evtData.agenda);
								}}
							>
								View Agenda
							</Button>
						</View>
					</View>
					<View
						style={{
							backgroundColor: '#FFF',
							padding: 20,
							paddingVertical: 40,
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: 'bold',
								color: '#000',
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
							{evtData.speakers.map((speaker, index) => (
								<View
									key={index}
									style={{
										marginTop: 20,
										width: wW / 3 - 20,
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<View
										borderRadius={20}
										borderWidth={1}
										borderColor={'#000'}
										overflow='hidden'
									>
										<Image
											source={{ uri: speaker.profile }}
											width={wW / 3 - 25}
											aspectRatio={1 / 1}
										/>
									</View>
									<View
										style={{
											width: '100%',
											marginTop: 5,
										}}
									>
										<Text
											style={{
												fontSize: 12,
												fontWeight: 'bold',
												color: '#000',
											}}
										>
											{speaker.name}
										</Text>
										<Text
											style={{
												fontSize: 9,
												color: '#000',
											}}
										>
											{speaker.designation}
										</Text>
										<Text
											style={{
												fontSize: 9,
												color: '#000',
											}}
										>
											{speaker.company}
										</Text>
									</View>
								</View>
							))}
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
								marginBottom: 10,
								color: '#fff',
								fontSize: 11,
							}}
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
									backgroundColor: colors.primaryDark,
									borderColor: colors.primary,
								}}
								borderRadius={100 / 2}
							>
								Share Event
							</Button>
							<Button
								backgroundColor={colors.primary}
								borderColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primaryDark,
									borderColor: colors.primary,
								}}
								width={wW * 0.4}
								borderRadius={100 / 2}
							>
								Share Selfie
							</Button>
							<Button
								backgroundColor={colors.primary}
								borderColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primaryDark,
									borderColor: colors.primary,
								}}
								width={wW * 0.4}
								borderRadius={100 / 2}
							>
								Share Feedback
							</Button>
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
