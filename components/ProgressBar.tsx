"use client"

interface ProgressBarProps {
    percent: number,
    color: string
}

export default function ProgressBar({percent, color}: ProgressBarProps) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="h-2.5 rounded-full" style={{width: `${percent}%`, backgroundColor: color, transition: 'width 0.2s ease-out'}}></div>
        </div>
    )
}