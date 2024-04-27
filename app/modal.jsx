import { Button, Image, Text, View } from 'tamagui';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import hourglass from '@/assets/images/hourglass.png';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { Dimensions, ImageBackground } from 'react-native';
import oops from '@/assets/images/oops.png';
import gift from '@/assets/images/gift.png';
import done from '@/assets/images/done.png';
import ImageTriangles from '@/components/ImageTriangles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from '@tamagui/lucide-icons';

export default function Modal() {
	const { status } = useLocalSearchParams();
	const navigation = useNavigation();

	if (status === 'UserSubmittedTheQuiz') {
		return (
			<View
				flex={1}
				alignItems={'center'}
				justifyContent={'center'}
				backgroundColor={'#fff'}
			>
				<X
					color={'#000'}
					size='$3'
					position='absolute'
					top={50}
					right={20}
					onPress={() => router.push('/(authUser)/home')}
				/>
				<ImageTriangles
					bottom={-75}
					height='120%'
				/>
				<Image
					source={logo}
					resizeMode='contain'
					width={Dimensions.get('window').width * 0.75}
					height={Dimensions.get('window').height * 0.15}
				/>
				<Image
					marginTop={-40}
					source={oops}
					resizeMode='contain'
					width={Dimensions.get('window').width}
					height={Dimensions.get('window').height * 0.3}
				/>
				<Text
					fontSize={17}
					fontFamily={'InterBold'}
					color='#000'
				>
					The quiz has already been submitted!
				</Text>
				<StatusBar style='light' />
			</View>
		);
	} else if (status === 'ApprovalPending') {
		return (
			<View
				flex={1}
				alignItems={'center'}
				justifyContent={'center'}
				backgroundColor={'#fff'}
				onLayout={() => {
					setTimeout(() => {
						router.push('/');
					}, 10000);
				}}
			>
				<Image
					source={logo}
					resizeMode='contain'
					width={Dimensions.get('window').width * 0.75}
					height={Dimensions.get('window').height * 0.15}
				/>
				<Image
					width={Dimensions.get('window').width * 0.6}
					height={Dimensions.get('window').height * 0.3}
					resizeMode='contain'
					source={hourglass}
					marginVertical={20}
				/>
				<Text
					fontSize={17}
					fontFamily={'InterBold'}
					color='#000'
				>
					Approval Pending, please wait.
				</Text>
				<Text color='#000'>Redirecting to login page in 10 seconds.</Text>
				<StatusBar style='light' />
			</View>
		);
	} else if (status === 'UserGotMarks') {
		const { points, correct, message } = useLocalSearchParams();
		return points > 0 ? (
			<SafeAreaView
				style={{
					alignItems: 'center',
					justifyContent: 'flex-start',
					backgroundColor: '#fff',
					flex: 1,
				}}
			>
				<X
					color={'#000'}
					size='$3'
					position='absolute'
					top={50}
					right={20}
					onPress={() => router.push('/(authUser)/home')}
				/>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ImageTriangles
						bottom={-75}
						height='120%'
					/>
					<Image
						source={logo}
						resizeMode='contain'
						width={Dimensions.get('window').width * 0.75}
						height={Dimensions.get('window').height * 0.15}
					/>
					<Text
						fontSize={29}
						fontFamily={'InterBold'}
						color='#444'
					>
						Congratulations!
					</Text>
					<Text
						fontSize={17}
						fontFamily={'InterMedium'}
						color='#444'
					>
						You Have Earned
					</Text>
					<View position='relative'>
						<Image
							source={gift}
							marginLeft={'-2%'}
							marginVertical={20}
							resizeMode='contain'
							width={Dimensions.get('window').width * 0.7}
							height={Dimensions.get('window').height * 0.3}
						/>
						<Text
							position='absolute'
							bottom={0}
							fontSize={42}
							width={Dimensions.get('window').width * 0.7}
							textAlign='center'
							fontFamily={'InterBold'}
							color='#444'
						>
							{points}
						</Text>
					</View>
					<Text
						fontSize={16}
						fontFamily={'InterMedium'}
						color='#444'
					>
						Loyalty Points
					</Text>
					<Text
						fontSize={16}
						fontFamily={'InterMedium'}
						color='#444'
					>
						For {correct} correct answers
					</Text>
					<StatusBar style='light' />
				</View>
			</SafeAreaView>
		) : (
			<View
				onLayout={() => {
					setTimeout(() => {
						router.push('/(authUser)/home');
					}, 2000);
				}}
				flex={1}
				alignItems={'center'}
				justifyContent={'center'}
				backgroundColor={'#fff'}
			>
				<ImageTriangles
					bottom={-75}
					height='120%'
				/>
				<Image
					source={logo}
					resizeMode='contain'
					width={Dimensions.get('window').width * 0.75}
					height={Dimensions.get('window').height * 0.15}
				/>
				<Image
					marginTop={-40}
					source={oops}
					resizeMode='contain'
					width={Dimensions.get('window').width}
					height={Dimensions.get('window').height * 0.3}
				/>
				<Text
					fontSize={17}
					fontFamily={'InterBold'}
					color='#000'
				>
					You didn't any answers correct
				</Text>
				<Text
					textAlign='center'
					color='#000'
				>
					Better Luck Next Time
				</Text>
				<StatusBar style='light' />
			</View>
		);
	} else if (status === 'eventRegistrationSuccess') {
		const { point } = useLocalSearchParams();
		return (
			<SafeAreaView
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#fff',
					flex: 1,
				}}
			>
				<X
					color={'#000'}
					size='$3'
					position='absolute'
					top={50}
					right={20}
					onPress={() => navigation.goBack()}
				/>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
					}}
				>
					<ImageTriangles
						bottom={-75}
						height='120%'
					/>
					<Image
						source={logo}
						resizeMode='contain'
						width={Dimensions.get('window').width * 0.75}
						height={Dimensions.get('window').height * 0.15}
						marginBottom={'10%'}
						marginTop={50}
					/>
					<Text
						fontSize={29}
						fontFamily={'InterBold'}
						color='#444'
					>
						Congratulations!
					</Text>
					<Text
						fontSize={17}
						fontFamily={'InterMedium'}
						color='#444'
					>
						You Have Earned
					</Text>
					<View position='relative'>
						<Image
							source={gift}
							marginLeft={'-2%'}
							marginVertical={20}
							resizeMode='contain'
							width={Dimensions.get('window').width * 0.7}
							height={Dimensions.get('window').height * 0.3}
						/>
						<Text
							position='absolute'
							bottom={0}
							fontSize={42}
							width={Dimensions.get('window').width * 0.7}
							textAlign='center'
							fontFamily={'InterBold'}
							color='#444'
						>
							{point}
						</Text>
					</View>
					<Text
						fontSize={16}
						fontFamily={'InterMedium'}
						color='#444'
					>
						Loyalty Points
					</Text>
					<Text
						fontSize={16}
						fontFamily={'InterMedium'}
						color='#444'
					>
						For successful event registration
					</Text>
					<StatusBar style='light' />
				</View>
			</SafeAreaView>
		);
	} else if (status === 'PointsRedeemed') {
		const { refid } = useLocalSearchParams();

		return (
			<SafeAreaView
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#fff',
					flex: 1,
				}}
			>
				<X
					color={'#000'}
					size='$3'
					position='absolute'
					top={50}
					right={20}
					onPress={() => navigation.goBack()}
				/>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
					}}
				>
					<ImageTriangles
						bottom={-75}
						height='120%'
					/>
					<Image
						source={logo}
						resizeMode='contain'
						width={Dimensions.get('window').width * 0.75}
						height={Dimensions.get('window').height * 0.15}
						marginTop={50}
					/>
					<Image
						source={done}
						marginVertical={20}
						resizeMode='contain'
						marginLeft={30}
						width={Dimensions.get('window').width * 0.6}
						height={Dimensions.get('window').height * 0.3}
					/>
					<Text
						fontSize={16}
						fontFamily={'InterMedium'}
						color='#444'
					>
						Your voucher is under processing
					</Text>
					<Text
						fontSize={16}
						color='#444'
						marginTop={20}
						paddingHorizontal={20}
						paddingVertical={10}
						borderWidth={1}
						borderColor='#616161'
						borderRadius={7.5}
						fontFamily={'InterBold'}
					>
						REF ID: {refid}
					</Text>
					<StatusBar style='light' />
				</View>
			</SafeAreaView>
		);
	} else if (status === 'FeedbackGiven') {
		return (
			<SafeAreaView
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#fff',
					flex: 1,
				}}
			>
				<X
					color={'#000'}
					size='$3'
					position='absolute'
					top={50}
					right={20}
					onPress={() => router.push('/pro')}
				/>
				<View
					onLayout={() => {
						setTimeout(() => {
							router.push('/(authUser)/home');
						}, 10000);
					}}
					style={{
						flex: 1,
						alignItems: 'center',
					}}
				>
					<ImageTriangles
						bottom={-75}
						height='120%'
					/>
					<Image
						source={logo}
						resizeMode='contain'
						width={Dimensions.get('window').width * 0.75}
						height={Dimensions.get('window').height * 0.15}
						marginBottom={'10%'}
						marginTop={50}
					/>
					<Text
						fontSize={29}
						fontFamily={'InterBold'}
						color='#444'
					>
						Congratulations!
					</Text>
					<Text
						fontSize={17}
						fontFamily={'InterMedium'}
						color='#444'
					>
						You Have Earned
					</Text>
					<View position='relative'>
						<Image
							source={gift}
							marginLeft={'-2%'}
							marginVertical={20}
							resizeMode='contain'
							width={Dimensions.get('window').width * 0.7}
							height={Dimensions.get('window').height * 0.3}
						/>
						<Text
							position='absolute'
							bottom={0}
							fontSize={42}
							width={Dimensions.get('window').width * 0.7}
							textAlign='center'
							fontFamily={'InterBold'}
							color='#444'
						>
							10
						</Text>
					</View>
					<Text
						fontSize={16}
						fontFamily={'InterMedium'}
						color='#444'
					>
						Loyalty Points
					</Text>
					<Text
						fontSize={16}
						fontFamily={'InterMedium'}
						color='#444'
					>
						For giving us feedback.
					</Text>
					<StatusBar style='light' />
				</View>
			</SafeAreaView>
		);
	} else if (status === 'UserRegistrationSuccess') {
		return (
			<SafeAreaView
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#fff',
					flex: 1,
					width: Dimensions.get('window').width,
				}}
			>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
					}}
					onLayout={() => {
						setTimeout(() => {
							router.push('/screenLogin');
						}, 10000);
					}}
				>
					<ImageTriangles
						bottom={-75}
						height='120%'
					/>
					<Image
						source={logo}
						resizeMode='contain'
						width={Dimensions.get('window').width * 0.75}
						height={Dimensions.get('window').height * 0.15}
						marginBottom={'5%'}
						marginTop={50}
					/>
					<Text
						fontSize={29}
						fontFamily={'InterBold'}
						color='#444'
					>
						Congratulations!
					</Text>
					<Text
						fontSize={17}
						fontFamily={'InterMedium'}
						color='#444'
					>
						You Have Earned
					</Text>
					<View position='relative'>
						<Image
							source={gift}
							marginLeft={'-2%'}
							marginVertical={20}
							resizeMode='contain'
							width={Dimensions.get('window').width * 0.7}
							height={Dimensions.get('window').height * 0.3}
						/>
						<Text
							position='absolute'
							bottom={0}
							fontSize={42}
							width={Dimensions.get('window').width * 0.7}
							textAlign='center'
							fontFamily={'InterBold'}
							color='#444'
						>
							100
						</Text>
					</View>
					<Text
						fontSize={16}
						fontFamily={'InterMedium'}
						color='#444'
						width={Dimensions.get('window').width}
						textAlign='center'
					>
						Loyalty Points
					</Text>
					<Text
						fontSize={16}
						fontFamily={'InterMedium'}
						color='#444'
						width={Dimensions.get('window').width}
						textAlign='center'
					>
						For successful registration
					</Text>
					<Text
						fontSize={16}
						fontFamily={'InterBold'}
						color='#444'
						width={Dimensions.get('window').width}
						textAlign='center'
						paddingVertical={10}
					>
						Redirecting to login page in 10 seconds.
					</Text>
					<StatusBar style='light' />
				</View>
			</SafeAreaView>
		);
	}
}
