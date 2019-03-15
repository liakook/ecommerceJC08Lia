import React from 'react'
import { Link , Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogin } from './../1.actions'
import Loader from 'react-loader-spinner'
import cookie from 'universal-cookie'

// MENYIMPAN DATA DI BROWSER
const Cookie = new cookie()

class Login extends React.Component{

  // KE TRIGGER KALO ADA PERUBAHAN PROPS YAITU GLOBAl STATE
    componentWillReceiveProps(newProps){                    // ke trigger setelah ada perubahan di Global State
        Cookie.set('userdata',newProps.username,{path : '/'})                 // .set adalah method : function yg ada di dlm object
                                                                // guna /path -> untuk bisa akses di semua routing
                                                                // '/' ini berarti redirect ke homepage
    }

    onBtnLoginClick = () => {
        var username = this.refs.username.value
        var password = this.refs.password.value
        this.props.onLogin(username,password)    // parameter connect dgn yg di actions onLogin userActions.js

    }

    renderBtnOrLoading = () => {                // jika ada perubahan akan re render!, menjlnkan render ulang
        if(this.props.loading === true){
            return <Loader                  // loader di ambil dari demo react-loader-spinner website
            type="Audio"
            color="#00BFFF"
            height="50"	
            width="50"
            />
        }else{
            return <button type="button" className="btn btn-primary" onClick={this.onBtnLoginClick} style={{width:"300px"}} ><i className="fas fa-sign-in-alt" /> Login</button>
        }
    }

    renderErrorMessage = () => {
        if(this.props.error !== ""){                                    // ambil dari global state
            return <div class="alert alert-danger mt-3" role="alert">
                    {this.props.error}
                </div>
        }
    }
    render(){
        if(this.props.username !== ''){
            return <Redirect to='/'/>
        }
        return(
            <div className="container myBody" style={{minHeight:"600px"}}>
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3" >
                    
                    <form className="border mb-3" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
                        <fieldset>
                            
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                <input type="text" ref="username" className="form-control" id="inputEmail" placeholder="Username" required autoFocus/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-12" style={{textAlign:'center'}}>
                                    {this.renderBtnOrLoading()}
                                    {this.renderErrorMessage()}
                                </div>
                                    
                            </div>
                            <div className="btn my-auto"><p>Don't have Account? <Link to="/register" className="border-bottom">Sign Up!</Link></p></div>
                        </fieldset>
                    </form>
                    
                </div>                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        username : state.user.username,   // user dari index.js reducer, username dari userGlobal
        loading : state.user.loading,
        error : state.user.error,
    }
}


export default connect(mapStateToProps,{ onLogin })(Login) // tidak ada mapStateToProps makanya pake null!