// "use client"

// import { useState } from "react"

// import { Textarea } from "@/components/ui/textarea"
// import { Rating } from "@/src/components/reui/rating"
// import { UseReview } from "../hooks/UseReview"
// import { Button } from "@/src/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"

// export function ReviewModel() {
//     const { mutateAsync: createReview, isPending } = UseReview()
//     const [rating, setRating] = useState(0)
//     const [review, setReview] = useState("")

//     const handleSubmit = async () => {
//         try {
//             await createReview({ rating, review })
//             setRating(0)
//             setReview("")
//         } catch (error) {
//             console.error("Failed to submit review", error)
//         }
//     }

//     return (
//         <Card className="mx-auto w-full max-w-xs">
//             <CardContent className="space-y-5">
//                 <div className="flex flex-col items-center gap-3">
//                     <h3 className="text-sm font-semibold">Write a Review</h3>
//                     <Rating rating={rating} onRatingChange={setRating} editable />
//                     {rating > 0 && (
//                         <p className="text-muted-foreground text-xs">
//                             {rating <= 2
//                                 ? "We're sorry to hear that"
//                                 : rating <= 3
//                                     ? "Thanks for your feedback"
//                                     : "Glad you enjoyed it!"}
//                         </p>
//                     )}
//                 </div>

//                 <div className="space-y-2">
//                     <Label htmlFor="review-text" className="text-sm">
//                         Your review
//                     </Label>
//                     <Textarea
//                         id="review-text"
//                         value={review}
//                         onChange={(e) => setReview(e.target.value)}
//                         placeholder="Tell us what you think..."
//                         rows={3}
//                     />
//                 </div>

//                 <Button
//                     disabled={rating === 0 || isPending}
//                     onClick={handleSubmit}
//                     size="sm"
//                     className="w-full cursor-pointer"
//                 >
//                     {isPending ? "Submitting..." : "Submit Review"}
//                 </Button>
//             </CardContent>
//         </Card>
//     )
// }
import React from 'react'

export default function WriteAReview() {
  return (
    <div>WriteAReview</div>
  )
}

