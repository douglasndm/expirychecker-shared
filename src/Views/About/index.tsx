import React, { useState, useCallback, useEffect } from 'react';
import { View, Linking } from 'react-native';
import {
	getVersion,
	getBuildNumber,
	getSystemName,
	getSystemVersion,
} from 'react-native-device-info';
import codepush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';
import Purchases from 'react-native-purchases';
import { showMessage } from 'react-native-flash-message';

import strings from '@shared/Locales';

import Header from '@components/Header';

import { shareText } from '@utils/Share';

import {
	Container,
	Content,
	ApplicationName,
	ApplicationVersion,
	CheckUpdateText,
	AboutSection,
	UserId,
	Text,
	Link,
	SocialContainer,
	SocialIcon,
	IdContainer,
	IdButton,
} from './styles';

interface Props {
	appName: string;
}

const About: React.FC<Props> = ({ appName }: Props) => {
	const [pid, setPid] = useState('');
	const [firebaseId, setFirebaseId] = useState('');

	const [codePushChecking, setCodePushChecking] = useState(false);

	const loadData = useCallback(async () => {
		try {
			const purchase = await Purchases.getAppUserID();

			setPid(purchase);
		} catch (err) {
			if (err instanceof Error) {
				console.log(err);
			}
		}

		try {
			const firebase = await messaging().getToken();

			setFirebaseId(firebase);
		} catch (err) {
			if (err instanceof Error) {
				console.log(err);
			}
		}
	}, []);

	useEffect(() => {
		loadData();
	}, []);

	const handleNavigateToSite = useCallback(async () => {
		await Linking.openURL('https://douglasndm.dev');
	}, []);

	const navigateToTerms = useCallback(async () => {
		await Linking.openURL('https://douglasndm.dev/terms');
	}, []);

	const navigateToPrivacy = useCallback(async () => {
		await Linking.openURL('https://douglasndm.dev/privacy');
	}, []);

	const handleLinkedinPress = useCallback(async () => {
		await Linking.openURL('https://www.linkedin.com/in/douglasndm/');
	}, []);

	const handleNaviTwitter = useCallback(async () => {
		await Linking.openURL('https://www.twitter.com/douglasndmdev/');
	}, []);

	const handleNaviMail = useCallback(async () => {
		if (await Linking.canOpenURL('mailto:suporte@douglasndm.dev'))
			await Linking.openURL('mailto:suporte@douglasndm.dev');
	}, []);

	const handleFlatIconPress = useCallback(async () => {
		await Linking.openURL('https://www.flaticon.com/authors/srip');
	}, []);

	const handleShareIdInfo = useCallback(async () => {
		try {
			const userInfo = {
				purchase_idetinfy: pid,
				firebase_messaging: firebaseId,
			};
			await shareText({
				title: 'User informations',
				text: JSON.stringify(userInfo),
			});
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
			}
		}
	}, [firebaseId, pid]);

	const checkUpdate = useCallback(async () => {
		try {
			setCodePushChecking(true);
			const response = await codepush.checkForUpdate();

			if (!response) {
				showMessage({
					message: 'There is no update pending',
					type: 'info',
				});
				return;
			}

			const update = await response.download();

			if (update) {
				await update.install(codepush.InstallMode.IMMEDIATE);
			}
		} catch (err) {
			if (err instanceof Error) {
				showMessage({
					message: err.message,
					type: 'danger',
				});
			}
		} finally {
			setCodePushChecking(false);
		}
	}, []);

	return (
		<Container>
			<Content>
				<Header title={strings.View_About_PageTitle} noDrawer />

				<AboutSection>
					<ApplicationName>{appName}</ApplicationName>

					<View style={{ flexDirection: 'row' }}>
						<ApplicationVersion>
							{`${
								strings.View_About_AppVersion
							} ${getVersion()} (Build: ${getBuildNumber()})`}
						</ApplicationVersion>

						{codePushChecking ? (
							<ApplicationVersion>Checking...</ApplicationVersion>
						) : (
							<CheckUpdateText onPress={checkUpdate}>
								{` Check for updates`}
							</CheckUpdateText>
						)}
					</View>
					<ApplicationVersion>{`${getSystemName()} ${getSystemVersion()}`}</ApplicationVersion>
				</AboutSection>

				{(!!firebaseId || !!pid) && (
					<IdContainer>
						<IdButton onLongPress={handleShareIdInfo}>
							<View>
								<UserId>{`fid: ${firebaseId}`}</UserId>
								<UserId>{`pid: ${pid}`}</UserId>
							</View>
						</IdButton>
					</IdContainer>
				)}

				<AboutSection>
					<Text>
						{strings.BeforeTermsAndPrivacy}
						<Link onPress={navigateToTerms}>{strings.Terms}</Link>
						{strings.BetweenTermsAndPrivacy}
						<Link onPress={navigateToPrivacy}>
							{strings.PrivacyPolicy}
						</Link>
						.
					</Text>
				</AboutSection>

				<AboutSection>
					<Text>{strings.View_About_LogoMadeBy}</Text>

					<View>
						<Link onPress={handleFlatIconPress}>
							https://www.flaticon.com/authors/srip
						</Link>
					</View>
				</AboutSection>

				<AboutSection>
					<Text>{strings.View_About_DevelopedBy}</Text>
				</AboutSection>

				<SocialContainer>
					<SocialIcon
						name="desktop-outline"
						onPress={handleNavigateToSite}
					/>
					<SocialIcon
						name="logo-linkedin"
						onPress={handleLinkedinPress}
					/>
					<SocialIcon
						name="logo-twitter"
						onPress={handleNaviTwitter}
					/>
					<SocialIcon name="mail-outline" onPress={handleNaviMail} />
				</SocialContainer>
			</Content>
		</Container>
	);
};

export default About;
