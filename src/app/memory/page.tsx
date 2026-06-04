"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { HiChip, HiSearch, HiTrash, HiPlus, HiBookmark, HiAcademicCap, HiStar, HiChat, HiCalendar } from "react-icons/hi";
import { memoryStore } from "@/lib/memory-store";
import type { MemoryEntry } from "@/types/router";

const typeIcons: Record<MemoryEntry["type"], typeof HiChip> = {
  preference: HiStar,
  subject: HiAcademicCap,
  course: HiBookmark,
  project: HiChip,
  note: HiBookmark,
  conversation: HiChat,
  "study-plan": HiCalendar,
  fact: HiChip,
};

export default function MemoryPage() {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [filter, setFilter] = useState<MemoryEntry["type"] | "all">("all");
  const [search, setSearch] = useState("");
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    setEntries(memoryStore.getEntries());
  }, []);

  const refresh = () => {
    setEntries(memoryStore.getEntries());
  };

  const addEntry = () => {
    if (!newEntry.trim()) return;
    memoryStore.addEntry({
      type: "note",
      content: newEntry.trim(),
      tags: ["user-added"],
    });
    setNewEntry("");
    refresh();
  };

  const deleteEntry = (id: string) => {
    memoryStore.deleteEntry(id);
    refresh();
  };

  const filtered = entries
    .filter((e) => filter === "all" || e.type === filter)
    .filter((e) => !search || e.content.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Memory Center"
          title="Your Personal AI Memory"
          subtitle="MV AI remembers your preferences, subjects, notes, and conversations to provide better assistance."
        />

        <div className="max-w-4xl mx-auto">
          {/* Search & Filter */}
          <GlassCard className="p-5 mb-6">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex-1 relative">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text" size={16} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search memory..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl mv-input text-sm"
                />
              </div>
              <div className="flex gap-1">
                {(["all", "note", "subject", "preference", "conversation", "study-plan"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                      filter === f
                        ? "bg-red-500/20 text-accent-red border border-red-500/30"
                        : "bg-white/5 text-muted-text border border-white/10"
                    }`}
                  >
                    {f === "all" ? "All" : f.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Add Entry */}
          <GlassCard className="p-5 mb-6">
            <div className="flex gap-3">
              <input
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addEntry(); }}
                placeholder="Add a note to memory..."
                className="flex-1 px-4 py-3 rounded-xl mv-input text-sm"
              />
              <Button variant="primary" onClick={addEntry} disabled={!newEntry.trim()} icon={<HiPlus />}>
                Save
              </Button>
            </div>
          </GlassCard>

          {/* Memory List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <GlassCard className="p-8 text-center">
                <HiChip className="text-muted-text mx-auto mb-3" size={36} />
                <p className="text-sm text-secondary-text">No memory entries yet.</p>
              </GlassCard>
            ) : (
              filtered.map((entry, i) => {
                const Icon = typeIcons[entry.type] || HiChip;
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <GlassCard className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-accent-red" size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-text">{entry.type}</span>
                            <span className="text-[10px] text-muted-text">{new Date(entry.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-primary-text">{entry.content}</p>
                          {entry.tags.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {entry.tags.map((tag) => (
                                <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-muted-text">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="p-1.5 rounded-lg text-muted-text hover:text-error hover:bg-white/5 transition-all"
                        >
                          <HiTrash size={14} />
                        </button>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
