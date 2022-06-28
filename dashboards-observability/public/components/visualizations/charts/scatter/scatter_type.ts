/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scatter } from './scatter';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigValueOptions,
  ConfigThresholds,
  ConfigScatterChartStyles,
  ConfigLegend,
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { ConfigAvailability } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { DefaultChartStyles } from '../../../../../common/constants/shared';
import { ButtonGroupItem } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_button_group';
import { SliderConfig } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_style_slider';
const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();
const { DefaultMode, Interpolation, LineWidth, FillOpacity, MarkerSize, LegendPosition, ShowLegend } = DefaultChartStyles;

export const createScatterTypeDefinition = (params: any = {}) => ({
  name: 'scatter',
  type: 'scatter',
  id: 'scatter',
  label: 'Scatter',
  fullLabel: 'Scatter',
  iconType: 'visScatter',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartLine,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  editorConfig: {
    panelTabs: [
      {
        id: 'data-panel',
        name: 'Data',
        mapTo: 'dataConfig',
        editor: VizDataPanel,
        sections: [
          {
            id: 'legend',
            name: 'Legend',
            editor: ConfigLegend,
            mapTo: 'legend',
            schemas: [
              {
                name: 'Show Legend',
                mapTo: 'showLegend',
                component: null,
                props: {
                  options: [
                    { name: 'Show', id: "show" },
                    { name: 'Hidden', id: "hidden" },
                  ],
                  defaultSelections: [{ name: 'Show', id: ShowLegend }],
                },
              },
              {
                name: 'Position',
                mapTo: 'position',
                component: null,
                props: {
                  options: [
                    { name: 'Right', id: 'v' },
                    { name: 'Bottom', id: 'h' },
                  ],
                  defaultSelections: [{ name: 'Right', id: LegendPosition }],
                },
              },
            ],
          },
          {
            id: 'chart_styles',
            name: 'Chart styles',
            editor: ConfigScatterChartStyles,
            mapTo: 'chartStyles',
            schemas: [
              {
                name: 'Mode',
                component: ButtonGroupItem,
                mapTo: 'style',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Scatters', id: 'scatters' },
                    { name: 'Bars', id: 'bar' },
                    { name: 'Points', id: 'markers' },
                    { name: 'Scatters + Points', id: 'scatters+markers' }
                  ],
                  defaultSelections: [{ name: 'Scatters', id: DefaultMode }],
                },
              },
              {
                name: 'Interpolation',
                component: ButtonGroupItem,
                mapTo: 'interpolation',
                eleType: 'buttons',
                props: {
                  options: [
                    { name: 'Linear', id: 'linear' },
                    { name: 'Smooth', id: 'spline' },
                    { name: 'Step before', id: 'hv' },
                    { name: 'Step after', id: 'vh' },
                  ],
                  defaultSelections: [{ name: 'Smooth', id: Interpolation }],
                },
              },
              {
                name: 'Line width',
                component: SliderConfig,
                mapTo: 'lineWidth',
                defaultState: LineWidth,
                eleType: 'slider',
                props:{
                  max: 10,
                }
              },
              {
                name: 'Fill Opacity',
                component: SliderConfig,
                mapTo: 'fillOpacity',
                defaultState: FillOpacity,
                eleType: 'slider',
                props:{
                  max: 100,
                }
              },
              {
                name: 'Point Size',
                component: SliderConfig,
                mapTo: 'pointSize',
                defaultState: MarkerSize,
                eleType: 'slider',
                props:{
                  max: 40,
                }
              },
            ],
          },
          {
            id: 'thresholds',
            name: 'Thresholds',
            editor: ConfigThresholds,
            mapTo: 'thresholds',
            defaultState: [],
            schemas: [],
          },
        ],
      },
      {
        id: 'style-panel',
        name: 'Layout',
        mapTo: 'layoutConfig',
        editor: ConfigEditor,
        content: [],
      },
      {
        id: 'availability-panel',
        name: 'Availability',
        mapTo: 'availabilityConfig',
        editor: ConfigAvailability,
      },
    ],
  },
  visConfig: {
    layout: {
      ...sharedConfigs.layout,
      ...{
        colorway: PLOTLY_COLOR,
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        xaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true,
        },
        yaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true,
        },
      },
    },
    config: {
      ...sharedConfigs.config,
      ...{
        barmode: 'scatter',
        xaxis: {
          automargin: true,
        },
        yaxis: {
          automargin: true,
        },
      },
    },
  },
  component: Scatter,
});
