import RNFS from 'react-native-fs';
import Share from 'react-native-share';

import strings from '@shared/Locales';

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

interface shareFileProps {
	fileAsString: string;
	fileName: string;
	fileExtesion: string;
	encoding?: string;
}

async function shareFile({
	fileAsString,
	fileName,
	fileExtesion,
	encoding = 'utf8',
}: shareFileProps): Promise<void> {
	const path = `${RNFS.DocumentDirectoryPath}/${fileName}.${fileExtesion}`;

	// VERIFICA SE O ARQUIVO EXISTE E CASO EXISTA APAGUE ELE
	// POR ALGUM MOTIVO A LIB FAZ APPEND AUTOMATICO
	if (await RNFS.exists(path)) {
		await RNFS.unlink(path);
	}

	await RNFS.writeFile(path, fileAsString, encoding);

	await Share.open({
		title: strings.Function_Share_SaveFileTitle,
		url: `file://${path}`,
	});
}

export { shareFile, shareText };
