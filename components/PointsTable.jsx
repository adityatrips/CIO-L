import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'tamagui';
import { colors } from '@/constants';
import { ActivityIndicator, Dimensions } from 'react-native';
const PointsTable = ({ data, isOnHome = false }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (data.length === 0) {
			data = [
				{
					id: 1,
					amount: 50,
					type: '1',
					date: '2024-04-12',
					description: 'Nothing here',
					user: 1,
				},
			];
		} else {
			data = data;
		}
		setLoading(false);

		console.log(data);
	}, []);

	return loading ? (
		<View
			flex={1}
			justifyContent={'center'}
			alignItems={'center'}
			backgroundColor={'#fff'}
		>
			<ActivityIndicator
				size='large'
				color={colors.primary}
			/>
		</View>
	) : (
		<ScrollView
			contentContainerStyle={{
				width: '100%',
			}}
		>
			{!isOnHome && (
				<View
					backgroundColor={'#FFFFFF'}
					borderRadius={20}
					justifyContent={'space-between'}
					alignItems={'center'}
					flexDirection={'row'}
					padding={20}
					width={'100%'}
				>
					<View
						justifyContent={'space-between'}
						alignItems={'center'}
						flex={1}
						borderRightWidth={1}
						borderColor={'gray'}
					>
						<Text
							fontWeight={'bold'}
							textTransform={'uppercase'}
							fontSize={10}
							color={'green'}
						>
							Total Earned
						</Text>
						<View
							alignItems={'center'}
							justifyContent={'center'}
							flexDirection={'row'}
						>
							<Image
								source={require('@/assets/images/Coin1.png')}
								height={20}
								width={20}
							/>
							<Text
								color={'green'}
								fontWeight={'bold'}
								fontSize={10}
							>
								+50
							</Text>
						</View>
					</View>

					<View
						justifyContent={'space-between'}
						alignItems={'center'}
						flex={1}
						borderRightWidth={1}
						borderColor={'gray'}
					>
						<Text
							fontWeight={'bold'}
							textTransform={'uppercase'}
							fontSize={10}
							color={'red'}
						>
							Total Redeem
						</Text>
						<View
							alignItems={'center'}
							justifyContent={'center'}
							flexDirection={'row'}
						>
							<Image
								source={require('@/assets/images/Coin1.png')}
								height={20}
								width={20}
							/>
							<Text
								color={'red'}
								fontWeight={'bold'}
								fontSize={10}
							>
								+50
							</Text>
						</View>
					</View>

					<View
						justifyContent={'space-between'}
						alignItems={'center'}
						flex={1}
					>
						<Text
							fontWeight={'bold'}
							textTransform={'uppercase'}
							fontSize={10}
							color={'#000'}
						>
							Balance
						</Text>
						<View
							alignItems={'center'}
							justifyContent={'center'}
							flexDirection={'row'}
						>
							<Image
								source={require('@/assets/images/Coin1.png')}
								height={20}
								width={20}
							/>
							<Text
								color={'green'}
								fontWeight={'bold'}
								fontSize={10}
							>
								+50
							</Text>
						</View>
					</View>
				</View>
			)}

			<View
				flexDirection={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				marginTop={!isOnHome ? 20 : 0}
				backgroundColor={colors.primary}
				padding={10}
				borderTopRightRadius={20}
				borderTopLeftRadius={20}
			>
				<Text
					textAlign={'center'}
					flex={1}
					textTransform={'uppercase'}
					fontWeight={'bold'}
					fontSize={10}
				>
					Date
				</Text>
				<Text
					textAlign={'center'}
					flex={1}
					textTransform={'uppercase'}
					fontWeight={'bold'}
					fontSize={10}
				>
					Activity
				</Text>
				<Text
					textAlign={'center'}
					flex={1}
					textTransform={'uppercase'}
					fontWeight={'bold'}
					fontSize={10}
				>
					Points
				</Text>
			</View>
			<ScrollView
				borderBottomRightRadius={20}
				borderBottomLeftRadius={20}
				marginBottom={20}
				backgroundColor={'#fff'}
			>
				{data.map((item, index) => (
					<View
						key={index}
						flexDirection={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						flex={1}
						width={'100%'}
						padding={10}
						borderBottomColor={'gray'}
						borderBottomWidth={1}
						paddingVertical={10}
					>
						<Text
							textAlign={'center'}
							flex={1}
							textTransform={'uppercase'}
							color={'#000'}
							fontSize={10}
						>
							{item.date}
						</Text>
						<Text
							textAlign={'center'}
							flex={1}
							textTransform={'uppercase'}
							color={'#000'}
							fontSize={10}
						>
							{item.description.substring(0, 15).concat('...')}
						</Text>
						<View
							flex={1}
							flexDirection={'row'}
							alignItems={'center'}
							justifyContent={'center'}
							fontSize={10}
						>
							<Image
								source={require('@/assets/images/Coin1.png')}
								height={20}
								width={20}
							/>
							<Text
								textAlign={'center'}
								textTransform={'uppercase'}
								color={item.type === '1' ? 'green' : 'red'}
								fontWeight={'bold'}
								fontSize={10}
							>
								{item.amount}
							</Text>
						</View>
					</View>
				))}
				{isOnHome && (
					<>
						<Text
							paddingTop={10}
							paddingBottom={20}
							textAlign='right'
							color='#000'
						>
							View more...
						</Text>

						<View
							backgroundColor={'#FFFFFF'}
							borderRadius={20}
							justifyContent={'space-between'}
							alignItems={'center'}
							flexDirection={'row'}
							padding={10}
							width={Dimensions.get('window').width * 0.9}
						>
							<View
								justifyContent={'space-between'}
								alignItems={'center'}
								flex={1}
								borderRightWidth={1}
								borderColor={'gray'}
							>
								<Text
									fontWeight={'bold'}
									textTransform={'uppercase'}
									fontSize={10}
									color={'green'}
								>
									Total Earned
								</Text>
								<View
									alignItems={'center'}
									justifyContent={'center'}
									flexDirection={'row'}
								>
									<Image
										source={require('@/assets/images/Coin1.png')}
										height={20}
										width={20}
									/>
									<Text
										color={'green'}
										fontWeight={'bold'}
										fontSize={10}
									>
										+50
									</Text>
								</View>
							</View>

							<View
								justifyContent={'space-between'}
								alignItems={'center'}
								flex={1}
								borderRightWidth={1}
								borderColor={'gray'}
								width={'90%'}
							>
								<Text
									fontWeight={'bold'}
									textTransform={'uppercase'}
									fontSize={10}
									color={'red'}
								>
									Total Redeem
								</Text>
								<View
									alignItems={'center'}
									justifyContent={'center'}
									flexDirection={'row'}
								>
									<Image
										source={require('@/assets/images/Coin1.png')}
										height={20}
										width={20}
									/>
									<Text
										color={'red'}
										fontWeight={'bold'}
										fontSize={10}
									>
										+50
									</Text>
								</View>
							</View>

							<View
								justifyContent={'space-between'}
								alignItems={'center'}
								flex={1}
							>
								<Text
									fontWeight={'bold'}
									textTransform={'uppercase'}
									fontSize={10}
									color={'#000'}
								>
									Balance
								</Text>
								<View
									alignItems={'center'}
									justifyContent={'center'}
									flexDirection={'row'}
								>
									<Image
										source={require('@/assets/images/Coin1.png')}
										height={20}
										width={20}
									/>
									<Text
										color={'green'}
										fontWeight={'bold'}
										fontSize={10}
									>
										+50
									</Text>
								</View>
							</View>
						</View>
					</>
				)}
			</ScrollView>
		</ScrollView>
	);
};

export default PointsTable;
