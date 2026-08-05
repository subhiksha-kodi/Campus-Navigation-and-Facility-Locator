import React, { useEffect, useState } from 'react';
import { Star, AlertTriangle, Image, Play, X, Eye, Trash2, Filter, CheckCircle2, MessageSquare, ShieldAlert, Sparkles } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { getAllFeedbackSubmissions, getFeedbackMediaAsset, deleteFeedbackSubmission } from '../../services/feedbackService';

const ASPECT_LABELS = {
  navigationEase: 'Campus Navigation & Signage',
  hostExperience: 'Host Interaction & Guidance',
  checkInExperience: 'Gate Check-In & Entry Speed',
};

export const AdminFeedbackPage = () => {
  const { addToast } = useToast();
  const [submissions, setSubmissions] = useState(() => getAllFeedbackSubmissions());
  const [selected, setSelected] = useState(null);
  const [mediaUrls, setMediaUrls] = useState([]);
  const [filterRating, setFilterRating] = useState('all'); // 'all' | 'low' | 'high'

  const refreshSubmissions = () => {
    setSubmissions(getAllFeedbackSubmissions());
  };

  useEffect(() => {
    const onStorage = () => refreshSubmissions();
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const totalCount = submissions.length;
  const avgOverall = totalCount
    ? Math.round((submissions.reduce((s, it) => s + (it.overallRating || 0), 0) / totalCount) * 10) / 10
    : 0;
  const lowRatingCount = submissions.filter((it) => (it.overallRating || 0) <= 2).length;
  const withMediaCount = submissions.filter((it) => (it.media?.photos?.length || 0) > 0 || it.media?.video).length;

  const filteredSubmissions = submissions.filter((s) => {
    if (filterRating === 'low') return s.overallRating <= 2;
    if (filterRating === 'high') return s.overallRating >= 4;
    return true;
  });

  const openDetail = async (submission) => {
    setSelected(submission);
    const urls = [];
    try {
      if (submission.media?.photos?.length) {
        for (const p of submission.media.photos) {
          const asset = await getFeedbackMediaAsset(p.id);
          if (asset && asset.blob) {
            urls.push({ type: 'photo', url: URL.createObjectURL(asset.blob), name: p.name });
          }
        }
      }
      if (submission.media?.video) {
        const v = submission.media.video;
        const asset = await getFeedbackMediaAsset(v.id);
        if (asset && asset.blob) {
          urls.push({ type: 'video', url: URL.createObjectURL(asset.blob), name: v.name });
        }
      }
    } catch (err) {
      console.warn('Failed to load feedback media assets', err);
    }
    setMediaUrls(urls);
  };

  const closeDetail = () => {
    mediaUrls.forEach((m) => URL.revokeObjectURL(m.url));
    setMediaUrls([]);
    setSelected(null);
  };

  const handleDelete = async (id, visitorName) => {
    if (window.confirm(`Are you sure you want to delete feedback from ${visitorName}?`)) {
      try {
        await deleteFeedbackSubmission(id);
        refreshSubmissions();
        if (selected?.id === id) closeDetail();
        addToast('Feedback submission deleted.', 'info');
      } catch (err) {
        addToast('Failed to delete feedback: ' + err.message, 'error');
      }
    }
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Visitor Experience & Feedback"
        description="Monitor, analyze, and inspect post-visit ratings, aspect satisfaction scores, comments, and media submitted by campus guests."
        breadcrumbs={[{ label: 'Visitor Feedback' }]}
        actions={
          lowRatingCount > 0 ? (
            <Badge variant="error" size="md" className="font-bold animate-pulse">
              ⚠️ {lowRatingCount} Dissatisfied Feedback Flagged
            </Badge>
          ) : (
            <Badge variant="success" size="md" className="font-bold">
              All Visitor Feedback Nominal
            </Badge>
          )
        }
      />

      <div className="space-y-6">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Satisfaction</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-black text-slate-900">{avgOverall}</span>
                  <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Submissions</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{totalCount}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card className={lowRatingCount > 0 ? 'bg-rose-50/40 border-rose-200' : ''}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Low Ratings (≤ 2★)</span>
                <span className={`text-2xl font-black mt-1 block ${lowRatingCount > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                  {lowRatingCount}
                </span>
              </div>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${lowRatingCount > 0 ? 'bg-rose-100 border-rose-300 text-rose-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">With Photo/Video Media</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{withMediaCount}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                <Image className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Submissions Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                Visitor Feedback Records ({filteredSubmissions.length})
              </CardTitle>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider mr-1">Filter:</span>
                <button
                  onClick={() => setFilterRating('all')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${filterRating === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  All ({totalCount})
                </button>
                <button
                  onClick={() => setFilterRating('low')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${filterRating === 'low' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-rose-700 hover:bg-rose-50'}`}
                >
                  Dissatisfied ≤ 2★ ({lowRatingCount})
                </button>
                <button
                  onClick={() => setFilterRating('high')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${filterRating === 'high' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-emerald-700 hover:bg-emerald-50'}`}
                >
                  Satisfied 4-5★ ({submissions.filter((s) => s.overallRating >= 4).length})
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center space-y-2">
                <Star className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">No Feedback Records Found</h4>
                <p className="text-xs text-slate-450">No submissions match the current filter selection.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Visitor</th>
                      <th className="p-3.5">Visit & Host Details</th>
                      <th className="p-3.5">Overall Rating</th>
                      <th className="p-3.5">Aspect Ratings</th>
                      <th className="p-3.5">Comment Snippet</th>
                      <th className="p-3.5">Submitted</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSubmissions.map((s) => {
                      const isLowRating = (s.overallRating || 0) <= 2;
                      const hasPhotos = s.media?.photos?.length > 0;
                      const hasVideo = !!s.media?.video;

                      return (
                        <tr
                          key={s.id}
                          className={`transition-colors ${
                            isLowRating ? 'bg-rose-50/50 border-l-4 border-l-rose-500 hover:bg-rose-100/50' : 'hover:bg-slate-50/80'
                          }`}
                        >
                          {/* Visitor column */}
                          <td className="p-3.5 align-top">
                            <span className="font-extrabold text-slate-900 block">{s.visitorName}</span>
                            <span className="text-[10px] text-slate-450 block">ID: {s.visitorId}</span>
                            <span className="text-[10px] text-slate-500 block truncate">{s.visitorEmail}</span>
                          </td>

                          {/* Visit details */}
                          <td className="p-3.5 align-top">
                            <span className="font-bold text-slate-900 block">{s.visitSnapshot?.host}</span>
                            <span className="text-[11px] text-slate-500 block">{s.visitSnapshot?.purpose}</span>
                            <span className="text-[10px] text-blue-600 font-medium block">Date: {s.visitSnapshot?.date}</span>
                          </td>

                          {/* Rating & flag */}
                          <td className="p-3.5 align-top">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-base font-black ${isLowRating ? 'text-rose-600' : 'text-amber-600'}`}>
                                {s.overallRating}
                              </span>
                              <Star className={`w-4 h-4 ${isLowRating ? 'text-rose-500 fill-rose-500' : 'text-amber-400 fill-amber-400'}`} />
                              <span className="text-[10px] text-slate-400">/5</span>
                            </div>
                            {isLowRating && (
                              <Badge variant="error" size="sm" className="mt-1 font-bold">
                                ⚠️ Dissatisfied
                              </Badge>
                            )}
                          </td>

                          {/* Aspect scores mini summary */}
                          <td className="p-3.5 align-top">
                            <div className="space-y-1 text-[10px]">
                              {s.aspectRatings &&
                                Object.entries(s.aspectRatings).map(([k, v]) => (
                                  <div key={k} className="flex justify-between items-center gap-2">
                                    <span className="text-slate-500 truncate max-w-[100px]">{k.replace('Experience', '').replace('Ease', '')}:</span>
                                    <span className={`font-bold ${v <= 2 ? 'text-rose-600' : 'text-slate-800'}`}>{v}/5★</span>
                                  </div>
                                ))}
                            </div>
                          </td>

                          {/* Comment snippet & media tags */}
                          <td className="p-3.5 align-top max-w-[220px]">
                            <p className="text-slate-700 text-xs line-clamp-2 italic">
                              {s.comment ? `"${s.comment}"` : <span className="text-slate-400 not-italic">(No comment written)</span>}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1.5">
                              {hasPhotos && (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                                  <Image className="w-3 h-3 text-blue-500" /> {s.media.photos.length} Photo{s.media.photos.length > 1 ? 's' : ''}
                                </span>
                              )}
                              {hasVideo && (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-medium">
                                  <Play className="w-3 h-3 text-purple-600" /> Video
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Timestamp */}
                          <td className="p-3.5 align-top text-[11px] text-slate-500 whitespace-nowrap">
                            {new Date(s.createdAt).toLocaleDateString()}
                            <span className="text-[10px] text-slate-400 block">{new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 align-top text-right whitespace-nowrap space-x-1">
                            <Button size="sm" variant="outline" icon={Eye} onClick={() => openDetail(s)}>
                              Inspect
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 !px-2"
                              onClick={() => handleDelete(s.id, s.visitorName)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed View Modal */}
      <Modal
        isOpen={!!selected}
        onClose={closeDetail}
        title={selected ? `Feedback Inspection — ${selected.visitorName}` : ''}
        maxWidth="max-w-2xl"
      >
        {selected && (
          <div className="space-y-5 py-2">
            {/* Flag Header Banner if Low Rating */}
            {selected.overallRating <= 2 && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-center gap-3 text-rose-900 text-xs">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-rose-950">Low Rating Alert Flagged</h4>
                  <p className="text-[11px] text-rose-800">
                    This visitor gave an overall rating of {selected.overallRating}/5. Review aspect scores and feedback below.
                  </p>
                </div>
              </div>
            )}

            {/* Top Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visitor Name</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">{selected.visitorName}</span>
                <span className="text-[10px] text-slate-500">ID: {selected.visitorId}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Host Office</span>
                <span className="font-bold text-slate-900 block mt-0.5">{selected.visitSnapshot?.host}</span>
                <span className="text-[10px] text-blue-600 font-medium">Purpose: {selected.visitSnapshot?.purpose}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visit Date</span>
                <span className="font-bold text-slate-900 block mt-0.5">{selected.visitSnapshot?.date}</span>
                <span className="text-[10px] text-slate-500">Submitted {new Date(selected.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Overall Star Banner */}
            <div className="flex items-center justify-between bg-amber-50/70 border border-amber-200 p-4 rounded-xl">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Overall Experience Rating</span>
                <div className="flex items-center gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        selected.overallRating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-lg font-black text-amber-900 ml-2">{selected.overallRating} / 5.0</span>
                </div>
              </div>
              <Badge variant={selected.overallRating <= 2 ? 'error' : selected.overallRating >= 4 ? 'success' : 'warning'} size="md">
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][selected.overallRating]}
              </Badge>
            </div>

            {/* Aspect Ratings Breakdown */}
            {selected.aspectRatings && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aspect Ratings Breakdown</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(selected.aspectRatings).map(([key, val]) => (
                    <div key={key} className="bg-white border border-slate-200 p-3 rounded-xl shadow-subtle space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600 block">{ASPECT_LABELS[key] || key}</span>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((st) => (
                            <Star
                              key={st}
                              className={`w-3.5 h-3.5 ${val >= st ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                            />
                          ))}
                        </div>
                        <span className={`text-xs font-black ${val <= 2 ? 'text-rose-600' : 'text-slate-800'}`}>{val}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Box */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visitor Comments & Feedback</h4>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-800 leading-relaxed italic">
                {selected.comment ? `"${selected.comment}"` : <span className="text-slate-400 not-italic">No written comment provided.</span>}
              </div>
            </div>

            {/* Attached Media Assets */}
            {mediaUrls.length > 0 && (
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attached Photos & Video Media</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mediaUrls.map((m, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-slate-900 overflow-hidden shadow-subtle">
                      {m.type === 'photo' ? (
                        <div>
                          <img src={m.url} alt={m.name} className="w-full h-44 object-cover" />
                          <div className="p-2 text-[10px] text-slate-300 bg-slate-900 border-t border-slate-800 truncate">
                            🖼️ {m.name}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <video src={m.url} controls className="w-full h-44 bg-black" />
                          <div className="p-2 text-[10px] text-slate-300 bg-slate-900 border-t border-slate-800 truncate">
                            🎥 {m.name}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(selected.id, selected.visitorName)}>
                Delete Record
              </Button>
              <Button variant="outline" size="sm" onClick={closeDetail}>
                Close Details
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
};

export default AdminFeedbackPage;
