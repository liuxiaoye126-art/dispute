/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/layout/Shell';
import { DisputeManagement } from './pages/DisputeManagement';
import { DisputeDetail } from './pages/DisputeDetail';
import { ViewState } from './types';

export default function App() {
  const [view, setView] = useState<ViewState>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const breadcrumbs = ['员工管理', '争议人员管理'];
  if (view === 'detail') {
    breadcrumbs.push('争议记录');
  }

  const handleDetailClick = (id: string) => {
    setSelectedId(id);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedId(null);
  };

  return (
    <Layout 
      breadcrumbs={breadcrumbs} 
      currentModule="员工管理"
      onNavigateToList={handleBack}
    >
      {view === 'list' ? (
        <DisputeManagement onDetailClick={handleDetailClick} />
      ) : (
        <DisputeDetail onBack={handleBack} />
      )}
    </Layout>
  );
}
