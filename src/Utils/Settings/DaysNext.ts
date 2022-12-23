import { getSetting, setSetting } from './Setting';

async function setHowManyDaysToBeNextExp(howManyDays: number): Promise<void> {
	await setSetting({
		type: 'HowManyDaysToBeNextExp',
		value: String(howManyDays),
	});
}

async function getHowManyDaysToBeNextExp(): Promise<number> {
	const setting = await getSetting({ type: 'HowManyDaysToBeNextExp' });

	if (!setting) {
		return 30;
	}

	return Number(setting);
}

export { getHowManyDaysToBeNextExp, setHowManyDaysToBeNextExp };
