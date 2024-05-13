import { Image, ScrollView, Text, Input, View, Button } from 'tamagui';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackHandler, Dimensions } from 'react-native';
import AnkitPic from '@/assets/images/Ankit.png';
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
import Toast from 'react-native-root-toast';

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
			Toast.show('Error fetching industries', {
				duration: Toast.durations.SHORT,
			});
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
			Toast.show('Error fetching industries', {
				duration: Toast.durations.SHORT,
			});
			vibrateHeavy();
		}
	};

	const getMemberDetails = async () => {
		setLoading(true);
		try {
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/member/',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			getComapnySize();
			getIndustries();
			setMemberDetails(res.data);
			setImage(res.data.profilepicture);
			setFname(res.data.fname);
			setLname(res.data.lname);
			setMobile(res.data.mobile);
			setEmail(res.data.email);
			setCompany(res.data.company);
			setDesignation(res.data.designation);

			setSelectedCompanySize(res.data.companysize - 1);
			setSelectedIndustry(res.data.industry - 1);
		} catch (error) {
			Toast.show('Error fetching data', {
				duration: Toast.durations.SHORT,
			});
			vibrateHeavy();
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
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
						industry: selectedIndustry + 1,
						companysize: selectedCompanySize + 1,
					},
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);

				Toast.show('Profile updated successfully', {
					duration: Toast.durations.SHORT,
				});
				vibrateHeavy();
				router.push('/(authUser)/pro');
			}
		} catch (error) {
			if (error === 'Please fill all the fields') {
				vibrateHeavy();
				Toast.show('Please fill all the fields', {
					duration: Toast.durations.SHORT,
				});
				vibrateHeavy();
			} else {
				Toast.show('Error updating profile', {
					duration: Toast.durations.SHORT,
				});
				vibrateHeavy();
			}
		}
	};

	const navigation = useNavigation();

	useEffect(() => {
		getMemberDetails();

		BackHandler.addEventListener('hardwareBackPress', () => {
			navigation.goBack();
			return true;
		});

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', () => {
				navigation.goBack();
				return true;
			});
		};
	}, []);

	return loading ? (
		<LoadingComp />
	) : (
		<SafeAreaView
			flex={1}
			width={wW}
			backgroundColor={'#fff'}
		>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				alignSelf='center'
			>
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
												Toast.show('Image updated successfully', {
													duration: Toast.durations.SHORT,
												});
												vibrateHeavy();
											})
											.catch((err) => {
												Toast.show('Error updating image', {
													duration: Toast.durations.SHORT,
												});
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
										Toast.show('Image updated successfully', {
											duration: Toast.durations.SHORT,
										});
										vibrateHeavy();
										setImage(ankit);
									} catch (error) {
										Toast.show('Error updating image', {
											duration: Toast.durations.SHORT,
										});
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
						defaultValueByIndex={selectedCompanySize}
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
						defaultValueByIndex={selectedCompanySize}
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
