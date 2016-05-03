/*

WN Desk support scripts by Jaidev Soin

The following is a collection of jQuery plugins and helpers that enable a multi instance approach to running Desk on WN.com

*/

(function($, countries, underwriterStandardContactDetails, underwriterEmergencyContactDetails, underwriterArticleDisclaimers,
  defaultCscContactDetails) {
  var wnDeskSupport = function (utils) {
    // Basic settings
    var contactFormHostToPreventXSS = 'http://poc.worldnomads.com';

    var nonInsuranceDomain = 'service.worldnomads.com';
    var unknownCorDomain = 'service.worldnomads.com';
    var nonInsuranceLanguageCode = 'en_au';

    var contactUsPath = '/customer/portal/emails/new';
    var deskContactPath = '/customer/portal/questions/new';
    var emailPostPath = '/customer/portal/emails';
    var qnaPostPath = '/customer/portal/questions';

    var countryIdentifierParamName = 'country_of_residence';
    var countryNameParamName = 'country_of_residence_name';
    var topicParamName = 'topic';

    var unknownCountryOfResidenceParamValue = 'unknown';
    
    var modalClass = 'country-of-residence-select-modal';
    var modalCoverClass = 'country-of-residence-select-modal-cover';
    var residenceInfoClass = 'country-of-residence-info';
    
    var languageCodeForRootPath = 'en';
    var extractLanguageCodeAndPathEndingFromURLRegex = /\/customer\/(.*)\/portal\/(.*)/i
    var portalPathWithLanguageCodeTemplate = "/customer/#{languageCode}/portal/#{pathEnding}";
    var finalPathOnIndexPageWithLanguageCode = 'articles';
    var countryAndUnderwriterCookieComponentSeparator = '|';
    var selectedCORAndUnderwriterCookieName = 'country_of_residence_and_underwriter';

    // The following is displayed to users to help them choose an appropriate country of residence
    var countryOfResidenceInfo = "\
      <em>In general, your country of permanent residence is the country where you have all of the following:</em>\
      <ul>\
        <li>Are a citizen or a legal, permanent resident</li>\
        <li>Have access to long term medical care through a national health insurance scheme and/or private health insurance (not including reciprocal health agreements)</li>\
        <li>Will be repatriated to for ongoing medical care if you're unable to continue your trip</li>\
        <li>Have unrestricted, unconditional right of entry</li>\
        <li>Have a residential address</li>\
      </ul>";

     var loggingHelpInfo = "\
      <div>\
      <p>To assist us can you please answer as many of the following as possible:</p>\
      <ul>\
          <li>How were you trying to log in (include error messages or screenshots where possible)</li>\
		  <li>What browser were you using at the time (e.g. Chrome, Safari, Internet Explorer, etc...)</li>\
		  <li>What operating system were you using (e.g. Mac OS X, Windows, etc....)</li>\
		  <li>What device were you using (Android Phone, iPad, Laptop, etc...)</li>\
      </ul>\
      </div>";

    
    // The following are the question topics supplied the user as part of the prelimary questions asked by wnContactFormManager
    // The only mandatory field is topicName
    //   * isInsurance topic defines whether or not the question should go into a particular underwriters Desk instance, 
    //        or into a generic non-insurance instance
    //   * extraFields defines which non-standard fields to load in the contact us form
    //   * useActiveUnderwriter defines what to do when there are multilpe underwriters for a particular country. 
    //        In some cases it only makes sense to ask the question of the current underwriter.
    //   * requirePolicy defines what happens in the case that there are multiple underwriters and one 
    //        cannot be automatically selected. 
    //        If requirePolicy is true, we don't give a "I don't have a policy" option, and instead just ask
    //        what date their policy was purchased on to see which underwriter to use

    var questionTopics = [
      {
        topicName: 'I have an emergency & need help',
        extraFields: ['policy-number'],
        preambleField: null,
        isInsuranceTopic: true,
        requirePolicy: true,
        isEmergencyTopic: true
      },
      {
        topicName: 'I\'d like to phone customer support about my policy',
        extraFields: ['policy-number'],
        isInsuranceTopic: true,
        requirePolicy: false,
        preambleField: null,
        isCscContactTopic: true,
        deskTopicName: 'I have an emergency & need help'
      },
      {
        topicName: 'I need help buying a policy',
        extraFields: ['departure-date'],
        preambleField: null,
        isInsuranceTopic: true,
        useActiveUnderwriter: true
      },
      {
        topicName: 'I need help logging in',
        preambleField: loggingHelpInfo
      },
      {
        topicName: "I have a question about what's covered",
        isInsuranceTopic: true,
        preambleField: null
      },
      {
        topicName: 'I need to change something about my policy',
        extraFields: ['policy-number'],
        preambleField: null,
        isInsuranceTopic: true,
        requirePolicy: true
      },
      {
        topicName: 'I need help making a claim',
        extraFields: ['policy-number'],
        preambleField: null,
        isInsuranceTopic: true,
        requirePolicy: true
      },  
      {
        topicName: 'About Travel Scholarships',
        preambleField: null
      },
      {
        topicName: 'About the Community',
        preambleField: null
      },
      {
        topicName: 'None of the above',
        preambleField: null,
        isInsuranceTopic: true
      }
    ];

    // These are the fields that are shown in the iframed question new page.
    //   Fields marked extraField are only shown if the selected topic specifies they should be shown
    //   Note: The fieldnames for the custom fields here only match the main WN Desk instance. 
    // For deployment to other Desk instances, it's probably best to call {{ticket_custom_CUSTOM_FIELD_ID }} 
    // for each field within liquid, extract the field name, and then pass them into .wnContactForm() as arguments
    var contactFormFields = [
      {
        identifier: 'subject',
        fieldName: 'email[subject]',
        fieldType: 'hidden',
        mirrorTo: 'qna[subject]',
        paramName: 'topic'
      },
      {
        identifier: 'departure-date',
        fieldName: 'ticket[custom7]',
        label: 'Your departure date (optional)',
        fieldType: 'text',
        extraField: true
      },
      {
        identifier: 'policy-number',
        fieldName: 'ticket[custom3]',
        label: 'Your policy number (optional)',
        fieldType: 'text',
        extraField: true
      },
      {
        identifier: 'body',
        fieldName: 'email[body]',
        label: 'Your question',
        fieldType: 'textarea',
        mirrorTo: 'qna[body]'
      },
      {
        identifier: 'name',
        fieldName: 'interaction[name]',
        label: 'Your name',
        fieldType: 'text'
      },
      {
        identifier: 'email',
        fieldName: 'interaction[email]',
        label: 'Your email address - Please ensure this is correct as we will respond to this address',
        fieldType: 'email'
      },
      {
        identifier: 'confirm-email',
        fieldName: 'confirm-email',
        label: 'Confirm your email address',
        fieldType: 'email'
      },
      {
        identifier: 'phone',
        fieldName: 'ticket[custom8]',
        label: 'Your phone number (optional)',
        fieldType: 'text'
      },
      {
        identifier: 'departing-soon',
        fieldName: 'ticket[custom6]',
        fieldType: 'hidden'
      },
      {
        identifier: 'country-of-residence',
        fieldName: 'ticket[custom5]',
        fieldType: 'hidden',
        paramName: countryNameParamName
      },
      {
        identifier: 'attachment',
        fieldName: 'case_attachment[attachment]',
        label: 'Attachment',
        fieldType: 'file'
      },
      {
        identifier: 'authenticity-token',
        fieldName: 'authenticity_token',
        fieldType: 'hidden'
      },
      {
        identifier: 'topic-id',
        fieldName: 'qna[kb_topic_id]',
        fieldType: 'hidden'
      },
      {
        identifier: 'submit',
        fieldName: 'commit',
        fieldType: 'submit'
      }
    ];

    // Extending the jQuery object, these methods are called using the form $.wnDesk.methodName
    //  Generally, they do not act on a single jQuery object, as a plugin would, but instead affect the page as a whole
    $.extend({
      wnDesk: {

        /* 
          A stop gap measure to hide content in articles based on the selected country of residence.
          This works with the existing multi-underwriter article format from before the current one
          Desk instance per underwriter set up. This should only be called or required until all the
          underwriters are on their own Desk domain. This should not be called on Desk instances that
          only support a single underwriter
        */
        legacyArticleUnderwriterSupport: function() {
          var countryAndUnderwriterIdentifiers = utils.getCookie(selectedCORAndUnderwriterCookieName);

          if (countryAndUnderwriterIdentifiers !== null) {
            var underwriterIdentifier = countryAndUnderwriterIdentifiers.split(countryAndUnderwriterCookieComponentSeparator)[1];

            $('.specific-info').hide();
            // Strip -rbg or -irl from the end of millstream - Quite a hack, but should be okay as this is for legacy only
            var identifier = underwriterIdentifier.replace(/-(gbr|irl)$/, '');
            var info = $('.' + identifier + '-specific-info');
            info.show().addClass('specifically-shown');
            info.find('h5').hide();
          }
        },

        /*
          Displays a modal to help the user work out their country of residence
          Called from the contact us page
          Clicking the 'still unsure' link will take the user to a contact us page that skips 
           the country of residence question
        */
        showCountryOfResidenceInfo: function(urlForUnsure) {
          var modalCover = $(utils.sub("\
            <div class='#{modalCoverClass}'>\
              <div class='#{modalClass}'>\
                <div class='#{residenceInfoClass}'>\
                  #{countryOfResidenceInfo}\
                  <a href=\"#{urlForUnsure}\">I am still unsure of my country of permanent residence</a>\
                </div>\
                <button class='button-primary button close'>Close</button>\
              </div>\
            </div>\
          ", {
            modalClass: modalClass,
            countryOfResidenceInfo: countryOfResidenceInfo,
            modalCoverClass: modalCoverClass,
            residenceInfoClass: residenceInfoClass,
            urlForUnsure: urlForUnsure
          })).appendTo('body');

          modalCover.find('.close').on('click', function(e) {
            modalCover.remove();

            e.preventDefault();
          });
        },

        /*
          Checks if a countryOfResidence cookie is set. 
          If it is, it ensures the stored data is valid, and that the user is on the correct domain
          If its not valid, prompt for country of residence
          If it is valid, but the user is on the wrong language on a non-index page, prompt for country of residence
          If it is valid, but the user is on the wrong language on the index page, redirect to the correct language
        */
        requireCountryOfResidence: function (opt) {
          opt = $.extend({
          }, opt);

          var underwriterDetails;
          var countryAndUnderwriterIdentifiers = utils.getCookie(selectedCORAndUnderwriterCookieName);

          // Check cookie is set
          if (countryAndUnderwriterIdentifiers !== null) {
            var split = countryAndUnderwriterIdentifiers.split(countryAndUnderwriterCookieComponentSeparator);

            // Check cookie contains two values
            if (split.length == 2) {
              var countryIdentifier = split[0];
              var underwriterIdentifier = split[1];

              // Valid lookup ensures cookie content was valid
              underwriterDetails = utils.findUnderwriterDetailsByCountryAndUnderwriterIdentifiers(countryIdentifier, underwriterIdentifier, countries);
            }
          }

          var languageCodeBasedOnURL;
          var onIndexPage;
          var currentUrlComponents = utils.componentsFromUrl(window.location.href);
          var languageAndFinalPathMatch = currentUrlComponents.path.match(extractLanguageCodeAndPathEndingFromURLRegex);

          // Check path contains expected components, if not, is path blank?
          if (languageAndFinalPathMatch !== null && languageAndFinalPathMatch.length == 3) {
            languageCodeBasedOnURL = languageAndFinalPathMatch[1];
            onIndexPage = languageAndFinalPathMatch[2] == finalPathOnIndexPageWithLanguageCode;
          } else if (currentUrlComponents.path == "/") {
            languageCodeBasedOnURL = languageCodeForRootPath;
            onIndexPage = true;
          } else {
            onIndexPage = false;
          }

          // If cookie is missing / invalid, or URL is strange / incorrect, or cookie language doesn't match to URL language, then something is not right
          if (underwriterDetails === undefined || languageCodeBasedOnURL === undefined || underwriterDetails.languageCode != languageCodeBasedOnURL) {
            // If the cookie is valid, and they are on the index page, but on the wrong index page, redirect them to the correct one
            if (underwriterDetails !== undefined && languageCodeBasedOnURL !== undefined && onIndexPage) {
              // Redirect the user to the correct URL
              var path = utils.sub(portalPathWithLanguageCodeTemplate, { "languageCode": underwriterDetails.languageCode, "pathEnding": finalPathOnIndexPageWithLanguageCode });
              var url = utils.urlFromComponents({ "path": path, "params": currentUrlComponents.params, "fragment": currentUrlComponents.fragment });
              location.href = url;
            } else {
              // Otherwise, prompt for country of residence
              $.wnDesk.promptForCountryOfResidence();  
            }
            
          }
        },

        /*
          Replace the country of residence cookie with the new details
        */
        setCountryOfResidenceAndUnderwriterCookie: function(countryIdentifier, underwriterIdentifier) {
          utils.deleteCookie(selectedCORAndUnderwriterCookieName);
          var countryAndUnderwriterIdentifiers = countryIdentifier + countryAndUnderwriterCookieComponentSeparator + underwriterIdentifier;
          utils.setCookie(selectedCORAndUnderwriterCookieName, countryAndUnderwriterIdentifiers);
        },

        /*
          Displays a modal that prompts the user for a country of residence
        */
        promptForCountryOfResidence: function(opt) {
          opt = $.extend({
          }, opt);

          var residenceFieldName = 'country-of-residence';
          var residenceInfoToggleClass = 'show-country-of-residence-info';

          var handleSelectedCountryAndUnderwriter = function(country, underwriter) {
            // Always redirect the user even if they are on the root page and are a ROW customer (language = 'en')
            // It is okay to redirect the user to the same page + params, as long as that page's language
            // is correct for their COR

            // Replace cookie with the new values
            $.wnDesk.setCountryOfResidenceAndUnderwriterCookie(country.identifier, underwriter.identifier);

            // If they are on a standard Desk page with the path format /customer/LANGUAGE/portal/PATH_ENDING, grab the path ending, otherwise, use /articles
            var currentUrlComponents = utils.componentsFromUrl(window.location.href);
            var languageAndFinalPathMatch = currentUrlComponents.path.match(extractLanguageCodeAndPathEndingFromURLRegex);
            var pathEnding;

            if (languageAndFinalPathMatch && languageAndFinalPathMatch.length == 3) {
              pathEnding = languageAndFinalPathMatch[2];
            } else {
              pathEnding = finalPathOnIndexPageWithLanguageCode;
            }

            // Redirect the user to the correct URL
            var path = utils.sub(portalPathWithLanguageCodeTemplate, { "languageCode": underwriter.languageCode, "pathEnding": pathEnding });
            var url = utils.urlFromComponents({ "path": path, "params": currentUrlComponents.params, "fragment": currentUrlComponents.fragment });
            location.href = url;
          };

          var selectField = utils.field({
            fieldName: residenceFieldName,
            fieldType: 'select',
            options: utils.optionsForCountries(countries)
          });

          var stillUnsureURL = utils.addParamToUrl(countryIdentifierParamName, unknownCountryOfResidenceParamValue, utils.urlFromComponents({
            path: contactUsPath
          }));

          var modalCover = $(utils.sub("\
            <div class='#{modalCoverClass}'>\
              <div class='#{modalClass}'>\
                <h3>What is your country of permanent residence?</h3>\
                #{selectField}\
                <a class='#{residenceInfoToggleClass}'>Unsure what your country of permanent residence is?</a>\
                <div class='#{residenceInfoClass}'>\
                  #{countryOfResidenceInfo}\
                  Please <a href='#{stillUnsureURL}'>contact us</a> if you are still unsure of your country of permanent residence.\
                </div>\
              </div>\
            </div>\
          ", {
            selectField: selectField,
            modalClass: modalClass,
            countryOfResidenceInfo: countryOfResidenceInfo,
            modalCoverClass: modalCoverClass,
            residenceInfoClass: residenceInfoClass,
            residenceInfoToggleClass: residenceInfoToggleClass,
            stillUnsureURL: stillUnsureURL
          })).appendTo('body');

          var modal = modalCover.find('.' + modalClass);
          var insertedSelect = modal.find("[name='" + residenceFieldName + "']");
          var residenceInfoToggle = modal.find('.' + residenceInfoToggleClass);
          var residenceInfo = modal.find('.' + residenceInfoClass).hide();

          residenceInfoToggle.on('click', function(e) {
            residenceInfoToggle.hide();
            residenceInfo.show();

            e.stopPropagation();
          });

          insertedSelect.on('change', function() {
            var countryDetails = utils.findCountryDetailsByIdentifier(insertedSelect.val(), countries);
            
            // Check the user selected a country option, and not just a spacer option
            if (countryDetails !== null) {

              var underwriters = countryDetails.underwriters;

              if (underwriters.length == 1) {
                var underwriter = underwriters[0];
                var selectedDomain = underwriter.helpDomain;

                handleSelectedCountryAndUnderwriter(countryDetails, underwriter);
              } else {
                // If there are multiple underwriters for a single COR due 
                // to an underwriter change, find out which is appropriate

                residenceInfoToggle.hide();
                residenceInfo.hide();

                var options = utils.optionsForUnderwriters(underwriters);

                var underwriterFieldName = 'underwriter';

                $(utils.field({ 
                  fieldName: underwriterFieldName,
                  label: 'Do you have a current policy with World Nomads?',
                  fieldType: 'radio',
                  options: options
                })).appendTo(modal);

                modal.find("[name='" + underwriterFieldName + "']").on('change', function() {
                  var identifier = $(this).val();
                  
                  var underwriter = $.grep(underwriters, function(underwriter) {
                    return underwriter.identifier == identifier;
                  })[0];

                  handleSelectedCountryAndUnderwriter(countryDetails, underwriter);
                });
                
              }
            }
          });
        }
      }
    });

    $.fn.extend({

      /*
        Usage: $(element that tells user what the country of residence is).wnDeskCountryOfResidenceSelect();

        This plungin replaces the content of the specified elements with a message about
           who the info in this Desk instance is for.
        It also adds a link so that the user can change the country of residence 
          (triggering promptForCountryOfResidence)
        It is recommended that the element that it is applied to has appropriate fallback content
          for users without JS enabled on their browsers.
        This plugin will check that the cookie is valid, and appropriate for the current URL before replacing any content
      */
      wnDeskCountryOfResidenceSelect:function(opt) {
        opt = $.extend({
          changeCountryMessage: "This information is for residents of <span class='flag #{identifier}'></span>" +
            " <span class='country-of-residence-name'>#{displayName}</span> only (<a>Change</a>)"
        }, opt);

        return this.each(function () {
          var self = $(this);

          var countryAndUnderwriterIdentifiers = utils.getCookie(selectedCORAndUnderwriterCookieName);

          var languageCodeBasedOnURL;
          var currentUrlComponents = utils.componentsFromUrl(window.location.href);
          var languageAndFinalPathMatch = currentUrlComponents.path.match(extractLanguageCodeAndPathEndingFromURLRegex);

          // Extract language code from the URL, or use the fallback language code if we are on root
          if (languageAndFinalPathMatch !== null && languageAndFinalPathMatch.length == 3) {
            languageCodeBasedOnURL = languageAndFinalPathMatch[1];
          } else if (currentUrlComponents.path == "/") {
            languageCodeBasedOnURL = languageCodeForRootPath;
          }

          // If there is a country and underwriter cookie, check it's contents are valid, and check the underwriters language matches what we found in the URL.
          // If so, replace the content of the specified elements with the current COR, and a link to change the COR.
          if (countryAndUnderwriterIdentifiers !== null) {
            var splitIdentifiers = countryAndUnderwriterIdentifiers.split(countryAndUnderwriterCookieComponentSeparator);
            var countryIdentifier = splitIdentifiers[0];
            var underwriterIdentifier = splitIdentifiers[1];
            
            var countryDetails = utils.findCountryDetailsByIdentifier(countryIdentifier, countries);
            var underwriterDetails = utils.findUnderwriterDetailsByCountryAndUnderwriterIdentifiers(countryIdentifier, underwriterIdentifier, countries);

            if (countryDetails !== undefined && underwriterDetails != undefined && underwriterDetails.languageCode == languageCodeBasedOnURL) {
              self.html(utils.sub(opt.changeCountryMessage, countryDetails));

              self.find('a').on('click', function(e) {
                // Get rid of the current cookie, if the user isn't sure what their COR is, don't auto select this COR again.
                utils.deleteCookie(selectedCORAndUnderwriterCookieName);
                $.wnDesk.promptForCountryOfResidence();

                e.preventDefault();
              });
            }
          }
        });        
      },

      /*
        Usage: $(element to load the contact form manager in).wnContactFormManager();

        This plugin asks the user some preliminary questions and based on the provides details on how the user can contact WN
        It will ask for a question topic, a country of residence, some details on which underwriter to select if a country has multiple
        Not all of these questions are asked - Only the ones that are required to provide contact info are asked.
      */

      wnContactFormManager: function (opt) {
        opt = $.extend({
          topicStepHeader: 'What is your question about?',
          countryOfResidenceStepHeader: 'Your country of permanent residence?',
          underwriterStepHeader: 'Do you have a current policy with World Nomads?',
          underwriterStepHeaderHasPolicy: 'When was your policy purchased?',
          questionDetailsStepHeader: 'How can we help you?',
          underwriterContactDetailsStepHeader: 'Our contact details',
          underwriterEmergencyContactDetailsStepHeader: 'Our emergency contact details',
          underwriterCscContactDetailsStepHeader: 'Our customer support phone numbers',
        }, opt);

        var topicFieldDetails = {
          fieldName: 'topic',
          fieldType: 'radio',
          options: $.map(questionTopics, function(topic) {
            return [[topic.topicName, topic.topicName]];
          })
        };

        var countryOfResidenceFieldDetails = {
          fieldName: 'country-of-residence',
          fieldType: 'select',
          hint: '<a>Unsure what your country of permanent residence is?</a>',
          options: utils.optionsForCountries(countries)
        };

        var underwriterFieldDetails = { 
          fieldName: 'underwriter',
          fieldType: 'radio'
        };

        return this.each(function () {
          var searchResultsArea;
          var searchTimer;
          var steps = {};
          var topicKey = 'topic';
          var countryOfResidenceKey = 'countryOfResidence';
          var underwriterKey = 'underwriter';
          var questionDetailsKey = 'questionDetails';
          var underwriterContactDetailsKey = 'underwriterContactDetails';
          
          var self = $(this)

            .on('init.wnContactFormManager', function () {
              self.triggerHandler('insertTopicStep');

              // Listen for messages from the child iFrame. Ensure the messages are valid, and if so, pass them on.
              var validMessageInsuranceHelpDomains = $.map(countries, function(country) {
                return $.map(country.underwriters, function(underwriter) {
                  return underwriter.helpDomain === undefined ? null : underwriter.helpDomain;
                })
              });

              var validMessageDomains = validMessageInsuranceHelpDomains.concat([nonInsuranceDomain]);

              window.onmessage = function(e) {
                var origin = e.origin || e.originalEvent.origin;
                var domain = utils.componentsFromUrl(origin).domain

                if (utils.contains(domain, validMessageDomains)) {
                  self.triggerHandler('handleChangedQuestionText', [e.data]);
                }
              }
            })

            .on('insertStep', function(e, stepName, stepNumber, header, content, skipAnimation, optionalPreamble) {
              steps[stepName] = $(utils.sub("\
                <div class='step'>\
                  <h3>Step #{stepNumber} &mdash; #{header}</h3>\
                  #{content}\
                </div>\
              ", {
                stepNumber: stepNumber,
                header: header,
                content: content
              })).appendTo(self);

              if (optionalPreamble) {        
              	$(optionalPreamble).insertAfter(steps[stepName].find('h3'));
              } 

              if (skipAnimation !== true) {
                steps[stepName].hide().fadeIn();
              }
            })

            .on('insertTopicStep', function() {
              // Insert the step
              var field = utils.field(topicFieldDetails);

              self.triggerHandler('insertStep', [topicKey, 1, opt.topicStepHeader, field, true]);

              // Grab the radios
              var topicRadios = self.find("[name='" +topicFieldDetails.fieldName + "']");

              // Listen for the user selecting a radio button
              topicRadios.on('change', function() {
                var selectedTopicName = topicRadios.filter(':checked').val();
                self.triggerHandler('handleChangedTopic', [selectedTopicName]);
              });

              // If a topic was passed through, select the matching radio trigger the next step to load
              var topicName = utils.paramFromUrl(topicParamName, window.location.href);

              if (topicName !== null) {
                topicRadios.val([topicName]);
                self.triggerHandler('handleChangedTopic', [topicName]);
              }
            })

            .on('insertCountryOfResidenceStep', function(e, topicDetails) {
              // Insert the step
              var field = utils.field(countryOfResidenceFieldDetails);
              self.triggerHandler('insertStep', [countryOfResidenceKey, 2, opt.countryOfResidenceStepHeader, field]);

              // Add a listener on the "Unsure about country of residence link", clicking it loads a help popup
              steps[countryOfResidenceKey].find('a').on('click', function(e) {
                var addedCor = utils.addParamToUrl(countryIdentifierParamName, unknownCountryOfResidenceParamValue, window.location.href);
                var addedTopic = utils.addParamToUrl(topicParamName, topicDetails.topicName, addedCor);

                $.wnDesk.showCountryOfResidenceInfo(addedTopic);

                e.preventDefault();
              });

              // Bind listener to change event on the residence select
              var countryOfResidenceSelect = self.find("[name='" +countryOfResidenceFieldDetails.fieldName + "']");

              countryOfResidenceSelect.on('change', function() {
                var countryIdentifier = countryOfResidenceSelect.val();
                self.triggerHandler('handleChangedCountryOfResidence', [countryIdentifier, topicDetails]);
              });
            })

            .on('insertUnderwriterStep', function(e, topicDetails, countryDetails) {

              // Insert the step
              var options = utils.optionsForUnderwriters(countryDetails.underwriters, topicDetails.requirePolicy);
              var field = utils.field($.extend(underwriterFieldDetails, { options: options }));
              var header = topicDetails.requirePolicy ? opt.underwriterStepHeaderHasPolicy : opt.underwriterStepHeader;
              self.triggerHandler('insertStep', [underwriterKey, 3, header, field]);

              // Add listener to the change event of the underwriter radios
              var underwriterRadios = self.find("[name='" + underwriterFieldDetails.fieldName + "']");

              underwriterRadios.on('change', function() {
                var underwriterIdentifier = underwriterRadios.filter(':checked').val();
                self.triggerHandler('handleChangedUnderwriter', [topicDetails, countryDetails, underwriterIdentifier]);
              });
            })

            .on('insertQuestionDetailsStep', function(e, domain, topicDetails, countryIdentifier, languageCode, stepNumber) {
              // Load an iframe contact from from the relevant desk instance
              var optionalPreamble;

              if (topicDetails.preambleField) {
              	optionalPreamble = topicDetails.preambleField;
              }
              self.triggerHandler('insertStep', [questionDetailsKey, stepNumber, opt.questionDetailsStepHeader, '', null, optionalPreamble]);

              var baseUrl = utils.urlFromComponents({
                domain: domain,
                path: deskContactPath,
                params: {
                  'topic': topicDetails.deskTopicName === undefined ? topicDetails.topicName : topicDetails.deskTopicName
                }
              });

              if (countryIdentifier !== undefined) {
                var countryDetails = utils.findCountryDetailsByIdentifier(countryIdentifier, countries);
                var urlWithCountryName = utils.addParamToUrl(countryNameParamName, countryDetails.displayName, baseUrl);
                var urlWithCountryNameAndIdentifier = utils.addParamToUrl(countryIdentifierParamName, countryDetails.identifier, urlWithCountryName);
                var fullUrl = urlWithCountryNameAndIdentifier;
              } else {
                var fullUrl = baseUrl;
              }

              var iframe = $('<iframe/>', {
                'src': fullUrl,
                'height': 1000,
                'class': 'embedded-contact-form'
              });

              // Article suggestions based on the users question
              if (languageCode !== undefined) {
                searchResultsArea = $('<div/>', {
                  'class': 'contact-form-search-results'
                });

                searchResultsArea.on('displaySearchResultsFor', function(e, questionText) {
                  console.log('is this happening?')
                  console.log(questionText)
                  var url = utils.sub('/customer/#{languageCode}/portal/articles/autocomplete?term=#{term}', {
                    'languageCode': languageCode,
                    'term': encodeURIComponent(questionText)
                  });

                  $.getJSON(url, function(results) {
                    if (results.length > 0) {
                      var limitedResults = results.length > 5 ? results.slice(0, 5) : results;
                      var countryIdentifier = utils.paramFromUrl(countryIdentifierParamName, window.location.href);

                      var resultsElements = $.map(limitedResults, function(result) {
                        return utils.sub("<a target='_blank' href='#{href}' class='search-result'>#{subject}</a>", { href: result.id, subject: result.label });
                      }).join('');

                      var resultsContainer = $("<div class='results'><h3>Do these articles help?</h3></div>").append(resultsElements);

                      searchResultsArea.html(resultsContainer);
                    }
                  });
                });
              }

              steps[questionDetailsKey].append(iframe);
              steps[questionDetailsKey].append(searchResultsArea);
            })

            .on('insertUnderwriterContactDetailsStep', function(e, underwriterIdentifier, stepNumber, topicDetails, countryIdentifier) {
              var contactDetails = "";
              var header = "";
             
              if (topicDetails.isCscContactTopic === true) 
              {
                header = opt.underwriterCscContactDetailsStepHeader;
                contactDetails = utils.findCscDetailsByCountryAndUnderwriter(countryIdentifier, underwriterIdentifier, countries);
               
              } else if (topicDetails.isEmergencyTopic === true) 
              {
                contactDetails = underwriterEmergencyContactDetails[underwriterIdentifier];
                header = opt.underwriterEmergencyContactDetailsStepHeader;
              } else {
                contactDetails = underwriterStandardContactDetails[underwriterIdentifier];  
                header = opt.underwriterContactDetailsStepHeader;
              }
              
              self.triggerHandler('insertStep', [questionDetailsKey, stepNumber, header, contactDetails]);
            })

            .on('handleChangedTopic', function(e, topicName) {
              // Remove everything after the topic selector
              self.triggerHandler('removeStep', [countryOfResidenceKey]);
              self.triggerHandler('removeStep', [underwriterKey]);
              self.triggerHandler('removeStep', [questionDetailsKey]);
              self.triggerHandler('removeStep', [underwriterContactDetailsKey]);

              // Look up the details for the selected topic
              var topicDetails = $.grep(questionTopics, function(questionTopic) {
                return questionTopic.topicName == topicName;
              })[0];

              // If it's an insurance topic, ask for the users country of residence. Otherwise, display the non-insurance contact form
              var countryIdentifier = utils.paramFromUrl(countryIdentifierParamName, window.location.href);
              var noCountryOfResidenceSelect = countryIdentifier == unknownCountryOfResidenceParamValue;

              // The user doesn't know their cor, so load a domain that sends the question to us
              if (noCountryOfResidenceSelect) {
                self.triggerHandler('insertQuestionDetailsStep', [unknownCorDomain, topicDetails, undefined, undefined, 2]);
              // It's an insurance topic, so ask their country of residence
              } else if (topicDetails.isInsuranceTopic === true) {
                self.triggerHandler('insertCountryOfResidenceStep', [topicDetails]);

              // It's a non-insurance topic, so load the non-insurance form
              } else {
                self.triggerHandler('insertQuestionDetailsStep', [nonInsuranceDomain, topicDetails, undefined, nonInsuranceLanguageCode, 2]);
              }
            })

            .on('handleChangedCountryOfResidence', function(e, countryIdentifier, topicDetails) {
              // If they have selected a country and not a spacer item
              if (countryIdentifier !== undefined && countryIdentifier.length >= 2) {
                // Remove everything after the country of residence selector
                self.triggerHandler('removeStep', [underwriterKey]);
                self.triggerHandler('removeStep', [questionDetailsKey]);
                self.triggerHandler('removeStep', [underwriterContactDetailsKey]);

                var countryDetails = utils.findCountryDetailsByIdentifier(countryIdentifier, countries);

                // There is only one underwriter
                if (countryDetails.underwriters.length == 1) {
                  var underwriter = countryDetails.underwriters[0];

                  // Set the COR and underwriter cookie
                  $.wnDesk.setCountryOfResidenceAndUnderwriterCookie(countryDetails.identifier, underwriter.identifier);

                  if (topicDetails.isCscContactTopic || underwriter.helpDomain === undefined || topicDetails.isEmergencyTopic) {
                    self.triggerHandler('insertUnderwriterContactDetailsStep', [underwriter.identifier, 3, topicDetails, countryIdentifier]);
                  } else {
                    self.triggerHandler('insertQuestionDetailsStep', [underwriter.helpDomain, topicDetails, countryIdentifier, underwriter.languageCode, 3]);
                  }

                // There is more than one, but use active underwriter
                } else if (topicDetails.useActiveUnderwriter === true) {
                  // TODO: Need a way to pull todays underwriter, and not just the last one
                  var underwriter = countryDetails.underwriters[countryDetails.underwriters.length - 1];

                  // Set the COR and underwriter cookie
                  $.wnDesk.setCountryOfResidenceAndUnderwriterCookie(countryDetails.identifier, underwriter.identifier);

                  if (topicDetails.isCscContactTopic || underwriter.helpDomain === undefined || topicDetails.isEmergencyTopic) {
                    self.triggerHandler('insertUnderwriterContactDetailsStep', [underwriter.identifier, 3, topicDetails, countryIdentifier]);
                  } else {
                    self.triggerHandler('insertQuestionDetailsStep', [underwriter.helpDomain, topicDetails, countryIdentifier, underwriter.languageCode, 3]);
                  }

                // There is more than one underwriter, prompt to find out whch is appropriate
                } else {
                  self.triggerHandler('insertUnderwriterStep', [topicDetails, countryDetails]);
                }
              }
            })

            .on('handleChangedUnderwriter', function(e, topicDetails, countryDetails, underwriterIdentifier) {
              var underwriter = $.grep(countryDetails.underwriters, function(underwriter) {
                return underwriter.identifier == underwriterIdentifier;
              })[0];

              // Set the COR and underwriter cookie
              $.wnDesk.setCountryOfResidenceAndUnderwriterCookie(countryDetails.identifier, underwriter.identifier);

              // Remove everything after the underwriter selector
              self.triggerHandler('removeStep', [questionDetailsKey]);
              self.triggerHandler('removeStep', [underwriterContactDetailsKey]);

              if (topicDetails.isCscContactTopic || underwriter.helpDomain === undefined || topicDetails.isEmergencyTopic) {
                self.triggerHandler('insertUnderwriterContactDetailsStep', [underwriter.identifier, 4, topicDetails, countryDetails.identifier]);
              } else {
                self.triggerHandler('insertQuestionDetailsStep', [underwriter.helpDomain, topicDetails, countryDetails.countryIdentifier, underwriter.languageCode, 4]);  
              }
            })

            .on('removeStep', function(e, stepName) {
              if (steps[stepName] !== undefined) {
                steps[stepName].remove();
                delete steps[stepName];
              }
            })

            .on('handleChangedQuestionText', function(e, questionText) {
              clearTimeout(searchTimer);

              if (questionText.length > 10) {
                searchTimer = setTimeout(function() {
                  if (searchResultsArea !== undefined) {
                    searchResultsArea.triggerHandler('displaySearchResultsFor', [questionText]);
                  }
                }, 500);
              }
            });

          self.triggerHandler('init.wnContactFormManager');
        });
      },

      /*
        Usage: $(element to load the contact form).wnContactForm();

        This plungin is to be applied on one of the Desk ask pages, and loads a contact form
        This contact form can submit to either Desks' ask, or email functionality, giving users the option.
        It will also load related questions for the user.
      */
      wnContactForm: function (defaultTopicId, opt) {
        opt = $.extend({
        }, opt);

        return this.each(function () {
          var fieldElements = {};

          var self = $(this)
            .on('init.wnContactForm', function() {
              self.triggerHandler('insertFields');
              self.triggerHandler('setAuthenticityToken');
              self.triggerHandler('populateFieldsFromParams');
              self.triggerHandler('setTopicId');
              self.triggerHandler('addSearchHandler');
              self.triggerHandler('addDatePickerToDepartureDate');
              self.triggerHandler('addValidation');
            })

            .on('insertFields', function() {
              var selectedTopicName = utils.componentsFromUrl(window.location.href).params.topic;
              var topicDetails = $.grep(questionTopics, function(questionTopic) {
                return questionTopic.topicName == selectedTopicName;
              })[0];

              $.each(contactFormFields, function(i, fieldDetails) {
                if (fieldDetails.extraField !== true || (topicDetails.extraFields !== undefined && utils.contains(fieldDetails.identifier, topicDetails.extraFields))) {
                  self.append(utils.field(fieldDetails));
                  fieldElements[fieldDetails.identifier] = self.find(utils.sub("[name='#{name}']", { name: fieldDetails.fieldName}));  
                }
              });
            })

            .on('populateFieldsFromParams', function() {
              var params = utils.componentsFromUrl(window.location.href).params;
              if (params !== undefined) {
                $.each(contactFormFields, function(i, fieldDetails) {
                if (fieldDetails.paramName !== undefined && params[fieldDetails.paramName] !== undefined) {
                  fieldElements[fieldDetails.identifier].val(params[fieldDetails.paramName]);
                }
              });
              }
            })

            .on('setAuthenticityToken', function() {
              var token = $("meta[name='csrf-token']").attr('content');
              fieldElements['authenticity-token'].val(token);
            })

            // TopicID here has nothing to do with the topic the user selected.
            // This topic id is passed into this plugin at load, and is required for questions to work on Desk
            // The topic it uses is a dummy one, which should be the last topic in Desk's topic set.
            .on('setTopicId', function() {
              fieldElements['topic-id'].val(defaultTopicId);
            })

            .on('addSearchHandler', function() {
              if (window.top.postMessage !== undefined) {

                fieldElements['body'].on('keyup', function() {
                  var content = fieldElements['body'].val();
                  window.top.postMessage(content, contactFormHostToPreventXSS);
                });
              }
            })

            .on('addDatePickerToDepartureDate', function() {
              if (fieldElements['departure-date'] !== undefined) {
                fieldElements['departure-date'].datePicker({
                  dateFormat: 'ddd mmmm yyyy',    
                  minDate: new Date(),            
                  focusNextFieldOnDateSelect: false 
                }).bind('writeOutDate', function(e, departureDate) {
                  var now = new Date();
                  var days_between = (departureDate - now) / (1000*60*60*24);
                  // Set departing soon to 1 if departure date is today, or in the next 3 days
                  // This departing soon flag is used in Desk rules to sort cases
                  fieldElements['departing-soon'].val(days_between < 3 ? '1' : '0');
                });
              }
            })

            .on('addValidation', function() {

              self.validate({
                submitHandler: function(form) {
                  self.triggerHandler('validationPassed');
                  // This submit has to be in here and not in the validationPassed handler as otherwise it goes into an infinite loop on submit.
                  // There must be something special about this local version of 'form' that prevents this.
                  form.submit();
                },
                errorPlacement: function(error, element) {
                  error.appendTo(element.closest('.input-group'));
                },
                messages:{
                  'interaction[name]':{
                    'required':'Name is required.'
                  },
                  'interaction[email]':{
                    'required':'Email address is required.',
                    'email':'Invalid email address'
                  },
                  'email[body]':{
                    'required':'Question is required.',
                    'maxlength':'Exceeding max length of 5KB'
                  },
                  'confirm-email':{
                    'equalTo': 'The email addresses you entered do not match'
                  }
                },
                rules:{
                  'interaction[name]':{
                    'required':true
                  },
                  'interaction[email]':{
                    'required':true,
                    'email':true
                  },
                  'email[body]':{
                    'required':true,
                    'maxlength':5000
                  },
                  'confirm-email': {
                    'equalTo': "[name='interaction[email]']"
                  }
                },
                errorClass:'input-validation-error'
              });

            })

            .on('validationPassed', function() {
              $.each(contactFormFields, function(i, fieldDetails) {

                // Mirror some of the fields so the form can be submitted to either question or email
                if (fieldDetails.mirrorTo) {
                    if (!fieldElements[fieldDetails.mirrorTo]) {
                      self.append(utils.hiddenField({ fieldName: fieldDetails.mirrorTo }));
                      fieldElements[fieldDetails.mirrorTo] = self.find(utils.sub("[name='#{name}']", { name: fieldDetails.mirrorTo}));     
                    }

                  fieldElements[fieldDetails.mirrorTo].val(fieldElements[fieldDetails.identifier].val());
                }
              });

              self.attr('action', emailPostPath);
              self.attr('method', 'post');
              self.attr('enctype', 'multipart/form-data');
            });

          // If there is no validate plugin, we want this to fail obviously and loudly
          if ($.fn.validate) {
            self.triggerHandler('init.wnContactForm');
          } else {
            console.log('No validate plugin loaded, aborting');
          }
        });
      }
    });
  }


  /*
    Utils to support the plugins and helpers. These utils are all referentially transparent.
  */
  var utils = {

    // String substitution, usage is: $.sub('I like to eat #{foodName}!', {foodName: 'cheese'})
    sub: function (html, values) {
      return html.replace(/#\{(\w*)\}/g, function (token, key) {
        return values[key] != null ? values[key] : token;
      });
    },

    // Tests whether an array contains a value
    contains: function(needle, haystack) {
      return $.inArray(needle, haystack) != -1;
    },

    // Converts an array of countries into a set of options, with a copy of countries marked as isTop at the top
    optionsForCountries: function(countries) {
      var topCountries = $.map(countries, function(country) {
        // Making use of map's reject like behavior
        return country.isTop ? [[country.identifier, country.displayName]] : null;
      });

      var allCountries = $.map(countries, function(country) {
        return [[country.identifier, country.displayName]];
      });

      var instructions = [['', 'Select a country']];

      var spacer = [['', '--------------']];

      return instructions.concat(spacer).concat(topCountries).concat(spacer).concat(allCountries);
    },

    // Accepts fields details and calls appropriate helper
    field: function(fieldDetails) {
      switch (fieldDetails.fieldType) {
        case 'text':
        case 'phone':
        case 'email':
          return utils.inputField(fieldDetails);
        case 'textarea':
          return utils.textareaField(fieldDetails);
        case 'select':
          return utils.selectField(fieldDetails);
        case 'radio':
          return utils.radioField(fieldDetails);
        case 'hidden':
          return utils.hiddenField(fieldDetails);
        case 'file':
          return utils.fileField(fieldDetails);
        case 'submit':
          return utils.submitField(fieldDetails);
        case 'checkbox':
          return utils.checkboxField(fieldDetails);
      }
    },

    inputField: function(fieldDetails) {
      return utils.sub("\
        <div class='input-group'>\
          <label for='#{fieldName}'>#{label}</label>\
          <input id='#{fieldName}' name='#{fieldName}' type='#{fieldType}' />\
        </div>\
        ", fieldDetails);
    },

    textareaField: function(fieldDetails) {
      return utils.sub("\
        <div class='input-group'>\
          <label for='#{fieldName}'>#{label}</label>\
          <textarea id='#{fieldName}' name='#{fieldName}'></textarea>\
        </div>\
        ", fieldDetails);
    },

    selectField: function(fieldDetails) {
      var optionElements = $.map(fieldDetails.options, function(option) {
        return utils.sub("<option value='#{value}'>#{text}</option>", { value: option[0], text: option[1]});
      }).join('');

      if (fieldDetails.hint === undefined) {
        fieldDetails.hint = '';
      }

      var labelMarkup = fieldDetails.label === undefined ? '' : utils.sub("<label for='#{fieldName}'>#{label}</label>", fieldDetails);

      return utils.sub("\
        <div class='input-group'>\
          #{labelMarkup}\
          <select id='#{fieldName}' name='#{fieldName}'>#{optionElements}</select>\
          <span class='hint'>#{hint}</span>\
        </div>\
        ", $.extend({'optionElements': optionElements, 'labelMarkup': labelMarkup}, fieldDetails));
    },

    radioField: function(fieldDetails) {
      var legendMarkup = fieldDetails.label === undefined ? '' : utils.sub("<legend>#{label}</legend>", fieldDetails);

      var radioButtons = $.map(fieldDetails.options, function(option) {
        return utils.sub('\
          <label class="radio-group">\
            <input type="radio" value="#{value}" name="#{fieldName}">\
            #{label}\
          </label>\
        ', { label: option[1], value: option[0], fieldName: fieldDetails.fieldName});
      }).join('');

      return utils.sub("\
        <fieldset>\
          #{legendMarkup}\
          #{radioButtons}\
        </fieldset>\
        ", $.extend({'radioButtons': radioButtons, 'legendMarkup': legendMarkup}, fieldDetails));
    },

    checkboxField: function(fieldDetails) {
      return utils.sub("\
        <div class='input-group same'>\
          <input id='#{fieldName}' name='#{fieldName}' type='#{fieldType}' checked />\
          <label for='#{fieldName}'>#{label}</label>\
        </div>\
        ", fieldDetails);
    },

    hiddenField: function(fieldDetails) {
      return utils.sub("\
        <input id='#{fieldName}' name=#{fieldName} type='hidden' />\
        ", fieldDetails);
    },

    fileField: function(fieldDetails) {
      return utils.sub("\
        <div class='input-group'>\
          <label for='#{fieldName}'>#{label}</label>\
          <input id='#{fieldName}' name='#{fieldName}' type='#{fieldType}' />\
        </div>\
        ", fieldDetails);
    },

    submitField: function(fieldDetails) {
      return utils.sub("\
        <div class='input-group'>\
          <button id='#{fieldName}' name='#{fieldName}' class='button-primary'>Send</button>\
        </div>\
        ", fieldDetails);
    },

    // Takes a string of params from a url and returns an object mapping
    parseParams: function(paramsString) {
      // Recurse through the array of pairs, building an object of params as we go
      var parse = function(params, pairs) {
        var pair = pairs[0];
        var parts = pair.split('=');
        var key = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts.slice(1).join('='));

        // Handle multiple parameters of the same name
        if (typeof params[key] === "undefined") {
          params[key] = value;
        } else {
          params[key] = [].concat(params[key], value);
        }

        return pairs.length == 1 ? params : parse(params, pairs.slice(1))
      }

      if (paramsString.length == 0) {
        return {};
      } else {
        return parse({}, paramsString.split('&'));
      }
    },

    // Splits a give URL into it's components
    componentsFromUrl: function(url) {
      var protocolSplit = url.split(/:?\/\//);
      var withoutProtocol = protocolSplit.length == 1 ? url : protocolSplit[1];
      var fragmentSplit = withoutProtocol.split('#');
      var withoutProtocolOrFragment = fragmentSplit[0];
      var paramsSplit = withoutProtocolOrFragment.split('?');
      var domainWithPath = paramsSplit[0];
      var indexOfPath = domainWithPath.indexOf('/');

      var components = {};

      if (protocolSplit.length > 1) {
        components['protocol'] = protocolSplit[0];
      }

      if (fragmentSplit.length > 1) {
        components['fragment'] = fragmentSplit[1];
      }

      if (paramsSplit.length > 1) {
        // Parse these
        components['params'] = utils.parseParams(paramsSplit[1]);
      }

      if (indexOfPath == 0) {
        components['path'] = domainWithPath;
      } else if (indexOfPath == -1) {
        components['domain'] = domainWithPath;
      } else {
        components['domain'] = domainWithPath.slice(0, indexOfPath);
        components['path'] = domainWithPath.slice(indexOfPath);
      }

      return components;
    },

    // Converts an object mapping of params back into a string for use in a url
    stringifyParams: function(params)  {
      return $.map(params, function(value, key) { 
        return key + '=' + encodeURIComponent(value); 
      }).join('&');
    },

    // The opposite of componentsFromUrl
    urlFromComponents: function(components) {
      var domain = '';
      var protocol = '';
      if (components.domain === undefined) {
        // leave empty
      } else {
        domain = components.domain;
        protocol = (components.protocol == '' || components.protocol === undefined) ? '//' : (components.protocol + '://');
      }
      
      var path = components.path === undefined ? '' : components.path;
      var params = components.params === undefined ? '' : ('?' + utils.stringifyParams(components.params));
      var fragment = components.fragment === undefined ? '' : ('#' + components.fragment);

      return protocol + domain + path + params + fragment;
    },

    // Adds a single parameter to a url string
    addParamToUrl: function(key, value, url) {
      var components = utils.componentsFromUrl(url);

      if (components.params === undefined) {
        components.params = {};
      }

      components.params[key] = value;

      return utils.urlFromComponents(components);
    },

    // Returns the value of a single parameter from a url
    paramFromUrl: function(name, url) {
      var params = utils.componentsFromUrl(window.location.href).params;

      if (params === undefined || params[name] === undefined) {
        return null;
      } else {
        return params[name];
      }
    },

    findUnderwriterDetailsByCountryAndUnderwriterIdentifiers: function(countryIdentifier, underwriterIdentifier, countries) {
      var countryDetails = utils.findCountryDetailsByIdentifier(countryIdentifier, countries);

      var underwritersThatMatchIdentifier = $.grep(countryDetails.underwriters, function(underwriter) {
        return underwriter.identifier == underwriterIdentifier;
      });

      if (underwritersThatMatchIdentifier.length > 0)  {
        return underwritersThatMatchIdentifier[0];
      } else {
        return null;
      }
    },

    findCountryDetailsByIdentifier: function(identifier, countries) {
      var countriesThatMatchIdentifier = $.grep(countries, function(country) {
        return country.identifier == identifier;
      });

      if (countriesThatMatchIdentifier.length > 0) {
        return countriesThatMatchIdentifier[0];
      } else {
        return null;
      }
    },

    findCscDetailsByCountryAndUnderwriter: function(countryIdentifier, underwriterIdentifier, countryList) {
   
      // firstly, by default, these are the default contact details for phone support
      var contactDetails = defaultCscContactDetails;

      var countriesThatMatchIdentifier = $.grep(countryList, function(country) {
        return country.identifier == countryIdentifier;
      });

      if (countriesThatMatchIdentifier.length > 0) {

        // secondly, country wide details, if available
        if (countriesThatMatchIdentifier[0].cscContactDetails !== undefined) {
          contactDetails = countriesThatMatchIdentifier[0].cscContactDetails;
        }

        // third, most specifically for the underwriter, if available
        if (underwriterIdentifier !== undefined) {
          
          var underwriterMatchingIdentifiers = $.grep(countriesThatMatchIdentifier[0].underwriters, function(underwriter) {
            return underwriter.identifier == underwriterIdentifier;
          });
          
          if (underwriterMatchingIdentifiers.length > 0 && underwriterMatchingIdentifiers[0].cscContactDetails !== undefined) {
            contactDetails = underwriterMatchingIdentifiers[0].cscContactDetails;
          }
        }
      }
      return contactDetails;
    },

    // Turns an array of underwriters into a set of radio buttons
    optionsForUnderwriters: function(underwriters, policyRequired) {
      var lastUnderwriter = underwriters[underwriters.length - 1];
      // TODO: the last underwriter isn't necessarily the correct one. It's the one that's current for today date that is correct.
      var options = [];

      if (!policyRequired) {
        options.push([lastUnderwriter.identifier, "No, I don't have a current policy"]);
      }

      $.each(underwriters, function(i, underwriter) {
        var endDate, startDate, label;

        if (i !== underwriters.length - 1) {
          var nextStartDate = underwriters[i+1].startDate;
          var endDate = new Date(nextStartDate.getFullYear(), nextStartDate.getMonth(), nextStartDate.getDate() - 1);
          var endDateString = utils.dateString(endDate);
        }

        if (i !== 0) {
          var startDateString = utils.dateString(underwriter.startDate);
        }

        var intro;
        if (endDateString !== undefined && startDateString !== undefined) {
          intro = policyRequired ? 'Between ' : 'Yes, purchased between ';
          label = intro + startDateString + ' and ' + endDateString;
        } else if (endDateString !== undefined) {
          intro = policyRequired ? 'On or before ' : 'Yes, purchased on or before ';
          label = intro + endDateString;
        } else {
          intro = policyRequired ? 'On or after ' : 'Yes, purchased on or after ';
          label = intro + startDateString;
        }

        options.push([underwriter.identifier, label]);
      });

      return options;
    },

    // A pretty print for a date object of the form "13th Jan 2015"
    dateString: function(date) {
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return utils.sub('#{day} #{month} #{year}', {
        day: utils.ordinalize(date.getDate()),
        month: months[date.getMonth()],
        year: date.getFullYear()
      });
    },

    // Used for dates, turns 13 into 13th
    ordinalize: function (number) {
      if (11 <= number % 100 && number % 100 <= 13) {
        return number + "th";
      } else {
        var extenions = { 1: 'st', 2: 'nd', 3: 'rd' };
        return number + (extenions[number % 10] || 'th');
      }
    },

    // Set an individual cookie
    setCookie: function (name, value, options) {
      options = options || {};

      var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

      if (options.expires) {
        var expires;

        if (typeof options.expires == 'number') {
          // A number of days was passed in, convert it into a date from now
          expires = new Date();
          expires.setDate(expires.getDate() + options.expires);
        } else {
          // A date was passed in, just use the date
          expires = options.expires;
        }

        cookie += '; expires=' + expires.toUTCString();
      }

      // Even though cookies normally default to current path, it is more useful to default to root
      cookie += '; path=' + (options.path || '/');

      cookie += '; domain=' + (options.domain || document.location.hostname);

      if (options.secure) {
        cookie += '; secure';
      }

      document.cookie = cookie;

      return cookie;
    },

    // Keep in mind, it's possible to have multiple cookies with the same name, 
    // eg: one for .demo.com, another for subdomain.demo.com, and a third for .demo.com/cheese.
    // There is no way to differentiate between these, and a random one will be returned. 
    // In other words, don't reuse names between domain / path levels.
    getCookie: function (name) {
      var cookies = utils.getCookies();

      for (var cookieName in cookies) {
        if (cookieName == name) {
          return cookies[cookieName];
        }
      }

      return null;
    },

    // Finds cookies by name based on a passed in regex. Returns an filtered object of cookies
    findCookies: function (pattern) {
      var allCookies = utils.getCookies();
      var matchingCookies = {};

      for (var cookieName in allCookies) {
        if (cookieName.match(pattern)) {
          matchingCookies[cookieName] = allCookies[cookieName];
        }
      }

      return matchingCookies;
    },

    // Returns an object of all cookies decoded
    getCookies: function () {
      var rawCookies = document.cookie.split('; ');
      var cookies = {};

      for (var i = 0; i < rawCookies.length; i++) {
        var rawCookie = rawCookies[i].split('=');
        
        // IE saves empty cookie strings as just the cookie name, sans =, so cookie[1] might be null
        cookies[decodeURIComponent(rawCookie[0])] = decodeURIComponent(rawCookie[1] || ''); 
      }

      return cookies;
    },

    // Remove a cookie, this is done by setting a cookie with a date of yesterday.
    // Keep in mind that if you specify path or domain when you create the cookie, you have to also specify them when you destroy it.
    deleteCookie: function (name, options) {
      options = options || {};
      options.expires = -1;

      utils.setCookie(name, '', options);
    }
  };

  wnDeskSupport(utils);
  
})(jQuery, wnDeskCountries, wnDeskUnderwriterStandardContactDetails, wnDeskUnderwriterEmergencyContactDetails, 
  wnDeskUnderwriterArticleDisclaimers, defaultCscContactDetails);


  