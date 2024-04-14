import React, { useContext, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageTriangles from '../../components/ImageTriangles';
import { Dimensions } from 'react-native';
import { Button, Image, Input, ScrollView, Text, View } from 'tamagui';
import { colors } from '@/constants';
const ScreenFeeback = ({ navigation }) => {
	const [email, setEmail] = useState(null);
	const val = useContext(AuthContext);

	const [feebackRating, setFeedbackRating] = useState(0);
	const [ratingReason, setRatingReason] = useState('');
	const [satisfactionRating, setSatisfactionRating] = useState(0);
	const [attendNextEvent, setAttendNextEvent] = useState(0);
	const [additionalComments, setAdditionalComments] = useState('');
	const [overallFeedback, setOverallFeedback] = useState('');

	const ratingAssets = [
		{
			rating: 1,
			src: require('@/assets/images/terrible.png'),
			name: 'Terrible',
		},
		{ rating: 2, src: require('@/assets/images/bad.png'), name: 'Bad' },
		{ rating: 3, src: require('@/assets/images/okay.png'), name: 'Okay' },
		{ rating: 4, src: require('@/assets/images/good.png'), name: 'Good' },
		{
			rating: 5,
			src: require('@/assets/images/amazing.png'),
			name: 'Amazing',
		},
	];
	const yesNoAsset = [
		{ src: require('@/assets/images/bad.png'), name: 'No' },
		{ src: require('@/assets/images/good.png'), name: 'Yes' },
	];

	const { isLoading, lookup } = useContext(AuthContext);

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
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
						{ratingAssets.map((item) => (
							<Button
								width={(wW * 0.8) / 5 - 5}
								flexDirection={'column'}
								justifyContent={'center'}
								alignItems={'center'}
								borderWidth={1}
								borderRadius={10}
								backgroundColor={colors.primary}
							>
								<Image source={item.src} />
							</Button>
						))}
					</View>

					<View marginTop={20}>
						<Text color='#000'>What are the main reason for your rating? </Text>
						<Input
							value={ratingReason}
							onChangeText={setRatingReason}
							placeholder='Let us know the reason for your rating'
							borderWidth={2}
							borderColor={colors.primary}
							backgroundColor={'#FFFFFF'}
							width={'100%'}
							borderRadius={10}
							elevate
							elevation={5}
							color={'#000'}
							placeholderTextColor={'#000'}
							textAlign='left'
							verticalAlign='top'
							height={100}
						/>
					</View>

					<View marginTop={20}>
						<Text color='#000'>How satisfied were you with the event?*</Text>
						<View
							flexDirection={'row'}
							justifyContent={'space-between'}
							alignItems={'center'}
							marginTop={10}
						>
							<Text color='#000'>Not very</Text>
							<Text color='#000'>Very likely</Text>
						</View>
						<View
							paddingVertical={10}
							alignItems={'center'}
							justifyContent={'space-between'}
							flexDirection={'row'}
							gap={10}
						>
							{[1, 2, 3, 4, 5].map((item) => (
								<Button
									aspectRatio={1 / 1}
									height={50}
									flexDirection={'column'}
									justifyContent={'center'}
									alignItems={'center'}
									borderWidth={1}
									borderRadius={100 / 2}
									backgroundColor={colors.primary}
								>
									<Text
										color={'#FFF'}
										fontWeight={attendNextEvent === item ? 'bold' : 'normal'}
									>
										{item}
									</Text>
								</Button>
							))}
						</View>
					</View>

					<View
						backgroundColor={'gray'}
						height={5}
						borderRadius={100 / 2}
						marginVertical={30}
					></View>

					<View>
						<Text color='#000'>Do You want to attend our next event? </Text>
						<View
							paddingVertical={10}
							alignItems={'center'}
							flexDirection={'row'}
							gap={10}
						>
							{yesNoAsset.map((item) => (
								<Button
									width={(wW * 0.9) / 2 - 5}
									flexDirection={'column'}
									justifyContent={'center'}
									alignItems={'center'}
									borderWidth={1}
									borderRadius={10}
									backgroundColor={colors.primary}
								>
									{item.name}
								</Button>
							))}
						</View>
					</View>

					<View
						backgroundColor={'gray'}
						height={5}
						borderRadius={100 / 2}
						marginVertical={30}
					></View>

					<View marginTop={20}>
						<Text color='#000'>
							Any additional comments regarding the sessions or overall agenda?
						</Text>
						<View>
							<Input
								value={additionalComments}
								onChangeText={setAdditionalComments}
								placeholder='Let us know any additional comments'
								verticalAlign='top'
								textAlign='left'
								borderWidth={2}
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

					<View
						backgroundColor={'gray'}
						height={5}
						borderRadius={100 / 2}
						marginVertical={30}
					></View>

					<View marginTop={20}>
						<Text color='#000'>Any overall feedback for the event?</Text>
						<View>
							<Input
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
						borderRadius={100 / 2}
						width={'100%'}
						elevate
						elevation={5}
						height={50}
						marginTop={20}
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
