"use client"

import { useState, ReactNode } from "react";

export default function HomePageModal() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOnModalOpen() {
        setIsModalOpen(true);
    }

    function handleOnModalClose() {
        setIsModalOpen(false);
    }

    return (
        <>
            <button
                className="mb-10 text-sm"
                onClick={handleOnModalOpen}
            >
                <span className="italic underline hover:opacity-70 transition-opacity">Why would I want a 90% clean playlist?</span>
                {" 🤔"}
            </button>
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={handleOnModalClose}>
                <h2 className="text-lg font-bold mb-4">Why would I want a 90% Clean Playlist? 🤔</h2>
                <ol className="list-decimal">
                    <li className="mb-2">You want a mostly clean playlist but do not mind if a few songs are explicit. Some songs do not have a clean version. So adding the explicit version to your playlist is better than not adding the song at all! 😌</li>
                    <li>{"If you do decide to turn off explicit content temporarily, 90% of your playlist is still playable! This is good for filtering your playlist when you play it to sensitive ears (ex. children, family parties, etc.). 👨‍👩‍👧‍👦"}</li>
                </ol>
            </Modal>}
        </>
    )
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="relative p-10 rounded-lg shadow-lg w-3/4 lg:w-1/2"
                style={{
                    backgroundColor: "rgba(36,36,36,1)"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-0 right-0 mt-2 mr-2 text-sm font-semibold bg-black w-7 h-7 rounded-full hover:opacity-75 transition-opacity"
                    onClick={onClose}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};