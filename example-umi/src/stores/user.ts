export default {
  state: {
    id: '10',
    name: 'user'
  },
  methods: {
    getUser(state, payload){
      return {
        ...state,
        ...payload
      }
    }
  }
}
