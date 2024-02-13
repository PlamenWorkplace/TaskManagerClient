import { createContext, useContext, useReducer, useMemo } from "react";
import { logIn, signUp } from "./UserService";

const AuthContext = createContext({
  email: null,
  signUp: () => {},
  logIn: () => {},
  signOut: () => {},
});

export const useAuthorization = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};

export const AuthProvider = props => {
  const [state, dispatch] = useReducer(reducer, { email: null });

  const actions = useMemo(
    () => ({
      signOut: async () => dispatch({ type: "SIGN_OUT" })
      ,
      logIn: async (email, password) => {
        const response = await logIn(email, password);
        if (response === "1") dispatch({ type: "LOG_IN", email: email })
      },
      signUp: async (username, email, password) => {
        const response = await signUp(username, email, password);
        if (response === "1") dispatch({ type: "SIGN_UP", email: email  })
      },
    }), []
  );

  return (
    <AuthContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_OUT':
      return {
        ...state,
        email: null
      };
    case 'LOG_IN':
    case 'SIGN_UP':
      return {
        ...state,
        email: action.email
      };
    default:
      return state;
  }
};
