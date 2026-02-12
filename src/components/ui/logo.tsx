
import React from 'react';

export const Logo = ({ className = "h-8 w-8", withText = true }: { className?: string, withText?: boolean }) => {
    return (
        <div className="flex items-center gap-2">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <circle cx="50" cy="50" r="50" fill="url(#gradient)" />
                <path
                    d="M50 25C36.1929 25 25 36.1929 25 50C25 55.626 26.8616 60.817 30.016 65.016L25 80L41.564 74.478C44.187 75.467 47.027 76 50 76C63.8071 76 75 64.8071 75 50C75 36.1929 63.8071 25 50 25Z"
                    fill="white"
                />
                <path
                    d="M45 60L55 45H48L52 35L42 50H49L45 60Z"
                    fill="url(#lightning-gradient)"
                />
                <defs>
                    <linearGradient
                        id="gradient"
                        x1="10"
                        y1="10"
                        x2="90"
                        y2="90"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#0F172A" /> {/* Dark Blue */}
                        <stop offset="1" stopColor="#22C55E" /> {/* Green */}
                    </linearGradient>
                    <linearGradient
                        id="lightning-gradient"
                        x1="45"
                        y1="35"
                        x2="52"
                        y2="60"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#22C55E" />
                        <stop offset="1" stopColor="#0F172A" />
                    </linearGradient>
                </defs>
            </svg>
            {withText && (
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">
                    ReplyBuzz
                </span>
            )}
        </div>
    );
};
