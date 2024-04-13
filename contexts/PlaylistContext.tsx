import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlaylistContextType {
    selectedPlaylist: SpotifyApi.PlaylistObjectSimplified | null;
    setSelectedPlaylist: (playlist: SpotifyApi.PlaylistObjectSimplified | null) => void;
}

// Creating the context with an initial undefined value. This is okay because we'll always use it within a Provider
const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export function usePlaylist(): PlaylistContextType {
    const context = useContext(PlaylistContext);
    if (context === undefined) {
        throw new Error('usePlaylist must be used within a PlaylistProvider');
    }
    return context;
};

interface PlaylistProviderProps {
    children: ReactNode;
}

export function PlaylistProvider({ children } : PlaylistProviderProps) {
    const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyApi.PlaylistObjectSimplified | null>(null);

    return (
        <PlaylistContext.Provider value={{ selectedPlaylist, setSelectedPlaylist }}>
            {children}
        </PlaylistContext.Provider>
    );
};
