import {
	Image,
	ScrollView,
	Text,
	Input,
	View,
	Button,
	XStack,
	Label,
} from 'tamagui';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackHandler, Dimensions, ToastAndroid, Vibration } from 'react-native';
import ankit from '@/assets/images/Ankit.png';
import { colors, vibrateHeavy } from '@/constants';
import Header from '@/components/Header';
import SelectDropdown from 'react-native-select-dropdown';
import { ChevronDown } from '@tamagui/lucide-icons';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';
import { useNavigation, useRouter } from 'expo-router';
import triangle from '@/assets/images/triangle.png';
import LoadingComp from '@/components/Loading';
import { launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('screen');
const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

const ScreenEditProfile = () => {
	const [industries, setIndustries] = React.useState([]);
	const [companySizes, setCompanySizes] = React.useState([]);

	const [selectedIndustry, setSelectedIndustry] = React.useState(null);
	const [selectedCompanySize, setSelectedCompanySize] = React.useState(null);

	const [image, setImage] = React.useState(null);
	const [fname, setFname] = React.useState('');
	const [lname, setLname] = React.useState('');
	const [mobile, setMobile] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [company, setCompany] = React.useState('');
	const [designation, setDesignation] = React.useState('');
	const [memberDetails, setMemberDetails] = React.useState({});
	const [loading, setLoading] = React.useState(true);

	const { userToken } = useContext(AuthContext);

	const router = useRouter();

	const getIndustries = async () => {
		try {
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/industry/all',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setIndustries(res.data);
		} catch (error) {
			ToastAndroid.show('Error fetching industries', ToastAndroid.SHORT);
			vibrateHeavy();
		}
	};

	const getComapnySize = async () => {
		try {
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/companysize/all',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setCompanySizes(res.data);
		} catch (error) {
			ToastAndroid.show('Error fetching industries', ToastAndroid.SHORT);
			vibrateHeavy();
		}
	};

	const getMemberDetails = async () => {
		try {
			setLoading(true);
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/member/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setMemberDetails(res.data);
			getComapnySize();
			getIndustries();

			setImage(res.data.profilepicture);
			setFname(res.data.fname);
			setLname(res.data.lname);
			setMobile(res.data.mobile);
			setEmail(res.data.email);
			setCompany(res.data.company);
			setDesignation(res.data.designation);
		} catch (error) {
			ToastAndroid.show('Error fetching industries', ToastAndroid.SHORT);
			vibrateHeavy();
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = async () => {
		try {
			if (
				fname === '' ||
				lname === '' ||
				mobile === '' ||
				email === '' ||
				company === '' ||
				designation === '' ||
				(selectedIndustry === '') === null ||
				selectedCompanySize === null
			) {
				throw 'Please fill all the fields';
			} else {
				await axios.put(
					'https://cioleader.azurewebsites.net/api/member/edit/',
					{
						fname: fname,
						lname: lname,
						mobile: mobile,
						email: email,
						designation: designation,
						company: company,
						industry: selectedIndustry.toString(),
						companysize: selectedCompanySize.toString(),
					},
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);

				ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);
				vibrateHeavy();
				router.push('/(authUser)/pro');
			}
		} catch (error) {
			if (error === 'Please fill all the fields') {
				vibrateHeavy();
				ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
				vibrateHeavy();
			} else {
				ToastAndroid.show('Error updating profile', ToastAndroid.SHORT);
				vibrateHeavy();
			}
		}
	};

	const getData = async () => {
		getMemberDetails();
	};

	const navigation = useNavigation();

	useEffect(() => {
		getData();

		BackHandler.addEventListener('hardwareBackPress', () => {
			navigation.goBack();
		});
	}, []);

	return loading ? (
		<LoadingComp />
	) : (
		<SafeAreaView
			flex={1}
			width={wW}
			backgroundColor={'#fff'}
		>
			<ScrollView alignSelf='center'>
				<Header />
				<View
					flex={1}
					justifyContent={'start'}
					alignItems={'stretch'}
					alignSelf={'center'}
					paddingTop={20}
					width={wW * 0.9}
					gap={20}
				>
					<Text
						color='#000'
						fontSize={30}
						fontWeight={'semibold'}
						textAlign={'center'}
						textTransform={'uppercase'}
					>
						EDIT PROFILE
					</Text>
					<Text
						color='#000'
						textTransform='uppercase'
						textAlign='center'
						fontSize={14}
						marginTop={-20}
					>
						Update your details
					</Text>
					<View
						flexDirection={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<View
							borderRadius={18}
							overflow={'hidden'}
						>
							<Image
								source={{ uri: image || AnkitPic }}
								width={Dimensions.get('screen').height * 0.2}
								aspeectRatio={1}
								height={Dimensions.get('screen').height * 0.2}
							/>
						</View>
						<View
							flexDirection={'column'}
							justifyContent={'center'}
							alignItems={'center'}
							gap={5}
						>
							<Button
								onPress={() => {}}
								backgroundColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primaryDark,
									borderColor: '#fff',
								}}
								width={Dimensions.get('screen').width * 0.45}
								borderRadius={100 / 2}
							>
								<Text
									fontSize={14}
									fontFamily={'InterMedium'}
									textTransform='uppercase'
									onPress={async () => {
										const formdata = new FormData();
										const res = await launchImageLibrary({
											mediaType: 'photo',
										});

										formdata.append('profilepicture', {
											uri: res.assets[0].uri,
											name: res.assets[0].fileName,
											type: res.assets[0].type,
										});
										setImage(res.assets[0].uri);
										await axios
											.post(
												'https://cioleader.azurewebsites.net/api/member/image/update/',
												formdata,
												{
													headers: {
														'Content-Type': 'multipart/form-data',
														Authorization: `Token ${userToken}`,
													},
												}
											)
											.then((res) => {
												ToastAndroid.show(
													'Image updated successfully',
													ToastAndroid.SHORT
												);
												vibrateHeavy();
											})
											.catch((err) => {
												ToastAndroid.show(
													'Error updating image',
													ToastAndroid.SHORT
												);
												vibrateHeavy();
											});
									}}
								>
									change image
								</Text>
							</Button>
							<Button
								backgroundColor={colors.primary}
								pressStyle={{
									backgroundColor: colors.primaryDark,
									borderColor: '#fff',
								}}
								width={Dimensions.get('screen').width * 0.45}
								borderRadius={100 / 2}
								onPress={async () => {
									try {
										await axios.post(
											'https://cioleader.azurewebsites.net/api/member/image/remove/',
											{},
											{
												headers: {
													Authorization: `Token ${userToken}`,
												},
											}
										);
										ToastAndroid.show(
											'Image updated successfully',
											ToastAndroid.SHORT
										);
										vibrateHeavy();
										setImage(ankit);
									} catch (error) {
										ToastAndroid.show(
											'Error updating image',
											ToastAndroid.SHORT
										);
										vibrateHeavy();
									}
								}}
							>
								<Text
									fontSize={14}
									fontFamily={'InterMedium'}
									textTransform='uppercase'
								>
									remove image
								</Text>
							</Button>
						</View>
					</View>

					<Input
						value={fname}
						onChangeText={setFname}
						width={Dimensions.get('screen').width * 0.9}
						color='#616161'
						borderRadius={100 / 2}
						borderColor='#00000050'
						borderWidth={1}
						placeholderTextColor={'#616161'}
						fontFamily={'InterMedium'}
						fontSize={14}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						placeholder='FIRST NAME'
					/>
					<Input
						value={lname}
						onChangeText={setLname}
						width={Dimensions.get('screen').width * 0.9}
						color='#616161'
						borderRadius={100 / 2}
						borderColor='#00000050'
						borderWidth={1}
						placeholderTextColor={'#616161'}
						fontFamily={'InterMedium'}
						fontSize={14}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						placeholder='LAST NAME'
					/>
					<Input
						value={mobile}
						onChangeText={setMobile}
						width={Dimensions.get('screen').width * 0.9}
						color='#616161'
						borderRadius={100 / 2}
						borderColor='#00000050'
						borderWidth={1}
						placeholder='MOBILE NUMBER'
						placeholderTextColor={'#616161'}
						fontFamily={'InterMedium'}
						fontSize={14}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
						flex={0.85}
						borderLeftWidth={1}
					/>
					<Input
						value={email}
						onChangeText={setEmail}
						width={Dimensions.get('screen').width * 0.9}
						color='#616161'
						borderRadius={100 / 2}
						borderColor='#00000050'
						borderWidth={1}
						placeholder='BUSINESS EMAIL'
						placeholderTextColor={'#616161'}
						fontFamily={'InterMedium'}
						fontSize={14}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
					/>
					<Input
						value={company}
						onChangeText={setCompany}
						width={Dimensions.get('screen').width * 0.9}
						color='#616161'
						borderRadius={100 / 2}
						borderColor='#00000050'
						borderWidth={1}
						placeholder='COMPANY'
						placeholderTextColor={'#616161'}
						fontFamily={'InterMedium'}
						fontSize={14}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
					/>
					<Input
						value={designation}
						onChangeText={setDesignation}
						width={Dimensions.get('screen').width * 0.9}
						color='#616161'
						borderRadius={100 / 2}
						borderColor='#00000050'
						borderWidth={1}
						placeholder='DESIGNATION'
						placeholderTextColor={'#616161'}
						fontFamily={'InterMedium'}
						fontSize={14}
						textAlign='left'
						backgroundColor={'#fff'}
						paddingHorizontal={20}
						height={50}
					/>
					<SelectDropdown
						data={industries}
						onSelect={(selectedItem, index) => {
							setSelectedIndustry(selectedItem.id);
						}}
						renderButton={(selectedItem, isOpened) => {
							return (
								<View>
									<View
										backgroundColor={'#fff'}
										borderColor='#00000050'
										borderWidth={1}
										borderRadius={100 / 2}
										width={Dimensions.get('screen').width * 0.9}
										flexDirection={'row'}
										alignItems={'center'}
										justifyContent={'space-between'}
										paddingHorizontal={20}
										height={50}
									>
										<Text color='#616161'>
											{(selectedItem && selectedItem.name) || 'INDUSTRY'}
										</Text>
										<ChevronDown color='#616161' />
									</View>
								</View>
							);
						}}
						renderItem={(item, index, isSelected) => {
							return (
								<View
									justifyContent={'center'}
									alignItems='center'
									width={Dimensions.get('screen').width * 0.9}
									backgroundColor={'#fff'}
								>
									<Text
										paddingVertical={10}
										paddingHorizontal={20}
										color={'#616161'}
										borderBottomColor={'#616161'}
										borderBottomWidth={1}
									>
										{item.name}
									</Text>
								</View>
							);
						}}
						dropdownStyle={{
							width: Dimensions.get('screen').width * 0.9,
							borderRadius: 30,
							borderWidth: 1,
							borderColor: '#00000050',
						}}
						dropdownOverlayColor='rgba(0,0,0,0.2)'
						showsVerticalScrollIndicator={false}
					/>

					<SelectDropdown
						data={companySizes}
						onSelect={(selectedItem, index) => {
							setSelectedCompanySize(selectedItem.id);
						}}
						renderButton={(selectedItem, isOpened) => {
							return (
								<View>
									<View
										backgroundColor={'#fff'}
										borderColor='#00000050'
										borderWidth={1}
										borderRadius={100 / 2}
										width={Dimensions.get('screen').width * 0.9}
										flexDirection={'row'}
										alignItems={'center'}
										justifyContent={'space-between'}
										paddingHorizontal={20}
										height={50}
									>
										<Text color='#616161'>
											{(selectedItem && selectedItem.name) || 'COMPANY SIZE'}
										</Text>
										<ChevronDown color='#616161' />
									</View>
								</View>
							);
						}}
						renderItem={(item, index, isSelected) => {
							return (
								<View
									justifyContent={'center'}
									alignItems='center'
									width={Dimensions.get('screen').width * 0.9}
									backgroundColor={'#fff'}
								>
									<Text
										paddingVertical={10}
										paddingHorizontal={20}
										color={'#616161'}
										borderBottomColor={'#616161'}
										borderBottomWidth={1}
									>
										{item.name}
									</Text>
								</View>
							);
						}}
						dropdownStyle={{
							width: Dimensions.get('screen').width * 0.9,
							borderRadius: 30,
							borderWidth: 1,
							borderColor: '#00000050',
						}}
						dropdownOverlayColor='rgba(0,0,0,0.2)'
						showsVerticalScrollIndicator={false}
					/>

					<Button
						image
						reward={'+50'}
						backgroundColor={colors.primary}
						onPress={handleEdit}
						pressStyle={{
							backgroundColor: colors.primaryDark,
							borderColor: '#fff',
						}}
						borderRadius={100 / 2}
						marginBottom={20}
					>
						<Text
							fontSize={14}
							fontFamily={'InterBold'}
						>
							UPDATE
						</Text>
					</Button>
					<Image
						source={triangle}
						marginTop={-120}
						left={-Dimensions.get('screen').width * 0.1}
						width={width * 1.1}
						bottom={-100}
						height={height * 0.35}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ScreenEditProfile;
