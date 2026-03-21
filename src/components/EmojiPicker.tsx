import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Smile } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface EmojiPickerProps {
    onChange: (emoji: string) => void;
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={pickerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-400 transition hover:text-zinc-300"
            >
                <Smile className="h-5 w-5" />
            </button>
            {isOpen && (
                <div className="absolute bottom-12 right-0 z-50 max-w-[calc(100vw-2rem)]">
                    <Picker
                        theme="dark"
                        data={data}
                        onEmojiSelect={(emoji: any) => {
                            onChange(emoji.native);
                            setIsOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPicker;
