import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, ScrollView } from 'tamagui';
import { AuthContext } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';
import PointsTable from '@/components/PointsTable';

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

export default function TabTwoScreen() {
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
			console.log(error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getPoints();
	}, []);

	return !isLoading ? (
		<LinearGradient
			colors={['#6EBA43', '#019348']}
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
		<LinearGradient
			colors={['#6EBA43', '#019348']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<ActivityIndicator
				size='large'
				color='#fff'
			/>
		</LinearGradient>
	);
}
