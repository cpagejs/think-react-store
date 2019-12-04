// Type definitions for ./src/index.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// reducer.!1

/**
 * 
 */
declare interface reactStore {
		
	/**
	 * 
	 */
	key : string;
		
	/**
	 * 
	 */
	type : string;
}
// useStoreHook.!ret

/**
 * 
 */
declare interface Ret {
}
// connect.!ret
type Ret = ((Comp : any) => connect.RetRet);
declare namespace connect{
	// connect.!ret.!ret
	type RetRet = ((props : any) => boolean);
}

/**
 * 全局用的 provider，应用于app.js 或者单个模块的根文件
 */
declare interface StoreProvider {
		
	/**
	 * 
	 * @param props 
	 * @return  
	 */
	new (props : any): boolean;
}


/**
 * 进行事件派发的 hook，应用于 function 组件
 * @param key 不同的model名称
 */
declare function useDispatchHook(key : String): void;

/**
 * 获取 state 用的 hook，应用于 function 组件
 * @param key 不同的model名称
 */
declare function useStateHook(key : String): void;

/**
 * 返回state和方法
 * {
 *   user: {id:1,getUser(state,payload){xxxx}}
 * }
 * @return  
 */
declare function useStoreHook(): Ret;

/**
 * 添加属性和方法到组件中，应用于function 和 class 组件
 * @param mapStateToProps state
 * @param mapDispatchToProps dispatch派发的方法，包括 reducers 和 effects 里面的方法
 * @return  
 */
declare function connect(mapStateToProps : any, mapDispatchToProps : any): Ret;

/**
 * 
 */
export declare var value : boolean;
