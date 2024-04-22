export const colors = {
	primary: 'rgb(141, 198, 63)',
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
export const downloadAndOpenPdf = async (pdfUrl, filename) => {
	const fileUri = `${FileSystem.cacheDirectory}${filename}.pdf`;

	console.log(fileUri);

	try {
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status !== 'granted') {
			console.error('File write permission not granted');
			return null;
		}

		const response = await FileSystem.downloadAsync(pdfUrl, fileUri);
		if (response.status === 200) {
			console.log('PDF downloaded successfully:', response.uri);
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
