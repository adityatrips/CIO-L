import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Input, Button, View, Text, ScrollView } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { colors, vibrateHeavy } from '@/constants';
import { Link, useRouter } from 'expo-router';
import ImageTriangles from '@/components/ImageTriangles';
import logo from '@/assets/images/Logo_White.png';
import {
	ActivityIndicator,
	Dimensions,
	KeyboardAvoidingView,
	Vibration,
} from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import isEmail from 'validator/lib/isEmail';
import { isMobilePhone, isMobilePhoneLocales, isNumeric } from 'validator';
import Toast from 'react-native-root-toast';

const ScreenLogin = () => {
	const router = useRouter();
	const { lookupUser } = useContext(AuthContext);
	const [username, setUsername] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const handleLookupUser = async () => {
		if (username.length === 0) {
			Toast.show('Please enter your email or mobile number', {
				duration: Toast.durations.SHORT,
			});
			vibrateHeavy();
		} else if (
			(isEmail(username) === false && !isNumeric(username)) ||
			(isMobilePhone(username, 'en-IN') === false && !isEmail(username))
		) {
			Toast.show('Invalid username', { duration: Toast.durations.SHORT });
			vibrateHeavy();
		} else {
			try {
				setIsLoading(true);
				await lookupUser(username);
				router.push({
					pathname: '/screenPassword',
					params: {
						email: username,
					},
				});
			} catch (error) {
				vibrateHeavy();
				Toast.show("Can't find user, please sign up.", {
					duration: Toast.durations.SHORT,
				});
			} finally {
				setIsLoading(false);
			}
		}
	};
	const { height, width } = Dimensions.get('screen');

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
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: 20,
						width: Dimensions.get('window').width,
						paddingHorizontal: Dimensions.get('window').width * 0.05,
					}}
				>
					<Image
						marginTop={'40%'}
						marginBottom={'20%'}
						source={logo}
						width={width * 0.75}
						height={height * 0.1}
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
								backgroundColor: colors.primary,
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
								{isLoading ? (
									<ActivityIndicator
										size='small'
										color='#fff'
									/>
								) : (
									<Text>LOGIN</Text>
								)}
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
							Sign Up
						</Link>
					</Text>
				</ScrollView>
			</SafeAreaView>
		</LinearGradient>
	);
};

export default ScreenLogin;
