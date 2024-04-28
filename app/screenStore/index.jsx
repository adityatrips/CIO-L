import React, { useContext, useEffect, useState } from 'react';
import { View, Button, Image, Text, ScrollView } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '@/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import VoucherCard from '../../components/VoucherCard';
import { Dimensions } from 'react-native';
import coin from '@/assets/images/Coin1.png';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { colors } from '@/constants';
import axios from 'axios';
import LoadingComp from '@/components/Loading';
import Header from '@/components/Header';

const ScreenStore = ({ navigation }) => {
	const { userToken } = useContext(AuthContext);
	const [vouchers, setVouchers] = useState([]);
	const [loading, setLoading] = useState(true);

	const getVouchers = async () => {
		try {
			const response = await axios.get(
				'https://cioleader.azurewebsites.net/api/voucher/all',
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
			setVouchers(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setLoading(true);
		getVouchers();
		setLoading(false);
	}, []);

	return loading ? (
		<LoadingComp />
	) : (
		<SafeAreaView
			edges={['top', 'left', 'right']}
			style={{ flex: 1 }}
		>
			<Header title='Store' />

			<ScrollView
				flex={0.7}
				marginTop={10}
				alignSelf='center'
			>
				<View
					backgroundColor={'#FFF'}
					width={wW - 20}
					marginHorizontal={10}
					justifyContent={'space-between'}
					flexDirection={'row'}
					flexWrap={'wrap'}
					gap={10}
				>
					{vouchers.map((v, idx) => (
						<VoucherCard data={v} />
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

export default ScreenStore;
