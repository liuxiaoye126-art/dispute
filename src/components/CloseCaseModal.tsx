/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

interface CloseCaseModalProps {
  onClose: () => void;
}

export const CloseCaseModal = ({ onClose }: CloseCaseModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded border border-outline-variant shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant px-5 py-3">
          <h3 className="text-base font-semibold text-on-surface">争议案件结案</h3>
          <button onClick={onClose} className="p-1.5 text-on-surface-variant hover:bg-surface-container-low rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-on-surface-variant">结案日期</label>
              <input type="date" className="admin-input" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-on-surface-variant">结案金额 (CNY)</label>
              <input type="number" className="admin-input" placeholder="请输入金额" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-on-surface-variant">支付日期</label>
            <input type="date" className="admin-input" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-on-surface-variant">结案说明</label>
            <textarea className="admin-input resize-none" placeholder="请输入结案详细说明..." rows={4} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-outline-variant px-5 py-3 bg-surface-container-low">
          <button
            onClick={onClose}
            className="rounded border border-outline-variant bg-white px-5 py-2 text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            取消
          </button>
          <button className="rounded bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
            提交结案
          </button>
        </div>
      </motion.div>
    </div>
  );
};
