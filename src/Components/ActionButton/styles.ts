import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ActionButton = styled(Button).attrs(props => ({
	color: props.theme.colors.accent,
}))``;

export const Icons = styled(Ionicons)`
	color: ${({ theme }) => theme.colors.text};
`;
