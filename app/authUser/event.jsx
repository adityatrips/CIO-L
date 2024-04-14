import React, { useContext, useState } from 'react';
import { View, Button, Image, Text, ScrollView } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from '@/components/Carousel';
import { ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '@/context/AuthContext';

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

const EventScreen = ({ navigation }) => {
	return (
		<SafeAreaView
			edges={['bottom', 'left', 'right']}
			style={{ flexGrow: 1, backgroundColor: '#019348' }}
		>
			<ScrollView
				style={{
					flex: 1,
				}}
			>
				<View style={{ flex: 1 }}>
					<View
						style={{
							height: wH * 0.3,
							width: wW,
						}}
					>
						<Carousel
							images={[
								'https://dummyimage.com/600x400/fff/000&text=One',
								'https://dummyimage.com/600x400/fff/000&text=Two',
								'https://dummyimage.com/600x400/fff/000&text=Three',
								'https://dummyimage.com/600x400/fff/000&text=Four',
							]}
						/>
					</View>
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
							Capitalland
						</Text>
						<Text
							style={{
								fontSize: 21,
								color: '#FFF',
								fontWeight: 'bold',
								textTransform: 'uppercase',
							}}
						>
							Cyber Security & Digital Transformations
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
									14th Dec 2023
								</Text>
								<Text
									style={{
										color: '#FFF',
										fontWeight: 'bold',
										fontSize: 13,
									}}
								>
									5:00 PM
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
									JW Marriot
								</Text>
								<Text
									style={{
										color: '#FFF',
										fontSize: 13,
									}}
								>
									Aerocity, New Delhi
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
								backgroundColor={'#8DC63F'}
								width={wW * 0.4}
								borderRadius={100 / 2}
							>
								<Text>Register</Text>
							</Button>
							<Button
								width={wW * 0.4}
								borderRadius={100 / 2}
								backgroundColor={'#8DC63F'}
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
							{dummyData.map((item, index) => (
								<View
									key={index}
									style={{
										marginTop: 20,
										width: wW / 3 - 20,
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Image
										source={{ uri: item.img }}
										style={{
											width: wW / 3 - 25,
											aspectRatio: 1 / 1,
											borderRadius: 20,
											borderWidth: 1,
											borderColor: '#000',
										}}
									/>
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
											{item.name}
										</Text>
										<Text
											style={{
												fontSize: 9,
												color: '#000',
											}}
										>
											{item.designation}
										</Text>
										<Text
											style={{
												fontSize: 9,
												color: '#000',
											}}
										>
											{item.company}
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
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
							voluptate laudantium rerum nemo voluptatem beatae expedita numquam
							modi, a voluptatibus aliquid harum possimus amet perferendis dicta
							molestiae voluptatum. Quia repudiandae iure dolore, maxime eaque,
							illum eos magni dignissimos earum est totam expedita? Sunt
							molestiae recusandae distinctio nam sapiente maxime totam.
						</Text>
						<Text
							style={{
								marginBottom: 10,
								color: '#fff',
								fontSize: 11,
							}}
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
							voluptate laudantium rerum nemo voluptatem beatae expedita numquam
							modi, a voluptatibus aliquid harum possimus amet perferendis dicta
							molestiae voluptatum. Quia repudiandae iure dolore, maxime eaque,
							illum eos magni dignissimos earum est totam expedita? Sunt
							molestiae recusandae distinctio nam sapiente maxime totam.
						</Text>
						<Text
							style={{
								marginBottom: 10,
								color: '#fff',
								fontSize: 11,
							}}
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
							voluptate laudantium rerum nemo voluptatem beatae expedita numquam
							modi, a voluptatibus aliquid harum possimus amet perferendis dicta
							molestiae voluptatum. Quia repudiandae iure dolore, maxime eaque,
							illum eos magni dignissimos earum est totam expedita? Sunt
							molestiae recusandae distinctio nam sapiente maxime totam.
						</Text>
						<Text
							style={{
								fontSize: 16,
								fontWeight: 'bold',
								color: '#fff',
								marginBottom: 10,
							}}
						>
							Points for the event:
						</Text>
						<Text
							style={{
								marginBottom: 10,
								color: '#fff',
								fontSize: 11,
							}}
						>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
							libero fugiat perspiciatis dolorem cumque dolores voluptatem
							sapiente, sequi omnis ipsam cum assumenda excepturi temporibus
							vitae.
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
								backgroundColor={'#8DC63F'}
								width={wW * 0.4}
								borderRadius={100 / 2}
							>
								Share Event
							</Button>
							<Button
								backgroundColor={'#8DC63F'}
								width={wW * 0.4}
								borderRadius={100 / 2}
							>
								Share Selfie
							</Button>
							<Button
								backgroundColor={'#8DC63F'}
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
