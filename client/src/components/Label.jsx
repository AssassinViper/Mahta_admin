import React, { Component } from 'react';

class Label extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={s.con}>
                <div style={s.text}>{this.props.text}</div>
                <div style={s.label}>{" : "+this.props.label}</div>

            </div>
        );
    }
}

const s={

    con:{
        display:'flex',
        alignItems:'center',
        height:40,
        width:'95%',
        backgroundColor:'#a1a'
    },

    label:{
        
        textAlign:'right',
        height:'auto',
        width:'40%',
    },

    text:{
        //display:'flex',
        //alignItems:'center',
        textAlign:'right',
        padding:'auto',
        height:'auto',
        width:'60%',
    }
}
 
export default Label;