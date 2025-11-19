import RNFS from 'react-native-fs';

const signaturePath = RNFS.MainBundlePath + '/AssisalOliveNotesAssets/AssisalOliveNotes_signature.dat';
RNFS.readFile(signaturePath).then(data => {
}).catch(() => {
});
