import React, { useContext } from 'react';
import { Dimensions, ToastAndroid, TouchableOpacity } from 'react-native';
import { Image, Text, Button, View, ButtonFrame } from 'tamagui';
import coin from '@/assets/images/Coin1.png';
import { colors } from '@/constants';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

const VoucherCard = ({ data }) => {
	const [quantity, setQuantity] = React.useState(0);
	const { userToken } = useContext(AuthContext);
	const router = useRouter();

	return (
		<View
			width={wW * 0.5 - 20}
			borderColor={'#515151'}
			borderWidth={1}
			height={wH * 0.385}
			marginBottom={10}
			borderRadius={20}
			alignItems={'center'}
			justifyContent='space-between'
			padding={20}
			gap={5}
		>
			<Image
				width={'90%'}
				aspectRatio={4 / 3}
				height={wH * 0.125}
				resizeMode='contain'
				borderColor={'#515151'}
				borderRadius={10}
				source={{
					uri: data.image,
				}}
			/>
			<Text
				fontSize={13}
				fontFamily={'InterMedium'}
				color='#515151'
			>
				{data.name}
			</Text>
			<Text
				color='#000'
				fontWeight={'bold'}
				fontSize={17}
			>
				{`Worth ${data.worth} INR`}
			</Text>

			<View
				flexDirection={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				height={'15%'}
				width={'100%'}
				borderRadius={20}
				borderWidth={1}
				borderColor={'#515151'}
			>
				<Button
					backgroundColor={'#fff'}
					borderWidth={1}
					borderRightColor={'#515151'}
					borderRadius={100 / 2}
					height={'100%'}
					alignItems={'center'}
					justifyContent={'center'}
					pressStyle={{
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					}}
					onPress={() => {
						if (quantity > 0) setQuantity(quantity - 1);
					}}
				>
					<Text
						color='#515151'
						fontWeight={'bold'}
					>
						-
					</Text>
				</Button>
				<Text
					color='#515151'
					fontFamily={'InterBold'}
				>
					{quantity}
				</Text>
				<Button
					borderWidth={1}
					borderLeftColor={'#515151'}
					height={'100%'}
					backgroundColor={'#fff'}
					borderRadius={100 / 2}
					alignItems={'center'}
					justifyContent={'center'}
					onPress={() => setQuantity(quantity + 1)}
					pressStyle={{
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					}}
				>
					<Text
						color='#515151'
						fontWeight={'bold'}
					>
						+
					</Text>
				</Button>
			</View>

			<View
				flexDirection={'row'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<Image
					source={coin}
					height={30}
					width={30}
				/>
				<Text
					fontFamily={'InterBold'}
					color='#515151'
				>
					{data.points + ' Points'}
				</Text>
			</View>
			<Button
				backgroundColor={colors.primary}
				borderColor={colors.primary}
				pressStyle={{
					backgroundColor: colors.primary,
					borderColor: colors.primary,
				}}
				width={wW * 0.4}
				borderRadius={100 / 2}
				height={30}
				fontSize={10}
				fontFamily={'InterBold'}
				onPress={async () => {
					console.log(userToken);
					try {
						const res = await axios.post(
							'https://cioleader.azurewebsites.net/api/voucher/redeem/',
							{
								voucher: Number(data.id),
								quantity: Number(quantity),
							},
							{
								headers: {
									Authorization: `Token ${userToken}`,
								},
							}
						);

						if (res.status === 200) {
							router.push({
								pathname: '/modal',
								params: {
									status: 'PointsRedeemed',
									refid: res.data.refid,
								},
							});
						}
					} catch (error) {
						if (error.code === 'ERR_BAD_REQUEST') {
							ToastAndroid.show('Not enough points', ToastAndroid.SHORT);
						}
					}
				}}
			>
				<Text
					fontFamily={'InterBold'}
					textTransform='uppercase'
				>
					Redeem
				</Text>
			</Button>
		</View>
	);
};

export default VoucherCard;
