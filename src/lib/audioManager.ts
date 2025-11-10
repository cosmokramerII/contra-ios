import { Audio } from 'expo-av';

class AudioManager {
  private sounds: { [key: string]: Audio.Sound | null } = {};
  private audioContext: Audio.Sound | null = null;

  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  async playSound(soundName: 'shoot' | 'hit' | 'explosion') {
    try {
      // Simple beep sounds using frequency
      const { sound } = await Audio.Sound.createAsync(
        { uri: this.generateBeepDataUri(soundName) },
        { shouldPlay: true, volume: 0.3 }
      );
      
      // Clean up after playing
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error(`Failed to play sound ${soundName}:`, error);
    }
  }

  private generateBeepDataUri(soundName: string): string {
    // Generate simple retro sounds using Web Audio API format
    // In a real app, you'd load actual audio files
    // For now, returning empty data URI as placeholder
    return 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  }

  async cleanup() {
    // Unload all sounds
    for (const key in this.sounds) {
      if (this.sounds[key]) {
        await this.sounds[key]?.unloadAsync();
      }
    }
  }
}

export const audioManager = new AudioManager();
