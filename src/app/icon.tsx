import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                }}
            >
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                >
                    <circle cx="50" cy="50" r="50" fill="#0F172A" />
                    <path
                        d="M50 25C36.1929 25 25 36.1929 25 50C25 55.626 26.8616 60.817 30.016 65.016L25 80L41.564 74.478C44.187 75.467 47.027 76 50 76C63.8071 76 75 64.8071 75 50C75 36.1929 63.8071 25 50 25Z"
                        fill="white"
                    />
                    <path
                        d="M45 60L55 45H48L52 35L42 50H49L45 60Z"
                        fill="#22C55E"
                    />
                    {/* Using solid colors for the favicon to ensure visibility at small sizes and better compatibility */}
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
