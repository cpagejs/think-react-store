export default {
  state: {
    id: 123,
    name: 'cc'
  },
  methods: {
    /**
     * 同步
     * @param {Object} state state 对象
     * @param {Object} payload 传递的参数
     */
    getUser(state, payload){
      // console.log(state, payload)
      return {
        ...state,
        ...payload
      }
    },

    /**
     * 异步
     * @param {Function} dispatch dispatch函数
     * @param {Object} state state 对象
     * @param {Object} payload 传递的参数
     */
    async getAuth(dispatch, state, payload){
      await new Promise(resolve=>setTimeout(resolve,1000))
      dispatch({
        type: 'getUser',
        payload
      })
    }
  },
  reducers: {
    setName(state, payload){
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    async setNameAsync(dispatch, state, payload){
      // console.log(state)
      await new Promise(resolve=>setTimeout(resolve,1000))
      dispatch({
        type: 'setName',
        payload
      })
    }
  }
}
