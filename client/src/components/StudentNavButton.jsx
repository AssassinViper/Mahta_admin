import React, { Component } from 'react';


class StudentNavButton extends Component {
    state = {backgroundColor:'transparent'}
    render() { 

        //alert(this.props.navTo+" : "+this.props.active);
        
        if(this.props.active){
            this.state.backgroundColor="rgb(55, 110, 198)";
        }else{
            this.state.backgroundColor="transparent";
        }

        return ( 
            <button style={{
                cursor:'pointer',
                height:'100%',
                width:'12%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:this.state.backgroundColor,
            }}
             onClick={this.goTo}>

                <p style={s.text}>{this.props.text}</p>

            </button>
        );
    }

    goTo = ()=>{

        if(this.props.navTo == ""){
            this.props.activeButton('info');
            this.props.history.push('/student');
        }else{
            this.props.activeButton(this.props.navTo);
            this.props.history.push('/student/'+this.props.navTo);
        }
    }
}

const s = {

    con:{

        height:'100%',
        width:'12%',
        backgroundColor:'rgba(0,0,0,0.2)',
    },

    text:{

        cursor:'pointer',
        fontFamily:'amp',
        fontSize:20,
        color:'white',
        textAlign:'center',
    }
}
 
export default StudentNavButton;