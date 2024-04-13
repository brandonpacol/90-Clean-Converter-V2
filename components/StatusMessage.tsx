import { useState, useEffect } from "react";

interface StatusMessageProps {
    statusMessage: string;
}

export default function StatusMessage({ statusMessage }: StatusMessageProps) {
    const [loadingDots, setLoadingDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        // Cleanup the interval when isConverting changes to false or on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <label className="ml-2 text-xs truncate">{statusMessage}{loadingDots}</label>
    )
}