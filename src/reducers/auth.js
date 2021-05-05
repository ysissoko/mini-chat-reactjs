const auth = async (state = {username: "", id: null}, action) => {
  switch(action.type){
      case "LOGIN":
          return {
            username: action.payload.username,
            id: action.payload.id
          };
      default:
          return state;
  }
}


export default auth;