import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { Image, Text, View } from 'tamagui';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const HeaderComp = ({ title = 'CIO&Leader' }) => {
	const router = useRouter();

	return (
		<LinearGradient
			colors={[colors.primary, colors.primaryDark]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<View
				backgroundColor={'#fff'}
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				paddingHorizontal={20}
				width={Dimensions.get('screen').width}
				elevationAndroid={10}
				height={Dimensions.get('screen').height * 0.1}
				zIndex={100}
			>
				<Image
					source={{
						uri: logo,
					}}
					height={Dimensions.get('screen').height * 0.08}
					width={Dimensions.get('screen').width * 0.4}
					resizeMode='contain'
				/>
				<Text
					fontFamily={'InterBold'}
					fontSize={20}
					color='#000'
				>
					{title}
				</Text>
			</View>
		</LinearGradient>
	);
};

export default HeaderComp;
