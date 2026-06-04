import type { MemoryEntry } from "@/types/router";
import { generateId } from "./utils";

class MemoryStore {
  private entries: MemoryEntry[] = [];
  private storageKey = "mv-ai-memory";

  constructor() {
    this.load();
  }

  private load(): void {
    if (typeof window !== "undefined") {
      try {
        const data = localStorage.getItem(this.storageKey);
        if (data) {
          this.entries = JSON.parse(data);
        }
      } catch {
        this.entries = [];
      }
    }
  }

  private save(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
    }
  }

  getEntries(type?: MemoryEntry["type"]): MemoryEntry[] {
    if (type) return this.entries.filter((e) => e.type === type);
    return [...this.entries].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  search(query: string): MemoryEntry[] {
    const lower = query.toLowerCase();
    return this.entries.filter(
      (e) =>
        e.content.toLowerCase().includes(lower) ||
        e.tags.some((t) => t.toLowerCase().includes(lower))
    );
  }

  addEntry(entry: Omit<MemoryEntry, "id" | "createdAt" | "updatedAt">): MemoryEntry {
    const newEntry: MemoryEntry = {
      ...entry,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.entries.push(newEntry);
    this.save();
    return newEntry;
  }

  updateEntry(id: string, updates: Partial<Omit<MemoryEntry, "id" | "createdAt">>): MemoryEntry | null {
    const index = this.entries.findIndex((e) => e.id === id);
    if (index === -1) return null;
    this.entries[index] = { ...this.entries[index], ...updates, updatedAt: new Date() };
    this.save();
    return this.entries[index];
  }

  deleteEntry(id: string): boolean {
    const index = this.entries.findIndex((e) => e.id === id);
    if (index === -1) return false;
    this.entries.splice(index, 1);
    this.save();
    return true;
  }

  getByTag(tag: string): MemoryEntry[] {
    return this.entries.filter((e) => e.tags.includes(tag));
  }

  getContextForPrompt(): string {
    const recent = this.entries.slice(-5);
    if (recent.length === 0) return "";
    return (
      "User context:\n" +
      recent
        .map((e) => `- ${e.type}: ${e.content.slice(0, 100)}`)
        .join("\n")
    );
  }

  clear(): void {
    this.entries = [];
    this.save();
  }
}

export const memoryStore = new MemoryStore();
