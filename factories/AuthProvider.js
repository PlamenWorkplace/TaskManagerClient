import { createContext, useContext, useReducer, useMemo } from "react";
import { logIn, signUp } from "./UserHandler";

const AuthContext = createContext({
  authenticated: false,
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
  const [state, dispatch] = useReducer(reducer, { authenticated: false });

  const actions = useMemo(
    () => ({
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT' });
      },
      logIn: async (email, password) => {
        const response = await logIn(email, password);
        console.log(response)
        if (response === "1") {
          dispatch({ type: 'LOG_IN'});
        }
      },
      signUp: async (username, email, password) => {
        const response = await signUp(username, email, password);
        console.log(response);
        if (response === "1") {
          dispatch({ type: 'SIGN_UP' });
        }
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
        authenticated: false
      };
    case 'LOG_IN':
    case 'SIGN_UP':
      return {
        ...state,
        authenticated: true
      };
    default:
      return state;
  }
};
