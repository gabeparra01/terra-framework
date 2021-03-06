import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ApplicationTabs from '../../../tabs/ApplicationTabs';
import testShortConfig from '../common/testShortConfig';

const demoheaderstyles = {
  width: '100%',
  backgroundColor: '#8ca1b1',
  height: '49px',
  position: 'relative',
};

export default () => (
  <MemoryRouter
    initialEntries={testShortConfig.map(link => link.path)}
    initialIndex={0}
  >
    <div style={demoheaderstyles}>
      <ApplicationTabs id="test-tabs" alignment="start" links={testShortConfig} />
    </div>
  </MemoryRouter>
);
