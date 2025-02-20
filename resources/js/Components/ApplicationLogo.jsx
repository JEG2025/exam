export default function ApplicationLogo(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="#000000"
        >
            <rect width="48" height="48" fill="none" />

            <line
                x1="6"
                y1="42"
                x2="42"
                y2="42"
                stroke="#888"
                stroke-width="2"
            />

            <line x1="6" y1="6" x2="6" y2="42" stroke="#888" stroke-width="2" />

            <polyline
                points="6 36, 12 24, 18 30, 24 18, 30 24, 36 12, 42 18"
                fill="none"
                stroke="#3498db"
                stroke-width="2"
            />

            <circle cx="12" cy="24" r="2" fill="#3498db" />
            <circle cx="18" cy="30" r="2" fill="#3498db" />
            <circle cx="24" cy="18" r="2" fill="#3498db" />
            <circle cx="30" cy="24" r="2" fill="#3498db" />
            <circle cx="36" cy="12" r="2" fill="#3498db" />
        </svg>
    );
}
