import React from "react"
import { useColorScheme } from "react-native"
import { colors } from "../../../layout/constants/colors"
import { ProfilePictureProps } from "../profile-types"
import { useProfileContext } from "../profile-context"
import sizes from "../../../layout/constants/sizes"
import { Pressable } from "react-native"
import FastImage from "react-native-fast-image"

export default function picture ({
}: ProfilePictureProps) {

    const { user } = useProfileContext()
    const isDarkMode = useColorScheme() === "dark"
    const pictureDimensions = {
        width: 100,
        height: 100,
        padding: 10,
        borderRadius: 133/2,
    }
    const outlineSize: Number = Number(Number(pictureDimensions.width)/20)// /6

    const container: any = {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: sizes.margins["1sm"],
        borderRadius: + Number([Number(pictureDimensions.width) + Number(outlineSize)]) /2,
        backgroundColor: isDarkMode? colors.gray.grey_06: colors.gray.grey_02,
        width: Number(pictureDimensions.width) + Number(outlineSize),
        height: Number(pictureDimensions.height) + Number(outlineSize),
    }
    async function onProfilePictureAction() {
    }

    return (
        <Pressable onPress={onProfilePictureAction} style={container}>
            <FastImage
                source={{ uri: String(user.profile_picture.fullhd_resolution) || '' }}
                style={{
                    width: Number(pictureDimensions.width),
                    height: Number(pictureDimensions.height),
                    borderRadius: Number(pictureDimensions.width)/2,
                    position: 'absolute',
                    top: Number(outlineSize)/2,
                    left: Number(outlineSize)/2
                }}
            />
        </Pressable>
    )
}