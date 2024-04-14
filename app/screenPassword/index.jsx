import React, { useContext, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import ImageTriangles from '@/components/ImageTriangles';
import { Button, Image, Input, Text, View } from 'tamagui';
import { colors } from '@/constants';
import ankit from '@/assets/images/Ankit.png';
import { Dimensions } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingComp from '../../components/Loading';

const ScreenPassword = () => {
	const router = useRouter();
	const [pword, setPword] = useState('');

	const { userToken, userInfo, loading, error, login, lookupUser, toggleAuth } =
		useContext(AuthContext);

	const loginHandler = async () => {
		try {
			await login(userInfo?.username, pword);
			router.push('/authUser/home');
		} catch (error) {
			console.log('ScreenPassword::loginHandler::error:: ', error);
		}
	};

	return loading ? (
		<LoadingComp />
	) : (
		<LinearGradient
			colors={[colors.primary, colors.primaryDark]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<ImageTriangles />
			<SafeAreaView
				style={{
					width: '90%',
				}}
			>
				<View
					height={'100%'}
					width={'100%'}
					alignItems='center'
					justifyContent='flex-start'
					gap={20}
				>
					<Image
						marginTop={'20%'}
						height={150}
						width={150}
						resizeMode='cover'
						borderRadius={75}
						src={userInfo?.profilepicture || ankit}
					/>
					<View
						alignItems='center'
						position='relative'
						marginBottom={'10%'}
					>
						<Text fontSize={22}>{userInfo?.name || 'Ankit Sharma'}</Text>
						<Text fontSize={17}>{userInfo?.designation || 'Ankit Sharma'}</Text>
					</View>

					<Input
						borderWidth={0}
						width={'100%'}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						placeholder='ENTER OTP'
						placeholderTextColor={'#fff'}
						textAlign='center'
						backgroundColor={colors.primary}
						height={50}
						value={pword}
						onChangeText={(text) => setPword(text)}
					/>
					<Button
						marginBottom={'30%'}
						backgroundColor={colors.primary}
						borderRadius={100 / 2}
						width={'100%'}
						elevate
						elevation={5}
						fontSize={14}
						height={50}
						onPress={loginHandler}
					>
						NEXT
					</Button>
					<Text fontSize={15}>
						Don't have any account?
						<Link
							style={{
								fontWeight: 900,
							}}
							href='/screenRegister'
						>
							{' '}
							Sign Up
						</Link>
					</Text>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
};

export default ScreenPassword;
