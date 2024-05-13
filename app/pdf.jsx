import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import Pdf from 'react-native-pdf';
import { Text, View } from 'tamagui';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '@/components/Loading';
import { BackHandler } from 'react-native';

const PdfScreen = () => {
	const { uri } = useLocalSearchParams();
	const [loading, setLoading] = React.useState(true);
	const router = useRouter();

	useEffect(() => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 1000);

		BackHandler.addEventListener('hardwareBackPress', () => {
			router.push('/home');
			return true;
		});

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', () => {
				return true;
			});
		};
	}, []);

	return loading ? (
		<Loading />
	) : (
		<SafeAreaView
			flex={1}
			justifyContent='center'
			alignItems='center'
		>
			<Header />
			<Pdf
				renderActivityIndicator={(progress) => {
					return (
						<View
							height={'100%'}
							width={'100%'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<Text color='#000'>
								Your document is loading ({Number(progress).toFixed(2)}%)...
							</Text>
						</View>
					);
				}}
				trustAllCerts={true}
				source={{
					uri,
				}}
				style={{
					flex: 1,
					width: '100%',
					height: '100%',
				}}
			/>
		</SafeAreaView>
	);
};

export default PdfScreen;
