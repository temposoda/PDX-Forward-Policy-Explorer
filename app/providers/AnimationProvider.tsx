'use client';

import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function AnimationProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            {/* Key is important for AnimatePresence to detect route changes */}
            <div key={pathname}>
                {children}
            </div>
        </AnimatePresence>
    );
}