import PaymentSuccessClientView from "../../Components/PaymentSuccessClientView";

export const dynamic = "force-dynamic";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const sessionId = typeof resolvedParams?.session_id === "string" ? resolvedParams.session_id : null;

    return <PaymentSuccessClientView sessionId={sessionId} />;
}
