import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';
import CommitGiftHandler from '../handlers/CommitGiftHandler';



class CommitGift extends Component {
    state = {  }

    CommitGiftData = {

        familyCode:Dashboard.selectedStudent.mahtaCode,
        price:"",
        info:""
    }


    render() {
        
        if(Dashboard.selectedStudent.mahtaCode === undefined){

            return(<Redirect to="/admin" />);

        }else{
            
            return ( 
                <div style={s.con}>

                    <div style={s.space}/>

                    <Input height={35} width="20%" placeholder="(مبلغ خرید(تومان"  type="number"
                    ref={(ref=>this.priceInput = ref)}
                    onChange={(event)=>{this.CommitGiftData.price = event.target.value}}/>

                    <PlainText height={90} width="20%" placeholder="توضیحات"
                    ref={(ref=>this.infoPlainText = ref)} 
                    onChange={(event)=>{this.CommitGiftData.info = event.target.value}}/>

                    <Button height={50} width="15%" onClick={this.commit}>ثبت</Button>

                </div>
            );
        }
    }

    commit = ()=>{

        CommitGiftHandler({params:this.CommitGiftData},
            (res)=>{

                this.priceInput.clear();
                this.infoPlainText.clear();
                alert("done");

            },(err)=>{

                alert(err);
            }
        );
    }
}

const s = {

    con:{
        height:520,
        width: 1200,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#88a'
    },

    space:{
        height:'5%',
    }
}
 
export default CommitGift;