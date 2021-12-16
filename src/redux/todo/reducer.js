import {
  FETCH_TODO_SUCCESS,
  FETCH_TODO_BEGIN,
  FETCH_TODO_ERROR,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from "./types";

const initialState = {
  todos: [],
  isLoading: false,
};

export const todo = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODO_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_TODO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };
    }

    case FETCH_TODO_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }

    case EDIT_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo.id === action.payload.id ? action.payload.value : todo;
        }),
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    default: {
      return state;
    }
  }
};
