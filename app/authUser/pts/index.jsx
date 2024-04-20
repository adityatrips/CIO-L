import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Dimensions, ToastAndroid } from 'react-native';
import { View, Text, Image, ScrollView } from 'tamagui';
import { AuthContext } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import PointsTable from '@/components/PointsTable';
import { colors } from '@/constants';
import LoadingComp from '../../../components/Loading';
import logo from '@/assets/images/Logo_GreenBlack.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowBigLeft, ChevronLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import HeaderComp from '@/components/Header';

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

export default function PointsScreen() {
	const { userToken } = useContext(AuthContext);

	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const getPoints = async () => {
		try {
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/transactions/all?offset=0&limit=10',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setData(res.data);
		} catch (error) {
			ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
		}
	};

	const router = useRouter();

	useEffect(() => {
		setIsLoading(true);
		getPoints();
		setIsLoading(false);
	}, []);

	return !isLoading ? (
		<SafeAreaView>
			<HeaderComp />
			<LinearGradient
				colors={[colors.primary, colors.primaryDark]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingHorizontal: Dimensions.get('window').width * 0.05,
					height: Dimensions.get('window').height,
				}}
			>
				<View>
					{data.results && data.results.length > 0 ? (
						<View paddingHorizontal={20}>
							<Text
								color={'#FFF'}
								fontSize={16}
								fontFamily={'InterBold'}
								width={'100%'}
							>
								CIO&Leader Loyalty Point History
							</Text>
							<PointsTable
								userToken={userToken}
								info={data}
							/>
						</View>
					) : (
						<View
							flexShrink={1}
							justifyContent={'center'}
							alignItems={'center'}
							paddingHorizontal={20}
							height={wH * 0.9}
						>
							<Text>
								No data available. Please check back later or contact support.
							</Text>
						</View>
					)}
				</View>
			</LinearGradient>
		</SafeAreaView>
	) : (
		<LoadingComp />
	);
}
