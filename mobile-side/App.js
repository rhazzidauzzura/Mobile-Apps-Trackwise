import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { openCamera } from './helpers';
import { useMemo, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios'

export default function App() {
  const [takedImage, setTakedImage] = useState('')
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    name: '',
    ages: '',
    description: '',
  })

  const handleCamera = async () => {
    try {
      const { assets } = await openCamera()
      setTakedImage(assets[0].uri)
    } catch (error) {
      alert(error)
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

  const disabled = useMemo(() => {
    return Object.values(state).some(el => !el) || !takedImage
  }, [state, takedImage])

  const reset = () => {
    setState({
      name: '',
      ages: '',
      description: '',
    })
    setTakedImage('')
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const location = await getCurrLoc()
      const formData = new FormData()

      formData.append('name', state.name)
      formData.append('age', state.ages)
      formData.append('description', state.description)
      formData.append('image', { name: new Date().getTime() + "_img", uri: takedImage, type: "image/jpeg" })
      formData.append('long', location.coords.longitude)
      formData.append('lat', location.coords.latitude)
      const res = await axios.post('https://wild-flannel-shirt-foal.cyclic.app/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      alert(res.data?.message)
      reset()
    } catch (error) {
      alert(error)
    } finally { setLoading(false) }

  }

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0080ff" />
    </View>

  )
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://clipground.com/images/png-tracking-1.png' }}
          style={{
            width: 120,
            height: 120
          }}
        />
        <View style={styles.card}>
          {errorMsg &&
            <View style={{ borderWidth: 1, borderColor: 'red', padding: 7 }} >
              <Text style={{ color: 'red' }}>{errorMsg}</Text>
            </View>
          }
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
            <Text style={styles.textBtn}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={disabled} onPress={handleSubmit} style={[styles.btnReport, { opacity: disabled ? 0.3 : 1 }]}>
            <Text style={styles.textBtn}>Report</Text>
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
    justifyContent: 'center'
  },
  card: {
    borderRadius: 10,
    width: "100%",
    padding: 15,
    marginTop: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
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
    textAlign: "center", fontWeight: 600, color: "white"
  },
  img: {
    width: 130,
    height: 160,
    marginHorizontal: "30%",
    borderRadius: 10,
    marginTop: 10,
  },
});
