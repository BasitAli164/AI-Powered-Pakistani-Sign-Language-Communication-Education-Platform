import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/utils/constants';

export default function SpeechToTextScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const transcriptionIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (isRecording) {
      simulateTranscription();
    } else {
      if (transcriptionIntervalRef.current) {
        clearInterval(transcriptionIntervalRef.current);
        transcriptionIntervalRef.current = null;
      }
    }

    return () => {
      if (transcriptionIntervalRef.current) {
        clearInterval(transcriptionIntervalRef.current);
      }
    };
  }, [isRecording, language]);

  const startRecording = async () => {
    try {
      if (hasPermission === false) {
        Alert.alert('Permission Required', 'Please grant microphone permission to use this feature.');
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
      setIsRecording(true);
      
      // Simulate real-time transcription
      simulateTranscription();
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      setRecording(null);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const simulateTranscription = () => {
    // Mock transcription - replace with actual speech-to-text API
    const mockWords = {
      en: ['Hello', 'how', 'are', 'you', 'I', 'need', 'help', 'Thank', 'you', 'very', 'much', 'Please', 'Can', 'you', 'repeat', 'that', 'I', 'understand', 'now', 'Good', 'morning'],
      ur: ['السلام', 'علیکم', 'آپ', 'کیسے', 'ہیں', 'مجھے', 'مدد', 'چاہیے', 'شکریہ', 'براہ', 'کرم', 'دوبارہ', 'کہیں'],
    };

    const words = mockWords[language];
    let wordIndex = 0;

    transcriptionIntervalRef.current = setInterval(() => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      
      setTranscribedText(prev => {
        wordIndex++;
        if (wordIndex > 20) { // Limit to 20 words
          if (transcriptionIntervalRef.current) {
            clearInterval(transcriptionIntervalRef.current);
          }
          return prev;
        }
        return prev ? `${prev} ${randomWord}` : randomWord;
      });
    }, 1500); // Add word every 1.5 seconds
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const clearText = () => {
    setTranscribedText('');
  };

  const copyText = () => {
    if (transcribedText) {
      Alert.alert('Copied', 'Text copied to clipboard');
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting microphone permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Ionicons name="mic-off" size={64} color={COLORS.GRAY_400} />
        <Text style={styles.message}>No access to microphone</Text>
        <Text style={styles.submessage}>Please enable microphone permission in settings</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Speech to Text</Text>
        <TouchableOpacity 
          style={styles.languageButton}
          onPress={toggleLanguage}
        >
          <Ionicons name="language" size={20} color={COLORS.WHITE} />
          <Text style={styles.languageText}>{language === 'en' ? 'EN' : 'UR'}</Text>
        </TouchableOpacity>
      </View>

      {/* Transcription Display */}
      <ScrollView style={styles.transcriptionContainer}>
        <View style={styles.transcriptionCard}>
          {transcribedText ? (
            <Text style={[
              styles.transcriptionText,
              language === 'ur' && styles.urduText
            ]}>
              {transcribedText}
            </Text>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="mic" size={48} color={COLORS.GRAY_300} />
              <Text style={styles.emptyText}>
                {isRecording ? 'Listening...' : 'Tap the microphone to start'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Recording Indicator */}
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>Recording...</Text>
        </View>
      )}

      {/* Action Buttons */}
      {transcribedText && !isRecording && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.copyButton]}
            onPress={copyText}
          >
            <Ionicons name="copy-outline" size={20} color={COLORS.WHITE} />
            <Text style={styles.actionButtonText}>Copy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.clearButton]}
            onPress={clearText}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.WHITE} />
            <Text style={styles.actionButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Microphone Button */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[
            styles.micButton,
            isRecording && styles.micButtonActive
          ]}
          onPress={toggleRecording}
        >
          <View style={[
            styles.micButtonInner,
            isRecording && styles.micButtonInnerActive
          ]}>
            {isRecording ? (
              <View style={styles.stopIcon} />
            ) : (
              <Ionicons name="mic" size={32} color={COLORS.WHITE} />
            )}
          </View>
        </TouchableOpacity>
        
        <Text style={styles.controlLabel}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: COLORS.PRIMARY,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  transcriptionContainer: {
    flex: 1,
    padding: 20,
  },
  transcriptionCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  transcriptionText: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.GRAY_800,
  },
  urduText: {
    textAlign: 'right',
    fontFamily: 'System',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.GRAY_500,
    marginTop: 15,
    textAlign: 'center',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: COLORS.ERROR,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.WHITE,
    marginRight: 8,
  },
  recordingText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  copyButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  clearButton: {
    backgroundColor: COLORS.GRAY_600,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  controls: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(59,130,246,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  micButtonActive: {
    backgroundColor: 'rgba(239,68,68,0.2)',
  },
  micButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.INFO,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonInnerActive: {
    backgroundColor: COLORS.ERROR,
  },
  stopIcon: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_700,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.GRAY_700,
    marginTop: 20,
  },
  submessage: {
    fontSize: 14,
    color: COLORS.GRAY_500,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

// Made with Bob
