import React, { useState, useCallback } from 'react';

import strings from '@shared/Locales';

import { setHowManyDaysToBeNextExp } from '@utils/Settings/DaysNext';

import { SettingDescription, InputSetting } from '../../styles';

interface Props {
	defaultValue: string;
	onUpdate: (value: number) => Promise<void>;
}

const DaysNext: React.FC<Props> = ({
	defaultValue = '30',
	onUpdate,
}: Props) => {
	const [daysToBeNext, setDaysToBeNext] = useState<string>(defaultValue);

	const onChange = useCallback(
		async (value: string) => {
			const regex = /^[0-9\b]+$/;

			if (value === '' || regex.test(value)) {
				setDaysToBeNext(value);
				await setHowManyDaysToBeNextExp(Number(value));
				onUpdate(Number(value));
			}
		},
		[onUpdate]
	);

	return (
		<>
			<SettingDescription>
				{strings.View_Settings_SettingName_HowManyDaysToBeNextToExp}
			</SettingDescription>
			<InputSetting
				keyboardType="numeric"
				placeholder={
					strings.View_Settings_SettingName_DaysToExpPlaceholder
				}
				value={daysToBeNext}
				onChangeText={onChange}
			/>
		</>
	);
};

export default React.memo(DaysNext);
