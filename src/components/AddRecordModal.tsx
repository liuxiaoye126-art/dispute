/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { DISPUTE_TYPES } from '../types';

interface AddRecordModalProps {
  onClose: () => void;
  mode?: 'person' | 'record';
}

const FormRow = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="flex items-start gap-3 py-3 border-b border-outline-variant last:border-0">
    <div className="w-28 flex-shrink-0 pt-2 text-right text-sm text-on-surface-variant">
      {required && <span className="text-red-500 mr-0.5">*</span>}
      {label}：
    </div>
    <div className="flex-1 min-w-0">{children}</div>
  </div>
);

export const AddRecordModal = ({ onClose, mode = 'person' }: AddRecordModalProps) => {
  const [handlers, setHandlers] = useState<string[]>(['管理员']);
  const removeHandler = (name: string) => setHandlers(prev => prev.filter(h => h !== name));
  const isPersonMode = mode === 'person';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded border border-outline-variant shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant px-5 py-3 bg-white">
          <h3 className="text-base font-semibold text-on-surface">
            {isPersonMode ? '新增争议人员' : '新增争议记录'}
          </h3>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-low rounded transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 text-on-surface-variant hover:bg-surface-container-low rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto custom-scrollbar px-5 py-2">
          {isPersonMode && (
            <FormRow label="员工姓名" required>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  placeholder="请选择员工姓名"
                  className="admin-input flex-1 bg-surface-container-low cursor-default"
                />
                <button className="flex-shrink-0 rounded bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 transition-colors">
                  选择
                </button>
              </div>
            </FormRow>
          )}

          <FormRow label="争议处理日期" required>
            <input type="date" className="admin-input" />
          </FormRow>

          <FormRow label="处理人" required>
            <div className="flex gap-2">
              <div className="flex flex-1 flex-wrap items-center gap-1.5 min-h-[36px] rounded border border-outline-variant bg-white px-2 py-1">
                {handlers.map(h => (
                  <span key={h} className="inline-flex items-center gap-1 rounded bg-surface-container-low px-2 py-0.5 text-xs text-on-surface">
                    {h}
                    <button onClick={() => removeHandler(h)} className="text-on-surface-variant hover:text-on-surface transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <button className="flex-shrink-0 rounded bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 transition-colors">
                选择
              </button>
            </div>
          </FormRow>

          <FormRow label="争议类型" required>
            <select className="admin-input">
              <option value="">请选择争议类型</option>
              {DISPUTE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </FormRow>

          <FormRow label="争议说明" required>
            <textarea
              className="admin-input resize-none"
              placeholder="请详细描述争议内容..."
              rows={6}
            />
          </FormRow>
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
            确认
          </button>
        </div>
      </motion.div>
    </div>
  );
};

