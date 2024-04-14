import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, Button, View } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import ImageTriangles from '@/components/ImageTriangles';
import logo from '@/assets/images/Logo_White.png';
import { Dimensions } from 'react-native';
import { colors } from '@/constants';

const Component = () => {
	const router = useRouter();

	return (
		<LinearGradient
			colors={[colors.primary, colors.primaryDark]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-around',
			}}
		>
			<ImageTriangles />
			<SafeAreaView
				style={{
					flex: 1,
				}}
			>
				<View
					gap={20}
					height={Dimensions.get('window').height}
					width={Dimensions.get('window').width * 0.9}
					alignItems={'center'}
					justifyContent={'center'}
				>
					<Image
						source={logo}
						maxWidth={'100%'}
						height={'10%'}
						resizeMode='contain'
						padding={0}
						margin={0}
						marginTop={'40%'}
						marginBottom={'20%'}
					/>
					<Text
						textAlign='center'
						textTransform='uppercase'
						fontSize={14}
						marginBottom={'30%'}
					>
						Explore the world by watching and creating live broadcasts
					</Text>
					<Button
						iconAfter={<ChevronRight size='$1.5' />}
						backgroundColor={colors.primary}
						borderColor={colors.primary}
						pressStyle={{
							backgroundColor: colors.primaryDark,
							borderColor: colors.primary,
						}}
						borderRadius={100 / 2}
						width={'100%'}
						elevate
						elevation={5}
						height={50}
						onPress={() => {
							router.push('/screenLogin');
						}}
						marginBottom={'30%'}
					>
						NEXT
					</Button>
					<Text textAlign='center'>
						By signing up you agree to our ToS, Privacy Policy and Cookie Policy
					</Text>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
};

export default Component;
