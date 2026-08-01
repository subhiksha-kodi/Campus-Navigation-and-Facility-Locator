const FEEDBACK_SUBMISSIONS_KEY = 'wayfindyou_feedback_submissions';
const FEEDBACK_MEDIA_DB_NAME = 'wayfindyou_feedback_media_db';
const FEEDBACK_MEDIA_DB_VERSION = 1;
const FEEDBACK_MEDIA_STORE_NAME = 'media_assets';

export const FEEDBACK_MEDIA_LIMITS = {
  photoTypes: ['image/jpeg', 'image/png', 'image/heic', 'image/heif'],
  videoTypes: ['video/mp4', 'video/quicktime'],
  maxPhotoSizeBytes: 8 * 1024 * 1024,
  maxVideoSizeBytes: 80 * 1024 * 1024,
};

export const FEEDBACK_ASPECT_OPTIONS = [
  { key: 'navigationEase', label: 'Ease of navigation' },
  { key: 'hostExperience', label: 'Host / staff experience' },
  { key: 'checkInExperience', label: 'Gate / check-in experience' },
];

const readJson = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('storage'));
};

const openMediaDatabase = () => {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB is not available in this browser.'));
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(FEEDBACK_MEDIA_DB_NAME, FEEDBACK_MEDIA_DB_VERSION);

    request.onerror = () => reject(request.error || new Error('Unable to open feedback media store.'));
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(FEEDBACK_MEDIA_STORE_NAME)) {
        db.createObjectStore(FEEDBACK_MEDIA_STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
  });
};

const putMediaAsset = async (asset) => {
  const db = await openMediaDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FEEDBACK_MEDIA_STORE_NAME, 'readwrite');
    const store = tx.objectStore(FEEDBACK_MEDIA_STORE_NAME);
    const request = store.put(asset);
    request.onerror = () => reject(request.error || new Error('Unable to save media asset.'));
    request.onsuccess = () => resolve(asset);
  });
};

export const getFeedbackMediaAsset = async (assetId) => {
  if (!assetId) return null;
  const db = await openMediaDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FEEDBACK_MEDIA_STORE_NAME, 'readonly');
    const store = tx.objectStore(FEEDBACK_MEDIA_STORE_NAME);
    const request = store.get(assetId);
    request.onerror = () => reject(request.error || new Error('Unable to load media asset.'));
    request.onsuccess = () => resolve(request.result || null);
  });
};

const readFileAsArrayBuffer = (file, onProgress) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = () => reject(reader.error || new Error(`Unable to read ${file.name}.`));
  reader.onprogress = (event) => {
    if (event.lengthComputable && onProgress) {
      onProgress(event.loaded, event.total);
    }
  };
  reader.onload = () => resolve(reader.result);
  reader.readAsArrayBuffer(file);
});

const makeMediaRef = async ({ file, submissionId, visitorId, visitId, kind, onProgress }) => {
  const mediaId = `${kind}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const arrayBuffer = await readFileAsArrayBuffer(file, onProgress);
  const asset = {
    id: mediaId,
    submissionId,
    visitorId,
    visitId,
    kind,
    name: file.name,
    type: file.type,
    size: file.size,
    createdAt: new Date().toISOString(),
    blob: new Blob([arrayBuffer], { type: file.type }),
  };
  await putMediaAsset(asset);

  return {
    id: mediaId,
    name: file.name,
    type: file.type,
    size: file.size,
    kind,
  };
};

export const getAllFeedbackSubmissions = () => {
  return readJson(FEEDBACK_SUBMISSIONS_KEY, []);
};

export const getFeedbackSubmissionForVisit = (visitorId, visitId) => {
  return getAllFeedbackSubmissions().find((submission) => submission.visitorId === visitorId && submission.visitId === visitId) || null;
};

export const saveFeedbackSubmission = async ({
  visitor,
  visit,
  overallRating,
  aspectRatings,
  comment,
  photos = [],
  video = null,
  onProgress,
}) => {
  const existing = getFeedbackSubmissionForVisit(visitor.id, visit.id);
  if (existing) {
    throw new Error('Feedback already exists for this visit.');
  }

  const validPhotos = photos.filter(Boolean);
  const validVideo = video || null;
  const mediaItems = [
    ...validPhotos.map((file) => ({ file, kind: 'photo' })),
    ...(validVideo ? [{ file: validVideo, kind: 'video' }] : []),
  ];
  const totalBytes = mediaItems.reduce((sum, item) => sum + item.file.size, 0);
  let processedBytes = 0;

  const media = { photos: [], video: null };
  const submissionId = `FBK-${Date.now().toString(36).toUpperCase()}`;

  for (const item of mediaItems) {
    const ref = await makeMediaRef({
      file: item.file,
      submissionId,
      visitorId: visitor.id,
      visitId: visit.id,
      kind: item.kind,
      onProgress: (loaded, total) => {
        if (onProgress && totalBytes > 0) {
          onProgress({
            phase: 'uploading',
            fileName: item.file.name,
            loadedBytes: Math.min(processedBytes + loaded, totalBytes),
            totalBytes,
          });
        }
      },
    });

    processedBytes += item.file.size;
    if (item.kind === 'photo') {
      media.photos.push(ref);
    } else {
      media.video = ref;
    }

    if (onProgress && totalBytes > 0) {
      onProgress({
        phase: 'uploading',
        fileName: item.file.name,
        loadedBytes: Math.min(processedBytes, totalBytes),
        totalBytes,
      });
    }
  }

  const submission = {
    id: submissionId,
    visitorId: visitor.id,
    visitorName: visitor.name,
    visitId: visit.id,
    visitSnapshot: {
      host: visit.host,
      purpose: visit.purpose,
      date: visit.date,
      time: visit.time,
      status: visit.status,
    },
    overallRating,
    aspectRatings,
    comment: comment.trim(),
    media,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const nextSubmissions = [submission, ...getAllFeedbackSubmissions()];
  writeJson(FEEDBACK_SUBMISSIONS_KEY, nextSubmissions);

  if (onProgress) {
    onProgress({ phase: 'complete', fileName: null, loadedBytes: totalBytes, totalBytes: Math.max(totalBytes, 1) });
  }

  return submission;
};

export const formatFeedbackVisitLabel = (visit) => {
  if (!visit) return 'Unknown visit';
  return `${visit.date} • ${visit.host}`;
};
