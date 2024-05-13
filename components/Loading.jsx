import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'tamagui';

const LoadingComp = ({ small = false }) => {
	return !small ? (
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
	) : (
		<View
			justifyContent='center'
			alignItems='center'
			w={Dimensions.get('window').width}
			h={100}
		>
			<ActivityIndicator
				size='large'
				style={{
					width: 100,
					height: 100,
				}}
				color={'#6EBA43'}
			/>
		</View>
	);
};

export default LoadingComp;
