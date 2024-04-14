import { Image, Text, View } from 'tamagui';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants';
import hourglass from '@/assets/images/hourglass.png';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function Modal() {
	useEffect(() => {
		(async () => {
			await SecureStore.deleteItemAsync('userToken');
			await SecureStore.deleteItemAsync('userInfo');
		})();

		setTimeout(() => {
			router.push('/screenLogin');
		}, 5000);
	}, []);

	return (
		<View
			flex={1}
			alignItems={'center'}
			justifyContent={'center'}
			backgroundColor={'#fff'}
		>
			<Image
				src={logo}
				resizeMode='contain'
				width={Dimensions.get('window').width * 0.75}
				height={Dimensions.get('window').height * 0.15}
			/>
			<Image
				width={Dimensions.get('window').width * 0.6}
				height={Dimensions.get('window').height * 0.3}
				resizeMode='contain'
				source={hourglass}
				marginVertical={20}
			/>
			<Text
				fontSize={17}
				fontFamily={'InterBold'}
				color='#000'
			>
				Approval Pending, please wait.
			</Text>
			<Text color='#000'>Redirecting to login page in 5 seconds.</Text>
			<StatusBar style='light' />
		</View>
	);
}
