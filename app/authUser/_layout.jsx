import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View } from 'tamagui';
import { colors } from '@/constants';
import { Home, Calendar, Book, Coins, User } from '@tamagui/lucide-icons';
import logo from '@/assets/images/Logo_GreenBlack.png';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#FFF',
				tabBarInactiveTintColor: '#FFF',
				tabBarIconStyle: {
					width: 24,
					height: 24,
					color: '#fff',
				},
				tabBarLabelStyle: {
					textTransform: 'uppercase',
				},
				tabBarInactiveBackgroundColor: colors.primary,
				tabBarActiveBackgroundColor: colors.primary,
				tabBarStyle: {
					height: Dimensions.get('screen').height * 0.075,
				},
				header: ({ navigation, route, options, back }) => (
					<SafeAreaView edges={['top', 'left', 'right']}>
						<View
							flexDirection='row'
							alignItems='center'
							gap={20}
							justifyContent='space-between'
							backgroundColor={'#FFF'}
							paddingHorizontal={20}
							height={Dimensions.get('screen').height * 0.1}
						>
							<Image
								source={logo}
								width={'60%'}
								maxHeight={'70%'}
								resizeMethod='scale'
								resizeMode='contain'
							/>
						</View>
					</SafeAreaView>
				),
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: () => <Home color='#fff' />,
				}}
			/>
			<Tabs.Screen
				name='event'
				options={{
					title: 'Event',
					tabBarIcon: () => <Calendar color='#fff' />,
				}}
			/>
			<Tabs.Screen
				name='kc'
				options={{
					title: 'KC',
					tabBarIcon: () => <Book color='#fff' />,
				}}
			/>
			<Tabs.Screen
				name='pts'
				options={{
					title: 'Pts',
					tabBarIcon: () => <Coins color='#fff' />,
				}}
			/>
			<Tabs.Screen
				name='pro'
				options={{
					title: 'Pro',
					tabBarIcon: () => <User color='#fff' />,
				}}
			/>
		</Tabs>
	);
}
