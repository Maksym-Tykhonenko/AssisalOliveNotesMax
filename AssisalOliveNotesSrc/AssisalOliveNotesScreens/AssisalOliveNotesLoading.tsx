import { useNavigation as useAssiNavHook } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OLISAL_BAKE_STORAGE_KEY = 'bake-quest-7842-543-24123-storage-key';
const FIRST_RUN_CAKEFLAG_KEY = 'is-7329-123-5435-cake-firstly-start'; // kept string value
import JumpyTickerDots from '../AssisalOliveNotesComponents/JumpingScrollingDotsAnimation';
import React, { useEffect as useAssiBootEffect } from 'react';
import {
	View as AssiLoadRoot,
	Image as AssiLogoImage,
	Dimensions as AssiDimensions,
} from 'react-native';

const OliassBootLoader: React.FC = () => {
	const { width: launchWidth, height: launchHeight } = AssiDimensions.get('window');
	const assiNavigator = useAssiNavHook();

	useAssiBootEffect(() => {
		let shouldShowOnboarding = false;
		const initBootFlow = async () => {
			try {
				const [firstRunValue, profileMoodValue] = await Promise.all([
					AsyncStorage.getItem(FIRST_RUN_CAKEFLAG_KEY),
					AsyncStorage.getItem(OLISAL_BAKE_STORAGE_KEY),
				]);

				if (!firstRunValue && !profileMoodValue) {
					shouldShowOnboarding = true;
					await AsyncStorage.setItem(FIRST_RUN_CAKEFLAG_KEY, 'true');
				}
			} catch (err) {
				if (__DEV__) console.warn('AssisalOliveNotesLoading:init', err);
			}

			setTimeout(() => {
				assiNavigator.replace(
					shouldShowOnboarding
						? 'AssisalOliveNotesOnboarding'
						: 'OliassisalAppWrap'
				);
				// startAssisalApp();
			}, 4058);
		};

		initBootFlow();
	}, [assiNavigator, launchWidth]);

	return (
		<AssiLoadRoot style={{
			alignItems: 'center',
			height: launchHeight,
			width: launchWidth,
			flex: 1,
			justifyContent: 'center',
		}}>
			<AssiLogoImage
				style={{
					resizeMode: 'cover',
					width: launchWidth,
					position: 'absolute',
					height: launchHeight,
				}}
				source={require('../AssisalOliveNotesAssets/AssisalOliveNotesImages/oliveBackgroundImageNotesAssis.png')}
			/>

			<AssiLoadRoot style={{
				zIndex: 10,
				alignSelf: 'center',
			}}>
				<JumpyTickerDots />
			</AssiLoadRoot>
		</AssiLoadRoot>
	);
};
export default OliassBootLoader;