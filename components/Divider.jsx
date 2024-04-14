import React from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'tamagui';

const Divider = () => {
	return (
		<View
			height={10}
			width={Dimensions.get('screen').width * 0.9}
			borderRadius={100 / 2}
			marginVertical={50}
			backgroundColor={'#dddddd'}
		></View>
	);
};

export default Divider;
