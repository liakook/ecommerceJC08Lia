import React from 'react'
import Carousel from './carousel'
import { connect } from 'react-redux'
import Product from './productList'

// di home ada 2x re render, tdk bny perubahan di Home : 
// render pertama : product di productlist 
// render kedua : carousel

class Home extends React.Component{
    state = {search : ''}
    onBtnClick = () => {
        var search = this.refs.searchBook.value
        this.setState({search : search})    // search kiri dari property dlm state, search yg kanan adl variabel ! setState di Home adl parent dari productList manggil pake .props
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 mt-4">
                        <div className="input-group mb-2">
                            <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... "  />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button" id="button-addon2" onClick={this.onBtnClick} ><i className="fas fa-search" /></button>
                            </div>
                        </div> 
                        <div className="card p-2">
                            
                            <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary  -1">Cari Produk</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari Produk"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari Toko</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari Toko"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari User</div>
                                <input className="form-control form-control-sm mb-2" placeholder="Cari User"></input> 

                                <button className="btn btn-info"><i class="fas fa-filter"></i> Filter</button>                               
                            </form>

                        </div>
                        
                    </div>
                
                    <div className="col-lg-9">
                        <div className="my-4">
                            <Carousel />
                        </div>
                        {this.props.id}
                    </div>
                </div>
                <Product search={this.state.search}/>        
            </div>
        )                           // search di dlm Product dipake untuk parent and child, productList adl child dari Home
    }
}

const mapStateToProps = (state) => {    // state merujuk ke index.js yg di reducers
    return {
            id : state.user.id
            }
    }

export default connect(mapStateToProps)(Home) // export pake defult jika function anonymous