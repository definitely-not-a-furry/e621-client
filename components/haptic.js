import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { Platform } from 'react-native'

const haptic = (strength) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        switch (strength) {
        case 1:
            impactAsync(ImpactFeedbackStyle.Light)
            break
        case 2:
            impactAsync(ImpactFeedbackStyle.Medium)
            break
        case 3:
            impactAsync(ImpactFeedbackStyle.Heavy)
            break
        default:
            impactAsync()
        }
    }
}

export default haptic
