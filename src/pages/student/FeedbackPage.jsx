import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare } from 'lucide-react';
import { AppLayout } from '../../components/layout/AppLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useStudent } from '../../context/StudentContext';

export const FeedbackCategories = [
  { value: 'Classroom', label: 'Classroom Infrastructure' },
  { value: 'Cafeteria', label: 'Cafeteria & Food Quality' },
  { value: 'Library', label: 'Library Facilities' },
  { value: 'Cleanliness', label: 'Campus Cleanliness & Hygiene' },
  { value: 'Internet', label: 'Wi-Fi & Network Services' },
  { value: 'Washrooms', label: 'Washroom Maintenance' },
];

export const FeedbackPage = () => {
  const { submitFeedback, feedbacks } = useStudent();

  const [category, setCategory] = useState('Classroom');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFeedback({ category, rating, comment });
    setComment('');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Campus Facility Feedback"
        description="Rate campus services, classrooms, cafeteria, and facilities on a 1-5 star scale to help administration improve quality."
        breadcrumbs={[{ label: 'Feedback' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl">
        {/* Rating Form */}
        <div className="lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                Submit Facility Rating & Review
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Select
                  label="Category to Rate"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={FeedbackCategories}
                />

                {/* 1-5 Star Rating Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm font-bold text-slate-700 ml-2">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Feedback Comment / Suggestions
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    placeholder="Share specific suggestions or compliments..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="primary" size="md" fullWidth icon={CheckCircle2}>
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Feedback History */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted Reviews ({feedbacks.length})</h3>

          {feedbacks.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-xs text-slate-400">
                You haven't submitted any feedback yet.
              </CardContent>
            </Card>
          ) : (
            feedbacks.map((fb) => (
              <Card key={fb.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="info" size="sm">{fb.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-yellow-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-yellow-500" />
                      {fb.rating} / 5
                    </div>
                  </div>
                  <p className="text-xs text-slate-800">{fb.comment}</p>
                  <span className="text-[10px] text-slate-400 block border-t border-slate-100 pt-1.5">Submitted on {fb.date}</span>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};
