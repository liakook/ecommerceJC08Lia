const INITIAL_STATE = {id : "", username : "",error:"",loading:false, role : ""}

export default (state=INITIAL_STATE,action) => {  // anonymous function
    // if(action.type === 'LOGIN_SUCCESS'){
    //     return {...INITIAL_STATE,username : action.payload.username, role : action.payload.role}
    // }else if(action.type === 'LOADING'){
    //     return{...INITIAL_STATE,loading : true}
    // }else if(action.type === 'USER_NOT_FOUND'){
    //     return{...INITIAL_STATE , error : 'Username atau Password Salah!'}
    // }else if(action.type === 'SYSTEM_ERROR'){
    //     return {...INITIAL_STATE , error : 'System Error'}
    // }else if(action.type === 'RESET_USER'){
    //     return INITIAL_STATE
    // }else if(action.type === 'USERNAME_NOT_AVAILABLE'){
    //     return {...INITIAL_STATE, error : 'Username Not Available'}
    // }
    // else{
    //     return state
    // }
    
    switch(action.type){
        case 'LOGIN_SUCCESS' :
            return {...INITIAL_STATE, 
                username : action.payload.username , 
                role : action.payload.role, 
                id : action.payload.id}
        case 'LOADING' :
            return {...INITIAL_STATE, loading : true}
        case 'USER_NOT_FOUND' :
            return {...INITIAL_STATE , error : 'Username atau Password Salah!'}
        case 'SYSTEM_ERROR' :
            return {...INITIAL_STATE , error : 'System Error'}
        case 'RESET_USER' :
            return INITIAL_STATE
        case 'USERNAME_NOT_AVAILABLE' :
            return {...INITIAL_STATE, error : 'Username Not Available'}
        default :
            return state
    }
                                       // state yg di return adl object
                                       //... (titik 3) adl spreqd
}