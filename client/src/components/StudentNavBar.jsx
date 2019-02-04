import React, { Component } from 'react';

import logout from '../assets/icons/logout.png';
import StudentNavButton from './StudentNavButton';
import NavButton from './NavButton';


class StudentNavbar extends Component {
    state = {  }
    render() { 
        return (
            <div style={s.con}>

                <button onClick={this.logout}>
                    <img src={logout} style={{transform:'scaleX(-1)'}}/>
                </button>

                <StudentNavButton history={this.props.history} navTo="spendcredit" text="مصرف اعتبار"/>
                <StudentNavButton history={this.props.history} navTo="commitgift" text="ثبت هدیه"/>
                <StudentNavButton history={this.props.history} navTo="commitpurchase" text="ثبت خرید"/>
                <StudentNavButton history={this.props.history} navTo="edit" text="ویرایش"/>
                <StudentNavButton history={this.props.history} navTo="" text="مشخصات"/>
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
}
 
export default StudentNavbar;