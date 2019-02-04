import React, { Component } from 'react';

class PlainText extends Component {

    state = {  }
    
    clear(){
        this.textarea.value="";
    }

    render() { 
        return ( 
            <textarea placeholder={this.props.placeholder} type="text" onChange={this.props.onChange}
            maxLength={2000} ref={ref=>this.textarea=ref}
            
            style={{
                
                height:this.props.height,
                width:this.props.width,
                verticalAlign:'top',
                textAlign:'right',
                borderColor:'rgb(0, 0, 0)',
                padding:'4px 6px',
                backgroundColor:'rgba(1,1,1,0.4)',
                margin:15,
                color:'white'
                
            }}>
              
            </textarea>
         );
    }
}
 
export default PlainText;