import {combineReducers} from 'redux'
import User from './userGlobal'
import Product from './userGlobal'
import cart from './cartGlobal'

export default combineReducers({   // parameternya object pake {}
    user : User,
    product : Product,
    cart : cart
})

