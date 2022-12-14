import styled from 'styled-components/native';
import RNPickerSelect from 'react-native-picker-select';
import { Switch as SwitchPaper } from 'react-native-paper';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: ${props => props.theme.colors.background};
`;

export const Content = styled.ScrollView``;

export const SettingsContent = styled.View`
	padding: 0 16px 16px 16px;
`;

export const Category = styled.View`
	margin-top: 20px;
	padding: 15px 15px 25px;
	background-color: ${props => props.theme.colors.productBackground};
	border-radius: 12px;
`;

export const CategoryTitle = styled.Text`
	font-size: 21px;
	color: ${props => props.theme.colors.productCardText};
`;

export const CategoryOptions = styled.View`
	margin-top: 20px;
`;

export const SettingContainer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 15px;
`;

export const SettingDescription = styled.Text`
	font-size: 14px;
	color: ${props => props.theme.colors.productCardText};
`;

export const InputSetting = styled.TextInput.attrs(props => ({
	placeholderTextColor: props.theme.colors.productCardText,
}))`
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	margin-top: 8px;
	padding: 10px;
	color: ${props => props.theme.colors.productCardText};
	border-color: ${props => props.theme.colors.productCardText};
`;

export const Picker = styled(RNPickerSelect).attrs(({ theme }) => ({
	pickerProps: {
		style: {
			color: theme.colors.productCardText,
		},
	},
	textInputProps: {
		style: {
			color: theme.colors.productCardText,
		},
	},
}))``;

export const Switch = styled(SwitchPaper).attrs(props => ({
	color: props.theme.colors.accent,
}))``;
