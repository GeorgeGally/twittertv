;
(function(defaults, $, window, document, undefined) {

    "use strict";

    $.extend({
        // function to configure global default options
        // jQuery.scalTextSetup(defaultOptions);
        scaleTextSetup: function(options) {
            return $.extend(defaults, options);
        }
    }).fn.extend({
        // jQuery(selector).scaleText(options);
        scaleText: function(options) {
            //Puts the defaults and the sent options together as one
            options = $.extend({}, defaults, options);

            //Stuff we will use again
            var cssProperties = ["display", "overflow", "margin", "border-radius", "padding", "border", "height", "width", "position", "top", "bottom", "left", "right", "font-size", "float"];
            var scaleTextContainer = $("#scaleTextContainer");

            //We leave it in the DOM so we don't keep inserting a new one everytime we are called. Much faster for multiple calls.
            if (!scaleTextContainer.length) {
                scaleTextContainer = $("<div id=\"scaleTextContainer\"></div>").css({
                    "position": "absolute",
                    "top": "0px",
                    "left": "-1000px",
                    "height": "0px",
                    "width": "0px",
                    "visibility": "hidden",
                    "overflow": "hidden"
                }).appendTo("body"); //Somewhere to hold our item while we work on it    
            }

            var startScaling = function(scaleText) {

                //Before we manipulate at all, grab the style to put back afterwards
                scaleText.styleTag = scaleText.el.attr("style");

                /*capture as much CSS as might be needed for creating a placeholder*/
                scaleText.visibleCss = scaleText.el.show().css(cssProperties);

                //This isn"t going to work on inline elements. I've not tested with tables etc.
                if (!(scaleText.visibleCss.display === "block" || scaleText.visibleCss.display === "inline-block")) {
                    return true;
                }

                //Measure it before we reset, for animations
                scaleText.measuredOriginalFontSize = parseFloat(scaleText.el.css("font-size"));
                //reset the container
                scaleText.el.css("font-size", "100%").removeClass(scaleText.settings.scaledClass).find(".scaleTextSpacer").remove(); //return to normal before measuring
               
                //Get the measured font size of the container
                //Get current physical size of container
                scaleText.measuredFontSize = parseFloat(scaleText.el.css("font-size"));
                scaleText.measuredWidth = parseFloat(scaleText.el.width());
                scaleText.measuredHeight = parseFloat(scaleText.el.height());

                //Find all child elements with fixed font sizes and make them responsive
                //That way we only have to adjust one font size to scale the whole lot
                //It does this hidden so it doesn't end up adjusting everything
                if (scaleText.settings.makeRelative) {
                    var elementFontSize, element;
                    scaleText.el.hide().find("*").each(function() {
                        element = $(this);
                        elementFontSize = element.css("font-size");
                        if (elementFontSize.indexOf("px") > -1) {
                            if ((parseInt(elementFontSize) / scaleText.measuredFontSize) !== 1) element.css("font-size", ((parseInt(elementFontSize) / scaleText.measuredFontSize) * 100) + "%");
                        }
                    });
                    //reshow it
                    scaleText.el.show();
                }

                //Now we create a placeholder using it's measured size
                var placeHolder = $("<div></div>").css($.extend({}, scaleText.visibleCss, {
                    "height": scaleText.measuredHeight + "px",
                    "width": scaleText.measuredWidth + "px",
                    "visibility": "hidden"
                }));

                //Replace our item with a placeholder to stop it messing layout and then take off screen
                //Remove anything that affects the box model maths
                //Give it a fixed width and height
                scaleText.el.replaceWith(placeHolder).css({
                    "width": scaleText.measuredWidth + "px",
                    "height": scaleText.measuredHeight + "px",
                    "padding": "0px",
                    "border": "none",
                    "overflow": "hidden"
                }).appendTo(scaleTextContainer);

                //scale it to size!
                var finalFontSize = scaleLoop(scaleText);

                //calculate any spacing needed to center it
                scaleText.el.css("height", "auto"); //set the height to auto in order to measure it

                var heightDiff = scaleText.measuredHeight - scaleText.element.scrollHeight,
                    spacerHeight = Math.floor(heightDiff / 2) + "px",
                    spacer;

                if (scaleText.settings.verticalMiddle && heightDiff > 0) {
                    spacer = $("<div class=\"scaleTextSpacer\"></div>");
                    spacer.css("height", spacerHeight);
                    if (spacerHeight) scaleText.el.prepend(spacer);
                }

                //put css back to how it was and then swap back with placeholder
                placeHolder.replaceWith(scaleText.el.attr("style", scaleText.styleTag || "").css("font-size", finalFontSize.percent + "%")).remove(); //get rid of placeholder

                if (scaleText.settings.animate) {
                    //animate the font size
                    //Don't animate if there is less than 1px difference as it looks odd
                    //Also measuring doesn't give us sub-pixel dimensions so there is a high chance there is no change
                    if (Math.abs(scaleText.measuredOriginalFontSize - finalFontSize.pixels) >= 0.5) {
                        scaleText.el.css("font-size", scaleText.measuredOriginalFontSize + "px").animate({
                            "font-size": finalFontSize.percent + "%"
                        }, scaleText.settings.animateOptions);
                    }
                    //Animate our spacer too
                    if (scaleText.settings.animateSpacer && spacer) {
                        spacer.css("height", "0px").animate({
                            height: spacerHeight
                        }, scaleText.settings.animateOptions);
                    }
                }

                //Set a class so we know it's scaled
                scaleText.el.addClass(scaleText.settings.scaledClass);

                //For debugging purposes
                if (options.debug) console.log("Took: " + (new Date().getTime() - scaleText.startTime) + "ms", "Loops: ", scaleText.loopCount, "Original Font Size:", scaleText.measuredFontSize, "Final Font Size", finalFontSize);
            };

            var scaleLoop = function(scaleText) {
                //Go up in a large step, with the steps refining as we go
                var chunkSize = Math.ceil(scaleText.measuredHeight), //start at the size of the element and work our way down
                    maxSize = chunkSize,
                    fontSize, finalFontSize = {},
                    chunkLimit = (1.1 - (Math.min(100, scaleText.settings.accuracy) / 100));

                for (fontSize = 0; fontSize <= maxSize; fontSize += chunkSize) {
                    scaleText.loopCount++;
                    scaleText.el.css("font-size", ((fontSize / scaleText.measuredFontSize) * 100) + "%");

                    if (scaleText.element.scrollHeight > scaleText.measuredHeight || scaleText.element.scrollWidth > scaleText.measuredWidth) {
                        fontSize -= chunkSize; //back a step
                        chunkSize = chunkSize / 2; //increase by less
                    }

                    if (chunkSize < chunkLimit || fontSize === maxSize) {
                        finalFontSize = {"pixels" : fontSize, "percent" : ((fontSize / scaleText.measuredFontSize) * 100) };
                        break;
                    }
                }

                //Set our final value
                scaleText.el.css("font-size", finalFontSize.percent + "%");
                return finalFontSize;
            };

            return $(this).each(function() {

                var scaleText = {
                    element: this,
                    el: $(this),
                    settings: options,
                    loopCount: 0
                };

                if (options.debug) scaleText.startTime = new Date().getTime();

                //Do the dirty work
                startScaling(scaleText);
            });
        }
    });
})({
    debug: false,
    accuracy: 100,
    makeRelative: true,
    verticalMiddle: true,
    animate: false,
    animateSpacer: true,
    animateOptions: {},
    scaledClass: "scaledText"
}, jQuery, window, document);