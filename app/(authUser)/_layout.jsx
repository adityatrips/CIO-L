import { Stack } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='home/index'
		>
			<Stack.Screen name='event/[event]/index' />
			<Stack.Screen name='home/index' />
			<Stack.Screen name='kc/index' />
			<Stack.Screen name='mcq/[mcq]/index' />
			<Stack.Screen name='pro/index' />
			<Stack.Screen name='pts/index' />
		</Stack>
	);
};

export default AuthLayout;
