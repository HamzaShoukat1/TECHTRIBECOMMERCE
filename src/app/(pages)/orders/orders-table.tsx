'use client';

import { useState } from 'react';
import { MessageSquarePlus, ChevronDown, ChevronUp } from 'lucide-react';
import type { Order } from '../../utils/Types';
import { colorClass, formatDisplayDate } from '../../utils';
import { UseReview } from '../../hooks/UseReview';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Rating } from '@/src/components/reui/rating';

function statusClass(status: Order['status']) {
    if (status === 'DELIVERED') return 'bg-emerald-100 text-emerald-700';
    if (status === 'PENDING' || status === 'SHIPPED') {
        return 'bg-red-100 text-red-700';
    }
    return 'bg-amber-100 text-amber-700';
}

interface ReviewModelProps {
    orderId: string;
    onSuccess: () => void;
    onClose: () => void;
}

function ReviewModel({ orderId, onSuccess, onClose }: ReviewModelProps) {
    const { mutateAsync: createReview, isPending } = UseReview();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async () => {
        if (!orderId) return;
        try {
            await createReview({ orderId, rating, comment });
            setRating(0);
            setComment('');
            onSuccess();
        } catch (error) {
            console.error('Failed to submit review', error);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-10 backdrop-blur-xs"
            onClick={onClose}
        >
            <Card
                className="absolute top-90 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-auto z-50"
                onClick={(e) => e.stopPropagation()}
            >
                <CardContent className="space-y-5 pt-6">
                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-sm font-semibold">Write a Review</h3>
                        <Rating rating={rating} onRatingChange={setRating} editable />
                        {rating > 0 && (
                            <p className="text-center text-xs text-muted-foreground">
                                {rating <= 2
                                    ? "We're sorry to hear that"
                                    : rating <= 3
                                    ? 'Thanks for your feedback'
                                    : 'Glad you enjoyed it!'}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="review-text" className="text-sm">
                            Your review
                        </Label>
                        <Textarea
                            id="review-text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us what you think..."
                            rows={3}
                        />
                    </div>
                    <Button
                        disabled={rating === 0 || isPending}
                        onClick={handleSubmit}
                        size="sm"
                        className="w-full cursor-pointer"
                    >
                        {isPending ? 'Submitting...' : 'Submit Review'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

function OrderItemList({ order }: { order: Order }) {
    const [showAll, setShowAll] = useState(false)
    const hasMore = order.items.length > 3;
    const visibleItems = showAll ? order.items : order.items.slice(0, 3);

    return (
        <div className="space-y-3">
            {visibleItems.map((item, index) => {
                const productId =
                    typeof item.productId === 'string'
                        ? item.productId
                        : item.productId?._id;
                const productImage =
                    typeof item.productImage === 'string'
                        ? item.productImage
                        : item.productImage?.url ??
                          item.image ??
                          item.product?.productImage?.url ??
                          (typeof item.productId === 'object'
                              ? item.productId?.productImage?.url
                              : undefined);

                return (
                    <div
                        key={`${order._id}-${productId}-${index}`}
                        className="flex items-center gap-3"
                    >
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#F9F1E7]">
                            {productImage ? (
                                <img
                                    src={productImage}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-[10px] text-[#9F9F9F]">
                                    No image
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{item.name}</p>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                <span>Qty: {item.quantity}</span>
                                {item.color && (
                                    <span className="inline-flex items-center gap-1.5">
                                        Color:{' '}
                                        <span
                                            className={`inline-block h-3.5 w-3.5 rounded-full border ${colorClass(
                                                item.color
                                            )}`}
                                            title={item.color}
                                        />
                                        <span className="capitalize">{item.color}</span>
                                    </span>
                                )}
                                {item.size && <span>Size: {item.size}</span>}
                                <span>
                                    Unit:{' '}
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: order.currency,
                                    }).format(item.unitPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}

            {hasMore && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs font-semibold text-primary hover:bg-transparent hover:underline cursor-pointer"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? (
                        <>
                           Show Less <ChevronUp className="ml-1 h-3 w-3" />
                        </>
                    ) : (
                        <>
                            Show {order.items.length - 3} More Items{' '}
                            <ChevronDown className="ml-1 h-3 w-3" />
                        </>
                    )}
                </Button>
            )}
        </div>
    );
}

export function OrdersTable({ orders }: { orders: Order[] }) {
    const [activeReviewOrderId, setActiveReviewOrderId] = useState<string | null>(
        null
    );

    return (
        <div className="space-y-6">
            <div className="overflow-hidden rounded-sm border border-[#EEE3D0]">
                <Table>
                    <TableHeader className="bg-[#F9F1E7]">
                        <TableRow>
                            {['Order ID', 'Purchased items', 'Status', 'Total', 'Date', 'Actions'].map(
                                (heading) => (
                                    <TableHead key={heading} className="px-5 py-4">
                                        {heading}
                                    </TableHead>
                                )
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-32 text-center text-[#9F9F9F]"
                                >
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell className="px-5 py-4 font-mono text-xs">
                                        #{order._id.slice(-8).toUpperCase()}
                                    </TableCell>
                                    <TableCell className="min-w-[380px] px-5 py-4">
                                        <OrderItemList order={order} />
                                    </TableCell>
                                    <TableCell className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-right font-semibold">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: order.currency,
                                        }).format(order.subtotal)}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-xs text-muted-foreground">
                                        {formatDisplayDate(order.createdAt)}
                                    </TableCell>
                                    {order.status === 'DELIVERED' && (
                                        <TableCell className="px-5 py-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`cursor-pointer ${order.status === "DELIVERED" && "cursor-not-allowed"}`}
                                                onClick={() =>
                                                    setActiveReviewOrderId(order._id)
                                                }
                                            >
                                                <MessageSquarePlus className="mr-1 h-4 w-4" />
                                                Review
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {activeReviewOrderId && (
                <ReviewModel
                    orderId={activeReviewOrderId}
                    onSuccess={() => setActiveReviewOrderId(null)}
                    onClose={() => setActiveReviewOrderId(null)}
                />
            )}
        </div>
    );
}