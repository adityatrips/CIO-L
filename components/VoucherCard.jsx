import React, { useContext } from 'react';
import { Dimensions, ToastAndroid, TouchableOpacity } from 'react-native';
import { Image, Text, Button, View } from 'tamagui';
import amazon from '@/assets/images/amazon.png';
import flipkart from '@/assets/images/flipkart.png';
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
			borderColor={'lightgrey'}
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
				borderColor={'lightgrey'}
				borderRadius={10}
				source={{
					uri: data.image,
				}}
			/>
			<Text
				fontSize={13}
				fontFamily={'InterMedium'}
				color='#616161'
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
				borderColor={'lightgrey'}
				paddingHorizontal={15}
			>
				<TouchableOpacity
					borderWidth={1}
					borderRightColor={'lightgrey'}
					height={'100%'}
					paddingRight={10}
					alignItems={'center'}
					justifyContent={'center'}
					onPress={() => {
						if (quantity > 0) setQuantity(quantity - 1);
					}}
				>
					<Text
						color='#616161'
						fontWeight={'bold'}
					>
						-
					</Text>
				</TouchableOpacity>
				<Text
					color='#616161'
					fontFamily={'InterBold'}
				>
					{quantity}
				</Text>
				<TouchableOpacity
					borderWidth={1}
					borderLeftColor={'lightgrey'}
					height={'100%'}
					paddingLeft={10}
					alignItems={'center'}
					justifyContent={'center'}
					onPress={() => setQuantity(quantity + 1)}
				>
					<Text
						color='#616161'
						fontWeight={'bold'}
					>
						+
					</Text>
				</TouchableOpacity>
			</View>

			<View
				flexDirection={'row'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<Image
					source={require('@/assets/images/Coin1.png')}
					height={30}
					width={30}
				/>
				<Text
					fontFamily={'InterBold'}
					color='#616161'
				>
					{data.points + ' Points'}
				</Text>
			</View>
			<Button
				backgroundColor={colors.primary}
				borderColor={colors.primary}
				pressStyle={{
					backgroundColor: colors.primaryDark,
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
									refid: data.refid,
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
