import axios from 'axios'
import cookie from 'universal-cookie'
import Swal from 'sweetalert'
import { urlApi } from '../support/urlApi';


var objCookie =new cookie()
export const addToCart = (newProduct) => {
    return (dispatch) => {
        axios.get(urlApi + '/cart?id_user=' +newProduct.id_user + '&id_products=' +newProduct.id_products)
        .then((res)=>{
            console.log(res)
        if(res.data.length > 0){

            var quantity = res.data[0].qty + newProduct.qty
            axios.put(urlApi + '/cart/' + res.data[0].id, {...newProduct,qty:quantity})
            Swal('MASUK','add product success','success')
            .then((res)=>{
                axios.get(urlApi + '/cart?id_user=' +newProduct.id_user )
                .then ((res) => {
                    if(res.data.length > 0) {
                        dispatch ({
                            type : 'CART_SAVE',
                            payload : res.data
                        })
                    }
                })
                .catch((err)=>{
                    console.log (err)
                })
                objCookie.set('userDataCart', newProduct.id_user, {path:'/'} )

                
            
            
            })
            .catch((err)=>{
                console.log(err)
            })

        }else{
            axios.post(urlApi + '/cart', newProduct)
            .then((res)=>{
                axios.get(urlApi + '/cart?id_user=' +newProduct.id_user )
                .then ((res) => {
                    if(res.data.length > 0) {
                        dispatch ({
                            type : 'CART_SAVE',
                            payload : res.data
                        })
                    }
                })
                .catch((err)=>{
                    console.log (err)
                })
                objCookie.set('userDataCart', newProduct.id_user, {path:'/'} )


                
            
            
            })
            .catch((err)=> console.log(err))
        }
        
        })
        

    }
}

export const keepCart  = (id_user) => {
    return (dispatch)=>{
        axios.get(urlApi + '/cart?id_user=' +id_user)
        .then((res) => {
            if (res.data.length > 0 ) {
                dispatch({
                    type : 'CART_SAVE',
                    payload : res.data
                })
            }
        })
        .catch((err) => console.log(err))
    }
    
}
export const picCart = (param) =>{
    return{
        type : "PIC_CART",
        payload : param
    }
}

