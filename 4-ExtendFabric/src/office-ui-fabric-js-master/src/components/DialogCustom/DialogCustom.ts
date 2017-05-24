// Fluid Dialog allowing for setting of certain paramaters to center and also set certain position and size parameters

/// <reference path="../Overlay/Overlay.ts"/>

namespace fabric {

  export interface DialogCustomConfiguration {
    _dialog: HTMLElement;

    top?: string;
    bottom?: string;
    scoped?: string;
    overlayClass?: string;

    onResizeCallback?: Function;
    onCloseCallback?: Function;
    onInitCompleteCallback?: Function;

    [propName: string]: any;
  }

  export class DialogCustom {

    private _configuration: DialogCustomConfiguration;
    private dialogHostConfig: DialogHostCustomConfiguration;
    public dialogHost: DialogHostCustom;

    private _dialog: HTMLElement;
    private _overlay: Overlay;
    private _closeButtonElement: HTMLButtonElement;
    private _actionButtonElements: NodeListOf<Element>;

    private _clickHandler: EventListener;

    constructor(options: DialogCustomConfiguration) {
      this._configuration = {_dialog: null};
      this.setConfiguration(options);

      this._dialog = this._configuration._dialog;

      //create the panel host
      this.dialogHostConfig = {};
      this.dialogHostConfig._layer = this._dialog;
      this.dialogHostConfig.scoped = this._configuration.scoped;
      this.dialogHostConfig.overlayClass = this._configuration.overlayClass;
      this.dialogHostConfig.callBack = this.animateInPanel;
      this.dialogHost = new fabric.DialogHostCustom(this.dialogHostConfig);

      //this._dialog = dialog;
      this._closeButtonElement = <HTMLButtonElement>this._dialog.querySelector(".ms-Dialog-buttonClose");
      this._actionButtonElements = this._dialog.querySelectorAll(".ms-Dialog-action");
      if (this._closeButtonElement) {
        this._closeButtonElement.addEventListener("click", this.close.bind(this), false);
      }
      for (let i: number = 0; i < this._actionButtonElements.length; i++) {
        this._actionButtonElements[i].addEventListener("click", this.close.bind(this), false);
      }

      this._clickHandler = this.close.bind(this, null);
      this._setEvents();

      
    }

    public close(): void {
      window.removeEventListener("resize", this.center.bind(this), false);

  //    this._overlay.remove();
  //    this._dialog.classList.remove("is-open");
   //   document.body.classList.remove("ms-u-overflowHidden");
   //   this._overlay.overlayElement.removeEventListener("click", this.close.bind(this));

      //this._panel.classList.add(ANIMATE_OUT_STATE);
      //setTimeout(() => {
      //  this._panel.classList.remove(ANIMATE_OUT_STATE);
        this._dialog.classList.remove("is-open");
        
        this.dialogHost.dismiss();

        //if (callBack) {
        //  callBack();
        //}
        
        // Remove temporary body styles
        //document.body.setAttribute("style", "");

      //  if (this._configuration.onCloseCallback) {
      //    this._configuration.onCloseCallback();
      //  }
        
     // }, ANIMATION_END);

      //if (this._closeButton !== null) {
      //  this._closeButton.removeEventListener("click", this._clickHandler);
     // }


      if (this._configuration.onCloseCallback) {
        this._configuration.onCloseCallback();
      }
    }


    public open(): void {
      this._dialog.classList.add("is-open");

      this.center();

      window.addEventListener("resize", this.center.bind(this), false);
/*
      if (this._configuration.overlayClass) {
        let overlayContainer = document.createElement("div");
        overlayContainer.setAttribute("class", "ms-Overlay " + this._configuration.overlayClass);

        this._overlay = new fabric.Overlay(overlayContainer);
      }
      else {
        this._overlay = new fabric.Overlay();
      }

      
      if (!this._dialog.classList.contains("ms-Dialog--blocking")) {
        this._overlay.overlayElement.addEventListener("click", this.close.bind(this), false);
        this._overlay.show();
        document.body.classList.add("ms-u-overflowHidden");
      }
      this._dialog.parentElement.appendChild(this._overlay.overlayElement);
      this.center();

      window.addEventListener("resize", this.center.bind(this), false);
*/
    }

    private animateInPanel(layer: Element) {
      //only animate if requested
//      if (this._animateOverlay) {
//        layer.classList.add(ANIMATE_IN_STATE);
//      }
      
      layer.classList.add("is-open");

      //we want to remove the animate class if it was added
//      if (this._animateOverlay) {
//        setTimeout(() => {
//          layer.classList.remove(ANIMATE_IN_STATE);
//        }, ANIMATION_END);
//      }
    }

    public center(): void {
      let clientWidth: number = document.documentElement.clientWidth;
      let clientHeight: number = document.documentElement.clientHeight;
      let dialogWidth: number = this._dialog.offsetWidth;
      let dialogHeight: number = this._dialog.offsetHeight;

      let offsetTop: number;
      
      console.log("client: " + clientWidth);
      console.log("dialog: " + dialogWidth);
      console.log("left: " + String((clientWidth - dialogWidth) / 2) + "px");

      this._dialog.style.minWidth  = "80%";
      this._dialog.style.maxWidth  = String(clientWidth) + "px";

      //reverify dialog width:
      dialogWidth = this._dialog.offsetWidth;

      if (clientWidth > dialogWidth) {
        this._dialog.style.left = String((clientWidth - dialogWidth) / 2) + "px";
        
        //this._dialog.style.minWidth  = String(clientWidth - 100) + "px";
      }
      else {
        this._dialog.style.left = "0px";
      //  this._dialog.style.maxWidth  = String(clientWidth) + "px";
      }

      if (this._configuration.top) {
        this._dialog.style.top = this._configuration.top + "px";
        this._dialog.style.height = "auto";

        if (clientHeight < dialogHeight) {
          this._dialog.style.height = String(clientHeight) + "px";

          offsetTop = this._dialog.offsetTop;
          
          this._dialog.style.height = String(clientHeight - offsetTop) + "px";
        }
      }
      else {
        //top isn't specified so just ensure it all fits

        if (clientHeight > dialogHeight) {
          this._dialog.style.top = String((clientHeight - dialogHeight) / 2) + "px";
          this._dialog.style.height = "auto";
        }
        else {
          this._dialog.style.top = "0px";
          this._dialog.style.height = String(clientHeight) + "px";  
        }
      }

      //if a bottom is provided, ensure there is at least "bottom" number of pixels from bottom
      if (this._configuration.bottom) {

        //reset height of dialog
        dialogHeight = this._dialog.offsetHeight;
        offsetTop = this._dialog.offsetTop;

        //if the dialog is too tall, then correct height
        if ((dialogHeight + offsetTop + Number(this._configuration.bottom)) > clientHeight) {
          this._dialog.style.height = String(clientHeight - (offsetTop + Number(this._configuration.bottom))) + "px";
        }

      }

      //if we want to get a number without "px"
      //Number(elem.style.width.replace(/[^\d\.\-]/g, ''));

      if (this._configuration.onResizeCallback) {
        this._configuration.onResizeCallback();
      }
      
    }

    private _setEvents() {
      this.dialogHost._overlay.overlayElement.addEventListener("click", this._clickHandler);
//      if (this._closeButton !== null) {
  //      this._closeButton.addEventListener("click", this._clickHandler);
    //  }
    }

    public setConfiguration(options: DialogCustomConfiguration): void {
      if (options) {
        if (options._dialog) {
          this._configuration._dialog = options._dialog;
        }

        if (options.top) {
          this._configuration.top = options.top;
        }
        if (options.bottom) {
          this._configuration.bottom = options.bottom;
        }
        if (options.scoped) {
          this._configuration.scoped = options.scoped;
        }
        if (options.overlayClass) {
          this._configuration.overlayClass = options.overlayClass;
        }

        if (options.onResizeCallback) {
          this._configuration.onResizeCallback = options.onResizeCallback;
        }
        if (options.onCloseCallback) {
          this._configuration.onCloseCallback = options.onCloseCallback;
        }
        if (options.onInitCompleteCallback) {
          this._configuration.onInitCompleteCallback = options.onInitCompleteCallback;
        }
      }
    }
  }
}
