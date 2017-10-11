import * as React from 'react';
import styles from './ReactColorDemo.module.scss';
import { IReactColorDemoProps } from './IReactColorDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';

// correct - static linking.
import { Button } from 'office-ui-fabric-react/lib/Button';

//import
import {
  ColorClassNames
} from '@uifabric/styling';

export default class ReactColorDemo extends React.Component<IReactColorDemoProps, {}> {
  public render(): React.ReactElement<IReactColorDemoProps> {

    return (
      <div className={`${styles.reactColorDemo}`}>

        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
    
    /*
    return (
      <div className={`${styles.reactColorDemo}`}>

        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row} ${ColorClassNames.themePrimaryBackground}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>

              <Button>click me</Button>
            </div>
          </div>
        </div>
      </div>
    );
    */

  }
}
