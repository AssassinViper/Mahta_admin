import React, { Component } from 'react';

import StudentListItem from './StudentListItem';

class StudentList extends Component {
    state = { studentList:[]}

    componentDidMount(){

        this.props.getShowList(this.showList);
    }

    render() { 
        return ( 

            <div style={s.con}>
                
                <div style={s.header_con}>
                    
                    <div style={s.header}> مقدار هدیه </div>
                    <div style={s.header}> مقدار اعتبار </div>
                    <div style={s.header}>  نام خانوادگی </div>
                    <div style={s.header}> نام </div>
                    <div style={s.header}> کد خانواده </div>
                
                </div>

                {this.state.studentList}

            </div>
        );
    }

    showList = (list)=>{

        let studentList = [];
        let i = 1;

        list.forEach(element => {
            
            studentList.push(

                <StudentListItem key={i} history={this.props.history}
                    familyCode={element.familyCode}
                    firstName={element.firstName}
                    lastName={element.lastName}
                    credit={element.credit}
                    gift={element.gift}
                />
            )

            i++;
        });
        
        this.state.studentList= studentList;
        this.setState(this.state);
    }
}

const s = {

    con:{
        display:'flex',
        flexDirection:'column',
        height:'95%',
        width:'98%',
        overflowY:'scroll',
        borderStyle:'solid',
        borderWidth:4,
        borderColor:'purple'
    },

    header_con:{
        display:'flex',
        justifyContent:'space-between',
        height:'6%',
        width:'100%',
        marginBottom:8,
        backgroundColor:'white'
    },

    header:{
        width:'19.8%',
        backgroundColor:'#f2f',
        textAlign:'center'
    }
}
 
export default StudentList;
