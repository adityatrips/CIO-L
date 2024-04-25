import React, { useContext } from 'react';
import { Dimensions, Linking } from 'react-native';
import { Button, Image, Text, View } from 'tamagui';
import coin from '@/assets/images/Coin1.png';
import { colors } from '@/constants';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

const ResourceCard = ({ data, getFn, setIsLoading }) => {
	const { userToken } = useContext(AuthContext);
	const router = useRouter();

	return (
		<View
			backgroundColor={colors.primary}
			borderRadius={20}
			overflow='hidden'
			height={wH * 0.4}
			width={wW * 0.6}
			paddingBottom={10}
			justifyContent='space-between'
			marginRight={10}
		>
			{data.new && (
				<View
					position={'absolute'}
					backgroundColor={'#CC3340'}
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
						fontSize={8}
						fontFamily={'InterBold'}
						color={'#fff'}
						paddingBottom={7}
					>
						NEW
					</Text>
				</View>
			)}

			<Text
				position={'absolute'}
				top={10}
				left={10}
				zIndex={2}
				fontSize={11}
				color={'#fff'}
				textAlign={'center'}
				textTransform={'uppercase'}
				fontFamily={'InterBold'}
				backgroundColor={'#00000075'}
				padding={5}
			>
				{(data.name || data.title).length > 20
					? (data.name || data.title).slice(0, 17) + '...'
					: data.name || data.title}
			</Text>
			<Image
				width={'100%'}
				height={'50%'}
				borderRadius={20}
				objectFit={'cover'}
				src={{ uri: data.image }}
			/>

			<View padding={10}>
				<Text
					color={'#fff'}
					textAlign={'center'}
					fontSize={12}
					fontFamily={'InterMedium'}
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
					backgroundColor={colors.primaryDark}
					borderColor={colors.primaryDark}
					pressStyle={{
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					}}
					borderRadius={100 / 2}
					width={'85%'}
					height={30}
					justifyContent='space-between'
					onPress={async () => {
						axios
							.post(
								`https://cioleader.azurewebsites.net/api/resource/${data.id}/viewed/`,
								{},
								{
									headers: {
										Authorization: `Token ${userToken}`,
									},
								}
							)
							.then(() => {
								Linking.openURL(data.link);
							})
							.then(() => {
								getFn();
								setIsLoading(false);
							});
					}}
				>
					<Text
						fontSize={10}
						fontFamily={'InterBold'}
						textTransform='uppercase'
					>
						Read
					</Text>
					<View
						flexDirection='row'
						alignItems='center'
					>
						<Image
							src={coin}
							height={25}
							width={25}
						/>
						<Text
							fontSize={11}
							fontFamily='InterSemiBold'
						>
							+{data.viewingpoints}
						</Text>
					</View>
				</Button>
				<Button
					borderColor={colors.primary}
					pressStyle={{
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					}}
					backgroundColor={!data.viewed ? '#616161' : colors.primaryDark}
					disabled={!data.viewed}
					borderRadius={100 / 2}
					justifyContent='space-between'
					width={'85%'}
					height={30}
					onPress={() => {
						router.push(`/mcq/${data.quiz}`);
					}}
				>
					<Text
						fontSize={10}
						fontFamily={'InterBold'}
					>
						MCQ
					</Text>
					<View
						flexDirection='row'
						alignItems='center'
					>
						<Image
							src={coin}
							height={25}
							width={25}
						/>
						<Text
							fontSize={11}
							fontFamily='InterSemiBold'
						>
							+{data.quizpoints}
						</Text>
					</View>
				</Button>
			</View>
		</View>
	);
};

export default ResourceCard;
