"use client";

import { useState } from "react";
import { useGetReviews } from "../hooks/UseReview";
import { formatDisplayDate } from "../utils";

interface ReviewUser {
    _id: string;
    FirstName: string;
    email: string;
}

interface Review {
    _id: string;
    orderId: string;
    userId: ReviewUser;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export default function ProductReviewsTabs({ productId }: { productId: string }) {
    const [activeTab, setActiveTab] = useState("reviews");
    const { data: response, isLoading, isError } = useGetReviews(productId);

    const reviews: Review[] = Array.isArray(response)
        ? response
        : response?.data ?? [];

    return (
        <div className="w-full max-w-4xl mx-auto p-6 font-sans">
            {/* Tab Header */}
            <div className="flex justify-center space-x-8 border-b border-gray-200 pb-4 mb-6">
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`text-lg font-medium cursor-pointer transition-colors ${activeTab === "reviews"
                        ? "text-black font-semibold border-b-2 border-black -mb-[18px]"
                        : "text-gray-400 hover:text-gray-600"
                        }`}
                >
                    Reviews [{isLoading ? "..." : reviews.length}]
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "reviews" && (
                <div className="space-y-6">
                    {isLoading && <p className="text-center text-gray-500">Loading reviews...</p>}
                    {isError && <p className="text-center text-red-500">Failed to load reviews.</p>}
                    {!isLoading && !isError && reviews.length === 0 && (
                        <p className="text-center text-gray-500">No reviews yet for this product.</p>
                    )}

                    {!isLoading &&
                        !isError &&
                        reviews.map((review) => (
                            <ReviewItem key={review._id} review={review} />
                        ))}
                </div>
            )}
        </div>
    );
}

function ReviewItem({ review }: { review: Review }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const characterLimit = 100

    const comment = review.comment || "";
    const isLongComment = comment.length > characterLimit;
    const displayText = isExpanded || !isLongComment ? comment : `${comment.slice(0, characterLimit)}...`;

    return (
        <div className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">
                        {review.userId?.FirstName || "Anonymous"}
                    </span>
                    <div className="flex text-yellow-400">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                    </div>
                </div>
                <span className="text-sm text-gray-400">
                    {formatDisplayDate(review.createdAt)}
                </span>
            </div>

            <p style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere'
            }} className="text-gray-600 leading-relaxed"> 
                {displayText}


                {isLongComment && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="ml-2 text-yellow-500 hover:text-yellow-700 cursor-pointer font-medium inline-block focus:outline-none focus:underline"
                    >
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                )}
            </p>
        </div>
    );
}
