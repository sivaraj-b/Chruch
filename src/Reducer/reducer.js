export const reducer = (state,action)=>{

    if(action.type === 'ADD__TEMP__DATA__STATE'){
            return {...state,tempData:action.details}
            
    }else if(action.type === 'ADD__CHILD__IN__STATE__ELE'){
            return{...state,tempData:action.addChildInStateEle,parentId:action.parent}
    }

    
}