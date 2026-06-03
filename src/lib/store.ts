import { create } from "zustand";
import type { Chat, Message, AIMode, Document, Flashcard, Quiz, StudyPlan, GeneratedImage, GeneratedVideo } from "@/types";
import { generateId } from "./utils";

interface AppState {
  chats: Chat[];
  currentChatId: string | null;
  mode: AIMode;
  documents: Document[];
  flashcards: Flashcard[];
  quizzes: Quiz[];
  studyPlans: StudyPlan[];
  images: GeneratedImage[];
  videos: GeneratedVideo[];
  isNavOpen: boolean;
  isDark: boolean;

  setMode: (mode: AIMode) => void;
  createChat: () => string;
  setCurrentChat: (id: string) => void;
  addMessage: (chatId: string, message: Omit<Message, "id" | "timestamp">) => void;
  toggleNav: () => void;
  addDocument: (doc: Omit<Document, "id" | "uploadedAt">) => void;
  addFlashcard: (card: Omit<Flashcard, "id">) => void;
  addQuiz: (quiz: Omit<Quiz, "id">) => void;
  addStudyPlan: (plan: Omit<StudyPlan, "id">) => void;
  addImage: (img: Omit<GeneratedImage, "id" | "createdAt">) => void;
  addVideo: (vid: Omit<GeneratedVideo, "id" | "createdAt">) => void;
  getCurrentChat: () => Chat | null;
}

export const useStore = create<AppState>((set, get) => ({
  chats: [],
  currentChatId: null,
  mode: "general",
  documents: [],
  flashcards: [],
  quizzes: [],
  studyPlans: [],
  images: [],
  videos: [],
  isNavOpen: false,
  isDark: true,

  setMode: (mode) => set({ mode }),

  createChat: () => {
    const id = generateId();
    const chat: Chat = {
      id,
      title: "New Conversation",
      messages: [],
      mode: get().mode,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      chats: [chat, ...state.chats],
      currentChatId: id,
    }));
    return id;
  },

  setCurrentChat: (id) => set({ currentChatId: id }),

  addMessage: (chatId, message) => {
    const msg: Message = {
      ...message,
      id: generateId(),
      timestamp: new Date(),
    };
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, msg],
              updatedAt: new Date(),
              title:
                chat.messages.length === 0 && message.role === "user"
                  ? message.content.slice(0, 50)
                  : chat.title,
            }
          : chat
      ),
    }));
  },

  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),

  addDocument: (doc) => {
    const newDoc: Document = { ...doc, id: generateId(), uploadedAt: new Date() };
    set((state) => ({ documents: [newDoc, ...state.documents] }));
  },

  addFlashcard: (card) => {
    const newCard: Flashcard = { ...card, id: generateId() };
    set((state) => ({ flashcards: [...state.flashcards, newCard] }));
  },

  addQuiz: (quiz) => {
    const newQuiz: Quiz = { ...quiz, id: generateId() };
    set((state) => ({ quizzes: [...state.quizzes, newQuiz] }));
  },

  addStudyPlan: (plan) => {
    const newPlan: StudyPlan = { ...plan, id: generateId() };
    set((state) => ({ studyPlans: [...state.studyPlans, newPlan] }));
  },

  addImage: (img) => {
    const newImg: GeneratedImage = { ...img, id: generateId(), createdAt: new Date() };
    set((state) => ({ images: [newImg, ...state.images] }));
  },

  addVideo: (vid) => {
    const newVid: GeneratedVideo = { ...vid, id: generateId(), createdAt: new Date() };
    set((state) => ({ videos: [newVid, ...state.videos] }));
  },

  getCurrentChat: () => {
    const { chats, currentChatId } = get();
    return chats.find((c) => c.id === currentChatId) ?? null;
  },
}));
