import { useAppSelector } from '../hooks/hook'

export function authenticate() {
    const user = useAppSelector(state => state.user)
    if(user._id){
        return true
    }
    return false
}