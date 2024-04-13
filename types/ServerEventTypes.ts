import { PlaylistReturn } from "./types";

export interface Message {
    status: Status,
    message: string,
    progress: number,
    playlist?: PlaylistReturn,
}

export enum Status {
    Running = "running",
    Complete = "complete",
    Error = "error"
}