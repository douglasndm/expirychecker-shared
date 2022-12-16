import React from 'react';
import { ViewStyle } from 'react-native';

import { Button, ButtonText, Loading } from './styles';

interface Request {
	text: string;
	isLoading?: boolean;
	enable?: boolean;
	onPress: () => void;
	contentStyle?: ViewStyle;
}

const GenericButton: React.FC<Request> = ({
	text,
	isLoading = false,
	enable = true,
	onPress,
	contentStyle,
}: Request) => {
	const enabledButton = isLoading || !enable ? false : true;

	return (
		<Button onPress={onPress} enabled={enabledButton} style={contentStyle}>
			{isLoading ? <Loading /> : <ButtonText>{text}</ButtonText>}
		</Button>
	);
};

export default GenericButton;
