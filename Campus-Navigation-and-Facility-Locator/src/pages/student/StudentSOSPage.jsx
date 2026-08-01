import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert, Phone, MapPin, HeartPulse, AlertTriangle, Users,
  Video, Mic, Square, Play, CheckCircle2, Radio, Send, Volume2
} from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useStudent } from '../../context/StudentContext';
import { useToast } from '../../context/ToastContext';

export const StudentSOSPage = () => {
  const { student, emergencyContacts, triggerSOSAlert, emergencyAlerts } = useStudent();
  const { addToast } = useToast();

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [activeSOSRecord, setActiveSOSRecord] = useState(null);
  const [customAlertMsg, setCustomAlertMsg] = useState('');
  const [cameraError, setCameraError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const videoChunksRef = useRef([]);
  const liveVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Clean up media streams when unmounting
  useEffect(() => {
    return () => {
      stopMediaStream();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  // Start Camera + Voice Recording
  const startRecordingSOS = async () => {
    setRecordedVideoUrl(null);
    setCameraError(null);
    videoChunksRef.current = [];

    try {
      // Request camera + mic stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true
      });

      mediaStreamRef.current = stream;
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
      }

      // Initialize MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
        ? 'video/webm;codecs=vp9,opus'
        : 'video/webm';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          videoChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(videoChunksRef.current, { type: mimeType });
        const videoUrl = URL.createObjectURL(videoBlob);
        setRecordedVideoUrl(videoUrl);
        stopMediaStream();

        // Dispatch SOS with recorded video URL
        dispatchSOSWithVideo(videoUrl);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(500);
      setIsRecording(true);
      setRecordingTime(0);

      // Countdown timer for 5 seconds automatic recording limit
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 4) {
            stopRecordingSOS();
            return 5;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.warn('Camera/Mic permission error:', err);
      setCameraError('Camera access denied or unavailable. Generating emergency voice & position log.');

      // Fallback: Dispatch SOS immediately with location alert
      dispatchSOSWithVideo(null);
    }
  };

  // Stop Recording manually or via timer
  const stopRecordingSOS = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Dispatch SOS Alert to Admin Log
  const dispatchSOSWithVideo = (videoUrl) => {
    const defaultMsg = `🚨 EMERGENCY ALERT: ${student.name} (${student.id}, ${student.department}) initiated an SOS panic trigger with video & voice recording!`;
    const finalMsg = customAlertMsg ? `${defaultMsg} Note: "${customAlertMsg}"` : defaultMsg;

    const record = triggerSOSAlert('Academic Block B - Floor 3 (Near AI Lab)', videoUrl, finalMsg);
    setActiveSOSRecord(record);

    addToast('EMERGENCY SOS BROADCASTED! Video & voice clip sent to Admin Control Room.', 'error', 'ALERT DISPATCHED');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Emergency SOS & Safety Directory"
        description="One-touch emergency dispatch with live camera & voice recording sent instantly to the Admin Control Room."
        breadcrumbs={[{ label: 'Emergency SOS' }]}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Panic SOS Trigger Banner */}
        <Card className="border-2 border-red-500 bg-red-50/60 text-center p-6 shadow-xl">
          <CardContent className="space-y-5 p-0">
            <div className="relative inline-block">
              <div className={`w-24 h-24 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-2xl transition-transform ${isRecording ? 'scale-110 ring-8 ring-red-400 animate-pulse' : 'animate-bounce'}`}>
                <ShieldAlert className="w-14 h-14" />
              </div>
              {isRecording && (
                <span className="absolute top-0 right-0 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500"></span>
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-black text-red-950 uppercase tracking-tight">
                Campus Emergency Panic Button
              </h2>
              <p className="text-xs text-red-700 mt-1.5 max-w-md mx-auto font-medium">
                Clicking the button records a <strong>live video & voice clip</strong> with your Student ID (<strong>{student.id}</strong>) and transmits an immediate high-priority alert to the Admin Control Room.
              </p>
            </div>

            {/* Optional Emergency Note */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Optional: Add quick message (e.g. Medical emergency at Lab 3)..."
                value={customAlertMsg}
                onChange={(e) => setCustomAlertMsg(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-red-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* LIVE CAMERA PREVIEW DURING RECORDING */}
            {isRecording && (
              <div className="max-w-md mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-red-600 relative">
                <video
                  ref={liveVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-white" /> REC 00:0{recordingTime}s
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1">
                  <Mic className="w-3 h-3 text-red-400 animate-pulse" /> Audio + Video Recording Active
                </div>
              </div>
            )}

            {/* SOS BUTTON ACTIONS */}
            {!isRecording ? (
              <Button
                variant="danger"
                size="lg"
                fullWidth
                icon={Video}
                onClick={startRecordingSOS}
                className="py-4 text-base font-black shadow-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                RECORD VIDEO & VOICE — DISPATCH EMERGENCY ALERT TO ADMIN
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                fullWidth
                icon={Square}
                onClick={stopRecordingSOS}
                className="py-4 text-base font-black border-2 border-red-600 text-red-700 hover:bg-red-100"
              >
                STOP RECORDING & SEND NOW ({5 - recordingTime}s)
              </Button>
            )}

            {cameraError && (
              <div className="p-3 bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs flex items-center gap-2 max-w-md mx-auto text-left">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700" />
                <span>{cameraError}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ADMIN ALERT MONITOR & VIDEO PLAYBACK CARD */}
        {(activeSOSRecord || emergencyAlerts.length > 0) && (
          <Card className="border-2 border-red-500 bg-white shadow-xl overflow-hidden">
            <CardHeader className="bg-red-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 animate-pulse text-white" />
                  <CardTitle className="text-sm font-black text-white uppercase tracking-wider">
                    Admin Emergency Alert Dispatch Monitor
                  </CardTitle>
                </div>
                <Badge variant="error" size="sm" className="bg-white text-red-700 font-extrabold">
                  LIVE BROADCAST TO SECURITY CONTROL
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
              {emergencyAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-red-50/80 rounded-2xl border border-red-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                      <h4 className="font-extrabold text-slate-900 text-sm">{alert.id}</h4>
                      <Badge variant="error" size="sm">{alert.status}</Badge>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{alert.date} at {alert.time}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Student Credentials</span>
                      <p className="font-bold text-slate-900">{alert.studentName} ({alert.studentId})</p>
                      <p className="text-slate-600">{alert.department}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Emergency Location</span>
                      <p className="font-bold text-red-700 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-600" /> {alert.location}
                      </p>
                    </div>
                  </div>

                  {/* ALERT MESSAGE SENT TO ADMIN */}
                  <div className="p-3 bg-white rounded-xl border border-red-200 text-xs text-slate-800 font-medium">
                    <span className="font-extrabold text-red-800 block mb-0.5">📢 Alert Message Sent to Admin:</span>
                    {alert.alertMessage}
                  </div>

                  {/* RECORDED VIDEO & VOICE PLAYER */}
                  {alert.videoUrl ? (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1">
                        <Video className="w-4 h-4 text-red-600" /> Recorded SOS Video & Audio Clip (Admin Playback):
                      </span>
                      <div className="rounded-xl overflow-hidden bg-black border border-slate-800 shadow-md">
                        <video
                          src={alert.videoUrl}
                          controls
                          className="w-full max-h-56 object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-100 rounded-xl text-slate-600 text-xs flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Audio & Location ping transmitted directly to Campus Security Dispatch.</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-red-200/50">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Security Guard Dispatched to Spot
                    </span>
                    <span className="text-slate-400 text-[11px]">Control Room Status: <strong>Monitoring</strong></span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Emergency Contacts Directory */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campus Emergency Helplines</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, idx) => (
              <Card key={idx}>
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{contact.title}</h4>
                    <p className="text-xs font-mono font-bold text-red-600">{contact.number}</p>
                    <span className="text-[11px] text-slate-500 block">{contact.subtitle}</span>
                  </div>

                  <a
                    href={`tel:${contact.number}`}
                    className="p-3 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors border border-red-200 shrink-0"
                    title="Call Helpline"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nearest Safety Facilities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold">Nearest Emergency Facilities</CardTitle>
          </CardHeader>
          <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Medical Centre / Clinic</span>
              <p className="text-slate-500">Ground Floor, Health Wing Block C (~120m)</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Main Security Office</span>
              <p className="text-slate-500">Gate #1 Main Entrance (~200m)</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block">Emergency Fire Exit</span>
              <p className="text-slate-500">Academic Block B Stairwell East (~15m)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};
