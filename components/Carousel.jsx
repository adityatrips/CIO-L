import React, { useState, useEffect } from 'react';
import { Image, View } from 'tamagui';
import { Dimensions } from 'react-native';

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

const Carousel = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, 5000); // Autoplay time

		return () => clearInterval(interval);
	}, [images]);

	return (
		<View
			width={'100%'}
			height={'100%'}
			position={'relative'}
		>
			<Image
				source={images[currentIndex]}
				width={'100%'}
				height={'100%'}
				objectFit={'cover'}
			/>
			<View
				flexDirection={'row'}
				justifyContent={'center'}
				position={'absolute'}
				bottom={20}
				width={'100%'}
			>
				{images.map((_, index) => (
					<View
						key={index}
						height={10}
						width={10}
						borderRadius={5}
						backgroundColor={index === currentIndex ? '#019348' : 'gray'}
						marginHorizontal={5}
					/>
				))}
			</View>
		</View>
	);
};

export default Carousel;
