import React from 'react';
import Card from '@ui/Card';
import PaddedView from '@ui/PaddedView';
import { VictoryLine, VictoryChart, VictoryAxis } from '@ui/Chart';

function ContributionsChart() {
  return (
    <Card>
      <PaddedView>
        <VictoryChart>
          <VictoryLine
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 },
            ]}
          />
          <VictoryAxis />
        </VictoryChart>
      </PaddedView>
    </Card>
  );
}

export default ContributionsChart;
