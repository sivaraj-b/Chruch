import { type } from "@testing-library/user-event/dist/type"

export const reducer = (state,action)=>{

    if(action.type === 'ADD__TEMP__DATA__STATE'){
            
            return {...state,tempData:action.details,parentId:action.parent}
            
    }else if(action.type === 'ADD__CHILD__IN__STATE__ELE'){

            return{...state,tempData:action.ArrData,parentId:action.parent}
    }else if(action.type === 'ADD__CHILD__IN__CHILD__ELE'){
               

            return{...state,tempData:action.addInChildArr,parentId:action.parent}
    }else if(action.type === 'TRACK__PARENT__ID'){
        

                return{...state,parentId:action.parent}
    }else if(action.type === 'ADD__ELE__FIRST__SUBMIT'){
       

                return{...state,parentId:action.parent, tempData:action.firstSubmit}
    }else if(action.type === 'ADD__USER__NO__CHILD'){
       

                return{...state,data:[...state.data,action.userOnly],tempData:[]}
    }else if(action.type === 'REMOVE__CHILD'){
                return {...state,tempData:action.RemoveChild}
    }else if (action.type === 'Add__ALL__NESTED__DATA'){
                console.log("IN IN LAST")
        return{...state,data:[...state.data,...action.nestedSubmit],tempData:[],parentId:""}
    }
    
}