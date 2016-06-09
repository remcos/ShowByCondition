/*global logger*/
/*
    Default
    ========================

    @file      : Default.js
    @version   : 1
    @author    : Remco
    @date      : Fri, 22 Jan 2016 12:45:23 GMT
    @copyright :
    @license   :

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
	"dojo/NodeList-traverse",
    "mxui/widget/_WidgetBase",
	"mxui/dom",
], function(declare, NodeList, _WidgetBase, dom) {
    "use strict";

    // Declare widget's prototype.
    return declare("ShowByCondition.widget.ShowByCondition", [ _WidgetBase ], {

        // Parameters configured in the Modeler.
		microflowName: "",
    returnValue: "",

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            // Uncomment the following line to enable debug messages
            logger.level(logger.DEBUG);
            logger.debug(this.id + ".constructor");
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function() {
            logger.debug(this.id + ".postCreate");
        },

		setParentDisplay : function(display) {
			console.log(display);
			if (display == this.returnValue){
				this.domNode.parentElement.style.display = "block";
			}
		},

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
			logger.debug(this.id + ".update");
			this.domNode.parentElement.style.display = "none";
			this.contextGUID = obj.getGuid();

			if (this.contextGUID) {
				if (this.microflowName != '') {
					mx.data.action({
						params: {
							applyto: "selection",
							actionname: this.microflowName,
							guids: [this.contextGUID]
						},
						callback: dojo.hitch(this, function (result) {
							this.setParentDisplay(result);
						}),
						error: function(error) {
							alert(error.description);
						}
					}, this);
				}
			}
            callback();
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function() {
          logger.debug(this.id + ".uninitialize");
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },
    });
});

require(["ShowByCondition/widget/ShowByCondition"], function() {
    "use strict";
});
