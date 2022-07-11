/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Plt } from '../../plotly/plot';

// @ts-ignore
import Graph from 'react-graph-vis';
import { isEmpty, max, min, uniq } from 'lodash';

const arr1 = [1, 2, 3, 4, 5];
const arr2 = ['US', 'US', 'CN', 'CN', 'US'];
const arr3 = ['AF', 'AT', 'US', 'BD', 'BF'];

export const NetworkDiagram = ({ visualizations, layout, config }: any) => {
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;

  // console.log('visualizations.data?.rawVizData ',visualizations.data?.rawVizData)

  const xaxis = visualizations.data?.rawVizData?.network_diagram?.dataConfig?.dimensions
  ? visualizations.data?.rawVizData?.network_diagram?.dataConfig?.dimensions
  : [];
const yaxis = visualizations.data?.rawVizData?.network_diagram?.dataConfig?.metrics
  ? visualizations.data?.rawVizData?.network_diagram?.dataConfig?.metrics
  : [];

console.log('xaxis ',xaxis)
console.log('yaxis ',yaxis)

  const sourceField =
    dataConfig?.valueOptions &&
      dataConfig?.valueOptions.source &&
      !isEmpty(dataConfig?.valueOptions.source)
      ? dataConfig?.valueOptions.source[0]
      : fields[fields.length - 1];

  const destField =
    dataConfig?.valueOptions &&
      dataConfig?.valueOptions.dest &&
      !isEmpty(dataConfig?.valueOptions.dest)
      ? dataConfig?.valueOptions.dest[0]
      : fields[fields.length - 2];

  const valueField = fields[0];
console.log('sourceField ',sourceField)
console.log('destField ',destField)
  let index = 1;
  const allLabels = uniq([...uniq(data[sourceField.name]), ...uniq(data[destField.name])]);
  const newNodes = allLabels.map((node) => ({
    id: index++,
    label: node,
    title: node,
  }));

  console.log('number of nodes: ', newNodes.length);

  const minEdgeValue = min(data[valueField.name]);
  const maxEdgeValue = max(data[valueField.name]);

  console.log('data[sourceField.name] ',data[sourceField.name])
  const newEdges = data[sourceField.name].map((val, i) => ({
    from: newNodes.find((node) => node.label === val)?.id,
    to: newNodes.find((node) => node.label === data[destField.name][i])?.id,
    title: data[valueField.name][i],
    // value: data[valueField.name][i],
  }));

  const newGraph = { nodes: newNodes, edges: newEdges };

  // const graph = {
  //   nodes: [
  //     { id: 1, label: 'Node 1', title: 'node 1 tooltip text' },
  //     { id: 2, label: 'Node 2', title: 'node 2 tooltip text' },
  //     { id: 3, label: 'Node 3', title: 'node 3 tooltip text' },
  //     { id: 4, label: 'Node 4', title: 'node 4 tooltip text' },
  //     { id: 5, label: 'Node 5', title: 'node 5 tooltip text' },
  //   ],
  //   edges: [
  //     { from: 1, to: 2 },
  //     { from: 1, to: 3 },
  //     { from: 2, to: 4 },
  //     { from: 2, to: 5 },
  //   ],
  // };

  // const options = {
  //   layout: {
  //     hierarchical: true,
  //   },
  //   edges: {
  //     color: '#000000',
  //   },
  //   height: '500px',
  // };

  const options = {
    // Used in service-map
    layout: {
      hierarchical: false,
      improvedLayout: true,
    },
    edges: {
      // arrows: {
      //   to: {
      //     enabled: false,
      //   },
      // },
      // scaling: {
      //   min: minEdgeValue,
      //   max: maxEdgeValue,
      // },
    },
    height: '500px',
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -126,
        springLength: 200,
        springConstant: 0.01
      },
      maxVelocity: 50,
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: true
    },
    interaction: {
      tooltipDelay: 200,
      hideEdgesOnDrag: true,
      hideEdgesOnZoom: true
    }
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
    stabilizationProgress: function (event) {
      console.log('stabilizationProgress  called');
    },
    stabilizationIterationsDone: function (event) {
      console.log('stabilizationIterationsDone  called');
    },
    stabilized: function (event) {
      console.log('stabilized  called', event);
    },
    startStabilizing: function (event) {
      console.log('startStabilizing  called', event);
    },
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
        {dataConfig?.panelOptions?.title || layoutConfig.layout?.title || ''}
      </div>
      <Graph
        graph={newGraph}
        options={options}
        events={events}
        getNetwork={(network) => {
          console.log('network: ', network);
          // console.log('network.getSeed()', network.getSeed());

          // network.startSimulation();
          // network.startSimulation();
          // network.startSimulation();
          // network.startSimulation();
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </>
  );
};
