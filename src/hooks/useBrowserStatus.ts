'use client'

import { useEffect, useState } from "react";

export default function useBrowserStatus() {
    // Initialize the state unconditionally
    const [isOnline, setIsOnline] = useState<boolean>(false);

    useEffect(() => {
        // Check if the window object is available (client-side check)
        if (typeof window !== 'undefined') {
            // Set initial status based on the navigator's status
            setIsOnline(window.navigator.onLine);

            // Add event listeners for online and offline events
            const handleOnline = () => setIsOnline(true);
            const handleOffline = () => setIsOnline(false);

            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);

            // Clean up event listeners when the component is unmounted
            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            };
        }
    }, []);

    return isOnline;
}
