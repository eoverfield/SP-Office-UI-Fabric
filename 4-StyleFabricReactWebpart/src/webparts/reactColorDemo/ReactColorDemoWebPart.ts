import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactColorDemoWebPartStrings';
import ReactColorDemo from './components/ReactColorDemo';
import { IReactColorDemoProps } from './components/IReactColorDemoProps';

export interface IReactColorDemoWebPartProps {
  description: string;
}

/*
import {
  loadTheme
} from '@uifabric/styling';
*/


export default class ReactColorDemoWebPart extends BaseClientSideWebPart<IReactColorDemoWebPartProps> {

  public render(): void {

    //based on primary: 00a6cb
    //secondary: f4971f
    
    /*
    loadTheme({palette: {
      "themePrimary": "#00a6cb",
      "themeLighterAlt": "#f0fcff",
      "themeLighter": "#e0f9ff",
      "themeLight": "#c2f4ff",
      "themeTertiary": "#7ee7ff",
      "themeSecondary": "#00c0eb",
      "themeDarkAlt": "#0096b8",
      "themeDark": "#00758f",
      "themeDarker": "#005c70",
      "neutralLighterAlt": "#f49519",
      "neutralLighter": "#f49314",
      "neutralLight": "#f38e0b",
      "neutralQuaternaryAlt": "#e2850a",
      "neutralQuaternary": "#d87f0a",
      "neutralTertiaryAlt": "#cf7a09",
      "neutralTertiary": "#b4b4b4",
      "neutralSecondary": "#838383",
      "neutralPrimaryAlt": "#6a6a6a",
      "neutralPrimary": "#202020",
      "neutralDark": "#525252",
      "black": "#3a3a3a",
      "white": "#f4971f"
    }});
    */
    

    const element: React.ReactElement<IReactColorDemoProps > = React.createElement(
      ReactColorDemo,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
