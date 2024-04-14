import React from 'react';
import { Dimensions, Linking } from 'react-native';
import { Button, Image, Text, View } from 'tamagui';
import coin from '@/assets/images/Coin1.png';

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

const KnowledgeCard = ({ data }) => {
	return (
		<View
			backgroundColor={'#8DC63F'}
			borderRadius={20}
			overflow='hidden'
			height={wH * 0.5}
			width={wW * 0.7}
			paddingBottom={10}
			justifyContent='space-between'
			marginRight={10}
		>
			<View
				position={'absolute'}
				backgroundColor={'red'}
				alignItems={'center'}
				justifyContent={'flex-end'}
				height={100}
				width={100}
				zIndex={2}
				right={-50}
				top={-50}
				transform={'rotate(45deg)'}
			>
				<Text
					fontSize={12}
					color={'#fff'}
					fontWeight={'bold'}
					paddingBottom={7}
				>
					NEW
				</Text>
			</View>

			<Text
				position={'absolute'}
				top={10}
				left={10}
				zIndex={2}
				fontSize={12}
				color={'#fff'}
				textAlign={'center'}
				textTransform={'uppercase'}
				fontWeight={'bold'}
			>
				{data.name}
			</Text>
			<Image
				width={'100%'}
				height={'50%'}
				borderRadius={20}
				objectFit={'cover'}
				src='https://dummyimage.com/600x400/000/fff&text=One'
			/>

			<View padding={10}>
				<Text
					color={'#fff'}
					textAlign={'center'}
				>
					{data.heading}
				</Text>
			</View>
			<View
				gap={5}
				justifyContent='center'
				alignItems='center'
			>
				<Button
					onPress={() => {
						Linking.openURL(data.file);
					}}
					width={'90%'}
					iconAfter={() => {
						return (
							<Image
								source={{
									uri: coin,
								}}
							/>
						);
					}}
				>
					<Text>Read More</Text>
				</Button>
				<Button width={'90%'}>
					<Text>Share</Text>
				</Button>
			</View>
		</View>
	);
};

export default KnowledgeCard;
