import React, { Component } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import PlainText from '../components/PlainText';

const GroupCommitData = {

    number:"",
    price:""
}

class GroupCommit extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={s.con}>

                <div style={s.space}/>

                <Input height={35} width="20%" placeholder="تعداد دانش آموزان" type="number"
                ref={(ref=>this.numberInput = ref)}
                onChange={(event)=>{GroupCommitData.number = event.target.value}}/>

                <Input height={35} width="20%" placeholder="مبلغ هدیه" type="number"
                ref={(ref=>this.priceInput = ref)}
                onChange={(event)=>{GroupCommitData.price = event.target.value}}/>

                <Button height={50} width="15%" onClick={this.commit}>ثبت</Button>

            </div>
         );
    }

    commit = ()=>{

        if(1){
        
            this.numberInput.clear();
            this.priceInput.clear();
        }
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