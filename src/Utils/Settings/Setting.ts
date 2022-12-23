import AsyncStorage from '@react-native-async-storage/async-storage';

async function setSetting({ type, value }: ISetSettingProps): Promise<void> {
	await AsyncStorage.setItem(type, value);
}

async function getSetting({
	type,
}: Omit<ISetSettingProps, 'value'>): Promise<string | undefined> {
	const setting = await AsyncStorage.getItem(type);

	if (!setting) {
		return undefined;
	}

	return setting;
}

export { getSetting, setSetting };
