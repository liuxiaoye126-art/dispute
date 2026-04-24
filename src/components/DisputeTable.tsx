/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Employee } from '../types';

interface DisputeTableProps {
  data: Employee[];
  onDetailClick: (id: string) => void;
  onCloseCaseClick: (id: string) => void;
}

export const DisputeTable = ({ data, onDetailClick, onCloseCaseClick }: DisputeTableProps) => {
  const getBadgeColor = (type: string) => {
    if (type === '劳动监察投诉/举报') return 'bg-red-100 text-red-600';
    if (type === '仲裁前调解') return 'bg-yellow-100 text-yellow-700';
    if (type === '劳动仲裁') return 'bg-orange-100 text-orange-600';
    if (type === '一审') return 'bg-indigo-100 text-indigo-600';
    if (type === '二审') return 'bg-rose-100 text-rose-600';
    return 'bg-cyan-100 text-primary';
  };

  return (
    <div className="admin-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant text-sm font-semibold text-on-surface bg-surface-container-low">
              <th className="px-4 py-3">员工姓名</th>
              <th className="px-4 py-3">所属项目</th>
              <th className="px-4 py-3">运营中心</th>
              <th className="px-4 py-3">结案金额</th>
              <th className="px-4 py-3">支付日期</th>
              <th className="px-4 py-3">争议类型</th>
              <th className="px-4 py-3 min-w-[200px]">争议说明</th>
              <th className="px-4 py-3 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant text-sm">
            {data.map((employee) => (
              <tr key={employee.id} className="hover:bg-surface-container-low transition-colors cursor-pointer">
                <td className="px-4 py-4">
                  <div className="font-semibold text-on-surface">{employee.name}</div>
                </td>
                <td className="px-4 py-4 text-on-surface-variant">{employee.project}</td>
                <td className="px-4 py-4 text-on-surface-variant">{employee.operationCenter}</td>
                <td className="px-4 py-4 text-on-surface font-medium">
                  {employee.settlementAmount ? `¥${employee.settlementAmount.toLocaleString()}` : '--'}
                </td>
                <td className="px-4 py-4 text-on-surface-variant text-xs">
                  {employee.paymentDate || '--'}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${getBadgeColor(employee.disputeType)}`}>
                    {employee.disputeType}
                  </span>
                </td>
                <td className="px-4 py-4 text-on-surface-variant max-w-xs truncate">
                  {employee.disputeDescription}
                </td>
                <td className="px-4 py-4 text-center whitespace-nowrap">
                  <button
                    onClick={() => onDetailClick(employee.id)}
                    className="text-primary hover:underline text-sm mr-3 transition-colors"
                  >
                    争议记录
                  </button>
                  <button
                    onClick={() => onCloseCaseClick(employee.id)}
                    className="text-primary hover:underline text-sm mr-3 transition-colors"
                  >
                    结案
                  </button>
                  <button className="text-red-500 hover:underline text-sm transition-colors">
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between border-t border-outline-variant px-4 py-3 bg-white">
        <div className="text-sm text-on-surface-variant">
          共 <span className="text-on-surface font-medium">{data.length}</span> 条记录，每页显示 15 条
        </div>
        <div className="flex items-center gap-1.5">
          <button className="h-7 w-7 flex items-center justify-center rounded border border-outline-variant bg-white text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">
            &lt;
          </button>
          <button className="h-7 min-w-[28px] px-2 rounded bg-primary text-white text-sm font-medium">1</button>
          <button className="h-7 min-w-[28px] px-2 rounded border border-outline-variant bg-white text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">2</button>
          <button className="h-7 min-w-[28px] px-2 rounded border border-outline-variant bg-white text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">3</button>
          <button className="h-7 w-7 flex items-center justify-center rounded border border-outline-variant bg-white text-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
