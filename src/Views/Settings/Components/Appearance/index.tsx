import React, { useState, useCallback, useMemo, useEffect } from 'react';

import strings from '@shared/Locales';

import { getActualAppTheme, Themes } from '@shared/Themes';

import { setAppTheme, getAppTheme } from '@utils/Themes';

import {
	Category,
	CategoryOptions,
	CategoryTitle,
	Picker,
} from '@views/Settings/styles';

import { Text, PickerContainer } from './styles';

interface IThemeItem {
	label: string;
	value: string;
	key: string;
}

interface Props {
	enablePROThemes?: boolean;
	teamsThemes?: boolean;
	onThemeChoosen: (theme: DefaultTheme) => void;
}

const Appearance: React.FC<Props> = ({
	enablePROThemes,
	teamsThemes,
	onThemeChoosen,
}: Props) => {
	const [selectedTheme, setSelectedTheme] = useState<string>('system');

	const data = useMemo(() => {
		const availableThemes: Array<IThemeItem> = [];

		availableThemes.push({
			label: strings.View_Settings_Appearance_Theme_System,
			value: 'system',
			key: 'system',
		});

		if (enablePROThemes || teamsThemes) {
			Themes.forEach(theme => {
				if (teamsThemes && theme.key === 'light') return;
				if (!teamsThemes && theme.key === 'light_teams') return;
				availableThemes.push({
					label: enablePROThemes ? `${theme.name} (PRO)` : theme.name,
					key: theme.key,
					value: theme.key,
				});
			});
		} else {
			Themes.forEach(theme => {
				if (!theme.isPro) {
					availableThemes.push({
						label: theme.name,
						key: theme.key,
						value: theme.key,
					});
				}
			});
		}

		return availableThemes;
	}, [enablePROThemes, teamsThemes]);

	useEffect(() => {
		getAppTheme().then(response => setSelectedTheme(response));
	}, []);

	const handleThemeChange = useCallback(
		async (themeName: string) => {
			if (themeName === 'null') {
				return;
			}
			setSelectedTheme(themeName);
			await setAppTheme(themeName);

			const changeToTheme = await getActualAppTheme();

			onThemeChoosen(changeToTheme);
		},
		[onThemeChoosen]
	);

	return (
		<Category>
			<CategoryTitle>
				{strings.View_Settings_CategoryName_Appearance}
			</CategoryTitle>

			<CategoryOptions>
				<Text>{strings.View_Settings_SettingName_AppTheme}</Text>
				<PickerContainer>
					<Picker
						items={data}
						onValueChange={handleThemeChange}
						value={selectedTheme}
						placeholder={{
							label: strings.View_Settings_Appearance_Theme_SelectOne,
							value: 'null',
						}}
					/>
				</PickerContainer>
			</CategoryOptions>
		</Category>
	);
};

export default Appearance;
