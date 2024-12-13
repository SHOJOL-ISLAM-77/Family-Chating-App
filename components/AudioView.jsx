import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';

const AudioRecorder = ({ recording, startRecording, stopRecording, audioUri, playAudio, isPlaying, uploadAudio, isUploading, uploadedUrl }) => {
  return (
    <View style={styles.container}>
      {/* Microphone or Stop Recording Icon */}
      {!audioUri && (
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={[styles.recordButton, { backgroundColor: recording ? "#E53935" : "#43A047" }]}
        >
          {recording ? (
            <MaterialIcons name="stop" size={32} color="white" />
          ) : (
            <FontAwesome name="microphone" size={32} color="white" />
          )}
        </TouchableOpacity>
      )}

      {/* Play and Upload Icons */}
      {audioUri && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={playAudio}
            disabled={isPlaying}
            style={[styles.actionButton, { backgroundColor: isPlaying ? "#B0BEC5" : "#1E88E5" }]}
          >
            <Feather name="play" size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={uploadAudio}
            disabled={isUploading}
            style={[styles.actionButton, { backgroundColor: isUploading ? "#B0BEC5" : "#FB8C00" }]}
          >
            {isUploading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Feather name="upload" size={32} color="white" />
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Uploaded URL */}
      {uploadedUrl && (
        <Text style={styles.uploadedText}>
          Uploaded Successfully: {uploadedUrl}
        </Text>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  recordButton: {
    borderRadius: 50,
    padding: 25,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedText: {
    color: "#43A047",
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
};

export default AudioRecorder;
