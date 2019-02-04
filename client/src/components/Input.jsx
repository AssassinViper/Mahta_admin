import React, { Component } from 'react';

class Input extends Component {

    clear(){

        this.input.value = "";
    }

    state = {  }
    render() { 
        return ( 
            <input 
            placeholder={this.props.placeholder} 
            type={this.props.type || "text"}
            onChange={this.props.onChange}
            maxLength={this.props.maxLength || 200}
            ref={(ref)=>this.input=ref}
            
            style={{
                
                height:this.props.height,
                width:this.props.width,
                textAlign:'center',
                borderColor:'rgb(0, 0, 0)',
                padding:'4px 6px',
                backgroundColor:'rgba(1,1,1,0.4)',
                margin:15, 
                color:'white'}}>
              
            </input>
         );
    }
}
 
export default Input;