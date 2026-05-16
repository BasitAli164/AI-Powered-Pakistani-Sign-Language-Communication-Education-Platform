import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommunicationScreen from '@/screens/communication/CommunicationScreen';
import SignRecognitionScreen from '@/screens/communication/SignRecognitionScreen';
import SpeechToTextScreen from '@/screens/communication/SpeechToTextScreen';
import TextToSignScreen from '@/screens/communication/TextToSignScreen';
import SoundDetectionScreen from '@/screens/communication/SoundDetectionScreen';
import EmergencySOSScreen from '@/screens/communication/EmergencySOSScreen';

export type CommunicationStackParamList = {
  CommunicationHub: undefined;
  SignRecognition: undefined;
  SpeechToText: undefined;
  TextToSign: undefined;
  SoundDetection: undefined;
  EmergencySOS: undefined;
};

const Stack = createStackNavigator<CommunicationStackParamList>();

export default function CommunicationNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="CommunicationHub" 
        component={CommunicationScreen} 
      />
      <Stack.Screen 
        name="SignRecognition" 
        component={SignRecognitionScreen} 
      />
      <Stack.Screen 
        name="SpeechToText" 
        component={SpeechToTextScreen} 
      />
      <Stack.Screen 
        name="TextToSign" 
        component={TextToSignScreen} 
      />
      <Stack.Screen 
        name="SoundDetection" 
        component={SoundDetectionScreen} 
      />
      <Stack.Screen 
        name="EmergencySOS" 
        component={EmergencySOSScreen} 
      />
    </Stack.Navigator>
  );
}

// Made with Bob
