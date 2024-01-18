import React from "react"

export type userReciveDataProps = {
    id: Number,
    username: String,
    verifyed: Boolean,
    profile_picture: {
        small_resolution: String,
        tiny_resolution: String
    }
}

export type UserRootProps = {
    data: userReciveDataProps
    children: React.ReactNode
}

export type UserUsernameProps = {
    displayOnMoment?: boolean,
    disableAnalytics?: boolean,
    truncatedSize?: number,
    color?: String,
    fontSize?: number,
    fontFamily?: String,
    margin?: number,
    onClickAction?: () => void,
    scale?: number
}

export type UserProfilePictureProps = {
    pictureDimensions: {
        width: Number,
        height: Number
    }
    displayOnMoment?: boolean,
    disableAnalytics?: boolean,
    isLoading?: Boolean
    onClickAction?: () => void
}

export type actionsProps = {
    follow: () => void,
    unfollow: () => void,
    view_profile: () => void
}

export type UserFollowButtonProps = {
    isFollowing: Boolean,
    displayOnMoment?: boolean,
    hideOnFollowing?: boolean
}
