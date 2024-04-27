import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useRouter } from 'expo-router';
import { ActivityIndicator, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LoadingComp = () => {
	const router = useRouter();

	return (
		<LinearGradient
			colors={['#6EBA43', '#019348']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
			}}
		>
			<StatusBar style='light' />
			<SafeAreaView
				style={{
					height: Dimensions.get('window').height,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<ActivityIndicator
					size='large'
					color={'#fff'}
				/>
			</SafeAreaView>
		</LinearGradient>
	);
};

export default LoadingComp;
