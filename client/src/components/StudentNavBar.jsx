import React, { Component } from 'react';

import StudentNavButton from './StudentNavButton';
import NavButton from './NavButton';

const activeList = {
    spendcredit:false,
    commitgift:false,
    commitpurchase:false,
    info:false,
    edit:false,
    studentList:false
}

class StudentNavbar extends Component {

    state = { width: 0, height: 0, activeButtons:Object.assign({},activeList) }

    constructor(props) {
        super(props);
        this.state.activeButtons.info=true;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
      
    componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() { 

        return (
            <div style={{
                display:'flex',
                justifyContent:'center',
                margin:0,
                height:85,
                width:this.state.width,
                backgroundColor:'rgb(63,74,80)'
            }}>

            <div style={s.logo_con}>

            <a onClick={this.logout} style={s.logout}>خروج</a>

            <div style={s.icon}>
                <div unselectable style={{fontFamily:'ebhar', color:'white', 
                fontSize:55, userSelect: 'none' }}>ادمین&thinsp;</div>
                <div unselectable style={{fontFamily:'ebhar', color:'rgb(55, 110, 198)', 
                fontSize:55, userSelect: 'none' }}>مهتا</div>
            </div>
            
            </div>

                <StudentNavButton history={this.props.history} active={this.state.activeButtons.spendcredit} 
                activeButton={this.activeButton} navTo="spendcredit" text="مصرف اعتبار"/>
                <StudentNavButton history={this.props.history} active={this.state.activeButtons.commitgift} 
                activeButton={this.activeButton} navTo="commitgift" text="ثبت هدیه"/>
                <StudentNavButton history={this.props.history} active={this.state.activeButtons.commitpurchase} 
                activeButton={this.activeButton} navTo="commitpurchase" text="ثبت خرید"/>
                <StudentNavButton history={this.props.history} active={this.state.activeButtons.edit} 
                activeButton={this.activeButton} navTo="edit" text="ویرایش"/>
                <StudentNavButton history={this.props.history} active={this.state.activeButtons.info} 
                activeButton={this.activeButton} navTo="" text="مشخصات"/>
                <NavButton history={this.props.history} active={this.state.activeButtons.studentList} 
                activeButton={this.activeButton} navTo="" text="لیست دانش آموزان"/>

            </div>
         );
    }

    activeButton = (buttonName)=>{
        this.state.activeButtons = Object.assign({},activeList);
        this.state.activeButtons[buttonName] = true;
        this.setState(this.state);
    }

    logout=()=>{
        alert('loging out')
    }
}

const s = {

    con:{

        display:'flex',
        justifyContent:'space-between',
        height:'100%',
        width:1200,
        backgroundColor:'rgb(63,74,80)'
    },

    logo_con:{

        flexDirection:'row',
        display:'flex',
        justifyContent:'space-around',
        height:'100%',
        width:'20%',
    },

    icon:{

        flexDirection:'row',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },

    logout:{
        height:'30%',
        backgroundColor:'transparent',
        color:'rgb(55, 110, 198)',
        fontFamily:'amp',
        fontSize:15,
        padding:3,
        margin:4,
        borderRadius:4,
        borderWidth:1,
        borderStyle:'solid',
    }
}
 
export default StudentNavbar;