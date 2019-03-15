import {combineReducers} from 'redux'
import User from './userGlobal'
import Product from './userGlobal'

export default combineReducers({   // parameternya object pake {}
    user : User,
    product : Product
})

