import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Navigation, Volume2, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

// Voice Query Mapping Helper for bilingual parsing
export const mapVoiceQuery = (query) => {
  const q = query.toLowerCase();
  
  // Tamil mappings
  if (q.includes('உணவகம்') || q.includes('சாப்பாடு') || q.includes('canteen') || q.includes('கேண்டீன்') || q.includes('cafeteria')) {
    return { mappedName: 'Main Cafeteria', displayName: 'உணவகம் (Main Cafeteria)' };
  }
  if (q.includes('நூலகம்') || q.includes('லைப்ரரி') || q.includes('புத்தக') || q.includes('library')) {
    return { mappedName: 'Central Library', displayName: 'நூலகம் (Central Library)' };
  }
  if (q.includes('மருத்துவ') || q.includes('கிளினிக்') || q.includes('டாக்டர்') || q.includes('clinic') || q.includes('medical') || q.includes('ஹோஸ்பிடல்')) {
    return { mappedName: 'Medical Centre', displayName: 'மருத்துவ மையம் (Medical Centre)' };
  }
  if (q.includes('வண்டி') || q.includes('வாகன') || q.includes('பார்க்கிங்') || q.includes('parking')) {
    return { mappedName: 'Main Parking Lot B', displayName: 'வாகன நிறுத்தம் (Main Parking Lot B)' };
  }
  if (q.includes('கணினி') || q.includes('கம்ப்யூட்டர்') || q.includes('cs') || q.includes('computer science')) {
    return { mappedName: 'Computer Science Block (CS303)', displayName: 'கணினி அறிவியல் (Computer Science Block)' };
  }
  
  // English fallbacks
  return { mappedName: query, displayName: query };
};

export const VoiceNavigationModal = ({ isOpen, onClose, onStartNavigation }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [mappedResult, setMappedResult] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US'); // 'en-US' or 'ta-IN'
  const [statusMessage, setStatusMessage] = useState('Tap the microphone and say a destination.');
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  // Update instructions when language changes
  useEffect(() => {
    if (selectedLanguage === 'ta-IN') {
      setStatusMessage('மைக்ரோஃபோனைத் தட்டி பேசவும் (உதாரணமாக: உணவகம், நூலகம், பார்க்கிங்).');
    } else {
      setStatusMessage('Tap the microphone and say a destination (e.g. Cafeteria, Library, Parking).');
    }
  }, [selectedLanguage]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setStatusMessage(selectedLanguage === 'ta-IN' ? 'கேட்பது நிறுத்தப்பட்டது.' : 'Listening stopped. Tap microphone to try again.');
      return;
    }

    setTranscript('');
    setMappedResult(null);
    setIsListening(true);
    setStatusMessage(selectedLanguage === 'ta-IN' ? 'கேட்கிறது... பேசவும்...' : 'Listening... Speak your destination clearly');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage;

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        
        const mapped = mapVoiceQuery(text);
        setMappedResult(mapped);
        
        setIsListening(false);
        setStatusMessage(selectedLanguage === 'ta-IN' ? `நீங்கள் சொன்னது: "${mapped.displayName}"` : `You said: "${mapped.displayName}"`);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setStatusMessage(selectedLanguage === 'ta-IN' ? 'குரலை அடையாளம் காண முடியவில்லை. மீண்டும் முயற்சிக்கவும்.' : 'Could not recognize voice input. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      // Simulation fallback for offline browsers
      setTimeout(() => {
        let textResult = 'Main Cafeteria';
        if (selectedLanguage === 'ta-IN') {
          textResult = 'உணவகம் எங்கே இருக்கிறது?';
        }
        
        setTranscript(textResult);
        const mapped = mapVoiceQuery(textResult);
        setMappedResult(mapped);
        
        setIsListening(false);
        setStatusMessage(selectedLanguage === 'ta-IN' ? `நீங்கள் சொன்னது: "${mapped.displayName}"` : `You said: "${mapped.displayName}"`);
      }, 2000);
    }
  };

  const handleConfirm = () => {
    if (mappedResult && onStartNavigation) {
      onStartNavigation(mappedResult.mappedName);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Voice Navigation Assistant" maxWidth="max-w-md">
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-4">
        
        {/* Language Selector Selector */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setSelectedLanguage('en-US')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              selectedLanguage === 'en-US' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setSelectedLanguage('ta-IN')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
              selectedLanguage === 'ta-IN' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            தமிழ் (Tamil)
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {selectedLanguage === 'ta-IN' ? 'நீங்கள் எங்கே செல்ல வேண்டும்?' : 'Where would you like to go?'}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 max-w-xs">{statusMessage}</p>
        </div>

        {/* Microphone Button */}
        <div className="relative">
          {isListening && (
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
          )}
          <button
            onClick={toggleListening}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md ${
              isListening
                ? 'bg-red-650 text-white ring-8 ring-red-100 scale-105'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
            aria-label={isListening ? 'Stop Listening' : 'Start Listening'}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 animate-pulse" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Display recognized query feedback mapping */}
        {mappedResult ? (
          <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 text-left animate-in fade-in">
            <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
              {selectedLanguage === 'ta-IN' ? 'கண்டறியப்பட்ட இடம்' : 'Recognized Destination'}
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5 flex items-center justify-between">
              <span>{mappedResult.displayName}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            </p>
          </div>
        ) : (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500">
            {selectedLanguage === 'ta-IN' ? (
              <span>உதாரணமாகச் சொல்லுங்கள்: <strong>"உணவகம் எங்கே இருக்கிறது?"</strong> அல்லது <strong>"நூலகம்"</strong></span>
            ) : (
              <span>Try saying: <strong>"Take me to the Cafeteria"</strong> or <strong>"Find Library"</strong></span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 w-full pt-2">
          <Button variant="outline" size="md" fullWidth onClick={onClose}>
            {selectedLanguage === 'ta-IN' ? 'ரத்துசெய்' : 'Cancel'}
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            disabled={!transcript}
            icon={Navigation}
            onClick={handleConfirm}
          >
            {selectedLanguage === 'ta-IN' ? 'வழியைக்காட்டு' : 'Start Navigation'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
