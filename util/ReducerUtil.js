export const initialState = {
  task: "",
  taskItems: [],
  editableIndex: null,
  modifiedTask: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK":
      return { ...state, task: action.payload };
    case "ADD_TASK":
      return {
        ...state,
        taskItems: [...state.taskItems, state.task],
        task: "",
      };
    case "SET_EDITABLE_INDEX":
      return { ...state, editableIndex: action.payload };
    case "SET_MODIFIED_TASK":
      return { ...state, modifiedTask: action.payload };
    case "COMPLETE_TASK":
      let itemsCopy = [...state.taskItems];
      itemsCopy.splice(action.payload, 1);
      return { ...state, taskItems: itemsCopy };
    case "UPDATE_TASK":
      let itemsCopyForUpdate = [...state.taskItems];
      itemsCopyForUpdate[state.editableIndex] = state.modifiedTask;
      return { ...state, taskItems: itemsCopyForUpdate, editableIndex: null };
    case "DELETE_ALL_TASKS":
      return { ...state, taskItems: [] };
    default:
      return state;
  }
};
