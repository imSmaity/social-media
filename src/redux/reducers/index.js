import userLogin from '../reducers/userLogin'
import {combineReducers} from 'redux'
import updateRefresh from './updateRefresh'


const rootReducer=combineReducers({
    userLogin,
    updateRefresh
})

export default rootReducer