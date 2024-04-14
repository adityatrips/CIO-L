import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, ScrollView } from 'tamagui';
import { AuthContext } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import PointsTable from '@/components/PointsTable';
import { colors } from '@/constants';
import LoadingComp from '../../../components/Loading';

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

export default function PointsScreen() {
	const { userToken, userInfo, loading, error, login, lookupUser, toggleAuth } =
		useContext(AuthContext);

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getPoints = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(
				'https://cioleader.azurewebsites.net/api/transactions/all?offset=0&limit=4',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setData(res.data.results);
			console.log(res.data.results);
		} catch (error) {
			console.log('PointsScreen::getPoints::error:: ', error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		setIsLoading(true);
		getPoints();
		setIsLoading(false);
	}, []);

	return !isLoading ? (
		<LinearGradient
			colors={[colors.primary, colors.primaryDark]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingHorizontal: Dimensions.get('window').width * 0.05,
			}}
		>
			<View>
				<Text
					color={'#FFF'}
					fontSize={16}
					fontWeight={'bold'}
					marginVertical={'2%'}
					width={'100%'}
				>
					CIO&Leader Loyalty
				</Text>

				<PointsTable data={data} />
			</View>
		</LinearGradient>
	) : (
		<LoadingComp />
	);
}
