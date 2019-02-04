import React, { Component } from 'react';

import NavButton from './NavButton';
import logout from '../assets/icons/logout.png';


class Navbar extends Component {
    state = {  }
    render() { 
        return (
            <div style={s.con}>

                <button onClick={this.logout}>
                    <img src={logout} style={{transform:'scaleX(-1)'}}/>
                </button>

                <div style={s.logo_con}>

                    

                </div>

                <NavButton history={this.props.history} navTo="spendcredit" text="مصرف اعتبار"/>
                <NavButton history={this.props.history} navTo="commitgift" text="ثبت هدیه"/>
                <NavButton history={this.props.history} navTo="commitpurchase" text="ثبت خرید"/>
                <NavButton history={this.props.history} navTo="groupcommit" text="ثبت گروهی"/>
                <NavButton history={this.props.history} navTo="addstudent" text="دانش آموز جدید"/>
                <NavButton history={this.props.history} navTo="" text="لیست دانش آموزان"/>

            </div>
         );
    }

    logout=()=>{
        alert('loging out')
    }
}

const s = {

    con:{

        display:'flex',
        justifyContent:'space-between',
        height:80,
        width:1200,
        backgroundColor:'rgba(0,0,0,0.15)'
    },

    logo_con:{

        height:'100%',
        width:'20%',
        backgroundColor:'rgba(0,0,0,0.25)'
    }
}
 
export default Navbar;