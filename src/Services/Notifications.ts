import { Platform } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
	// (optional) Called when Token is generated (iOS and Android)
	onRegister(token) {
		console.log('TOKEN:', token);
	},

	// (required) Called when a remote is received or opened, or local notification is opened
	onNotification(notification) {
		console.log('NOTIFICATION:', notification);

		// process the notification

		// (required) Called when a remote is received or opened, or local notification is opened
		notification.finish(PushNotificationIOS.FetchResult.NoData);
	},

	// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
	onAction(notification) {
		console.log('ACTION:', notification.action);
		console.log('NOTIFICATION:', notification);

		// process the action
	},

	// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
	onRegistrationError(err) {
		console.error(err);
	},

	// IOS ONLY (optional): default: all - Permissions to register.
	permissions: {
		alert: true,
		badge: true,
		sound: true,
	},

	// Should the initial notification be popped automatically
	// default: true
	popInitialNotification: true,

	/**
	 * (optional) default: true
	 * - Specified if permissions (ios) and token (android and ios) will requested or not,
	 * - if not, you must call PushNotificationsHandler.requestPermissions() later
	 * - if you are not using remote notification or do not have Firebase installed, use this:
	 *     requestPermissions: Platform.OS === 'ios'
	 */
	requestPermissions: true,
});

PushNotification.createChannel(
	{
		channelId: 'default-notifications', // (required)
		channelName: 'Notifications', // (required)
		soundName: 'sound.mp3', // (optional) See `soundName` parameter of `localNotification` function
		importance: 4, // (optional) default: 4. Int value of the Android notification importance
		vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
	},
	created => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

function sendNotification({ title, message, amount }: INotification): void {
	PushNotification.localNotification({
		title,
		message,
		number: amount,
		channelId: 'default-notifications',
		color: 'red',
		vibrate: true,
		importance: 'high',
		playSound: true,
		soundName: Platform.OS === 'ios' ? 'swiftly-610.m4r' : 'sound.mp3',
	});
}

function clearSystemNotifications(): void {
	PushNotification.setApplicationIconBadgeNumber(0);
}

export { sendNotification, clearSystemNotifications };

clearSystemNotifications();
