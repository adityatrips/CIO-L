import React from 'react';
import { Image, View } from 'tamagui';

import openTopRight from '@/assets/images/OpenTopRight.png';
import OpenMiddle from '@/assets/images/OpenMiddle.png';
import OpenLeftBottom from '@/assets/images/OpenLeftBottom.png';

const ImageTriangles = () => {
	return (
		<View
			bottom={0}
			left={0}
			right={0}
			position='absolute'
			width={'100%'}
			height={'110%'}
		>
			<Image
				position='absolute'
				width={'147.98%'}
				height={'33.88%'}
				left={'-24%'}
				top={'79.2%'}
				source={OpenMiddle}
			/>
			<Image
				position='absolute'
				width={'63.4%'}
				height={'14.5%'}
				left={'-20%'}
				top={'88%'}
				source={OpenLeftBottom}
			/>
			<Image
				position='absolute'
				width={'103.4%'}
				height={'23.63%'}
				left={'37%'}
				top={'76.4%'}
				source={openTopRight}
			/>
		</View>
	);
};

export default ImageTriangles;
