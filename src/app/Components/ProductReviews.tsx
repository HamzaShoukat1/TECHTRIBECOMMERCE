"use client"
import { useState } from 'react';

const MOCK_REVIEWS = [
    { id: 1, user: "Alex M.", rating: 5, date: "2026-02-14", comment: "The sound quality is unreal for a portable speaker. Absolute rock 'n' roll machine!" },
    { id: 2, user: "Sarah K.", rating: 4, date: "2026-03-01", comment: "Love the analog knobs and the vintage design. A bit heavy, but the leather strap helps." },
    { id: 3, user: "David L.", rating: 5, date: "2026-03-15", comment: "Loudest speaker in its class hands down. Midrange is incredibly clear." },
    { id: 4, user: "Emma W.", rating: 4, date: "2026-04-10", comment: "Great battery life and classic Marshall look. Travels everywhere with me." },
    { id: 5, user: "James P.", rating: 5, date: "2026-05-02", comment: "The tactile knobs make fine-tuning audio so satisfying. Best purchase this year." }
];

export default function ProductReviewsTabs() {
    const [activeTab, setActiveTab] = useState("reviews");

    return (
        <div className="w-full max-w-4xl mx-auto p-6 font-sans">
            {/* Tab Header */}
            <div className="flex justify-center space-x-8 border-b border-gray-200 pb-4 mb-6">
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`text-lg font-medium cursor-pointer transition-colors ${activeTab === 'reviews' ? 'text-black font-semibold border-b-2 border-black -mb-[18px]' : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    Reviews [{MOCK_REVIEWS.length}]
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'reviews' && (
                <div className="space-y-6">
                    {MOCK_REVIEWS.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <span className="font-semibold text-gray-900">{review.user}</span>
                                    <div className="flex text-yellow-400">
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(5 - review.rating)}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-400">{review.date}</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
