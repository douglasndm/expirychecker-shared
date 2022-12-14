import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: ${props => props.theme.colors.background};
`;

export const TitleContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 5px 10px;
`;

export const ItemTitle = styled.Text`
	font-size: 22px;
	font-weight: bold;
	margin: 5px 10px;
	color: ${props => props.theme.colors.text};
`;

export const ActionsContainer = styled.View`
	flex-direction: column;
	align-items: flex-end;
	margin-right: 10px;
	margin-top: 10px;
`;

export const ActionButtonsContainer = styled(RectButton)`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 150px;
	margin-bottom: 5px;
`;

export const ActionText = styled.Text`
	font-weight: bold;
	font-size: 14px;
	text-transform: uppercase;
	color: ${props => props.theme.colors.accent};
`;

export const Icons = styled(Ionicons)`
	color: ${({ theme }) => theme.colors.text};
	margin-left: 10px;
`;
