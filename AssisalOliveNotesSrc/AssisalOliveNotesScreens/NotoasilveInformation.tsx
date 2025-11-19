import React from 'react';
import {
    TouchableOpacity as TappingBox,
    View as SheltOlive,
    Text as OliveText,
    Image as Zobrazhennya,
    Dimensions,
    Share
} from 'react-native';
import { olanosiFonts } from '../olanosiFonts';
import { ScrollView } from 'react-native-gesture-handler';

const { width: holiWi, height: holiHei } = Dimensions.get('window');

export default function NotoasilveInformation({ asoPg }: { asoPg?: string }) {
    // base sizing via Dimensions
    const P = holiWi * 0.05; // page padding
    const gap = P * 0.6;
    const squareSize = holiWi * 0.36; // each top square
    const squareRadius = holiWi * 0.08;
    const innerImgRadius = holiWi * 0.06;
    const descHeight = holiHei * 0.38;
    const descRadius = holiWi * 0.04;
    const buttonRadius = holiWi * 0.028;
    const smallFont = holiWi * 0.032;

    // colors (taken from LiviaPlaceCard)
    const lightGreen = '#149E23';
    const coordsBg = '#011803';
    const descBg = '#083010';

    return (
        <SheltOlive style={{ flex: 1, padding: P, justifyContent: 'space-between' }}>
            {/* description card */}
            <SheltOlive style={{
                justifyContent: 'center',
                padding: P,
                borderRadius: descRadius,
                backgroundColor: descBg,
                minHeight: descHeight,
            }}>
                <SheltOlive style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    {/* Logo square */}
                    <Zobrazhennya
                        source={require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/smallAssisalLogo.png')}
                        style={{ width: squareSize * 0.95, height: squareSize * 0.95, resizeMode: 'contain' }}
                    />


                    {/* Avatar square */}
                    <SheltOlive style={{
                        overflow: 'hidden',
                        justifyContent: 'center',
                        borderRadius: squareRadius,
                        backgroundColor: coordsBg,
                        height: squareSize,
                        alignItems: 'center',
                        width: squareSize,
                    }}>
                        {/* replace source with your avatar image */}
                        <Zobrazhennya
                            source={require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/LiviaPortrait.png')}
                            style={{ width: squareSize * 0.92, height: squareSize * 0.92, borderRadius: innerImgRadius, resizeMode: 'cover' }}
                        />
                    </SheltOlive>
                </SheltOlive>
                <SheltOlive style={{
                    backgroundColor: '#011803',
                    padding: holiWi * 0.03,
                    marginVertical: gap * 1.6,
                    width: '100%',
                    borderRadius: holiWi * 0.05,
                }}>
                    <OliveText
                        style={{
                            color: '#fff',
                            fontSize: (holiWi * holiHei) < 260000 ? holiWi * 0.031 : holiWi * 0.044,
                            fontFamily: olanosiFonts.oliveManropeRegular,
                        }}
                    >
                        Assisal Olive Notes is an interactive travel app created for those who want to experience Assisi with their heart. Explore the most beautiful places, read stories, save your favorite spots and leave your Olive Notes - short emotional notes to come back here again.
                    </OliveText>
                </SheltOlive>
                <SheltOlive style={{ paddingTop: gap / 2 }}>
                    <TappingBox
                        activeOpacity={0.9}
                        onPress={() => {
                            Share.share({
                                message: 'I recommended this app to you: Assisal Olive Notes - your interactive travel companion for exploring Assisi! Download now: [App Link Here]'
                            })
                        }}
                        style={{
                            width: holiWi * 0.35,
                            backgroundColor: lightGreen,
                            paddingHorizontal: holiWi * 0.06,
                            justifyContent: 'center',
                            borderRadius: buttonRadius,
                            alignItems: 'center',
                            height: holiHei * 0.061,
                        }}>
                        <OliveText style={{ color: '#fff', fontSize: smallFont * 1.4, fontFamily: olanosiFonts.oliveManropeSemiBold }}>
                            Share app
                        </OliveText>
                    </TappingBox>
                </SheltOlive>
            </SheltOlive>
        </SheltOlive>
    );
}