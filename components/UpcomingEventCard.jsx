import React from 'react';
import { Dimensions } from 'react-native';
import { Button, Image, Text, View } from 'tamagui';
import { colors } from '@/constants';

import Hybrid from '@/assets/images/Hybrid.png';
import Online from '@/assets/images/Online.png';
import Offline from '@/assets/images/Offline.png';

const UpcomingEventCard = ({ data }) => {
	return (
		<View
			minHeight={Dimensions.get('screen').height * 0.3}
			borderRadius={20}
			width={Dimensions.get('screen').width * 0.9}
			backgroundColor={colors.primary}
			position={'relative'}
		>
			<View
				position={'absolute'}
				top={0}
				left={0}
				height={'100%'}
				width={'50%'}
				borderRadius={20}
				backgroundColor={'#000'}
			>
				<Image
					source={{ uri: data.sponsorpicture }}
					borderRadius={20}
					width={'100%'}
					height={'100%'}
					resizeMode='contain'
				/>
			</View>
			<View
				position={'absolute'}
				justifyContent='space-between'
				top={0}
				right={0}
				height={'100%'}
				width={'50%'}
				padding={10}
				borderRadius={20}
			>
				<View
					flexDirection='row'
					alignItems='center'
					justifyContent='center'
					gap={10}
					marginBottom={10}
					padding={10}
					borderRadius={10}
					backgroundColor={
						data.type === '1'
							? colors.primaryDark
							: data.type === '2'
							? colors.primary
							: '#444'
					}
				>
					<Image
						source={
							data.type === '1' ? Online : data.type === '2' ? Offline : Hybrid
						}
						width={50}
						height={50}
					/>
					<Text>
						{data.type === '1'
							? 'Online'
							: data.type === '2'
							? 'Offline'
							: 'Hybrid'}
					</Text>
				</View>
				<Text>{data.name}</Text>
				<View
					flexDirection='row'
					alignItems='center'
					justifyContent='space-between'
					marginTop={10}
				>
					<View
						height={2}
						width={'50%'}
						backgroundColor={'#fff'}
					></View>
					<View
						height={5}
						width={'50%'}
						backgroundColor={'#fff'}
					></View>
				</View>
				<View>
					<Text>
						{data.venue} | {data.time}
					</Text>
					<Text>{data.date}</Text>
				</View>
				<Button>
					<Text>View Details</Text>
				</Button>
			</View>
		</View>
	);
};

export default UpcomingEventCard;
