export default {
  state: {
    id: 'avc',
    name: 'order'
  },
  methods: {
    getOrder(state, payload){
      return {
        ...state,
        ...payload
      }
    }
  }
}
