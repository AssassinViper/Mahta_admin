import React, { Component } from 'react';

class ScrollableList extends Component {
    state = { componentList:[] }

    componentDidMount(){

        //this.loadList(this.props.list);
    }

    render() { 
        return ( 
            <div style={s.con}>
                {this.state.componentList}
            </div>
         );
    }
}

const s ={

    con:{
        display:'flex',
        height:'100%',
        width:'100%',
        backgroundColor:'#51d'
    }
}
 
export default ScrollableList;