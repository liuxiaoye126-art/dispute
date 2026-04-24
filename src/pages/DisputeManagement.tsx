/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SearchFilter } from '../components/SearchFilter';
import { DisputeTable } from '../components/DisputeTable';
import { Employee } from '../types';
import { AddRecordModal } from '../components/AddRecordModal';
import { CloseCaseModal } from '../components/CloseCaseModal';

interface DisputeManagementProps {
  onDetailClick: (id: string) => void;
}

const MOCK_DATA: Employee[] = [
  {
    id: '1',
    name: '王伟',
    workId: 'BN-100293',
    project: '杭州交付中心项目',
    operationCenter: '第一运营中心',
    disputeType: '劳动监察投诉/举报',
    disputeDescription: '员工主张未足额缴纳社保，已提交相关证明材料。',
    avatarColor: 'bg-cyan-100 text-primary',
    settlementAmount: 5000,
    paymentDate: '2024-03-20',
  },
  {
    id: '2',
    name: '李芳',
    workId: 'BN-200384',
    project: '北京研发支持项目',
    operationCenter: '第三运营中心',
    disputeType: '仲裁前调解',
    disputeDescription: '针对离职补偿金金额存在分歧，目前处于调解阶段。',
    avatarColor: 'bg-blue-100 text-blue-600',
    settlementAmount: 12000,
    paymentDate: '2024-03-25',
  },
  {
    id: '3',
    name: '张健',
    workId: 'BN-109482',
    project: '上海运营外包项目',
    operationCenter: '第五运营中心',
    disputeType: '劳动仲裁',
    disputeDescription: '因考勤扣罚引起不满，员工提起仲裁申请。',
    avatarColor: 'bg-purple-100 text-purple-600',
  },
  {
    id: '4',
    name: '赵静',
    workId: 'BN-300219',
    project: '深圳客服支持项目',
    operationCenter: '第七运营中心',
    disputeType: '一审',
    disputeDescription: '薪资纠纷，涉及加班费计算基数问题。',
    avatarColor: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: '5',
    name: '刘勇',
    workId: 'BN-112003',
    project: '杭州交付中心项目',
    operationCenter: '第一运营中心',
    disputeType: '二审',
    disputeDescription: '绩效考核结果争议，员工不认可考核流程。',
    avatarColor: 'bg-on-surface-variant/10 text-on-surface-variant',
  },
];

export const DisputeManagement = ({ onDetailClick }: DisputeManagementProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SearchFilter onAddClick={() => setIsModalOpen(true)} />
      <DisputeTable 
        data={MOCK_DATA} 
        onDetailClick={onDetailClick} 
        onCloseCaseClick={() => setIsCloseModalOpen(true)}
      />
      {isModalOpen && <AddRecordModal onClose={() => setIsModalOpen(false)} />}
      {isCloseModalOpen && <CloseCaseModal onClose={() => setIsCloseModalOpen(false)} />}
    </div>
  );
};
