export default function loading(store, prevState, nextState, action, actionAsync, asyncKey){
  if(action.type === 'hook-loading-clear'){
    return {
      ...prevState,
      loading: {
        ...prevState.loading,
        [action.key]: {
          ...prevState.loading[action.key],
          [action.payload]: true
        }
      }
    }
  }else if(actionAsync){
    return {
      ...nextState,
      loading: {
        ...nextState.loading,
        [asyncKey]: {
          ...nextState.loading[asyncKey],
          [actionAsync]: false
        }
      }
    }
  }else {
    return {
      ...nextState,
      loading: {
        ...nextState.loading,
        [action.key]: {
          ...nextState.loading[action.key],
          [action.type]: false
        }
      }
    }
  }
}