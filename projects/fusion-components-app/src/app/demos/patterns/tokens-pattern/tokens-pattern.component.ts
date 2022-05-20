import { Component } from '@angular/core';

@Component({
  selector: 'fusion-demo-tokens',
  templateUrl: './tokens-pattern.component.html',
  styleUrls: ['./tokens-pattern.component.scss']
})
export class TokensPatternComponent {
  blues = [
    { name: 'NetApp',       token: '$f-color-blue-netapp',       value: '#0067C5', textColor: 'light' },
    { name: 'Lightest',     token: '$f-color-blue-lightest',     value: '#EFF4FF', textColor: 'dark' },
    { name: 'Light',        token: '$f-color-blue-light',        value: '#A5BFED', textColor: 'dark' },
    { name: 'Medium Light', token: '$f-color-blue-medium-light', value: '#6C9CEF', textColor: 'light' },
    { name: 'Medium',       token: '$f-color-blue-medium',       value: '#2D6DDE', textColor: 'light' },
    { name: 'Medium Dark',  token: '$f-color-blue-medium-dark',  value: '#1E4A93', textColor: 'light' },
    { name: 'Dark',         token: '$f-color-blue-dark',         value: '#0A2D6C', textColor: 'light' },
    { name: 'Darkest',      token: '$f-color-blue-darkest',      value: '#08214B', textColor: 'light' },
  ];

  error = [
    { name: 'Error Primary',    token: '$f-color-error-primary',    value: '#DA1E21', textColor: 'light' },
    { name: 'Error Chart',      token: '$f-color-error-chart',      value: '#FF4548', textColor: 'light' },
    { name: 'Error Background', token: '$f-color-error-background', value: '#FCCDCE', textColor: 'dark' },
  ];

  warning = [
    { name: 'Warning Primary',    token: '$f-color-warning-primary',    value: '#F88402', textColor: 'light' },
    { name: 'Warning Chart',      token: '$f-color-warning-chart',      value: '#FFAC00', textColor: 'light' },
    { name: 'Warning Background', token: '$f-color-warning-background', value: '#FFE1A1', textColor: 'dark' },
  ];

  success = [
    { name: 'Success Primary',    token: '$f-color-success-primary',    value: '#498128', textColor: 'light' },
    { name: 'Success Chart',      token: '$f-color-success-chart',      value: '#90C44B', textColor: 'dark' },
    { name: 'Success Background', token: '$f-color-success-background', value: '#B4E697', textColor: 'dark' },
  ];

  opaqueGreyscale = [
    { name: 'Black',        token: '$f-color-black',  value: '#000000', textColor: 'light' },
    { name: 'Greyscale 7',  token: '$f-greyscale-7',  value: '#131313', textColor: 'light' },
    { name: 'Greyscale 15', token: '$f-greyscale-15', value: '#252525', textColor: 'light' },
    { name: 'Greyscale 27', token: '$f-greyscale-27', value: '#454545', textColor: 'light' },
    { name: 'Greyscale 34', token: '$f-greyscale-34', value: '#565656', textColor: 'light' },
    { name: 'Greyscale 53', token: '$f-greyscale-53', value: '#888888', textColor: 'dark' },
    { name: 'Greyscale 61', token: '$f-greyscale-61', value: '#9c9c9c', textColor: 'dark' },
    { name: 'Greyscale 76', token: '$f-greyscale-61', value: '#C2C2C2', textColor: 'dark' },
    { name: 'Greyscale 84', token: '$f-greyscale-61', value: '#D7D7D7', textColor: 'dark' },
    { name: 'Greyscale 85', token: '$f-greyscale-61', value: '#F2F2F2', textColor: 'dark' },
    { name: 'Greyscale 96', token: '$f-greyscale-61', value: '#F6F6F6', textColor: 'dark' },
    { name: 'White',        token: '$f-color-white',  value: '#FFFFFF', textColor: 'dark' },
  ];

  alphaGreyscale = [
    { name: 'Greyscale 7',  token: '$f-alpha-greyscale-7',  value: 'rgba(0, 0, 0, .93)', textColor: 'light' },
    { name: 'Greyscale 15', token: '$f-alpha-greyscale-15', value: 'rgba(0, 0, 0, .85)', textColor: 'light' },
    { name: 'Greyscale 27', token: '$f-alpha-greyscale-27', value: 'rgba(0, 0, 0, .73)', textColor: 'light' },
    { name: 'Greyscale 34', token: '$f-alpha-greyscale-34', value: 'rgba(0, 0, 0, .66)', textColor: 'light' },
    { name: 'Greyscale 53', token: '$f-alpha-greyscale-53', value: 'rgba(0, 0, 0, .47)', textColor: 'dark' },
    { name: 'Greyscale 61', token: '$f-alpha-greyscale-61', value: 'rgba(0, 0, 0, .39)', textColor: 'dark' },
    { name: 'Greyscale 76', token: '$f-alpha-greyscale-61', value: 'rgba(0, 0, 0, .24)', textColor: 'dark' },
    { name: 'Greyscale 84', token: '$f-alpha-greyscale-61', value: 'rgba(0, 0, 0, .16)', textColor: 'dark' },
    { name: 'Greyscale 85', token: '$f-alpha-greyscale-61', value: 'rgba(0, 0, 0, .15)', textColor: 'dark' },
    { name: 'Greyscale 96', token: '$f-alpha-greyscale-61', value: 'rgba(0, 0, 0, .04)', textColor: 'dark' },
  ];

  chart = [
    { name: 'Chart 1',  token: '$f-color-chart-1',  value: '#61DCE8', textColor: 'dark' },
    { name: 'Chart 2',  token: '$f-color-chart-2',  value: '#01ADBD', textColor: 'dark' },
    { name: 'Chart 3',  token: '$f-color-chart-3',  value: '#1E4A93', textColor: 'light' },
    { name: 'Chart 4',  token: '$f-color-chart-4',  value: '#0072D9', textColor: 'light' },
    { name: 'Chart 5',  token: '$f-color-chart-5',  value: '#88C5FF', textColor: 'dark' },
    { name: 'Chart 6',  token: '$f-color-chart-6',  value: '#B1B3BE', textColor: 'dark' },
    { name: 'Chart 7',  token: '$f-color-chart-7',  value: '#FFAC00', textColor: 'dark' },
    { name: 'Chart 8',  token: '$f-color-chart-8',  value: '#C66900', textColor: 'dark' },
    { name: 'Chart 9',  token: '$f-color-chart-9',  value: '#D71ECD', textColor: 'dark' },
    { name: 'Chart 10', token: '$f-color-chart-10', value: '#9F82F1', textColor: 'dark' },
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
    { token: '$f-spacing-xxs',  value: '4px' },
    { token: '$f-spacing-xs',   value: '8px' },
    { token: '$f-spacing-sm',   value: '12px' },
    { token: '$f-spacing-md',   value: '16px' },
    { token: '$f-spacing-lg',   value: '24px' },
    { token: '$f-spacing-xl',   value: '32px' },
    { token: '$f-spacing-xxl',  value: '48px' },
    { token: '$f-spacing-xxxl', value: '64px' },
  ];
}
