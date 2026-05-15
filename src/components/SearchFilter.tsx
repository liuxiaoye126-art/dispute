/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, Search, RefreshCw, UserPlus } from 'lucide-react';
import { PROJECTS, OPERATION_CENTERS, DISPUTE_STAGES, DISPUTE_TYPES } from '../types';

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
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStage, setSelectedStage] = useState('');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const needsStage = selectedTypes.includes('诉讼');

  const toggleType = (type: string) => {
    setSelectedStage((currentStage) => (type === '诉讼' && selectedTypes.includes(type) ? '' : currentStage));
    setSelectedTypes((currentTypes) =>
      currentTypes.includes(type)
        ? currentTypes.filter((item) => item !== type)
        : [...currentTypes, type]
    );
  };

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
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsTypeDropdownOpen((open) => !open)}
              className="admin-input flex items-center justify-between text-left"
            >
              <span className={`truncate whitespace-nowrap ${selectedTypes.length ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                {selectedTypes.length ? selectedTypes.join('、') : '全部类型'}
              </span>
              <ChevronDown className={`h-4 w-4 text-on-surface-variant transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isTypeDropdownOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 rounded border border-outline-variant bg-white p-2 shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-2 py-1">
                  {DISPUTE_TYPES.map((type) => (
                    <label key={type} className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-sm text-on-surface">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/30"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
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
        {needsStage ? (
          <LabelInput label="争议阶段">
            <select value={selectedStage} onChange={(event) => setSelectedStage(event.target.value)} className="admin-input">
              <option value="">全部阶段</option>
              {DISPUTE_STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
            </select>
          </LabelInput>
        ) : <div />}
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

