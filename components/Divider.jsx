import React from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'tamagui';

const Divider = ({ spacing = 20 }) => {
	return (
		<View
			height={2}
			width={Dimensions.get('screen').width * 0.9}
			borderRadius={100 / 2}
			marginVertical={spacing}
			backgroundColor={'#CCC'}
		></View>
	);
};

export default Divider;
