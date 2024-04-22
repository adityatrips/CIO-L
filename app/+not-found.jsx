import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { View, Text } from 'tamagui';

export default function NotFoundScreen() {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				padding: 20,
			}}
		>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View margin={10}>
				<Text>This screen doesn't exist.</Text>
				<Link
					href='/'
					style={{
						marginTop: 15,
						paddingVertical: 15,
					}}
				>
					<Text
						style={{
							fontSize: 14,
							color: '#2e78b7',
						}}
					>
						Go to home screen!
					</Text>
				</Link>
			</View>
		</View>
	);
}
