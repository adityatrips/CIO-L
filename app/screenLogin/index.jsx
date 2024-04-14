import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Input, Button, View, Text } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { colors } from '@/constants';
import { Link, useRouter } from 'expo-router';
import ImageTriangles from '@/components/ImageTriangles';
import logo from '@/assets/images/Logo_White.png';
import { Dimensions } from 'react-native';
import { AuthContext } from '@/context/AuthContext';

const ScreenLogin = () => {
	const router = useRouter();
	const { userToken, userInfo, loading, error, login, lookupUser, toggleAuth } =
		useContext(AuthContext);
	const [username, setUsername] = useState('yashdakshita123@gmail.com');

	const handleLookupUser = async () => {
		try {
			await lookupUser(username);
			router.push('/screenPassword');
		} catch (error) {
			console.log('ScreenLogin::handleLookupUser::error:: ', error);
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
					width: '75%',
				}}
			>
				<View
					height={'100%'}
					alignItems='center'
					justifyContent='flex-start'
					gap={20}
				>
					<Image
						source={logo}
						maxWidth={'90%'}
						height={'10%'}
						marginTop={Dimensions.get('window').height * 0.15}
						resizeMode='contain'
					/>
					<Text
						textTransform='uppercase'
						fontSize={35}
						padding={0}
					>
						WELCOME
					</Text>
					<Text
						fontSize={13}
						textTransform='uppercase'
					>
						Sign in to continue
					</Text>
					<Input
						borderWidth={0}
						width={Dimensions.get('window').width * 0.75}
						borderRadius={100 / 2}
						elevate
						elevation={5}
						placeholder='E-MAIL OR MOBILE'
						placeholderTextColor={'#fff'}
						textAlign='center'
						backgroundColor={colors.primary}
						height={50}
						value={username}
						onChangeText={(text) => setUsername(text)}
					/>
					<Button
						backgroundColor={colors.primary}
						borderRadius={100 / 2}
						width={Dimensions.get('window').width * 0.75}
						elevate
						elevation={5}
						height={50}
						onPress={handleLookupUser}
					>
						NEXT
					</Button>
					<Text
						position='absolute'
						bottom={30}
						fontSize={15}
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
