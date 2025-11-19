import OliveAssisGreetPageForUser from './OliveAssisGreetPageForUser';
import React, { useState as useAssiaSt, useEffect as useNoteasiEff, } from 'react';
import {
    Text as AssiaTextNote,
    TouchableWithoutFeedback as TapWithoutReaction,
    View as Violivew,
    Keyboard,
    Dimensions as TenoveDimension,
    Image as NoteolImg,
    TouchableOpacity as QuestRoundBtn,
    SafeAreaView as OliSafeAreassi,
    Platform, // added Platform
} from 'react-native';
import { olanosiFonts } from '../olanosiFonts';
import NoteslioveMap from './NoteslioveMap';
import OliveNotes from './OliveNotes';
import OliveAssinoalRecomPlaces from './OliveAssinoalRecomPlaces';
import NotoasilveInformation from './NotoasilveInformation';

type TitlesOfAssialPgs =
    | 'Here You Can Learn About Our App'
    | 'OliAssial Recomended Places To Visit'
    | 'Users Saved Oliassino Places'
    | 'Make Map Show All Places'
    | 'Make Notes Here'
    | 'Olivia Fact Here And Recomended Places And Gen';

const bottomolibe = [
    {
        navtoOlive: 'Olivia Fact Here And Recomended Places And Gen',
        asiicon: require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/notesImagesOfBar/oliveGeneral.png'),
    },
    {
        navtoOlive: 'Make Map Show All Places',
        asiicon: require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/notesImagesOfBar/notesMapWithPins.png'),
    },
    {
        navtoOlive: 'Users Saved Oliassino Places',
        asiicon: require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/notesImagesOfBar/favPlacesLocs.png'),
    },
    {
        navtoOlive: 'Make Notes Here',
        asiicon: require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/notesImagesOfBar/notesAssisal.png'),
    },
    {
        navtoOlive: 'Here You Can Learn About Our App',
        asiicon: require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/notesImagesOfBar/aboutMyApp.png'),
    },
];

const { width: notewidtha, height: heino } = TenoveDimension.get('window');

const OliassisalAppWrap: React.FC = () => {
    const [asoPg, setAsoPg] = useAssiaSt<TitlesOfAssialPgs>('Olivia Fact Here And Recomended Places And Gen');

    // Додано: стан для поточного часу та інтервал оновлення
    const [now, setNow] = useAssiaSt<Date>(new Date());
    useNoteasiEff(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const renderNotoPage = () => {
        switch (asoPg) {
            case 'Olivia Fact Here And Recomended Places And Gen':
                return <OliveAssisGreetPageForUser setAsoPg={setAsoPg} />;
            case 'OliAssial Recomended Places To Visit':
            case 'Users Saved Oliassino Places':
                return <OliveAssinoalRecomPlaces asoPg={asoPg} />;
            case 'Make Map Show All Places':
                return <NoteslioveMap asoPg={asoPg} />;
            case 'Here You Can Learn About Our App':
                return <NotoasilveInformation />;
            case 'Make Notes Here':
                return <OliveNotes />;
            default:
                return null;
        }
    };

    // Приховати кнопку/екран "Make Map Show All Places" на Android
    const bottomItems = Platform.OS === 'android'
        ? bottomolibe.filter(item => item.navtoOlive !== 'Make Map Show All Places')
        : bottomolibe;

    return (
        <TapWithoutReaction onPress={() => Keyboard.dismiss()}>
            <Violivew style={{
                height: heino,
                flex: 1,
                width: notewidtha,
            }}
            >
                <NoteolImg
                    source={require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/oliveBackgroundImageNotesAssis.png')}
                    style={{
                        height: heino,
                        width: notewidtha,
                        position: 'absolute',
                        resizeMode: 'cover',
                    }}
                />
                <Violivew style={{
                    borderBottomRightRadius: notewidtha * 0.07,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    alignItems: 'flex-end',
                    paddingTop: notewidtha * 0.1,
                    paddingBottom: notewidtha * 0.03,
                    paddingHorizontal: notewidtha * 0.04,
                    backgroundColor: '#011803',
                    zIndex: 10,
                    borderBottomLeftRadius: notewidtha * 0.07,
                    height: heino * 0.19,
                    position: asoPg === 'Make Map Show All Places' ? 'absolute' : 'relative',
                    width: notewidtha * 0.8,
                }}>
                    <Violivew style={{
                        justifyContent: 'space-between',
                        flex: 1,
                        gap: notewidtha * 0.019,
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <NoteolImg
                            source={require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/smallAssisalLogo.png')}
                            style={{
                                width: notewidtha * 0.19,
                                height: notewidtha * 0.19,
                                resizeMode: 'contain',
                            }}
                        />

                        {asoPg === 'Olivia Fact Here And Recomended Places And Gen' ? (
                            <>
                                {/* Заміна статичної дати на динамічну */}
                                <Violivew style={{
                                    alignItems: 'center',
                                    maxWidth: notewidtha * 0.3,
                                    backgroundColor: '#002B04',
                                    justifyContent: 'center',
                                    height: heino * 0.059,
                                    paddingHorizontal: notewidtha * 0.046,
                                    borderRadius: notewidtha * 0.04,
                                }}>
                                    <AssiaTextNote numberOfLines={1} adjustsFontSizeToFit style={{ color: '#fff', fontSize: notewidtha * 0.044, fontFamily: olanosiFonts.oliveManropeRegular }}>
                                        {now.toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}
                                    </AssiaTextNote>
                                </Violivew>

                                {/* Заміна статичного часу на динамічний (оновлюється щосекунди) */}
                                <Violivew style={{
                                    borderRadius: notewidtha * 0.04,
                                    alignItems: 'center',
                                    backgroundColor: '#002B04',
                                    justifyContent: 'center',
                                    height: heino * 0.059,
                                    paddingHorizontal: notewidtha * 0.046,
                                }}>
                                    <AssiaTextNote style={{ color: '#fff', fontSize: notewidtha * 0.044, fontFamily: olanosiFonts.oliveManropeRegular }}>
                                        {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    </AssiaTextNote>
                                </Violivew>
                            </>
                        ) : (
                            <AssiaTextNote style={{ color: '#fff', fontSize: notewidtha * 0.044, flex: 1, textAlign: 'center', fontFamily: olanosiFonts.assisalSanSemiBold }}>
                                {asoPg === 'Here You Can Learn About Our App' ? 'Information'
                                    : asoPg === 'Make Map Show All Places' ? 'Interactive Map'
                                        : asoPg === 'Users Saved Oliassino Places' ? 'Saved Places'
                                            : asoPg === 'OliAssial Recomended Places To Visit' ? 'Recomended Places'
                                            : 'Olive Notes'
                                }
                            </AssiaTextNote>
                        )}
                    </Violivew>
                </Violivew>

                {asoPg !== 'Make Map Show All Places' && (
                    <OliSafeAreassi />
                )}
                {renderNotoPage()}

                <Violivew style={{
                    paddingHorizontal: notewidtha * 0.07,
                    width: notewidtha,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    bottom: 0,
                    position: 'absolute',
                    paddingBottom: notewidtha * 0.1,
                    borderTopLeftRadius: notewidtha * 0.070043520284,
                    borderTopRightRadius: notewidtha * 0.070043520284,
                    backgroundColor: '#011803',
                    paddingTop: notewidtha * 0.05,
                    justifyContent: 'space-between',
                }}>
                    {bottomItems.map((tile, index) => (
                        <QuestRoundBtn key={index} style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} onPress={() => {
                            setAsoPg(tile.navtoOlive);
                        }}>
                            <NoteolImg
                                source={tile.asiicon}
                                style={{
                                    opacity: asoPg === tile.navtoOlive ? 1 : 0.35,
                                    width: notewidtha * 0.1205341,
                                    height: notewidtha * 0.1205341,
                                    resizeMode: 'contain',
                                }}
                            />
                        </QuestRoundBtn>
                    ))}

                </Violivew>
            </Violivew>
        </TapWithoutReaction>
    );
};

export default OliassisalAppWrap;