

export const reducer = (state,action)=>{

    if(action.type === 'ADD__TEMP__DATA__STATE'){
                
            return {...state,tempData:action.details,parentId:action.parent}
            
    }else if(action.type === 'EDIT__TEMP__USER'){
        return {...state,  tempEditId:action.editId,isEdit:true}

    }else if(action.type === 'EDIT__TEMP__CHILD_ONCE'){
        return{...state,tempData:action.editData,isEdit:false,tempEditId:""}
    } else if(action.type === 'REMOVED__DATA__IN__TEMP__ARR'){
                    console.log(action.RemovedDataTemp)
            return{...state,tempData:action.RemovedDataTemp}

    }else if(action.type === 'ADD__CHILD__IN__TEMP__EDIT__ELE'){
                        console.log(action.ArrData)
                return{...state,tempData:action.ArrData,isEdit:false}
    }else if(action.type === 'ADD__CHILD__IN__STATE__ELE'){
        

            return{...state,tempData:action.ArrData,parentId:action.parent, editId:""}
    }else if(action.type === 'ADD__CHILD__IN__CHILD__ELE'){
               
        

            return{...state,tempData:action.addInChildArr,parentId:action.parent}
    }else if(action.type === 'TRACK__PARENT__ID'){
       
        

                return{...state,parentId:action.parent}
    }else if(action.type === 'ADD__ELE__FIRST__SUBMIT'){
       
        

                return{...state,parentId:action.parent, tempData:action.firstSubmit}
    }else if(action.type === 'EDIT__TEMP__CHILD'){
            return{...state,editId:"",isEdit:false,tempData:action.editData}

    }else if(action.type === 'ADD__USER__NO__CHILD'){

            console.log('INNN1')
        

                return{...state,data:[...state.data,action.userOnly],tempData:[]}
    }else if(action.type === 'REMOVE__CHILD'){
        

                return {...state,tempData:action.RemoveChild}
    }else if (action.type === 'Add__ALL__NESTED__DATA'){
           console.log('INNN2')
               
        return{...state,data:[...state.data,...action.nestedSubmit],tempData:[],parentId:""}
    }else if(action.type === 'EDIT__USER'){
            console.log('INNN3')
                return {...state, editId:action.editId,isEdit:true}
    }else if(action.type === 'REMOVED__DATA__IN__STATE__ARR'){
                
        return{...state,data:action.RemovedData}
    }else if (action.type ="EDIT__DATA"){
        

        return{...state,editId:"",isEdit:false,data:action.editData,tempData:[]}
    }else{
       
        return{...state}
    }
    
}