import React from 'react'
import { StatusBar,  useColorScheme } from 'react-native'
import { Text, View } from '../../../components/Themed'
import ColorTheme, { colors } from '../../../layout/constants/colors'

export default function MemoriesListMomentsScreen() {
  const isDarkMode = useColorScheme() === 'dark'

  const container  = {
    alignItems:'center',
    flex: 1,
    backgroundColor: colors.gray.black
  }
  return (
    <View style={container}>
      <StatusBar backgroundColor={String(colors.gray.black)} barStyle={'light-content'}/>
      <Text> list moments screen</Text>
    </View>
  )
}