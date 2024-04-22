import React from 'react';
import { Dimensions } from 'react-native';
import { Button, Image, Text, View } from 'tamagui';
import { colors } from '@/constants';
import coin from '@/assets/images/Coin1.png';
import Hybrid from '@/assets/images/Hybrid.png';
import Online from '@/assets/images/Online.png';
import Offline from '@/assets/images/Offline.png';
import { useRouter } from 'expo-router';
import moment from 'moment';

const UpcomingEventCard = ({
	data,
	registered = false,
	missed = false,
	attended = false,
	srcRoute = 'EvtCard',
}) => {
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
					{String(data.name)}
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
				{attended ? (
					<View gap={5}>
						<Button
							justifyContent='space-between'
							borderRadius={100 / 2}
							backgroundColor={colors.primaryDark}
							borderColor={colors.primaryDark}
							disabled={missed}
							pressStyle={{
								backgroundColor: colors.primary,
								borderColor: colors.primaryDark,
							}}
							height={30}
							onPress={() => {
								router.push({
									pathname: `/screenFeedback/${data.id}`,
									state: { srcRoute: srcRoute },
								});
							}}
						>
							<View
								flexDirection='row'
								alignItems='center'
								gap={5}
							>
								<Text
									fontSize={10}
									fontFamily={'InterBold'}
								>
									SHARE FEEDBACK
								</Text>
								<Image
									source={{
										uri: coin,
									}}
									width={25}
									height={25}
								/>
							</View>
						</Button>
						<Button
							justifyContent='space-between'
							borderRadius={100 / 2}
							backgroundColor={colors.primaryDark}
							borderColor={colors.primaryDark}
							disabled={missed}
							pressStyle={{
								backgroundColor: colors.primary,
								borderColor: colors.primaryDark,
							}}
							height={30}
							onPress={() => {
								router.push({
									pathname: `/authUser/event/${data.id}`,
									state: { srcRoute: srcRoute },
								});
							}}
						>
							<View
								flexDirection='row'
								alignItems='center'
								gap={5}
							>
								<Text
									fontSize={10}
									fontFamily={'InterBold'}
								>
									SHARE SELFIE
								</Text>
								<Image
									source={{
										uri: coin,
									}}
									width={25}
									height={25}
								/>
							</View>
						</Button>
					</View>
				) : (
					<Button
						borderRadius={100 / 2}
						backgroundColor={
							registered ? '#7a7a7a' : missed ? '#CE3426' : colors.primaryDark
						}
						borderColor={
							registered ? '#7a7a7a' : missed ? '#CE3426' : colors.primaryDark
						}
						disabled={missed}
						pressStyle={{
							backgroundColor: colors.primary,
							borderColor: colors.primaryDark,
						}}
						height={30}
						onPress={() => {
							router.push({
								pathname: `/authUser/event/${data.id}`,
								state: { srcRoute: srcRoute },
							});
						}}
					>
						<Text
							fontSize={10}
							fontFamily={'InterBold'}
						>
							{registered ? 'REGISTERED' : missed ? 'MISSED' : 'KNOW MORE'}
						</Text>
					</Button>
				)}
			</View>
		</View>
	);
};

export default UpcomingEventCard;
