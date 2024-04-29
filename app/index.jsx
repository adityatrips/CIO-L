import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, Text, View } from 'tamagui';
import { ChevronRight, Key } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import ImageTriangles from '@/components/ImageTriangles';
import logo from '@/assets/images/Logo_White.png';
import { Dimensions } from 'react-native';
import { colors } from '@/constants';
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Component = () => {
	const { height, width } = Dimensions.get('screen');

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
			<StatusBar style='light' />
			<ImageTriangles />
			<KeyboardAvoidingView>
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
							width={width * 0.75}
							height={height * 0.1}
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
							Explore the world by watching{'\n'}and creating live broadcasts
						</Text>
						<Button
							backgroundColor={colors.primary}
							borderColor={colors.primary}
							pressStyle={{
								backgroundColor: colors.primary,
								borderColor: colors.primary,
							}}
							borderRadius={100 / 2}
							width={'55%'}
							elevate
							elevation={5}
							height={50}
							onPress={() => {
								router.push('/screenLogin');
							}}
							marginBottom={'30%'}
							fontSize={14}
							fontFamily={'InterMedium'}
						>
							NEXT
							<ChevronRight size='$2' />
						</Button>
						<Text
							fontSize={12}
							textAlign='center'
						>
							By signing up you agree to our{'\n'}ToS, Privacy Policy and Cookie
							Policy
						</Text>
					</View>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</LinearGradient>
	);
};

export default Component;
