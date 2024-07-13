import React from "react"
import { useColorScheme, View } from "react-native"
import LanguageContext from "../../../../contexts/Preferences/language"
import NumberConversor from "../../../../helpers/numberConversor"
import ColorTheme from "../../../../layout/constants/colors"
import fonts from "../../../../layout/constants/fonts"
import sizes from "../../../../layout/constants/sizes"
import { Text } from "../../../Themed"
import { useProfileContext } from "../../profile-context"
import { ProfileStatisticsLikesProps } from "../../profile-types"

export default function statistics_likes({}: ProfileStatisticsLikesProps) {
    const { user } = useProfileContext()
    const { t } = React.useContext(LanguageContext)
    const isDarkMode = useColorScheme() === "dark"

    const container: any = {
        width: sizes.screens.width / 4,
        marginTop: sizes.margins["1sm"],
        alignItems: "center",
        justifyContent: "center",
    }

    const num_style: any = {
        fontFamily: fonts.family.Bold,
        fontSize: fonts.size.headline,
        color: ColorTheme().text,
    }
    const text_style: any = {
        top: 1,
        fontFamily: fonts.family.Semibold,
        fontSize: fonts.size.body * 0.8,
        color: ColorTheme().textDisabled,
    }
    return (
        <View style={container}>
            <Text style={num_style}>{NumberConversor(user.statistics.total_likes_num)}</Text>
            <Text style={text_style}>{t("Likes")}</Text>
        </View>
    )
}
