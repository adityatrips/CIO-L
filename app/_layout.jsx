import { ThemeProvider } from '@react-navigation/native';
import { Slot, SplashScreen, Stack, useFocusEffect } from 'expo-router';
import {
	Button,
	TamaguiProvider,
	View,
	createFont,
	createTamagui,
} from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { AuthProvider } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
import config from '@/tamagui.config';
import { colors } from '@/constants';
import { StatusBar } from 'expo-status-bar';
export { ErrorBoundary } from 'expo-router';
import * as Linking from 'expo-linking';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useNetInfoInstance } from '@react-native-community/netinfo';
import { Wifi, WifiOff, X } from '@tamagui/lucide-icons';
import ImageTriangles from '@/components/ImageTriangles';
import { Image } from 'tamagui';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { Text } from 'tamagui';
import { Dimensions, SafeAreaView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const linkingUrl = Linking.useURL();

	const [NotoLoaded, NotoError] = useFonts({
		InterBlack: require('@/assets/fonts/NotoSans-Black.ttf'),
		InterExtraBold: require('@/assets/fonts/NotoSans-ExtraBold.ttf'),
		InterBold: require('@/assets/fonts/NotoSans-Bold.ttf'),
		InterSemiBold: require('@/assets/fonts/NotoSans-SemiBold.ttf'),
		InterMedium: require('@/assets/fonts/NotoSans-Medium.ttf'),
		Inter: require('@/assets/fonts/NotoSans-Regular.ttf'),
		InterExtraLight: require('@/assets/fonts/NotoSans-ExtraLight.ttf'),
		InterThin: require('@/assets/fonts/NotoSans-Thin.ttf'),
	});

	useEffect(() => {
		if (NotoLoaded || NotoError) {
			SplashScreen.hideAsync();
		}
	}, [NotoLoaded, NotoError]);

	if (!NotoLoaded && !NotoError) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const router = useRouter();

	const checkAuth = async () => {
		const userToken = await SecureStore.getItemAsync('userToken');
		const userInfo = await SecureStore.getItemAsync('userInfo');

		if (userToken && userInfo) {
			router.push('/home');
		}
	};

	const netInfo = useNetInfoInstance();

	useEffect(() => {
		if (netInfo.netInfo.isInternetReachable) {
			checkAuth();
		} else {
			return;
		}
	}, []);

	const DarkTheme = {
		dark: true,
		colors: {
			primary: colors.primary,
			background: colors.background,
			card: colors.primary,
			text: '#000',
			border: colors.primaryDark,
			notification: 'rgb(255, 69, 58)',
		},
	};

	return (
		<AuthProvider>
			<TamaguiProvider
				config={config}
				defaultTheme='dark'
			>
				<StatusBar style='dark' />
				{netInfo.netInfo.isInternetReachable ? (
					<ThemeProvider value={DarkTheme}>
						<RootSiblingParent key={1}>
							<Stack
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen name='index' />
								<Stack.Screen name='pdf' />
								<Stack.Screen name='selfie' />
								<Stack.Screen name='(authUser)' />

								<Stack.Screen name='screenLogin/index' />
								<Stack.Screen name='screenPassword/index' />
								<Stack.Screen name='screenRegister/index' />
								<Stack.Screen name='screenEditProfile/index' />
								<Stack.Screen name='screenStore/index' />
								<Stack.Screen name='screenFeedback/[id]/index' />
								<Stack.Screen
									name='modal'
									options={{
										presentation: 'containedTransparentModal',
										animation: 'slide_from_bottom',
										customAnimationOnGesture: true,
										contentStyle: {},
									}}
								/>
							</Stack>
						</RootSiblingParent>
					</ThemeProvider>
				) : (
					<View
						style={{
							flex: 1,
							alignItems: 'center',
						}}
					>
						<ImageTriangles
							bottom={-75}
							height='120%'
						/>
						<Image
							source={logo}
							resizeMode='contain'
							width={Dimensions.get('window').width * 0.75}
							height={Dimensions.get('window').height * 0.15}
							marginBottom={'10%'}
							marginTop={50}
						/>
						<WifiOff
							color={colors.primary}
							size='$17'
						/>
						<Text
							fontSize={29}
							fontFamily={'InterBold'}
							color='#444'
							marginTop={40}
							textAlign='center'
							w={Dimensions.get('window').width * 0.8}
						>
							Oops! Seems like you're not connected. Try again later.
						</Text>
						<StatusBar style='light' />
					</View>
				)}
			</TamaguiProvider>
		</AuthProvider>
	);
}
