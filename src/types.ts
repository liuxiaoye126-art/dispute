/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Employee {
  id: string;
  name: string;
  workId: string;
  project: string;
  operationCenter: string;
  disputeType: string;
  disputeDescription: string;
  avatarColor: string;
  settlementAmount?: number;
  paymentDate?: string;
}

export interface DisputeRecord {
  id: string;
  date: string;
  handler: string;
  type: string;
  description: string;
  recorder: string;
}

export type ViewState = 'list' | 'detail';

export const DISPUTE_TYPES = [
  '劳动监察投诉/举报',
  '仲裁前调解',
  '劳动仲裁',
  '一审',
  '二审',
  '再审',
  '抗诉',
];

export const PROJECTS = [
  '杭州交付中心项目',
  '北京研发支持项目',
  '上海运营外包项目',
  '深圳客服支持项目',
];

export const OPERATION_CENTERS = [
  '第一运营中心',
  '第二运营中心',
  '第三运营中心',
  '第四运营中心',
  '第五运营中心',
  '第六运营中心',
  '第七运营中心',
  '第八运营中心',
];
