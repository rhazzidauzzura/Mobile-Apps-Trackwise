import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useMemo, useState } from "react";
import lang from "../language/language.json";
import storage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { signIn } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [currLang, setCurrLang] = useState("id");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigation()

  useEffect(() => {
    (async () => {
      let language = await storage.getItem("language");
      if (!language) await storage.setItem("language", "en");
      setCurrLang(language || "en");
    })();
  }, []);

  const disabled = useMemo(() => {
    return Object.values(state).some((el) => !el);
  }, [state]);

  const reset = () => {
    setState({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    signIn(state).finally(() => setLoading(false))

  };

  const changeLang = async (val) => {
    setLoading(true);
    try {
      await storage.setItem("language", val);
      setCurrLang(val);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0080ff" />
      </View>
    );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={{ position: "absolute", zIndex: 10, top: 0, right: 20, flexDirection: "row" }}>
          <Text onPress={() => changeLang("en")} style={currLang == "en" ? styles.activeToggle : styles.toggle}>
            EN
          </Text>
          <Text onPress={() => changeLang("id")} style={currLang == "id" ? styles.activeToggle : styles.toggle}>
            ID
          </Text>
        </View>
        <Image
          source={{ uri: "https://clipground.com/images/png-tracking-1.png" }}
          style={{
            width: 120,
            height: 120,
          }}
        />
        <View style={styles.card}>
          <Text style={{ fontSize: 25, marginVertical: 15 }}>{lang[currLang].login}</Text>
          {errorMsg && (
            <View style={{ borderWidth: 1, borderColor: "red", padding: 7 }}>
              <Text style={{ color: "red" }}>{errorMsg}</Text>
            </View>
          )}

          <TextInput
            value={state.email}
            onChangeText={val => setState({ ...state, email: val })}
            style={styles.input}
            placeholder={'Email'}
          />
          <TextInput
            secureTextEntry={true}
            value={state.password}
            onChangeText={(val) => setState({ ...state, password: val })}
            style={styles.input}
            placeholder={lang[currLang].password}
          />

          <TouchableOpacity disabled={disabled} onPress={handleSubmit} style={[styles.btn, { opacity: disabled ? 0.5 : 1 }]}>
            <Text style={styles.textBtn}>{lang[currLang].login}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_ => navigate.navigate('Register')}>
            <Text style={{ textAlign: 'right', color: '#0080ff', marginTop: 15, fontSize: 13 }}>{lang[currLang]['not-account']}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    marginTop: 20,
    justifyContent: "center",
    position: "relative",
  },
  activeToggle: { width: 35, textAlign: "center", backgroundColor: "#0080ff", color: "white", padding: 5, borderRadius: 3 },
  toggle: { borderRadius: 3, width: 35, textAlign: "center", padding: 5 },
  card: {
    borderRadius: 10,
    width: "100%",
    padding: 15,
    marginTop: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
  },
  input: {
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
  },
  btn: {
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#0080ff",
  },
  btnReport: {
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    color: "white",
    backgroundColor: "red",
  },
  textBtn: {
    textAlign: "center",
    fontWeight: 600,
    color: "white",
  },
  img: {
    width: 130,
    height: 160,
    marginHorizontal: "30%",
    borderRadius: 10,
    marginTop: 10,
  },
});
