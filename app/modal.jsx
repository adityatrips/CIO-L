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
			backgroundColor={colors.primaryDark}
		>
			<View
				backgroundColor={'#fff'}
				height={Dimensions.get('window').height * 0.75}
				width={Dimensions.get('window').width * 0.75}
				alignItems='center'
				gap={20}
				borderRadius={20}
			>
				<Image
					src={logo}
					resizeMode='contain'
					width={Dimensions.get('window').width * 0.6}
					height={Dimensions.get('window').height * 0.2}
				/>
				<Image
					width={Dimensions.get('window').width * 0.6}
					height={Dimensions.get('window').height * 0.3}
					resizeMode='contain'
					source={hourglass}
				/>
				<Text color='#000'>Approval Pending, please wait.</Text>
				<Text color='#000'>Redirecting to login page in 5 seconds.</Text>
			</View>

			<StatusBar style='light' />
		</View>
	);
}
