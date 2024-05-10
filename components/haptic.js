import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'

export default haptic = (strength) => {
    try {
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
    } catch {}
}
