/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, RefreshCw, UserPlus } from 'lucide-react';
import { PROJECTS, OPERATION_CENTERS, DISPUTE_TYPES } from '../types';

const LabelInput = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-sm text-on-surface-variant">{label}</span>
    {children}
  </div>
);

interface SearchFilterProps {
  onAddClick: () => void;
}

export const SearchFilter = ({ onAddClick }: SearchFilterProps) => {
  return (
    <div className="admin-card mb-4 px-5 py-4">
      {/* 第一行 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <LabelInput label="姓名">
          <input type="text" className="admin-input" placeholder="输入姓名" />
        </LabelInput>
        <LabelInput label="运营中心">
          <select className="admin-input">
            <option value="">全部运营中心</option>
            {OPERATION_CENTERS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </LabelInput>
        <LabelInput label="所属项目">
          <select className="admin-input">
            <option value="">全部项目</option>
            {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </LabelInput>
        <LabelInput label="争议类型">
          <select className="admin-input">
            <option value="">全部类型</option>
            {DISPUTE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </LabelInput>
      </div>
      {/* 第二行 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <LabelInput label="支付日期">
          <div className="flex items-center gap-2">
            <input type="date" className="admin-input" />
            <span className="text-on-surface-variant text-sm flex-shrink-0">至</span>
            <input type="date" className="admin-input" />
          </div>
        </LabelInput>
        <div />
        <div />
        <div className="flex items-center justify-end gap-2">
          <button className="flex items-center gap-1.5 rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
            <Search className="w-3.5 h-3.5" />
            查询
          </button>
          <button className="flex items-center gap-1.5 rounded border border-outline-variant bg-white px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            重置
          </button>
          <button
            onClick={onAddClick}
            className="flex items-center gap-1.5 rounded border border-primary/30 px-4 py-2 text-sm text-primary hover:bg-primary/5 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            新增人员
          </button>
        </div>
      </div>
    </div>
  );
};

