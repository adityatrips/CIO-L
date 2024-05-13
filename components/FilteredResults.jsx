import React, { useContext, useEffect, useState } from 'react';
import { Button, View } from 'tamagui';
import UpcomingEventCard from './UpcomingEventCard';
import SelectDropdown from 'react-native-select-dropdown';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { Text } from 'tamagui';
import { ChevronDown } from '@tamagui/lucide-icons';
import { colors } from '@/constants';
import LoadingComp from './Loading';

const FilteredResults = () => {
	const { userToken } = useContext(AuthContext);
	const [regions, setRegions] = useState([]);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filteredMode, setFilteredMode] = useState(-1);
	const [filteredRegion, setFilteredRegion] = useState(-1);

	const getLink = (reg, mod) => {
		if (reg === -1 && mod === -1) {
			return `https://cioleader.azurewebsites.net/api/event/all/`;
		} else if (reg === -1 || mod === -1) {
			if (reg === -1) {
				return `https://cioleader.azurewebsites.net/api/event/all/?type=${mod}`;
			} else {
				return `https://cioleader.azurewebsites.net/api/event/all/?region=${reg}`;
			}
		} else {
			return `https://cioleader.azurewebsites.net/api/event/all/?region=${reg}&type=${mod}`;
		}
	};

	const getResource = async (reg = filteredRegion, mod = filteredMode) => {
		setLoading(true);
		console.log(getLink(reg, mod));
		try {
			const res = await axios.get(getLink(reg, mod), {
				headers: {
					Authorization: `Token ${userToken}`,
				},
			});
			setData(res.data);
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	const eventType = [
		{ id: -1, name: 'MODE' },
		{ id: 2, name: 'Online' },
		{ id: 1, name: 'Offline' },
		{ id: 3, name: 'Hybrid' },
	];

	useEffect(() => {
		getResource(-1, -1);
		(async () => {
			try {
				const res = await axios.get(
					`https://cioleader.azurewebsites.net/api/regions/all/`,
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);

				setRegions([{ id: -1, name: 'REGION' }, ...res.data]);
			} catch (error) {}
		})();
	}, []);

	const regionRef = React.createRef();
	const modeRef = React.createRef();

	return (
		<View>
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
			>
				<SelectDropdown
					ref={regionRef}
					data={regions}
					onSelect={(selectedItem, index) => {
						setFilteredRegion(selectedItem.id);
					}}
					defaultValueByIndex={-1}
					renderButton={(item) => {
						return (
							<View>
								<View
									marginBottom={10}
									backgroundColor={'#fff'}
									borderColor='#616161'
									borderWidth={1}
									borderRadius={100 / 2}
									width={Dimensions.get('screen').width * 0.425}
									flexDirection={'row'}
									alignItems={'center'}
									justifyContent={'space-between'}
									paddingHorizontal={20}
									height={30}
								>
									<Text color='#616161'>{(item && item.name) || 'REGION'}</Text>
									<ChevronDown color='#616161' />
								</View>
							</View>
						);
					}}
					renderItem={(item) => {
						return (
							<View
								justifyContent={'center'}
								alignItems='center'
								width={Dimensions.get('screen').width * 0.9}
								backgroundColor={'#fff'}
								borderWidth={1}
								borderColor='#616161'
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
						width: Dimensions.get('screen').width * 0.425,
						borderRadius: 30,
						borderWidth: 1,
						borderColor: '#616161',
						position: 'absolute',
						left: 0,
					}}
					dropdownOverlayColor='rgba(0,0,0,0.2)'
					showsVerticalScrollIndicator={false}
				/>
				<SelectDropdown
					data={eventType}
					onSelect={(selectedItem, index) => {
						setFilteredMode(selectedItem.id);
					}}
					ref={modeRef}
					defaultValueByIndex={-1}
					renderButton={(selectedItem) => {
						return (
							<View>
								<View
									marginBottom={10}
									backgroundColor={'#fff'}
									borderColor='#616161'
									borderWidth={1}
									borderRadius={100 / 2}
									width={Dimensions.get('screen').width * 0.425}
									flexDirection={'row'}
									alignItems={'center'}
									justifyContent={'space-between'}
									paddingHorizontal={20}
									height={30}
								>
									<Text color='#616161'>
										{(selectedItem && selectedItem.name) || 'MODE'}
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
								backgroundColor={'#fff'}
								borderWidth={1}
								borderColor='#616161'
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
						width: Dimensions.get('screen').width * 0.425,
						borderRadius: 30,
						borderWidth: 1,
						borderColor: '#616161',
						position: 'absolute',
						left: 0,
					}}
					dropdownOverlayColor='rgba(0,0,0,0.2)'
					showsVerticalScrollIndicator={false}
				/>
			</View>
			<View
				flexDirection='row'
				alignItems='stretch'
				justifyContent='space-between'
				marginBottom={10}
			>
				<Button
					backgroundColor={colors.primary}
					pressStyle={{
						backgroundColor: colors.primaryDark,
						borderColor: colors.primary,
					}}
					borderRadius={100000 / 2}
					w={'47.5%'}
					onPress={() => getResource()}
				>
					<Text>Filter</Text>
				</Button>
				<Button
					onPress={() => {
						setLoading(true);
						regionRef.current.reset();
						modeRef.current.reset();
						setFilteredMode(-1);
						setFilteredRegion(-1);
						getResource(-1, -1).then(() => {
							setLoading(false);
						});
					}}
					backgroundColor={colors.primary}
					pressStyle={{
						backgroundColor: colors.primaryDark,
						borderColor: colors.primary,
					}}
					borderRadius={100000 / 2}
					w={'47.5%'}
				>
					Clear
				</Button>
			</View>

			{loading ? (
				<LoadingComp small />
			) : (
				<View gap={10}>
					{data.map((evt, i) => (
						<UpcomingEventCard
							key={i}
							data={evt}
						/>
					))}
				</View>
			)}
		</View>
	);
};

export default FilteredResults;
