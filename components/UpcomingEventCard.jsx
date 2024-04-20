import React from 'react';
import { Dimensions } from 'react-native';
import { Button, Image, Text, View } from 'tamagui';
import { colors } from '@/constants';

import Hybrid from '@/assets/images/Hybrid.png';
import Online from '@/assets/images/Online.png';
import Offline from '@/assets/images/Offline.png';
import { useRouter } from 'expo-router';
import moment from 'moment';

const UpcomingEventCard = ({ data, isOnProfile }) => {
	const router = useRouter();
	return (
		<View
			elevationAndroid={5}
			minHeight={Dimensions.get('screen').height * 0.3}
			borderRadius={20}
			width={Dimensions.get('screen').width * 0.9}
			backgroundColor={colors.primary}
			position={'relative'}
		>
			<View
				elevationAndroid={5}
				position={'absolute'}
				top={0}
				left={0}
				height={'100%'}
				width={'50%'}
				borderRadius={20}
				backgroundColor={'#000'}
				justifyContent='center'
				alignItems='center'
				flex={1}
			>
				<Text
					position='absolute'
					top={'5%'}
					fontSize={11}
					marginVertical={5}
					backgroundColor={'#6BB943'}
					paddingVertical={5}
					width={'75%'}
					textAlign='center'
					fontFamily={'InterMedium'}
				>
					In Partnership With
				</Text>
				<Image
					src={data.sponsorpicture}
					width={'90%'}
					aspectRatio={16 / 9}
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
				flex={1}
			>
				<View
					flexDirection='row'
					alignItems='center'
					justifyContent='center'
					gap={10}
					marginBottom={10}
					padding={10}
					borderRadius={10}
					elevationAndroid={10}
					backgroundColor={
						data.type === '2'
							? '#3E821B'
							: data.type === '1'
							? '#DF3803'
							: '#4D5791'
					}
				>
					<Image
						source={
							data.type === '2' ? Online : data.type === '1' ? Offline : Hybrid
						}
						width={35}
						height={35}
					/>
					<Text
						textTransform='uppercase'
						fontSize={17}
						fontFamily={'InterBold'}
					>
						{data.type === '2'
							? 'Online'
							: data.type === '1'
							? 'Offline'
							: 'Hybrid'}
					</Text>
				</View>
				<Text
					fontSize={13}
					fontFamily={'InterMedium'}
					flexShrink={1}
				>
					{String(data.name).length > 40
						? String(data.name).slice(0, 40) + '...'
						: data.name}
				</Text>
				<View flexGrow={1}>
					<View
						flexDirection='row'
						alignItems='center'
						justifyContent='space-between'
					>
						<View
							height={1}
							width={'50%'}
							backgroundColor={'#fff'}
						></View>
						<View
							height={3}
							width={'50%'}
							backgroundColor={'#fff'}
						></View>
					</View>
					<View>
						<Text
							marginVertical={5}
							fontSize={11}
							fontFamily={'InterBold'}
						>
							{moment(data.date, 'YYYY-MM-DD').format('MMM DD, YYYY')} |&nbsp;
							{moment(data.time, 'HH:mm:ss').format('hh:mm A')}
						</Text>
						<View
							height={1}
							opacity={0.5}
							width={'75%'}
							backgroundColor={'#fff'}
						></View>
						<Text
							fontSize={11}
							fontFamily={'InterBold'}
						>
							{data.venue}
						</Text>
						<Text fontSize={10}>{data.address}</Text>
					</View>
				</View>
				{!isOnProfile && (
					<Button
						borderRadius={100 / 2}
						backgroundColor={colors.primaryDark}
						borderColor={colors.primaryDark}
						pressStyle={{
							backgroundColor: colors.primary,
							borderColor: colors.primaryDark,
						}}
						height={30}
						onPress={() => {
							router.push(`/authUser/event/${data.id}`);
						}}
					>
						<Text
							fontSize={10}
							fontFamily={'InterBold'}
						>
							KNOW MORE
						</Text>
					</Button>
				)}
				{isOnProfile && (
					<View gap={5}>
						<Button
							borderRadius={100 / 2}
							backgroundColor={colors.primaryDark}
							borderColor={colors.primaryDark}
							pressStyle={{
								backgroundColor: colors.primary,
								borderColor: colors.primaryDark,
							}}
							height={30}
							onPress={() => {
								router.push(`/screenFeedback/${data.id}`);
							}}
						>
							<Text
								fontSize={10}
								fontFamily={'InterBold'}
							>
								FEEDBACK
							</Text>
						</Button>
						<Button
							borderRadius={100 / 2}
							backgroundColor={colors.primaryDark}
							borderColor={colors.primaryDark}
							pressStyle={{
								backgroundColor: colors.primary,
								borderColor: colors.primaryDark,
							}}
							height={30}
							onPress={() => {
								// router.push(`/authUser/event/${data.id}`);
							}}
						>
							<Text
								fontSize={10}
								fontFamily={'InterBold'}
							>
								SHARE SELFIE
							</Text>
						</Button>
					</View>
				)}
			</View>
		</View>
	);
};

export default UpcomingEventCard;
