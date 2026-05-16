import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/utils/constants';

interface SignWord {
  word: string;
  imageUrl: string;
  description: string;
}

export default function TextToSignScreen() {
  const [inputText, setInputText] = useState('');
  const [signWords, setSignWords] = useState<SignWord[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');

  const convertToSign = () => {
    if (!inputText.trim()) return;

    setIsConverting(true);
    
    // Mock conversion - replace with actual API call
    setTimeout(() => {
      const words = inputText.trim().split(' ');
      const mockSigns: SignWord[] = words.map((word, index) => ({
        word: word,
        imageUrl: `https://via.placeholder.com/150?text=${word}`,
        description: `PSL sign for "${word}"`,
      }));
      
      setSignWords(mockSigns);
      setIsConverting(false);
    }, 1000);
  };

  const clearAll = () => {
    setInputText('');
    setSignWords([]);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en');
    setInputText('');
    setSignWords([]);
  };

  const playAnimation = (word: string) => {
    // Placeholder for playing sign animation
    console.log('Playing animation for:', word);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Text to Sign</Text>
        <TouchableOpacity 
          style={styles.languageButton}
          onPress={toggleLanguage}
        >
          <Ionicons name="language" size={20} color={COLORS.WHITE} />
          <Text style={styles.languageText}>{language === 'en' ? 'EN' : 'UR'}</Text>
        </TouchableOpacity>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Enter Text</Text>
          <TextInput
            style={[
              styles.textInput,
              language === 'ur' && styles.urduInput
            ]}
            placeholder={language === 'en' ? 'Type your message...' : 'اپنا پیغام لکھیں...'}
            placeholderTextColor={COLORS.GRAY_400}
            value={inputText}
            onChangeText={setInputText}
            multiline
            textAlign={language === 'ur' ? 'right' : 'left'}
          />
          
          <View style={styles.inputActions}>
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={clearAll}
            >
              <Ionicons name="close-circle" size={20} color={COLORS.GRAY_500} />
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.convertButton,
                (!inputText.trim() || isConverting) && styles.convertButtonDisabled
              ]}
              onPress={convertToSign}
              disabled={!inputText.trim() || isConverting}
            >
              {isConverting ? (
                <Text style={styles.convertButtonText}>Converting...</Text>
              ) : (
                <>
                  <Ionicons name="hand-left" size={20} color={COLORS.WHITE} />
                  <Text style={styles.convertButtonText}>Convert</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Signs Display */}
      <ScrollView style={styles.signsContainer}>
        {signWords.length > 0 ? (
          <View style={styles.signsGrid}>
            {signWords.map((sign, index) => (
              <View key={index} style={styles.signCard}>
                <View style={styles.signImageContainer}>
                  <View style={styles.signPlaceholder}>
                    <Ionicons name="hand-left" size={48} color={COLORS.PRIMARY} />
                  </View>
                </View>
                
                <Text style={styles.signWord}>{sign.word}</Text>
                
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={() => playAnimation(sign.word)}
                >
                  <Ionicons name="play-circle" size={32} color={COLORS.PRIMARY} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="hand-left-outline" size={64} color={COLORS.GRAY_300} />
            <Text style={styles.emptyText}>
              Enter text above to see PSL signs
            </Text>
            <Text style={styles.emptySubtext}>
              Each word will be converted to its corresponding sign
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Quick Phrases */}
      <View style={styles.quickPhrasesSection}>
        <Text style={styles.quickPhrasesTitle}>Quick Phrases</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={styles.phraseButton}
            onPress={() => setInputText('Hello')}
          >
            <Text style={styles.phraseText}>Hello</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.phraseButton}
            onPress={() => setInputText('Thank you')}
          >
            <Text style={styles.phraseText}>Thank you</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.phraseButton}
            onPress={() => setInputText('Please')}
          >
            <Text style={styles.phraseText}>Please</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.phraseButton}
            onPress={() => setInputText('Help')}
          >
            <Text style={styles.phraseText}>Help</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.phraseButton}
            onPress={() => setInputText('Yes')}
          >
            <Text style={styles.phraseText}>Yes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.phraseButton}
            onPress={() => setInputText('No')}
          >
            <Text style={styles.phraseText}>No</Text>
          </TouchableOpacity>
        </ScrollView>
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
    backgroundColor: COLORS.SECONDARY,
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
  inputSection: {
    padding: 20,
  },
  inputCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_700,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
    color: COLORS.GRAY_800,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  urduInput: {
    textAlign: 'right',
    fontFamily: 'System',
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: COLORS.GRAY_100,
    gap: 5,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_700,
  },
  convertButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.SECONDARY,
    gap: 8,
  },
  convertButtonDisabled: {
    backgroundColor: COLORS.GRAY_300,
  },
  convertButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  signsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  signsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  signCard: {
    width: '47%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signImageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  signPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.GRAY_100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signWord: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_800,
    marginBottom: 10,
  },
  playButton: {
    padding: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_600,
    marginTop: 15,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.GRAY_500,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  quickPhrasesSection: {
    paddingVertical: 15,
    paddingLeft: 20,
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_200,
  },
  quickPhrasesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.GRAY_700,
    marginBottom: 10,
  },
  phraseButton: {
    backgroundColor: COLORS.GRAY_100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  phraseText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_700,
  },
});

// Made with Bob
