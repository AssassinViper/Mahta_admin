
const Sort = (studentList, by, order)=>{

    let newList = Object.assign([], studentList);

    if(by == "code"){

        newList.sort((a,b)=>{

            console.log("A-fam");
            
            return a.mahtaCode - b.mahtaCode;
        });

        if(order == "D"){

            newList.reverse();
        }
        
    }else{

        newList.sort((a,b)=>{

            console.log("A-name");
            
            return a.name.lastName.localeCompare(b.name.lastName);
        });

        if(order == "D"){

            newList.reverse();
        }
    }
    
    return newList;
}

export{Sort}