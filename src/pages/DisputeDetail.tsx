/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { DisputeRecord } from '../types';
import { AddRecordModal } from '../components/AddRecordModal';

interface DisputeDetailProps {
  onBack: () => void;
}

const MOCK_RECORDS: DisputeRecord[] = [
  { id: '1', date: '2023-11-15', handler: '张美玲', type: '仲裁前调解', description: '双方就未休年假工资补偿金额存在分歧...', recorder: '王强' },
  { id: '2', date: '2023-10-20', handler: '李伟', type: '内部协商', description: '关于绩效考核评分标准的异议沟通', recorder: '王强' },
  { id: '3', date: '2024-01-20', handler: '张美玲', type: '一审阶段', description: '仲裁裁决书已下达，公司提起起诉，进入一审诉讼阶段。目前正在准备相关证据材料。', recorder: '王强' },
];

const getBadge = (type: string) => {
  const map: Record<string, string> = {
    '仲裁前调解': 'bg-yellow-100 text-yellow-700',
    '内部协商': 'bg-cyan-100 text-primary',
    '一审阶段': 'bg-purple-100 text-purple-600',
  };
  return map[type] ?? 'bg-surface-container text-on-surface-variant';
};

const INFO_ITEMS = [
  { label: '姓名', value: '王翔' },
  { label: '客户现场组最后工作日', value: '2025-10-31' },
  { label: '运营中心', value: '第六运营中心' },
  { label: '项目名称', value: '浦发银行研发外协项目-2025年度-西安' },
  { label: '劳动关系解除日', value: '2025-10-31' },
  { label: '最后计薪日', value: '2025-10-31' },
  { label: '是否有缓发薪资', value: '是' },
  { label: '缓发薪资备注', value: '10月薪资先按照7000的基数发放，其他等工作量结算后发放。系统还剩0.5天的调休未使用，折算成加班费发放。', large: true },
  { label: '是否有年假需要折现', value: '否' },
  { label: '年假折现备注', value: '--' },
  { label: '社保公积金最后缴纳月份', value: '202510' },
  { label: '离职类型', value: '主动离职' },
  { label: '是否有补偿金', value: '否' },
  { label: '补偿金额', value: '--' },
  { label: '补偿金备注', value: '--' },
  { label: '是否申领失业金', value: '否' },
  { label: '工作交接人', value: '--' },
  { label: '工作交接是否完成', value: '是', icon: true },
  { label: '工作交接备注', value: '行里工作已经给你交接完毕' },
  { label: '笨鸟角色及交接人', value: '--' },
  { label: '离职原因', value: '个人原因' },
  { label: '离职邮件', value: '下载', action: true },
  { label: '离职证明', value: '下载', action: true },
  { label: '转入方', value: '--' },
] as const;

export const DisputeDetail = ({ onBack }: DisputeDetailProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4 max-w-7xl mx-auto">

      {/* 争议记录列表 */}
      <div className="admin-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-outline-variant px-5 py-3">
          <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
            <span className="panel-title-accent"></span>
            争议记录列表
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            新增记录
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low text-xs font-semibold text-on-surface-variant">
                <th className="px-5 py-3">争议处理日期</th>
                <th className="px-5 py-3">处理人</th>
                <th className="px-5 py-3">争议类型</th>
                <th className="px-5 py-3">争议说明</th>
                <th className="px-5 py-3">录入人</th>
                <th className="px-5 py-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-sm text-on-surface">
              {MOCK_RECORDS.map((record) => (
                <tr key={record.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-5 py-3">{record.date}</td>
                  <td className="px-5 py-3">{record.handler}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${getBadge(record.type)}`}>
                      {record.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-on-surface-variant max-w-xs truncate">{record.description}</td>
                  <td className="px-5 py-3">{record.recorder}</td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <button className="text-primary text-xs hover:underline transition-colors">编辑</button>
                    <button className="text-red-500 text-xs hover:underline transition-colors">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 人员离职详情 */}
      <div className="admin-card overflow-hidden">
        <div className="border-b border-outline-variant px-5 py-3">
          <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
            <span className="panel-title-accent"></span>
            人员离职详情信息
          </h3>
        </div>
        <div className="p-5">
          {/* 摘要卡片行 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-4 rounded border border-outline-variant bg-surface-container-low p-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-base">王翔</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-on-surface">王翔</span>
                  <span className="rounded bg-surface-container px-1.5 py-0.5 text-[10px] text-on-surface-variant">已离职</span>
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">工号: --</div>
              </div>
            </div>
            <div className="rounded border border-outline-variant bg-surface-container-low p-4">
              <div className="text-xs text-on-surface-variant mb-1">最后计薪日</div>
              <div className="text-xl font-bold text-on-surface">2025-10-31</div>
            </div>
            <div className="rounded border border-outline-variant bg-surface-container-low p-4">
              <div className="text-xs text-on-surface-variant mb-1">补偿金额 (CNY)</div>
              <div className="text-xl font-bold text-red-500">--</div>
              <div className="text-xs text-on-surface-variant mt-1">是否有补偿: 否</div>
            </div>
          </div>

          {/* 字段网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
            {INFO_ITEMS.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1 min-w-0">
                <span className="text-xs text-on-surface-variant">{item.label}</span>
                <div className="flex items-center gap-1.5 min-w-0">
                  {'icon' in item && item.icon && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                  {'action' in item && item.action ? (
                    <button className="text-primary text-sm flex items-center gap-1 hover:underline transition-colors">
                      {item.value}
                      <Download className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className={`text-on-surface ${'large' in item && item.large ? 'text-xs leading-relaxed' : 'text-sm font-medium'} break-words`}>
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-start pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </button>
      </div>

      {isModalOpen && <AddRecordModal mode="record" onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
