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

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [NotoLoaded, NotoError] = useFonts({
		InterDev: require('@/assets/fonts/noto-sans-devanagari-600.ttf'),
		Inter: require('@/assets/fonts/noto-sans-regular.ttf'),
		Inter500: require('@/assets/fonts/noto-sans-500.ttf'),
		Inter600: require('@/assets/fonts/noto-sans-600.ttf'),
		Inter700: require('@/assets/fonts/noto-sans-700.ttf'),
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
			router.push('/authUser/home');
		}
	};

	useEffect(() => {
		checkAuth();
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
						<Stack.Screen name='authUser/home/index' />
						<Stack.Screen name='screenFeedback/index' />
						<Stack.Screen name='screenLogin/index' />
						<Stack.Screen name='screenPassword/index' />
						<Stack.Screen name='screenRegister/index' />
						<Stack.Screen
							name='modal'
							options={{
								presentation: 'modal',
							}}
						/>
					</Stack>
				</ThemeProvider>
			</TamaguiProvider>
		</AuthProvider>
	);
}
