import styled, { css } from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
	background-color: ${props => props.theme.colors.accent};
`;

export const HeaderContainerNoDrawner = styled.SafeAreaView`
	margin-top: 15px;
	flex-direction: row;
	align-items: center;
`;

export const HeaderContainer = styled(RectButton)`
	width: 100%;
	padding: 15px 30px 15px 0px;

	${Dimensions.get('window').height <= 600 &&
	css`
		padding: 20px 20px 0px 0px;
	`}

	${Dimensions.get('window').height > 920 &&
	Platform.OS === 'ios' &&
	css`
		padding: 0 30px 15px 0px;
	`}

    justify-content: flex-start;
	align-items: center;

	background-color: ${props => props.theme.colors.accent};

	flex-direction: row;
`;

interface TextLogoProps {
	noDrawer?: boolean;
}

export const TextLogo = styled.Text<TextLogoProps>`
	font-size: 28px;
	font-weight: bold;
	color: white;

	${props =>
		props.noDrawer &&
		css`
			color: ${({ theme }) => theme.colors.text};
		`}
`;

export const MenuButton = styled(RectButton)`
	margin: 0 10px;
`;

export const MenuIcon = styled(Ionicons).attrs({
	name: 'menu-outline',
	size: 33,
	color: 'white',
})``;
