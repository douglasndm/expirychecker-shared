import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Container = styled.SafeAreaView`
	flex: 1;
	background: ${props => props.theme.colors.background};
`;

export const Content = styled.ScrollView``;

export const AboutSection = styled.View`
	margin: 20px 10px 0 10px;
`;

export const ApplicationName = styled.Text`
	font-size: 24px;
	font-weight: bold;
	color: ${props => props.theme.colors.text};
`;

export const ApplicationVersion = styled.Text`
	font-size: 14px;
	color: ${props => props.theme.colors.subText};
`;

export const CheckUpdateText = styled.Text`
	font-size: 14px;
	color: ${props => props.theme.colors.accent};
`;

export const IdContainer = styled.View`
	margin: 0 10px 0 10px;
`;
export const IdButton = styled.TouchableWithoutFeedback``;

export const UserId = styled.Text.attrs(() => ({
	numberOfLines: 1,
}))`
	font-size: 14px;
	color: ${props => props.theme.colors.subText};
`;

export const Text = styled.Text`
	color: ${props => props.theme.colors.text};
	font-size: 16px;
`;

export const Link = styled.Text`
	color: ${props => props.theme.colors.accent};
	font-size: 14px;
`;

export const SocialContainer = styled.View`
	margin-top: 25px;
	justify-content: center;
	flex-direction: row;
`;

export const SocialIcon = styled(Ionicons).attrs(props => ({
	size: 36,
	color: props.theme.colors.text,
}))`
	margin-right: 15px;
`;
