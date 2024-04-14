import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useRouter } from 'expo-router';

const ScreenRegister = () => {
	const router = useRouter();

	return (
		<LinearGradient
			colors={['#6EBA43', '#019348']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<SafeAreaView></SafeAreaView>
		</LinearGradient>
	);
};

export default ScreenRegister;
