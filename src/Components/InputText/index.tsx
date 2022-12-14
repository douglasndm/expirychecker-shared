import React, { useState, useCallback } from 'react';
import { KeyboardTypeOptions, ViewStyle } from 'react-native';

import { Container, Content, Input, Icon } from './styles';

interface Props {
	value: string;
	placeholder?: string;
	onChange: (value: string) => void;
	hasError?: boolean;
	isPassword?: boolean;
	autoCorrect?: boolean;
	keyboardType?: KeyboardTypeOptions;
	autoCapitalize?: 'none' | 'characters' | 'sentences' | 'words';
	contentStyle?: ViewStyle;
}

const InputText: React.FC<Props> = ({
	value,
	placeholder,
	onChange,
	hasError,
	isPassword,
	autoCorrect,
	keyboardType,
	autoCapitalize,
	contentStyle,
}: Props) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleSwitchShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	return (
		<Container hasError={hasError} style={contentStyle}>
			<Content>
				<Input
					value={value}
					placeholder={placeholder}
					onChangeText={onChange}
					secureTextEntry={isPassword && !showPassword}
					autoCapitalize={autoCapitalize}
					autoCorrect={autoCorrect}
					keyboardType={keyboardType}
				/>
				{isPassword && (
					<Icon
						name={!showPassword ? 'eye-outline' : 'eye-off-outline'}
						onPress={handleSwitchShowPassword}
					/>
				)}
			</Content>
		</Container>
	);
};

export default InputText;
