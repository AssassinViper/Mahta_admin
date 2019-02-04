import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {GetReq} from '../helpers/HttpRequest';

function NeedAuth(component) {
  return class extends Component {

    state = {component:null};

    componentDidMount() {

      GetReq('http://admin.alphaproject.info/api/admin/checkToken')
      
      .then(res => {
        if (res.status === 200) {
          this.setState({component:<component {...this.props} />});
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