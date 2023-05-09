import * as ImagePicker from 'expo-image-picker';

export const openCamera = async () => {
  // Ask the user for the permission to access the camera
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("You've refused to allow this appp to access your camera!");
    return;
  }

  const result = await ImagePicker.launchCameraAsync();

  // Explore the result
  return result;
}