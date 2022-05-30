/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { supressResizeObserverIssue } from './constants'

export const delay = 1000;
export const YEAR_TO_DATE_DOM_ID = '[data-test-subj="superDatePickerCommonlyUsed_Year_to date"]'

export const TEST_QUERIES = [
  {
    query: 'source = opensearch_dashboards_sample_data_flights',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID
  },
  {
    query: 'source = opensearch_dashboards_sample_data_flights | stats avg(FlightDelayMin) by Carrier',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID
  },
  {
    query: 'source = opensearch_dashboards_sample_data_logs'
  },
  {
    query: 'source = opensearch_dashboards_sample_data_logs | stats count() by host',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID
  },
  {
    query: 'source = opensearch_dashboards_sample_data_logs | stats count(), avg(bytes) by host, tags',
    dateRangeDOM: YEAR_TO_DATE_DOM_ID
  },
  {
    query:"source = opensearch_dashboards_sample_data_logs | where response='503' or response='404' | stats count() by span(timestamp,1d)", 
    dateRangeDOM: YEAR_TO_DATE_DOM_ID
  },
];

export const TESTING_PANEL = 'Mock Testing Panels';
export const SAVE_QUERY1 = 'Mock Flight Events Overview';
export const SAVE_QUERY2 = 'Mock Flight count by destination';
export const SAVE_QUERY3 = 'Mock Flight count by destination save to panel';
export const SAVE_QUERY4 = 'Mock Flight peek';

export const querySearch = (query, rangeSelected) => {
  cy.get('[data-test-subj="searchAutocompleteTextArea"]').type(query);
  cy.get('[data-test-subj="superDatePickerToggleQuickMenuButton"]').click();
  cy.wait(delay);
  cy.get(rangeSelected).click();
  cy.get('[data-test-subj="superDatePickerApplyTimeButton"]').contains('Refresh').click();
};

export const landOnEventHome = () => {
  cy.visit(`${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics`);
  cy.wait(delay);
};

export const landOnEventExplorer = () => {
  cy.visit(
    `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics/explorer`
  );
  cy.wait(delay);
};

export const landOnEventVisualizations = () => {
  cy.visit(
    `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/event_analytics/explorer`
  );
  cy.get('button[id="main-content-vis"]').contains('Visualizations').click();
  supressResizeObserverIssue();
  cy.wait(delay);
};

export const landOnPanels = () => {
  cy.visit(
    `${Cypress.env('opensearchDashboards')}/app/observability-dashboards#/operational_panels`
  );
  cy.wait(delay);
};

export const renderPieChart = () => {
  querySearch(TEST_QUERIES[5].query, TEST_QUERIES[5].dateRangeDOM);
  cy.get('[data-test-subj="configPane__vizTypeSelector"] [data-test-subj="comboBoxInput"]').type('Pie').type('{enter}');
  cy.wait(delay);
    cy.get('#configPanel__panelOptions .euiFieldText').click().type('Pie chart');
    cy.get('.euiFlexItem .euiFormRow [placeholder="Description"]').click().type('This is the description for Pie chart');
    cy.get('.euiIEFlexWrapFix').eq(1).contains('Value options').should('exist');
    cy.get('[data-test-subj="comboBoxInput"]').eq(1).click();
    cy.get('[name="count()"]').eq(0).click();
    cy.get('[data-test-subj="comboBoxToggleListButton"]').eq(0).click();
    cy.get('[data-test-subj="comboBoxInput"]').eq(2).click();
    cy.get('[name="count()"]').eq(1).click({ multiple: true });
    cy.get('.euiIEFlexWrapFix').eq(2).contains('Chart Styles').should('exist');
    cy.get('[data-test-subj="comboBoxInput"]').eq(3).click();
    cy.get('[name="Pie"]').click();
    cy.get('.euiSuperSelectControl').click();
    cy.get('.euiContextMenuItem.euiSuperSelect__item.euiSuperSelect__item--hasDividers').eq(1).click();
}; 
