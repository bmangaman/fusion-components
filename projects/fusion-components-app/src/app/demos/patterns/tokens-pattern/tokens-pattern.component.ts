import { Component } from '@angular/core';

@Component({
  selector: 'fusion-demo-tokens',
  templateUrl: './tokens-pattern.component.html',
  styleUrls: ['./tokens-pattern.component.scss']
})
export class TokensPatternComponent {
  blues = [
    { name: 'NetApp',       token: '$fusion-ui-color-blue-netapp',       value: '#0067C5', textColor: 'light' },
    { name: 'Lightest',     token: '$fusion-ui-color-blue-lightest',     value: '#EFF4FF', textColor: 'dark' },
    { name: 'Light',        token: '$fusion-ui-color-blue-light',        value: '#A5BFED', textColor: 'dark' },
    { name: 'Medium Light', token: '$fusion-ui-color-blue-medium-light', value: '#6C9CEF', textColor: 'light' },
    { name: 'Medium',       token: '$fusion-ui-color-blue-medium',       value: '#2D6DDE', textColor: 'light' },
    { name: 'Medium Dark',  token: '$fusion-ui-color-blue-medium-dark',  value: '#1E4A93', textColor: 'light' },
    { name: 'Dark',         token: '$fusion-ui-color-blue-dark',         value: '#0A2D6C', textColor: 'light' },
    { name: 'Darkest',      token: '$fusion-ui-color-blue-darkest',      value: '#08214B', textColor: 'light' },
  ];

  error = [
    { name: 'Error Primary',    token: '$fusion-ui-color-error-primary',    value: '#DA1E21', textColor: 'light' },
    { name: 'Error Chart',      token: '$fusion-ui-color-error-chart',      value: '#FF4548', textColor: 'light' },
    { name: 'Error Background', token: '$fusion-ui-color-error-background', value: '#FCCDCE', textColor: 'dark' },
  ];

  warning = [
    { name: 'Warning Primary',    token: '$fusion-ui-color-warning-primary',    value: '#F88402', textColor: 'light' },
    { name: 'Warning Chart',      token: '$fusion-ui-color-warning-chart',      value: '#FFAC00', textColor: 'light' },
    { name: 'Warning Background', token: '$fusion-ui-color-warning-background', value: '#FFE1A1', textColor: 'dark' },
  ];

  success = [
    { name: 'Success Primary',    token: '$fusion-ui-color-success-primary',    value: '#498128', textColor: 'light' },
    { name: 'Success Chart',      token: '$fusion-ui-color-success-chart',      value: '#90C44B', textColor: 'dark' },
    { name: 'Success Background', token: '$fusion-ui-color-success-background', value: '#B4E697', textColor: 'dark' },
  ];

  opaqueGreyscale = [
    { name: 'Black',        token: '$fusion-ui-color-black',  value: '#000000', textColor: 'light' },
    { name: 'Greyscale 7',  token: '$fusion-ui-greyscale-7',  value: '#131313', textColor: 'light' },
    { name: 'Greyscale 15', token: '$fusion-ui-greyscale-15', value: '#252525', textColor: 'light' },
    { name: 'Greyscale 27', token: '$fusion-ui-greyscale-27', value: '#454545', textColor: 'light' },
    { name: 'Greyscale 34', token: '$fusion-ui-greyscale-34', value: '#565656', textColor: 'light' },
    { name: 'Greyscale 53', token: '$fusion-ui-greyscale-53', value: '#888888', textColor: 'dark' },
    { name: 'Greyscale 61', token: '$fusion-ui-greyscale-61', value: '#9c9c9c', textColor: 'dark' },
    { name: 'Greyscale 76', token: '$fusion-ui-greyscale-61', value: '#C2C2C2', textColor: 'dark' },
    { name: 'Greyscale 84', token: '$fusion-ui-greyscale-61', value: '#D7D7D7', textColor: 'dark' },
    { name: 'Greyscale 85', token: '$fusion-ui-greyscale-61', value: '#F2F2F2', textColor: 'dark' },
    { name: 'Greyscale 96', token: '$fusion-ui-greyscale-61', value: '#F6F6F6', textColor: 'dark' },
    { name: 'White',        token: '$fusion-ui-color-white',  value: '#FFFFFF', textColor: 'dark' },
  ];

  alphaGreyscale = [
    { name: 'Greyscale 7',  token: '$fusion-ui-alpha-greyscale-7',  value: 'rgba(0, 0, 0, .93)', textColor: 'light' },
    { name: 'Greyscale 15', token: '$fusion-ui-alpha-greyscale-15', value: 'rgba(0, 0, 0, .85)', textColor: 'light' },
    { name: 'Greyscale 27', token: '$fusion-ui-alpha-greyscale-27', value: 'rgba(0, 0, 0, .73)', textColor: 'light' },
    { name: 'Greyscale 34', token: '$fusion-ui-alpha-greyscale-34', value: 'rgba(0, 0, 0, .66)', textColor: 'light' },
    { name: 'Greyscale 53', token: '$fusion-ui-alpha-greyscale-53', value: 'rgba(0, 0, 0, .47)', textColor: 'dark' },
    { name: 'Greyscale 61', token: '$fusion-ui-alpha-greyscale-61', value: 'rgba(0, 0, 0, .39)', textColor: 'dark' },
    { name: 'Greyscale 76', token: '$fusion-ui-alpha-greyscale-61', value: 'rgba(0, 0, 0, .24)', textColor: 'dark' },
    { name: 'Greyscale 84', token: '$fusion-ui-alpha-greyscale-61', value: 'rgba(0, 0, 0, .16)', textColor: 'dark' },
    { name: 'Greyscale 85', token: '$fusion-ui-alpha-greyscale-61', value: 'rgba(0, 0, 0, .15)', textColor: 'dark' },
    { name: 'Greyscale 96', token: '$fusion-ui-alpha-greyscale-61', value: 'rgba(0, 0, 0, .04)', textColor: 'dark' },
  ];

  chart = [
    { name: 'Chart 1',  token: '$fusion-ui-color-chart-1',  value: '#61DCE8', textColor: 'dark' },
    { name: 'Chart 2',  token: '$fusion-ui-color-chart-2',  value: '#01ADBD', textColor: 'dark' },
    { name: 'Chart 3',  token: '$fusion-ui-color-chart-3',  value: '#1E4A93', textColor: 'light' },
    { name: 'Chart 4',  token: '$fusion-ui-color-chart-4',  value: '#0072D9', textColor: 'light' },
    { name: 'Chart 5',  token: '$fusion-ui-color-chart-5',  value: '#88C5FF', textColor: 'dark' },
    { name: 'Chart 6',  token: '$fusion-ui-color-chart-6',  value: '#B1B3BE', textColor: 'dark' },
    { name: 'Chart 7',  token: '$fusion-ui-color-chart-7',  value: '#FFAC00', textColor: 'dark' },
    { name: 'Chart 8',  token: '$fusion-ui-color-chart-8',  value: '#C66900', textColor: 'dark' },
    { name: 'Chart 9',  token: '$fusion-ui-color-chart-9',  value: '#D71ECD', textColor: 'dark' },
    { name: 'Chart 10', token: '$fusion-ui-color-chart-10', value: '#9F82F1', textColor: 'dark' },
  ];

  colors = {
    blues: this.blues,
    error: this.error,
    warning: this.warning,
    success: this.success,
    opaqueGreyscale: this.opaqueGreyscale,
    alphaGreyscale: this.alphaGreyscale,
    chart: this.chart,
  };

  spacing = [
    { token: '$fusion-ui-spacing-xxs',  value: '4px' },
    { token: '$fusion-ui-spacing-xs',   value: '8px' },
    { token: '$fusion-ui-spacing-sm',   value: '12px' },
    { token: '$fusion-ui-spacing-md',   value: '16px' },
    { token: '$fusion-ui-spacing-lg',   value: '24px' },
    { token: '$fusion-ui-spacing-xl',   value: '32px' },
    { token: '$fusion-ui-spacing-xxl',  value: '48px' },
    { token: '$fusion-ui-spacing-xxxl', value: '64px' },
  ];
}
