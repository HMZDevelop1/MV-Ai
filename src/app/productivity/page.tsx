"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import {
  HiCheckCircle, HiClock, HiCalendar, HiChartBar, HiDocumentText,
  HiLightningBolt, HiPlus, HiTrash, HiPencil, HiStar
} from "react-icons/hi";
import type { ProductivityTask } from "@/types/router";
import { generateId } from "@/lib/utils";

export default function ProductivityPage() {
  const [tasks, setTasks] = useState<ProductivityTask[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: ProductivityTask = {
      id: generateId(),
      title: newTask.trim(),
      priority: "medium",
      status: "todo",
      category: "general",
      createdAt: new Date(),
    };
    setTasks((prev) => [task, ...prev]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.status === "done").length,
    todo: tasks.filter((t) => t.status === "todo").length,
  };

  return (
    <div className="min-h-screen pt-24 pb-8 mv-bg-radial">
      <SectionWrapper variant="hero">
        <SectionHeader
          badge="Productivity Workspace"
          title="Your AI-Powered Workspace"
          subtitle="Tasks, goals, notes, and progress tracking — all in one place."
        />

        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Tasks", value: stats.total, icon: HiDocumentText, color: "from-red-500 to-red-600" },
              { label: "Completed", value: stats.done, icon: HiCheckCircle, color: "from-green-500 to-green-600" },
              { label: "Pending", value: stats.todo, icon: HiClock, color: "from-red-500 to-red-700" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <GlassCard key={stat.label} className="p-4 text-center">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <p className="text-2xl font-extrabold text-primary-text">{stat.value}</p>
                  <p className="text-xs text-muted-text">{stat.label}</p>
                </GlassCard>
              );
            })}
          </div>

          {/* Add Task */}
          <GlassCard className="p-5 mb-6">
            <div className="flex gap-3">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 rounded-xl mv-input text-sm"
              />
              <Button variant="primary" onClick={addTask} disabled={!newTask.trim()} icon={<HiPlus />}>
                Add
              </Button>
            </div>
          </GlassCard>

          {/* Task List */}
          <div className="space-y-2">
            {tasks.length === 0 ? (
              <GlassCard className="p-8 text-center">
                <HiStar className="text-muted-text mx-auto mb-3" size={36} />
                <p className="text-sm text-secondary-text">No tasks yet. Add your first task above.</p>
              </GlassCard>
            ) : (
              tasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <GlassCard className={`p-4 flex items-center gap-3 ${task.status === "done" ? "opacity-50" : ""}`}>
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        task.status === "done"
                          ? "bg-success border-success"
                          : "border-muted-text hover:border-accent-red"
                      }`}
                    >
                      {task.status === "done" && <HiCheckCircle className="text-white" size={14} />}
                    </button>
                    <span className={`flex-1 text-sm ${task.status === "done" ? "line-through text-muted-text" : "text-primary-text"}`}>
                      {task.title}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 rounded-lg text-muted-text hover:text-error hover:bg-white/5 transition-all"
                    >
                      <HiTrash size={14} />
                    </button>
                  </GlassCard>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
