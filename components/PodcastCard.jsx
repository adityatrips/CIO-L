import React, { useContext } from 'react';
import { Image, Text, View } from 'tamagui';
import { colors } from '@/constants';
import { Dimensions, Linking } from 'react-native';
import play from '@/assets/images/play.png';
import podcastAudio from '@/assets/images/podcastAudio.png';
import podcastIcon from '@/assets/images/podcastIcon.png';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';

const { width, height } = Dimensions.get('window');

let wW = width;
let wH = height;

const PodcastCard = ({ data }) => {
	const { userToken } = useContext(AuthContext);

	return (
		<View
			backgroundColor={'#616161'}
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
					source={{
						uri: podcastIcon,
					}}
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
				source={{
					uri: podcastAudio,
				}}
				resizeMode='contain'
				width={'75%'}
				height={'30%'}
			/>
			<Image
				source={{
					uri: play,
				}}
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
