import React from "react"
import api from "../services/api"
import AuthContext from "./auth"
import {useNavigation} from '@react-navigation/native'
import SelectMomentsData from '../data/select_moments.json'
import PersistedContext from "./Persisted"
import { colors } from "../layout/constants/colors"
import { notify } from "react-native-notificated"
import CheckIcon from '../assets/icons/svgs/check_circle.svg'

type StoreMomentsProps = {
    memory_id: number
}

type SelectMomentsProviderProps = {
    children: React.ReactNode
}

type Moment = {
    id: number
    midia: {
        fullhd_resolution: string
    }
}

type From = "NEW_MOMENT" |"NEW_MEMORY"
export type SelectMomentsContextsData = {
    title: string
    all_moments: Moment[]
    get_moments(): Promise<void>
    storeMemory(): Promise<void>
    storeMoments(): Promise<void>
    put_moment_on_list: () => void
    delete_moment_from_list: () => void
    endSession: () => void
    setTitle: React.Dispatch<React.SetStateAction<string>>
    setFrom: React.Dispatch<React.SetStateAction<From | ''>>
    selectedMoments: Moment[]
    memory_moments: Moment[]

}

const SelectMomentsContext = React.createContext<SelectMomentsContextsData>({} as SelectMomentsContextsData)

export function Provider({children}: SelectMomentsProviderProps) {
    const { session } = React.useContext(PersistedContext)
    const [ from, setFrom ] = React.useState<From | ''>('')
    const [allMoments, setAllMoments] = React.useState([])
    const [selectedMoments, setSelectedMoments] = React.useState<Moment[]>([])
    const [ title, setTitle ] = React.useState<string>('')

    const navigation = useNavigation()

    async function getMoments() {           
        try{
            await api.post(`/moment/get-user-moments/tiny?page=1&pageSize=10000`, { user_id: session.user.id })
            .then(function (response) {return setAllMoments(response.data.moments)})
            .catch(function (error) { console.log(error)})
        } catch(err) {
            console.error(err)
        }
    }

    async function storeMemory () {
        try{
            const response = await api.post(`/memory/create`, { user_id: session.user.id, title })
            .then(function (response) {
                notify('toast', {
                    params: {
                        description: 'Memory Has been created with success',
                        title: 'Memory Created',
                        icon: <CheckIcon fill={colors.green.green_05.toString()} width={15} height={15}/>
                    }
                })
                return response.data
            })
            .catch(function (error) { console.log(error)})
            await storeMoments(response.id)
        } catch(err) { console.error(err) } 
    }
    
    async function storeMoments (memory_id: number) {
        try{
            const filtered_moments = selectedMoments.map((item) => {return {id: item.id}})
            console.log('store_moments: ', memory_id, filtered_moments)
            await api.post(`/memory/add-moment`, { memory_id, moments_list: [...filtered_moments] })
            .then(function (response) { return response.data })
            .catch(function (error) { console.log(error)})   
            setSelectedMoments([])
            setTitle('') 
        } catch(err) { console.error(err) } 
    }

    async function putMomentOnList (moment: Moment) {
        const isMomentAlreadySelected = selectedMoments.some((m: Moment) => m.id === moment.id);
        if (!isMomentAlreadySelected) {
            setSelectedMoments(prevSelectedMoments => [...prevSelectedMoments, moment]);
        }
    }

    async function deleteMomentFromList (moment: Moment) {
        if(selectedMoments.length > 0) setSelectedMoments(prevSelectedMoments => prevSelectedMoments.filter((m: Moment) => m.id !== moment.id))
    }

    function endSession() {
        if(from == 'NEW_MOMENT') navigation.navigate('BottomTab', {screen: 'Home'})
        if(from == 'NEW_MEMORY') navigation.navigate('BottomTab', {screen: 'You'})
        setSelectedMoments([])
        setAllMoments([])
        setTitle('') 
    }

    const contextValue: any = {
        storeMemory,   
        storeMoments,
        get_moments: getMoments,
        put_moment_on_list: putMomentOnList,
        delete_moment_from_list: deleteMomentFromList,
        endSession,
        setFrom,
        setTitle,
        title,
        selectedMoments: selectedMoments,
        all_moments: allMoments,
        memory_moments: selectedMoments.slice(Math.max(selectedMoments.length - 3, 0)).reverse()
    }
    return (
        <SelectMomentsContext.Provider value={contextValue}>
            {children}
        </SelectMomentsContext.Provider>
    )
}
export default SelectMomentsContext