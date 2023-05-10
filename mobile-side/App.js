import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { openCamera } from './helpers';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios'

export default function App() {
  const [takedImage, setTakedImage] = useState('')
  const [errorMsg, setErrorMsg] = useState(null);
  const [state, setState] = useState({
    name: '',
    ages: '',
    description: '',
  })

  const handleCamera = async () => {
    try {
      const { assets } = await openCamera()
      setTakedImage(assets[0].uri)
      console.log(assets)
    } catch (error) {
      console.log(error)
    }
  }


  const getCurrLoc = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return
    }

    return await Location.getCurrentPositionAsync({});

  };


  const handleSubmit = async () => {
    try {
      const location = await getCurrLoc()
      const formData = new FormData()

      formData.append('name', state.name)
      formData.append('age', state.ages)
      formData.append('description', state.description)
      formData.append('image', { name: new Date().getTime() + "_img", uri: takedImage, type: "image/jpeg" })
      formData.append('long', location.coords.longitude)
      formData.append('lat', location.coords.latitude)
      console.log({ name: new Date().getTime() + "_img", uri: takedImage, type: "image/jpeg" })
      const res = await axios.post('https://3f48-182-2-136-235.ngrok-free.app/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      alert(res.data?.message)
    } catch (error) {
      console.log(error, 'asd')

    }

  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://clipground.com/images/png-tracking-1.png' }}
          style={{
            width: 100,
            height: 100
          }}
        />
        <View style={styles.card}>
          <TextInput value={state.name} onChangeText={(val) => setState({ ...state, name: val })} style={styles.input} placeholder='Name' />
          <TextInput value={state.ages} onChangeText={(val) => setState({ ...state, ages: val })} keyboardType='number-pad' style={styles.input} placeholder='Ages' />
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            textAlignVertical='top'
            placeholder='Description'
            value={state.description}
            onChangeText={(val) => setState({ ...state, description: val })}
          />
          {takedImage &&
            <Image source={{ uri: takedImage }} style={{ width: 100, height: 120 }} />
          }
          <TouchableOpacity onPress={handleCamera} style={styles.btn}>
            <Text style={{ textAlign: "center", fontWeight: 600 }}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={{ textAlign: 'center', fontWeight: 600 }}>Report</Text>
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
