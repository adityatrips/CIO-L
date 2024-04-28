import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, Input, ScrollView, Text, View } from 'tamagui';
import { Dimensions, Modal, ToastAndroid, Vibration } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { ChevronLeftCircle, Eye, EyeOff } from '@tamagui/lucide-icons';
import coin from '@/assets/images/Coin1.png';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { colors, vibrateHeavy } from '@/constants';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { isAlpha, isMobilePhone } from 'validator';
import isEmail from 'validator/lib/isEmail';
import { useNavigation, useRouter } from 'expo-router';

const ScreenRegister = () => {
	const router = useRouter();
	const navigation = useNavigation();

	const [fname, setFname] = React.useState('');
	const [lname, setLname] = React.useState('');
	const [mobile, setMobile] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [company, setCompany] = React.useState('');
	const [pword, setPword] = React.useState('');
	const [confPword, setConfPword] = React.useState('');
	const [designation, setDesignation] = React.useState('');
	const [HidePassword, setHidePassword] = React.useState(true);
	const [HideRePassword, setHideRePassword] = React.useState(true);

	const validate = () => {
		if (!isAlpha(fname) && !isAlpha(lname)) {
			vibrateHeavy();
			'First and last names should be alphabets', ToastAndroid.SHORT;
			return false;
		} else if (!isMobilePhone(mobile, 'en-IN')) {
			vibrateHeavy();
			'Invalid mobile number', ToastAndroid.SHORT;
			return false;
		} else if (!isEmail(email)) {
			vibrateHeavy();
			'Invalid email address', ToastAndroid.SHORT;
			return false;
		} else if (!pword.length >= 8) {
			vibrateHeavy();
			'Password should be atleast 8 characters long', ToastAndroid.SHORT;
			return false;
		} else if (pword !== confPword) {
			vibrateHeavy();
			'Passwords do not match', ToastAndroid.SHORT;
			return false;
		} else if (
			!fname === '' ||
			!lname === '' ||
			!email === '' ||
			!mobile === '' ||
			!pword === '' ||
			!confPword === '' ||
			!company === '' ||
			!designation
		) {
			vibrateHeavy();
			'Please fill all fields', ToastAndroid.SHORT;
			return false;
		}
		return true;
	};

	const handleRegister = async () => {
		if (validate()) {
			try {
				const res = await axios.post(
					'https://cioleader.azurewebsites.net/api/member/create/',
					{
						account: {
							username: mobile,
							password: pword,
							email: email,
						},
						fname,
						lname,
						mobile,
						email,
						designation,
						company,
					}
				);
				if (res.status === 201) {
					router.push({
						pathname: '/modal',
						params: {
							status: 'UserRegistrationSuccess',
						},
					});
				}
			} catch (error) {
				if (error.code === 'ERR_BAD_REQUEST') {
					vibrateHeavy();
					'User already exists', ToastAndroid.SHORT;
				} else {
					vibrateHeavy();
					'An error occured', ToastAndroid.SHORT;
				}
			}
		} else {
			vibrateHeavy();
			'Invalid data', ToastAndroid.SHORT;
		}

		setFname('');
		setLname('');
		setMobile('');
		setEmail('');
		setCompany('');
		setPword('');
		setConfPword('');
		setDesignation('');
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				alignItems: 'center',
			}}
		>
			<StatusBar style='auto' />
			<ScrollView
				contentContainerStyle={{
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					gap: 20,
					width: Dimensions.get('window').width,
					paddingHorizontal: Dimensions.get('window').width * 0.05,
				}}
			>
				<Image
					source={logo}
					width={Dimensions.get('window').width * 0.5}
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
						color={'#616161'}
						size='$3'
					/>
					<View
						position='relative'
						justifyContent='center'
					>
						<Text
							color='#616161'
							textAlign='center'
							fontSize={30}
							fontFamily={'InterSemiBold'}
						>
							SIGN UP
						</Text>
						<Text
							color='#616161'
							textAlign='center'
							fontSize={13}
						>
							Sign up details
						</Text>
					</View>
				</View>
				<Input
					autoCapitalize='none'
					autoCorrect={false}
					borderWidth={0}
					color='#616161'
					width={'100%'}
					borderRadius={100 / 2}
					elevate
					elevation={5}
					placeholder='FIRST NAME'
					placeholderTextColor={'#616161'}
					fontFamily={'InterMedium'}
					fontSize={14}
					textAlign='left'
					backgroundColor={'#fff'}
					paddingHorizontal={20}
					height={50}
					value={fname}
					onChangeText={setFname}
				/>
				<Input
					autoCapitalize='none'
					autoCorrect={false}
					borderWidth={0}
					color='#616161'
					width={'100%'}
					borderRadius={100 / 2}
					elevate
					elevation={5}
					placeholder='LAST NAME'
					placeholderTextColor={'#616161'}
					fontFamily={'InterMedium'}
					fontSize={14}
					textAlign='left'
					backgroundColor={'#fff'}
					paddingHorizontal={20}
					height={50}
					value={lname}
					onChangeText={setLname}
				/>
				<Input
					autoCapitalize='none'
					autoCorrect={false}
					autoComplete='tel'
					borderWidth={0}
					color='#616161'
					width={'100%'}
					borderRadius={100 / 2}
					elevate
					elevation={5}
					placeholder='MOBILE NUMBER'
					placeholderTextColor={'#616161'}
					fontFamily={'InterMedium'}
					fontSize={14}
					textAlign='left'
					backgroundColor={'#fff'}
					paddingHorizontal={20}
					height={50}
					value={mobile}
					onChangeText={setMobile}
				/>
				<Input
					autoCapitalize='none'
					autoCorrect={false}
					autoComplete='email'
					borderWidth={0}
					color='#616161'
					width={'100%'}
					borderRadius={100 / 2}
					elevate
					elevation={5}
					placeholder='BUSINESS EMAIL'
					placeholderTextColor={'#616161'}
					fontFamily={'InterMedium'}
					fontSize={14}
					textAlign='left'
					backgroundColor={'#fff'}
					paddingHorizontal={20}
					height={50}
					value={email}
					onChangeText={setEmail}
				/>
				<View
					width={'100%'}
					flexDirection='row'
					backgroundColor={'#FFF'}
					borderRadius={100 / 2}
					alignItems='center'
					justifyContent='center'
				>
					<Input
						autoCapitalize='none'
						autoCorrect={false}
						borderWidth={0}
						color='#616161'
						borderRadius={100 / 2}
						width={'100%'}
						elevate
						elevation={5}
						secureTextEntry={HidePassword}
						placeholder='PASSWORD'
						placeholderTextColor={'#616161'}
						fontFamily={'InterMedium'}
						fontSize={14}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						value={pword}
						onChangeText={setPword}
					/>
					{HidePassword ? (
						<Eye
							style={{
								position: 'absolute',
								right: 20,
							}}
							onPress={() => {
								setHidePassword(false);
							}}
							color='#616161'
						/>
					) : (
						<EyeOff
							style={{
								position: 'absolute',
								right: 20,
							}}
							onPress={() => {
								setHidePassword(true);
							}}
							color='#616161'
						/>
					)}
				</View>
				<View
					width={'100%'}
					flexDirection='row'
					backgroundColor={'#FFF'}
					borderRadius={100 / 2}
					alignItems='center'
					justifyContent='center'
				>
					<Input
						autoCapitalize='none'
						autoCorrect={false}
						borderWidth={0}
						color='#616161'
						width={'100%'}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						secureTextEntry={HideRePassword}
						placeholder='CONFIRM PASSWORD'
						placeholderTextColor={'#616161'}
						fontFamily={'InterMedium'}
						fontSize={14}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						value={confPword}
						onChangeText={setConfPword}
					/>
					{HideRePassword ? (
						<Eye
							style={{
								position: 'absolute',
								right: 20,
							}}
							onPress={() => {
								setHideRePassword(false);
							}}
							color='#616161'
						/>
					) : (
						<EyeOff
							style={{
								position: 'absolute',
								right: 20,
							}}
							onPress={() => {
								setHideRePassword(true);
							}}
							color='#616161'
						/>
					)}
				</View>
				<Input
					autoCapitalize='none'
					autoCorrect={false}
					borderWidth={0}
					color='#616161'
					width={'100%'}
					borderRadius={100 / 2}
					elevate
					elevation={5}
					placeholder='COMPANY'
					placeholderTextColor={'#616161'}
					fontFamily={'InterMedium'}
					fontSize={14}
					textAlign='left'
					backgroundColor={'#fff'}
					paddingHorizontal={20}
					height={50}
					value={company}
					onChangeText={setCompany}
				/>
				<Input
					autoCapitalize='none'
					autoCorrect={false}
					borderWidth={0}
					color='#616161'
					width={'100%'}
					borderRadius={100 / 2}
					elevate
					elevation={5}
					placeholder='DESIGNATION'
					placeholderTextColor={'#616161'}
					fontFamily={'InterMedium'}
					fontSize={14}
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
					width={'100%'}
					marginBottom={20}
					borderRadius={100 / 2}
					backgroundColor={colors.primary}
					borderColor={colors.primary}
					pressStyle={{
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					}}
					justifyContent='space-between'
					paddingHorizontal={50}
					alignItems='center'
					elevate={true}
					elevationAndroid={10}
				>
					<Text fontFamily={'InterBold'}>SIGN UP</Text>
					<View
						flexDirection='row'
						alignItems='center'
					>
						<Image
							height={40}
							width={40}
							source={coin}
						/>
						<Text>+100 Points</Text>
					</View>
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ScreenRegister;
