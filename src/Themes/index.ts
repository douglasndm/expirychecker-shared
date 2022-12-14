import { Appearance } from 'react-native';
import { DefaultTheme } from 'styled-components';

import { getAppTheme } from '@utils/Themes';
import Light from './Light';
import LightTeams from './LightTeams';
import Dark from './Dark';
import UltraViolet from './UltraViolet';
import DarkGreen from './DarkGreen';
import HappyPink from './HappyPink';
import OceanBlue from './OceanBlue';
import Relax from './Relax';
import Florest from './Florest';
import JustBlue from './JustBlue';

export default {
	Light,
	LightTeams,
	Dark,
	UltraViolet,
	DarkGreen,
	HappyPink,
	OceanBlue,
	Relax,
	Florest,
	JustBlue,
};

export const Themes = [
	Light,
	LightTeams,
	Dark,
	UltraViolet,
	DarkGreen,
	HappyPink,
	OceanBlue,
	Relax,
	Florest,
	JustBlue,
];

export function getThemeByName(themeName: string): DefaultTheme {
	if (themeName === 'system') {
		const systemTheme = Appearance.getColorScheme();

		if (systemTheme === 'dark') {
			return Dark;
		}
		return Light;
	}

	switch (themeName) {
		case 'light':
			return Light;
		case 'light_teams':
			return LightTeams;
		case 'dark':
			return Dark;
		case 'ultraviolet':
			return UltraViolet;
		case 'darkgreen':
			return DarkGreen;
		case 'happypink':
			return HappyPink;
		case 'oceanblue':
			return OceanBlue;
		case 'relax':
			return Relax;
		case 'florest':
			return Florest;
		case 'justblue':
			return JustBlue;
		default:
			return Light;
	}
}

export const getActualAppTheme = async (
	isTeams?: boolean | undefined,
	isPro?: boolean | undefined
): Promise<DefaultTheme> => {
	const theme = await getAppTheme(isTeams, isPro);

	if (theme === 'light') {
		return Light;
	}
	if (theme === 'light_teams') {
		return LightTeams;
	}
	if (theme === 'dark') {
		return Dark;
	}
	if (theme === 'ultraviolet') {
		return UltraViolet;
	}
	if (theme === 'darkgreen') {
		return DarkGreen;
	}
	if (theme === 'happypink') {
		return HappyPink;
	}
	if (theme === 'oceanblue') {
		return OceanBlue;
	}
	if (theme === 'relax') {
		return Relax;
	}
	if (theme === 'florest') {
		return Florest;
	}
	if (theme === 'justblue') {
		return JustBlue;
	}
	if (theme === 'system') {
		const systemTheme = Appearance.getColorScheme();

		if (systemTheme === 'dark') {
			return Dark;
		}
		return Light;
	}
	return Light;
};
