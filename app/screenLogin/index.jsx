import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Input, Button, View, Text } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { colors } from '@/constants';
import { Link, useRouter } from 'expo-router';
import ImageTriangles from '@/components/ImageTriangles';
import logo from '@/assets/images/Logo_White.png';
import { Dimensions, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { AuthContext } from '@/context/AuthContext';

const ScreenLogin = () => {
	const router = useRouter();
	const { userToken, userInfo, loading, error, login, lookupUser, toggleAuth } =
		useContext(AuthContext);
	const [username, setUsername] = useState('yashdakshita123@gmail.com');

	const handleLookupUser = async () => {
		if (username.length === 0) {
			alert('Please enter the username');
			return;
		} else {
			try {
				await lookupUser(username);
				router.push('/screenPassword');
			} catch (error) {
				ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
			}
		}
	};

	return (
		<LinearGradient
			colors={[colors.primary, colors.primaryDark]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
				alignItems: 'center',
			}}
		>
			<ImageTriangles />
			<SafeAreaView
				style={{
					flex: 1,
				}}
			>
				<View
					alignItems='center'
					justifyContent='flex-start'
					height={Dimensions.get('window').height}
					width={Dimensions.get('window').width * 0.9}
				>
					<Image
						marginTop={'40%'}
						marginBottom={'20%'}
						source={logo}
						maxWidth={'90%'}
						height={'10%'}
						resizeMode='contain'
					/>
					<View
						alignItems='center'
						position='relative'
					>
						<Text
							textTransform='uppercase'
							padding={0}
							fontSize={35}
							fontFamily={'InterSemiBold'}
						>
							WELCOME
						</Text>
						<Text
							fontSize={13}
							textTransform='uppercase'
							marginBottom={'10%'}
							fontWeight={'bold'}
						>
							Sign in to continue
						</Text>
					</View>
					<View
						width={'100%'}
						gap={10}
						marginBottom={'30%'}
					>
						<Input
							autoCapitalize='none'
							autoCorrect={false}
							borderWidth={0}
							width={'100%'}
							borderRadius={100 / 2}
							elevate
							elevation={5}
							placeholder='E-MAIL OR MOBILE'
							placeholderTextColor={'#fff'}
							textAlign='center'
							backgroundColor={colors.primary}
							height={50}
							value={username}
							fontSize={14}
							fontFamily={'InterMedium'}
							onChangeText={(text) => setUsername(text)}
						/>
						<Button
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
							onPress={handleLookupUser}
						>
							<Text
								fontSize={14}
								fontFamily={'InterBold'}
							>
								LOGIN
							</Text>
						</Button>
					</View>
					<Text
						fontSize={15}
						marginBottom={'30%'}
					>
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

export default ScreenLogin;
