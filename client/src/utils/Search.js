
const Search = (word, studentList)=>{

    let newList = [];

    console.log(word);
    let j=0;

    let a = "محمد";
    let b = "مح";
    
    
    studentList.forEach(element => {

        j++;

        if(recSearch(word, element.firstName)){

            newList.push(element);
            console.log("pushed!!!");

        }else if(recSearch(word, element.lastName)){

            newList.push(element);
            console.log("pushed!!!");

        }else if(recSearch(word,  element.code.toString())){

            newList.push(element);
            console.log("pushed!!!");
        }
    });

    console.log("j:"+j);
    
    return newList;
}

const recSearch = (a, b, i=0)=>{ // search a in b

    if(a.length == i){

        console.log(a.length+" <- a.length -> return True");
        
        return true;
    }

    if(a[i] == b[i]){

        console.log("a["+i+"]:"+a[i]+" and b["+i+"]:"+b[i]+" --> "+(a[i] == b[i]?"true":"false"));
        
        return recSearch(a,b,i+1)
    
    }else{

        console.log("returned False");
        
        return false;
    }
}

export{Search};