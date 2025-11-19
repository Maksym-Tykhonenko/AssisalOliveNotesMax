import { olanosiFonts } from '../olanosiFonts';
import assistaNoteRecoplaces from '../StaticDataAssiOlve/assistaNoteRecoplaces';
import OpenedAssisalOliCard from './OpenedAssisalOliCard';
import LiviaPlaceCard from './LiviaPlaceCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
    Dimensions,
    View as AssioliObgort,
    Text as SomeTextElem,
} from 'react-native';
import { ScrollView as SlidingFrame } from 'react-native-gesture-handler';

const { width: W, height: H } = Dimensions.get('window');

export default function OliveAssinoalRecomPlaces({asoPg}: {asoPg?: string}) {
    const P = W * 0.05;

    const [openedPlace, setOpenedPlace] = React.useState<any | null>(null);

    // new: saved ids from AsyncStorage (null = loading)
    const STORAGE_KEY = 'liviaAssialNotesOliveSaved';
    const [savedIds, setSavedIds] = React.useState<string[] | null>(null);

    // robust loader: accept array or object map, normalize to string[]
    const loadSavedIds = React.useCallback(async () => {
        try {
            const raw = await AsyncStorage.getItem(STORAGE_KEY);
            if (!raw) {
                setSavedIds([]);
                return;
            }
            let parsed;
            try { parsed = JSON.parse(raw); } catch { parsed = null; }
            if (Array.isArray(parsed)) {
                setSavedIds(parsed);
                return;
            }
            if (parsed && typeof parsed === 'object') {
                // object map { id: true } or { id: 1 }
                const ids = Object.keys(parsed).filter(k => !!parsed[k]);
                setSavedIds(ids);
                return;
            }
            // fallback: try splitting a comma string
            if (typeof raw === 'string') {
                const maybe = raw.split?.(',').map(s => s.trim()).filter(Boolean);
                setSavedIds(maybe);
                return;
            }
            setSavedIds([]);
        } catch (e) {
            setSavedIds([]);
        }
    }, []);

    // load on mount and when asoPg changes
    React.useEffect(() => {
        loadSavedIds();
    }, [asoPg, loadSavedIds]);

    // compute places to show
    const placesToShow = React.useMemo(() => {
        if (asoPg === 'Users Saved Oliassino Places') {
            if (savedIds === null) return []; // still loading
            return assistaNoteRecoplaces.filter(p => savedIds.includes(p.id));
        }
        return assistaNoteRecoplaces;
    }, [asoPg, savedIds]);

    // render list view or single detail view
    if (openedPlace) {
        return (
            <AssioliObgort style={{ flex: 1,paddingTop: H * 0.02 }}>
                <OpenedAssisalOliCard
                    place={openedPlace}
                    onClose={() => {
                        setOpenedPlace(null);
                        // refresh saved ids after closing detail (in case user saved/unsaved)
                        loadSavedIds();
                    }}
                />
            </AssioliObgort>
        );
    }

    return (
        <AssioliObgort style={{ flex: 1, padding: P }}>
            {/* list */}
            <SlidingFrame showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: H * 0.08 }}>
                <AssioliObgort style={{
                    alignSelf: 'center',
                    width: '100%',
                    marginBottom: H * 0.03
                }}>
                    {/* when viewing saved places and still loading, you may show nothing (or a loader) */}
                    {asoPg === 'Users Saved Oliassino Places' && savedIds === null ? null : (
                        placesToShow.length === 0 ? (
                            <AssioliObgort style={{ paddingVertical: H * 0.04, alignItems: 'center' }}>
                                <SomeTextElem style={{ color: '#9CCB96', fontSize: W * 0.04, fontFamily: olanosiFonts.oliveManropeRegular }}>
                                    {asoPg === 'Users Saved Oliassino Places' ? 'No saved places yet.' : 'No places.'}
                                </SomeTextElem>
                            </AssioliObgort>
                        ) : (
                            placesToShow.map((place) => (
                                <AssioliObgort key={place.id} style={{ marginBottom: P * 0.6 }}>
                                    <LiviaPlaceCard place={place} onOpen={(p: any) => setOpenedPlace(p)} />
                                </AssioliObgort>
                            ))
                        )
                    )}
                </AssioliObgort>
            </SlidingFrame>
        </AssioliObgort>
    );
}
