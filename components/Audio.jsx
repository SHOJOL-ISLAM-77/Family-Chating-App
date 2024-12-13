import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import AudioRecorder from "./AudioView";

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/<cloud_name>/upload";
const CLOUDINARY_UPLOAD_PRESET = "<upload_preset>";

const AudioRecorderUploader = () => {
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  console.log(recording);
  // Start Recording
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("Permission to access microphone is required!");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  // Stop Recording
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  };

  // Play Recorded Audio
  const playAudio = async () => {
    if (!audioUri) return;

    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
      setIsPlaying(true);

      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isPlaying) {
          setIsPlaying(false);
          sound.unloadAsync();
        }
      });
    } catch (err) {
      console.error("Error playing audio:", err);
    }
  };

  // Upload Audio to Cloudinary
  const uploadAudio = async () => {
    if (!audioUri) {
      Alert.alert("No audio to upload!");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", {
        uri: audioUri,
        type: "audio/m4a",
        name: "audio.m4a",
      });
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (err) {
      console.error("Failed to upload audio:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     padding: 20,
    //     backgroundColor: "#f9f9f9",
    //   }}
    // >
    //   {/* Microphone or Stop Recording Icon */}
    //   {!audioUri && (
    //     <TouchableOpacity
    //       onPress={recording ? stopRecording : startRecording}
    //       style={{
    //         backgroundColor: recording ? "red" : "green",
    //         borderRadius: 50,
    //         padding: 20,
    //         marginBottom: 20,
    //       }}
    //     >
    //       {recording ? (
    //         <MaterialIcons name="stop" size={32} color="black" />
    //       ) : (
    //         <FontAwesome name="microphone" size={32} color="black" />
    //       )}
    //     </TouchableOpacity>
    //   )}

    //   {/* Play and Upload Icons */}
    //   {audioUri && (
    //     <View style={{ flexDirection: "row", gap: 20, marginBottom: 20 }}>
    //       <TouchableOpacity
    //         onPress={playAudio}
    //         disabled={isPlaying}
    //         style={{
    //           backgroundColor: isPlaying ? "gray" : "blue",
    //           borderRadius: 50,
    //           padding: 20,
    //         }}
    //       >
    //         <Feather name="play" size={32} color="white" />
    //       </TouchableOpacity>

    //       <TouchableOpacity
    //         onPress={uploadAudio}
    //         disabled={isUploading}
    //         style={{
    //           backgroundColor: isUploading ? "gray" : "orange",
    //           borderRadius: 50,
    //           padding: 20,
    //         }}
    //       >
    //         {isUploading ? (
    //           <ActivityIndicator color="white" />
    //         ) : (
    //           <Feather name="upload" size={32} color="white" />
    //         )}
    //       </TouchableOpacity>
    //     </View>
    //   )}

    //   {/* Uploaded URL */}
    //   {uploadedUrl && (
    //     <Text style={{ color: "green", fontSize: 16, marginTop: 10 }}>
    //       Uploaded Successfully: {uploadedUrl}
    //     </Text>
    //   )}
    // </View>
    <AudioRecorder
      recording={recording}
      startRecording={startRecording}
      stopRecording={stopRecording}
      audioUri={audioUri}
      playAudio={playAudio}
      isPlaying={isPlaying}
      uploadAudio={uploadAudio}
      isUploading={isUploading}
      uploadedUrl={uploadedUrl}
    />
  );
};

export default AudioRecorderUploader;
