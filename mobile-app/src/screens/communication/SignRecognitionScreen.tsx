import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/utils/constants';

const { width, height } = Dimensions.get('window');

export default function SignRecognitionScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('front');
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const cameraRef = useRef<CameraView>(null);


  const toggleRecording = () => {
    if (isRecording) {
      stopRecognition();
    } else {
      startRecognition();
    }
  };

  const startRecognition = () => {
    setIsRecording(true);
    // Mock recognition - replace with actual AI model
    simulateRecognition();
  };

  const stopRecognition = () => {
    setIsRecording(false);
    setRecognizedText('');
    setConfidence(0);
  };

  const simulateRecognition = () => {
    // Mock data - replace with actual sign recognition
    const mockSigns = ['Hello', 'Thank you', 'Please', 'Yes', 'No', 'Help'];
    const randomSign = mockSigns[Math.floor(Math.random() * mockSigns.length)];
    const randomConfidence = Math.floor(Math.random() * 30) + 70;
    
    setTimeout(() => {
      if (isRecording) {
        setRecognizedText(randomSign);
        setConfidence(randomConfidence);
      }
    }, 1000);
  };

  const flipCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Ionicons name="camera-outline" size={64} color={COLORS.GRAY_400} />
        <Text style={styles.message}>No access to camera</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => {}}>
            <Ionicons name="close" size={28} color={COLORS.WHITE} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign Recognition</Text>
          <TouchableOpacity style={styles.headerButton} onPress={flipCamera}>
            <Ionicons name="camera-reverse" size={28} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>

        {/* Recognition Overlay */}
        <View style={styles.overlay}>
          <View style={styles.frameContainer}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {isRecording && (
              <View style={styles.scanLine} />
            )}
          </View>

          <Text style={styles.instructionText}>
            {isRecording ? 'Performing sign...' : 'Tap record to start'}
          </Text>
        </View>

        {/* Recognition Result */}
        {recognizedText && (
          <View style={styles.resultContainer}>
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Recognized Sign:</Text>
              <Text style={styles.resultText}>{recognizedText}</Text>
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Confidence:</Text>
                <View style={styles.confidenceBar}>
                  <View 
                    style={[
                      styles.confidenceFill, 
                      { width: `${confidence}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.confidenceText}>{confidence}%</Text>
              </View>
            </View>
          </View>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[
              styles.recordButton,
              isRecording && styles.recordButtonActive
            ]}
            onPress={toggleRecording}
          >
            <View style={[
              styles.recordButtonInner,
              isRecording && styles.recordButtonInnerActive
            ]}>
              {isRecording ? (
                <View style={styles.stopIcon} />
              ) : (
                <Ionicons name="hand-left" size={32} color={COLORS.WHITE} />
              )}
            </View>
          </TouchableOpacity>
          
          <Text style={styles.controlLabel}>
            {isRecording ? 'Stop' : 'Start Recognition'}
          </Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
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
  permissionButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameContainer: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: COLORS.PRIMARY,
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: COLORS.PRIMARY,
    top: '50%',
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resultContainer: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
  },
  resultCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GRAY_600,
    marginBottom: 5,
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 15,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.GRAY_600,
    marginRight: 10,
  },
  confidenceBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.GRAY_200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: COLORS.SUCCESS,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.GRAY_700,
    marginLeft: 10,
    minWidth: 40,
  },
  controls: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  recordButtonActive: {
    backgroundColor: 'rgba(239,68,68,0.3)',
  },
  recordButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonInnerActive: {
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
    color: COLORS.WHITE,
  },
});

// Made with Bob
