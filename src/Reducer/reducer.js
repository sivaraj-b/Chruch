export const reducer = (state,action)=>{

    if(action.type === 'ADD__TEMP__DATA__STATE'){
            console.log(action)
            return {...state,tempData:action.details,parentId:action.parent}
            
    }else if(action.type === 'ADD__CHILD__IN__STATE__ELE'){
            return{...state,tempData:action.addChildInStateEle,parentId:action.parent}
    }else if(action.type === 'ADD__CHILD__IN__CHILD__ELE'){
                console.log(action.addInChildArr)
            return{...state,tempData:action.addInChildArr,parentId:action.parent}
    }else if(action.type === 'TRACK__PARENT__ID'){
                return{...state,parentId:action.parent}
    }else if(action.type === 'ADD__MAIN__ELE'){
                return{...state,tempData:[],parentId:"",data:action.AddMainData}
    }else if(action.type === 'UPDATE__SUBMIT__ADD__CHILD'){
                return {...state,tempData:action.addInChildArr,parentId:action.parent}
    }else if(action.type === 'ADD__FINALLY__IN__NESTED'){
                return {...state,tempData:[],data:[...state.data,action.UpdateArrInFinal],parentId:""}
    }else if (action.type === 'ADD__IN__STATE__FIRST'){
                return {...state , tempData:[],data:[...state.data,action.addWithoutChild]}
    }else if(action.type === 'REMOVE__CHILD'){
                return{...state,tempData:action.RemoveChild}
    }

    
}