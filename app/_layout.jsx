import { ThemeProvider } from '@react-navigation/native';
import { Slot, SplashScreen, Stack } from 'expo-router';
import { TamaguiProvider, createFont, createTamagui } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { AuthProvider } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import config from '@/tamagui.config';
import { colors } from '@/constants';
import { StatusBar } from 'expo-status-bar';
export { ErrorBoundary } from 'expo-router';
import * as Linking from 'expo-linking';

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
			router.push('/(authUser)/home');
		}
	};

	useEffect(() => {
		checkAuth();

		router.push('/screenEditProfile');
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
				<ThemeProvider value={DarkTheme}>
					<Stack
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen name='index' />
						<Stack.Screen name='pdf' />
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
				</ThemeProvider>
			</TamaguiProvider>
		</AuthProvider>
	);
}
