import React, { useContext, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	Checkbox,
	RadioGroup,
	Button,
	Image,
} from 'tamagui';
import { Dimensions, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants';
import { AuthContext } from '@/context/AuthContext';
import LoadingComp from '@/components/Loading';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import triangle from '@/assets/images/triangle.png';

const MCQScreen = () => {
	const [quiz, setQuiz] = React.useState([]);
	const [quizName, setQuizName] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const { userToken } = useContext(AuthContext);
	const { mcq } = useLocalSearchParams();
	const router = useRouter();
	const [quizAnswers, setQuizAnswers] = React.useState(['', '', '', '', '']);

	const getQuiz = async () => {
		try {
			const res = await axios.get(
				`https://cioleader.azurewebsites.net/api/quiz/${mcq}`,
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);

			if (quiz.name !== '') {
				setQuizName(res.data.name);

				for (let i = 1; i <= 5; i++) {
					const question = res.data[`question${i}`];
					const points = res.data[`question${i}points`];
					const options = [];

					options.push(res.data[`option1_${i}`]);
					options.push(res.data[`option2_${i}`]);
					options.push(res.data[`option3_${i}`]);
					options.push(res.data[`option4_${i}`]);

					setQuiz((prev) => [...prev, { question, points, options }]);
				}
			}
		} catch (error) {
			console.log(JSON.stringify(error));
		} finally {
			setLoading(false);
		}
	};

	const submitQuiz = async () => {
		setLoading(true);
		console.log(userToken);
		try {
			const res = await axios.post(
				`https://cioleader.azurewebsites.net/api/quiz/${mcq}/submit/`,
				{
					answer1: Number(quizAnswers[0] + 1).toString(),
					answer2: Number(quizAnswers[1] + 1).toString(),
					answer3: Number(quizAnswers[2] + 1).toString(),
					answer4: Number(quizAnswers[3] + 1).toString(),
					answer5: Number(quizAnswers[4] + 1).toString(),
				},
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);

			router.push({
				pathname: '/modal',
				params: {
					status: 'UserGotMarks',
					marksData: {
						points: res.data.Points,
						correct: res.data.Correct,
						message: res.data.message,
					},
				},
			});
		} catch (error) {
			if (error.code === 'ERR_BAD_REQUEST') {
				router.push({
					pathname: '/modal',
					params: {
						status: 'UserSubmittedTheQuiz',
					},
				});
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		getQuiz();
	}, []);

	return loading ? (
		<LoadingComp />
	) : (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<Header title='Quiz' />
			<ScrollView flex={1}>
				<Text
					fontSize={20}
					fontFamily={'InterBold'}
					color='#616161'
					paddingLeft={'5%'}
					paddingTop={'5%'}
				>
					{quizName}
				</Text>
				<View
					backgroundColor={colors.primary}
					marginVertical={10}
					paddingVertical={10}
				>
					<Text
						fontSize={12.5}
						fontFamily={'InterSemiBold'}
						textAlign='center'
						color='#fff'
					>
						YOU WILL GET {quiz[0].points} POINTS FOR EACH CORRECT ANSWER
					</Text>
				</View>

				<View
					alignSelf='center'
					width={'90%'}
				>
					{quiz.map((ques, idx) => (
						<RadioGroup
							defaultValue={null}
							key={idx}
							gap={5}
							style={{
								width: '100%',
							}}
							accentColor={colors.primary}
							onValueChange={(value) => {
								console.log(value);
								const [q, a] = value.split('_');
								switch (q) {
									case '0':
										setQuizAnswers((prev) => {
											prev[0] = a.toString();
											return prev;
										});
										break;
									case '1':
										setQuizAnswers((prev) => {
											prev[1] = a.toString();
											return prev;
										});
										break;
									case '2':
										setQuizAnswers((prev) => {
											prev[2] = a.toString();
											return prev;
										});
										break;
									case '3':
										setQuizAnswers((prev) => {
											prev[3] = a.toString();
											return prev;
										});
										break;
									case '4':
										setQuizAnswers((prev) => {
											prev[4] = a.toString();
											return prev;
										});
										break;
									default:
										break;
								}
							}}
						>
							<View gap={10}>
								<Text
									fontSize={13}
									fontFamily={'InterMedium'}
									color='#616161'
								>
									{ques.question}
								</Text>
								{ques.options.map((opt, i) => (
									<RadioGroup.Item
										key={i}
										flexDirection='row'
										gap={10}
										alignItems='center'
										paddingHorizontal={20}
										paddingVertical={20}
										borderRadius={4}
										borderColor={'#AEAEAE'}
										borderWidth={2}
										value={`${idx}_${i}`}
										backgroundColor={'#fff'}
										style={{
											width: '100%',
										}}
										pressStyle={{
											backgroundColor: colors.primary,
										}}
									>
										<View
											flexDirection='row'
											gap={10}
											alignItems='center'
										>
											<View
												position='relative'
												width={30}
												height={30}
												// backgroundColor={'#000'}
												borderRadius={100 / 2}
												alignItems='center'
												justifyContent='center'
												borderColor={colors.primary}
												borderWidth={2}
											>
												<RadioGroup.Indicator
													backgroundColor={colors.primary}
													circular
													width={20}
													height={20}
													borderColor={colors.primary}
													borderWidth={2}
												/>
											</View>
											<Text
												position='absolute'
												color='#000'
												height={20}
												left={'15%'}
												width={'75%'}
											>
												{opt}
											</Text>
										</View>
									</RadioGroup.Item>
								))}
								{idx !== quiz.length - 1 && <Divider />}
							</View>
						</RadioGroup>
					))}
					<Button
						backgroundColor={colors.primary}
						borderColor={colors.primary}
						pressStyle={{
							backgroundColor: colors.primary,
							borderColor: colors.primary,
						}}
						borderRadius={100 / 2}
						height={50}
						width={wW * 0.7}
						alignSelf='center'
						fontSize={10}
						fontFamily={'InterBold'}
						marginBottom={150}
						marginTop={20}
						onPress={submitQuiz}
					>
						<Text
							fontSize={14}
							fontFamily={'InterBold'}
							textTransform='uppercase'
						>
							Submit
						</Text>
					</Button>
					<Image
						source={{
							uri: triangle,
						}}
						width={wW}
						height={wH * 0.3}
						position='absolute'
						bottom={-100}
						left={0}
						resizeMode='cover'
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MCQScreen;

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;
