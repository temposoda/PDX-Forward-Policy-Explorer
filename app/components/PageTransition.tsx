'use client';

import { ReactNode, useState, useEffect } from 'react';
import { Fade } from '@mui/material';

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    // We need to handle mounting for client-side transitions
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return (
        <Fade in={mounted} timeout={300}>
            <div>{children}</div>
        </Fade>
    );
}