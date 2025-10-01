import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';

let Voice;
if (Platform.OS !== 'web') {
  try {
    Voice = require('react-native-voice').default;
  } catch (e) {
    Voice = null;
  }
}

export default function CaptionInput({ initial = '', onSave }) {
  const [text, setText] = useState(initial);
  const [listening, setListening] = useState(false);
  const [webRecog, setWebRecog] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.interimResults = false;
        recog.onresult = (e) => {
          const t = Array.from(e.results).map(r => r[0].transcript).join('');
          setText(t);
          setListening(false);
        };
        recog.onend = () => setListening(false);
        setWebRecog(recog);
      }
    } else if (Voice) {
      Voice.onSpeechResults = (e) => {
        if (e.value && e.value.length) setText(e.value.join(' '));
        setListening(false);
      };
      Voice.onSpeechError = () => setListening(false);
    }
    return () => {
      if (Voice) {
        Voice.destroy().then && Voice.destroy().then(() => Voice.removeAllListeners && Voice.removeAllListeners());
      }
    };
  }, []);

  const start = async () => {
    if (Platform.OS === 'web') {
      webRecog && webRecog.start();
      setListening(true);
    } else if (Voice) {
      try {
        await Voice.start('en-US');
        setListening(true);
      } catch {
        setListening(false);
      }
    } else {
      alert('Voice not available. Type your caption.')
    }
  };

  const stop = async () => {
    if (Platform.OS === 'web') {
      webRecog && webRecog.stop();
      setListening(false);
    } else if (Voice) {
      try {
        await Voice.stop();
      } catch {}
      setListening(false);
    }
  };

  return (
    <View style={{ padding: 8 }}>
      <TextInput placeholder="Caption" value={text} onChangeText={setText} style={{ borderWidth: 1, borderRadius: 8, padding: 8 }} />
      <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
        <Button title={listening ? 'Stop' : 'Dictate'} onPress={listening ? stop : start} />
        <Button title="Save" onPress={() => onSave(text)} />
      </View>
    </View>
  );
}
