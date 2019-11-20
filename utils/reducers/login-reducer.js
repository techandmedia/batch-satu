export default function loginReducer(state, action) {
  console.log(state, action);
  const { type, values } = action;
  const { username, password } = values;
  switch (type) {
    case "success":
      return {
        ...state,
        isModalVisible: false,
        modalTitle: "",
        modalMessage: ""
      };
    case "warning":
      return { ...state };
    case "warning":
      return { ...state };
    default:
      throw new Error();
  }
}
