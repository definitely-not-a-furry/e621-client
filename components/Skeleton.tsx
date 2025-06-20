import React from 'react'
import type { DimensionValue } from 'react-native'
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated'

const Skeleton = ({ width, height, style }: { width: DimensionValue, height: DimensionValue, style?: any }): JSX.Element => {
  const opacity = useSharedValue(0.5)

  opacity.value = withRepeat(
    withTiming(1, { duration: 1000 }),
    -1,
    true
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  return (
    <Animated.View
      style={[
        { backgroundColor: '#e1e1e1', borderRadius: 4, overflow: 'hidden', marginVertical: 4 },
        { width, height },
        style,
        animatedStyle
      ]}
    />
  )
}

export default Skeleton
