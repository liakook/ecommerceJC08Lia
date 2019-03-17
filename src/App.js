import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { Route , withRouter , Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'universal-cookie'
import { keepLogin,keepCart } from './1.actions'
import Product from './components/productList'
import ManageProduct from './components/admin/manageProduct'
import PageNotFound from './components/pageNotFound'
import ProductDetail from './components/productDetail'
import ScrollToTop from './components/scrollToTop'
import Cookie from 'universal-cookie'
import Cart from './components/cart'
import './App.css';

//withRouter fungsinya : untuk tersambung ke Reducer dengan connect, tp di dlm komponen ada routing.

const objCookie = new cookie()
class App extends Component {
  componentDidMount(){                        // componentDidMount ditaruh di App.js krn akan ke trigger di semua page!. 
    var whatever = objCookie.get('userdata')
    if (whatever !== undefined){
      this.props.keepLogin(whatever)
    }
    this.props.keepLogin(whatever)
  }

  render() {
    return (
      <div>
          <Navbar/>
          <ScrollToTop>
          <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/product' component={Product} exact/>
          <Route path='/manageproduct' component={ManageProduct} exact/>
          <Route path='/product-detail/:id' component={ProductDetail} exact/>
          <Route path='/cart' component={Cart} exact/>
          <Route path='/*' component={PageNotFound} exact/>
          </Switch>
          </ScrollToTop>
      </div>
    );
  }
}

export default withRouter(connect(null, {keepLogin})(App));
