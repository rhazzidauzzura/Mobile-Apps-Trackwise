import * as React from 'react';
import storage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator, View } from "react-native";

export const AuthContext = React.createContext();

export default function AuthProvider({children}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      userToken: null,
    }
  );

  React.useEffect(() => {
    console.log('aku')
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await storage.getItem('access_token');
      } catch (e) {
        userToken = null
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (state) => {
        let token
        try {
          const res = await axios.post("https://wild-flannel-shirt-foal.cyclic.app/login", state);
          token = res.data.access_token
          await storage.setItem("access_token", token);
        } catch (error) {
          alert("Incorrect Email Or Password");
        }

        dispatch({ type: 'SIGN_IN', token: token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      ...state
    }),
    []
  );

  if (state.isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0080ff" />
      </View>
    );
  return (
      <AuthContext.Provider value={authContext}>
        {children}
      </AuthContext.Provider>
  );
}

