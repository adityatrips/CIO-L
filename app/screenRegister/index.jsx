import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button, Image, Input, ScrollView, Text, View } from 'tamagui';
import { Dimensions } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { ChevronLeftCircle } from '@tamagui/lucide-icons';
import coin from '@/assets/images/Coin1.png';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { colors } from '@/constants';
import axios from 'axios';
const ScreenRegister = () => {
	const router = useRouter();

	const [fname, setFname] = React.useState('');
	const [lname, setLname] = React.useState('');
	const [mobile, setMobile] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [company, setCompany] = React.useState('');
	const [pword, setPword] = React.useState('');
	const [designation, setDesignation] = React.useState('');

	const handleRegister = async () => {
		try {
			const res = await axios.post(
				'https://cioleader.azurewebsites.net/api/member/create/',
				{
					account: {
						username: mobile,
						password,
					},
					fname,
					lname,
					mobile,
					email,
					designation,
					company: company === '' ? 'N/A' : company,
				}
			);
			router.push('/screenLogin');
		} catch (error) {
			console.log('ScreenRegister::handleRegister::error:: ', error);
		}
	};

	return (
		<ScrollView
			contentContainerStyle={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<SafeAreaView>
				<KeyboardAvoidingView
					style={{
						gap: 20,
					}}
				>
					<Image
						source={logo}
						width={Dimensions.get('window').width * 0.9}
						height={Dimensions.get('window').width * 0.2}
						resizeMode='contain'
					/>
					<View
						justifyContent='flex-start'
						alignItems='center'
						flexDirection='row'
						gap={20}
					>
						<ChevronLeftCircle
							onPress={() => {
								router.push('/screenLogin');
							}}
							color={'#000'}
							size='$3'
						/>
						<Text
							color='#000'
							textAlign='center'
						>
							SIGN UP
						</Text>
					</View>
					<Input
						borderWidth={0}
						width={Dimensions.get('window').width * 0.9}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						placeholder='First Name'
						placeholderTextColor={'#000'}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						value={fname}
						onChangeText={setFname}
					/>
					<Input
						borderWidth={0}
						width={Dimensions.get('window').width * 0.9}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						placeholder='Last Name'
						placeholderTextColor={'#000'}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						value={lname}
						onChangeText={setLname}
					/>
					<Input
						borderWidth={0}
						width={Dimensions.get('window').width * 0.9}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						placeholder='Mobile Number with Country Code'
						placeholderTextColor={'#000'}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						value={mobile}
						onChangeText={setMobile}
					/>
					<Input
						borderWidth={0}
						width={Dimensions.get('window').width * 0.9}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						placeholder='Business Email'
						placeholderTextColor={'#000'}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						value={email}
						onChangeText={setEmail}
					/>
					<Input
						borderWidth={0}
						width={Dimensions.get('window').width * 0.9}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						secureTextEntry
						placeholder='Password'
						placeholderTextColor={'#000'}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						value={pword}
						onChangeText={setPword}
					/>
					<Input
						borderWidth={0}
						width={Dimensions.get('window').width * 0.9}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						placeholder='Company'
						placeholderTextColor={'#000'}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						value={company}
						onChangeText={setCompany}
					/>
					<Input
						borderWidth={0}
						width={Dimensions.get('window').width * 0.9}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						placeholder='Designation'
						placeholderTextColor={'#000'}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						value={designation}
						onChangeText={setDesignation}
					/>
					<Button
						onPress={handleRegister}
						height={50}
						borderRadius={100 / 2}
						backgroundColor={colors.primary}
						justifyContent='space-between'
						paddingHorizontal={50}
						alignItems='center'
						elevate={true}
						elevationAndroid={10}
					>
						Sign Up
						<View
							flexDirection='row'
							alignItems='center'
						>
							<Image
								height={40}
								width={40}
								source={coin}
							/>
							<Text>+50 Points</Text>
						</View>
					</Button>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</ScrollView>
	);
};

export default ScreenRegister;
