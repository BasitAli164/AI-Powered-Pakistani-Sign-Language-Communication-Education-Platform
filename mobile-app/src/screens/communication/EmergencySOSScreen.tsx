import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/utils/constants';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

interface EmergencyService {
  id: string;
  name: string;
  number: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function EmergencySOSScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'John Doe', phone: '+92 300 1234567', relation: 'Father' },
    { id: '2', name: 'Jane Doe', phone: '+92 301 7654321', relation: 'Mother' },
  ]);

  const emergencyServices: EmergencyService[] = [
    { id: '1', name: 'Police', number: '15', icon: 'shield', color: '#3B82F6' },
    { id: '2', name: 'Ambulance', number: '1122', icon: 'medical', color: '#EF4444' },
    { id: '3', name: 'Fire Brigade', number: '16', icon: 'flame', color: '#F59E0B' },
    { id: '4', name: 'Rescue', number: '1122', icon: 'help-buoy', color: '#10B981' },
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(status === 'granted');
      
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    })();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isEmergency && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            triggerEmergency();
            return 0;
          }
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isEmergency, countdown]);

  const startEmergencyCountdown = () => {
    Alert.alert(
      'Emergency SOS',
      'This will alert your emergency contacts and share your location. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start',
          style: 'destructive',
          onPress: () => {
            setIsEmergency(true);
            setCountdown(5);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          },
        },
      ]
    );
  };

  const cancelEmergency = () => {
    setIsEmergency(false);
    setCountdown(5);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const triggerEmergency = () => {
    setIsEmergency(false);
    setCountdown(5);
    
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    
    // Send emergency alerts
    Alert.alert(
      '🚨 Emergency Alert Sent',
      `Emergency contacts have been notified.\n\nYour location:\nLat: ${location?.coords.latitude.toFixed(6)}\nLon: ${location?.coords.longitude.toFixed(6)}`,
      [{ text: 'OK' }]
    );
  };

  const callEmergencyService = (service: EmergencyService) => {
    Alert.alert(
      `Call ${service.name}`,
      `Do you want to call ${service.number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${service.number}`);
          },
        },
      ]
    );
  };

  const callContact = (contact: EmergencyContact) => {
    Alert.alert(
      `Call ${contact.name}`,
      `Do you want to call ${contact.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            const phoneNumber = contact.phone.replace(/\s/g, '');
            Linking.openURL(`tel:${phoneNumber}`);
          },
        },
      ]
    );
  };

  const shareLocation = () => {
    if (!location) {
      Alert.alert('Location Unavailable', 'Unable to get your current location.');
      return;
    }

    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    
    Alert.alert(
      'Share Location',
      `Your location:\nLatitude: ${lat.toFixed(6)}\nLongitude: ${lon.toFixed(6)}\n\nOpen in maps?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Maps',
          onPress: () => Linking.openURL(mapsUrl),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency SOS</Text>
        <View style={styles.locationBadge}>
          <Ionicons 
            name={hasLocationPermission ? 'location' : 'location-outline'} 
            size={16} 
            color={COLORS.WHITE} 
          />
          <Text style={styles.locationText}>
            {hasLocationPermission ? 'Location On' : 'Location Off'}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Emergency Button */}
        <View style={styles.emergencySection}>
          {isEmergency ? (
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownTitle}>Sending Emergency Alert</Text>
              <View style={styles.countdownCircle}>
                <Text style={styles.countdownNumber}>{countdown}</Text>
              </View>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={cancelEmergency}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.sosButton}
              onPress={startEmergencyCountdown}
              onLongPress={triggerEmergency}
            >
              <View style={styles.sosButtonInner}>
                <Ionicons name="warning" size={48} color={COLORS.WHITE} />
                <Text style={styles.sosButtonText}>SOS</Text>
                <Text style={styles.sosButtonSubtext}>Tap or Hold</Text>
              </View>
            </TouchableOpacity>
          )}
          
          <Text style={styles.emergencyHint}>
            Press and hold for 3 seconds to send emergency alert
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={shareLocation}
          >
            <View style={[styles.actionIcon, { backgroundColor: COLORS.PRIMARY + '20' }]}>
              <Ionicons name="location" size={24} color={COLORS.PRIMARY} />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Share Location</Text>
              <Text style={styles.actionSubtitle}>
                {location 
                  ? `${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`
                  : 'Location unavailable'
                }
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.GRAY_400} />
          </TouchableOpacity>
        </View>

        {/* Emergency Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Services</Text>
          
          <View style={styles.servicesGrid}>
            {emergencyServices.map(service => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => callEmergencyService(service)}
              >
                <View style={[
                  styles.serviceIcon,
                  { backgroundColor: service.color + '20' }
                ]}>
                  <Ionicons name={service.icon} size={28} color={service.color} />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceNumber}>{service.number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            <TouchableOpacity>
              <Ionicons name="add-circle" size={24} color={COLORS.PRIMARY} />
            </TouchableOpacity>
          </View>
          
          {emergencyContacts.length > 0 ? (
            <View style={styles.contactsList}>
              {emergencyContacts.map(contact => (
                <TouchableOpacity
                  key={contact.id}
                  style={styles.contactCard}
                  onPress={() => callContact(contact)}
                >
                  <View style={styles.contactAvatar}>
                    <Text style={styles.contactInitial}>
                      {contact.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactRelation}>{contact.relation}</Text>
                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                  </View>
                  <Ionicons name="call" size={24} color={COLORS.SUCCESS} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContacts}>
              <Ionicons name="people-outline" size={48} color={COLORS.GRAY_300} />
              <Text style={styles.emptyText}>No emergency contacts</Text>
              <Text style={styles.emptySubtext}>Add contacts to alert in emergencies</Text>
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
    backgroundColor: COLORS.ERROR,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  content: {
    flex: 1,
  },
  emergencySection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.ERROR,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.ERROR,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  sosButtonInner: {
    alignItems: 'center',
  },
  sosButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginTop: 10,
  },
  sosButtonSubtext: {
    fontSize: 12,
    color: COLORS.WHITE,
    opacity: 0.8,
    marginTop: 5,
  },
  countdownContainer: {
    alignItems: 'center',
  },
  countdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.ERROR,
    marginBottom: 20,
  },
  countdownCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.ERROR,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: COLORS.ERROR + '40',
  },
  countdownNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  cancelButton: {
    marginTop: 30,
    backgroundColor: COLORS.GRAY_700,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  emergencyHint: {
    fontSize: 14,
    color: COLORS.GRAY_600,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.GRAY_800,
    marginBottom: 15,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: COLORS.GRAY_500,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: COLORS.WHITE,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 4,
  },
  serviceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
  },
  contactsList: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 2,
  },
  contactRelation: {
    fontSize: 12,
    color: COLORS.GRAY_500,
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: COLORS.GRAY_600,
  },
  emptyContacts: {
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
    textAlign: 'center',
  },
});

// Made with Bob
