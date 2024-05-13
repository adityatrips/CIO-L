import React, { useContext, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import ImageTriangles from '@/components/ImageTriangles';
import { Button, Image, Input, ScrollView, Text, View } from 'tamagui';
import { colors, vibrateHeavy } from '@/constants';
import ankit from '@/assets/images/Ankit.png';
import { ActivityIndicator, Dimensions, Vibration } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingComp from '@/components/Loading';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { isEmail, isMobile } from 'validator';
import Toast from 'react-native-root-toast';

const ScreenPassword = () => {
	const { email } = useLocalSearchParams();
	const router = useRouter();
	const [pword, setPword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [HidePassword, setHidePassword] = useState(true);

	const { userToken, userInfo, loading, login, lookupUser, toggleAuth } =
		useContext(AuthContext);

	const loginHandler = async () => {
		setIsLoading(true);
		if (pword.length === 0 || pword.length < 8) {
			vibrateHeavy();
			Toast.show('Invalid password, please re-check', {
				duration: Toast.durations.SHORT,
			});
			return;
		} else {
			try {
				await login(userInfo?.username, pword).then(() => {
					router.push('/home');
				});
			} catch (error) {
				vibrateHeavy();
				Toast.show('Invalid password, please try again!', {
					duration: Toast.durations.SHORT,
				});
			} finally {
				setIsLoading(false);
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
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 20,
						paddingHorizontal: Dimensions.get('window').width * 0.05,
					}}
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
							source={{
								uri: userInfo?.profilepicture || ankit,
							}}
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

					<View
						width={'100%'}
						alignItems='center'
						justifyContent='space-between'
						flexDirection='row'
						backgroundColor={colors.primary}
						borderRadius={100 / 2}
						overflow='hidden'
					>
						<Input
							backgroundColor={colors.primary}
							autoCapitalize='none'
							autoCorrect={false}
							borderWidth={0}
							width={'100%'}
							secureTextEntry={HidePassword}
							placeholder='ENTER PASSWORD'
							placeholderTextColor={'#fff'}
							textAlign='center'
							height={50}
							value={pword}
							fontSize={14}
							fontFamily={'InterMedium'}
							onChangeText={(text) => setPword(text)}
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
								color='#fff'
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
								color='#fff'
							/>
						)}
					</View>

					<Button
						marginBottom={'30%'}
						backgroundColor={colors.primary}
						borderColor={colors.primary}
						pressStyle={{
							backgroundColor: colors.primary,
							borderColor: colors.primary,
						}}
						borderRadius={100 / 2}
						width={'100%'}
						elevate
						elevation={5}
						height={50}
						onPress={loginHandler}
					>
						{isLoading === true ? (
							<ActivityIndicator
								size='small'
								color='#fff'
							/>
						) : (
							<Text
								fontSize={14}
								fontFamily={'InterBold'}
							>
								LOGIN
							</Text>
						)}
					</Button>
					<Text fontSize={15}>
						Don't have any account?{' '}
						<Link
							style={{
								fontWeight: 900,
							}}
							href='/screenRegister'
						>
							Sign Up
						</Link>
					</Text>
					<Text fontSize={15}>
						Forgot passowrd?{' '}
						<Text
							onPress={() => {
								if (isEmail(email)) {
									Toast.show(`Reset email sent to ${email}`, {
										duration: Toast.durations.SHORT,
									});
								} else if (isMobile(email, 'en-IN')) {
									Toast.show(
										`Please login from your email address to reset the password`,
										{ duration: Toast.durations.SHORT }
									);
								}
							}}
							style={{
								fontWeight: 900,
							}}
						>
							Send a reset email
						</Text>
					</Text>
				</ScrollView>
			</SafeAreaView>
		</LinearGradient>
	);
};

export default ScreenPassword;
