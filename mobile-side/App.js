import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home";
import * as React from 'react';
import storage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "./context/AuthContext"

const Stack = createNativeStackNavigator();

export default function App() {
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
    <NavigationContainer>
      <AuthContext.Provider value={{ ...authContext, userToken: state.userToken }} >
        <Stack.Navigator>
          {!state.userToken ? <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </> : <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}