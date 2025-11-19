import assistaNoteRecoplaces from '../StaticDataAssiOlve/assistaNoteRecoplaces';
import LiviaPlaceCard from './LiviaPlaceCard';
import MapView, { Marker, Region } from 'react-native-maps';
import React, { useRef, useState } from 'react';
import OpenedAssisalOliCard from './OpenedAssisalOliCard';
import {
    View as ATeoliWrapp,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    StyleSheet
} from 'react-native';

const { width: shyryna, height: vysota } = Dimensions.get('window');

export default function NoteslioveMap() {
    const mapRef = useRef<MapView | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isDetailOpened, setIsDetailOpened] = useState<boolean>(false);
    const anim = React.useRef(new Animated.Value(0)).current;
    const [cardMounted, setCardMounted] = useState<boolean>(false);

    const detailAnim = React.useRef(new Animated.Value(0)).current;
    const [detailMounted, setDetailMounted] = useState<boolean>(false);

    const initialRegion: Region = {
        latitude: assistaNoteRecoplaces[0]?.coords?.lat || 43.07,
        longitude: assistaNoteRecoplaces[0]?.coords?.lng || 12.617,
        latitudeDelta: 0.1, // wider view
        longitudeDelta: 0.1,
    };
    const MAP_HEIGHT = vysota;
    const MAP_WIDTH = shyryna;

    // debug: log coordinates
    console.log('Initial region:', initialRegion);
    console.log('Places count:', assistaNoteRecoplaces.length);
    console.log('Selected index:', selectedIndex);
    console.log('Is detail opened:', isDetailOpened);

    const showCard = (idx: number) => {
        setSelectedIndex(idx);
        setCardMounted(true);
        Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const hideCard = () => {
        Animated.timing(anim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setCardMounted(false);
            setSelectedIndex(null);
            setIsDetailOpened(false);
        });
    };

    const openDetail = () => {
        setDetailMounted(true);
        Animated.timing(detailAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsDetailOpened(true);
        });
    };

    const closeDetail = () => {
        Animated.timing(detailAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setDetailMounted(false);
            setIsDetailOpened(false);
        });
    };

    return (
        <ATeoliWrapp style={{ flex: 1 }}>
            <ATeoliWrapp
                style={{
                    alignSelf: 'center',
                    width: MAP_WIDTH,
                    overflow: 'hidden',
                    height: MAP_HEIGHT,
                }}
            >
                <MapView
                    ref={mapRef}
                    style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
                    // removed provider to use default (Apple Maps on iOS, Google on Android if configured)
                    onMapReady={() => console.log('Map ready')}
                    pitchEnabled={false}
                    zoomControlEnabled={false}
                    rotateEnabled={false}
                    zoomEnabled={true}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    initialRegion={initialRegion}
                    scrollEnabled={true}
                >
                    {assistaNoteRecoplaces.map((place: any, idx: number) => {
                        const lat = place.coords?.lat || 0;
                        const lng = place.coords?.lng || 0;
                        console.log(`Marker ${idx}:`, lat, lng);
                        return (
                            <Marker
                                pinColor='#149E23'
                                key={idx}
                                coordinate={{
                                    latitude: lat,
                                    longitude: lng,
                                }}
                                onPress={(e) => {
                                    e.stopPropagation && e.stopPropagation();
                                    console.log('Marker pressed:', idx);
                                    showCard(idx);
                                }}
                                tracksViewChanges={false}
                            />
                        );
                    })}
                </MapView>

                { /* overlay that closes card when tapping outside; only mounted when cardMounted */}
                {cardMounted && (
                    <TouchableWithoutFeedback onPress={hideCard}>
                        <ATeoliWrapp style={[StyleSheet.absoluteFill, { zIndex: 9 }]} />
                    </TouchableWithoutFeedback>
                )}

                {(cardMounted && !isDetailOpened && selectedIndex !== null) && (
                    <Animated.View
                        style={{
                            zIndex: 10,
                            bottom: vysota * 0.12,
                            alignSelf: 'center',
                            width: shyryna * 0.95,
                            position: 'absolute',
                            transform: [
                                {
                                    translateY: anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [40, 0],
                                    }),
                                },
                                {
                                    scale: anim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.98, 1],
                                    }),
                                },
                            ],
                            opacity: anim,
                        }}
                        onLayout={(e) => {
                            console.log('Card container layout:', e.nativeEvent.layout);
                        }}
                    >
                        <LiviaPlaceCard
                            place={assistaNoteRecoplaces[selectedIndex]}
                            onOpen={openDetail}
                        />
                    </Animated.View>
                )}

                {detailMounted && selectedIndex !== null && (
                    <>
                        {/* animated backdrop */}
                        <Animated.View
                            style={[
                                StyleSheet.absoluteFill,
                                {
                                    zIndex: 19,
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    opacity: detailAnim,
                                },
                            ]}
                        />

                        {/* animated card */}
                        <Animated.View
                            style={{
                                width: shyryna * 0.95,
                                left: (shyryna - shyryna * 0.95) / 2,
                                position: 'absolute',
                                top: vysota * 0.21,
                                zIndex: 20,
                                transform: [
                                    {
                                        translateY: detailAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [20, 0],
                                        }),
                                    },
                                    {
                                        scale: detailAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.98, 1],
                                        }),
                                    },
                                ],
                                opacity: detailAnim,
                            }}
                        >
                            <OpenedAssisalOliCard
                                place={assistaNoteRecoplaces[selectedIndex]}
                                onClose={closeDetail}
                            />
                        </Animated.View>
                    </>
                )}
            </ATeoliWrapp>
        </ATeoliWrapp>
    );
}
