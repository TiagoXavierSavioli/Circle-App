import React from 'react'
import { View, FlatList, useColorScheme} from 'react-native'
import { Memory } from '../../../../components/memory'
import RenderMemory from '../../components/render-memory'
import sizes from '../../../../layout/constants/sizes'
import { colors } from '../../../../layout/constants/colors'
import RenderDate from '../../../../components/general/render-date'
import RenderMemoriesCount from '../../components/render-memories_count'
import Animated, { FadeInLeft } from 'react-native-reanimated'
type RenderMemoriesAllProps = {
    data: any,
    date_text: string,
    count: number, 
    enableScroll?: boolean,
    user_id: number
}
export function ListMemoriesAll ({
    data,
    date_text,
    count,
    user_id
}: RenderMemoriesAllProps) {

    const isDarkMode = useColorScheme() === 'dark'
    const memories = data
    
    const container: any = {
        width: sizes.screens.width,
    }
    const header_container: any = {
        flexDirection: 'row',
        height: sizes.sizes["2md"],
        width: sizes.screens.width,
        paddingHorizontal: sizes.paddings["1sm"],
        alignItems: 'center',
        justifyContent: 'center',
    }
    const content_container: any = {
        flexDirection: 'row',
        width: sizes.screens.width,
        paddingBottom: sizes.paddings['1lg'],
        borderBottomWidth: 1,
        borderColor: isDarkMode? colors.gray.grey_08: colors.gray.grey_02
    }
    const memories_container: any = {
        transform: [{scale: 0.82}],
        marginRight: -12,
        marginLeft: -20,
        marginTop: -20,
        marginBottom: -25,
    }

    return (
        <View style={container}>
            <View style={header_container}>
                <Memory.HeaderLeft>
                    <RenderDate date={date_text} scale={1.1}/>
                </Memory.HeaderLeft>
                <Memory.HeaderRight>
                    <RenderMemoriesCount count={count}/>
                </Memory.HeaderRight>                    
            </View>
            <FlatList
                style={content_container}
                data={memories.content}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return (
                    <Animated.View entering={FadeInLeft.duration(200)}>
                        <View style={memories_container}>
                            <RenderMemory memory={item} user_id={user_id} numOfMemories={memories.content.length}/>
                        </View>
                        
                    </Animated.View>
                    )
                }}
                ListHeaderComponent={() => { return <View style={{width: 15}}></View>}}
                ListFooterComponent={() => { return <View style={{width: 15}}></View>}}
            />
        </View>
    )
}