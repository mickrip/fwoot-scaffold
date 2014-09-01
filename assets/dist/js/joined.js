(function() {
  ({
    getOne: function() {
      return "One";
    }
  });

  (function($, window, document, undefined_) {
    var Plugin, defaults, pluginName;
    Plugin = function(element, options) {
      this.element = element;
      this.settings = $.extend({}, defaults, options);
      this.init();
    };
    pluginName = "parsleyhelper";
    defaults = {
      clientValidation: true,
      submitURL: false,
      onComplete: function($formelem) {
        throw new Error("onComplete callback missing");
      },
      onInit: function($formelem) {},
      message: "Please Wait",
      errorContainer: false
    };
    Plugin.prototype = {
      init: function() {
        var $elem, settings, that;
        settings = this.settings;
        $elem = $(this.element);
        that = this;
        settings.onInit($elem);
        $elem.parsley({
          listeners: {
            onFormSubmit: function(isFormValid) {
              if (!isFormValid && settings.clientValidation) {
                return false;
              }
              $.blockUI({
                css: {
                  border: "none",
                  padding: "15px",
                  backgroundColor: "#FFF",
                  color: "#000",
                  "-webkit-border-radius": "10px",
                  "-moz-border-radius": "10px",
                  opacity: .9
                },
                message: settings.message
              });
              $.post(settings.submitURL, $elem.serialize()).success(function(data) {
                var ret;
                $.unblockUI();
                if (data.success) {
                  settings.onComplete($elem);
                } else {
                  if (settings.errorContainer) {
                    ret = "";
                    $.each(data.errors, function(index) {
                      ret = ret + data.errors[index] + "<br/>";
                    });
                    $(settings.errorContainer).html(ret).fadeIn();
                    $.unblockUI();
                  } else {
                    $.unblockUI();
                    alert(that.json2string(data.errors));
                  }
                }
              }).error(function() {
                $.unblockUI();
                alert("There was a technical problem, please try again.");
              });
              return false;
            }
          }
        });
      },
      json2string: function(j) {
        var ret;
        ret = "";
        $.each(j, function(index) {
          ret = ret + j[index] + "\n";
        });
        return ret;
      }
    };
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);

  ({
    getTwo: function() {
      return "Two";
    }
  });

}).call(this);
