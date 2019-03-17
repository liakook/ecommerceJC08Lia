import {urlApi} from '../support/urlApi'
import swal from 'sweetalert'
import Axios from 'axios';
import Cookie from 'universal-cookie'

var objCookie = new Cookie()
export const addToCart =(newProduct) => {
    return(dispatch)=>{
        Axios.get(urlApi + '/cart?id_user='
        +newProduct.id_user+'&id_product='
        +newProduct.id_product)
        .then((res) =>{
            console.log(res)
            if(res.data.length>0){
                var quantity = res.data[0].qty+newProduct.qty
                Axios.put(urlApi+'/cart'+ res.data[0].id, {...newProduct,qty:quantity})
                .then((res) => {
                    Axios.get(urlApi + '/cart?id_user=' + newProduct.id_user)
                    .then((res) => {
                        if(res.data.length > 0){
                            dispatch({
                                type : 'CART_SAVE',
                                payload : res.data
                            })
                        }
                    }) 
                    .catch((err) => console.log(err))
                    objCookie.set('userDataCart',newProduct.id_user,{path:'/'})
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                Axios.post(urlApi+'/cart', newProduct)
                .then((res) => {
                    Axios.get(urlApi + '/cart?id_user=' + newProduct.id_user)
                    .then((res) => {
                        if(res.data.length > 0){
                            dispatch({
                                type : 'CART_SAVE',
                                payload : res.data
                            })
                        }
                    }) 
                })
                .catch((err) => {
                    console.log(err)
                    objCookie.set('userDataCart',newProduct.id_user,{path:'/'})
                })
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

export const keepCart = (id_user) => {
    return(dispatch) => {
        Axios.get(urlApi +'/cart?id_user=' +id_user)
        .then((res)=>{
                dispatch({
                    type : 'CART_SAVE',
                    payload : res.data
                })
        })
        .catch((err) => console.log(err))
    }
}