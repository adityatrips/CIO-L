import React, { useContext, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageTriangles from '@/components/ImageTriangles';
import { Dimensions, ToastAndroid } from 'react-native';
import {
	Button,
	Image,
	Input,
	ScrollView,
	Text,
	TextArea,
	View,
} from 'tamagui';
import { colors } from '@/constants';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Divider from '@/components/Divider';
import HeaderComp from '@/components/Header';

import amazing from '@/assets/images/amazing.png';
import good from '@/assets/images/good.png';
import okay from '@/assets/images/okay.png';
import bad from '@/assets/images/bad.png';
import terrible from '@/assets/images/terrible.png';

const ScreenFeeback = () => {
	const { id } = useLocalSearchParams();
	const [feebackRating, setFeedbackRating] = useState(5);
	const [attendNextEvent, setAttendNextEvent] = useState(true);
	const [overallFeedback, setOverallFeedback] = useState('');

	const ratingAssets = [
		{
			rating: 5,
			src: amazing,
			name: 'Amazing',
		},
		{ rating: 4, src: good, name: 'Good' },
		{ rating: 3, src: okay, name: 'Okay' },
		{ rating: 2, src: bad, name: 'Bad' },
		{
			rating: 1,
			src: terrible,
			name: 'Terrible',
		},
	];
	const yesNoAsset = [
		{ src: good, name: 'Yes', state: true },
		{ src: bad, name: 'No', state: false },
	];

	const [loading, setLoading] = useState(false);
	const [pastEvent, setPastEvent] = useState({});
	const router = useRouter();

	const submitFeedback = async () => {
		if (
			!overallFeedback ||
			attendNextEvent === null ||
			feebackRating === null
		) {
			ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
			return;
		} else {
			try {
				console.log(userToken);
				const res = await axios.post(
					`https://cioleader.azurewebsites.net/api/event/${id}/feedback/`,
					{
						Rating: feebackRating,
						NextEvent: attendNextEvent,
						Feedback: overallFeedback,
					},
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);

				if (res.status === 200) {
					setFeedbackRating(null);
					setAttendNextEvent(null);
					setOverallFeedback('');
				}
			} catch (error) {
				if (error.code === 'ERR_BAD_REQUEST') {
					ToastAndroid.show(
						'You have already given your precious feedback.',
						ToastAndroid.SHORT
					);
				}
			} finally {
				setLoading(false);
			}
			router.push({
				pathname: '/modal',
				params: { status: 'FeedbackGiven' },
			});
		}
	};

	const { userToken } = useContext(AuthContext);

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<HeaderComp title='Feedback' />
			<ImageTriangles />
			<ScrollView flex={1}>
				<View
					backgroundColor={'#fff'}
					padding={20}
				>
					<Text
						color={'#000'}
						fontWeight={'bold'}
					>
						Give feedback
					</Text>
					<Text color={'#000'}>What do you think of the editing tool?</Text>
					<View
						flexDirection={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						marginTop={10}
					>
						{ratingAssets.map((item, i) => (
							<Button
								pressStyle={{
									backgroundColor: colors.primary,
									borderColor: colors.primary,
								}}
								key={5 - i}
								width={(wW * 0.8) / 5 - 5}
								flexDirection={'column'}
								justifyContent={'center'}
								alignItems={'center'}
								borderWidth={1}
								borderRadius={10}
								backgroundColor={
									5 - i === feebackRating ? colors.primary : '#FFF'
								}
								borderColor={5 - i === feebackRating ? colors.primary : '#000'}
								onPress={() => setFeedbackRating(item.rating)}
							>
								<Image source={item.src} />
							</Button>
						))}
					</View>

					<Divider spacing={20} />

					<View>
						<Text color='#000'>Do You want to attend our next event? </Text>
						<View
							paddingVertical={10}
							alignItems={'center'}
							flexDirection={'row'}
							gap={10}
						>
							{yesNoAsset.map((item, i) => (
								<Button
									pressStyle={{
										backgroundColor: colors.primary,
										borderColor: colors.primary,
									}}
									key={i}
									width={(wW * 0.9) / 2 - 5}
									flexDirection={'column'}
									justifyContent={'center'}
									alignItems={'center'}
									borderWidth={1}
									borderRadius={10}
									backgroundColor={
										attendNextEvent === item.state ? colors.primary : '#FFF'
									}
									color={attendNextEvent === item.state ? '#FFF' : '#000'}
									borderColor={
										attendNextEvent === item.state ? colors.primary : '#000'
									}
									onPress={() => setAttendNextEvent(item.state)}
								>
									{item.name}
								</Button>
							))}
						</View>
					</View>

					<Divider spacing={20} />

					<View>
						<Text
							marginBottom={10}
							color='#000'
						>
							Any overall feedback for the event?
						</Text>
						<View>
							<TextArea
								value={overallFeedback}
								onChangeText={setOverallFeedback}
								placeholder='Let us know your overall feeback'
								borderWidth={2}
								textAlign='left'
								verticalAlign='top'
								borderColor={colors.primary}
								backgroundColor={'#FFFFFF'}
								width={'100%'}
								borderRadius={10}
								elevate
								elevation={5}
								color={'#000'}
								placeholderTextColor={'#000'}
								height={100}
							/>
						</View>
					</View>

					<Button
						backgroundColor={colors.primary}
						borderColor={colors.primary}
						pressStyle={{
							backgroundColor: colors.primary,
							borderColor: colors.primary,
						}}
						borderRadius={100 / 2}
						width={'100%'}
						elevate
						elevation={5}
						height={50}
						marginTop={20}
						onPress={submitFeedback}
					>
						Submit
					</Button>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

export default ScreenFeeback;
