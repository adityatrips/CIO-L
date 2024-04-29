export const colors = {
	primary: '#8DC63F',
	primaryDark: '#019348',
	text: '#000',
	background: '#fff',
	tint: '#019348',
	tabIconDefault: '#ccc',
	tabIconSelected: '#019348',
};
export const baseUri = 'https://cioleader.azurewebsites.net/api';

import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as Linking from 'expo-linking';
import * as MediaLibrary from 'expo-media-library';
import * as Haptics from 'expo-haptics';

export const downloadAndOpenPdf = async (pdfUrl, filename) => {
	const fileUri = `${FileSystem.cacheDirectory}${filename}.pdf`;

	try {
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status !== 'granted') {
			console.error('File write permission not granted');
			return null;
		}

		const response = await FileSystem.downloadAsync(pdfUrl, fileUri);
		if (response.status === 200) {
			return response.uri;
		} else {
			console.error('Failed to download PDF:', response);
			return null;
		}
	} catch (error) {
		console.error('Error downloading PDF:', error);
		return null;
	}
};

export const vibrateHeavy = () => {
	Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy);
};
