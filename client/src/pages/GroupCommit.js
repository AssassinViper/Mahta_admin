import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';
import GroupCommitHandler from '../handlers/GroupCommitHandler';



class GroupCommit extends Component {
    state = {  }

    GroupCommitData = {

        number:"",
        price:""
    }

    render() { 
        return ( 
            <div style={s.con}>

                <div style={s.space}/>

                <Input height={35} width="20%" placeholder="تعداد دانش آموزان" type="number"
                ref={(ref=>this.numberInput = ref)}
                onChange={(event)=>{this.GroupCommitData.number = event.target.value}}/>

                <Input height={35} width="20%" placeholder="مبلغ هدیه" type="number"
                ref={(ref=>this.priceInput = ref)}
                onChange={(event)=>{this.GroupCommitData.price = event.target.value}}/>

                <Button height={50} width="15%" onClick={this.commit}>ثبت</Button>

            </div>
         );
    }

    commit = ()=>{

        GroupCommitHandler({params:this.GroupCommitData}, 
            
            (res)=>{

                this.numberInput.clear();
                this.priceInput.clear();
                alert("done");
            },
            (err)=>{

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
        backgroundColor:'blue'
    },

    space:{
        height:'5%',
    }

}
 
export default GroupCommit;