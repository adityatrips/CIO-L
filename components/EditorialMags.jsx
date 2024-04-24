import React, { useContext } from 'react';
import { Dimensions, Linking } from 'react-native';
import { Button, Image, Text, View } from 'tamagui';
import { colors } from '@/constants';
import coin from '@/assets/images/Coin1.png';
import { downloadAndOpenPdf } from '@/constants';
import { useRouter } from 'expo-router';
const { width, height } = Dimensions.get('window');
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';

let wW = width;
let wH = height;

const EditorialMags = ({ data, getFn, setIsLoading }) => {
	const { userToken } = useContext(AuthContext);

	const router = useRouter();
	return (
		<View
			backgroundColor={'#F6F6F6'}
			borderRadius={20}
			overflow='hidden'
			height={wH * 0.2}
			width={wW * 0.75}
			paddingBottom={10}
			flexDirection='row'
			justifyContent='flex-start'
			alignItems='center'
			marginRight={10}
			padding={10}
			elevationAndroid={2}
			marginVertical={10}
		>
			{data.new && (
				<View
					position={'absolute'}
					backgroundColor={'#CC3340'}
					alignItems={'center'}
					justifyContent={'flex-end'}
					height={60}
					width={60}
					zIndex={2}
					right={-30}
					top={-30}
					transform={'rotate(45deg)'}
				>
					<Text
						fontSize={8}
						fontFamily={'InterBold'}
						color={'#fff'}
						paddingBottom={5}
					>
						NEW
					</Text>
				</View>
			)}
			<Image
				source={{
					uri: data.picture,
				}}
				height={'100%'}
				width={'40%'}
			/>
			<View
				paddingHorizontal={10}
				justifyContent='space-around'
				height={'95%'}
				width={'65%'}
			>
				<Text
					textAlign='center'
					fontFamily={'InterBold'}
					fontSize={23}
					color={'#616161'}
				>
					{data.magzine === '1' ? 'IT NEXT' : 'CIO&Leader'}
				</Text>
				<Text
					textAlign='center'
					fontSize={12}
					color={'#616161'}
					marginTop={-25}
				>
					{data.edition}
				</Text>
				<Button
					backgroundColor={colors.primary}
					borderColor={colors.primary}
					pressStyle={{
						backgroundColor: colors.primary,
						borderColor: colors.primary,
					}}
					borderRadius={100 / 2}
					height={30}
					fontSize={10}
					alignItems='center'
					justifyContent='space-between'
					fontFamily={'InterBold'}
					onPress={async () => {
						axios
							.post(
								`https://cioleader.azurewebsites.net/api/editorial/${data.id}/viewed/`,
								null,
								{
									headers: {
										Authorization: `Token ${userToken}`,
									},
								}
							)
							.then(() => {
								router.push({
									pathname: '/pdf',
									params: {
										uri: data.file,
									},
								});
							})
							.then(() => {
								getFn();
								setIsLoading(false);
							});
					}}
				>
					<Text
						fontFamily={'InterBold'}
						fontSize={10}
						textTransform='uppercase'
					>
						Open
					</Text>
					<View
						flexDirection='row'
						gap={5}
						alignItems='center'
					>
						<Image
							source={{
								uri: coin,
							}}
							width={25}
							height={25}
						/>
						<Text
							fontFamily={'InterBold'}
							fontSize={11}
						>
							+{data.viewingpoints}
						</Text>
					</View>
				</Button>
			</View>
		</View>
	);
};

export default EditorialMags;
