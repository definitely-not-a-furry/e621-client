import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'

const haptic = (strength: number): void => {
  try {
    switch (strength) {
      case 1:
        impactAsync(ImpactFeedbackStyle.Light).catch(() => {})
        break
      case 2:
        impactAsync(ImpactFeedbackStyle.Medium).catch(() => {})
        break
      case 3:
        impactAsync(ImpactFeedbackStyle.Heavy).catch(() => {})
        break
      default:
        impactAsync().catch(() => {})
    }
  } catch { }
}

export default haptic
