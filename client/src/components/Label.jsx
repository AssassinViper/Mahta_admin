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
        height:50,
        width:'95%',
        
    },

    label:{
        color:'white',
        fontFamily:'amp',
        fontSize:16,
        textAlign:'right',
        width:'40%',
        paddingTop:2,
        paddingBottom:2
    },

    text:{
        color:'white',
        fontFamily:'amp',
        fontSize:20,
        textAlign:'right',
        width:'60%',
        paddingTop:2,
        paddingBottom:2,
    }
}
 
export default Label;