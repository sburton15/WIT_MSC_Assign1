import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {
    state = {loginName: <li><Link to="/Login">Log In</Link></li>};
componentWillMount() {
      // will trigger the callback function whenever the browser URL changes 
      // (as long as this component stays mounted)
      this.props.history.listen(() => {
      // Display new URL
      console.log('New URL', this.props.history.location.pathname);
      if (this.props.currentUserName !== ''){

        this.setState({loginName: <li><Link to="/Login">Log Out {this.props.currentUserName}</Link></li>});
      }
    });
  }

  render() {
      return (
        <div>
            <h1 id="title" > </h1>
                <div className="navbar navbar-inverse" >
                <div className="container">
                    <nav>
                        <ul className="nav navbar-nav navbar-left">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Restricted">Restricted Area</Link></li>
                            <li><Link to="/stock">Current Stock</Link></li>
                            <li><Link to="/customerOrder">Customer Orders</Link></li>
                            <li><Link to="/purchaseOrder">Purchase Orders</Link></li>                    
                        </ul>
                    </nav>
                    <nav>
                        <ul className="nav navbar-nav navbar-right">
                            {this.state.loginName}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
}

export default withRouter(Header);