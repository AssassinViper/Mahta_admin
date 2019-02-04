import React, { Component } from 'react';


class StudentNavButton extends Component {
    state = {  }
    render() { 
        return ( 
            <button style={s.con} onClick={this.goTo}>

                <p style={s.text}>{this.props.text}</p>

            </button>
        );
    }

    goTo = ()=>{

        if(this.props.navTo == ""){

            this.props.history.push('/student');

        }else{

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

        fontSize:20,
        fontColor:'white',
        textAlign:'center'
    }
}
 
export default StudentNavButton;