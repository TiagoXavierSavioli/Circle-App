import { BlurView } from "@react-native-community/blur"
import React from "react"
import { Animated, Pressable, View } from "react-native"
import LikeIcon from "../../../assets/icons/svgs/heart.svg"
import MemoryContext from "../../../contexts/memory"
import PersistedContext from "../../../contexts/Persisted"
import NumberConversor from "../../../helpers/numberConversor"
import ColorTheme, { colors } from "../../../layout/constants/colors"
import fonts from "../../../layout/constants/fonts"
import sizes from "../../../layout/constants/sizes"
import api from "../../../services/api"
import { Text } from "../../Themed"
import MomentContext from "../context"
import { MomentLikeProps } from "../moment-types"

export default function like({
    isLiked,
    backgroundColor = String(ColorTheme().blur_button_color),
    paddingHorizontal = sizes.paddings["2sm"],
    margin = sizes.margins["1sm"],
}: MomentLikeProps) {
    const { session } = React.useContext(PersistedContext)
    const { memory } = React.useContext(MemoryContext)
    const { momentData, momentUserActions } = React.useContext(MomentContext)
    const [likedPressed, setLikedPressed] = React.useState(
        isLiked ? isLiked : momentUserActions.liked
    )
    var animatedScale = React.useRef(new Animated.Value(1)).current
    var animatedScaleIconPressed = React.useRef(new Animated.Value(1)).current
    var animatedScaleIcon = React.useRef(new Animated.Value(1)).current

    React.useEffect(() => {
        animatedScale.setValue(1)
    }, [])
    const HandleButtonAnimation = () => {
        animatedScale.setValue(0.8)
        Animated.spring(animatedScale, {
            toValue: 1,
            bounciness: 12,
            speed: 10,
            useNativeDriver: true,
        }).start()

        animatedScaleIconPressed.setValue(0.4)
        animatedScaleIcon.setValue(0.4)
        Animated.spring(animatedScaleIconPressed, {
            toValue: 1,
            bounciness: 12,
            speed: 8,
            useNativeDriver: true,
        }).start()

        animatedScaleIcon.setValue(1.4)
        Animated.spring(animatedScaleIcon, {
            toValue: 1,
            bounciness: 12,
            speed: 10,
            useNativeDriver: true,
        }).start()
    }
    React.useEffect(() => {
        if (momentUserActions.liked) {
            setLikedPressed(true)
            HandleButtonAnimation()
        } else {
            setLikedPressed(false)
            HandleButtonAnimation()
        }
    }, [momentUserActions.liked])

    const container: any = {
        minWidth: sizes.buttons.width / 4,
        height: sizes.buttons.height / 2,
        borderRadius: Number([sizes.buttons.width / 4]) / 2,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal,
        backgroundColor: "transparent",
        borderWidth: sizes.borders["1md"],
        borderColor: colors.transparent.white_30,
        overflow: "hidden",
    }
    const like_text_pressed: any = {
        fontSize: fonts.size.body,
        fontFamily: fonts.family.Bold,
        color: colors.gray.white,
        marginLeft: sizes.margins["1sm"],
    }
    const like_text: any = {
        fontSize: fonts.size.body,
        fontFamily: fonts.family.Bold,
        color: colors.gray.white,
        marginLeft: sizes.margins["1sm"],
    }
    const blur_container: any = {
        backgroundColor: ColorTheme().blur_button_color,
    }
    const blur_container_background_color: any = {
        backgroundColor: backgroundColor,
    }
    const blur_container_likePressed: any = {
        backgroundColor: ColorTheme().like,
    }
    const pressable_container: any = {
        overflow: "hidden",
        borderRadius: Number([sizes.buttons.width / 4]) / 2,
    }
    const animated_container: any = {
        width: sizes.buttons.width / 4,
        height: sizes.buttons.height / 2,
        margin,
        transform: [{ scale: animatedScale }],
    }
    const icon_container: any = {
        transform: [{ scale: animatedScaleIcon }],
        paddingRight: 4,
    }
    const icon_container_pressed: any = {
        transform: [{ scale: animatedScaleIconPressed }],
        paddingRight: 4,
    }

    async function onLikeAction() {
        momentUserActions.handleLikeButtonPressed({ likedValue: true })
        HandleButtonAnimation()
        setLikedPressed(true)
        await api
            .post("/moment/like", {
                user_id: session.user.id,
                moment_id: momentData.id,
            })
            .catch((error) => console.log(error))
    }
    async function onUnlikeAction() {
        momentUserActions.handleLikeButtonPressed({ likedValue: false })
        HandleButtonAnimation()
        setLikedPressed(false)
        await api
            .post("/moment/unlike", {
                user_id: session.user.id,
                moment_id: momentData.id,
            })
            .catch((error) => console.log(error))
    }

    const like_fill: string = String(colors.gray.white)
    const like_number: string = NumberConversor(Number(momentData.statistics.total_likes_num))
    const like_number_pressed: string = NumberConversor(
        Number(momentData.statistics.total_likes_num) + 1
    )

    if (momentData.user?.id == session.user.id) return null
    if (memory?.isAccountScreen) return null
    if (likedPressed) {
        return (
            <Animated.View style={animated_container}>
                <Pressable onPress={() => onUnlikeAction()} style={pressable_container}>
                    <View style={blur_container_likePressed}>
                        <View style={container}>
                            <Animated.View style={icon_container_pressed}>
                                <LikeIcon fill={like_fill} width={20} height={20} />
                            </Animated.View>
                            <Text style={likedPressed ? like_text_pressed : like_text}>
                                {like_number_pressed}
                            </Text>
                        </View>
                    </View>
                </Pressable>
            </Animated.View>
        )
    }
    if (backgroundColor) {
        return (
            <Animated.View style={animated_container}>
                <Pressable onPress={() => onLikeAction()} style={pressable_container}>
                    <View style={blur_container_background_color}>
                        <View style={container}>
                            <Animated.View style={icon_container}>
                                <LikeIcon fill={like_fill} width={14} height={14} />
                            </Animated.View>
                            <Text style={likedPressed ? like_text_pressed : like_text}>
                                {like_number}
                            </Text>
                        </View>
                    </View>
                </Pressable>
            </Animated.View>
        )
    } else {
        return (
            <Animated.View style={animated_container}>
                <Pressable onPress={() => onLikeAction()} style={pressable_container}>
                    <BlurView
                        overlayColor={String(colors.transparent.black_00)}
                        blurAmount={sizes.blur.blurAmount}
                        style={blur_container}
                    >
                        <View style={container}>
                            <Animated.View style={icon_container}>
                                <LikeIcon fill={like_fill} width={14} height={14} />
                            </Animated.View>
                            <Text style={likedPressed ? like_text_pressed : like_text}>
                                {like_number}
                            </Text>
                        </View>
                    </BlurView>
                </Pressable>
            </Animated.View>
        )
    }
}
