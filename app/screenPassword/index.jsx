import React, { useContext, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import ImageTriangles from '@/components/ImageTriangles';
import { Button, Image, Input, Text, View } from 'tamagui';
import { colors } from '@/constants';
import ankit from '@/assets/images/Ankit.png';
import { Dimensions, ToastAndroid } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingComp from '../../components/Loading';

const ScreenPassword = () => {
	const router = useRouter();
	const [pword, setPword] = useState('india@123');

	const { userToken, userInfo, loading, login, lookupUser, toggleAuth } =
		useContext(AuthContext);

	const loginHandler = async () => {
		if (pword.length === 0) {
			ToastAndroid.show("Passwords don't match", ToastAndroid.SHORT);
			return;
		} else {
			try {
				await login(userInfo?.username, pword);
				router.push('/authUser/home');
			} catch (error) {
				ToastAndroid.show(
					'Invalid password, please try again!',
					ToastAndroid.SHORT
				);
				if (error.message) {
					alert('Invalid password, please try again!');
				}
			}
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
					<View
						shadowColor={'#000000'}
						shadowOffset={{ width: -2, height: 4 }}
						shadowOpacity={0.2}
						shadowRadius={3}
					>
						<Image
							marginTop={'20%'}
							height={120}
							width={120}
							resizeMode='cover'
							borderRadius={75}
							src={userInfo?.profilepicture || ankit}
						/>
					</View>
					<View
						alignItems='center'
						position='relative'
						marginBottom={'10%'}
					>
						<Text
							fontSize={22}
							fontFamily={'InterBold'}
						>
							{userInfo?.name || 'Ankit Sharma'}
						</Text>
						<Text
							fontFamily={'InterMedium'}
							fontSize={17}
						>
							{userInfo?.designation || 'Ankit Sharma'}
						</Text>
					</View>

					<Input
						autoCapitalize='none'
						autoCorrect={false}
						borderWidth={0}
						width={'100%'}
						borderRadius={100 / 2}
						elevate
						secureTextEntry
						elevation={5}
						placeholder='ENTER PASSWORD'
						placeholderTextColor={'#fff'}
						textAlign='center'
						backgroundColor={colors.primary}
						height={50}
						value={pword}
						fontSize={14}
						fontFamily={'InterMedium'}
						onChangeText={(text) => setPword(text)}
					/>
					<Button
						marginBottom={'30%'}
						backgroundColor={colors.primary}
						borderColor={colors.primary}
						pressStyle={{
							backgroundColor: colors.primaryDark,
							borderColor: colors.primary,
						}}
						borderRadius={100 / 2}
						width={'100%'}
						elevate
						elevation={5}
						height={50}
						onPress={loginHandler}
					>
						<Text
							fontSize={14}
							fontFamily={'InterBold'}
						>
							LOGIN
						</Text>
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
