import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommunicationStackParamList } from '@/navigation/CommunicationNavigator';
import { COLORS } from '@/utils/constants';

const { width } = Dimensions.get('window');

type CommunicationScreenNavigationProp = StackNavigationProp<
  CommunicationStackParamList,
  'CommunicationHub'
>;

export default function CommunicationScreen() {
  const navigation = useNavigation<CommunicationScreenNavigationProp>();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'sign-recognition',
      title: 'Sign Recognition',
      description: 'Convert sign language to text in real-time',
      icon: 'hand-left',
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
    },
    {
      id: 'speech-to-text',
      title: 'Speech to Text',
      description: 'Convert spoken words to text instantly',
      icon: 'mic',
      color: '#3B82F6',
      gradient: ['#3B82F6', '#2563EB'],
    },
    {
      id: 'text-to-sign',
      title: 'Text to Sign',
      description: 'Convert text to sign language animations',
      icon: 'text',
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#7C3AED'],
    },
    {
      id: 'sound-detection',
      title: 'Sound Detection',
      description: 'Get alerts for important environmental sounds',
      icon: 'volume-high',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
    },
  ];

  const quickActions = [
    { id: 'emergency', title: 'Emergency SOS', icon: 'alert-circle', color: '#EF4444' },
    { id: 'history', title: 'Conversation History', icon: 'time', color: '#6B7280' },
    { id: 'settings', title: 'Settings', icon: 'settings', color: '#6B7280' },
  ];

  const handleFeaturePress = (featureId: string) => {
    setActiveFeature(featureId);
    
    switch (featureId) {
      case 'sign-recognition':
        navigation.navigate('SignRecognition');
        break;
      case 'speech-to-text':
        navigation.navigate('SpeechToText');
        break;
      case 'text-to-sign':
        navigation.navigate('TextToSign');
        break;
      case 'sound-detection':
        navigation.navigate('SoundDetection');
        break;
      default:
        break;
    }
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === 'emergency') {
      navigation.navigate('EmergencySOS');
    }
    // Other actions can be implemented later
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Communication Hub</Text>
        <Text style={styles.headerSubtitle}>Choose a communication method</Text>
      </View>

      {/* Main Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Main Features</Text>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={feature.id}
            style={[
              styles.featureCard,
              { backgroundColor: feature.color },
              activeFeature === feature.id && styles.activeFeatureCard,
            ]}
            onPress={() => handleFeaturePress(feature.id)}
            activeOpacity={0.8}
          >
            <View style={styles.featureIconContainer}>
              <Ionicons name={feature.icon as any} size={32} color={COLORS.WHITE} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { borderColor: action.color }]}
              onPress={() => handleQuickAction(action.id)}
            >
              <Ionicons name={action.icon as any} size={28} color={action.color} />
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Activity</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="chatbubbles" size={24} color={COLORS.PRIMARY} />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Conversations</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="hand-left" size={24} color={COLORS.SUCCESS} />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Signs Detected</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="volume-high" size={24} color={COLORS.WARNING} />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Sounds Detected</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_50,
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.WHITE,
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.GRAY_900,
    marginBottom: 15,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  activeFeatureCard: {
    transform: [{ scale: 0.98 }],
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.WHITE,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: COLORS.WHITE,
    opacity: 0.9,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 55) / 3,
    aspectRatio: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.GRAY_700,
    marginTop: 8,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.GRAY_900,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.GRAY_600,
    textAlign: 'center',
  },
});

// Made with Bob
