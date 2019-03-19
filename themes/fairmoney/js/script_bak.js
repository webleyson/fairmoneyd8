var homePageController = function() {
	var self = this;
	this.objectId = 'home-page';

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.hideTooltipElements = function() {
		jQuery('#tooltip-gold, #tooltip-silver, #tooltip-bronze, #tooltip-credit-score, #tooltip-unsure-profile').hide();
	}

	this.initTooltipElements = function() {
		jQuery('#top-loan-gold-hover').hover(function(event) {
			self.showTooltipElement(this, '#tooltip-gold');
		}, function() {
			self.hideTooltipElement('#tooltip-gold');
		});

		jQuery('#top-loan-silver-hover').hover(function() {
			self.showTooltipElement(this, '#tooltip-silver');
		}, function() {
			self.hideTooltipElement('#tooltip-silver');
		});

		jQuery('#top-loan-bronze-hover').hover(function() {
			self.showTooltipElement(this, '#tooltip-bronze');
		}, function() {
			self.hideTooltipElement('#tooltip-bronze');
		});

		jQuery('#more-info-credit-score-hover').hover(function() {
			self.showTooltipElement(this, '#tooltip-credit-score');
		}, function() {
			self.hideTooltipElement('#tooltip-credit-score');
		});

		jQuery('#profile-gold-hover, #profile-silver-hover, #profile-bronze-hover').hover(function() {
			self.showTooltipElement(this, '#tooltip-unsure-profile');
		}, function() {
			self.hideTooltipElement('#tooltip-unsure-profile');
		});
	}

	this.showTooltipElement = function(hoverElement, tooltipElement) {
		jQuery(tooltipElement).stop().fadeIn(250);

		var leftPosition = (jQuery('.top-container').width() / 2) - (jQuery(tooltipElement).width() / 2);
		var topPosition = (jQuery('.top-container').height() / 2) - (jQuery(tooltipElement).height() / 2);

		jQuery(tooltipElement).css({
			left: leftPosition,
			top: topPosition
		});

		/*
		if (mouseTracking) {
			jQuery(hoverElement).off('mousemove');
			jQuery(hoverElement).on('mousemove' ,function(event) {
				if (hoverRight) {
					var leftPosition = event.pageX + 25;
				} else {
					var leftPosition = event.pageX - jQuery(tooltipElement).outerWidth() - 25;
				}

				jQuery(tooltipElement).css({
					left: leftPosition,
					top: event.pageY - (jQuery(tooltipElement).outerHeight() + 110)
				});
			});
		} else {
			if (hoverRight) {
				var leftPosition = jQuery(hoverElement).offset().left + 25;
			} else {
				var leftPosition = jQuery(hoverElement).offset().left - jQuery(tooltipElement).outerWidth() - 25;
			}

			jQuery(tooltipElement).css({
				left: leftPosition,
				top: jQuery(hoverElement).offset().top - (jQuery(tooltipElement).outerHeight() + 110)
			});
		};
		*/
	}

	this.hideTooltipElement = function(tooltipElement) {
		jQuery(tooltipElement).stop().fadeOut(250);
	}

	this.showSearchContainer = function() {
		jQuery('#quick-search-container').show();
	}

	this.hideSearchContainer = function() {
		jQuery('#quick-search-container').hide();
	}

	this.slideDownSearchContainer = function(speed, onComplete) {
		jQuery('#quick-search-container').slideDown(1000);
	}

	this.isHiddenSearchContainer = function() {
		return !jQuery('#quick-search-container').is(':visible');
	}

	this.showGoodProfileExplanation = function() {
		jQuery('#gold-explanation').show();
	}

	this.hideGoodProfileExplanation = function() {
		jQuery('#gold-explanation').hide();
	}

	this.showBadProfileExplanation = function() {
		jQuery('#silver-explanation').show();
	}

	this.hideBadProfileExplanation = function() {
		jQuery('#silver-explanation').hide();
	}

	this.showVeryBadProfileExplanation = function() {
		jQuery('#bronze-explanation').show();
	}

	this.hideVeryBadProfileExplanation = function() {
		jQuery('#bronze-explanation').hide();
	}

	this.selectProfile = function(name) {
		if (name == 'good') {
			jQuery('#quick-search-container #lender-status-hidden').val('Gold');

			jQuery('#quick-search-container .quick-search-header').addClass('gold').removeClass('silver').removeClass('bronze');
			jQuery('#quick-search-container .quick-search-header > .badge-title').html('Good credit');
		} else if (name == 'bad') {
			jQuery('#quick-search-container #lender-status-hidden').val('Silver');

			jQuery('#quick-search-container .quick-search-header').addClass('silver').removeClass('gold').removeClass('bronze');
			jQuery('#quick-search-container .quick-search-header > .badge-title').html('Bad credit');
		} else if (name == 'very-bad') {
			jQuery('#quick-search-container #lender-status-hidden').val('Bronze');

			jQuery('#quick-search-container .quick-search-header').addClass('bronze').removeClass('gold').removeClass('silver');
			jQuery('#quick-search-container .quick-search-header > .badge-title').html('Very bad credit');
		}
	}

	this.getSelectedProfileName = function() {
		if (jQuery('#quick-search-container .quick-search-header').hasClass('gold')) {
			return 'good';
		} else if (jQuery('#quick-search-container .quick-search-header').hasClass('silver')) {
			return 'bad';
		} else if (jQuery('#quick-search-container .quick-search-header').hasClass('bronze')) {
			return 'very-bad';
		}
	}

	this.fadeOutSearchContainer = function(speed, onComplete) {
		jQuery('#quick-search-container .content').fadeOut(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.fadeInSearchContainer = function(speed, onComplete) {
		jQuery('#quick-search-container .content').fadeIn(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.initProfileSearchFormElements = function() {
		jQuery('#search-form').parsley();

		jQuery('#search-form select').selectmenu({
			change: function(event, ui) {
				jQuery(this).parsley().validate();
			}
		});

		jQuery('#quick-search #lender-status-hidden').val('All');

		jQuery('#search-form #loan-amount-text').inputmask('decimal', {
			prefix: '�',
			allowMinus: false,
			autoGroup: true,
			groupSeparator: ',',
			groupSize: 3
		});

		jQuery('#search-form').submit(function(event) {
			self.onSearchFormSubmit(event, this);
		});
	}

	this.validateSearchForm = function() {
		return jQuery('#search-form').parsley().validate();
	}

	this.submitSearchForm = function() {
		var formData = jQuery('#search-form').serialize();
		var loanAmountValue = jQuery('#search-form #loan-amount-text').inputmask('unmaskedvalue');

		formData = formData.replace(/loan_amount=[^\&]*/, 'loan_amount=' + loanAmountValue);
		formData += '&action=Search';

		var submitURL = Drupal.settings.basePath + 'loans?' + formData;

		window.location.href = submitURL;
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.hideTooltipElements();
		this.hideSearchContainer();
		this.hideGoodProfileExplanation();
		this.hideBadProfileExplanation();
		this.hideVeryBadProfileExplanation();

		this.initTooltipElements();
		this.initProfileSearchFormElements();

		jQuery('#gold-credit-profile-btn, #gold-credit-profile-lnk-1, #gold-credit-profile-lnk-2, #gold-credit-profile-lnk-3').click(function(event) {
			self.onGoodProfileClick(event, this);
		});

		jQuery('#silver-credit-profile-btn, #silver-credit-profile-lnk-1, #silver-credit-profile-lnk-2, #silver-credit-profile-lnk-3').click(function(event) {
			self.onBadProfileClick(event, this);
		});

		jQuery('#bronze-credit-profile-btn, #bronze-credit-profile-lnk-1, bronze-credit-profile-lnk-2, bronze-credit-profile-lnk-3').click(function(event) {
			self.onVeryBadProfileClick(event, this);
		});
	}

	this.onGoodProfileClick = function(event, senderElement) {
		event.preventDefault();

		if (this.getSelectedProfileName() == 'good') {
			return false;
		}

		if (this.isHiddenSearchContainer()) {
			this.selectProfile('good');
			this.showGoodProfileExplanation();
			this.hideBadProfileExplanation();
			this.hideVeryBadProfileExplanation();

			this.slideDownSearchContainer(1000);
		} else {
			this.fadeOutSearchContainer(250, function() {
				self.selectProfile('good');
				self.showGoodProfileExplanation();
				self.hideBadProfileExplanation();
				self.hideVeryBadProfileExplanation();

				self.fadeInSearchContainer(1000);
			});
		}

		jQuery('html, body').animate({
			scrollTop: jQuery('#quick-search-container').offset().top
		}, 1000);
	}

	this.onBadProfileClick = function(event, senderElement) {
		event.preventDefault();

		if (this.getSelectedProfileName() == 'bad') {
			return false;
		}

		if (this.isHiddenSearchContainer()) {
			this.selectProfile('bad');
			this.hideGoodProfileExplanation();
			this.showBadProfileExplanation();
			this.hideVeryBadProfileExplanation();

			this.slideDownSearchContainer(1000);
		} else {
			this.fadeOutSearchContainer(250, function() {
				self.selectProfile('bad');
				self.hideGoodProfileExplanation();
				self.showBadProfileExplanation();
				self.hideVeryBadProfileExplanation();

				self.fadeInSearchContainer(1000);
			});
		}

		jQuery('html, body').animate({
			scrollTop: jQuery('#quick-search-container').offset().top
		}, 1000);
	}

	this.onVeryBadProfileClick = function(event, senderElement) {
		event.preventDefault();

		if (this.getSelectedProfileName() == 'very-bad') {
			return false;
		}

		if (this.isHiddenSearchContainer()) {
			this.selectProfile('very-bad');
			this.hideGoodProfileExplanation();
			this.hideBadProfileExplanation();
			this.showVeryBadProfileExplanation();

			this.slideDownSearchContainer(1000);
		} else {
			this.fadeOutSearchContainer(250, function() {
				self.selectProfile('very-bad');
				self.hideGoodProfileExplanation();
				self.hideBadProfileExplanation();
				self.showVeryBadProfileExplanation();

				self.fadeInSearchContainer(1000);
			});
		}

		jQuery('html, body').animate({
			scrollTop: jQuery('#quick-search-container').offset().top
		}, 1000);
	}

	this.onSearchFormSubmit = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.submitSearchForm();
	}
	/* */

	this.init();
}

var loanSearchController = function() {
	var self = this;
	this.objectId = 'loan-search';

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.initSearchFormElements = function() {
		jQuery('#search-form').parsley();

		jQuery('#search-form select').selectmenu({
			change: function(event, ui) {
				jQuery(this).parsley().validate();
			}
		});

		jQuery('#search-form .radios').buttonset();
		jQuery('#search-form .checkboxes').buttonset();

		jQuery('#search-form #loan-amount-text').inputmask('decimal', {
			prefix: '�',
			allowMinus: false,
			autoGroup: true,
			groupSeparator: ',',
			groupSize: 3
		});

		jQuery('#search-form #loan-period-text').inputmask('decimal');

		jQuery('#search-form input[name="loan_attributes[]"]').change(function(event) {
			if (!self.isHiddenSearchResultContainer()) {
				if (self.validateSearchForm()) {
					self.onSearchFormSubmit(event, this);
				}
			}
		});

		jQuery('#search-form').submit(function(event) {
			if (self.validateSearchForm()) {
				self.onSearchFormSubmit(event, this);
			}
		});
	}

	this.validateSearchForm = function() {
		return jQuery('#search-form').parsley().validate();
	}

	this.submitSearchForm = function(onDone) {
		this.hideSearchResultContainer();
		this.showSearchResultLoader();

		var formData = jQuery('#search-form').serialize();
		var loanAmountValue = jQuery('#search-form #loan-amount-text').inputmask('unmaskedvalue');

		formData = formData.replace(/loan_amount=[^\&]*/, 'loan_amount=' + loanAmountValue);

		if (jQuery('#result-metadata').length > 0) {
			var resultMetadataElement = jQuery('#result-metadata');
			var brokerReference = jQuery(resultMetadataElement).find('[data-key=broker-reference]').attr('data-value');

			if (brokerReference != '') {
				formData += '&broker_reference=' + brokerReference;
			}
		}

		formData += '&action=Search';

		var submitURL = Drupal.settings.basePath + 'loans/result';

		jQuery.ajax({
			type: 'POST',
			url: submitURL,
			data: formData,
			dataType: 'html',
			timeout: 3 * 60 * 1000,
			cache: false
		}).done(function(html) {
			jQuery('#search-result').html(html);

			if (typeof onDone == 'function') {
				onDone();
			}
		});
	}

	this.showSearchResultLoader = function() {
		jQuery('#search-result-loader').fadeIn(150);
	}

	this.hideSearchResultLoader = function() {
		jQuery('#search-result-loader').fadeOut(150);
	}

	this.showSearchResultContainer = function() {
		jQuery('#search-result-container').fadeIn(150);
	}

	this.hideSearchResultContainer = function() {
		jQuery('#search-result-container').fadeOut(150);
	}

	this.isHiddenSearchResultContainer = function() {
		return !jQuery('#search-result-container').is(':visible');
	}

	this.initSearchResultElements = function() {
		this.hideAllMoreDetailsContainers();

		jQuery('#search-result .apply-btn').click(function(event) {
			self.onApplyClick(event, this);
		});

		jQuery('#search-result .smart-search-btn').click(function(event) {
			self.onSmartSearchClick(event, this);
		});

		jQuery('#search-result .more-details').click(function(event) {
			self.onMoreDetailsClick(event, this);
		});
	}

	this.showApplyConfirmDialog = function(itemIndex) {
		var resultMetadataElement = jQuery('#result-metadata');
		var itemMetadataElement = jQuery('#item-metadata-' + itemIndex);

		var brokerReference = jQuery(resultMetadataElement).find('[data-key=broker-reference]').attr('data-value');
		var lenderOptionId = jQuery(itemMetadataElement).find('[data-key=lender-option-id]').attr('data-value');
		var financeOptionId = jQuery(itemMetadataElement).find('[data-key=finance-option-id]').attr('data-value');

		var fulfilmentCode = jQuery(itemMetadataElement).find('[data-key=fulfilment-code]').attr('data-value');
		var fulfilmentDescription = jQuery(itemMetadataElement).find('[data-key=fulfilment-description]').attr('data-value');
		var fulfilmentApplyPrompt = jQuery(itemMetadataElement).find('[data-key=fulfilment-apply-prompt]').attr('data-value');
		var fulfilmentHelpMessage = jQuery(itemMetadataElement).find('[data-key=fulfilment-help-message]').attr('data-value');

		jQuery('#confirm-dialog').html('');
		jQuery('#confirm-dialog').append(
			'<form id="apply-form" action="' + Drupal.settings.basePath + 'loans/apply' + '" method="post" target="_blank">' +
				'<input id="broker-reference-hidden" name="broker_reference" type="hidden" value="' + brokerReference + '" />' +
				'<input id="lender-option-id-hidden" name="lender_option_id" type="hidden" value="' + lenderOptionId + '" />' +
				'<input id="finance-option-id-hidden" name="finance_option_id" type="hidden" value="' + financeOptionId + '" />' +
				'<input name="action" type="hidden" value="Request" />' +
			'</form>'
		);

		jQuery('#confirm-dialog').append('<p>' + fulfilmentApplyPrompt + '</p>');

		jQuery('#confirm-dialog').dialog({
			title: 'Apply directly',
			resizable: false,
			width: 500,
			height: 'auto',
			modal: true,
			autoOpen: true,
			draggable: false,
			buttons: [
				{
					text: 'Proceed',
					click: function(event) {
						self.onApplyProceedClick();

						jQuery(this).dialog('close');
					}
				},
				{
					text: 'Cancel',
					click: function(event) {
						jQuery(this).dialog('close');
					}
				}
			],
			open: function() {
				jQuery('body').css('overflow', 'hidden');
				jQuery(this).next('div').find('.ui-button:first').addClass('proceed');
			},
			beforeClose: function() {
				jQuery('body').css('overflow', 'auto');
			}
		});
	}

	this.submitApplyForm = function() {
		jQuery('#apply-form').submit();
	}

	this.redirectToSmartSearch = function(itemIndex) {
		var itemMetadataElement = jQuery('#item-metadata-' + itemIndex);

		var loanAmount = jQuery(itemMetadataElement).find('[data-key=loan-amount]').attr('data-value');
		var loanPeriod = jQuery(itemMetadataElement).find('[data-key=loan-period]').attr('data-value');

		var redirectURL = Drupal.settings.basePath + 'loans/smart-search?loan_amount=' + loanAmount + '&loan_period=' + loanPeriod;

		window.location.href = redirectURL;
	}

	this.slideToggleMoreDetailsContainer = function(itemIndex) {
		var moreDetailsContainer = jQuery('#more-details-container-' + itemIndex);

		jQuery(moreDetailsContainer).slideToggle(250);
	}

	this.hideAllMoreDetailsContainers = function() {
		jQuery('.more-details-container').hide();
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.hideSearchResultLoader();
		this.hideSearchResultContainer();

		this.initSearchFormElements();

		if (jQuery('#search-form').attr('validate-on-startup') == 'true') {
			this.validateSearchForm();
		}

		if (jQuery('#search-form').attr('submit-on-startup') == 'true') {
			this.submitSearchForm(function() {
				self.initSearchResultElements();

				self.hideSearchResultLoader();
				self.showSearchResultContainer();
			});
		}
	}

	this.onSearchFormSubmit = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.submitSearchForm(function() {
			self.initSearchResultElements();

			self.hideSearchResultLoader();
			self.showSearchResultContainer();
		});
	}

	this.onSmartSearchClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		this.redirectToSmartSearch(itemIndex);
	}

	this.onMoreDetailsClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		this.slideToggleMoreDetailsContainer(itemIndex);
	}

	this.onApplyClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		this.showApplyConfirmDialog(itemIndex);
	}

	this.onApplyProceedClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.submitApplyForm();
	}
	/* */

	this.init();
}

var loanSmartSearchController = function() {
	var self = this;
	this.objectId = 'loan-smart-search';

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.showSearchForm = function() {
		jQuery('#smart-search-form').fadeIn(150);
	}

	this.hideSearchForm = function() {
		jQuery('#smart-search-form').fadeOut(150);
	}

	this.initSearchFormElements = function() {
		jQuery('#smart-search-form').parsley();

		jQuery('#smart-search-form select').selectmenu({
			change: function(event, ui) {
				jQuery(this).parsley().validate();
			}
		});

		jQuery('#smart-search-form .radios').buttonset();
		jQuery('#smart-search-form .checkboxes').buttonset();

		jQuery('#smart-search-form #loan-amount-text, #smart-search-form #mortgage-balance-text, #smart-search-form #property-value-text, #smart-search-form #monthly-mortgage-repayment-text, #smart-search-form #homeowner-loan-balance-text, #smart-search-form #monthly-homeowner-loan-payment-text, #smart-search-form #annual-income-text, #smart-search-form #loan-amount-alt-text').inputmask('decimal', {
			prefix: '�',
			allowMinus: false,
			autoGroup: true,
			groupSeparator: ',',
			groupSize: 3
		});

		jQuery('#smart-search-form #loan-amount-text').keyup(function(event) {
			self.onLoanAmountChange(event, this);
		});

		jQuery('#smart-search-form #loan-period-text').inputmask('decimal');
		jQuery('#smart-search-form #loan-period-text').keyup(function(event) {
			self.onLoanPeriodChange(event, this);
		});

		jQuery('#smart-search-form #find-address').click(function(event) {
			self.onFindAddressClick(event, this);
		});

		jQuery('#smart-search-form #select-address').click(function(event) {
			self.onSelectAddressClick(event, this);
		});

		jQuery('#smart-search-form #house-name-text, form #house-number-text').change(function(event) {
			self.onHouseNameOrNumberChange(event, this);

			jQuery('#house-name-text').parsley().validate();
			jQuery('#house-number-text').parsley().validate();
		});

		jQuery('#smart-search-form input[name=homeowner]').change(function(event) {
			self.onHomeownerChange(event, this);
		});

		jQuery('#smart-search-form input[name=homeowner_loan]').change(function(event) {
			self.onHomeownerLoanChange(event, this);
		});

		jQuery('#smart-search-form #loan-amount-alt-text').keyup(function(event) {
			self.onLoanAmountAltChange(event, this);
		});

		jQuery('#smart-search-form #loan-period-alt-text').inputmask('decimal');
		jQuery('#smart-search-form #loan-period-alt-text').keyup(function(event) {
			self.onLoanPeriodAltChange(event, this);
		});

		jQuery('#smart-search-form #clear-btn').click(function(event) {
			self.onClearDetailsClick(event, this);
		});

		jQuery('#smart-search-form input[name="loan_attributes[]"]').change(function(event) {
			if (!self.isHiddenSearchResultContainer()) {
				if (self.validateSearchForm()) {
					self.onSearchFormSubmit(event, this);
				}
			}
		});

		jQuery('#smart-search-form').submit(function(event) {
			if (self.validateSearchForm()) {
				self.onSearchFormSubmit(event, this);
			}
		});
	}

	this.validateSearchForm = function() {
		return jQuery('#smart-search-form').parsley().validate();
	}

	this.submitSearchForm = function(onDone) {
		this.hideSearchResultContainer();
		this.showSearchResultLoader();

		var formData = jQuery('#smart-search-form').serialize();
		var loanAmountValue = jQuery('#loan-amount-text').inputmask('unmaskedvalue');
		var mortgageBalanceValue = jQuery('#mortgage-balance-text').inputmask('unmaskedvalue');
		var propertyValue = jQuery('#property-value-text').inputmask('unmaskedvalue');
		var monthlyMortgageRepaymentValue = jQuery('#monthly-mortgage-repayment-text').inputmask('unmaskedvalue');
		var annualIncomeValue = jQuery('#annual-income-text').inputmask('unmaskedvalue');

		formData = formData.replace(/loan_amount=[^\&]*/, 'loan_amount=' + loanAmountValue);
		formData = formData.replace(/mortgage_balance=[^\&]*/, 'mortgage_balance=' + mortgageBalanceValue);
		formData = formData.replace(/property_value=[^\&]*/, 'property_value=' + propertyValue);
		formData = formData.replace(/monthly_mortgage_repayment=[^\&]*/, 'monthly_mortgage_repayment=' + monthlyMortgageRepaymentValue);
		formData = formData.replace(/annual_income=[^\&]*/, 'annual_income=' + annualIncomeValue);

		if (jQuery('#result-metadata').length > 0) {
			var resultMetadataElement = jQuery('#result-metadata');
			var brokerReference = jQuery(resultMetadataElement).find('[data-key=broker-reference]').attr('data-value');

			if (brokerReference != '') {
				formData += '&broker_reference=' + brokerReference;
			}
		}

		formData += '&action=Search';

		//http://fairmoney.com/loans/smart-search?loan_amount=10000&loan_period=60&loan_purpose=Car&title=Mrs&first_name=Samantha&middle_name=&surname=Punchard&phone=07512345678&email=test%40test.com&dob_day=1&dob_month=8&dob_year=1973&marital_status=Married&postcode=BA133BN&house_name=&house_number=199&street_name=High+Street&post_town=Westbury&locality=&county=Wilts&movein_month=2&movein_year=2008&homeowner=Y&ex_council=N&mortgage_balance=50000&property_value=350000&monthly_mortgage_repayment=10000&property_type=House&homeowner_loan=N&homeowner_loan_balance=&monthly_homeowner_loan_payment=&consolidate_homeowner_loan=N&employment_status=Employed&employment_start_month=1&employment_start_year=2014&annual_income=50000&missed_repayment=N&had_ccj=N&had_iva=N&action=Search
		var submitURL = Drupal.settings.basePath + 'loans/smart-search/result';

		jQuery.ajax({
			type: 'POST',
			url: submitURL,
			data: formData,
			dataType: 'html',
			timeout: 3 * 60 * 1000,
			cache: false
		}).done(function(html) {
			jQuery('#search-result').html(html);

			if (typeof onDone == 'function') {
				onDone();
			}
		});
	}

	this.clearSearchForm = function() {
		jQuery('#smart-search-form').find('input[type=text]').val('');
		jQuery('#smart-search-form').find('select').val('').selectmenu('refresh');

		jQuery('#smart-search-form').find('input[type=radio]').each(function(index, element) {
			if (jQuery(element).attr('value') == 'N') {
				jQuery(element).prop('checked', true);
			} else {
				jQuery(element).prop('checked', false);
			}
		});

		jQuery('#smart-search-form').find('select').selectmenu('refresh');
		jQuery('#smart-search-form .radios').buttonset('refresh');
		jQuery('#smart-search-form .checkboxes').buttonset('refresh');

		this.onHomeownerChange();
		this.onHomeownerLoanChange();
	}

	this.showLoanDetailsContainer = function() {
		jQuery('#loan-details-container').show();
	}

	this.hideLoanDetailsContainer = function() {
		jQuery('#loan-details-container').hide();
	}

	this.showYourDetailsContainer = function() {
		jQuery('#your-details-container').show();
	}

	this.slideDownYourDetailsContainer = function(speed) {
		jQuery('#your-details-container').show(0);

		jQuery('html, body').stop().animate({
			scrollTop: jQuery('#your-details-container').offset().top,
		}, speed, 'easeOutCirc');
	}

	this.hideYourDetailsContainer = function() {
		jQuery('#your-details-container').hide();
	}

	this.showEmploymentStatusContainer = function() {
		jQuery('#employment-status-container').show();
	}

	this.slideDownEmploymentStatusContainer = function(speed) {
		jQuery('#employment-status-container').show(0);

		jQuery('html, body').stop().animate({
			scrollTop: jQuery('#employment-status-container').offset().top,
		}, speed, 'easeOutCirc');
	}

	this.hideEmploymentStatusContainer = function() {
		jQuery('#employment-status-container').hide();
	}

	this.showPropertyDetailsContainer = function(speed) {
		jQuery('#property-details-container').show();
	}

	this.slideDownPropertyDetailsContainer = function(speed) {
		jQuery('#property-details-container').show(0);

		jQuery('html, body').stop().animate({
			scrollTop: jQuery('#property-details-container').offset().top,
		}, speed, 'easeOutCirc');
	}

	this.hidePropertyDetailsContainer = function() {
		jQuery('#property-details-container').hide();
	}

	this.createAddressElement = function() {
		var addressElement = '<select id="address" name="address"></select>';

		jQuery('#select-address').after(addressElement);
		jQuery('#address').selectmenu();
	}

	this.destroyAddressElement = function() {
		jQuery('#address').selectmenu('destroy');
		jQuery('#address').remove();
	}

	this.updateAddressElement = function() {
		jQuery('#address').selectmenu('refresh');
	}

	this.addAddress = function(houseName, houseNumber, streetName, postTown, locality, county) {
		var title = ((houseName != '') ? houseName + ', '  : '') + ((houseNumber != '') ? houseNumber + ', ' : '') + ((streetName != '') ? streetName + ', ' : '') + ((postTown != '') ? postTown + ', ' : '') + ((locality != '') ? locality + ', ' : '') + ((county != '') ? county + ', ' : '');
		title = title.substr(0, title.length - 2);

		var addressOptionElement = '<option value="" data-house-name="' + houseName + '" data-house-number="' + houseNumber + '" data-street-name="' + streetName + '" data-post-town="' + postTown + '" data-locality="' + locality + '" data-county="' + county + '">' + title + '</option>'

		jQuery('#address').append(addressOptionElement);
	}

	this.addAddresses = function(data) {
		if (data.length > 0) {
			for (i = 0; i < data.length; i++) {
				this.addAddress(data[i].house_name, data[i].house_number, data[i].street_name, data[i].post_town, data[i].locality, data[i].county);
			}

			this.updateAddressElement();
			this.showSelectAddressElement();
		} else {
			this.destroyAddressElement();
			this.hideSelectAddressElement();
		}
	}

	this.showAddressLoaderElement = function() {
		jQuery('#address-loader').show();
	}

	this.hideAddressLoaderElement = function() {
		jQuery('#address-loader').hide();
	}

	this.setAddressErrorMessage = function(message) {
		jQuery('#address-error').text(message);
	}

	this.showSelectAddressElement = function() {
		jQuery('#select-address').show();
	}

	this.hideSelectAddressElement = function() {
		jQuery('#select-address').hide();
	}

	this.prepropulateAddress = function(houseName, houseNumber, streetName, postTown, locality, county) {
		jQuery('#house-name-text').val('');
		jQuery('#house-number-text').val('');
		jQuery('#street-name-text').val('');
		jQuery('#post-town-text').val('');
		jQuery('#locality-text').val('');
		jQuery('#county-text').val('');

		jQuery('#house-name-text').val(houseName);
		jQuery('#house-number-text').val(houseNumber);
		jQuery('#street-name-text').val(streetName);
		jQuery('#post-town-text').val(postTown);
		jQuery('#locality-text').val(locality);
		jQuery('#county-text').val(county);
	}

	this.showHomeownerContainer = function() {
		jQuery('#homeowner-container').show();
	}

	this.hideHomeownerContainer = function() {
		jQuery('#homeowner-container').hide();
	}

	this.showHomeownerLoanContainer = function() {
		jQuery('#homeowner-loan-container').show();
	}

	this.hideHomeownerLoanContainer = function() {
		jQuery('#homeowner-loan-container').hide();
	}

	this.showProfileContainer = function() {
		jQuery('#profile-container').show();
	}

	this.hideProfileContainer = function() {
		jQuery('#profile-container').hide();
	}

	this.showFilterContainer = function() {
		jQuery('#filter-container').show();
	}

	this.hideFilterContainer = function() {
		jQuery('#filter-container').hide();
	}

	this.showSearchResultLoader = function() {
		jQuery('#search-result-loader').fadeIn(150);
	}

	this.hideSearchResultLoader = function() {
		jQuery('#search-result-loader').fadeOut(150);
	}

	this.showSearchResultContainer = function() {
		jQuery('#search-result-container').fadeIn(150);
	}

	this.hideSearchResultContainer = function() {
		jQuery('#search-result-container').fadeOut(150);
	}

	this.isHiddenSearchResultContainer = function() {
		return !jQuery('#search-result-container').is(':visible');
	}

	this.hideMoreDetailsContainers = function() {
		jQuery('.more-details-container').hide();
	}

	this.initSearchResultElements = function() {
		this.hideMoreDetailsContainers();

		jQuery('#amend-details-btn').click(function(event) {
			self.onAmendDetailsClick(event, this);
		});

		jQuery('#search-result .apply-btn').click(function(event) {
			self.onApplyClick(event, this);
		});

		jQuery('#search-result .more-details').click(function(event) {
			self.onMoreDetailsClick(event, this);
		});
	}

	this.showClearConfirmDialog = function() {
		jQuery('#confirm-dialog').html('<h3>Are you sure you want to clear the form?</h3>');

		jQuery('#confirm-dialog').dialog({
			title: 'Clear details',
			resizable: false,
			width: 500,
			height: 'auto',
			modal: true,
			autoOpen: true,
			draggable: false,
			buttons: [
				{
					text: 'Yes',
					click: function(event) {
						self.clearSearchForm();

						jQuery(this).dialog('close');
					}
				},
				{
					text: 'No',
					click: function(event) {
						jQuery(this).dialog('close');
					}
				}
			],
			open: function() {
				jQuery('body').css('overflow', 'hidden');
				jQuery(this).next('div').find('.ui-button:first').addClass('proceed');
			},
			beforeClose: function() {
				jQuery('body').css('overflow', 'auto');
			}
		});
	}

	this.showApplyConfirmDialog = function(itemIndex) {
		var resultMetadataElement = jQuery('#result-metadata');
		var itemMetadataElement = jQuery('#item-metadata-' + itemIndex);

		var brokerReference = jQuery(resultMetadataElement).find('[data-key=broker-reference]').attr('data-value');
		var lenderOptionId = jQuery(itemMetadataElement).find('[data-key=lender-option-id]').attr('data-value');
		var financeOptionId = jQuery(itemMetadataElement).find('[data-key=finance-option-id]').attr('data-value');

		var fulfilmentCode = jQuery(itemMetadataElement).find('[data-key=fulfilment-code]').attr('data-value');
		var fulfilmentDescription = jQuery(itemMetadataElement).find('[data-key=fulfilment-description]').attr('data-value');
		var fulfilmentApplyPrompt = jQuery(itemMetadataElement).find('[data-key=fulfilment-apply-prompt]').attr('data-value');
		var fulfilmentHelpMessage = jQuery(itemMetadataElement).find('[data-key=fulfilment-help-message]').attr('data-value');

		jQuery('#confirm-dialog').html('');
		jQuery('#confirm-dialog').append(
			'<form id="apply-form" action="' + Drupal.settings.basePath + 'loans/apply' + '" method="post" target="_blank">' +
				'<input id="broker-reference-hidden" name="broker_reference" type="hidden" value="' + brokerReference + '" />' +
				'<input id="lender-option-id-hidden" name="lender_option_id" type="hidden" value="' + lenderOptionId + '" />' +
				'<input id="finance-option-id-hidden" name="finance_option_id" type="hidden" value="' + financeOptionId + '" />' +
				'<input name="action" type="hidden" value="Request" />' +
			'</form>'
		);

		jQuery('#confirm-dialog').append('<p>' + fulfilmentApplyPrompt + '</p>');

		jQuery('#confirm-dialog').dialog({
			title: 'Apply',
			resizable: false,
			width: 500,
			height: 'auto',
			modal: true,
			autoOpen: true,
			draggable: false,
			buttons: [
				{
					text: 'Proceed',
					click: function(event) {
						self.onApplyProceedClick();

						jQuery(this).dialog('close');
					}
				},
				{
					text: 'Cancel',
					click: function(event) {
						jQuery(this).dialog('close');
					}
				}
			],
			open: function() {
				jQuery('body').css('overflow', 'hidden');
				jQuery(this).next('div').find('.ui-button:first').addClass('proceed');
			},
			beforeClose: function() {
				jQuery('body').css('overflow', 'auto');
			}
		});
	}

	this.showMoreDetailsPopup = function(itemIndex) {
		var itemMetadataElement = jQuery('#item-metadata-' + itemIndex);

		var qualifyCriterias = jQuery(itemMetadataElement).find('[data-key=qualify-criterias]').html();
		var termsAndConditions = jQuery(itemMetadataElement).find('[data-key=terms-and-conditions]').html();

		jQuery('#more-details-popup').html('');
		jQuery('#more-details-popup').append(qualifyCriterias);
		jQuery('#more-details-popup').append(termsAndConditions);

		jQuery('#more-details-popup').dialog({
			title: 'More details',
			resizable: false,
			width: 800,
			height: 600,
			modal: true,
			autoOpen: true,
			draggable: false,
			buttons: [
				{
					text: 'Close',
					click: function(event) {
						jQuery(this).dialog('close');
					}
				}
			],
			open: function() {
				jQuery('body').css('overflow', 'hidden');
				jQuery(this).scrollTop(0);
			},
			beforeClose: function() {
				jQuery('body').css('overflow', 'auto');
			}
		});
	}

	this.submitApplyForm = function() {
		jQuery('#apply-form').submit();
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.hideYourDetailsContainer();
		this.hideEmploymentStatusContainer();
		this.hidePropertyDetailsContainer();
		this.hideProfileContainer();
		this.hideFilterContainer();

		this.hideAddressLoaderElement();
		this.setAddressErrorMessage('');
		this.hideSelectAddressElement();
		this.hideSearchResultLoader();
		this.hideSearchResultContainer();

		this.initSearchFormElements();

		this.onHouseNameOrNumberChange();
		this.onHomeownerChange();
		this.onHomeownerLoanChange();

		jQuery('#loan-details-container .next-btn').click(function(event) {
			self.onLoanDetailsNextClick(event, this);
		});

		jQuery('#your-details-container .next-btn').click(function(event) {
			self.onYourDetailsNextClick(event, this);
		});

		jQuery('#employment-status-container .next-btn').click(function(event) {
			self.onEmploymentStatusNextClick(event, this);
		});

		if (jQuery('#smart-search-form').attr('validate-on-startup') == 'true') {
			this.showYourDetailsContainer();
			this.showEmploymentStatusContainer();
			this.showPropertyDetailsContainer();

			this.validateSearchForm();
		}

		if (jQuery('#smart-search-form').attr('submit-on-startup') == 'true') {
			this.hideSearchForm();
			this.submitSearchForm(function() {
				self.initSearchResultElements();

				self.hideSearchResultLoader();

				self.showSearchForm();
				self.hideLoanDetailsContainer();
				self.hideYourDetailsContainer();
				self.hideEmploymentStatusContainer();
				self.hidePropertyDetailsContainer();

				self.showProfileContainer();
				self.showFilterContainer();
				self.showSearchResultContainer();
			});
		}
	}

	this.onLoanDetailsNextClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.slideDownYourDetailsContainer(2500);
	}

	this.onYourDetailsNextClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.slideDownEmploymentStatusContainer(2500);
	}

	this.onEmploymentStatusNextClick = function(event, senderElemen) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.slideDownPropertyDetailsContainer(2500);
	}

	this.onLoanAmountChange = function(event, senderElement) {
		var value = jQuery(senderElement).val();
		jQuery('#loan-amount-alt-text').val(value);
	}

	this.onLoanPeriodChange = function(event, senderElement) {
		var value = jQuery(senderElement).val();
		jQuery('#loan-period-alt-text').val(value);
	}

	this.onHouseNameOrNumberChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var houseNameElement = jQuery('#house-name-text');
		var houseNumberElement = jQuery('#house-number-text');

		if (jQuery(houseNameElement).val() != '') {
			jQuery(houseNumberElement).attr('data-parsley-required', 'false');
		}

		if (jQuery(houseNameElement).val() == '') {
			jQuery(houseNumberElement).attr('data-parsley-required', 'true');
		}

		if (jQuery(houseNumberElement).val() != '') {
			jQuery(houseNameElement).attr('data-parsley-required', 'false');
		}

		if (jQuery(houseNumberElement).val() == '') {
			jQuery(houseNameElement).attr('data-parsley-required', 'true');
		}
	}

	this.onFindAddressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var postcodeValue = jQuery('#postcode-text').val();

		if (postcodeValue != '') {
			self.destroyAddressElement();
			self.setAddressErrorMessage('');
			self.hideSelectAddressElement();
			self.showAddressLoaderElement();

			jQuery.ajax({
				url: Drupal.settings.basePath + 'loans/find-address?postcode=' + postcodeValue,
				dataType: 'json',
				timeout: 1 * 60 * 1000,
				cache: false
			}).done(function(result) {
				if (result.is_error) {
					self.hideAddressLoaderElement();
					self.setAddressErrorMessage(result.error_message);
				} else {
					self.hideAddressLoaderElement();
					self.createAddressElement();

					if (result.data.length > 0) {
						self.addAddresses(result.data);
						self.updateAddressElement();
						self.showSelectAddressElement();
					} else {
						self.destroyAddressElement();
					}
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				self.hideAddressLoaderElement();
				self.setAddressErrorMessage(textStatus);
			});
		}
	}

	this.onSelectAddressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var selectedAddressElement = jQuery('#address').find('option:selected');

		var houseName = jQuery(selectedAddressElement).attr('data-house-name');
		var houseNumber = jQuery(selectedAddressElement).attr('data-house-number');
		var streetName = jQuery(selectedAddressElement).attr('data-street-name');
		var postTown = jQuery(selectedAddressElement).attr('data-post-town');
		var locality = jQuery(selectedAddressElement).attr('data-locality');
		var county = jQuery(selectedAddressElement).attr('data-county');

		this.prepropulateAddress(houseName, houseNumber, streetName, postTown, locality, county);

		this.onHouseNameOrNumberChange(event, senderElement);

		jQuery('#house-name-text').parsley().validate();
		jQuery('#house-number-text').parsley().validate();
	}

	this.onHomeownerChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var homeOwnerValue = jQuery('[name=homeowner]:checked').val();

		var mortgageBalanceElement = jQuery('#mortgage-balance-text');
		var propertyValueElement = jQuery('#property-value-text');
		var monthlyMortgageRepaymentElement = ('#monthly-mortgage-repayment-text');
		var propertyTypeElement = jQuery('#property-type-select');

		if (homeOwnerValue == 'Y') {
			jQuery(mortgageBalanceElement).attr('data-parsley-required', 'true');
			jQuery(propertyValueElement).attr('data-parsley-required', 'true');
			jQuery(monthlyMortgageRepaymentElement).attr('data-parsley-required', 'true');
			jQuery(propertyTypeElement).attr('data-parsley-required', 'true');

			this.showHomeownerContainer();
		} else {
			jQuery(mortgageBalanceElement).attr('data-parsley-required', 'false');
			jQuery(propertyValueElement).attr('data-parsley-required', 'false');
			jQuery(monthlyMortgageRepaymentElement).attr('data-parsley-required', 'false');
			jQuery(propertyTypeElement).attr('data-parsley-required', 'false');

			this.hideHomeownerContainer();
		}

		this.onHomeownerLoanChange();
	}

	this.onHomeownerLoanChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var homeOwnerLoanValue = jQuery('[name=homeowner_loan]:checked').val();

		var homeownerLoanBalanceElement = jQuery('#homeowner-loan-balance-text');
		var monthlyHomeownerLoanPaymentElement = jQuery('#monthly-homeowner-loan-payment-text');

		if (homeOwnerLoanValue == 'Y') {
			jQuery(homeownerLoanBalanceElement).attr('data-parsley-required', 'true');
			jQuery(monthlyHomeownerLoanPaymentElement).attr('data-parsley-required', 'true');

			this.showHomeownerLoanContainer();
		} else {
			jQuery(homeownerLoanBalanceElement).attr('data-parsley-required', 'false');
			jQuery(monthlyHomeownerLoanPaymentElement).attr('data-parsley-required', 'false');

			this.hideHomeownerLoanContainer();
		}
	}

	this.onLoanAmountAltChange = function(event, senderElement) {
		var value = jQuery(senderElement).val();
		jQuery('#loan-amount-text').val(value);
	}

	this.onLoanPeriodAltChange = function(event, senderElement) {
		var value = jQuery(senderElement).val();
		jQuery('#loan-period-text').val(value);
	}

	this.onClearDetailsClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.showClearConfirmDialog();
	}

	this.onSearchFormSubmit = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.hideSearchForm();
		this.submitSearchForm(function() {
			self.initSearchResultElements();

			self.hideSearchResultLoader();

			self.showSearchForm();
			self.hideLoanDetailsContainer();
			self.hideYourDetailsContainer();
			self.hideEmploymentStatusContainer();
			self.hidePropertyDetailsContainer();

			self.showProfileContainer();
			self.showFilterContainer();
			self.showSearchResultContainer();
		});
	}

	this.onAmendDetailsClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.hideSearchResultContainer();
		this.hideProfileContainer();
		this.hideFilterContainer();

		this.showSearchForm();
		this.showLoanDetailsContainer();
		this.showYourDetailsContainer();
		this.showEmploymentStatusContainer();
		this.showPropertyDetailsContainer();

		this.validateSearchForm();
	}

	this.onMoreDetailsClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		this.showMoreDetailsPopup(itemIndex);
	}

	this.onApplyClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		this.showApplyConfirmDialog(itemIndex);
	}

	this.onApplyProceedClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.submitApplyForm();
	}
	/* */

	this.init();
}

var loanApplyController = function() {
	var self = this;
	this.objectId = 'apply-page';

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.submitApplyRequestForm = function() {
		jQuery('#apply-request-form').submit();
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		if (jQuery('#apply-request-form').length > 0) {
			setTimeout(function() {
				self.submitApplyRequestForm();
			}, 1000);
		}
	}
	/* */

	this.init();
}

var faqPageController = function() {
	var self = this;
	this.objectId = 'faq-page';

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.hideAllFaqAnswers = function() {
		jQuery('.faq-answer').hide();
	}

	this.slideToggleFaqAnswer = function(itemId) {
		var faqItem = jQuery('#faq-item-' + itemId);

		jQuery(faqItem).find('.faq-answer').slideToggle(250);
		jQuery(faqItem).find('i').toggleClass('fa-minus').toggleClass('fa-plus');
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.hideAllFaqAnswers();

		jQuery('.faq-question').click(function(event) {
			self.onFaqQuestionClick(event, this);
		});
	}

	this.onFaqQuestionClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemId = jQuery(senderElement).parent('.faq-item').attr('data-id');

		this.slideToggleFaqAnswer(itemId);
	}
	/* */

	this.init();
}

var app = {
	homePageController: null,
	loanSearchController: null,
	loanSmartSearchController: null,
	loanApplyController: null,
	faqPageController: null,

	init: function() {
		var pathname = window.location.pathname;

		if (window.location.pathname == '/') {
			this.homePageController = new homePageController();
		} else if (pathname.match(/^\/loans(\/)?$/)) {
			this.loanSearchController = new loanSearchController();
		} else if (pathname.match(/^\/loans\/smart-search(\/)?$/)) {
			this.loanSmartSearchController = new loanSmartSearchController();
		} else if (pathname.match(/^\/loans\/apply(\/)?$/)) {
			this.loanApplyController = new loanApplyController();
		} else if (pathname.match(/^\/faq(\/)?$/)) {
			this.faqPageController = new faqPageController();
		}
	}
}

app.init();