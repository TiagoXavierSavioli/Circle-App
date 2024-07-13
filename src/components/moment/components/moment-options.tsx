import React from "react"
import { useColorScheme, View } from "react-native"
import { useNotifications } from "react-native-notificated"
import CheckIcon from "../../../assets/icons/svgs/check_circle.svg"
import BottomSheetContext from "../../../contexts/bottomSheet"
import { BottomTabsProps } from "../../../contexts/bottomTabs"
import PersistedContext from "../../../contexts/Persisted"
import LanguageContext from "../../../contexts/Preferences/language"
import ColorTheme, { colors } from "../../../layout/constants/colors"
import fonts from "../../../layout/constants/fonts"
import sizes from "../../../layout/constants/sizes"
import api from "../../../services/Api"
import ButtonStandart from "../../buttons/button-standart"
import { MemoryReciveDataProps } from "../../Memory/Memory-types"
import { Text } from "../../Themed"
import { MomentOptionsState } from "../context/momentOptions"
import { MomentDataProps } from "../context/types"
type OptionsProps = {
    memory: MemoryReciveDataProps
    currentTab: BottomTabsProps
    momentOptions: MomentOptionsState
    momentData: MomentDataProps
}

export default function options({ memory, currentTab, momentOptions, momentData }: OptionsProps) {
    const isDarkMode = useColorScheme() === "dark"
    const { collapse } = React.useContext(BottomSheetContext)
    const { t } = React.useContext(LanguageContext)
    const { notify } = useNotifications()
    const { session } = React.useContext(PersistedContext)
    const width =
        sizes.screens.width - (sizes.paddings["2sm"] * 2 + sizes.bottomSheet.marginHorizontal * 2)

    async function handleDeleteFromMemoryPress() {
        await api
            .post("/memory/remove-moment", {
                memory_id: memory.id,
                moment_id: momentData.id,
                user_id: session.user.id,
            })
            .then(() => {
                notify("toast", {
                    params: {
                        description: t("Moment has been deleted with success"),
                        title: t("Moment deleted"),
                        icon: (
                            <CheckIcon
                                fill={colors.green.green_05.toString()}
                                width={15}
                                height={15}
                            />
                        ),
                    },
                })
                collapse()
            })
    }

    const textStyle = {
        color: colors.red.red_05,
        fontSize: fonts.size.body,
        fontFamily: fonts.family.Medium,
    }

    const descriptionStyle: any = {
        color: ColorTheme().textDisabled,
        fontSize: fonts.size.body * 0.7,
        fontFamily: fonts.family.Medium,
    }

    const textsContainer: any = {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: sizes.margins["1md"],
    }

    console.log(memory, currentTab, momentOptions)
    return (
        <View>
            <View style={textsContainer}>
                <Text style={[descriptionStyle]}>
                    {t("The Moment will only be removed from this memory.")}
                </Text>
                <Text style={[descriptionStyle, { fontSize: fonts.size.body * 0.56 }]}>
                    *
                    {t(
                        "If the memory only has this moment and you remove it, the memory will be deleted."
                    )}
                </Text>
            </View>

            <ButtonStandart
                animationScale={0.9}
                bounciness={5}
                margins={false}
                width={width}
                borderRadius={10}
                height={sizes.buttons.height / 1.5}
                action={handleDeleteFromMemoryPress}
            >
                <Text style={textStyle}>
                    {t("Delete Moment from")} "{memory.title}"
                </Text>
            </ButtonStandart>
        </View>
    )
}
