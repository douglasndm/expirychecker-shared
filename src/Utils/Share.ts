import Share from 'react-native-share';

interface shareTextProps {
	title: string;
	text?: string;
}

async function shareText({ text, title }: shareTextProps): Promise<void> {
	await Share.open({
		title,
		message: text,
	});
}

export { shareText };
