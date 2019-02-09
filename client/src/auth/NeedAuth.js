import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

function NeedAuth(Comp) {
  return class extends Component {

    state = {component:null};

    componentDidMount() {
      // TODO: change this to POST
      fetch('/api/admin/checkToken',{
        method:"POST",
        body: "",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
        })
      .then(res => {
        if (res.status === 200) {
          this.setState({component:<Comp {...this.props} />});
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({component:<Redirect to="/auth" />});
      });
    }


    render() {
      
        return(<div>{this.state.component}</div>);
    }
  }
}

export default NeedAuth;