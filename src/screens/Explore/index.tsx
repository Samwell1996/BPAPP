import { useCallback, useEffect, useReducer, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { TouchableOpacity, View, Text } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import { useStores } from '@stores/hooks/useStores';

const audioRecorderPlayer = new AudioRecorderPlayer()

const AUDIO_STATUS = {
  COMPLETED: 'audio-completed',
  INITIAL: 'audio-initial'
}

type State = {
  uri: string;
  isRecording: boolean;
  audioText: string;
  status: string;
};

type Action =
  | { type: 'START_RECORDING'; uri: string }
  | { type: 'STOP_RECORDING' }
  | { type: 'SET_TEXT'; text: string }
  | { type: 'RESET' };

const initialState: State = {
  uri: '',
  isRecording: false,
  audioText: '',
  status: AUDIO_STATUS.INITIAL,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'START_RECORDING':
      return { ...state, isRecording: true, uri: action.uri };
    case 'STOP_RECORDING':
      return { ...state, isRecording: false, status: AUDIO_STATUS.COMPLETED };
    case 'SET_TEXT':
      return { ...state, audioText: action.text, status: AUDIO_STATUS.INITIAL };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const ExploreContainer = () => {
  const [{isRecording, uri, status, audioText}, dispatch] = useReducer(reducer, initialState);
  const {
    posts: { fetchSpeech },
  } = useStores();

  const onStartRecord = useCallback(async() => {
    if(isRecording) {
      return
    }

    const uri = await audioRecorderPlayer.startRecorder();
    dispatch({ type: 'START_RECORDING', uri });
  }, []);

  const onStopRecord = async () => {
    await audioRecorderPlayer.stopRecorder()
    dispatch({ type: 'STOP_RECORDING' });
  };

  const getSpeech = useCallback(async() => {
    if(isRecording || status !== AUDIO_STATUS.COMPLETED) {
      return
    }

    const response = await fetchSpeech.run({audioUrl: uri})
    const text = response?.result?.text
    dispatch({ type: 'SET_TEXT', text });
  }, [uri, isRecording, status]);


  useEffect(() => {
    getSpeech()
  }, [status])

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={isRecording ? onStopRecord : onStartRecord}
        style={{ height: 40, backgroundColor: isRecording ? 'orange' : 'red', justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>{!isRecording ? 'Start Record': 'Stop Record'}</Text>
      </TouchableOpacity>
      <Text style={{alignItems: 'center', fontSize: 16, margin: 16}}>{audioText}</Text>
    </View>
  );
};

export default observer(ExploreContainer);
