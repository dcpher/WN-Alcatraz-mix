var defaultCscContactDetails = "\
	    <div id='underwriterinfo'>\
	    <p>We're here to help if you have a question about your policy.</p>\
	    <div>\
	    <span class='contact-label'>Phone:</span><span class='contact-number'>+61 2 8263 0400</span><span>call from anywhere in the world (charges apply)</span>\
	    </div>\
	    <p>We're available: 8am-8pm Mon-Fri and 10am-2pm weekends Australian Eastern Time</p>\
	    <p><span class='contact-label'>Email:</span><a href=\"mailto:infoRTW@worldnomads.com\">email our customer service team</a> for help buying, \
      amending or understanding your policy.</p></div>\
    ";

// Underwriter contact fallback
// These contact details are here as a fill in while we move the underwriters onto Desk.

var wnDeskUnderwriterStandardContactDetails = {
  'trip-mate': "\
    <h4>Email</h4>\
    <p>\
      <a href='mailto:serviceUSA@worldnomads.com'>Email our customer service team</a> for help buying, amending or understanding your policy.\
      <br>\
      (email address: serviceUSA@worldnomads.com)\
    </p>\
    \
    <h4>Telephone</h4>\
    <ul>\
      <li>Call toll free within the US and Canada: +1-844-207-1930</li>\
      <li>Call international direct/collect: +1-816-523-1712</li>\
    </ul>\
    <p>\
      Available 24 hours a day, 7 days a week to answer your queries.\
    </p>\
  ",

  'travel-guard-chartis': "\
    <h4>Email</h4>\
    <p>\
      <a href='mailto:serviceUSA@worldnomads.com'>Email our customer service team</a> for help buying, amending or understanding your policy.\
      <br>\
      (email address: serviceUSA@worldnomads.com)\
    </p>\
    \
    <h4>Telephone</h4>\
    <ul>\
      <li>Call toll free Continental USA: +1-888-381-2449</li>\
      <li>Call international direct/collect: +1-715-295-5452</li>\
    </ul>\
    <p>\
      Available 24 hours a day, 7 days a week to answer your queries.\
    </p>\
  ",

  // UK and Ireland are split as some of the contact info is slightly different
  'millstream-gbr': "\
    <h4>Email</h4>\
    <p>\
      <a href='mailto:infoGBR@worldnomads.com'>Email our customer service team</a> for help buying, amending or understanding your policy.\
      <br>\
      (email address: infoGBR@worldnomads.com)\
    </p>\
    \
    <h4>Telephone</h4>\
    <ul>\
      <li>Local call within the UK: 01702 427 219</li>\
      <li>While overseas, call charges apply: +44 1702 427 219 or +61 2 8263 0400</li>\
    </ul>\
    <p>\
      Available during normal London, UK business hours (9am - 5pm) and closed public holidays.\
    </p>\
  ",

  'millstream-irl': "\
    <h4>Email</h4>\
    <p>\
      <a href='mailto:infoIRL@worldnomads.com'>Email our customer service team</a> for help buying, amending or understanding your policy.\
      <br>\
      (email address: infoIRL@worldnomads.com)\
    </p>\
    \
    <h4>Telephone</h4>\
    <ul>\
      <li>Local call within the UK: 01702 427 219</li>\
      <li>Outside the UK, call charges apply: +44 1702 427 219 or +61 2 8263 0400</li>\
    </ul>\
    <p>\
      Available during normal London, UK business hours (9am - 5pm) and closed public holidays.\
    </p>\
  ",

  'chartis-canada': "\
    <h4>Email</h4>\
    <p>\
      <a href='mailto:infoCAN@worldnomads.com'>Email our customer service team</a> for help buying, amending or understanding your policy.\
      <br>\
      (email address: infoCAN@worldnomads.com)\
    </p>\
    \
    <h4>Telephone</h4>\
    <ul>\
      <li>Call toll-free from Canada and the Continental U.S: 1 877 328 2528</li>\
      <li>While overseas, collect from anywhere else in the world: +1 416 646 3723</li>\
    </ul>\
    <p>\
      Available (Canada Eastern Standard Time) Monday to Friday 7am-11pm (Dec 25th & Jan 1st 8:30am-8pm) Saturday 8am-10pm and Sunday 9am-6pm.\
    </p>\
  ",

  // TODO: I pulled the available call times from the service article, is it correct?
  'bupa': "\
    <h4>Email</h4>\
    <p>\
      <a href='mailto:infoRTW@worldnomads.com'>Email our customer service team</a> for help buying, amending or understanding your policy.\
      <br>\
      (email address: infoRTW@worldnomads.com)\
    </p>\
    \
    <h4>Telephone</h4>\
    <p>\
      Call from anywhere in the world (charges apply): +61 2 8263 0400\
      <br>\
      (Available Denmark business hours. The Bupa Global Travel Claims Team are multi-lingual.)\
    </p>\
  "

};


var wnDeskUnderwriterEmergencyContactDetails = {
  'trip-mate': "\
    \
    <p> For help in an emergency,  call One Call Worldwide Travel Assistance Services available 24 hours, 7 days a week , 365 days a year from anywhere in the world: </p>\
	<h4>Phone</h4>\
    <ul>\
      <li>+1-855-878-9588 (toll free within the US and Canada)</li>\
      <li>+1-603-328-1329 (toll free outside the US and Canada)</li>\
      <li>+1-603-328-1384 (Collect)</li>\
    </ul>\
    \
    <h4>Email</h4>\
    <p>\
      <a href='mailto:onecall@oncallinternational.com'>Email our Travel Assistance Services team</a> for help in an emergency.\
      <br>\
      (email address: onecall@oncallinternational.com)\
    </p>\
  ",

  'travel-guard-chartis': "\
    \
    <p>For help in an emergency, call the assistance team at Travel Guard. They're available 24 hours a day, 7 days a week.</p>\
	<h4>Phone</h4>\
    <ul>\
      <li>+1 888 381 2449 (toll free within US)</li>\
      <li>+1 715-295 5452 (Call international direct/collect)</li>\
    </ul>\
    \
    <h4>Email</h4>\
    <p>\
      <a href='mailto:elite.requests@travelguard.com'>Email our assistance team</a> for help in an emergency.\
      <br>\
      (email address: elite.requests@travelguard.com)\
    </p>\
  ",

  'millstream-gbr': "\
    \
    <p>For help in an emergency, call the team at Specialty Assist in London. They are available 24 hours a day, 7 days a week.</p>\
	<h4>Phone</h4>\
    <ul>\
      <li>+44 (0)330 660 0738 (call reverse charges via an operator or direct - not toll free); or</li>\
      <li>0330 660 0738 (call from within the UK)</li>\
    </ul>\
    \
    <h4>Email</h4>\
    <p>\
      <a href='mailto:assistance@mstream.co.uk'>Email our assistance team</a> for help in an emergency.\
      <br>\
      (email address: assistance@mstream.co.uk)\
    </p>\
  ",

  'chartis-canada': "\
    \
    <p>For help in an emergency, Contact Travel Guard Canada's Emergency Assistance Team, 24 hours a day, 7 days a week.</p>\
	<h4>Phone</h4>\
    <ul>\
      <li>+1 866 878 0192 (toll-free from Canada and the Continental U.S.); or</li>\
      <li>+1 416 646 3723 (collect from anywhere else in the world)</li>\
    </ul>\
    \
    <h4>Email</h4>\
    <p>\
      <a href='mailto:medicalsp@travelguard.com'>Email our assistance team</a> for help in an emergency.\
      <br>\
      (email address: medicalsp@travelguard.com)\
    </p>\
  ",

  'bupa': "\
    \
    <p>For help in an emergency, call the Bupa Global Assistance team in Denmark. They're available 24 hours a day, 7 days a week and they are multi lingual:</p>\
	<h4>Phone</h4>\
    <ul>\
	  <li>Call: +45 70 23 24 61 (Calls are not toll free. You can claim your itemised call costs)</li>\
	  <li>Text message: +45 42 41 30 00 (Include your policy number in the text message. No phone calls)</li>\
    </ul>\
    \
    <h4>Email</h4>\
    <p>\
      <a href='mailto:emergency@ihi.com'>Email our assistance team</a> for help in an emergency.\
      <br>\
      (email address: emergency@ihi.com)\
    </p>\
  ",
  
  'lloyds': "\
    \
   <p>For help in an emergency, call our Emergency Assistance Team in Sydney. They are available 24 hours a day, 7 days a week.</p>\
   <h4>Phone</h4>\
    <ul>\
      <li>+61 2 8263 0470; or</li>\
      <li>+61 2 8292 1470 (call reverse charges via an operator from anywhere in the world); or</li>\
	  <li>1800 611 210    (free call within Australia)</li>\
    </ul>\
   \
    <h4>Email</h4>\
    <p>\
      <a href='mailto:assist@worldnomads.com'>Email our assistance team</a> for help in an emergency.\
      <br>\
      (email address: assist@worldnomads.com)\
    </p>\
  "
}

// Replicate UK contact details for Ireland, required as we split it for non-emergency contact details
wnDeskUnderwriterEmergencyContactDetails['millstream-irl'] = wnDeskUnderwriterEmergencyContactDetails['millstream-gbr'];



var wnDeskUnderwriterArticleDisclaimers = {
  'trip-mate': "Benefits herein are described on a general basis only. There are certain restrictions, exclusions and limitations that apply to all coverage and services. This advertisement does not constitute or form any part of the Certificate / Policy or any other contract of any kind. This plan is underwritten by: Nationwide Mutual Insurance Company and affiliated companies, Columbus, OH. Benefits are administered by: Trip Mate, Inc.*, 9225 Ward Parkway, Suite 200, Kansas City, MO, 64114, 1-844-207-1930 (*in CA, dba Trip Mate Insurance Agency) and 24-Hour Assistance Services are provided by One Call Worldwide Travel Services Network, Inc. Please Note: Plan benefits, limits, and provisions may vary by state jurisdiction. To review full plan details online, go to: www.worldnomads.com. CONDITIONS AND LIMITATIONS - Certain limitations and exclusions apply and are detailed in the Certificate / Policy. Please review your Certificate / Policy for complete policy details, which may include coverage variations based upon your state of residency. You can view or print your state specific information at www.worldnomads.com as your plan may include specific wording applicable to your state of residence. If you purchase this plan and you are not satisfied with your plan for any reason, you may return the Plan Certificate / Policy and the Confirmation / Declaration within 10 days of receipt and your plan payment will be refunded, provided you have not filed a claim or departed on your trip.<br><br>World Nomads, Inc. (15854422) of 1120 NW Couch St, 10th Floor, Portland OR 97209 USA (in CA, dba World Nomads Travel Insurance Services, License # 0I46621), is supported by different insurers from around the world. Always read your Certificate / Policy to review your specific coverage, including the exclusions, conditions and limitations that apply, and to make sure the policy is right for you.",

  'travel-guard-chartis': "",

  'millstream-gbr': "WorldNomads.com is supported by different insurers from around the world. Always read your policy wording to review your specific coverage and to make sure that the policy is right for you. WorldNomads.com is a trading name of WorldNomads.com Pty Limited. World Nomads Limited is an appointed representative of Millstream Underwriting Limited. This product is underwritten by Millstream Underwriting Limited on behalf of AGA International S.A. Mondial Assistance (UK) Limited is the appointed administrator for AGA International SA in the United Kingdom. Section 19 Financial Failure Protection of this travel insurance is insured by certain underwriters at Lloydâ€™s and is administered by International Passenger Protection Limited (IPP). Full details are set out in the policy wording.",

  'chartis-canada': "This is a summary only. It does not include all terms, conditions and exclusions of the policies described. Please refer to the actual policies for complete details of coverage and exclusions. Insurance underwritten by AIG Insurance Company of Canada, with its principal place of business at 145 Wellington Street West, Toronto, Ontario, Canada, M5J 1H8.",

  'bupa': "World Nomads is supported by different insurers from around the world. Always read your policy wording to review your specific coverage and to make sure that the policy is right for you. Bupa Denmark, filial af Bupa Insurance Limited, England danmark a/s (Bupa Global Travel) is an insurance company authorised and regulated by the Danish Insurance Contracts Act and the European financial supervisory authorities. Travel insurance provided by Bupa Global Travel is issued under Danish Law. Bupa Global Travel is a member of the Bupa Group.",

  'lloyds': "Always read your Product Disclosure Statement and other policy documentation to review your specific cover and to make sure that the policy is right for you. This insurance is arranged and promoted by WorldNomads.com Pty Limited ABN 62 127 485 198 AR 343027, as an authorised representative of Cerberus Special Risks Pty Ltd (Cerberus) ABN 81 115 932 173 AFS Licence No. 308461 and underwritten by certain underwriters at Lloyds."
}

// Replicate UK contact details for Ireland, required as we split it for non-emergency contact details
wnDeskUnderwriterArticleDisclaimers['millstream-irl'] = wnDeskUnderwriterArticleDisclaimers['millstream-gbr'];

// Country data. There should be a single entry for each country supported by WN Desk. Each country may have one or more underwriters. 
// All country data is essential except for the isTop attribute, which is used to determine which countries should be shown at the top of country select form elements.
// Underwriters should be added in chronological order, with everything after the first underwriter having a startDate.

var wnDeskCountries = [
{
  identifier: 'AND',
  displayName: 'Andorra',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ANT',
  displayName: 'Antarctica',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ARG',
  displayName: 'Argentina',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ARM',
  displayName: 'Armenia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ABW',
  displayName: 'Aruba',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'AUS',
  displayName: 'Australia',
  cscContactDetails: "\
	        <div id='underwriterinfo'><!-- <h3>AUSTRALIA</h3> -->\
          <p>We're here to help if you have a question about your policy.</p>\
          <div>\
	        <p><span class='contact-label'>Phone:</span><span class='contact-number'>1300 787 375</span><span>(from Australia)</span></p>\
	        <p><span class='contact-label'> </span><span class='contact-number'>+61 2 82630400</span><span>(from overseas)</span></p>\
	        </div>\
          <p>We're available: Monday to Friday 8:00am - 8:00pm (AEST); weekends 10:00am - 2:00pm (AEST)</p>\
          <p><span class='contact-label'>Email:</span><a href=\"mailto:infoAUS@worldnomads.com\">email our customer service team</a> for help buying, \
          amending or understanding your policy. </p>\
          ",
  underwriters: [
    {
      identifier: 'lloyds',
      languageCode: 'en_au',
      helpDomain: 'helpdesk.worldnomads.com.au'
    }
  ],
  isTop: true
},
{
  identifier: 'AUT',
  displayName: 'Austria',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'AZE',
  displayName: 'Azerbaijan',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BHS',
  displayName: 'The Bahamas',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BHR',
  displayName: 'Bahrain',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BGD',
  displayName: 'Bangladesh',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BRB',
  displayName: 'Barbados',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BLR',
  displayName: 'Belarus',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BEL',
  displayName: 'Belgium',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BLZ',
  displayName: 'Belize',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BMU',
  displayName: 'Bermuda',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BTN',
  displayName: 'Bhutan',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BOL',
  displayName: 'Bolivia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BES',
  displayName: 'Bonaire, Saint Eustatius and Saba',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BIH',
  displayName: 'Bosnia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BWA',
  displayName: 'Botswana',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BRA',
  displayName: 'Brazil',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ],
  isTop: true
},
{
  identifier: 'BRN',
  displayName: 'Brunei Darussalam',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'BGR',
  displayName: 'Bulgaria',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'KHM',
  displayName: 'Cambodia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CMR',
  displayName: 'Cameroon',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CAN',
  displayName: 'Canada',
  cscContactDetails: "\
      <div id='underwriterinfo'><!-- <h3>CANADA</h3> -->\
      <p>We're here to help if you have a question about your policy, call Travel Guard Canada's World Service Desk</p>\
      <div>\
	  	<p><span class='contact-label'>Phone:</span><span class='contact-number'>+1 877 328 2528</span><span>(toll-free from Canada and the Continental U.S); or</span></p>\
	  	<p><span class='contact-label'> </span><span class='contact-number'>+1 416 646 3723</span><span>(collect from anywhere else in the world)</span></p>\
		  </div>\
      <p>Available Monday to Friday 7am-11pm; Saturday 8am-10pm; Sunday 9am-6pm (Canada Eastern Standard Time)</p>\
      <p><span class='contact-label'>Email:</span><a href=\"mailto:infoCAN@worldnomads.com\">email our customer service team</a> for help buying, \
      amending or understanding your policy. </p>\
      <p>For WorldNomads.com membership questions: Phone Sydney, Australia: <span class='contact-secondary'>+61 2 8263 0400</span></p></div>\
     ",
  underwriters: [
    {
      identifier: 'chartis-canada',
      languageCode: 'en_ca'
    }
  ],
  isTop: true
},
{
  identifier: 'CYM',
  displayName: 'Cayman Islands',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CHL',
  displayName: 'Chile',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CHN',
  displayName: 'China',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'COL',
  displayName: 'Colombia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CRI',
  displayName: 'Costa Rica',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'HRV',
  displayName: 'Croatia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CUB',
  displayName: 'Cuba',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CUV',
  displayName: 'Cura\u00e7ao',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CYP',
  displayName: 'Cyprus',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CZE',
  displayName: 'Czech Republic',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'DNK',
  displayName: 'Denmark',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'DOM',
  displayName: 'Dominican Republic',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ECU',
  displayName: 'Ecuador',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'EGY',
  displayName: 'Egypt',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'SLV',
  displayName: 'El Salvador',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'EST',
  displayName: 'Estonia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'FLK',
  displayName: 'Falkland Islands',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'FJI',
  displayName: 'Fiji',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'FIN',
  displayName: 'Finland',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'FRA',
  displayName: 'France',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PYF',
  displayName: 'French Polynesia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'GEO',
  displayName: 'Georgia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'DEU',
  displayName: 'Germany',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'GIB',
  displayName: 'Gibraltar',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'GRC',
  displayName: 'Greece',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'GRL',
  displayName: 'Greenland',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'GLP',
  displayName: 'Guadeloupe',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'GUM',
  displayName: 'Guam',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'GTM',
  displayName: 'Guatemala',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'HND',
  displayName: 'Honduras',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'HKG',
  displayName: 'Hong Kong',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'HUN',
  displayName: 'Hungary',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ISL',
  displayName: 'Iceland',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'IND',
  displayName: 'India',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'IDN',
  displayName: 'Indonesia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'IRN',
  displayName: 'Iran',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'IRL',
  displayName: 'Ireland',
  cscContactDetails: "\
      <div id='underwriterinfo'><!-- <h3>IRELAND</h3> -->\
      <p>We're here to help if you have a question about your policy.</p>\
		  <div>\
		  <p><span class='contact-label'>Phone:</span><span class='contact-number'>+44 (0)1702 427 219</span></p>\
		  </div>\
      <p>Available during normal London, UK business hours (GMT) and closed public holidays.</p>\
      <p><span class='contact-label'>Email:</span><a href=\"mailto:infoIRL@worldnomads.com\">email our customer service team</a> for help buying, \
      amending or understanding your policy.</p></div>\
     ",
  underwriters: [
    {
      identifier: 'millstream-irl',
      languageCode: 'en_gb'
    }
  ]
},
{
  identifier: 'ISR',
  displayName: 'Israel',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ITA',
  displayName: 'Italy',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ],
  isTop: true
},
{
  identifier: 'JAM',
  displayName: 'Jamaica',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'JPN',
  displayName: 'Japan',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'KAZ',
  displayName: 'Kazakhstan',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'KEN',
  displayName: 'Kenya',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'KWT',
  displayName: 'Kuwait',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'KGZ',
  displayName: 'Kyrgyzstan',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'LAO',
  displayName: 'Laos',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'LVA',
  displayName: 'Latvia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'LIE',
  displayName: 'Liechtenstein',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'LTU',
  displayName: 'Lithuania',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'LUX',
  displayName: 'Luxembourg',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MAC',
  displayName: 'Macau',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MKD',
  displayName: 'Macedonia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MDG',
  displayName: 'Madagascar',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MYS',
  displayName: 'Malaysia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MDV',
  displayName: 'Maldives',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MLT',
  displayName: 'Malta',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MUS',
  displayName: 'Mauritius',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MEX',
  displayName: 'Mexico',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MDA',
  displayName: 'Moldova',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MCO',
  displayName: 'Monaco',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MNG',
  displayName: 'Mongolia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'MAR',
  displayName: 'Morocco',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'NPL',
  displayName: 'Nepal',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'NLD',
  displayName: 'Netherlands',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'NCL',
  displayName: 'New Caledonia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'NZL',
  displayName: 'New Zealand',
  cscContactDetails: "\
      <div id='underwriterinfo'><!-- <h3>NEW ZEALAND</h3> -->\
      <p>We're here to help if you have a question about your policy.</p>\
	    <div>\
	    <p><span class='contact-label'>Phone:</span><span class='contact-number'>0800 NOMADS</span><span>(0800 666 237 free call in New Zealand); or</span></p>\
	    <p><span class='contact-label'> </span><span class='contact-number'>+61 2 82630400</span><span>(from overseas); or</span></p>\
	    <p><span class='contact-label'> </span><span class='contact-number'>1300 787 375</span><span>(from Australia)</span></p>\
	    </div>\
      <p>We're available: Monday to Friday 8:00am - 8:00pm (AEST), weekends 10:00am - 2:00pm (AEST)</p>\
      <p><span class='contact-label'>Email:</span><a href=\"mailto:infoNZD@worldnomads.com\">email our customer service team</a> for help buying, \
      amending or understanding your policy. </p></div>\
     ",
  underwriters: [
    {
      identifier: 'lloyds',
      languageCode: 'en_au',
      helpDomain: 'helpdesk.worldnomads.co.nz'
    }
  ],
  isTop: true
},
{
  identifier: 'NIC',
  displayName: 'Nicaragua',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'NOR',
  displayName: 'Norway',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'OMN',
  displayName: 'Oman',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PAK',
  displayName: 'Pakistan',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PLW',
  displayName: 'Palau',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PAN',
  displayName: 'Panama',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PNG',
  displayName: 'Papua New Guinea',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PRY',
  displayName: 'Paraguay',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PER',
  displayName: 'Peru',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PHL',
  displayName: 'Philippines',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'POL',
  displayName: 'Poland',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PRT',
  displayName: 'Portugal',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'PRI',
  displayName: 'Puerto Rico',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'QAT',
  displayName: 'Qatar',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ROU',
  displayName: 'Romania',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'RUS',
  displayName: 'Russia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'WSM',
  displayName: 'Samoa',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'SMR',
  displayName: 'San Marino',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'SAU',
  displayName: 'Saudi Arabia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'SGP',
  displayName: 'Singapore',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'SXM',
  displayName: 'Saint Martin',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'SVK',
  displayName: 'Slovakia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'SVN',
  displayName: 'Slovenia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'SLB',
  displayName: 'Solomon Islands',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ZAF',
  displayName: 'South Africa',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'KOR',
  displayName: 'South Korea',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ESP',
  displayName: 'Spain',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'es_es'
    }
  ],
  isTop: true
},
{
  identifier: 'LKA',
  displayName: 'Sri Lanka',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'SWE',
  displayName: 'Sweden',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'CHE',
  displayName: 'Switzerland',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'TWN',
  displayName: 'Taiwan',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'TJK',
  displayName: 'Tajikistan',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'THA',
  displayName: 'Thailand',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'TON',
  displayName: 'Tonga',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'TTO',
  displayName: 'Trinidad and Tobago',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'TUN',
  displayName: 'Tunisia',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'TUR',
  displayName: 'Turkey',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'TKM',
  displayName: 'Turkmenistan',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'UKR',
  displayName: 'Ukraine',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'ARE',
  displayName: 'United Arab Emirates',
  underwriters: [
    {
      identifier: 'bupa',
      languageCode: 'en'
    }
  ]
},
{
  identifier: 'GBR',
  displayName: 'United Kingdom',
  cscContactDetails: "\
      <div id='underwriterinfo'><!-- <h3>UNITED KINGDOM</h3> -->\
      <p>We're here to help if you have a question about your policy.</p>\
		  <div>\
		  <p><span class='contact-label'>Phone:</span><span class='contact-number'>+44 (0) 330 660 0738</span><span>(from overseas - charges apply)</span></p>\
		  <p><span class='contact-label'> </span><span class='contact-number'>0330 660 0738</span><span>(within UK)</span></p>\
		  </div>\
      <p>Available during normal London, UK business hours (GMT) and closed public holidays.</p>\
      <p><span class='contact-label'>Email:</span><a href=\"mailto:infoGBR@worldnomads.com\">email our customer service team</a> for help buying, \
      amending or understanding your policy.</p></div>\
     ",
    underwriters: [
      {
        identifier: 'millstream-gbr',
        languageCode: 'en_gb'
      }
    ],
    isTop: true
  },
  {
    identifier: 'URY',
    displayName: 'Uruguay',
    underwriters: [
      {
        identifier: 'bupa',
        languageCode: 'en'
      }
    ]
  },
  {
    identifier: 'USA',
    displayName: 'United States',
    underwriters: [
      {
        identifier: 'trip-mate',
        languageCode: 'en_us',
        cscContactDetails: "\
          <div id='underwriterinfo'><!-- <h3>USA</h3> -->\
	        <h4>For policies purchased AFTER June 17th 2014</h4>\
          <h4>(underwritten by Nationwide Insurance: Insurer: Trip Mate)</h4>\
          <p>We're here to help if you have a question about your policy.</p>\
          <p>Please call the Trip Mate Customer Service Team who are open 24 hours a day, 7 days a week.</p>\
		      <div>\
		      <p><span class='contact-label'>Phone:</span><span class='contact-number'>+1-844-207-1930</span><span>Call toll free within the US and Canada</span></p>\
		      <p><span class='contact-label'> </span><span class='contact-number'>+1-816-523-1712</span><span>Call international direct/collect</span></p>\
		      </div>\
          <p><span class='contact-label'>Email:</span><A href=\"mailto:serviceUSA@worldnomads.com\">Email our customer service team</a> for help buying, \
          amending or understanding your policy. </p>\
          <p>For WorldNomads.com membership questions: Phone Sydney, Australia: <span class='contact-secondary'>+61 2 8263 0400</span></p></div>\
        ",
      }
    ],
    isTop: true
  },
  {
    identifier: 'UZB',
    displayName: 'Uzbekistan',
    underwriters: [
      {
        identifier: 'bupa',
        languageCode: 'en'
      }
    ]
  },
  {
    identifier: 'VUT',
    displayName: 'Vanuatu',
    underwriters: [
      {
        identifier: 'bupa',
        languageCode: 'en'
      }
    ]
  },
  {
    identifier: 'VEN',
    displayName: 'Venezuela',
    underwriters: [
      {
        identifier: 'bupa',
        languageCode: 'en'
      }
    ]
  },
  {
    identifier: 'VNM',
    displayName: 'Vietnam',
    underwriters: [
      {
        identifier: 'bupa',
        languageCode: 'en'
      }
    ]
  },
  {
    identifier: 'VGB',
    displayName: 'British Virgin Islands',
    underwriters: [
      {
        identifier: 'bupa',
        languageCode: 'en'
      }
    ]
  }
];

// Datepicker plugin. 
// TODO: Load this in a different way, this is only here now to get this up and running

(function (h) {
    h.fn.extend({
        datePicker: function (b) {
            b = h.extend({
                fieldName: "date", monthNames: "January February March April May June July August September October November December".split(" "), shortMonthNames: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), shortDayNames: "SMTWTFS".split(""), startOfWeek: 1, pastMonthSymbol: "&laquo;", nextMonthSymbol: "&raquo;", numberOfMonths: 1, dateFormat: "dd/mm/yy", fadeInSpeed: 200, fadeOutSpeed: 200, topOffset: 0, leftOffset: 0, delayHideOnSelectBy: 0, minDate: null, maxDate: null,
earliest20thCenturyYear:1940,calculateMaxDateBasedOnCompanion:null,companionPicker:null,useCompanionDateAsMin:!1,startCalendarAtCompanionDate:!1,header:null,preventManualEntry:!0,showOnFocus:!0,alignment:"left",focusNextFieldOnDateSelect:!0,minDateErrorMessage:function(a,c){return"Please enter a "+a+" later than "+c},maxDateErrorMessage:function(a,c){return"Please enter a "+a+" earlier than "+c},lessThanCompanionDateErrorMessage:function(a,c){return"Please enter a "+a+" later than "+c},generalDateErrorMessage:function(a,
                c) { return "Please enter a valid " + a }, noDateEnteredErrorMessage: function (a) { return "Please enter a " + a }
            }, b); var d = {
                calendarForMonth: function (a, c, e, f) {
                    for (var k = h("<tbody></tbody>"), m = h("<tr/>"), g = 0; 7 > g; g++) h("<th/>").html(b.shortDayNames[(g + b.startOfWeek) % 7]).appendTo(m); k.append(m); for (var g = d.monthStartsOn(a, c), m = d.daysInMonth(a, c), l = (-1 * g + b.startOfWeek - 7) % 7, t = d.simplifyOrCorrectDate(new Date), r = d.getEffectiveMaxDate() ; l < m;) {
                        for (var q = h("<tr/>"), g = 0; 7 > g; g++) {
                            if (0 > l || l >= m) h("<td/>").appendTo(q); else {
                                var p =
                                [], n = d.newDSTSafeDate(c, a, l + 1); 0 == e - n && p.push("selected"); 0 == t - n && p.push("today"); f && 0 == f - n && p.push("selectedCompanion"); e && f && (e > n && f < n || e < n && f > n) && p.push("inSelectionRange"); (b.minDate && b.minDate > n || r && r < n || f && b.useCompanionDateAsMin && f > n) && p.push("disabled"); h(d.sub("<td class='day'><a>#{day}</a></td>", { day: n.getDate() })).addClass(p.join(" ")).appendTo(q)
                            } l++
                        } k.append(q)
                    } a = h(d.sub("<div class='datepicker-calendar'><div class='datepicker-calendar-title'><span class='datepicker-month'>#{month}</span> <span class='datepicker-year'>#{year}</span></div><table></table></div>",
                    { month: b.monthNames[a], year: c })).data("month", a).data("year", c); a.find("table").append(k); return a
                }, monthStartsOn: function (a, c) { return d.newDSTSafeDate(c, a, 1).getDay() }, daysInMonth: function (a, c) { return 32 - d.newDSTSafeDate(c, a, 32).getDate() }, sub: function (a, c) { return a.replace(/#\{(\w*)\}/g, function (a, b) { return c[b] || a }) }, dateFromInput: function (a) { return a && a[0] && 0 < h.trim(a.val()).length ? d.dateFromString(a.val()) : null }, dateFromString: function (a) {
                    var c, e, f, k, m = b.dateFormat; a = h.trim(a); var g = a.replace(/[\w+\s+]/g,
                    ""), g = 0 < g.length ? g.substr(0, 1) : "", l = m.replace(/[dmy\s+]/g, ""), l = 0 < l.length ? l.substr(0, 1) : ""; g != l && (m = 0 < l.length ? m.replace(new RegExp(l, "g"), 0 < g.length ? g : " ") : m.replace(/\s+/g, 0 < g.length ? g : " ")); 0 == g.length && (g = /\s+/); m = m.split(g); a = a.split(g); for (g = 0; g < m.length; g++) switch (k = h.trim(m[g]).substr(0, 1), l = h.trim(a[g]), k) {
                        case "d": c = Number(l.replace(/\D/g, "")); break; case "m": if (isNaN(l)) {
                            l = l.toLowerCase(); for (k = 0; k < b.shortMonthNames.length; k++) if (b.shortMonthNames[k].toLowerCase() == l) { e = k; break } if (void 0 ==
                            e) for (k = 0; k < b.shortMonthNames.length; k++) if (b.monthNames[k].toLowerCase() == l) { e = k; break }
                        } else e = Number(l) - 1; break; case "y": f = Number(l); k = 100 > f; if (!k) break; f = f >= b.earliest20thCenturyYear - 1900 ? 1900 : 2E3; f = Number(l) + f
                    } return isNaN(f) || isNaN(e) || isNaN(c) || 0 > f || 0 > e || 1 > c ? null : d.newDSTSafeDate(f, e, c)
                }, getDateError: function (a, c) {
                    if (c && b.useCompanionDateAsMin) var e = d.dateFromInput(b.companionPicker); var f = d.getEffectiveMaxDate(); return b.minDate && b.minDate > a || e && e > a ? e && e > b.minDate ? b.lessThanCompanionDateErrorMessage(b.fieldName,
                    d.getDateString(e)) : b.minDateErrorMessage(b.fieldName, d.getDateString(b.minDate)) : f && f < a ? b.maxDateErrorMessage(b.fieldName, d.getDateString(f)) : null
                }, getDateString: function (a) { var c = b.dateFormat.replace(/(?:d+|m+|y+)/g, function (a) { return "#{" + a + "}" }), e = a.getDate(), f = a.getMonth() + 1; a = a.getFullYear(); return d.sub(c, { d: e, dd: d.addLeadingZero(e), ddd: d.ordinalize(e), m: f, mm: d.addLeadingZero(f), mmm: b.shortMonthNames[f - 1], mmmm: b.monthNames[f - 1], yy: String(a).substr(2, 2), yyyy: a }) }, simplifyOrCorrectDate: function (a) {
                    var c =
                    new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1), b = new Date(a.getFullYear(), a.getMonth(), a.getDate() + 2), d = 23 == a.getHours() && 0 == a.getMinutes() && 0 == a.getSeconds() && 0 == a.getMilliseconds(), c = a.getTimezoneOffset() == c.getTimezoneOffset(), b = a.getTimezoneOffset() > b.getTimezoneOffset(); return d && c && b ? new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1, 1) : new Date(a.getFullYear(), a.getMonth(), a.getDate())
                }, ordinalize: function (a) { return 11 <= a % 100 && 13 >= a % 100 ? a + "th" : a + ({ 1: "st", 2: "nd", 3: "rd" }[a % 10] || "th") },
                addLeadingZero: function (a) { return 10 <= a ? a : "0" + String(a) }, getFieldByRelativeTabIndex: function (a, c) { var b = h(a.closest("form").find("a[href], button, input, select, textarea").filter(":visible").filter(":enabled").toArray().sort(function (a, c) { return (0 < a.tabIndex ? a.tabIndex : 1E3) - (0 < c.tabIndex ? c.tabIndex : 1E3) })); return b.eq((b.index(a) + c) % b.length) }, nextField: function (a) { return d.getFieldByRelativeTabIndex(a, 1) }, previousField: function (a) { return d.getFieldByRelativeTabIndex(a, -1) }, getEffectiveMaxDate: function () {
                    return "function" ===
                    typeof b.calculateMaxDateBasedOnCompanion ? d.getMaxDateBasedOnCompanion() : b.maxDate
                }, getMaxDateBasedOnCompanion: function () { var a = d.dateFromInput(b.companionPicker); return d.simplifyOrCorrectDate(b.calculateMaxDateBasedOnCompanion(a)) }, newDSTSafeDate: function (a, c, b) { a = new Date(a, c, b); return a.getDate() != b ? d.simplifyOrCorrectDate(a) : a }
            }; b.minDate && (b.minDate = d.simplifyOrCorrectDate(b.minDate)); b.maxDate && (b.maxDate = d.simplifyOrCorrectDate(b.maxDate)); return this.each(function () {
                var a = h(this).bind("focus.datepicker",
function(){b.showOnFocus&&a.triggerHandler("setup.datepicker")}).bind("blur.datepicker",function(){if(!b.preventManualEntry)if(0<h.trim(a.val()).length){var c=d.dateFromInput(a);if(c){var e=d.getDateError(c,!0);e?a.triggerHandler("displayDateError",e,[c]):(a.triggerHandler("writeOutDate",[c]),a.triggerHandler("removeDateError"))}else a.triggerHandler("displayDateError",b.generalDateErrorMessage(b.fieldName,a.val()),[a.val()])}else a.triggerHandler("displayDateError",b.noDateEnteredErrorMessage(b.fieldName))}).bind("click.datepicker",
                function () { a.triggerHandler("setup.datepicker") }).bind("setup.datepicker", function () { if (!a.data("datepicker")) { if (b.useCompanionDateAsMin) { var c = d.dateFromInput(b.companionPicker); !d.getDateError(c) && c > d.dateFromInput(a) && a.triggerHandler("writeOutDate", [c]) } a.triggerHandler("drawDatePicker") } b.preventManualEntry ? (a.val(a.val()), setTimeout(function () { a.trigger("blur.datepicker") }, 1)) : a.select() }).bind("drawDatePicker", function () {
                    var c = a.offset().top + a.outerHeight() + b.topOffset, e = h(d.sub("<div class='datepicker #{alignment}'><div class='datepicker-calendars'><a class='datepicker-show-past-month'>#{pastMonth}</a><a class='datepicker-show-next-month'>#{nextMonth}</a></div></div>",
                    { pastMonth: b.pastMonthSymbol, nextMonth: b.nextMonthSymbol, alignment: b.alignment })).css({ position: "absolute", display: "none", top: c + "px", "z-index": "99999" }); if (b.headerText || b.panelCloseText) c = h("<h3>" + b.headerText + "</h3><a class='" + b.panelCloseClass + "'>" + b.panelCloseText + "</a>"), e.prepend(c); var c = d.dateFromInput(a), f = d.dateFromInput(b.companionPicker), k; k = f && b.startCalendarAtCompanionDate ? f : c ? c : d.simplifyOrCorrectDate(new Date); for (var m = 0; m < b.numberOfMonths; m++) {
                        var g = d.newDSTSafeDate(k.getFullYear(),
                        k.getMonth() + m, 1); e.find(".datepicker-calendars").append(d.calendarForMonth(g.getMonth(), g.getFullYear(), c, f))
                    } a.data("datepicker", e); h("body").append(e); a.addClass("datepicker-open"); a.triggerHandler("addListeners"); e.fadeIn(b.fadeInSpeed, function () { a.triggerHandler("datePickerDrawn", [e]) }); a.triggerHandler("setDatePickersLeftProperty")
                }).bind("setDatePickersLeftProperty", function () {
                    var c = a.offset().left + b.leftOffset; "right" == b.alignment && (c = c + a.outerWidth() - a.data("datepicker").outerWidth()); a.data("datepicker").css("left",
                    c + "px")
                }).bind("addListeners", function () {
                    a.data("datepicker").bind("click.datepicker", function (c) { c = h(c.target).closest("a"); c.hasClass("datepicker-show-next-month") ? a.triggerHandler("showNextMonth") : c.hasClass("datepicker-show-past-month") ? a.triggerHandler("showPastMonth") : !c.closest("td").hasClass("disabled") && c.closest("td.day")[0] && c[0] && a.triggerHandler("selectDay", [c]); return !1 }); a.data("checkForClickOutside", function (c) { c.target != a[0] && a.triggerHandler("removeDatePicker") }); h(document).bind("click.datepicker",
                    a.data("checkForClickOutside")); a.data("checkForActionKeydowns", function (c) { if (27 == c.keyCode || 9 == c.keyCode) return 9 == c.keyCode && (c.shiftKey ? d.previousField(a).focus() : d.nextField(a).focus()), a.triggerHandler("removeDatePicker"), !1; if (8 == c.keyCode && b.preventManualEntry) return !1 }); h(document).bind("keydown.datepicker", a.data("checkForActionKeydowns")); a.data("checkForWindowResize", function () { a.triggerHandler("setDatePickersLeftProperty") }); h(window).bind("resize.datepicker", a.data("checkForWindowResize"))
                }).bind("showNextMonth",
                function () { var c = a.data("datepicker").find(".datepicker-calendar:last"), e = d.newDSTSafeDate(c.data("year"), c.data("month") + 1, 1); c.after(d.calendarForMonth(e.getMonth(), e.getFullYear(), d.dateFromInput(a), d.dateFromInput(b.companionPicker))); a.data("datepicker").find(".datepicker-calendar:first").remove() }).bind("showPastMonth", function () {
                    var c = a.data("datepicker").find(".datepicker-calendar:first"), e = d.newDSTSafeDate(c.data("year"), c.data("month") - 1, 1); c.before(d.calendarForMonth(e.getMonth(), e.getFullYear(),
                    d.dateFromInput(a), d.dateFromInput(b.companionPicker))); a.data("datepicker").find(".datepicker-calendar:last").remove()
                }).bind("selectDay", function (c, b) { var f = b.closest(".datepicker-calendar"), f = d.newDSTSafeDate(f.data("year"), f.data("month"), b.text()); a.data("datepicker").find(".selected").removeClass("selected"); b.closest("td").addClass("selected"); a.triggerHandler("writeOutDate", [f]); a.triggerHandler("removeDatePicker", [f]); a.triggerHandler("removeDateError") }).bind("writeOutDate", function (b, e) {
                    e &&
                    a.val(d.getDateString(e))
                }).bind("setCalculateMaxDateBasedOnCompanion", function (c, e) { b.calculateMaxDateBasedOnCompanion = e; if ("function" === typeof b.calculateMaxDateBasedOnCompanion) { var f = d.getMaxDateBasedOnCompanion(); d.dateFromInput(a) > f && a.triggerHandler("writeOutDate", f) } }).bind("removeDatePicker", function (c, e) {
                    a.data("datepicker") && (h(document).unbind("click.datepicker", a.data("checkForClickOutside")), h(document).unbind("keydown.datepicker", a.data("checkForActionKeydowns")), h(window).unbind("resize.datepicker",
                    a.data("checkForWindowResize")), a.data("datepicker").unbind("click.datepicker"), a.removeClass("datepicker-open"), a.triggerHandler("datePickerRemoveStart", [e, a.data("datepicker")]), setTimeout(function () { a.data("datepicker").fadeOut(b.fadeOutSpeed, function () { a.data("datepicker").remove(); a.data("datepicker", null); a.data("checkForClickOutside", null); e && b.focusNextFieldOnDateSelect && d.nextField(a).focus(); a.triggerHandler("datePickerRemoveDone", [e]) }) }, e ? b.delayHideOnSelectBy : 0))
                })
            })
        }
    })
})(jQuery);