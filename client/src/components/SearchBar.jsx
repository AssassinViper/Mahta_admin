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
                    onInput={()=>{this.props.searchBtnClick(this.searchWord)}}
                    onChange={(event)=>{this.searchWord = event.target.value}}/>
                </div>
                
            </div>
        );
    }
}

const s={
    
    con:{
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
    },

    input_con:{
        height:'100%',
        width:'90%',
        overflow: 'hidden',
        backgroundColor:'blue'
    },

    input:{

        height:'100%',
        width:'100%',
        padding:'0px 10px',
        borderWidth:0,
        textAlign:'right',
    }
}
 
export default SearchBar;