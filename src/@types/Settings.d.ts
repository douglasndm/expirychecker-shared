interface ISetSettingProps {
	type:
		| 'HowManyDaysToBeNextExp'
		| 'AutoComplete'
		| 'EnableNotifications'
		| 'EnableMultipleStores'
		| 'EnableStoresFirstPage'
		| 'NotificationCadency'
		| 'HowManyTimesAppWasOpen';
	value: string;
}
