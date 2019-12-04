import is from 'ramda/src/is'
import path from 'ramda/src/path'

export function get(target, source) {
  return path(target, source)
}

export function run(target, source, ...args){
  const res = get(target, source)
  if(is(Function, res)){
    return res(...args)
  }
  return undefined
}

export function isAsyncFunction(cb){
  if(!cb){
    return false
  }
  return cb.constructor.name === 'AsyncFunction'
}

/**
 * 函数是否在effects/reducers/methods里面
 * @param {String} type  methods effects reducers 
 * @param {Object} obj 
 * @param {String} name 
 */
export function inWhich(type, obj, name){
  if(!obj){
    return false
  }

  if(!obj[type]){
    return false;
  }

  if (obj[type][name]) {
    return true;
  }
}

export function transBool(obj, flag = true){
  if(!is(Object, obj)){
    return {}
  }
  
  let newObj = {}
  Object.keys(obj).forEach(item=>{
    newObj[item] = flag
  })
  return newObj
}
