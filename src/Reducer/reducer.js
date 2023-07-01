export const reducer = (state,action)=>{

    if(action.type === 'ADD__TEMP__DATA__STATE'){
            return {...state,tempData:action.details}
            
    }else if(action.type === 'ADD__CHILD__IN__STATE__ELE'){
            return{...state,tempData:action.addChildInStateEle,parentId:action.parent}
    }else if(action.type === 'ADD__CHILD__IN__CHILD__ELE'){
                console.log(action.addInChildArr)
            return{...state,tempData:action.addInChildArr,parentId:action.parent}
    }else if(action.type === 'TRACK__PARENT__ID'){
                return{...state,parentId:action.parent}
    }else if(action.type === 'ADD__MAIN__ELE'){
                return{...state,tempData:[],parentId:"",data:action.AddMainData}
    }

    
}