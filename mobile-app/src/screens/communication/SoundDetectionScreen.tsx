import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/utils/constants';

interface SoundAlert {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  enabled: boolean;
  lastDetected?: Date;
}

interface DetectedSound {
  id: string;
  name: string;
  timestamp: Date;
  confidence: number;
}

export default function SoundDetectionScreen() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [detectedSounds, setDetectedSounds] = useState<DetectedSound[]>([]);
  const detectionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [soundAlerts, setSoundAlerts] = useState<SoundAlert[]>([
    { id: '1', name: 'Doorbell', icon: 'notifications', color: '#3B82F6', enabled: true },
    { id: '2', name: 'Fire Alarm', icon: 'flame', color: '#EF4444', enabled: true },
    { id: '3', name: 'Baby Crying', icon: 'happy', color: '#F59E0B', enabled: true },
    { id: '4', name: 'Phone Ringing', icon: 'call', color: '#10B981', enabled: true },
    { id: '5', name: 'Knock on Door', icon: 'hand-right', color: '#8B5CF6', enabled: true },
    { id: '6', name: 'Car Horn', icon: 'car', color: '#EC4899', enabled: false },
    { id: '7', name: 'Dog Barking', icon: 'paw', color: '#F97316', enabled: false },
    { id: '8', name: 'Water Running', icon: 'water', color: '#06B6D4', enabled: false },
  ]);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (isMonitoring) {
      simulateSoundDetection();
    } else {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
    }

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [isMonitoring, soundAlerts]);

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
    } else {
      startMonitoring();
    }
  };

  const startMonitoring = async () => {
    if (hasPermission === false) {
      Alert.alert('Permission Required', 'Please grant microphone permission to use this feature.');
      return;
    }

    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const simulateSoundDetection = () => {
    const enabledAlerts = soundAlerts.filter(alert => alert.enabled);
    
    if (enabledAlerts.length === 0) {
      Alert.alert('No Alerts Enabled', 'Please enable at least one sound alert to start monitoring.');
      setIsMonitoring(false);
      return;
    }

    // Detect sounds more frequently (30% chance every 4 seconds)
    detectionIntervalRef.current = setInterval(() => {
      if (Math.random() < 0.3) {
        const randomAlert = enabledAlerts[Math.floor(Math.random() * enabledAlerts.length)];
        const confidence = Math.floor(Math.random() * 20) + 80;
        
        const newSound: DetectedSound = {
          id: Date.now().toString(),
          name: randomAlert.name,
          timestamp: new Date(),
          confidence,
        };

        setDetectedSounds(prev => [newSound, ...prev].slice(0, 10));
        
        // Trigger haptic feedback
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        
        // Show alert
        Alert.alert(
          '🔔 Sound Detected',
          `${randomAlert.name} detected with ${confidence}% confidence`,
          [{ text: 'OK' }]
        );
      }
    }, 4000);
  };

  const toggleAlert = (id: string) => {
    setSoundAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
      )
    );
  };

  const clearHistory = () => {
    setDetectedSounds([]);
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
        <Text style={styles.headerTitle}>Sound Detection</Text>
        <View style={styles.statusBadge}>
          <View style={[
            styles.statusDot,
            isMonitoring && styles.statusDotActive
          ]} />
          <Text style={styles.statusText}>
            {isMonitoring ? 'Monitoring' : 'Stopped'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Control Card */}
        <View style={styles.controlCard}>
          <View style={styles.controlHeader}>
            <Ionicons 
              name={isMonitoring ? 'ear' : 'ear-outline'} 
              size={32} 
              color={isMonitoring ? COLORS.SUCCESS : COLORS.GRAY_400} 
            />
            <Text style={styles.controlTitle}>
              {isMonitoring ? 'Listening for sounds...' : 'Start monitoring'}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.monitorButton,
              isMonitoring && styles.monitorButtonActive
            ]}
            onPress={toggleMonitoring}
          >
            <Text style={styles.monitorButtonText}>
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sound Alerts Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound Alerts</Text>
          <Text style={styles.sectionSubtitle}>
            Enable alerts for sounds you want to detect
          </Text>
          
          <View style={styles.alertsGrid}>
            {soundAlerts.map(alert => (
              <View key={alert.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <View style={[
                    styles.alertIconContainer,
                    { backgroundColor: alert.color + '20' }
                  ]}>
                    <Ionicons 
                      name={alert.icon} 
                      size={24} 
                      color={alert.color} 
                    />
                  </View>
                  <Switch
                    value={alert.enabled}
                    onValueChange={() => toggleAlert(alert.id)}
                    trackColor={{ false: COLORS.GRAY_300, true: alert.color }}
                    thumbColor={COLORS.WHITE}
                  />
                </View>
                <Text style={styles.alertName}>{alert.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Detection History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Detections</Text>
            {detectedSounds.length > 0 && (
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {detectedSounds.length > 0 ? (
            <View style={styles.historyList}>
              {detectedSounds.map(sound => (
                <View key={sound.id} style={styles.historyItem}>
                  <View style={styles.historyIcon}>
                    <Ionicons name="volume-high" size={20} color={COLORS.PRIMARY} />
                  </View>
                  <View style={styles.historyContent}>
                    <Text style={styles.historyName}>{sound.name}</Text>
                    <Text style={styles.historyTime}>
                      {sound.timestamp.toLocaleTimeString()}
                    </Text>
                  </View>
                  <View style={styles.confidenceBadge}>
                    <Text style={styles.confidenceText}>{sound.confidence}%</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyHistory}>
              <Ionicons name="time-outline" size={48} color={COLORS.GRAY_300} />
              <Text style={styles.emptyText}>No sounds detected yet</Text>
              <Text style={styles.emptySubtext}>
                Start monitoring to detect sounds
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
    backgroundColor: COLORS.WARNING,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.GRAY_400,
  },
  statusDotActive: {
    backgroundColor: COLORS.SUCCESS,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  content: {
    flex: 1,
  },
  controlCard: {
    backgroundColor: COLORS.WHITE,
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  controlHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  controlTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_700,
    marginTop: 10,
  },
  monitorButton: {
    backgroundColor: COLORS.WARNING,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  monitorButtonActive: {
    backgroundColor: COLORS.ERROR,
  },
  monitorButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.GRAY_800,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    marginBottom: 15,
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  alertsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  alertCard: {
    width: '48%',
    backgroundColor: COLORS.WHITE,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_800,
  },
  historyList: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    overflow: 'hidden',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_100,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
    color: COLORS.GRAY_500,
  },
  confidenceBadge: {
    backgroundColor: COLORS.SUCCESS + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.SUCCESS,
  },
  emptyHistory: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_600,
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.GRAY_500,
    marginTop: 5,
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
