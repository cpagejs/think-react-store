export default {
  state: {
    id: 'avc',
    name: 'order'
  },
  methods: {
    getOrder(state, payload){
      // console.log('get-order-info',state, payload)
      return {
        ...state,
        ...payload
      }
    }
  }
}
