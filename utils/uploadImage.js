import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Alert, Keyboard } from "react-native";

const uploadImage = async (setUploading, setUploadStatus, URL) => {
  Keyboard.dismiss();

  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "We need access to your photos.");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) {
    try {
      setUploading(true);
      setUploadStatus("Uploading image...");

      const formData = new FormData();
      formData.append("key", "34087641ca74ac8c32605af6028f18a1");
      formData.append("image", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "profile.jpg",
      });

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.data && response.data.data.url) {
        URL.current = response.data.data.url;
        setUploadStatus("Image uploaded successfully!");
      } else {
        setUploadStatus("Failed to upload image.");
      }
    } catch (error) {
      setUploadStatus("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }
};

export default uploadImage;
