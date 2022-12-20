import { DefaultTheme } from 'styled-components/native';
import { darken } from 'polished';

import strings from '@shared/Locales';

const Light: DefaultTheme = {
	name: strings.View_Settings_Appearance_Theme_Light,
	key: 'light_teams',
	isPro: false,
	isDark: false,

	colors: {
		primary: '#5856d6',
		accent: '#5856d6',
		background: '#f6f6f6',
		text: '#000',
		subText: '#999999',
		textAccent: '#5856d6',

		inputText: '#050505',
		inputBackground: '#FFF',

		productBackground: '#FFF',

		productExpiredBackground: '#CC4B4B',
		productNextToExpBackground: '#DDE053',
		productThreatedBackground: '#b0b0b0',
		productNextOrExpiredText: '#FFF',

		subscriptionBackground: darken(0.2, '#fff'),
		subscriptionText: '#000',

		TabBackground: 'rgba(255, 255, 255, 0.85)',
		TabText: '#999999',
		TabTextSelected: '#14d48f',
	},
};

export default Light;
