import React, { useState as useStanOfOlive, useEffect as useEffOno } from 'react';
import {
	TouchableOpacity as OliveTchbleOpctyN,
	Dimensions,
	Text as AssiaTextNote,
	Image as ImgOfSial,
	Share,
	View as SheltOlive,
} from 'react-native';
const { width: assialWidoli, height: assiaHeino } = Dimensions.get('window');
import OpenedAssisalOliCard from './OpenedAssisalOliCard';
import assistaNoteRecoplaces from '../StaticDataAssiOlve/assistaNoteRecoplaces';
import LiviaPlaceCard from './LiviaPlaceCard';

import FactsFromLivia from '../StaticDataAssiOlve/FactsFromLivia';
import { olanosiFonts } from '../olanosiFonts';

// module-level variable to keep the randomly chosen place id for this JS session
let lastRandomPlaceId: string | null = null;

export default function OliveAssisGreetPageForUser({setAsoPg}: {setAsoPg?: (scene: string) => void}) {
	// sizes derived from dimensions
	const P = assialWidoli * 0.05;
	const cardRadius = assialWidoli * 0.04;
	const titleFont = assialWidoli * 0.07;
	const descFont = assialWidoli * 0.035;
	const smallFont = assialWidoli * 0.032;
	const lightGreen = '#149E23';
	const darkGreen = '#002B04';

	// deterministic daily fact index (stays same on re-opens for same day)
	const factsLen = FactsFromLivia.length;
	const dayIndex = Math.floor(Date.now() / 86400000) % factsLen;
	const todayFact = FactsFromLivia[dayIndex];

	// random place chosen once per JS session (won't re-generate when opening details)
	const [randomPlace, setRandomPlace] = useStanOfOlive<any | null>(null);
	useEffOno(() => {
		// if we already picked one in this JS session - reuse it
		if (lastRandomPlaceId) {
			const found = assistaNoteRecoplaces.find((p: any) => p.id === lastRandomPlaceId);
			if (found) {
				setRandomPlace(found);
				return;
			}
		}
		// otherwise pick and store id for session
		const idx = Math.floor(Math.random() * assistaNoteRecoplaces.length);
		const chosen = assistaNoteRecoplaces[idx];
		if (chosen && chosen.id) lastRandomPlaceId = chosen.id;
		setRandomPlace(chosen);
	}, []);

	// new: opened place replaces page content
	const [openedPlace, setOpenedPlace] = useStanOfOlive<any | null>(null);

	return (
		<SheltOlive style={{ flex: 1 }}>
			{openedPlace ? (
				// replace entire page with detailed card
				<SheltOlive style={{
					paddingTop: assiaHeino * 0.019,
				}}>
					<OpenedAssisalOliCard place={openedPlace} onClose={() => setOpenedPlace(null)} />
				</SheltOlive>
			) : (
				<SheltOlive style={{
					padding: P,
				}}>
					{/* Facts from Livia */}
					<SheltOlive style={{ backgroundColor: darkGreen, borderRadius: cardRadius, padding: P * 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
						<SheltOlive style={{ flex: 1, paddingRight: P * 0.4 }}>
							<AssiaTextNote style={{ color: '#fff', fontSize: titleFont * 0.75, fontFamily: olanosiFonts.oliveManropeSemiBold, marginBottom: assiaHeino * 0.01 }}>
								Facts from Livia:
							</AssiaTextNote>
							<AssiaTextNote style={{ color: '#9CCB96', fontSize: descFont, fontFamily: olanosiFonts.oliveManropeRegular, lineHeight: descFont * 1.6 }}>
								{todayFact?.text}
							</AssiaTextNote>

							<OliveTchbleOpctyN
							onPress={() => {
								Share.share({
									message: todayFact.text
								})
							}}
							activeOpacity={0.9} style={{ alignItems: 'center', justifyContent: 'center', marginTop: assiaHeino * 0.02, backgroundColor: lightGreen, borderRadius: assialWidoli * 0.04, width: assialWidoli * 0.34, height: assiaHeino * 0.06 }}>
								<AssiaTextNote style={{ color: '#fff', fontSize: smallFont * 1.2, fontFamily: olanosiFonts.oliveManropeSemiBold }}>Share fact</AssiaTextNote>
							</OliveTchbleOpctyN>
						</SheltOlive>

						{/* image of Livia */}
						<ImgOfSial source={require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/LiviaPortrait.png')} style={{ width: assialWidoli * 0.28, height: assialWidoli * 0.28, borderRadius: assialWidoli * 0.04, resizeMode: 'cover' }} />
					</SheltOlive>

					{/* Recommended heading + More */}
					<SheltOlive style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: assiaHeino * 0.021 }}>
						<AssiaTextNote style={{ color: '#fff', fontSize: assialWidoli * 0.05, fontFamily: olanosiFonts.oliveManropeSemiBold }}>
							Recomended place
						</AssiaTextNote>

						<OliveTchbleOpctyN onPress={() => {
							setAsoPg('OliAssial Recomended Places To Visit');
						}} activeOpacity={0.9} style={{ height: assiaHeino * 0.05, width: assialWidoli * 0.32, paddingHorizontal: assialWidoli * 0.031, backgroundColor: lightGreen, borderRadius: assialWidoli * 0.028, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
							<AssiaTextNote style={{ color: '#fff', fontSize: smallFont * 1.4, fontFamily: olanosiFonts.oliveManropeSemiBold, }}>More</AssiaTextNote>
							<ImgOfSial source={require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/rightArrowOlive.png')} style={{ width: smallFont * 1.2, height: smallFont * 1.2, resizeMode: 'contain' }} />
						</OliveTchbleOpctyN>
					</SheltOlive>

					{/* Random place card at bottom (component) */}
					{randomPlace ? (
						<LiviaPlaceCard place={randomPlace} onOpen={(p: any) => setOpenedPlace(p)} />
					) : null}
				</SheltOlive>
			)}
		</SheltOlive>
	);
}