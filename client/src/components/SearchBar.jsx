import React, { Component } from 'react';

import search from '../assets/icons/search.png';



class SearchBar extends Component {
    
    state = {  }

    searchWord="";
    
    render() { 
        return (
            <div style={s.con}>
                

                <button style={s.icon_con} onClick={()=>{this.props.searchBtnClick(this.searchWord)}}>
                    <img src={search}>
                    </img>
                </button>
              
                <div style={s.input_con}>
                    <input type="text" style={s.input} 
                    //onInput={()=>{this.props.searchBtnClick(this.searchWord)}}
                    onChange={(event)=>{this.searchWord = event.target.value}}/>
                </div>
                
            </div>
        );
    }
}

const s={
    
    con:{
        borderRadius:5,
        borderStyle:'solid',
        borderColor:'rgb(220,96,36)',
        borderWidth:1,
        height:'8%',
        width:'40%',
        display:'flex',
        background:'white',
        overflow: 'hidden',
    },

    icon_con:{
        height:'100%',
        width:'10%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        tint:'rgb(220,96,36)'
    },

    input_con:{
        height:'100%',
        width:'90%',
        overflow: 'hidden',
    },

    input:{

        height:'100%',
        width:'100%',
        padding:'0px 10px',
        borderWidth:0,
        textAlign:'right',
        fontFamily:'amp',
        fontSize:17,
        color:'rgb(220,96,36)',
    }
}
 
export default SearchBar;