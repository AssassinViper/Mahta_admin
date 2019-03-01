import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Button from './Button';

class YesNoModal extends Component {
    state = {  }
    render() { 
        return ( 
            <Modal styles={{modal:s.con, closeButton:{...{cursor:"pointer"}}}} open={this.props.open} onClose={this.props.onClose} showCloseIcon={false} center>
                <h2>{this.props.children}</h2>
                <div style={s.sec}>
                    <Button onClick={this.props.commit}>ثبت</Button>
                    <Button onClick={this.props.cancel}>لغو</Button>
                </div>
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
    },

    sec:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
}
 
export default YesNoModal;