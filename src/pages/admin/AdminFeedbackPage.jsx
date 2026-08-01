import React, { useEffect, useState } from 'react';
import { Star, AlertTriangle, Image, Play, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { getAllFeedbackSubmissions, getFeedbackMediaAsset } from '../../services/feedbackService';

export const AdminFeedbackPage = () => {
  const [submissions, setSubmissions] = useState(() => getAllFeedbackSubmissions());
  const [selected, setSelected] = useState(null);
  const [mediaUrls, setMediaUrls] = useState([]);

  useEffect(() => {
    const onStorage = () => setSubmissions(getAllFeedbackSubmissions());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const avgOverall = submissions.length ? Math.round((submissions.reduce((s, it) => s + (it.overallRating || 0), 0) / submissions.length) * 10) / 10 : 0;

  const openDetail = async (submission) => {
    setSelected(submission);
    const urls = [];
    try {
      if (submission.media?.photos?.length) {
        for (const p of submission.media.photos) {
          const asset = await getFeedbackMediaAsset(p.id);
          if (asset && asset.blob) urls.push({ type: 'photo', url: URL.createObjectURL(asset.blob), name: p.name });
        }
      }
      if (submission.media?.video) {
        const v = submission.media.video;
        const asset = await getFeedbackMediaAsset(v.id);
        if (asset && asset.blob) urls.push({ type: 'video', url: URL.createObjectURL(asset.blob), name: v.name });
      }
    } catch (err) {
      // ignore media load errors
    }
    setMediaUrls(urls);
  };

  const closeDetail = () => {
    mediaUrls.forEach((m) => URL.revokeObjectURL(m.url));
    setMediaUrls([]);
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Visitor Feedback</h2>
          <p className="text-xs text-slate-500">Submissions from visitors about completed campus visits.</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="p-3">
            <CardContent className="flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-500" />
              <div>
                <div className="text-xs text-slate-400">Average overall rating</div>
                <div className="text-xl font-extrabold">{avgOverall} / 5</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Feedback Submissions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {submissions.length === 0 ? (
            <div className="p-6 text-sm text-slate-500">No feedback submissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="text-xs text-slate-400 border-b">
                    <th className="px-4 py-3">Visitor</th>
                    <th className="px-4 py-3">Visit</th>
                    <th className="px-4 py-3">Overall</th>
                    <th className="px-4 py-3">Comment</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s) => (
                    <tr key={s.id} className={`border-b ${s.overallRating <= 2 ? 'bg-rose-50/40 border-l-4 border-rose-400' : ''}`}>
                      <td className="px-4 py-3 align-top">
                        <div className="font-semibold text-slate-800">{s.visitorName}</div>
                        <div className="text-[11px] text-slate-500">ID: {s.visitorId}</div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="text-slate-800 font-medium">{s.visitSnapshot?.date} • {s.visitSnapshot?.host}</div>
                        <div className="text-[11px] text-slate-500">{s.visitSnapshot?.purpose}</div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-500 font-bold">{s.overallRating}</span>
                          <Star className="w-4 h-4 text-amber-400" />
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="text-slate-700 truncate max-w-[280px]">{s.comment || <span className="text-slate-400">(no comment)</span>}</div>
                      </td>
                      <td className="px-4 py-3 align-top text-xs text-slate-500">{new Date(s.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-2">
                          {s.overallRating <= 2 && <Badge variant="destructive" size="sm">Low</Badge>}
                          <Button size="sm" variant="outline" onClick={() => openDetail(s)}>View</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={!!selected} onClose={closeDetail} title={selected ? `${selected.visitorName} — ${selected.visitSnapshot?.date}` : ''}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400">Overall rating</div>
                <div className="flex items-center gap-3 mt-1"><Star className="w-5 h-5 text-amber-400" /> <div className="text-xl font-bold">{selected.overallRating} / 5</div></div>
              </div>
              <div className="text-right text-xs text-slate-500">Submitted: {new Date(selected.createdAt).toLocaleString()}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selected.aspectRatings && Object.entries(selected.aspectRatings).map(([k, v]) => (
                <div key={k} className="rounded-xl border p-3 bg-slate-50">
                  <div className="text-[11px] text-slate-500 uppercase">{k}</div>
                  <div className="text-lg font-bold mt-1">{v} / 5</div>
                </div>
              ))}
            </div>

            {selected.comment && (
              <div className="rounded-xl border p-3 bg-white">
                <div className="text-[11px] text-slate-500 uppercase">Comment</div>
                <div className="mt-2 text-slate-700">{selected.comment}</div>
              </div>
            )}

            {mediaUrls.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] text-slate-500 uppercase">Attachments</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {mediaUrls.map((m, idx) => (
                    <div key={idx} className="rounded-xl border bg-white p-2">
                      {m.type === 'photo' ? (
                        <img src={m.url} alt={m.name} className="w-full h-40 object-cover rounded-md" />
                      ) : (
                        <video src={m.url} controls className="w-full h-40 rounded-md" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminFeedbackPage;
