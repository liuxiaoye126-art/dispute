/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Users,
  ClipboardList,
  CreditCard,
  Settings,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

/* ─── 侧边栏子菜单项 ─── */
interface SubItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}
const SubItem = ({ label, isActive, onClick }: SubItemProps) => (
  <button
    onClick={onClick}
    className={`relative w-full text-left py-2.5 pl-9 pr-4 text-sm transition-colors
      ${isActive
        ? 'text-primary font-medium bg-primary/5 border-l-[3px] border-primary'
        : 'text-on-surface-variant border-l-[3px] border-transparent hover:bg-surface-container-low hover:text-primary'
      }`}
  >
    {label}
  </button>
);

/* ─── 侧边栏一级菜单项 ─── */
interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}
const SidebarItem = ({ icon: Icon, label, isActive, isOpen, onClick, children }: SidebarItemProps) => (
  <div>
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors
        ${isActive
          ? 'text-primary font-medium'
          : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
        }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-[18px] h-[18px] flex-shrink-0" />
        <span>{label}</span>
      </div>
      {children && (isOpen
        ? <ChevronDown className="w-3.5 h-3.5" />
        : <ChevronRight className="w-3.5 h-3.5" />
      )}
    </button>
    <AnimatePresence initial={false}>
      {isOpen && children && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ─── 布局 ─── */
interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs: string[];
  currentModule: string;
  onNavigateToList?: () => void;
}

export const Layout = ({ children, breadcrumbs, currentModule, onNavigateToList }: LayoutProps) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['员工管理']);

  const toggleMenu = (menu: string) =>
    setExpandedMenus(prev =>
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );

  return (
    <div className="flex h-screen overflow-hidden bg-surface">

      {/* ── 侧边栏 ── */}
      <aside className="w-[220px] flex-shrink-0 flex flex-col bg-white border-r border-outline-variant overflow-hidden">
        {/* Logo 区 —— 与顶部栏等高 */}
        <div className="h-12 flex items-center gap-2.5 px-4 bg-primary flex-shrink-0">
          <div className="w-7 h-7 rounded bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            BN
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">笨鸟管理中心</span>
        </div>

        {/* 导航 */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar py-2">
          <SidebarItem
            icon={LayoutDashboard}
            label="首页"
            onClick={() => {}}
          />
          <SidebarItem
            icon={Users}
            label="员工管理"
            isActive={currentModule === '员工管理'}
            isOpen={expandedMenus.includes('员工管理')}
            onClick={() => toggleMenu('员工管理')}
          >
            <SubItem label="离职流程管理" />
            <SubItem
              label="争议人员管理"
              isActive
              onClick={onNavigateToList}
            />
          </SidebarItem>
          <SidebarItem icon={ClipboardList} label="工时管理" onClick={() => {}} />
          <SidebarItem icon={CreditCard} label="薪酬福利" onClick={() => {}} />
          <SidebarItem icon={Settings} label="系统设置" onClick={() => {}} />
        </nav>
      </aside>

      {/* ── 右侧主区 ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* 顶部栏 */}
        <header className="h-12 flex-shrink-0 bg-primary flex items-center justify-between px-5 shadow-sm z-10">
          {/* 左：Logo 文字（侧边栏已有，此处仅显示系统名备用） */}
          <div className="flex items-center gap-2 text-white/90 text-sm">
            {/* 空占位，保持与参考一致的顶栏高度 */}
          </div>

          {/* 右：用户信息 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                ZS
              </div>
              <span className="text-white text-sm">张三</span>
            </div>
            <button className="flex items-center gap-1 text-white/80 hover:text-white text-sm transition-colors">
              <ChevronDown className="w-3.5 h-3.5" />
              退出登录
            </button>
          </div>
        </header>

        {/* 面包屑 */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-5 py-3 text-sm bg-white border-b border-outline-variant">
          <LayoutDashboard className="w-3.5 h-3.5 text-on-surface-variant" />
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb}>
              <span className="text-on-surface-variant">/</span>
              <button
                onClick={crumb === '争议人员管理' ? onNavigateToList : undefined}
                className={
                  index === breadcrumbs.length - 1
                    ? 'text-primary font-medium'
                    : 'text-on-surface-variant hover:text-primary transition-colors'
                }
              >
                {crumb}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* 内容区 */}
        <main className="flex-1 overflow-auto custom-scrollbar p-5">
          {children}
        </main>
      </div>
    </div>
  );
};
