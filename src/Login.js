import React from 'react';
import { Redirect } from 'react-router'

class Login extends React.Component {
    state = { value: this.props.userName,
              approved: false,
              errMessage:''};

  constructor(props) {
    super(props);
    console.log('Started Login');
  }

  handleNameChange =(event) => {
    this.setState({value: event.target.value});
    this.setState({errMessage:''});
  }

  loginHandler = ()=>{
    //validate login
    if (this.state.value !== null & this.state.value !== ''){
      this.props.handleLogin(this.state.value);
      this.setState({approved: true});
    }
    else{
      this.setState({errMessage:'User Name is required!'});
    }
  }  
  render() {
    if (this.state.approved){
      return <Redirect to={'/'} />
    }
    return (
      
        <div className="col-sm-10" >
          <div className="panel panel-primary">
            <div className="panel-heading text-center">
                Login
            </div>
            <div className="row">
            <div className="panel-body"> 
            <span className="col-sm-5">User Name: <input type="text" value={this.state.value} onChange={this.handleNameChange} /></span>
            <span className='errorMessage col-sm-5'>{this.state.errMessage}</span>
            </div>
            </div>
            <div className="panel-footer"> 
              <div className="btn-group btn-group-justified" role="group" aria-label="...">
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default" onClick={this.loginHandler}>Login</button>
                  </div>
              </div>                     
            </div>          
          </div>
        </div>
        )
    }
  }

export default Login;