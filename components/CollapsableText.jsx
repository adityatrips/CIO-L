import React, { useState } from 'react';
import { Text } from 'tamagui';

const CollapsibleText = ({ text }) => {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<Text
			color='#616161'
			onPress={() => setCollapsed(!collapsed)}
		>
			{text.length > 40 && collapsed ? `${text.substring(0, 40)}...` : text}
		</Text>
	);
};

export default CollapsibleText;
