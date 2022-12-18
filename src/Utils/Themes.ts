import AsyncStorage from '@react-native-async-storage/async-storage';

//todo
//import { getEnableProVersion } from './Settings';

export async function getAppTheme(isTeams?: boolean): Promise<string> {
    if(isTeams) {
        const setting = await AsyncStorage.getItem('AppTheme');

        if (!setting) {
            return 'system';
        }

        return setting;
    } else {
        //const isUserPro = await getEnableProVersion();
        const isUserPro = true;
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

    return 'system';
}

export async function setAppTheme(themeName: string): Promise<void> {
    const isUserPro = true;

    if (isUserPro) {
        await AsyncStorage.setItem('AppThemePRO', themeName);

        // this if makes sure if user select a non-pro theme it will still be selected if
        // user cancel pro mode
        if (
            themeName === 'system' ||
            themeName === 'light' ||
            themeName === 'dark'
        ) {
            await AsyncStorage.setItem('AppTheme', themeName);
        }

        // return to not set apptheme again with possible pro themes
        return;
    }

    await AsyncStorage.setItem('AppTheme', themeName);
}
