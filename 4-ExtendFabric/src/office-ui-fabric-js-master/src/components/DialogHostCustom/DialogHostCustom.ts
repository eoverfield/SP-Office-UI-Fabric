// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

/// <reference path="../Overlay/Overlay.ts"/>

namespace fabric {
  /**
   * Dialog Host Custom
   *
   * A host for the panel control
   *
   */

  const DIALOG_HOST_CLASS = "ms-DialogHost-Custom";

  //the host config
  export interface DialogHostCustomConfiguration {
    _layer?: Node;
    callBack?: Function;
    overlayClass?: string;
    scoped?: string;

    [propName: string]: any;
  }

  export class DialogHostCustom {

    private _configuration: DialogHostCustomConfiguration;

    public _dialogHost: Element;
    private callBack: Function;

    public _overlay: Overlay;
    private _overlayContainer: HTMLElement;

    /**
     *
     * @param {HTMLElement} container - the target container for an instance of Panel
     * @constructor
     */
    constructor(options: DialogHostCustomConfiguration) {
      this._configuration = {};
      this.setConfiguration(options);

      //set up the panel host and panel
      this._createElements();

      //and now render them on the page
      this._renderElements();
    }

    private _createElements() {
      this._dialogHost = document.createElement("div");
      this._dialogHost.classList.add(DIALOG_HOST_CLASS);

      //if there is a scope class provided, then set on host
      if (this._configuration.scoped) {
        this._dialogHost.classList.add(this._configuration.scoped);
      }

      //add the provided layer to the host
      this._dialogHost.appendChild(this._configuration._layer);
      
      
      this._overlayContainer = document.createElement("div");
      if (this._configuration.overlayClass) {
        this._overlayContainer.setAttribute("class", "ms-Overlay " + this._configuration.overlayClass);

        this._overlay = new fabric.Overlay(this._overlayContainer);
      }
      else {
        this._overlay = new fabric.Overlay(this._overlayContainer);
      }

      // Append Elements
      this._dialogHost.appendChild(this._overlay.overlayElement);
    }

    private _renderElements() {
      //add the host panel to document
      document.body.appendChild(this._dialogHost);

      //now show the overlay
      this._overlay.show();
      
      //if there is a callback, such as one for animation, trigger now - this will cause the panel to show
      if (this._configuration.callBack) {
        this._configuration.callBack(this._configuration._layer);
      }
    }

    public update(layer: Node, callBack?: Function) {
      this._dialogHost.replaceChild(layer, layer);

      if (callBack) {
        callBack();
      }
    }

    public dismiss() {
      //hide the overlay
      this._overlay.hide();

      //remove the panel
      document.body.removeChild(this._dialogHost);
    }

    public setConfiguration(options: DialogHostCustomConfiguration): void {
      if (options) {
        if (options.overlayClass) {
          this._configuration.overlayClass = options.overlayClass;
        }
        if (options.scoped) {
          this._configuration.scoped = options.scoped;
        }

        if (options._layer) {
          this._configuration._layer = options._layer;
        }
        if (options.callBack) {
          this._configuration.callBack = options.callBack;
        }
      }
    }
  }
}
