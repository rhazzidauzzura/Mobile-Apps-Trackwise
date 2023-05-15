import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import lang from "../language/language.json";
import storage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation()
  const [currLang, setCurrLang] = useState("id");
  const [state, setState] = useState({
    password: "",
    birthDate: "",
    birthPlace: "",
    username: "",
    NIK: "",
    email: "",
    address: "",
    phoneNumber: "",
    role: "pelapor"
  });

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
      password: "",
      birthDate: "",
      birthPlace: "",
      username: "",
      NIK: "",
      email: "",
      address: "",
      phoneNumber: "",
      role: "pelapor"
    });
  };

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate;
    setState({ ...state, birthDate: currentDate })
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: state.birthDate || new Date(1598051730000),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://wild-flannel-shirt-foal.cyclic.app/register", state);

      alert(res.data?.message);
      reset();
      navigate.navigate('Login')
    } catch (error) {
      alert('Wrong format input');
    } finally {
      setLoading(false);
    }
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

  if (loading) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0080ff" />
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={{ flex: 1, minHeight: 600, justifyContent: 'center' }}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 25 }}>{lang[currLang].register}</Text>

              <View
                style={{ flexDirection: "row" }}
              >
                <Text
                  onPress={() => changeLang("en")}
                  style={currLang == "en" ? styles.activeToggle : styles.toggle}
                >
                  EN
                </Text>
                <Text
                  onPress={() => changeLang("id")}
                  style={currLang == "id" ? styles.activeToggle : styles.toggle}
                >
                  ID
                </Text>
              </View>
            </View>
            <TextInput
              value={state.NIK}
              onChangeText={val => setState({ ...state, NIK: val })}
              keyboardType="number-pad"
              style={styles.input}
              placeholder={'NIK'}
            />

            <TextInput
              value={state.username}
              onChangeText={val => setState({ ...state, username: val })}
              style={styles.input}
              placeholder={lang[currLang].name}
            />

            <TextInput
              value={state.email}
              onChangeText={val => setState({ ...state, email: val })}
              style={styles.input}
              placeholder={'Email'}
            />

            <TextInput
              secureTextEntry={true}
              value={state.password}
              onChangeText={val => setState({ ...state, password: val })}
              style={styles.input}
              placeholder={lang[currLang].password}
            />

            <TextInput
              value={state.phoneNumber}
              onChangeText={val => setState({ ...state, phoneNumber: val })}
              keyboardType="number-pad"
              style={styles.input}
              placeholder={lang[currLang].phone}
            />

            <TextInput
              value={state.birthPlace}
              onChangeText={val => setState({ ...state, birthPlace: val })}
              style={styles.input}
              placeholder={lang[currLang].birthPlace}
              />

            <TouchableOpacity
              onPress={showDatepicker}
              style={[styles.input, { paddingVertical: 13 }]}
              >
              <Text style={{ opacity: 0.4 }}>{state.birthDate ? new Date(state.birthDate).toLocaleDateString() : lang[currLang].birthPlace}</Text>
            </TouchableOpacity>

            <TextInput
              value={state.address}
              onChangeText={val => setState({ ...state, address: val })}
              style={styles.input}
              placeholder={lang[currLang].address}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.btn, { opacity: disabled ? 0.5 : 1 }]}
              disabled={disabled}
            >
              <Text style={styles.textBtn}>{lang[currLang].register}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={_ => navigate.navigate('Login')}>
              <Text style={{ textAlign: 'right', color: '#0080ff', marginTop: 15, fontSize: 13 }}>{lang[currLang]['have-account']}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
