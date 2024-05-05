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

const FilteredResults = ({
	setFilteredRegion,
	setFilteredMode,
	regions,
	filteredMode,
	filteredRegion,
}) => {
	const [allEvts, setAllEvts] = useState([]);
	const { userToken } = useContext(AuthContext);

	const getResource = async (reg = filteredRegion, typ = filteredMode) => {
		try {
			const res = await axios.get(
				noFilter
					? `https://cioleader.azurewebsites.net/api/event/all/`
					: `https://cioleader.azurewebsites.net/api/event/all/?region=${reg}&type=${typ}`,
				{
					headers: {
						Authorization: `Token ${userToken}`,
					},
				}
			);
		} catch (error) {}
	};

	const eventType = [
		{ id: 1, name: 'Online' },
		{ id: 2, name: 'Offline' },
		{ id: 3, name: 'Hybrid' },
	];

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get(
					`https://cioleader.azurewebsites.net/api/event/all/`,
					{
						headers: {
							Authorization: `Token ${userToken}`,
						},
					}
				);

				setAllEvts([]);
				setAllEvts(res.data);
			} catch (error) {}
		})();
	}, []);

	return (
		<View>
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
			>
				<SelectDropdown
					data={regions}
					onSelect={(selectedItem, index) => {
						setFilteredRegion(selectedItem.id);
					}}
					defaultValueByIndex={filteredRegion}
					renderButton={(selectedItem, isOpened) => {
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
										{(selectedItem && selectedItem.name) || 'REGION'}
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
					defaultValueByIndex={filteredMode}
					renderButton={(selectedItem, isOpened) => {
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
						getResource(null, null);
						setFilteredMode(0);
						setFilteredRegion(0);
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

			<View gap={10}>
				{allEvts.map((evt, i) => (
					<UpcomingEventCard
						key={i}
						data={evt}
					/>
				))}
			</View>
		</View>
	);
};

export default FilteredResults;
