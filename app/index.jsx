import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, Button, View } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import ImageTriangles from '@/components/ImageTriangles';
import logo from '@/assets/images/Logo_White.png';
import { Dimensions } from 'react-native';

const Component = () => {
	const router = useRouter();

	return (
		<LinearGradient
			colors={['#6EBA43', '#019348']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<ImageTriangles />
			<SafeAreaView
				style={{
					width: '75%',
					alignItems: 'center',
				}}
			>
				<View
					height={'100%'}
					alignItems='center'
					justifyContent='center'
					gap={20}
				>
					<Image
						source={logo}
						maxWidth={'90%'}
						height={'10%'}
						resizeMode='contain'
					/>
					<Text
						textAlign='center'
						textTransform='uppercase'
						fontSize={14}
					>
						Explore the world by watching {'\n'} and creating live broadcasts
					</Text>
					<Button
						iconAfter={<ChevronRight size='$1.5' />}
						fontSize={14}
						backgroundColor={'#8DC63F'}
						borderRadius={100 / 2}
						width={Dimensions.get('window').width * 0.55}
						elevate
						elevation={5}
						height={50}
						onPress={() => {
							router.push('/screenLogin');
						}}
					>
						NEXT
					</Button>
					<Text
						position='absolute'
						bottom={30}
						textAlign='center'
						fontSize={12}
					>
						By signing up you agree to our {'\n'} ToS, Privacy Policy and Cookie Policy
					</Text>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
};

export default Component;
