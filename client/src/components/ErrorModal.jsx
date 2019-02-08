import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class ErrorModal extends Component {
    state = {  }
    render() { 
        return ( 
            <Modal styles={{modal:s.con}} open={this.props.open} onClose={this.props.onClose} center>
                <h2>{this.props.children}</h2>
            </Modal>
         );

    }
}

const s = {

    con:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'30%',
        borderRadius:5,
        borderStyle:'solid',
        borderColor:'#db3b3b',
        borderWidth:2,
    }
}
 
export default ErrorModal;