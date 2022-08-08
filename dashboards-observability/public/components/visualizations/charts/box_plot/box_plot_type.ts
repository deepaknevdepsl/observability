/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { BoxPlot } from './box_plot';
import { getPlotlySharedConfigs, getPlotlyCategory } from '../shared/shared_configs';
import { LensIconChartLine } from '../../assets/chart_line';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { VizDataPanel } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/default_vis_editor';
import { ConfigEditor } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/json_editor';
import {
  ConfigThresholds,
  ConfigBoxChartStyles,
  ConfigLegend,
  InputFieldItem,
  ConfigColorTheme
} from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls';
import { ConfigAvailability } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { DefaultChartStyles } from '../../../../../common/constants/shared';
import { ButtonGroupItem } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_button_group';
import { SliderConfig } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_style_slider';
const sharedConfigs = getPlotlySharedConfigs();
const VIS_CATEGORY = getPlotlyCategory();
const {
  DefaultMode,
  LineWidth,
  FillOpacity,
  LegendPosition,
  ShowLegend,
  LabelAngle
} = DefaultChartStyles;

export const createBoxPlotTypeDefinition = (params: any = {}) => ({
  name: 'box',
  type: 'box',
  id: 'box_plot',
  label: 'Box plot',
  fullLabel: 'Box plot',
  iconType: 'visLine',
  category: VIS_CATEGORY.BASICS,
  selection: {
    dataLoss: 'nothing',
  },
  icon: LensIconChartLine,
  categoryAxis: 'xaxis',
  seriesAxis: 'yaxis',
  boxpoints: 'Outliers',
  jitter: 0.3,
  pointpos: -1.8,
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
                    { name: 'Show', id: 'show' },
                    { name: 'Hidden', id: 'hidden' },
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
              {
                title: 'Legend Size',
                name: 'Legend Size',
                component: InputFieldItem,
                mapTo: 'legendSize',
                eleType: 'input',
              },
            ],
          },
          {
            id: 'chart_styles',
            name: 'Chart styles',
            editor: ConfigBoxChartStyles,
            mapTo: 'chartStyles',
            schemas: [
              // {
              //   name: 'Mode',
              //   component: ButtonGroupItem,
              //   mapTo: 'style',
              //   eleType: 'buttons',
              //   props: {
              //     options: [
              //       { name: 'Lines', id: 'lines' },
              //     ],
              //     defaultSelections: [{ name: 'Lines', id: DefaultMode }],
              //   },
              // },
              // {
              //   name: 'Interpolation',
              //   component: ButtonGroupItem,
              //   mapTo: 'interpolation',
              //   eleType: 'buttons',
              //   props: {
              //     options: [
              //       { name: 'Linear', id: 'linear' },
              //       { name: 'Smooth', id: 'spline' },
              //       { name: 'Step before', id: 'hv' },
              //       { name: 'Step after', id: 'vh' },
              //     ],
              //     defaultSelections: [{ name: 'Smooth', id: Interpolation }],
              //   },
              // },
              {
                name: 'Line width',
                component: SliderConfig,
                mapTo: 'lineWidth',
                defaultState: LineWidth,
                eleType: 'slider',
                props: {
                  max: 10,
                },
              },
              {
                name: 'Fill Opacity',
                component: SliderConfig,
                mapTo: 'fillOpacity',
                defaultState: FillOpacity,
                eleType: 'slider',
                props: {
                  max: 100,
                },
              },
              // {
              //   name: 'Point Size',
              //   component: SliderConfig,
              //   mapTo: 'pointSize',
              //   defaultState: MarkerSize,
              //   eleType: 'slider',
              //   props: {
              //     max: 40,
              //   },
              // },
              {
                title: 'Label Size',
                name: 'Label Size',
                component: InputFieldItem,
                mapTo: 'labelSize',
                eleType: 'input',
              },
              {
                name: 'Rotate labels',
                component: SliderConfig,
                mapTo: 'rotateLabels',
                eleType: 'slider',
                defaultState: LabelAngle,
                props: {
                  ticks: [
                    { label: '-90°', value: -90 },
                    { label: '-45°', value: -45 },
                    { label: '0°', value: 0 },
                    { label: '45°', value: 45 },
                    { label: '90°', value: 90 },
                  ],
                  showTicks: true,
                  min: -90,
                  max: 90,
                },
              },
            ],
          },
          {
            id: 'color-theme',
            name: 'Color theme',
            editor: ConfigColorTheme,
            mapTo: 'colorTheme',
            schemas: [],
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
        boxmode:'group',
      },
    },
    config: {
      ...sharedConfigs.config,
      ...{
        xaxis: {
          automargin: true,
        },
        yaxis: {
          automargin: true,
        },
      },
    },
  },
  component: BoxPlot,
});
