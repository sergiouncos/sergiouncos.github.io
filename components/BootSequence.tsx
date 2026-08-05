import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const MotionDiv = motion.div as any;

interface BootSequenceProps {
    onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const bootLogs = [
        "Initializing kernel...",
        "Loading security modules...",
        "Verifying integrity hash...",
        "Establishing secure handshake...",
        "Mounting file system...",
        "Decrypting user interface...",
        "Access Granted."
    ];

    useEffect(() => {
        // Progress Bar Animation
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800); // Delay before unmount
                    return 100;
                }
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 50);

        return () => clearInterval(timer);
    }, [onComplete]);

    useEffect(() => {
        // Log Animation
        let currentLogIndex = 0;
        const logTimer = setInterval(() => {
            if (currentLogIndex < bootLogs.length) {
                setLogs(prev => [...prev, bootLogs[currentLogIndex]]);
                currentLogIndex++;
            } else {
                clearInterval(logTimer);
            }
        }, 300);

        return () => clearInterval(logTimer);
    }, []);

    return (
        <MotionDiv
            className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center text-brand-accent font-mono overflow-hidden"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="w-full max-w-md px-6">
                <div className="flex items-center justify-center mb-12">
                    <MotionDiv
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                         <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full"></div>
                         <ShieldCheck size={64} />
                    </MotionDiv>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-800 rounded-full mb-4 overflow-hidden relative">
                    <MotionDiv 
                        className="h-full bg-brand-accent shadow-[0_0_10px_#06b6d4]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                
                <div className="flex justify-between text-xs text-slate-500 mb-8 font-mono">
                    <span>SYSTEM_BOOT</span>
                    <span>{progress}%</span>
                </div>

                {/* Logs */}
                <div className="h-32 flex flex-col justify-end space-y-1">
                    {logs.map((log, i) => (
                        <MotionDiv 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-sm text-slate-400"
                        >
                            <span className="text-brand-secondary mr-2">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                            {log}
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </MotionDiv>
    );
};

export default BootSequence;