// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($, window, document, undefined) {
    var pluginName = "parsleyhelper",
        defaults = {
            clientValidation: true,
            submitURL: false,
            onComplete: function ($formelem) {
                throw new Error("onComplete callback missing");
            },
            onInit: function ($formelem) {
            },
            message: "Please Wait",
            errorContainer: false

        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var settings = this.settings;
            var $elem = $(this.element);
            var that = this;
            settings.onInit($elem);
            $elem.parsley({
                listeners: {
                    onFormSubmit: function (isFormValid) {
                        if (!isFormValid && settings.clientValidation) return false;
                        $.blockUI({ css: {
                            border: 'none',
                            padding: '15px',
                            backgroundColor: '#FFF',
                            color: '#000',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            opacity: .9
                        },
                            message: settings.message});
                        $.post(settings.submitURL, $elem.serialize())
                            .success(function (data) {
                                $.unblockUI();
                                if (data.success) {
                                    settings.onComplete($elem);
                                } else {
                                    if (settings.errorContainer) {
                                        var ret = "";
                                        $.each(data.errors, function (index) {
                                            ret = ret + data.errors[index] + "<br/>";
                                        });
                                        $(settings.errorContainer).html(ret).fadeIn();
                                        $.unblockUI();
                                    } else {
                                        $.unblockUI();
                                        alert(that.json2string(data.errors));
                                    }
                                }
                            })
                            .error(function () {
                                //server side fail
                                $.unblockUI();
                                alert("There was a technical problem, please try again.")
                            });
                        return false; // always fail
                    }
                }
            });
        },
        json2string: function (j) {
            var ret = "";
            $.each(j, function (index) {
                ret = ret + j[index] + "\n";
            });
            return ret;
        }
    };
    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);