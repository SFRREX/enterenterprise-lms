"use client"

import React from "react"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />
      <div className="relative w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] border border-black/[0.08] z-10 animate-entrance-scale">
        <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f2]">
          <h2 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#7a7a7a] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] transition-all duration-200 active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  )
}
