import React from 'react';

import { ActionButton as Button, Icons } from './styles';

interface Props {
	text: string;
	iconName: string;
	onPress: () => void;
}

const ActionButton: React.FC<Props> = ({ text, iconName, onPress }: Props) => {
	return (
		<Button
			icon={() => <Icons name={iconName} size={22} />}
			onPress={onPress}
		>
			{text}
		</Button>
	);
};

export default ActionButton;
