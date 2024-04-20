import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Button } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import ImageTriangles from '@/components/ImageTriangles';
import { colors } from '@/constants';
import { AuthContext } from '@/context/AuthContext';
import LoadingComp from '@/components/Loading';
import { useLocalSearchParams } from 'expo-router';

const demoQuiz = [
	{
		text: 'What is the capital of France?',
		fillColor: colors.primary,
		unfillColor: colors.primaryDark,
		textStyle: {
			textDecorationLine: 'none',
		},
		options: [
			{
				id: '0',
				text: 'New York',
			},
			{
				id: '1',
				text: 'London',
			},
			{
				id: '2',
				text: 'Paris',
			},
			{
				id: '3',
				text: 'Dublin',
			},
		],
	},
	{
		text: 'Who is CEO of Tesla?',
		fillColor: colors.primary,
		unfillColor: colors.primaryDark,
		textStyle: {
			textDecorationLine: 'none',
		},
		options: [
			{
				id: '0',
				text: 'Jeff Bezos',
			},
			{
				id: '1',
				text: 'Elon Musk',
			},
			{
				id: '2',
				text: 'Bill Gates',
			},
			{
				id: '3',
				text: 'Tony Stark',
			},
		],
	},
	{
		text: 'The iPhone was created by which company?',
		fillColor: colors.primary,
		unfillColor: colors.primaryDark,
		textStyle: {
			textDecorationLine: 'none',
		},
		options: [
			{
				id: '0',
				text: 'Apple',
			},
			{
				id: '1',
				text: 'Intel',
			},
			{
				id: '2',
				text: 'Amazon',
			},
			{
				id: '3',
				text: 'Microsoft',
			},
		],
	},
	{
		text: 'How many Harry Potter books are there?',
		fillColor: colors.primary,
		unfillColor: colors.primaryDark,
		textStyle: {
			textDecorationLine: 'none',
		},
		options: [
			{
				id: '0',
				text: '1',
			},
			{
				id: '1',
				text: '4',
			},
			{
				id: '2',
				text: '6',
			},
			{
				id: '3',
				text: '7',
			},
		],
	},
];

const MCQScreen = () => {
	const [event, setEvent] = React.useState({});
	const [loading, setLoading] = React.useState(true);
	const { userToken } = useContext(AuthContext);
	const { mcq } = useLocalSearchParams();

	const getEvent = async () => {
		try {
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/event/past/all',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setEvent(res.data.filter((e) => e.id === mcq));
		} catch (error) {
			ToastAndroid.show('Error fetching event', ToastAndroid.SHORT);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getEvent();
	}, []);

	return loading && event != {} ? (
		<LoadingComp />
	) : (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<ImageTriangles />
			<ScrollView flex={1}>
				<LinearGradient
					colors={[colors.primary, colors.primaryDark]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={{ flex: 1 }}
				>
					<View
						flex={1}
						backgroundColor={'#fff'}
						paddingBottom={20}
						alignSelf='center'
						paddingHorizontal={20}
						alignItems='center'
					>
						<Text
							fontSize={20}
							fontWeight={'bold'}
							padding={20}
							color={'#000'}
						>
							{event.name}
						</Text>

						<View
							backgroundColor={colors.primary}
							width={wW}
							padding={10}
						>
							<Text
								fontSize={12.5}
								color={'#fff'}
								textTransform={'uppercase'}
								textAlign={'center'}
								fontWeight={'bold'}
							>
								You will get 50 points for each correct answer
							</Text>
						</View>

						<View paddingTop={20}>
							{demoQuiz.map((quiz, index) => (
								<View
									key={index}
									marginBottom={20}
								>
									<Text
										fontSize={16}
										color={'#000'}
									>
										{quiz.text}
									</Text>

									<View marginTop={10}>
										<BouncyCheckboxGroup
											data={quiz.options}
											checkboxProps={{
												fillColor: quiz.fillColor,
												text: quiz.text,
												textStyle: {
													color: '#000',
													textDecorationLine: 'none',
												},
												size: 25,
												unFillColor: quiz.unfillColor,
											}}
											style={{
												flexDirection: 'column',
												gap: 10,
												color: '#000',
											}}
										/>
									</View>
								</View>
							))}
						</View>

						<Button
							width={wW * 0.9}
							marginBottom='30'
							bgColor={colors.primary}
						>
							Submit
						</Button>
					</View>
				</LinearGradient>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MCQScreen;

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;
