import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { openCamera } from "./helpers";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [takedImage, setTakedImage] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    characteristic: "",
    photo: takedImage ? takedImage : "",
  });
  const handleCamera = async () => {
    const { assets } = await openCamera();
    setTakedImage(assets[0].uri);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost/3000", { data: form });
      // Menangani respon dari server
      Alert.alert("Sukses", "Permintaan berhasil dikirim");
    } catch (error) {
      // Menangani kesalahan permintaan
      Alert.alert("Error", "Terjadi kesalahan saat mengirim permintaan");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={{ uri: "https://clipground.com/images/png-tracking-1.png" }} style={{ width: 100, height: 100, marginBottom: 5 }} />
        <View style={{ flexDirection: "row", marginBottom: 30 }}>
          <Text style={{ fontWeight: 300, fontSize: 28 }}>Track</Text>
          <Text style={{ fontWeight: 700, fontSize: 28 }}>Wise</Text>
        </View>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder="Name" value={form.name} onChangeText={(form) => setForm(form.name)} />
          <TextInput style={styles.input} placeholder="Age" value={form.age} onChangeText={(form) => setForm(form.age)} />
          <TextInput multiline={true} numberOfLines={4} style={styles.input} textAlignVertical="top" placeholder="Description" value={form.characteristic} onChangeText={(form) => setForm(form.characteristic)} />

          {takedImage && <Image source={{ uri: takedImage }} style={styles.img} />}
          <TouchableOpacity onPress={handleCamera} style={styles.btn}>
            <Text style={{ textAlign: "center", fontWeight: 600 }}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.btnReport}>
            <Text style={{ textAlign: "center", fontWeight: 600 }}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
    marginTop: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 15,
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
    color: "white",
    backgroundColor: "#0080ff",
  },
  btnReport: {
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    color: "white",
    backgroundColor: "red",
  },
  img: {
    width: 130,
    height: 160,
    marginHorizontal: "30%",
    borderRadius: 10,
    marginTop: 10,
  },
});
