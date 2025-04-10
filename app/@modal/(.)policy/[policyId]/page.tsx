'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import PolicyDetails from '@/app/components/PolicyDetailModal';

export default function PolicyDetailModal() {
    const router = useRouter()
    const closeModal = () => {
        router.back(); // This returns to the previous page
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-40"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                <PolicyDetails isModal={true} closeMethod={(e: any) => {
                    e.preventDefault();
                    closeModal();
                }} />

            </div>
        </div>
    );
}