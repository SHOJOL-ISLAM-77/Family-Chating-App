import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Keyboard } from "react-native";

const uploadImage = async (setUploading, setUploadStatus, URL) => {
  Keyboard.dismiss();

  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") return;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (result.canceled || !result.assets || !result.assets[0].uri) return;

  try {
    setUploading(true);
    setUploadStatus("Uploading image to Cloudinary...");

    const fileUri = result.assets[0].uri;
    const fileType = fileUri.split(".").pop();
    const fileName = `image.${fileType}`;

    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      type: `image/${fileType}`,
      name: fileName,
    });
    formData.append("upload_preset", "Family-Chat");

    const cloudinaryUrl = process.env.CLOUDINARY_URL;

    const response = await axios.post(cloudinaryUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data && response.data.secure_url) {
      URL.current = response.data.secure_url;
      setUploadStatus("Image uploaded successfully!");
    } else {
      setUploadStatus("Failed to upload image.");
    }
  } catch (error) {
    console.error(
      "Cloudinary upload error:",
      error.response?.data || error.message
    );
    setUploadStatus("Failed to upload image.");
  } finally {
    setUploading(false);
  }
};

export default uploadImage;
