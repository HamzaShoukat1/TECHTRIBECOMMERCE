export const dynamic = "force-dynamic";
import PaymentSuccessClientView from "../../Components/PaymentSuccessClientView";


interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    const sessionId = typeof resolvedParams?.session_id === "string" ? resolvedParams.session_id : null;

    return <PaymentSuccessClientView sessionId={sessionId} />;
}
