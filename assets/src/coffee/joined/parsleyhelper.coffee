(($, window, document, undefined_) ->

  # The actual plugin constructor
  Plugin = (element, options) ->
    @element = element
    @settings = $.extend({}, defaults, options)
    @init()
    return
  pluginName = "parsleyhelper"
  defaults =
    clientValidation: true
    submitURL: false
    onComplete: ($formelem) ->
      throw new Error("onComplete callback missing")
      return

    onInit: ($formelem) ->

    message: "Please Wait"
    errorContainer: false

  Plugin:: =
    init: ->
      settings = @settings
      $elem = $(@element)
      that = this
      settings.onInit $elem
      $elem.parsley listeners:
        onFormSubmit: (isFormValid) ->
          return false  if not isFormValid and settings.clientValidation
          $.blockUI
            css:
              border: "none"
              padding: "15px"
              backgroundColor: "#FFF"
              color: "#000"
              "-webkit-border-radius": "10px"
              "-moz-border-radius": "10px"
              opacity: .9

            message: settings.message

          $.post(settings.submitURL, $elem.serialize()).success((data) ->
            $.unblockUI()
            if data.success
              settings.onComplete $elem
            else
              if settings.errorContainer
                ret = ""
                $.each data.errors, (index) ->
                  ret = ret + data.errors[index] + "<br/>"
                  return

                $(settings.errorContainer).html(ret).fadeIn()
                $.unblockUI()
              else
                $.unblockUI()
                alert that.json2string(data.errors)
            return
          ).error ->

            #server side fail
            $.unblockUI()
            alert "There was a technical problem, please try again."
            return

          false # always fail

      return

    json2string: (j) ->
      ret = ""
      $.each j, (index) ->
        ret = ret + j[index] + "\n"
        return

      ret

  $.fn[pluginName] = (options) ->
    @each ->
      $.data this, "plugin_" + pluginName, new Plugin(this, options)  unless $.data(this, "plugin_" + pluginName)
      return


  return
) jQuery, window, document