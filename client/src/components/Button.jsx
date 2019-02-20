import React, { Component } from 'react';

class Button extends Component {
    state = {  }

    render() { 

        return (
            <button style={{height:this.props.height, 
                width:this.props.width, 
                margin:15,
                fontFamily:'amp',
                fontWeight:'bold', 
                fontSize:24, 
                padding:'5px 15px',
                borderRadius:4, 
                borderWidth:0,
                boxShadow:'4px 4px 4px rgba(0,0,0,0.5)', 
                backgroundColor:'rgba(255,255,255,0.9)',
                borderColor:'rgba(255,255,255,0.9)', 
                color:'rgb(65,76,82)'}} 
            onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}
 
export default Button;