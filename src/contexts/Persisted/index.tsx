import React from 'react'
import { SessionDataType } from './types'
import { useUserStore } from './persistedUser'
import { useAccountStore } from './persistedAccount'
import { usePreferencesStore } from './persistedPreferences'
import AuthContext from '../auth'
import { useStatisticsStore } from './persistedStatistics'

type PersistedProviderProps = { children: React.ReactNode }
export type PersistedContextData = { session: SessionDataType }

const PersistedContext = React.createContext<PersistedContextData>({} as PersistedContextData)

export function Provider({ children }: PersistedProviderProps) {
    const { sessionData, signOut, checkIsSigned} = React.useContext(AuthContext)

    const sessionUser = useUserStore()
    const sessionAccount = useAccountStore()
    const sessionPreferences = usePreferencesStore()
    const sessionStatistics = useStatisticsStore()

    React.useEffect(() => {
        if(sessionData.user) sessionUser.setUser(sessionData.user)
        if(sessionData.account) sessionAccount.setAccount(sessionData.account)
        if(sessionData.preferences) sessionPreferences.setPreferences(sessionData.preferences)
        if(sessionData.statistics) sessionStatistics.setStatistics(sessionData.statistics)
    }, [sessionData])

    React.useEffect(() => {
        const isSigned = checkIsSigned()
        if(!isSigned) {
            sessionUser.removeUserFromStorage()
            sessionAccount.removeAccountFromStorage()
            sessionPreferences.removePreferencesFromStorage()
            sessionStatistics.removeStatisticsFromStorage()
        }
    }, [signOut])

    const contextValue: any = {
        session: {
            user: sessionUser,
            account: sessionAccount,
            preferences: sessionPreferences,
            statistics: sessionStatistics
        },
    }

    return <PersistedContext.Provider value={contextValue}>{children}</PersistedContext.Provider>
}

export default PersistedContext