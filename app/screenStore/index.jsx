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
import { FlexGrid, ResponsiveGrid } from 'react-native-flexible-grid';

const ScreenStore = ({ navigation }) => {
	const { userToken } = useContext(AuthContext);
	const [vouchers, setVouchers] = useState([]);
	const [loading, setLoading] = useState(true);

	const getVouchers = async () => {
		setLoading(true);
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
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getVouchers();
	}, []);

	return (
		<SafeAreaView
			edges={['top', 'left', 'right']}
			style={{ flex: 1 }}
		>
			<Header title='Store' />

			{loading && vouchers.length > 0 ? (
				<LoadingComp small />
			) : (
				<View flex={1}>
					<ResponsiveGrid
						keyExtractor={(item) => item.id.toString()}
						maxItemsPerColumn={2}
						itemUnitHeight={wH * 0.4}
						data={vouchers}
						renderItem={({ item, index }) => {
							return (
								<View
									padding={5}
									key={index}
									flex={1}
								>
									<VoucherCard
										key={index}
										data={item}
									/>
								</View>
							);
						}}
						showScrollIndicator={false}
						style={{ flex: 1 }}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

const wW = Dimensions.get('window').width;
const wH = Dimensions.get('window').height;

export default ScreenStore;
