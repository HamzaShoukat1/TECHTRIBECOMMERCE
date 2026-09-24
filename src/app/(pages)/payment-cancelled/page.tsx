import Link from "next/link";

export default function PaymentCancelledPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center font-poppins  gap-4 px-4 text-center">
            <h1 className="text-3xl font-semibold">Payment cancelled</h1>
            <p className="text-gray-600">Your order was not charged.</p>
            <Link className="border border-black rounded-[15px] px-6 py-3" href="/checkout">
                Return to checkout
            </Link>
        </main>
    );
}