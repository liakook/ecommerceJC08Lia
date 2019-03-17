import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { connect } from 'react-redux';
import { addToCart } from '../1.actions';

class ProductDetail extends React.Component{
    state = {product : {}}
    componentDidMount(){
        this.getDataApi()
    }
    getDataApi = () => {
        var idUrl = this.props.match.params.id
        Axios.get(urlApi+'/products/' + idUrl)
        .then((res) => {
            this.setState({product : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    qtyValidation = () => {
        var qty = this.refs.inputQty.value
        if(qty<1){
            this.refs.inputQty.value = 1
        }
    }

    addToCart = () => {
        var qty = parseInt(this.refs.inputQty.value)
        var deskripsi = this.refs.deskripsi.value
        var newObj = {}

        newObj={...this.state.product, id_product:this.state.product.id,id_user : this.props.id, qty:qty, deskripsi}
        delete newObj.id
        this.props.addToCart(newObj)
    }

    render(){
        var {nama,img,discount,deskripsi,harga} = this.state.product
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                    <div className="card" style={{width: '100%'}}>
                        <img className="card-img-top" src={img} alt="Card image cap" />
                        <div className="card-body">
                        </div>
                    </div>
                    </div>

                    <div className='col-md-8'>
                        <h1 style={{color:'#4C4C4C'}}>{nama}</h1>
                        <div style={{backgroundColor:'#D50000',
                                     width:"50px",
                                     height:'22px',
                                     color : 'white',
                                     textAlign:'center',
                                     display:'inline-block'}} >
                            {discount}%
                        </div>
                        <span style={{fontSize:'12px',
                                      fontWeight:'600',
                                      color:'#606060',
                                      marginLeft:'10px',
                                      textDecoration:'line-through'}}> Rp. {harga} </span>

                        <div style={{fontSize:'24px',
                                     fontWeight : '700',
                                     color:'#FF5722',
                                     marginTop:'20px'}}>Rp. {harga - (harga * (discount/100))}</div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'15px',
                                        color:'#606060',
                                        fontWeight:'700',
                                        fontSize:'14px'}}>Jumlah</div>
                                <input type='number' onChange={this.qtyValidation} ref='inputQty' min={1} className='form-control' style={{width : '60px',
                                                                                              marginTop:'10px'}} />
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'15px',
                                            color:'#606060',
                                            fontWeight:'700',
                                            fontSize:'14px'}}>Catatan Untuk Penjual (Opsional)
                                </div>
                                <input type='text' style={{marginTop:'13px'}} placeholder='Contoh Warna Putih, Ukuran XL, Edisi Kedua' className='form-control'/>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-8'>
                                <p style={{color:'#606060',fontStyle:'italic'}}>{deskripsi}</p>
                            </div>

                        </div>

                        {this.props.username === ""
                        ?
                            <div className='row mt-4'>
                                <input disabled className='btn border-secondary col-md-2' value='Add To Wishlist' />
                                <input disabled className='btn btn-primary col-md-3' value='Beli Sekarang' />
                                <input disabled className='btn btn-success col-md-3' value='Masukan Ke Keranjang' />
                            </div>

                        :

                            <div className='row mt-4'>
                                <input className='btn border-secondary col-md-2' value='Add To Wishlist' />
                                <input className='btn btn-primary col-md-3' value='Beli Sekarang' />
                                <input className='btn btn-success col-md-3' value='Masukan Ke Keranjang' />
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return{
        username : state.user.username,
        id : state.user.id,
        cart : state.cart.cart
    }
}

export default connect(mapStateToProps,{addToCart})(ProductDetail);  
// connect adl sebuah function yg return function