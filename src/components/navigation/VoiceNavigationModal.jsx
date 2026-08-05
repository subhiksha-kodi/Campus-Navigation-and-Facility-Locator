import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Navigation, Volume2, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

// Helper to translate spoken Tanglish (romanized Tamil) terms to database English names
const translateTanglishToEnglish = (text) => {
  const t = text.toLowerCase().trim();

  // Food / Cafeteria
  if (t.includes('unavagam') || t.includes('unavakam') || t.includes('saapadu') || t.includes('canteen') || t.includes('cafeteria') || t.includes('food')) return 'Main Cafeteria';

  // Library
  if (t.includes('noolgam') || t.includes('noollagam') || t.includes('library') || t.includes('book') || t.includes('padikka')) return 'Central Library';

  // Medical
  if (t.includes('maruthuvam') || t.includes('hospital') || t.includes('clinic') || t.includes('health') || t.includes('medical') || t.includes('aaspathiri')) return 'Medical Centre';

  // Auditorium
  if (t.includes('arangam') || t.includes('auditorium') || t.includes('hall')) return 'Auditorium';

  // Hostel
  if (t.includes('hostel') || t.includes('viduthy') || t.includes('viduthi')) {
    if (t.includes('girls') || t.includes('penn') || t.includes('maanavi')) return 'Girls Hostel';
    return 'Boys Hostel';
  }

  // ATM / Bank
  if (t.includes('atm') || t.includes('venki') || t.includes('bank') || t.includes('panam')) return 'State Bank of India ATM';

  // Sports / Court
  if (t.includes('vilaiyattu') || t.includes('tennis') || t.includes('court') || t.includes('ground')) return 'Tennis Court';

  // Parking
  if (t.includes('parking') || t.includes('vandi') || t.includes('vehicle')) return 'Vehicle Parking';

  // Blocks and Classrooms
  if (t.includes('cs') || t.includes('computer') || t.includes('kanini')) {
    if (t.includes('303')) return 'CS303';
    if (t.includes('101')) return 'CS101';
    return 'Computer Science Block';
  }
  if (t.includes('ib block') || t.includes('ib') || t.includes('information')) return 'IB Block';
  if (t.includes('sf block') || t.includes('sf') || t.includes('science')) return 'SF Block';
  if (t.includes('mech') || t.includes('mechanical')) return 'Mech';

  return text; // fallback — return as-is
};

export const VoiceNavigationModal = ({ isOpen, onClose, onStartNavigation }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lang, setLang] = useState('en-US');
  const [statusMessage, setStatusMessage] = useState('Tap the microphone and say a destination.');
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    // Check Speech Recognition support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setStatusMessage('Listening stopped. Tap microphone to try again.');
      return;
    }

    setTranscript('');
    setIsListening(true);
    setStatusMessage(
      lang === 'ta-IN'
        ? 'Listening... Tanglish la pesavum (e.g. unavagam, noollagam, CS 303, maruthuvam)'
        : 'Listening... Speak your destination clearly (e.g. Cafeteria, CS303, Library)'
    );

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang;

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (lang === 'ta-IN') {
          const englishTranslation = translateTanglishToEnglish(text);
          setTranscript(englishTranslation);
          setStatusMessage(`Tanglish recognized: "${text}" ➔ Navigating to: "${englishTranslation}"`);
        } else {
          setTranscript(text);
          setStatusMessage(`You said: "${text}"`);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setStatusMessage('Could not recognize voice input. Please try again or type below.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      // Simulation fallback for browsers without webkitSpeechRecognition
      setTimeout(() => {
        const demoDestinations = lang === 'ta-IN'
          ? ['unavagam', 'noollagam', 'CS 303', 'maruthuvam', 'parking']
          : ['Central Library', 'Main Cafeteria', 'Classroom CS303', 'Medical Centre', 'Parking Lot B'];
        const randomPick = demoDestinations[Math.floor(Math.random() * demoDestinations.length)];
        
        if (lang === 'ta-IN') {
          const englishTranslation = translateTanglishToEnglish(randomPick);
          setTranscript(englishTranslation);
          setStatusMessage(`Tanglish recognized (demo): "${randomPick}" ➔ Navigating to: "${englishTranslation}"`);
        } else {
          setTranscript(randomPick);
          setIsListening(false);
          setStatusMessage(`You said (simulated): "${randomPick}"`);
        }
      }, 2500);
    }
  };

  const handleConfirm = () => {
    if (transcript && onStartNavigation) {
      onStartNavigation(transcript);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Voice Navigation Assistant" maxWidth="max-w-md">
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Where would you like to go?</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mb-3">{statusMessage}</p>
          
          {/* Language Selector */}
          <div className="flex justify-center items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Lang:</span>
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-[11px]">
              <button
                type="button"
                onClick={() => setLang('en-US')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  lang === 'en-US'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('ta-IN')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  lang === 'ta-IN'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tanglish (தமிழ்+English)
              </button>
            </div>
          </div>
        </div>

        {/* Large Microphone Trigger Button */}
        <div className="relative">
          {isListening && (
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
          )}
          <button
            onClick={toggleListening}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-md ${
              isListening
                ? 'bg-red-600 text-white ring-8 ring-red-100 scale-105'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
            aria-label={isListening ? 'Stop Listening' : 'Start Listening'}
          >
            {isListening ? (
              <MicOff className="w-10 h-10 animate-pulse" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>
        </div>

        {/* Voice Feedback Preview Box */}
        {transcript ? (
          <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 text-left animate-in fade-in">
            <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
              Recognized Destination
            </span>
            <p className="text-base font-bold text-slate-900 mt-0.5 flex items-center justify-between">
              <span>{transcript}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </p>
          </div>
        ) : (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500">
            {lang === 'ta-IN'
              ? <>Try saying: <strong>"unavagam"</strong>, <strong>"noollagam"</strong>, <strong>"CS 303"</strong>, <strong>"maruthuvam"</strong></>
              : <>Try saying: <strong>"Take me to the Library"</strong> or <strong>"Find CS303"</strong></>
            }
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full pt-2">
          <Button variant="outline" size="md" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            fullWidth
            disabled={!transcript}
            icon={Navigation}
            onClick={handleConfirm}
          >
            Start Navigation
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Helper to map a voice query string to a route path
export const mapVoiceQuery = (query = '') => {
  const q = query.toLowerCase().trim();
  if (q.includes('map') || q.includes('campus')) return '/map';
  if (q.includes('classroom') || q.includes('room') || q.includes('cs') || q.includes('lab')) return `/classrooms?q=${encodeURIComponent(query)}`;
  if (q.includes('cafeteria') || q.includes('food') || q.includes('canteen')) return '/facilities?q=cafeteria';
  if (q.includes('library')) return '/facilities?q=library';
  if (q.includes('medical') || q.includes('hospital') || q.includes('sos') || q.includes('emergency')) return '/emergency';
  if (q.includes('parking')) return '/map';
  if (q.includes('notice') || q.includes('announcement')) return '/notices';
  if (q.includes('timetable') || q.includes('schedule')) return '/timetable';
  if (q.includes('complaint') || q.includes('issue') || q.includes('problem')) return '/complaints';
  if (q.includes('profile')) return '/profile';
  if (q.includes('settings')) return '/settings';
  return `/facilities?q=${encodeURIComponent(query)}`;
};
