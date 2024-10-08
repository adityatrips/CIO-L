import React, { useContext } from 'react';
import { Image, Text, View } from 'tamagui';
import { colors } from '@/constants';
import { Dimensions, Linking } from 'react-native';
import play from '@/assets/images/play.png';
import podcastAudio from '@/assets/images/podcastAudio.png';
import podcastIcon from '@/assets/images/podcastIcon.png';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import coin from '@/assets/images/Coin1.png';

const { width, height } = Dimensions.get('window');

let wW = width;
let wH = height;

const PodcastCard = ({ data, getFn, setIsLoading }) => {
	const { userToken } = useContext(AuthContext);

	return (
		<View
			backgroundColor={'#515151'}
			borderRadius={20}
			overflow='hidden'
			height={wH * 0.2}
			width={wW * 0.75}
			paddingBottom={10}
			justifyContent='space-between'
			alignItems='center'
			marginRight={10}
			padding={10}
			elevationAndroid={2}
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
			<View
				flexDirection='row'
				gap={20}
				width={'100%'}
				justifyContent='flex-start'
				alignItems='center'
			>
				<Image
					source={podcastIcon}
					width={50}
					height={50}
				/>
				<View>
					<Text
						fontSize={16}
						fontFamily={'InterSemiBold'}
					>
						{data.title}
					</Text>
					<Text
						fontSize={9}
						fontFamily={'InterSemiBold'}
					>
						{data.host}
					</Text>
				</View>
			</View>
			<Image
				source={podcastAudio}
				resizeMode='contain'
				width={'75%'}
				height={'30%'}
			/>
			<View
				position='absolute'
				bottom={0}
				right={0}
				backgroundColor={'#ffffff50'}
				paddingHorizontal={10}
				paddingVertical={5}
				borderTopLeftRadius={10}
			>
				<View
					flexDirection='row'
					gap={5}
					alignItems='center'
				>
					<Image
						source={coin}
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
			</View>
			<Image
				source={play}
				onPress={async () => {
					axios
						.post(
							`https://cioleader.azurewebsites.net/api/podcast/${data.id}/viewed/`,
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
				resizeMode='contain'
				width={'40%'}
				height={'40%'}
			/>
		</View>
	);
};

export default PodcastCard;
