import React from 'react';
import {
	TouchableOpacity as OliveTchbleOpctyN,
	Image as ImgOfSial,
	View as SheltOlive,
	Text as AssiaTextNote,
	Dimensions
} from 'react-native';
import { olanosiFonts } from '../olanosiFonts';

const { width: oliwidth, height: heioliv } = Dimensions.get('window');

export default function LiviaPlaceCard({ place, onOpen }: { place: any; onOpen?: (p: any) => void }) {
	const P = oliwidth * 0.05;
	const cardRadius = oliwidth * 0.04;
	// make card height static via Dimensions
	const cardHeight = heioliv * 0.23; // static card height
	const titleFont = (oliwidth * heioliv) < 260000 ? oliwidth * 0.046 : oliwidth * 0.055;
	const descFont = (oliwidth * heioliv) < 260000 ? oliwidth * 0.028 : oliwidth * 0.035;
	const coordsFont = oliwidth * 0.03;
	const smallFont = oliwidth * 0.032;
	const lightAsiliGreen = '#149E23';
	const darkGreen = '#002B04';
	const coordsBg = '#011803';

	return (
		<SheltOlive style={{ backgroundColor: darkGreen, borderRadius: cardRadius, padding: P * 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: P * 0.6, height: cardHeight }}>
			{/* left column */}
			<SheltOlive style={{ flex: 1, paddingRight: P * 0.4 }}>
				<AssiaTextNote
					style={{ color: '#fff', fontSize: titleFont, fontFamily: olanosiFonts.oliveManropeSemiBold, marginBottom: heioliv * 0.01 }}
					minimumFontScale={0.7}          // minimum scale for the title font
					numberOfLines={2}               // limit number of lines
					adjustsFontSizeToFit={true}     // allow font to adapt to space
					allowFontScaling={true}
				>
					{place.oliassiTitleno ? place.oliassiTitleno.replace('Assisal Olive Notes — ', '') : 'Place'}
				</AssiaTextNote>

				<SheltOlive style={{ backgroundColor: coordsBg, alignSelf: 'flex-start', paddingHorizontal: oliwidth * 0.036, paddingVertical: heioliv * 0.008, borderRadius: oliwidth * 0.03, marginBottom: heioliv * 0.015 }}>
					<AssiaTextNote style={{ color: '#BFD9B8', fontSize: coordsFont, fontFamily: olanosiFonts.oliveManropeRegular }}>
						{place.coords ? `${place.coords.lat.toFixed(4)}° N, ${place.coords.lng.toFixed(4)}° E` : ''}
					</AssiaTextNote>
				</SheltOlive>

				{/* description trimmed by number of lines */}
				<AssiaTextNote
					style={{ color: '#9CCB96', width: '95%', fontFamily: olanosiFonts.oliveManropeLight, fontSize: descFont, lineHeight: descFont * 1.6 }}
					numberOfLines={3}            // limit description to N lines
					ellipsizeMode="tail"        // show ellipsis at the end
				>
					{place?.notaolDescrip || ''}
				</AssiaTextNote>
			</SheltOlive>

			{/* right image and open button */}
			<SheltOlive style={{ width: oliwidth * 0.32, alignItems: 'center' }}>
				{/* adjust image height to fit the fixed card height */}
				<ImgOfSial source={place.imageOfAssiLoat} style={{ width: oliwidth * 0.32, height: cardHeight * 0.5, borderRadius: oliwidth * 0.04, resizeMode: 'cover' }} />
				<OliveTchbleOpctyN
					activeOpacity={0.9}
					onPress={() => onOpen && onOpen(place)}
					style={{ marginTop: heioliv * 0.015,  width: oliwidth * 0.32, paddingHorizontal: oliwidth * 0.031, height: heioliv * 0.05, backgroundColor: lightAsiliGreen, borderRadius: oliwidth * 0.028, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
					<AssiaTextNote style={{ color: '#fff', fontSize: smallFont * 1.4, fontFamily: olanosiFonts.oliveManropeSemiBold }}>Open</AssiaTextNote>
					<ImgOfSial source={require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/rightArrowOlive.png')} style={{ width: smallFont * 1.2, height: smallFont * 1.2, resizeMode: 'contain' }} />
				</OliveTchbleOpctyN>
			</SheltOlive>
		</SheltOlive>
	);
}
