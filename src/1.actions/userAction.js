import axios from 'axios'
import {urlApi} from './../support/urlApi'
import cookie from 'universal-cookie'

const objCookie = new cookie()
export const onLogin = (paramUsername,paramPassword) => {  // paramUsername,paramPassword connect dgn login.js src
    return(dispatch) => {                           // ada dr apply Middle Ware (Redux Thunk -> mengubah promise asynchronus)
    // INI UNTUK MENGUBAH LOADING MENJADI TRUE
    dispatch({
        type: 'LOADING',
    })

    // GET DATA DARI FAKE API , MASUK KE THEN
    axios.get(urlApi + '/users',
        {params:{username:paramUsername,                     // yg kirim itu dari database, yg kanan dari parameter di atas!, param di convert di url website jadi '?'
                password:paramPassword}})   
    .then((res) => {
        console.log(res)

    // IF USERNAME DAN PASSWORD SESUAI MAKA RES.DATA ADA ISINYA
        if(res.data.length > 0){
            dispatch(
                {
                    type: 'LOGIN_SUCCESS',
                    payload : {                             // payload bisa berisi object, string, dll. Berfungsi kirim data ke global state
                        username : res.data[0].username, // di dlm [0] krn data cuma 1, berarti index ke 0
                        role : res.data[0].role,        // res.data[0] (res.data plus index keberapa) dapatnya object, klo res.data doang dptnya array
                        id : res.data[0].id
                }
            }
            )  
        }else{
            dispatch({
                type : 'USER_NOT_FOUND'
            })
        }
    })
    .catch((err) => {
        dispatch({
            type : 'SYSTEM_ERROR'
        })
    }

    )
}
}

export const keepLogin = (cookie) => {
    return(dispatch) => {
    axios.get(urlApi + '/users',{params : {username : cookie}})  // username dari API json server
    .then((res) => {
        if(res.data.length > 0){
            dispatch({
                type : 'LOGIN_SUCCESS',
                payload : { 
                    username : res.data[0].username, 
                    role : res.data[0].role,
                    id : res.data[0].id
                    }
            })
        }
        })
        .catch ((err) => console.log(err))
    }
}
   
export const cookieChecked = () => {
    return  {
        type : 'COOKIE_CHECKED'
    }
}

export const resetUser = () => {
    return {
        type : 'RESET_USER'
    }
}

export const userRegister = (user,pass,mail,ph) => {
    return(dispatch)=>{
        dispatch({
            type : 'LOADING'
        })
        var newData = {username : user, password : pass, email : mail, phone : ph}
        axios.get(urlApi + '/users?username=' + newData.username)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'USERNAME_NOT_AVAILABLE'
                })
            }else{
                axios.post(urlApi + '/users',newData)
                .then((res) => dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : user
                },
                    objCookie.set('userData',user,{path : '/'})
                ))
                .catch((err) => console.log(err))
            }
        })
        .catch((err) => {
            dispatch({
                type : 'SYSTEM_ERROR'
            })
        })
    }
}

export const loginWithGoogle = (email) => {
    return(dispatch) => {
        axios.get(urlApi + '/users?username=' + email)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data[0]
                    // res.data[0] dpt semua property: password, user, id, role di db.json
                },
                    objCookie.set('userData',email,{path : '/'})
                )
            }else{
                // klo di .post -> res.data adl object
                axios.post(urlApi + '/users', {username : email,role : 'user'})
                .then((res) => {
                    dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload : res.data
                    },
                        objCookie.set('userData',email,{path : '/'})
                    )
                }
                )
                .catch((err) => {
                    console.log(err)
                })
            }
            })
        .catch((err) => {
            console.log(err)
        })
    }
}


// userRegister('Fikri','123','fikri@gmail.com','0812381234')

// username di kiri dr API, paramUsername dari parameter di atasnya
    
    // .then di dalamnya ada callback function 
                // klo arrow function cuma satu baris tanpa {} bisa!
    
    // jika temukan property yg ditulis cuma satu kali misalnya : password ditlis 1x, maka berarti property di API dan parameter di atasnya sama
                                            /*promise : .then dan  .catch*/
