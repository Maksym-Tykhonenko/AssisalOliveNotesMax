import { ScrollView } from 'react-native-gesture-handler';
import { olanosiFonts } from '../olanosiFonts';
import React from 'react';
import {
    View as NoShelWrapAssi,
    ScrollView as OliveScroll,
    TouchableOpacity as TapOliTrigger,
    Text as AssiaTextNote,
    Dimensions,
    Image as ImgOfSial,
    Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: olateWidas, height: olateHeio } = Dimensions.get('window');

export default function OpenedAssisalOliCard({ place, onClose }: { place: any; onClose: () => void }) {
    const P = olateWidas * 0.05;
    const cardRadius = olateWidas * 0.04;
    const titleFont = olateWidas * 0.05;
    const coordsFont = olateWidas * 0.034;
    const descFont = olateWidas * 0.031;
    const coordsBg = '#011803';
    const smallFont = olateWidas * 0.036;
    const lightGreen = '#149E23';
    const darkGreen = '#002B04';

    const STORAGE_KEY = 'liviaAssialNotesOliveSaved';
    const [saved, setSaved] = React.useState(false);

    // load saved state for this place
    React.useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                const arr = raw ? JSON.parse(raw) : [];
                if (mounted) setSaved(!!(place?.id && arr.includes(place.id)));
            } catch (e) {
                // ignore
            }
        })();
        return () => { mounted = false; };
    }, [place?.id]);

    // toggle save / remove
    const toggleSave = React.useCallback(async () => {
        if (!place?.id) return;
        try {
            const raw = await AsyncStorage.getItem(STORAGE_KEY);
            const arr = raw ? Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [] : [];
            const exists = arr.includes(place.id);
            let newArr;
            if (exists) {
                newArr = arr.filter((i: any) => i !== place.id);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newArr));
                setSaved(false);
            } else {
                newArr = [...arr, place.id];
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newArr));
                setSaved(true);
            }
        } catch (e) {
            // ignore
        }
    }, [place?.id]);

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: olateHeio * 0.19 }}>
            <NoShelWrapAssi style={{ backgroundColor: darkGreen, width: olateWidas * 0.95, alignSelf: 'center', borderRadius: cardRadius }}>
                <OliveScroll contentContainerStyle={{ padding: P }}>
                    {/* top image */}
                    <NoShelWrapAssi style={{ borderRadius: cardRadius, overflow: 'hidden', marginBottom: olateHeio * 0.02 }}>
                        <ImgOfSial source={place.imageOfAssiLoat} style={{ width: '100%', height: olateHeio * 0.21, resizeMode: 'cover' }} />
                    </NoShelWrapAssi>

                    {/* content */}
                    <NoShelWrapAssi style={{ paddingHorizontal: 0 }}>
                        <AssiaTextNote style={{ marginBottom: olateHeio * 0.01, color: '#fff', fontFamily: olanosiFonts.oliveManropeSemiBold, fontSize: titleFont, }}>
                            {place.oliassiTitleno ? place.oliassiTitleno.replace('Assisal Olive Notes — ', '') : 'Place'}
                        </AssiaTextNote>

                        <NoShelWrapAssi style={{ backgroundColor: coordsBg, alignSelf: 'flex-start', paddingHorizontal: olateWidas * 0.036, paddingVertical: olateHeio * 0.008, borderRadius: olateWidas * 0.03, marginBottom: olateHeio * 0.015 }}>
                            <AssiaTextNote style={{ color: '#BFD9B8', fontSize: coordsFont, fontFamily: olanosiFonts.oliveManropeRegular }}>
                                {place.coords ? `${place.coords.lat.toFixed(4)}° N, ${place.coords.lng.toFixed(4)}° E` : ''}
                            </AssiaTextNote>
                        </NoShelWrapAssi>

                        <AssiaTextNote style={{  fontSize: descFont, fontFamily: olanosiFonts.oliveManropeRegular, color: '#9CCB96', lineHeight: descFont * 1.6, marginBottom: olateHeio * 0.03 }}>
                            {place.notaolDescrip}
                        </AssiaTextNote>

                        {/* action buttons */}
                        <NoShelWrapAssi style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TapOliTrigger onPress={() => {
                                Share.share({
                                    message: `That amazing place: ${place.oliassiTitleno}\n ${place.notaolDescrip}\n Coordinates: ${place.coords ? `${place.coords.lat.toFixed(4)}° N, ${place.coords.lng.toFixed(4)}° E` : ''}\n\nShared via Assisal Olive Notes App 🌿🫒`,
                                })
                            }} activeOpacity={0.9} style={{ backgroundColor: lightGreen, paddingVertical: olateHeio * 0.02, paddingHorizontal: olateWidas * 0.06, borderRadius: olateWidas * 0.04, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                <AssiaTextNote style={{ color: '#fff', fontSize: smallFont, fontFamily: olanosiFonts.oliveManropeSemiBold }}>Share place</AssiaTextNote>
                            </TapOliTrigger>

                            <TapOliTrigger activeOpacity={0.9} onPress={toggleSave} style={{ backgroundColor: lightGreen, paddingVertical: olateHeio * 0.02, paddingHorizontal: olateWidas * 0.04, borderRadius: olateWidas * 0.04, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: olateWidas * 0.26 }}>
                                <ImgOfSial source={saved ? require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/noteasialFullHeart.png') : require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/heartOliveEmpty.png')} style={{ width: olateWidas * 0.05, height: olateWidas * 0.05, marginRight: olateWidas * 0.02, resizeMode: 'contain' }} />
                                <AssiaTextNote style={{ color: '#fff', fontSize: smallFont, fontFamily: olanosiFonts.oliveManropeSemiBold }}>Save</AssiaTextNote>
                            </TapOliTrigger>

                            <TapOliTrigger activeOpacity={0.9} onPress={onClose} style={{ backgroundColor: lightGreen, paddingVertical: olateHeio * 0.02, paddingHorizontal: olateWidas * 0.01, borderRadius: olateWidas * 0.04, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: olateWidas * 0.21 }}>
                                <AssiaTextNote style={{ color: '#fff', fontSize: smallFont, fontFamily: olanosiFonts.oliveManropeSemiBold }}>Close</AssiaTextNote>
                            </TapOliTrigger>
                        </NoShelWrapAssi>
                    </NoShelWrapAssi>
                </OliveScroll>
            </NoShelWrapAssi>
        </ScrollView>
    );
}
