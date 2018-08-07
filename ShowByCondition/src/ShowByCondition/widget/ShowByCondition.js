/*global logger*/
/*
    Default
    ========================

    @file      : ShowByCondition.js
    @version   : 1.3.1
    @author    : Remco Snijders
    @date      : 8-6-2018
    @copyright : First Consulting
    @license   : Apache V2

    Documentation
    ========================
    Describe your widget here.
	v1.3.1	Ivo Sturm - fixed issue with logger.debug causing 'Could not create widget..' issues in Mendix 7.14.1 and up.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
	"dojo/NodeList-traverse",
    "mxui/widget/_WidgetBase",
	"mxui/dom",
	"dojo/_base/lang",
], function(declare, NodeList, _WidgetBase, dom, lang) {
    "use strict";

    // Declare widget's prototype.
    return declare("ShowByCondition.widget.ShowByCondition", [ _WidgetBase ], {

        // Parameters configured in the Modeler.
		microflowName: "",
		nanoflowName: "",
		returnValue: "",
		elementClassFalse: "",
		elementClassTrue: "",
		
		// Internal variables
		elementsToHide: [],

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            // Uncomment the following line to enable debug messages
            //logger.level(logger.DEBUG);
            //logger.debug(this.id + ".constructor");
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function() {
           // logger.debug(this.id + ".postCreate");
			
			if (this.elementClassFalse === "" && this.elementClassTrue === "") {
				this.domNode.parentElement.style.display = "none";
			}
        },

		setParentDisplay : function(display) {
			
			if (this.elementClassFalse === "" && this.elementClassTrue === "") {
				this.domNode.parentElement.style.display = "none";
				if (display == this.returnValue){
					this.domNode.parentElement.style.display = "block";
				}
			} else {
				var elementsToShow = this.domNode.parentElement.getElementsByClassName("hiddenByWidget");
				for(var i=0;i<elementsToShow.length; i++) {
					elementsToShow[i].classList.remove("hiddenByWidget");
				}
				
				if(display) {
					this.elementsToHide = this.domNode.parentElement.getElementsByClassName(this.elementClassTrue);
				} else {
					this.elementsToHide = this.domNode.parentElement.getElementsByClassName(this.elementClassFalse);
				}
				
				for(var i=0;i<this.elementsToHide.length; i++) {
					this.elementsToHide[i].className += " hiddenByWidget";
				}
			}
		},

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
			//logger.debug(this.id + ".update");
			this._contextObj = obj;
			this._resetSubscriptions();
			this._updateRendering();
            callback();
        },
		
		// Rerender the interface.
        _updateRendering: function () {
			if(this._contextObj) {
				if (this.microflowName != '') {
					mx.data.action({
						params: {
							applyto: "selection",
							actionname: this.microflowName,
							guids: [this._contextObj.getGuid()]
						},
						callback: dojo.hitch(this, function (result) {
							this.setParentDisplay(result);
						}),
						error: function(error) {
							console.error(error.description);
						}
					}, this);
				}
				else if (this.nanoflowName != '') {
					mx.data.callNanoflow({
						nanoflow: this.nanoflowName,
						origin: this.mxform,
    					context: this.mxcontext,
						callback: dojo.hitch(this, function (result) {
							this.setParentDisplay(result);
						}),
						error: function(error) {
							console.error(error.description);
						}
					}, this);
				}
				else {
					console.error("Neither a nanoflow or a microflow was specified for show by condition widget.");
				}
			}
			
        },
        // Reset subscriptions.
        _resetSubscriptions: function () {
            var _objectHandle = null;
            // Release handles on previous object, if any.
            if (this._handles) {
                this._handles.forEach(lang.hitch(this, function (handle, i) {
	                this.unsubscribe(handle);
                }));
                this._handles = [];
            }
            // When a mendix object exists create subscribtions. 
            if (this._contextObj) {
                _objectHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function (guid) {
                        this._updateRendering();
                    })
                });
                this._handles = [_objectHandle];
            }
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function() {
          //logger.debug(this.id + ".uninitialize");
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },
    });
});

require(["ShowByCondition/widget/ShowByCondition"], function() {
    "use strict";
});
