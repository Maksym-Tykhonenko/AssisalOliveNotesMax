import oliassPrevImages from '../StaticDataAssiOlve/aniotisalOnbPrevImages'
import { olanosiFonts as assiFontsLocal } from '../olanosiFonts';
import { useNavigation as useAssiNavHook } from '@react-navigation/native';
import {
    View as OliassView,
	useWindowDimensions as useAssiWnd,
	Text as OliassText,
	TouchableOpacity as OliassTouchable,
	Image as OliassImage,
} from 'react-native';
import React, { useState as useAssiState } from 'react';

const OliassViewNotOnboarding: React.FC = () => {
	const { width: wndW, height: wndH } = useAssiWnd();
	const assiNavigator = useAssiNavHook();
	const [oliIdx, setOliIdx] = useAssiState(0);

	const progressAssiStep = () => {
		const last = oliassPrevImages.length - 1;
		if (oliIdx < last) {
			setOliIdx(prev => prev + 1);
		} else {
			assiNavigator.replace?.('OliassisalAppWrap');
		}
	};

	return (
		<OliassView style={{ height: wndH, alignItems: 'center', width: wndW, flex: 1, }}>
			<OliassImage style={{ width: wndW, height: wndH * 1.020004532346 }}
				resizeMode="cover"
				source={oliassPrevImages[oliIdx]}
			/>

			{oliIdx !== oliassPrevImages.length - 1 && (
				<OliassTouchable
					onPress={() => assiNavigator.replace?.('OliassisalAppWrap')}
					style={{
						zIndex: 10,
						top: wndH * 0.0550543898,
						alignItems: 'center',
						right: wndW * 0.0460543898,
						height: wndH * 0.061,
						position: 'absolute',
						justifyContent: 'center',
						width: wndW * 0.19,
					}}
					activeOpacity={0.8}
				>
					<OliassText style={{
						fontSize: wndW * 0.053,
						textAlign: 'center',
						color: '#fff',
						fontFamily: assiFontsLocal.oliveManropeRegular,
					}}>
						SKIP
					</OliassText>
				</OliassTouchable>
			)}

			<OliassTouchable
				onPress={progressAssiStep}
				style={{
					borderRadius: wndH * 0.014,
					width: wndW * 0.860543,
					height: wndH * 0.064,
					alignSelf: 'center',
					alignItems: 'center',
					bottom: (wndW * wndH) > 260000 ? wndH * 0.0460543898 : wndH * 0.01903548,
					position: 'absolute',
					justifyContent: 'center',
					backgroundColor: '#149E23',
				}}
				activeOpacity={0.8}
			>
				<OliassText style={{
					fontSize: wndW * 0.053,
					color: '#fff',
					textAlign: 'center',
				}}>
					{oliIdx === 0 ? 'Hello, Livia Rossi' : oliIdx === 1 ? 'Continue' : oliIdx === 2 ? 'Okay, good' : 'Start travel'}
				</OliassText>
			</OliassTouchable>
		</OliassView>
	);
};

export default OliassViewNotOnboarding;
