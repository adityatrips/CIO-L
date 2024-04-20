import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { Image, Text, View } from 'tamagui';
import { Dimensions } from 'react-native';

const HeaderComp = ({ title = 'CIO&Leader' }) => {
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
				height={60}
				width={Dimensions.get('screen').width}
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
