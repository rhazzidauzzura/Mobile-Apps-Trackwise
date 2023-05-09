import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { openCamera } from './helpers';
import { useState } from 'react';

export default function App() {
  const [takedImage, setTakedImage] = useState('')
  const handleCamera = async () => {
    const { assets } = await openCamera()
    setTakedImage(assets[0].uri)
  }

  return (
    <SafeAreaView >
      <View style={styles.container}>
        <Image source={{ uri: 'https://clipground.com/images/png-tracking-1.png' }} style={{ width: 100, height: 100 }} />
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder='Name' />
          <TextInput style={styles.input} placeholder='Ages' />
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            textAlignVertical='top'
            placeholder='Description'
          />
          {takedImage &&
            <Image source={{ uri: takedImage }} style={{ width: 100, height: 120 }} />
          }
          <TouchableOpacity onPress={handleCamera} style={styles.btn}>
            <Text style={{ textAlign: 'center', fontWeight: 600 }}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCamera} style={styles.btn}>
            <Text style={{ textAlign: 'center', fontWeight: 600 }}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    padding: 15,
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
  },
  btn: { padding: 10, marginTop: 10, borderRadius: 20, backgroundColor: '#ccff00' }
});
