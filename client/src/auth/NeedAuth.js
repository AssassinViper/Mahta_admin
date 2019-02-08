import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {GetReq} from '../helpers/HttpRequest';

function NeedAuth(Comp) {
  return class extends Component {

    state = {component:null};

    componentDidMount() {

      GetReq('/api/admin/checkToken')
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