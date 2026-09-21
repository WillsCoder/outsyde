'use client'

import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { IconThumbUp, IconFlag } from '@tabler/icons-react'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, ratingBars, StarRating, StarSelector } from '@/components/ui'

// ─── Types ───────────────────────────────────────────────────────────────────

type Rating = {
  id: string
  score: number
  user: { name: string | null; image: string | null }
  createdAt: Date
}

type Comment = {
  id: string
  body: string
  user: { name: string | null; image: string | null }
  createdAt: Date
}

type Props = {
  placeId: string
  ratings: Rating[]
  comments: Comment[]
  avgRating: number
}

// ─── Sort options ─────────────────────────────────────────────────────────────

type SortKey = 'recent' | 'top'

// ─── Main component ───────────────────────────────────────────────────────────

const ReviewSection = ({ placeId, ratings, comments, avgRating }: Props) => {
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  const [sort, setSort] = useState<SortKey>('recent')
  const [score, setScore] = useState(0)
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const bars = ratingBars(ratings)

  const sortedComments = [...comments].sort((a, b) =>
    sort === 'recent'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : 0
  )

  const handleSubmit = async () => {
    // if (!session) { setError('Sign in to post a review.'); return }
    if (score === 0) { setError('Please select a star rating.'); return }
    if (body.trim().length < 10) { setError('Review must be at least 10 characters.'); return }

    setError('')
    startTransition(async () => {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placeId, score, body }),
      })

      if (res.ok) {
        setSuccess(true)
        setScore(0)
        setBody('')
      } else {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong.')
      }
    })
  }

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-brand-night">
          Ratings & reviews
          <span className="ml-2 text-sm font-normal text-brand-night/40">
            ({ratings.length})
          </span>
        </h2>
        <div className="flex items-center gap-1 bg-brand-sand rounded-full p-1">
          {(['recent', 'top'] as SortKey[]).map(key => (
            <button
              key={key}
              onClick={() => setSort(key)}
              className={`text-xs font-medium px-3 py-1 rounded-full capitalize transition-all ${
                sort === key
                  ? 'bg-brand-night text-white'
                  : 'text-brand-night/50 hover:text-brand-night'
              }`}
            >
              {key === 'recent' ? 'Recent' : 'Top rated'}
            </button>
          ))}
        </div>
      </div>

      {/* Rating summary */}
      {ratings.length > 0 && (
        <div className="flex gap-6 items-center">
          <div className="text-center">
            <p className="text-5xl font-bold text-brand-night leading-none">{avgRating.toFixed(1)}</p>
            <StarRating score={avgRating} />
            <p className="text-xs text-brand-night/40 mt-1">{ratings.length} reviews</p>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            {bars.map(({ star, pct }) => (
              <div key={star} className="flex items-center gap-2 text-xs text-brand-night/50">
                <span className="w-4 text-right">{star}★</span>
                <div className="flex-1 h-1.5 bg-brand-night/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-gold rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-7">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review list */}
      {sortedComments.length > 0 ? (
        <div className="flex flex-col gap-3">
          {sortedComments.map(comment => {
            const rating = ratings.find(r => r.user.name === comment.user.name)
            return (
              <div key={comment.id} className="border border-brand-night/7 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar name={comment.user.name} image={comment.user.image} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-brand-night truncate">
                        {comment.user.name ?? 'Anonymous'}
                      </p>
                      <p className="text-xs text-brand-night/40 flex-shrink-0">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    {rating && <StarRating score={rating.score} />}
                  </div>
                </div>
                <p className="text-sm text-brand-night/60 leading-relaxed">{comment.body}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button className="flex items-center gap-1.5 text-xs text-brand-night/40 hover:text-brand-night transition-colors">
                    <IconThumbUp size={12} /> Helpful
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-brand-night/40 hover:text-brand-orange transition-colors">
                    <IconFlag size={12} /> Report
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-brand-night/40">
          <p className="text-sm">No reviews yet. Be the first!</p>
        </div>
      )}

      {/* Write a review */}
      <div className="border-t border-brand-night/7 pt-6">
        <h3 className="text-sm font-semibold text-brand-night mb-4">Leave a review</h3>

        {success ? (
          <div className="bg-brand-lagoon/10 text-brand-lagoon text-sm font-medium rounded-xl px-4 py-3">
            ✓ Review posted! Thanks for sharing your experience.
          </div>
        ) : session ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar name={session.user?.name ?? null} image={session.user?.image ?? null} />
              <div>
                <p className="text-sm font-medium text-brand-night">{session.user?.name}</p>
                <p className="text-xs text-brand-night/40">Posting publicly</p>
              </div>
            </div>

            <StarSelector value={score} onChange={setScore} />

            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={3}
              placeholder="Share your experience — what was the vibe, what did you love?"
              className="w-full border border-brand-night/12 rounded-xl px-4 py-3 text-sm text-brand-night placeholder:text-brand-night/30 outline-none focus:border-brand-orange transition-colors resize-none font-sans"
            />

            {error && (
              <p className="text-xs text-red-500 font-medium">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <p className="text-xs text-brand-night/40">{body.length} / 500</p>
              <button
                onClick={handleSubmit}
                disabled={isPending || score === 0 || body.trim().length < 10}
                className="inline-flex items-center gap-2 text-sm font-medium bg-brand-orange text-white rounded-xl px-5 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending ? 'Posting…' : 'Post review'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-brand-sand rounded-xl px-5 py-4">
            <p className="text-sm text-brand-night/60">Sign in to leave a review</p>
            <a
              href="/login"
              className="text-sm font-medium bg-brand-night text-white rounded-xl px-4 py-2"
            >
              Sign in
            </a>
          </div>
        )}
      </div>

    </div>
  )
}

export default ReviewSection