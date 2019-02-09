import urls from '../consts/urls';
import Dashboard from '../pages/Dashboard';

const GetStudentList = (onFetched, onError)=>{

    //alert('getting list')

    fetch(urls.getStudentList,
        {method:"POST", 
        body: "",
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(res => {

            if(res.status === 200){
                
                res.json().then((res) =>{

                    onFetched(res);
                });
            }else{

                onError("unauthorized!")
            }
        })
        .catch(err => {
            
            onError(err);
        }
    );
}

const UpdateStudentList = (onSuccess, onError)=>{

    GetStudentList((res)=>{

        Dashboard.StudentInfoList = res;
        
        onSuccess();

    }, (err)=>{

        onError(err);
    })
}

export {GetStudentList}