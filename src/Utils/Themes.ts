import AsyncStorage from '@react-native-async-storage/async-storage';

async function getAppTheme(
	isTeams?: boolean,
	isPro?: boolean
): Promise<string> {
	if (isTeams) {
		const setting = await AsyncStorage.getItem('AppTheme');

		if (!setting) {
			return 'system';
		}

		return setting;
	}
	const isUserPro = isTeams || isPro;
	if (isUserPro) {
		const proTheme = await AsyncStorage.getItem('AppThemePRO');

		if (!proTheme) {
			return 'system';
		}

		return proTheme;
	}

	const setting = await AsyncStorage.getItem('AppTheme');

	if (!setting) {
		return 'system';
	}

	return setting;
}

async function setAppTheme(
	themeName: string,
	isTeams?: boolean,
	isPro?: boolean
): Promise<void> {
	const isUserPro = isTeams || isPro;

	if (isUserPro) {
		await AsyncStorage.setItem('AppThemePRO', themeName);

		// this if makes sure if user select a non-pro theme it will still be selected if
		// user cancel pro mode
		if (
			themeName === 'system' ||
			themeName === 'light' ||
			themeName === 'dark' ||
			(isTeams && themeName === 'light_teams')
		) {
			await AsyncStorage.setItem('AppTheme', themeName);
		}

		// return to not set apptheme again with possible pro themes
		return;
	}

	await AsyncStorage.setItem('AppTheme', themeName);
}

export { getAppTheme, setAppTheme };
