import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button, Image, Input, ScrollView, Text, View } from 'tamagui';
import { Dimensions, Modal, ToastAndroid } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { ChevronLeftCircle } from '@tamagui/lucide-icons';
import coin from '@/assets/images/Coin1.png';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { colors } from '@/constants';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { isAlpha, isMobilePhone } from 'validator';
import isEmail from 'validator/lib/isEmail';
const ScreenRegister = () => {
	const router = useRouter();

	const [fname, setFname] = React.useState('');
	const [lname, setLname] = React.useState('');
	const [mobile, setMobile] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [company, setCompany] = React.useState('');
	const [pword, setPword] = React.useState('');
	const [confPword, setConfPword] = React.useState('');
	const [designation, setDesignation] = React.useState('');

	const handleRegister = async () => {
		if (!isAlpha(fname) && !isAlpha(lname)) {
			ToastAndroid.show(
				'First and last names should be alphabets',
				ToastAndroid.SHORT
			);
		} else if (!isMobilePhone(mobile, 'en-IN')) {
			ToastAndroid.show('Invalid mobile number', ToastAndroid.SHORT);
		} else if (!isEmail(email)) {
			ToastAndroid.show('Invalid email address', ToastAndroid.SHORT);
		} else if (!pword.length >= 8) {
			ToastAndroid.show(
				'Password should be atleast 8 characters long',
				ToastAndroid.SHORT
			);
		} else if (pword !== confPword) {
			ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
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
			ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
			return;
		} else {
			try {
				await axios.post(
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
				console.log('Redirecting');
				router.push('/screenLogin');
			} catch (error) {
				console.log(JSON.stringify(error));

				if (error.code === 'ERR_BAD_REQUEST') {
					ToastAndroid.show('User already exists', ToastAndroid.SHORT);
				} else {
					ToastAndroid.show('An error occured', ToastAndroid.SHORT);
				}

				setFname('');
				setLname('');
				setMobile('');
				setEmail('');
				setCompany('');
				setPword('');
				setConfPword('');
				setDesignation('');
			}
		}
	};

	const [shown, setShown] = React.useState(false);
	const [modalMessage, setModalMessage] = React.useState('');

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
				<Input
					autoCapitalize='none'
					autoCorrect={false}
					borderWidth={0}
					color='#616161'
					width={'100%'}
					borderRadius={100 / 2}
					elevate
					elevation={5}
					secureTextEntry
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
				<Input
					autoCapitalize='none'
					autoCorrect={false}
					borderWidth={0}
					color='#616161'
					width={'100%'}
					borderRadius={100 / 2}
					elevate
					elevation={5}
					secureTextEntry
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
						<Text>+50 Points</Text>
					</View>
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ScreenRegister;
