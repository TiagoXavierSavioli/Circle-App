import React from 'react'
import sizes from '../../../layout/constants/sizes'
import { NotificationProps } from '../../../components/notification/notification-types'
import { Notification } from '../../../components/notification'
import { UserShow } from '../../../components/user_show'
import { Text } from '../../../components/Themed'
import { View } from 'react-native'
import { MidiaRender } from '../../../components/midia_render'

type renderNotificationProps = {
    notification: NotificationProps,
}

export default function render_notification ({notification}: renderNotificationProps) {
    return (
        <View style={{paddingVertical: sizes.paddings['2sm']}}>
            <Notification.Container.Main notification={notification}>
                <Notification.Container.Left>
                    <UserShow.Root data={notification.sender_user}>
                        <UserShow.ProfilePicture pictureDimensions={{width: 50, height: 50}} displayOnMoment={false}/>
                    </UserShow.Root>
                    <Notification.Seal/>
                </Notification.Container.Left>
                <Notification.Container.Center>
                    <Notification.Text/>
                </Notification.Container.Center>
                <Notification.Container.Right>
                    { notification.midia?
                        <MidiaRender.Root data={notification.midia} content_sizes={sizes.moment.micro}>
                            <MidiaRender.RenderImage/>
                        </MidiaRender.Root>
                        :
                        <UserShow.Root data={notification.sender_user}>
                            <UserShow.FollowButton isFollowing={notification.you_follow}/>
                        </UserShow.Root>
                    }

                </Notification.Container.Right>
            </Notification.Container.Main>            
        </View>

    )
}