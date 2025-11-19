import React, { useEffect, useState } from 'react';
import {
    TextInput,
    View as BoVieOli,
    Text as NotesTxt,
    Image as ImgOfSial,
    TouchableOpacity as TrigTappedFlow,
    ScrollView as NotoliasScroll,
    Dimensions,
    Share,
    Pressable,
    Alert, // added
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import placesData from '../StaticDataAssiOlve/assistaNoteRecoplaces';
import { olanosiFonts } from '../olanosiFonts';
import { ScrollView } from 'react-native-gesture-handler';

const { width: holiWi, height: holiHei } = Dimensions.get('window');

type Place = {
    id: string;
    oliassiTitleno: string;
    coords: { lat: number; lng: number };
    notaolDescrip: string;
    imageOfAssiLoat: any;
};

type NoteItem = {
    id: number;
    placeId: string;
    description: string;
    createdAt: number;
};

const STORAGE_KEY = '@assi_notes';

function LiviaPlaceCard({
    place,
    noteDescription,
    onDelete,
    compact = false,
    onPress,
}: {
    place: Place;
    noteDescription?: string;
    onShare?: () => void;
    onDelete?: () => void;
    compact?: boolean;
    onPress?: () => void;
}) {
    // compact variant: smaller paddings/fonts/images and hide long description
    const cardPadding = compact ? holiWi * 0.02 : holiWi * 0.03;
    const cardRadius = compact ? holiWi * 0.03 : holiWi * 0.04;
    const imgSize = compact ? holiWi * 0.16 : holiWi * 0.22;
    const titleFont = compact ? holiWi * 0.036 : holiWi * 0.04;
    const descFont = compact ? holiWi * 0.028 : holiWi * 0.032;
    const smallChip = compact ? holiWi * 0.025 : holiWi * 0.03;

    const CardContent = (
        <TrigTappedFlow style={{
            backgroundColor: '#07210a',
            borderRadius: cardRadius,
            alignItems: 'center',
            flexDirection: 'row',
            padding: cardPadding,
            marginVertical: holiWi * 0.02,
            justifyContent: 'space-between',
        }} activeOpacity={1}
            onPress={onPress}
            onLongPress={() => {
                // confirmation before delete (English)
                if (!onDelete) return;
                Alert.alert(
                    'Delete note?',
                    'Do you want to delete this note?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Delete', style: 'destructive', onPress: () => onDelete() }
                    ],
                    { cancelable: true }
                );
            }}>
            <BoVieOli style={{ flex: 1, paddingRight: holiWi * 0.03 }}>
                <NotesTxt style={{ color: '#fff', fontSize: titleFont, fontFamily: olanosiFonts.oliveManropeSemiBold }}>
                    {place.oliassiTitleno}
                </NotesTxt>
                {!compact && (
                    <NotesTxt numberOfLines={4} style={{ color: '#9bd79f', fontSize: descFont, marginTop: holiWi * 0.02 }}>
                        {noteDescription ?? place.notaolDescrip}
                    </NotesTxt>
                )}
                <BoVieOli style={{ marginTop: holiWi * 0.02, flexDirection: 'row', alignItems: 'center' }}>
                    <BoVieOli style={{ backgroundColor: '#0b3b18', paddingHorizontal: holiWi * 0.03, paddingVertical: holiWi * 0.012, borderRadius: smallChip }}>
                        <NotesTxt style={{ color: '#cfeed0', fontSize: compact ? holiWi * 0.024 : holiWi * 0.028 }}>
                            {place.coords.lat.toFixed(4)} N, {place.coords.lng.toFixed(4)} E
                        </NotesTxt>
                    </BoVieOli>
                </BoVieOli>
            </BoVieOli>

            <BoVieOli style={{ width: imgSize, alignItems: 'center' }}>
                <ImgOfSial source={place.imageOfAssiLoat} style={{ width: imgSize, height: imgSize, borderRadius: holiWi * 0.03 }} resizeMode="cover" />
            </BoVieOli>
        </TrigTappedFlow>
    );

    if (onPress) {
        return (
            <Pressable onPress={onPress}>
                {CardContent}
            </Pressable>
        );
    }
    return CardContent;
}

export default function OliveNotes({ asoPg }: { asoPg?: string }) {
    const P = holiWi * 0.05; // page padding
    const containerRadius = holiWi * 0.03;
    const smallFont = holiWi * 0.032;
    const lightGreen = '#149E23';

    const [places] = useState<Place[]>(placesData as unknown as Place[]);
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(places[0]?.id ?? null);
    const [desc, setDesc] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        loadNotes();
    }, []);

    async function loadNotes() {
        try {
            const raw = await AsyncStorage.getItem(STORAGE_KEY);
            if (raw) {
                setNotes(JSON.parse(raw));
            } else {
                setNotes([]);
            }
        } catch (e) {
            console.warn('Load notes err', e);
        }
    }

    async function persistNotes(next: NoteItem[]) {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
            console.warn('Save notes err', e);
        }
    }

    function addNote() {
        if (!selectedPlaceId) return;
        const id = Date.now();
        const newNote: NoteItem = {
            id,
            placeId: selectedPlaceId,
            description: (desc || places.find(p => p.id === selectedPlaceId)?.notaolDescrip?.slice(0, 120)) ?? '',
            createdAt: Date.now()
        };
        const next = [newNote, ...notes];
        setNotes(next);
        persistNotes(next);
        setDesc('');
        setDropdownOpen(false);
        // після додавання нотатки ховаємо екран додавання (повертаємось до списку)
        setShowAddForm(false);
    }

    function removeNote(id: number) {
        const next = notes.filter(n => n.id !== id);
        setNotes(next);
        persistNotes(next);
    }

    function sharePlace(place: Place) {
        Share.share({
            message: `I recommend ${place.oliassiTitleno} — ${place.notaolDescrip}`
        });
    }

    function renderForm() {
        return (
            <>
                <NotesTxt style={{ color: '#fff', fontSize: smallFont * 1.1, textAlign: 'center', marginBottom: holiWi * 0.03 }}>
                    Choose a place from the list:
                </NotesTxt>

                {/* Dropdown */}
                <BoVieOli style={{ marginBottom: holiWi * 0.03 }}>
                    <Pressable onPress={() => setDropdownOpen(!dropdownOpen)} style={{
                        paddingVertical: holiHei * 0.02,
                        paddingHorizontal: holiWi * 0.04,
                        borderRadius: holiWi * 0.03,
                        backgroundColor: '#061b0a',
                    }}>
                        <NotesTxt style={{ color: '#fff', fontSize: smallFont }}>
                            {places.find(p => p.id === selectedPlaceId)?.oliassiTitleno ?? 'Place'}
                        </NotesTxt>
                    </Pressable>

                    {dropdownOpen && (
                        // show compact LiviaPlaceCard list — visible ~2 items, scrollable, descriptions hidden
                        <BoVieOli style={{ maxHeight: holiWi * 0.56, marginTop: holiWi * 0.02 }}>
                            <NotoliasScroll>
                                {places.map(pl => (
                                    <LiviaPlaceCard
                                        key={pl.id}
                                        place={pl}
                                        compact
                                        onPress={() => { setSelectedPlaceId(pl.id); setDropdownOpen(false); }}
                                    />
                                ))}
                            </NotoliasScroll>
                        </BoVieOli>
                    )}
                </BoVieOli>

                {!dropdownOpen && (
                    <>
                        <NotesTxt style={{ color: '#fff', fontSize: smallFont * 0.95, marginBottom: holiWi * 0.02 }}>
                            Description of your opinion:
                        </NotesTxt>

                        <TextInput
                            onChangeText={setDesc}
                            multiline
                            placeholderTextColor="#214822"
                            value={desc}
                            placeholder="Description"
                            style={{
                                fontSize: smallFont,
                                color: '#d8f3d8',
                                textAlignVertical: 'top',
                                backgroundColor: '#061b0a',
                                padding: holiWi * 0.04,
                                borderRadius: holiWi * 0.03,
                                height: holiHei * 0.22,
                            }}
                        />
                    </>
                )}

                <TrigTappedFlow
                    activeOpacity={0.9}
                    onPress={addNote}
                    style={{
                        marginTop: holiWi * 0.04,
                        justifyContent: 'center',
                        backgroundColor: lightGreen,
                        borderRadius: holiWi * 0.04,
                        alignItems: 'center',
                        height: holiHei * 0.08,
                    }}>
                    <NotesTxt style={{ color: '#fff', fontSize: smallFont * 1.2, fontFamily: olanosiFonts.oliveManropeSemiBold }}>
                        Add notes
                    </NotesTxt>
                </TrigTappedFlow>
            </>
        );
    }

    // логіка рендеру:
    // 1) коли немає нотаток і showAddForm === false -> показуємо тільки лівий блок (повідомлення + Add new)
    // 2) коли немає нотаток і showAddForm === true -> показуємо тільки правий блок (форма додавання)
    // 3) коли є нотатки -> показуємо двоколонний вигляд (ліворуч список, праворуч форма)
    if (notes.length === 0 && !showAddForm) {
        return (
            <BoVieOli style={{ flex: 1, padding: P, alignItems: 'center', }}>
                <BoVieOli style={{ width: holiWi - P * 2, borderRadius: containerRadius, padding: holiWi * 0.06, alignItems: 'center', marginTop: holiHei * 0.25 }}>
                    <NotesTxt numberOfLines={1} adjustsFontSizeToFit style={{ color: '#fff', fontSize: holiWi * 0.05, textAlign: 'center', marginBottom: holiWi * 0.04, fontFamily: olanosiFonts.oliveManropeSemiBold }}>
                        You don't have any place records.
                    </NotesTxt>
                    <TrigTappedFlow onPress={() => setShowAddForm(true)} activeOpacity={0.9} style={{
                        justifyContent: 'center',
                        height: holiHei * 0.07,
                        alignItems: 'center',
                        width: holiWi * 0.91,
                        borderRadius: holiWi * 0.04,
                        backgroundColor: lightGreen,
                    }}>
                        <NotesTxt style={{ color: '#fff', fontSize: smallFont * 1.3, fontFamily: olanosiFonts.oliveManropeSemiBold }}>
                            Add new
                        </NotesTxt>
                    </TrigTappedFlow>
                </BoVieOli>
            </BoVieOli>
        );
    }

    if (notes.length === 0 && showAddForm) {
        return (
            <BoVieOli style={{ flex: 1, padding: P, alignItems: 'center' }}>
                <BoVieOli style={{ width: holiWi - P * 2, backgroundColor: '#09350f', borderRadius: containerRadius, padding: holiWi * 0.04 }}>
                    {renderForm()}
                    <TrigTappedFlow onPress={() => setShowAddForm(false)} activeOpacity={0.9} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: holiWi * 0.03,
                    }}>
                        <NotesTxt style={{ color: '#cfeed0', fontSize: holiWi * 0.04 }}>Cancel</NotesTxt>
                    </TrigTappedFlow>
                </BoVieOli>
            </BoVieOli>
        );
    }

    // notes.length > 0 -> show only single card by default; form full-width when requested
    if (notes.length > 0 && !showAddForm) {
        return (
            <BoVieOli style={{ flex: 1, padding: P, alignItems: 'center' }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: holiHei * 0.25 }}>
                    <BoVieOli style={{ width: holiWi - P * 2, borderRadius: containerRadius, }}>
                        {/* show only the most recent note (single card) */}
                        {notes[0] && (() => {
                            const n = notes[0];
                            const p = places.find(pl => pl.id === n.placeId)!;
                            return (
                                <LiviaPlaceCard
                                    key={n.id}
                                    place={p}
                                    noteDescription={n.description}
                                    onShare={() => sharePlace(p)}
                                    onDelete={() => removeNote(n.id)}
                                />
                            );
                        })()}
                    </BoVieOli>
                </ScrollView>

                {/* absolute Add new button under the card */}
                <TrigTappedFlow
                    onPress={() => { setShowAddForm(true); setDropdownOpen(true); setDesc(''); }}
                    activeOpacity={0.9}
                    style={{
                        shadowOpacity: 0.15,
                        bottom: holiHei * 0.14,
                        elevation: 4,
                        alignSelf: 'center',
                        height: holiHei * 0.08,
                        backgroundColor: lightGreen,
                        shadowRadius: 6,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: '#000',
                        width: holiWi * 0.91,
                        borderRadius: holiWi * 0.04,
                    }}>
                    <NotesTxt style={{ color: '#fff', fontSize: smallFont * 1.6, fontFamily: olanosiFonts.oliveManropeRegular }}>
                        Add new
                    </NotesTxt>
                </TrigTappedFlow>
            </BoVieOli>
        );
    }

    // notes exist and showAddForm true -> show full-width form
    if (notes.length > 0 && showAddForm) {
        return (
            <BoVieOli style={{ flex: 1, padding: P, alignItems: 'center' }}>
                <BoVieOli style={{ width: holiWi - P * 2, backgroundColor: '#09350f', borderRadius: containerRadius, padding: holiWi * 0.04 }}>
                    {renderForm()}
                    <TrigTappedFlow onPress={() => setShowAddForm(false)} activeOpacity={0.9} style={{
                        marginTop: holiWi * 0.03,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <NotesTxt style={{ color: '#cfeed0', fontSize: smallFont * 0.95 }}>Cancel</NotesTxt>
                    </TrigTappedFlow>
                </BoVieOli>
            </BoVieOli>
        );
    }

    return null;
}