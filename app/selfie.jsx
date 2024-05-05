import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'tamagui';
import { launchCamera } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '@/components/Header';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Share from 'react-native-share';
import { BackHandler, Dimensions } from 'react-native';
import { colors } from '@/constants';

const ShareSelfie = () => {
	const [selfie, setSelfie] = useState(null);
	const { event } = useLocalSearchParams();
	const router = useRouter();

	const getSelfie = async () => {
		const response = await launchCamera({
			mediaType: 'photo',
			cameraType: 'front',
		});
		setSelfie(response.assets[0]);
	};

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', () => {
			router.push('/pro');
			return true;
		});

		return () => {
			BackHandler.removeEventListener('hardwareBackPress');
		};
	}, []);

	const share = async () => {
		try {
			await Share.shareSingle({
				message: 'Hello, check it out',
				url: selfie.uri,
				filename: selfie.fileName,
				social: Share.Social.LINKEDIN,
				type: selfie.type,
			});
		} catch (error) {
			console.error(JSON.stringify(error));
		}
	};

	return (
		<SafeAreaView>
			<HeaderComp />
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					padding: Dimensions.get('window').width * 0.05,
					gap: 20,
				}}
			>
				{selfie !== null ? (
					<>
						<View
							borderRadius={20}
							overflow='hidden'
						>
							<Image
								source={{
									uri: selfie.uri,
								}}
								width={Dimensions.get('window').width * 0.9}
								height={Dimensions.get('window').width * 0.9}
							/>
						</View>
						<View
							flexDirection='row'
							justifyContent='space-between'
							alignItems='center'
							gap={10}
						>
							<Button
								backgroundColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primaryDark,
									borderColor: colors.primary,
								}}
								onPress={share}
								borderRadius={100000 / 2}
								width={'50%'}
							>
								<Text
									fontFamily='InterBold'
									fontSize={14}
									textTransform='uppercase'
								>
									Share
								</Text>
							</Button>
							<Button
								backgroundColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primaryDark,
									borderColor: colors.primary,
								}}
								onPress={getSelfie}
								borderRadius={100000 / 2}
								width={'50%'}
							>
								<Text
									fontFamily='InterBold'
									fontSize={14}
									textTransform='uppercase'
								>
									REtake
								</Text>
							</Button>
						</View>
					</>
				) : (
					<Button
						backgroundColor={colors.primary}
						pressStyle={{
							backgroundColor: colors.primaryDark,
							borderColor: colors.primary,
						}}
						borderRadius={100000 / 2}
						width={'50%'}
						textProps={{
							textTransform: 'uppercase',
							fontFamily: 'InterBold',
							fontSize: 14,
						}}
						onPress={getSelfie}
					>
						<Text
							fontFamily='InterBold'
							fontSize={14}
							textTransform='uppercase'
						>
							Take a selfie
						</Text>
					</Button>
				)}
			</View>
		</SafeAreaView>
	);
};

export default ShareSelfie;
