var navMenuController = function() {
	var self = this;
	this.objectId = 'navigation';

	/* METHODS */
	this.init = function() {
		this.onViewInit();
	}

	this.slideToggleMenu = function() {
		jQuery('#navigation').slideToggle({
			speed: 1500,
			easing: 'easeInOutCirc'
		});
	}

	this.slideDownSubmenu = function(menuItem) {
		if (jQuery(menuItem).find('ul:not(.level-3)').length > 0) {
			jQuery(menuItem).css({borderBottomWidth: '0'});
			jQuery(menuItem).children('ul').stop().slideDown(1000, 'easeOutExpo');
		}
	}

	this.slideUpSubmenu = function(menuItem) {
		if (jQuery(menuItem).find('ul:not(.level-3)').length > 0) {
			jQuery(menuItem).css({borderBottomWidth: '3px'});
			jQuery(menuItem).children('ul').stop().slideUp(10, 'easeInOutExpo');
		}
	}
	/* */

	/* EVENTS */
	this.onViewInit = function() {
		jQuery('#header .nav-menu-btn').click(function(event) {
			self.onMenuClick(event, this);
		});

		jQuery('#navigation li').hover(function(event) {
			self.onItemHover(event, this);
		}, function(event) {
			self.onItemUnhover(event, this);
		});
	}

	this.onMenuClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.slideToggleMenu();
	}

	this.onItemHover = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.slideDownSubmenu(senderElement);
	}

	this.onItemUnhover = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.slideUpSubmenu(senderElement);
	}
	/* */
}

var homePageController = function() {
	var self = this;
	this.objectId = 'home-page';
	this.navMenu = new navMenuController();

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.showView = function() {
		jQuery('#page').show();
	}

	this.hideView = function() {
		jQuery('#page').hide()
	}

	this.hideTooltipElements = function() {
		jQuery('.tooltip').hide();
	}

	this.initTooltipElements = function() {
		jQuery('#top-loan-gold-hover').hover(function(event) {
			self.showTooltipElement(this, '#gold-tooltip', 'left', -25, 150);
		}, function() {
			// self.hideTooltipElement('#gold-tooltip');
		});

		jQuery('#top-loan-silver-hover').hover(function() {
			self.showTooltipElement(this, '#silver-tooltip', 'left', -25, 150);
		}, function() {
			self.hideTooltipElement('#silver-tooltip');
		});

		jQuery('#top-loan-bronze-hover').hover(function() {
			self.showTooltipElement(this, '#bronze-tooltip', 'left', -25, 150);
		}, function() {
			self.hideTooltipElement('#bronze-tooltip');
		});

		jQuery('#top-loan-gold-hover').hover(function(event) {
			self.showTooltipElement(this, '#gold-tooltip-new', 'left', 180, 70);
		}, function() {
			self.hideTooltipElement('#gold-tooltip-new');
		});

		jQuery('#top-loan-silver-hover').hover(function() {
			self.showTooltipElement(this, '#silver-tooltip-new', 'left', 180, 70);
		}, function() {
			self.hideTooltipElement('#silver-tooltip-new');
		});

		jQuery('#top-loan-bronze-hover').hover(function() {
			self.showTooltipElement(this, '#bronze-tooltip-new', 'left', 180, 70);
		}, function() {
			self.hideTooltipElement('#bronze-tooltip-new');
		});

		jQuery('#more-info-credit-score-hover').hover(function() {
			self.showTooltipElement(this, '#credit-score-tooltip', 'right', 10, -10);
		}, function() {
			self.hideTooltipElement('#credit-score-tooltip');
		});

		jQuery('#profile-gold-hover, #profile-silver-hover, #profile-bronze-hover').hover(function() {
			self.showTooltipElement(this, '#unsure-profile-tooltip', 'left', -10, -10);
		}, function() {
			self.hideTooltipElement('#unsure-profile-tooltip');
		});


		jQuery('#gold-tooltip, #silver-tooltip, #bronze-tooltip, #credit-score-tooltip, #unsure-profile-tooltip').click(function(event) {
			self.hideTooltipElement('#gold-tooltip, #silver-tooltip, #bronze-tooltip, #credit-score-tooltip, #unsure-profile-tooltip');
		});
	}

	this.showTooltipElement = function(hoverElement, tooltipElement, position, offsetLeft, offsetTop) {
		jQuery(tooltipElement).fadeIn(250);

		if (jQuery(window).width() >= 640) {
			if (position == 'left') {
				var leftPosition = jQuery(hoverElement).offset().left - jQuery(tooltipElement).outerWidth() + offsetLeft;
			} else {
				var leftPosition = jQuery(hoverElement).offset().left + jQuery(hoverElement).width() + offsetLeft;
			}
		} else {
			var leftPosition = (jQuery(window).width() / 2) - (jQuery(tooltipElement).innerWidth() / 2);
		}
		var topPosition = jQuery(hoverElement).offset().top - jQuery('#header').height() - jQuery(tooltipElement).outerHeight() + offsetTop;

		jQuery(tooltipElement).css({
			left: leftPosition,
			top: topPosition
		});
	}

	this.hideTooltipElement = function(tooltipElement) {
		jQuery(tooltipElement).fadeOut(250);
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
			jQuery('#quick-search-container .quick-search-header > .badge-title').html('Poor credit');
		} else if (name == 'very-bad') {
			jQuery('#quick-search-container #lender-status-hidden').val('Bronze');

			jQuery('#quick-search-container .quick-search-header').addClass('bronze').removeClass('gold').removeClass('silver');
			jQuery('#quick-search-container .quick-search-header > .badge-title').html('Bad credit');
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

	this.hideSearchContainer = function(speed, onComplete) {
		jQuery('#quick-search-container .content').fadeOut(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.showSearchContainer = function(speed, onComplete) {
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

		jQuery('#loan-amount-text').inputmask('integer', {
			prefix: '£',
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
		var loanAmountValue = jQuery('#loan-amount-text').inputmask('unmaskedvalue');

		formData = formData.replace(/loan_amount=[^\&]*/, 'loan_amount=' + loanAmountValue);
		formData += '&action=Search';

		var submitURL = Drupal.settings.basePath + 'loans?' + formData;
		window.location.href = submitURL;
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.navMenu.init();

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

		jQuery('#bronze-credit-profile-btn, #bronze-credit-profile-lnk-1, #bronze-credit-profile-lnk-2, #bronze-credit-profile-lnk-3').click(function(event) {
			self.onVeryBadProfileClick(event, this);
		});

		jQuery('html, body').scrollTop(0);

		this.showView();
	}

	this.onGoodProfileClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

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
			this.hideSearchContainer(150, function() {
				self.selectProfile('good');
				self.showGoodProfileExplanation();
				self.hideBadProfileExplanation();
				self.hideVeryBadProfileExplanation();

				self.showSearchContainer(1000);
			});
		}

		if (jQuery('#header').css('position') == 'fixed') {
			var topPosition = jQuery('#quick-search-container').offset().top - jQuery('#header').height();
		} else {
			var topPosition = jQuery('#quick-search-container').offset().top;
		}

		jQuery('html, body').animate({
			scrollTop: topPosition
		}, 1000);
	}

	this.onBadProfileClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

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
			this.hideSearchContainer(150, function() {
				self.selectProfile('bad');
				self.hideGoodProfileExplanation();
				self.showBadProfileExplanation();
				self.hideVeryBadProfileExplanation();

				self.showSearchContainer(1000);
			});
		}

		if (jQuery('#header').css('position') == 'fixed') {
			var topPosition = jQuery('#quick-search-container').offset().top - jQuery('#header').height();
		} else {
			var topPosition = jQuery('#quick-search-container').offset().top;
		}

		jQuery('html, body').animate({
			scrollTop: topPosition
		}, 1000);
	}

	this.onVeryBadProfileClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

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
			this.hideSearchContainer(150, function() {
				self.selectProfile('very-bad');
				self.hideGoodProfileExplanation();
				self.hideBadProfileExplanation();
				self.showVeryBadProfileExplanation();

				self.showSearchContainer(1000);
			});
		}

		if (jQuery('#header').css('position') == 'fixed') {
			var topPosition = jQuery('#quick-search-container').offset().top - jQuery('#header').height();
		} else {
			var topPosition = jQuery('#quick-search-container').offset().top;
		}

		jQuery('html, body').animate({
			scrollTop: topPosition
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
	this.navMenu = new navMenuController();

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.showView = function() {
		jQuery('#page').show();
	}

	this.hideView = function() {
		jQuery('#page').hide();
	}

	this.pushViewState = function(state) {
		if (window.location.hash == state) {
			return;
    }

		if (history.pushState) {
			history.pushState(null, null, state);
		} else {
			window.location.hash = state;
		}
	}

	this.initSearchFormElements = function() {
		jQuery('#search-form').parsley();

		jQuery('#search-form label[for]').click(function(event) {
			event.preventDefault();

			var targetId = jQuery(this).attr('for');
			jQuery('#' + targetId).trigger('click');
		});

		jQuery('#search-form .radios').buttonset();
		jQuery('#search-form .checkboxes').buttonset();

		jQuery('#loan-amount-text').inputmask('integer', {
			prefix: '£',
			allowMinus: false,
			autoGroup: true,
			groupSeparator: ',',
			groupSize: 3
		});

		jQuery('#search-form input[name="lender_status"]').change(function(event) {
			if (!self.isHiddenSearchResultContainer()) {
				jQuery('#search-form').submit();
			}
		});

		jQuery('#loan-period-select').selectmenu({
			change: function(event, ui) {
				jQuery(this).parsley().validate();
			}
		});

		jQuery('#loan-type-select').selectmenu({
			change: function(event, ui) {
				if (jQuery(this).parsley().validate()) {;
					if (!self.isHiddenSearchResultContainer()) {
						jQuery('#search-form').submit();
					}
				}
			}
		});

		jQuery('#search-form input[name="loan_attributes[]"]').change(function(event) {
			if (!self.isHiddenSearchResultContainer()) {
				jQuery('#search-form').submit();
			}
		});

		jQuery('#search-form').submit(function(event) {
			self.onSearchFormSubmit(event, this);
		});
	}

	this.validateSearchForm = function() {
		return jQuery('#search-form').parsley().validate();
	}

	this.submitSearchForm = function(onComplete, onError) {
		var formData = jQuery('#search-form').serialize();
		var loanAmountValue = jQuery('#loan-amount-text').inputmask('unmaskedvalue');

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
			if (typeof onComplete == 'function') {
				onComplete();
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (typeof onError == 'function') {
				onError(jqXHR, textStatus, errorThrown);
			}
		});
	}

	this.showSearchResultLoader = function(speed, onComplete) {
		jQuery('#search-result-loader').fadeIn(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.hideSearchResultLoader = function(speed, onComplete) {
		jQuery('#search-result-loader').fadeOut(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.showSearchResultContainer = function(speed, onComplete) {
		jQuery('#search-result-container').fadeIn(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.hideSearchResultContainer = function(speed, onComplete) {
		jQuery('#search-result-container').fadeOut(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.isHiddenSearchResultContainer = function() {
		return !jQuery('#search-result-container').is(':visible');
	}

	this.initSearchResultElements = function() {
		this.hideSearchResultTooltipElements();
		this.initSearchResultTooltipElements();
		this.hideAllMoreDetailsContainers();
    

		jQuery('#search-result .apply-btn').click(function(event) {
      if(jQuery(this).hasClass( 'force-smart-search' )) {
        var senderElement = jQuery(this);
        self.onSmartSearchClick(event, senderElement);
      } else {
        self.onApplyClick(event, this);
      }
		});

		jQuery('#search-result .more-details-lnk').click(function(event) {
			self.onMoreDetailsClick(event, this);
    });
    
	}

	this.hideSearchResultTooltipElements = function() {
		jQuery('#search-result .tooltip').hide();
	}

	this.initSearchResultTooltipElements = function() {
		jQuery('#search-result .loan-type-hover').hover(function(event) {
			var itemIndex = jQuery(this).attr('data-index');

			self.showSearchResultTooltipElement(this, '#tooltip-loan-type-' + itemIndex, 'left', -10, -10);
		}, function() {
			var itemIndex = jQuery(this).attr('data-index');

			self.hideSearchResultTooltipElement('#tooltip-loan-type-' + itemIndex);
		});

		jQuery('.tooltip').click(function(event) {
			self.hideSearchResultTooltipElement('.tooltip');
		});

		jQuery('#apr-tooltip-hover').hover(function(event) {
			self.showSearchResultTooltipElement(this, '#apr-tooltip', 'right', 0, 0);
		}, function() {
			self.hideSearchResultTooltipElement('#apr-tooltip');
		});
	}

	this.showSearchResultTooltipElement = function(hoverElement, tooltipElement, position, offsetLeft, offsetTop) {
		jQuery(tooltipElement).fadeIn(250);

		if (jQuery(window).width() >= 640) {
			if (position == 'left') {
				var leftPosition = jQuery(hoverElement).position().left - jQuery(tooltipElement).outerWidth() + offsetLeft;
			} else {
				var leftPosition = jQuery(hoverElement).position().left + jQuery(hoverElement).width() + offsetLeft;
			}
		} else {
			var leftPosition = (jQuery(window).width() / 2) - (jQuery(tooltipElement).innerWidth() / 2);
		}

		var topPosition = jQuery(hoverElement).position().top - jQuery(tooltipElement).outerHeight() + offsetTop;

		jQuery(tooltipElement).css({
			left: leftPosition,
			top: topPosition
		});
	}

	this.hideSearchResultTooltipElement = function(tooltipElement) {
		jQuery(tooltipElement).fadeOut(250);
	}

	this.showApplyConfirmDialog = function(itemIndex) {
		var resultMetadataElement = jQuery('#result-metadata');
		var itemMetadataElement = jQuery('#item-metadata-' + itemIndex);

		var token = jQuery(resultMetadataElement).find('[data-key=token]').attr('data-value');
		var brokerReference = jQuery(resultMetadataElement).find('[data-key=broker-reference]').attr('data-value');
		var lenderOptionId = jQuery(itemMetadataElement).find('[data-key=lender-option-id]').attr('data-value');
		var financeOptionId = jQuery(itemMetadataElement).find('[data-key=finance-option-id]').attr('data-value');
		var lenderId = jQuery(itemMetadataElement).find('[data-key=lender-id]').attr('data-value');
		var lenderName = jQuery(itemMetadataElement).find('[data-key=lender-name]').attr('data-value');
		var loanType = jQuery(itemMetadataElement).find('[data-key=loan-type]').attr('data-value');

		var fulfillingBroker = jQuery(itemMetadataElement).find('[data-key=fulfilling-broker]').attr('data-value');
		var fulfilmentCode = jQuery(itemMetadataElement).find('[data-key=fulfilment-code]').attr('data-value');
		var fulfilmentDescription = jQuery(itemMetadataElement).find('[data-key=fulfilment-description]').attr('data-value');
		var fulfilmentApplyPrompt = jQuery(itemMetadataElement).find('[data-key=fulfilment-apply-prompt]').attr('data-value');
		var fulfilmentHelpMessage = jQuery(itemMetadataElement).find('[data-key=fulfilment-help-message]').attr('data-value');

		jQuery('#apply-token').val(token);
		jQuery('#broker-reference-hidden').val(brokerReference);
		jQuery('#lender-option-id-hidden').val(lenderOptionId);
		jQuery('#finance-option-id-hidden').val(financeOptionId);
		jQuery('#lender-id-hidden').val(lenderId);
		jQuery('#lender-name-hidden').val(lenderName);
		jQuery('#loan-type-hidden').val(loanType);
		jQuery('#fulfilling-broker-hidden').val(fulfillingBroker);
    jQuery('#fulfilment-apply-prompt-hidden').val(fulfilmentApplyPrompt);
    jQuery('#fulfilment-description-hidden').val(fulfilmentDescription);

		if (fulfilmentDescription == 'URL') {
			var buttons = [
				{
					text: 'Smart search',
					click: function(event) {
						var senderElement = jQuery(this).next('div').find('button:eq(0)');

						self.onSmartSearchClick(event, senderElement);

						jQuery(this).dialog('close');
					}
				},
				{
					text: 'Apply directly',
					click: function(event) {
						//Send google analytics

						var senderElement = jQuery(this).next('div').find('button:eq(1)');
						self.onApplyProceedClick(event, senderElement);
						jQuery(this).dialog('close');
					}
				}
			];
		} else {
			var buttons = [
				{
					text: 'Smart search',
					click: function(event) {
						var senderElement = jQuery(this).next('div').find('button:eq(0)');

						self.onSmartSearchClick(event, senderElement);

						jQuery(this).dialog('close');
					}
				}
			];
		}

		jQuery('#apply-dialog').dialog({
			title: 'Apply',
			resizable: false,
			width: 500,
			height: 'auto',
			modal: true,
			autoOpen: true,
			draggable: false,
			buttons: buttons,
			open: function() {
				jQuery('body').css('overflow', 'hidden');

				jQuery(this).next('div').find('button:eq(0)').attr('data-index', itemIndex);

				if (fulfilmentDescription == 'URL') {
					jQuery(this).next('div').find('button:eq(1)').addClass('proceed');
					jQuery(this).next('div').find('button:eq(1)').addClass('ApplyButton');
				}
			},
			beforeClose: function() {
				jQuery('body').css('overflow', 'auto');
			}
		});
	}

	this.redirectToSmartSearch = function(itemIndex) {
		var itemMetadataElement = jQuery('#item-metadata-' + itemIndex);

		var loanAmount = jQuery(itemMetadataElement).find('[data-key=loan-amount]').attr('data-value');
		var loanPeriod = jQuery(itemMetadataElement).find('[data-key=loan-period]').attr('data-value');

		var redirectURL = Drupal.settings.basePath + 'loans/smart-search?loan_amount=' + loanAmount + '&loan_period=' + loanPeriod;

		window.location.href = redirectURL;
	}

	this.submitApplyForm = function() {
		jQuery('#apply-form').submit();
	}

	this.slideToggleMoreDetailsContainer = function(itemIndex) {
		var moreDetailsContainer = jQuery('#loan-more-details-' + itemIndex).find('div');

		jQuery(moreDetailsContainer).slideToggle({
			speed: 1500,
			easing: 'easeInOutCirc'
		});
	}

	this.hideAllMoreDetailsContainers = function() {
		jQuery('.loan-more-details').find('div').hide();
	}

	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.navMenu.init();

		this.hideSearchResultLoader(0);
		this.hideSearchResultContainer(0);

		this.initSearchFormElements();

		if (jQuery('#search-form').attr('validate-on-startup') == 'true') {
			this.validateSearchForm();
		}

		if (jQuery('#search-form').attr('submit-on-startup') == 'true') {
			this.hideSearchResultContainer(150, function() {
				self.showSearchResultLoader(150);

				self.submitSearchForm(
					function onComplete() {
						self.initSearchResultElements();

						self.hideSearchResultLoader(150, function() {
							self.showSearchResultContainer(150);
						});
					},
					function onError() {
					}
				);
			});
		}

		jQuery('html, body').scrollTop(0);

		this.showView();
	}

	this.onSearchFormSubmit = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}
		this.hideSearchResultContainer(150, function() {
			self.showSearchResultLoader(150);

			self.submitSearchForm(
				function onComplete() {
					self.initSearchResultElements();

					self.hideSearchResultLoader(150, function() {
						self.showSearchResultContainer(150);
					});
				},
				function onError() {
				}
			);
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

		if (jQuery(senderElement).attr('data-action') == 'more') {
			jQuery(senderElement).html('Less&nbsp;details <i class="fa fa-angle-down"></i>');
			jQuery(senderElement).attr('data-action', 'less');
		} else {
			jQuery(senderElement).html('More&nbsp;details <i class="fa fa-angle-right"></i>');
			jQuery(senderElement).attr('data-action', 'more');
		}

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
	this.navMenu = new navMenuController();
	this.firstAddressItemHTML = null;
	this.addressCounter = 0;
	this.disableHashChangeEventTrigger = false;

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		if ('onhashchange' in window) {
			jQuery(window).on('hashchange', function(e) {
				self.onViewStateChange();
			});
		}

		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.showView = function() {
		jQuery('#page').show();
	}

	this.hideView = function() {
		jQuery('#page').hide();
	}

	this.pushViewState = function(state, disableEventTrigger) {
		if (window.location.hash == state) {
			return;
		}

		this.disableHashChangeEventTrigger = disableEventTrigger;

		window.location.hash = state;
	}

	this.isTouchScreen = function() {
		return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
	}

	this.hideTooltipElements = function() {
		jQuery('.tooltip').hide();
	}

	this.initTooltipElements = function() {
		jQuery('#phone-hover').hover(function(event) {
			self.showTooltipElement(this, '#phone-tooltip', 'right', 10, -10);
		}, function() {
			self.hideTooltipElement('#phone-tooltip');
		});

		jQuery('#email-hover').hover(function() {
			self.showTooltipElement(this, '#email-tooltip', 'right', 10, -10);
		}, function() {
			self.hideTooltipElement('#email-tooltip');
		});

		jQuery('#annual-income-hover').hover(function() {
			self.showTooltipElement(this, '#annual-income-tooltip', 'right', 10, -10);
		}, function() {
			self.hideTooltipElement('#annual-income-tooltip');
		});

		jQuery('#phone-tooltip, #email-tooltip, #annual-income-tooltip').click(function(event) {
			self.hideTooltipElement('#phone-tooltip, #email-tooltip, #annual-income-tooltip');
		});

		jQuery('#apr-tooltip-hover').hover(function(event) {
			self.showSearchResultTooltipElement(this, '#apr-tooltip', 'right', 0, 0);
		}, function() {
			self.hideSearchResultTooltipElement('#apr-tooltip');
		});
	}

	this.showTooltipElement = function(hoverElement, tooltipElement, position, offsetLeft, offsetTop) {
		jQuery(tooltipElement).fadeIn(250);

		if (jQuery(window).width() >= 640) {
			if (position == 'left') {
				var leftPosition = jQuery(hoverElement).offset().left - jQuery(tooltipElement).outerWidth() + offsetLeft;
			} else {
				var leftPosition = jQuery(hoverElement).offset().left + jQuery(hoverElement).width() + offsetLeft;
			}
		} else {
			var leftPosition = (jQuery(window).width() / 2) - (jQuery(tooltipElement).innerWidth() / 2);
		}

		var topPosition = jQuery(hoverElement).offset().top - jQuery('#header').height() - jQuery(tooltipElement).outerHeight() + offsetTop;

		jQuery(tooltipElement).css({
			left: leftPosition,
			top: topPosition
		});
	}

	this.hideTooltipElement = function(tooltipElement) {
		jQuery(tooltipElement).fadeOut(250);
	}

	this.showSearchForm = function() {
		jQuery('#smart-search-form').fadeIn(150);
	}

	this.hideSearchForm = function() {
		jQuery('#smart-search-form').fadeOut(150);
	}

	this.isHiddenSearchForm = function() {
		return !jQuery('#smart-search-form').is(':visible');
	}

	this.initSearchFormElements = function() {
		jQuery('#smart-search-form').parsley({
			focus: 'none'
		}).subscribe('parsley:form:validated', function(formInstance) {
			if (!formInstance.isValid()) {
				var firstErrorElement = jQuery('.parsley-errors-list.filled:first li');

				if (jQuery(firstErrorElement).length > 0) {
					if (jQuery('#header').css('position') == 'fixed') {
						var topPosition = jQuery(firstErrorElement).offset().top - jQuery('#header').height() - 80;
					} else {
						var topPosition = jQuery(firstErrorElement).offset().top - 80;
					}

					jQuery('html, body').animate({
						scrollTop: topPosition
					}, 500, 'easeOutCirc');
				}
			}
		});

		jQuery('#smart-search-form label[for]').click(function(event) {
			// Removed By Tom - Need to check to see if this effect forms (removed due to ie8 parsley trigger bug)
			//event.preventDefault();

			// var targetId = jQuery(this).attr('for');
			// jQuery('#' + targetId).trigger('click');
		});

		jQuery('#smart-search-form .radios').buttonset();
		jQuery('#smart-search-form .checkboxes').buttonset();

		jQuery('#loan-amount-text, #mortgage-balance-text, #property-value-text, #monthly-mortgage-repayment-text, #homeowner-loan-balance-text, #monthly-homeowner-loan-payment-text, #annual-income-text, #loan-amount-alt-text').inputmask('integer', {
			prefix: '£',
			allowMinus: false,
			autoGroup: true,
			groupSeparator: ',',
			groupSize: 3
		});

		if (!this.isTouchScreen()) {
			jQuery('#smart-search-form select:not(#loan-period-select,#movein-month-select-0,#movein-year-select-0,#loan-period-alt-select)').selectmenu({
				change: function(event, ui) {
					jQuery(this).parsley().validate();
				}
			});
		}

		jQuery('#loan-amount-text').keyup(function(event) {
			self.onLoanAmountChange(event, this);
		});

		jQuery('#loan-period-select').selectmenu({
			change: function(event, ui) {
				jQuery(this).parsley().validate();

				self.onLoanPeriodChange(event, this);
			}
		});

		this.firstAddressItemHTML = jQuery('#address-item-container-0').get(0).outerHTML;
		this.initAddressSubForm(0);

		jQuery('#smart-search-form input[name=homeowner_loan]').change(function(event) {
			self.onHomeownerLoanChange(event, this);
		});

		jQuery('#add-address-btn').click(function(event) {
			self.onAddAddressClick(event, this);
		});

		jQuery('#smart-search-form input[name=homeowner]').change(function(event) {
			self.onHomeownerChange(event, this);
		});

		jQuery('#smart-search-form input[name=homeowner_loan]').change(function(event) {
			self.onHomeownerLoanChange(event, this);
		});

		jQuery('#loan-amount-alt-text').keyup(function(event) {
			self.onLoanAmountAltChange(event, this);
		});

		jQuery('#loan-period-alt-select').selectmenu({
			change: function(event, ui) {
				jQuery(this).parsley().validate();

				self.onLoanPeriodAltChange(event, this);
			}
		})

		jQuery('#terms-agree-checkbox').button();

		jQuery('#clear-btn').click(function(event) {
			self.onClearDetailsClick(event, this);
		});

		jQuery('#smart-search-form input[name="loan_attributes[]"]').change(function(event) {
			if (!self.isHiddenSearchResultContainer()) {
				jQuery('#smart-search-form').submit();
			}
		});

		jQuery('#amend-details-btn').click(function(event) {
			self.onAmendDetailsClick(event, this);
		});

		jQuery('#smart-search-form').submit(function(event) {
			self.onSearchFormSubmit(event, this);
		});

		this.onHomeownerChange();
		this.onHomeownerLoanChange();
	}

	this.validateSearchForm = function() {
		return jQuery('#smart-search-form').parsley().validate();
	}

	this.submitSearchForm = function(onComplete, onError) {
		var formData = jQuery('#smart-search-form').serialize();
		var loanAmountValue = jQuery('#loan-amount-text').inputmask('unmaskedvalue');
		var annualIncomeValue = jQuery('#annual-income-text').inputmask('unmaskedvalue');
		var mortgageBalanceValue = jQuery('#mortgage-balance-text').inputmask('unmaskedvalue');
		var propertyValue = jQuery('#property-value-text').inputmask('unmaskedvalue');
		var monthlyMortgageRepaymentValue = jQuery('#monthly-mortgage-repayment-text').inputmask('unmaskedvalue');
		var homeownerLoanBalanceValue = jQuery('#homeowner-loan-balance-text').inputmask('unmaskedvalue');
		var monthlyHomeownerLoanPaymentValue = jQuery('#monthly-homeowner-loan-payment-text').inputmask('unmaskedvalue');

		formData = formData.replace(/loan_amount=[^\&]*/, 'loan_amount=' + loanAmountValue);
		formData = formData.replace(/annual_income=[^\&]*/, 'annual_income=' + annualIncomeValue);
		formData = formData.replace(/mortgage_balance=[^\&]*/, 'mortgage_balance=' + mortgageBalanceValue);
		formData = formData.replace(/property_value=[^\&]*/, 'property_value=' + propertyValue);
		formData = formData.replace(/monthly_mortgage_repayment=[^\&]*/, 'monthly_mortgage_repayment=' + monthlyMortgageRepaymentValue);
		formData = formData.replace(/homeowner_loan_balance=[^\&]*/, 'homeowner_loan_balance=' + homeownerLoanBalanceValue);
		formData = formData.replace(/monthly_homeowner_loan_payment=[^\&]*/, 'monthly_homeowner_loan_payment=' + monthlyHomeownerLoanPaymentValue);
		formData += '&action=Search';

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
			if (typeof onComplete == 'function') {
				onComplete();
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (typeof onError == 'function') {
				onError(jqXHR, textStatus, errorThrown);
			}
		});
	}

	this.clearSearchForm = function() {
		jQuery('#smart-search-form').parsley().reset();

		jQuery('#smart-search-form').find('input[type=text]').val('');
		jQuery('#smart-search-form').find('select').val('');

		jQuery('#smart-search-form').find('input[type=radio]').each(function(index, element) {
			jQuery(element).prop('checked', false);
		});

		if (!this.isTouchScreen()) {
			jQuery('#smart-search-form').find('select').selectmenu('refresh');
		}

		jQuery('#smart-search-form .radios').buttonset('refresh');
		jQuery('#smart-search-form .checkboxes').buttonset('refresh');

		this.removeAllAddressItems();
		this.removeAddressElement(0);
		this.hideSelectAddressElement(0);
		this.setAddressErrorMessage(0, '');
		this.hideAddAddressElement();

		this.onHomeownerChange();
		this.onHomeownerLoanChange();
	}

	this.initProgressElements = function() {
		jQuery('.section-1-btn').click(function(event) {
			self.onSection1ProgressClick(event, this);
		});

		jQuery('.section-2-btn').click(function(event) {
			self.onSection2ProgressClick(event, this);
		});

		jQuery('.section-3-btn').click(function(event) {
			self.onSection3ProgressClick(event, this);
		});

		jQuery('.section-4-btn').click(function(event) {
			self.onSection4ProgressClick(event, this);
		});
	}

	this.updateProgressElements = function() {
		jQuery('.section-1-btn').removeClass('disabled');
		jQuery('.section-2-btn').removeClass('disabled');

		if (this.isHiddenYourDetailsContainer()) {
			if (!jQuery('.section-3-btn').hasClass('disabled')) {
				jQuery('.section-3-btn').addClass('disabled');
			}
		} else {
			jQuery('.section-3-btn').removeClass('disabled');
		}

		if (this.isHiddenEmploymentStatusContainer()) {
			if (!jQuery('.section-4-btn').hasClass('disabled')) {
				jQuery('.section-4-btn').addClass('disabled');
			}
		} else {
			jQuery('.section-4-btn').removeClass('disabled');
		}
	}

	this.showLoanDetailsContainer = function() {
		jQuery('#loan-details-container').show();
	}

	this.slideDownLoanDetailsContainer = function(speed) {
		jQuery('#loan-details-container').show(0);

		this.scrollToLoanDetailsContainer(speed);
	}

	this.scrollToLoanDetailsContainer = function(speed) {
		if (speed == 0) {
			jQuery('html, body').scrollTop(jQuery('#loan-details-container').offset().top - jQuery('#header').height() - 5);
		} else {
			jQuery('html, body').animate({
				scrollTop: jQuery('#loan-details-container').offset().top - jQuery('#header').height() - 5
			}, speed, 'easeOutCirc');
		}
	}

	this.hideLoanDetailsContainer = function() {
		jQuery('#loan-details-container').hide();
	}

	this.isHiddenLoanDetailsContainer = function() {
		return !jQuery('#loan-details-container').is(':visible');
	}

	this.showYourDetailsContainer = function() {
		jQuery('#your-details-container').show();
	}

	this.slideDownYourDetailsContainer = function(speed) {
		jQuery('#your-details-container').show(0);

		this.scrollToYourDetailsContainer(speed);
	}

	this.scrollToYourDetailsContainer = function(speed) {
		if (speed == 0) {
			jQuery('html, body').scrollTop(jQuery('#your-details-container').offset().top - jQuery('#header').height() - 5);
		} else {
			jQuery('html, body').animate({
				scrollTop: jQuery('#your-details-container').offset().top - jQuery('#header').height() - 5
			}, speed, 'easeOutCirc');
		}
	}

	this.hideYourDetailsContainer = function() {
		jQuery('#your-details-container').hide();
	}

	this.isHiddenYourDetailsContainer = function() {
		return !jQuery('#your-details-container').is(':visible');
	}

	this.showEmploymentStatusContainer = function() {
		jQuery('#employment-status-container').show();
	}

	this.slideDownEmploymentStatusContainer = function(speed) {
		jQuery('#employment-status-container').show(0);

		this.scrollToEmploymentStatusContainer(speed);
	}

	this.scrollToEmploymentStatusContainer = function(speed) {
		if (speed == 0) {
			jQuery('html, body').scrollTop(jQuery('#employment-status-container').offset().top - jQuery('#header').height() - 5);
		} else {
			jQuery('html, body').animate({
				scrollTop: jQuery('#employment-status-container').offset().top - jQuery('#header').height() - 5
			}, speed, 'easeOutCirc');
		}
	}

	this.hideEmploymentStatusContainer = function() {
		jQuery('#employment-status-container').hide();
	}

	this.isHiddenEmploymentStatusContainer = function() {
		return !jQuery('#employment-status-container').is(':visible');
	}

	this.showPropertyDetailsContainer = function(speed) {
		jQuery('#property-details-container').show();
	}

	this.slideDownPropertyDetailsContainer = function(speed) {
		jQuery('#property-details-container').show(0);

		this.scrollToPropertyDetailsContainer(speed);
	}

	this.scrollToPropertyDetailsContainer = function(speed) {
		if (speed == 0) {
			jQuery('html, body').scrollTop(jQuery('#property-details-container').offset().top - jQuery('#header').height() - 5);
		} else {
			jQuery('html, body').animate({
				scrollTop: jQuery('#property-details-container').offset().top - jQuery('#header').height() - 5
			}, speed, 'easeOutCirc');
		}
	}

	this.hidePropertyDetailsContainer = function() {
		jQuery('#property-details-container').hide();
	}

	// Credit check
	this.showCreditCheckContainer = function() {
		jQuery('#credit-check-container').show();
	}

	this.hideCreditCheckContainer = function() {
		jQuery('#credit-check-container').hide();
	}
	//

	// Address
	this.addAddressItem = function() {
		var firstAddressItemClone = this.firstAddressItemHTML;
		var newAddressItemId = ++this.addressCounter;

		firstAddressItemClone = firstAddressItemClone.replace(/(id="?[a-zA-Z-]+)0("?)/g, '$1' + newAddressItemId + '$2');
		firstAddressItemClone = firstAddressItemClone.replace(/(name="?[a-zA-Z-]+)\[0\]([a-zA-Z-\[\]]+)/g, '$1[' + newAddressItemId + ']$2');
		firstAddressItemClone = firstAddressItemClone.replace(/(data-index="?)0("?)/g, '$1' + newAddressItemId + '$2');
		firstAddressItemClone = firstAddressItemClone.replace(/(data-parsley-errors-container="?#[a-zA-Z-]+)0("?)/g, '$1' + newAddressItemId + '$2');

		jQuery('#add-address-btn').before(jQuery('<div>' + firstAddressItemClone + '</div>').html());

		this.initAddressSubForm(newAddressItemId);

		if (this.getAddressItemCount() > 4) {
			this.hideAddAddressElement();
		} else {
			this.showAddAddressElement();
		}
	}

	this.removeAddressItem = function(itemIndex) {
		jQuery('#address-item-container-' + itemIndex).remove();

		if (this.getAddressItemCount() > 4) {
			this.hideAddAddressElement();
		} else {
			this.showAddAddressElement();
		}
	}

	this.removeAllAddressItems = function() {
		jQuery('#address-container .address-item-container:not(:first)').each(function(index, element) {
			jQuery(this).remove();
		});
	}

	this.getAddressItemCount = function() {
		return jQuery('#address-container [id^=address-item-container-]').length;
	}

	this.initAddressSubForm = function(itemIndex) {
		this.hideSelectAddressElement(itemIndex);
		this.hideAddressLoaderElement(itemIndex);

		if (!this.isTouchScreen()) {
			jQuery('#movein-month-select-' + itemIndex + ', #movein-year-select-' + itemIndex).selectmenu({
				change: function(event, ui) {
					jQuery(this).parsley().validate();

					self.onMoveinDateChange(event, this);
				}
			});
		}

		jQuery('#find-address-btn-' + itemIndex).click(function(event) {
			self.onFindAddressClick(event, this);
		});

		jQuery('#select-address-btn-' + itemIndex).click(function(event) {
			self.onSelectAddressClick(event, this);
		});

		jQuery('#house-number-text-' + itemIndex + ', #house-name-text-' + itemIndex).change(function(event) {
			self.onHouseNumberOrNameChange(event, this);
		});

		jQuery('#remove-address-btn-' + itemIndex).click(function(event) {
			self.onRemoveAddressClick(event, this);
		});

		this.disableAddressFields(itemIndex, true);

		if (itemIndex == 0) {
			jQuery('#remove-address-btn-' + itemIndex).remove();
		}
	}

	this.createAddressElement = function(itemIndex) {
		var addressElement = '<div class="address-select"><select id="address-select-' + itemIndex + '"></select></div>';

		jQuery('#select-address-btn-' + itemIndex).after(addressElement);

		if (!this.isTouchScreen()) {
			jQuery('#address-select-' + itemIndex).selectmenu();
		}
	}

	this.removeAddressElement = function(itemIndex) {
		if (!this.isTouchScreen()) {
			jQuery('#address-select-' + itemIndex).selectmenu('destroy');
		}

		jQuery('#address-select-' + itemIndex).parent('div').remove();
	}

	this.updateAddressElement = function(itemIndex) {
		if (!this.isTouchScreen()) {
			jQuery('#address-select-' + itemIndex).selectmenu('refresh');
		}
	}

	this.addAddressOptionElement = function(itemIndex, houseNumber, houseName, streetName, postTown, locality, county) {
		var title = ((houseNumber != '') ? houseNumber + ', '  : '') + ((houseName != '') ? houseName + ', ' : '') + ((streetName != '') ? streetName + ', ' : '') + ((postTown != '') ? postTown + ', ' : '') + ((locality != '') ? locality + ', ' : '') + ((county != '') ? county + ', ' : '');
		title = title.substr(0, title.length - 2);

		var addressOptionElement = '<option value="" data-house-number="' + houseNumber + '" data-house-name="' + houseName + '" data-street-name="' + streetName + '" data-post-town="' + postTown + '" data-locality="' + locality + '" data-county="' + county + '">' + title + '</option>'

		jQuery('#address-select-' + itemIndex).append(addressOptionElement);
	}

	this.addAddressOptionElements = function(itemIndex, data) {
		if (data.length > 0) {
			for (i = 0; i < data.length; i++) {
				this.addAddressOptionElement(itemIndex, data[i].house_number, data[i].house_name, data[i].street_name, data[i].post_town, data[i].locality, data[i].county);
			}

			this.updateAddressElement(itemIndex);
			this.showSelectAddressElement(itemIndex);
		} else {
			this.removeAddressElement(itemIndex);
			this.hideSelectAddressElement(itemIndex);
		}
	}

	this.showSelectAddressElement = function(itemIndex) {
		jQuery('#select-address-btn-' + itemIndex).show();
	}

	this.hideSelectAddressElement = function(itemIndex) {
		jQuery('#select-address-btn-' + itemIndex).hide();
	}

	this.showAddAddressElement = function() {
		jQuery('#add-address-btn').show();
	}

	this.hideAddAddressElement = function() {
		jQuery('#add-address-btn').hide();
	}

	this.showAddressLoaderElement = function(itemIndex) {
		jQuery('#address-loader-' + itemIndex).show();
	}

	this.hideAddressLoaderElement = function(itemIndex) {
		jQuery('#address-loader-' + itemIndex).hide();
	}

	this.setAddressErrorMessage = function(itemIndex, message) {
		jQuery('#address-error-' + itemIndex).text(message);
	}

	this.prepropulateAddressFields = function(itemIndex, houseNumber, houseName, streetName, postTown, locality, county) {
		jQuery('#house-number-text-' + itemIndex).val('');
		jQuery('#house-name-text-' + itemIndex).val('');
		jQuery('#street-name-text-' + itemIndex).val('');
		jQuery('#post-town-text-' + itemIndex).val('');
		jQuery('#locality-text-' + itemIndex).val('');
		jQuery('#county-text-' + itemIndex).val('');

		jQuery('#house-number-text-' + itemIndex).val(houseNumber);
		jQuery('#house-name-text-' + itemIndex).val(houseName);
		jQuery('#street-name-text-' + itemIndex).val(streetName);
		jQuery('#post-town-text-' + itemIndex).val(postTown);
		jQuery('#locality-text-' + itemIndex).val(locality);
		jQuery('#county-text-' + itemIndex).val(county);
	}

	this.disableAddressFields = function(itemIndex, status) {
		if (status) {
			jQuery('#street-name-text-' + itemIndex).attr('readonly', true);
			jQuery('#post-town-text-' + itemIndex).attr('readonly', true);
			jQuery('#locality-text-' + itemIndex).attr('readonly', true);
			jQuery('#county-text-' + itemIndex).attr('readonly', true);
		} else {
			jQuery('#street-name-text-' + itemIndex).attr('readonly', false);
			jQuery('#post-town-text-' + itemIndex).attr('readonly', false);
			jQuery('#locality-text-' + itemIndex).attr('readonly', false);
			jQuery('#county-text-' + itemIndex).attr('readonly', false);
		}
	}

	this.validatePostcode = function(itemIndex) {
		jQuery('#postcode-text-' + itemIndex).parsley().validate();
	}

	this.isValidPostcode = function(itemIndex) {
		return jQuery('#postcode-text-' + itemIndex).parsley().isValid();
	}

	this.findAddress = function(postcode, houseNumber, houseName, onComplete, onError) {
		jQuery.ajax({
			url: Drupal.settings.basePath + 'loans/find-address?postcode=' + postcode + '&house_number=' + houseNumber + '&house_name=' + houseName,
			dataType: 'json',
			timeout: 1 * 60 * 1000,
			cache: false
		}).done(function(result) {
			if (typeof onComplete == 'function') {
				onComplete(result);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			if (typeof onError == 'function') {
				onError(jqXHR, textStatus, errorThrown);
			}
		});
	}

	this.updateHouseNumberAndNameFields = function(itemIndex) {
		var houseNumberElement = jQuery('#house-number-text-' + itemIndex);
		var houseNameElement = jQuery('#house-name-text-' + itemIndex);

		if (jQuery(houseNumberElement).val() != '') {
			jQuery(houseNameElement).attr('data-parsley-required', 'false');
		}

		if (jQuery(houseNumberElement).val() == '') {
			jQuery(houseNameElement).attr('data-parsley-required', 'true');
		}

		if (jQuery(houseNameElement).val() != '') {
			jQuery(houseNumberElement).attr('data-parsley-required', 'false');
		}

		if (jQuery(houseNameElement).val() == '') {
			jQuery(houseNumberElement).attr('data-parsley-required', 'true');
		}
	}

	this.validateHouseNumberAndName = function(itemIndex) {
		jQuery('#house-number-text-' + itemIndex).parsley().validate();
		jQuery('#house-name-text-' + itemIndex).parsley().validate();
	}

	this.isValidHouseNumberAndName = function(itemIndex) {
		return jQuery('#house-number-text-' + itemIndex).parsley().isValid() && jQuery('#house-name-text-' + itemIndex).parsley().isValid();
	}

	this.isValidMoveinDate = function() {
		var currentDate = new Date();
		var yr3AgoDate = new Date();

		yr3AgoDate.setMonth(yr3AgoDate.getMonth() - 36);
		var isValidMoveinDate = false;

		jQuery('.address-item-container').each(function(index, element) {
			var year = jQuery(element).find('.movein-year-select select').val();
			var month = jQuery(element).find('.movein-month-select select').val();

			if (year != '' && month != '') {
				var movinDate = new Date(year, month - 1, 1);

				if (movinDate.getTime() <= yr3AgoDate.getTime()) {
					isValidMoveinDate = true;
					return;
				}
			}
		});

		return isValidMoveinDate;
	}

	this.validateAddress = function(itemIndex) {
		jQuery('#house-number-text-' + itemIndex).parsley().validate();
		jQuery('#house-name-text-' + itemIndex).parsley().validate();
		jQuery('#street-name-text-' + itemIndex).parsley().validate();
		jQuery('#post-town-text-' + itemIndex).parsley().validate();
		jQuery('#locality-text-' + itemIndex).parsley().validate();
		jQuery('#county-text-' + itemIndex).parsley().validate();
	}
	//

	// Homeowner
	this.showHomeownerContainer = function() {
		jQuery('#homeowner-container').show();
	}

	this.hideHomeownerContainer = function() {
		jQuery('#homeowner-container').hide();
	}

	this.updateHomeOwnerFields = function() {
		var homeOwnerValue = jQuery('input[name=homeowner]:checked').val();

		var exCouncilElement = jQuery('input[name=ex_council]');
		var mortgageBalanceElement = jQuery('#mortgage-balance-text');
		var propertyValueElement = jQuery('#property-value-text');
		var monthlyMortgageRepaymentElement = ('#monthly-mortgage-repayment-text');
		var propertyTypeElement = jQuery('#property-type-select');
		var homeOwnerElement = jQuery('input[name=homeowner_loan]');

		if (homeOwnerValue == 'Y') {
			jQuery(exCouncilElement).each(function(index, element) {
				jQuery(element).attr('data-parsley-required', 'true');
			});

			jQuery(mortgageBalanceElement).attr('data-parsley-required', 'true');
			jQuery(propertyValueElement).attr('data-parsley-required', 'true');
			jQuery(monthlyMortgageRepaymentElement).attr('data-parsley-required', 'true');
			jQuery(propertyTypeElement).attr('data-parsley-required', 'true');

			jQuery(homeOwnerElement).each(function(index, element) {
				jQuery(element).attr('data-parsley-required', 'true');
			});

			this.showHomeownerContainer();
		} else {
			jQuery(exCouncilElement).each(function(index, element) {
				jQuery(element).attr('data-parsley-required', 'false');
			});

			jQuery(mortgageBalanceElement).attr('data-parsley-required', 'false');
			jQuery(propertyValueElement).attr('data-parsley-required', 'false');
			jQuery(monthlyMortgageRepaymentElement).attr('data-parsley-required', 'false');
			jQuery(propertyTypeElement).attr('data-parsley-required', 'false');

			jQuery(homeOwnerElement).each(function(index, element) {
				jQuery(element).attr('data-parsley-required', 'false');
			});

			this.hideHomeownerContainer();
		}
	}
	//

	// Homeowner loan
	this.showHomeownerLoanContainer = function() {
		jQuery('#homeowner-loan-container').show();
	}

	this.hideHomeownerLoanContainer = function() {
		jQuery('#homeowner-loan-container').hide();
	}

	this.updateHomeOwnerLoanFields = function() {
		var homeOwnerValue = jQuery('input[name=homeowner]:checked').val();
		var homeOwnerLoanValue = jQuery('input[name=homeowner_loan]:checked').val();

		var homeownerLoanBalanceElement = jQuery('#homeowner-loan-balance-text');
		var monthlyHomeownerLoanPaymentElement = jQuery('#monthly-homeowner-loan-payment-text');
		var consolidateHomeownerElement = jQuery('input[name=consolidate_homeowner_loan]');

		if (homeOwnerValue == 'Y' && homeOwnerLoanValue == 'Y') {
			jQuery(homeownerLoanBalanceElement).attr('data-parsley-required', 'true');
			jQuery(monthlyHomeownerLoanPaymentElement).attr('data-parsley-required', 'true');

			jQuery(consolidateHomeownerElement).each(function(index, element) {
				jQuery(element).attr('data-parsley-required', 'true');
			});

			this.showHomeownerLoanContainer();
		} else {
			jQuery(homeownerLoanBalanceElement).attr('data-parsley-required', 'false');
			jQuery(monthlyHomeownerLoanPaymentElement).attr('data-parsley-required', 'false');

			jQuery(consolidateHomeownerElement).each(function(index, element) {
				jQuery(element).attr('data-parsley-required', 'false');
			});

			this.hideHomeownerLoanContainer();
		}
	}
	//

	this.showProfileContainer = function() {
		jQuery('#profile-container').parent('div').show();
	}

	this.hideProfileContainer = function() {
		jQuery('#profile-container').parent('div').hide();
	}

	this.isHiddenProfileContainer = function() {
		return !jQuery('#profile-container').is(':visible');
	}

	this.showFilterContainer = function() {
		jQuery('#filter-container').show();
	}

	this.hideFilterContainer = function() {
		jQuery('#filter-container').hide();
	}

	this.showSearchResultLoader = function(speed, onComplete) {
		jQuery('#search-result-loader').fadeIn(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.hideSearchResultLoader = function(speed, onComplete) {
		jQuery('#search-result-loader').fadeOut(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.showSearchResultContainer = function(speed, onComplete) {
		jQuery('#search-result-container').fadeIn(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.hideSearchResultContainer = function(speed, onComplete) {
		jQuery('#search-result-container').fadeOut(speed, function() {
			if (typeof onComplete == 'function') {
				onComplete();
			}
		});
	}

	this.isHiddenSearchResultContainer = function() {
		return !jQuery('#search-result-container').is(':visible');
	}

	this.initSearchResultElements = function() {
		this.hideSearchResultTooltipElements();
		this.initSearchResultTooltipElements();
		this.hideAllMoreDetailsContainers();

		jQuery('#search-result .apply-btn').click(function(event) {
			self.onApplyClick(event, this);
		});

		jQuery('#search-result .more-details-lnk').click(function(event) {
			self.onMoreDetailsClick(event, this);
		});
	}

	this.hideSearchResultTooltipElements = function() {
		jQuery('#search-result .tooltip').hide();
	}

	this.initSearchResultTooltipElements = function() {
		jQuery('#search-result .loan-type-hover').hover(function(event) {
			var itemIndex = jQuery(this).attr('data-index');

			self.showSearchResultTooltipElement(this, '#tooltip-loan-type-' + itemIndex, 'left', -10, -10);
		}, function() {
			var itemIndex = jQuery(this).attr('data-index');

			self.hideSearchResultTooltipElement('#tooltip-loan-type-' + itemIndex);
		});

		jQuery('.tooltip').click(function(event) {
			self.hideSearchResultTooltipElement('.tooltip');
		});

	}

	this.showSearchResultTooltipElement = function(hoverElement, tooltipElement, position, offsetLeft, offsetTop) {
		jQuery(tooltipElement).fadeIn(250);

		if (jQuery(window).width() >= 640) {
			if (position == 'left') {
				var leftPosition = jQuery(hoverElement).position().left - jQuery(tooltipElement).outerWidth() + offsetLeft;
			} else {
				var leftPosition = jQuery(hoverElement).position().left + jQuery(hoverElement).width() + offsetLeft;
			}
		} else {
			var leftPosition = (jQuery(window).width() / 2) - (jQuery(tooltipElement).innerWidth() / 2);
		}

		var topPosition = jQuery(hoverElement).position().top - jQuery(tooltipElement).outerHeight() + offsetTop;

		jQuery(tooltipElement).css({
			left: leftPosition,
			top: topPosition
		});
	}

	this.hideSearchResultTooltipElement = function(tooltipElement) {
		jQuery(tooltipElement).fadeOut(250);
	}

	this.showClearConfirmDialog = function() {
		jQuery('#clear-dialog').html('<p>Are you sure you want to clear the form?</p>');

		jQuery('#clear-dialog').dialog({
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
						jQuery('html, body').scrollTop(0);
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

				jQuery(this).next('div').find('button:eq(0)').addClass('proceed');
			},
			beforeClose: function() {
				jQuery('body').css('overflow', 'auto');
			}
		});
	}

	this.showApplyConfirmDialog = function(itemIndex) {
		var resultMetadataElement = jQuery('#result-metadata');
		var itemMetadataElement = jQuery('#item-metadata-' + itemIndex);

		var token = jQuery(resultMetadataElement).find('[data-key=token]').attr('data-value');
		var brokerReference = jQuery(resultMetadataElement).find('[data-key=broker-reference]').attr('data-value');
		var lenderOptionId = jQuery(itemMetadataElement).find('[data-key=lender-option-id]').attr('data-value');
		var financeOptionId = jQuery(itemMetadataElement).find('[data-key=finance-option-id]').attr('data-value');
		var lenderId = jQuery(itemMetadataElement).find('[data-key=lender-id]').attr('data-value');
		var lenderName = jQuery(itemMetadataElement).find('[data-key=lender-name]').attr('data-value');
		var loanType = jQuery(itemMetadataElement).find('[data-key=loan-type]').attr('data-value');
    var fulfilmentDescription = jQuery(itemMetadataElement).find('[data-key=fulfilment-description]').attr('data-value');

		var fulfillingBroker = jQuery(itemMetadataElement).find('[data-key=fulfilling-broker]').attr('data-value');
		var fulfilmentCode = jQuery(itemMetadataElement).find('[data-key=fulfilment-code]').attr('data-value');
		var fulfilmentApplyPrompt = jQuery(itemMetadataElement).find('[data-key=fulfilment-apply-prompt]').attr('data-value');
		var fulfilmentHelpMessage = jQuery(itemMetadataElement).find('[data-key=fulfilment-help-message]').attr('data-value');

		jQuery('#apply-prompt').html(fulfilmentHelpMessage);
		jQuery('#apply-token').val(token);
		jQuery('#broker-reference-hidden').val(brokerReference);
		jQuery('#lender-option-id-hidden').val(lenderOptionId);
		jQuery('#finance-option-id-hidden').val(financeOptionId);
		jQuery('#lender-id-hidden').val(lenderId);
		jQuery('#lender-name-hidden').val(lenderName);
		jQuery('#loan-type-hidden').val(loanType);
		jQuery('#fulfilling-broker-hidden').val(fulfillingBroker);
    jQuery('#fulfilment-apply-prompt-hidden').val(fulfilmentApplyPrompt);
    jQuery('#fulfilment-description').val(fulfilmentDescription);

		var buttons = [
			{
				text: 'Proceed',
				click: function(event) {
					var senderElement = jQuery(this).find('button:eq(0)');
          jQuery('#fulfilment-description').val(fulfilmentDescription);
					self.onApplyProceedClick(event, senderElement);

					jQuery(this).dialog('close');
				}
			},
			{
				text: 'Cancel',
				click: function(event) {
					jQuery(this).dialog('close');
				}
			}
		];

		jQuery('#apply-dialog').dialog({
			title: 'Apply',
			resizable: false,
			width: 500,
			height: 'auto',
			modal: true,
			autoOpen: true,
			draggable: false,
			buttons: buttons,
			open: function() {
				jQuery('body').css('overflow', 'hidden');
        jQuery('#fulfilment-description').val(fulfilmentDescription);
				jQuery(this).next('div').find('button:eq(0)').addClass('proceed');
			},
			beforeClose: function() {
				jQuery('body').css('overflow', 'auto');
			}
		});
	}

	this.autoSubmitApplyForm = function(itemIndex) {
		var resultMetadataElement = jQuery('#result-metadata');
		var itemMetadataElement = jQuery('#item-metadata-' + itemIndex);

		var token = jQuery(resultMetadataElement).find('[data-key=token]').attr('data-value');
		var brokerReference = jQuery(resultMetadataElement).find('[data-key=broker-reference]').attr('data-value');
		var lenderOptionId = jQuery(itemMetadataElement).find('[data-key=lender-option-id]').attr('data-value');
		var financeOptionId = jQuery(itemMetadataElement).find('[data-key=finance-option-id]').attr('data-value');
		var lenderId = jQuery(itemMetadataElement).find('[data-key=lender-id]').attr('data-value');
		var lenderName = jQuery(itemMetadataElement).find('[data-key=lender-name]').attr('data-value');
		var loanType = jQuery(itemMetadataElement).find('[data-key=loan-type]').attr('data-value');
    var fulfilmentDescription = jQuery(itemMetadataElement).find('[data-key=fulfilment-description]').attr('data-value');

		var fulfillingBroker = jQuery(itemMetadataElement).find('[data-key=fulfilling-broker]').attr('data-value');
		var fulfilmentCode = jQuery(itemMetadataElement).find('[data-key=fulfilment-code]').attr('data-value');
		var fulfilmentApplyPrompt = jQuery(itemMetadataElement).find('[data-key=fulfilment-apply-prompt]').attr('data-value');
		var fulfilmentHelpMessage = jQuery(itemMetadataElement).find('[data-key=fulfilment-help-message]').attr('data-value');

		jQuery('#apply-token').val(token);
		jQuery('#broker-reference-hidden').val(brokerReference);
		jQuery('#lender-option-id-hidden').val(lenderOptionId);
		jQuery('#finance-option-id-hidden').val(financeOptionId);
		jQuery('#lender-id-hidden').val(lenderId);
		jQuery('#lender-name-hidden').val(lenderName);
		jQuery('#loan-type-hidden').val(loanType);
		jQuery('#fulfilling-broker-hidden').val(fulfillingBroker);
    jQuery('#fulfilment-apply-prompt-hidden').val(fulfilmentApplyPrompt);
    jQuery('#fulfilment-description-hidden').val(fulfilmentDescription);
		jQuery('#apply-form').submit();
	}

	this.submitApplyForm = function() {
		jQuery('#apply-form').submit();
	}

	this.slideToggleMoreDetailsContainer = function(itemIndex) {
		var moreDetailsContainer = jQuery('#loan-more-details-' + itemIndex).find('div');

		jQuery(moreDetailsContainer).slideToggle({
			speed: 1500,
			easing: 'easeInOutCirc'
		});
	}

	this.hideAllMoreDetailsContainers = function() {
		jQuery('.loan-more-details').find('div').hide();
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.navMenu.init();

		this.hideAddAddressElement();
		this.hideTooltipElements();
		this.hideYourDetailsContainer();
		this.hideEmploymentStatusContainer();
		this.hidePropertyDetailsContainer();
		this.hideProfileContainer();
		this.hideFilterContainer();

		this.hideSearchResultLoader(0);
		this.hideSearchResultContainer(0);

		this.initTooltipElements();
		this.initProgressElements();
		this.initSearchFormElements();

		this.updateProgressElements();

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
			this.hideSearchResultContainer(150, function() {
				self.showSearchResultLoader(150);

				self.submitSearchForm(
					function onComplete() {
						self.initSearchResultElements();

						self.hideSearchResultLoader(150, function() {
							self.showSearchForm();
							self.hideLoanDetailsContainer();
							self.hideYourDetailsContainer();
							self.hideEmploymentStatusContainer();
							self.hidePropertyDetailsContainer();
							self.showProfileContainer();
							self.showFilterContainer();

							self.showSearchResultContainer(150);
						});
					},
					function onError() {
					}
				);
			});
		}

		jQuery('html, body').scrollTop(0);

		this.showView();
	}

	this.onViewStateChange = function() {
		var state = window.location.hash;

		if (this.disableHashChangeEventTrigger) {
			this.disableHashChangeEventTrigger = false;
			return;
		}

		if (state == '' || state == '#section1' || state == '#section2' || state == '#section3' || state == '#section4') {
			this.hideSearchResultContainer(0);

			this.hideProfileContainer();
			this.hideFilterContainer();

			this.showSearchForm();
			this.showLoanDetailsContainer();
			this.showYourDetailsContainer();
			this.showEmploymentStatusContainer();
			this.showPropertyDetailsContainer();

			if (state == '' || state == '#section1') {
				jQuery('html, body').scrollTop(0);
			} else if (state == '#section2') {
				this.scrollToYourDetailsContainer(0);
			} else if (state == '#section3') {
				this.scrollToEmploymentStatusContainer(0);
			} else if (state == '#section4') {
				this.scrollToPropertyDetailsContainer(0);
			}
		}

		if (state == '#search') {
			this.showSearchForm();
			this.hideLoanDetailsContainer();
			this.hideYourDetailsContainer();
			this.hideEmploymentStatusContainer();
			this.hidePropertyDetailsContainer();

			this.showProfileContainer();
			this.showFilterContainer();
			this.showSearchResultContainer(0);

			jQuery('html, body').scrollTop(0);
		}

		this.disableHashChangeEventTrigger = false;
	}

	this.onSection1ProgressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		if (!jQuery(senderElement).hasClass('disabled')) {
			this.slideDownLoanDetailsContainer(1000);
			this.updateProgressElements();

			this.pushViewState('#section1', true);
		}
	}

	this.onSection2ProgressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		if (!jQuery(senderElement).hasClass('disabled')) {
			this.slideDownYourDetailsContainer(1000);
			this.updateProgressElements();

			this.pushViewState('#section2', true);
		}
	}

	this.onSection3ProgressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		if (!jQuery(senderElement).hasClass('disabled')) {
			this.slideDownEmploymentStatusContainer(1000);
			this.updateProgressElements();

			this.pushViewState('#section3', true);
		}
	}

	this.onSection4ProgressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		if (!jQuery(senderElement).hasClass('disabled')) {
			this.slideDownPropertyDetailsContainer(1000);
			this.updateProgressElements();

			this.pushViewState('#section4', true);
		}
	}

	this.onLoanDetailsNextClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.slideDownYourDetailsContainer(1000);
		this.updateProgressElements();

		this.pushViewState('#section2', true);
	}

	this.onYourDetailsNextClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.slideDownEmploymentStatusContainer(1000);
		this.updateProgressElements();

		this.pushViewState('#section3', true);
	}

	this.onEmploymentStatusNextClick = function(event, senderElemen) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.slideDownPropertyDetailsContainer(1000);
		this.updateProgressElements();

		this.pushViewState('#section4', true);
	}

	this.onLoanAmountChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var value = jQuery(senderElement).val();

		jQuery('#loan-amount-alt-text').val(value);
	}

	this.onLoanPeriodChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var value = jQuery(senderElement).val();

		jQuery('#loan-period-alt-select').val(value);
		jQuery('#loan-period-alt-select').selectmenu('refresh');
	}

	this.onFindAddressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		this.validatePostcode(itemIndex);
		this.validateHouseNumberAndName(itemIndex);

		var isValidPostcode = this.isValidPostcode(itemIndex);
		var isValidHouseNumberAndName = this.isValidHouseNumberAndName(itemIndex);

		if (isValidPostcode && isValidHouseNumberAndName) {
			var postcode = jQuery('#postcode-text-' + itemIndex).val();
			var houseNumber = jQuery('#house-number-text-' + itemIndex).val();
			var houseName = jQuery('#house-name-text-' + itemIndex).val();

			this.removeAddressElement(itemIndex);
			this.hideSelectAddressElement(itemIndex);
			this.setAddressErrorMessage(itemIndex, '');
			this.showAddressLoaderElement(itemIndex);

			this.findAddress(postcode, houseNumber, houseName,
				function onComplete(result) {
					if (result.is_error) {
						self.hideAddressLoaderElement(itemIndex);
						self.setAddressErrorMessage(itemIndex, result.error_message);
						self.disableAddressFields(itemIndex, false);
					} else {
						self.hideAddressLoaderElement(itemIndex);
						self.createAddressElement(itemIndex);

						if (result.data.length > 0) {
							self.addAddressOptionElements(itemIndex, result.data);
							self.updateAddressElement(itemIndex);
							self.showSelectAddressElement(itemIndex);
						} else {
							self.removeAddressElement(itemIndex);
						}
					}
				},
				function onError(jqXHR, textStatus, errorThrown) {
					self.hideAddressLoaderElement(itemIndex);
					self.setAddressErrorMessage(itemIndex, textStatus);
				}
			);
		}
	}

	this.onSelectAddressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		var selectedAddressElement = jQuery('#address-select-' + itemIndex).find('option:selected');

		var houseNumber = jQuery(selectedAddressElement).attr('data-house-number');
		var houseName = jQuery(selectedAddressElement).attr('data-house-name');
		var streetName = jQuery(selectedAddressElement).attr('data-street-name');
		var postTown = jQuery(selectedAddressElement).attr('data-post-town');
		var locality = jQuery(selectedAddressElement).attr('data-locality');
		var county = jQuery(selectedAddressElement).attr('data-county');

		this.disableAddressFields(itemIndex, false);
		this.prepropulateAddressFields(itemIndex, houseNumber, houseName, streetName, postTown, locality, county);
		this.onHouseNumberOrNameChange(event, senderElement);

		this.validateAddress(itemIndex);
	}

	this.onHouseNumberOrNameChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		if (typeof itemIndex == 'undefined') {
			itemIndex = 0;
		}

		this.updateHouseNumberAndNameFields(itemIndex);
		this.validateHouseNumberAndName(itemIndex);
	}

	this.onMoveinDateChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		if (this.isValidMoveinDate()) {
			this.hideAddAddressElement();
		} else {
			var year = jQuery('#movein-year-select-0').val();
			var month = jQuery('#movein-month-select-0').val();

			if (this.getAddressItemCount() == 1 && (year == '' || month == '')) {
				this.hideAddAddressElement();
			} else {
				this.showAddAddressElement();
			}
		}
	}

	this.onRemoveAddressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		this.removeAddressItem(itemIndex);

		this.onMoveinDateChange(event, this);
	}

	this.onAddAddressClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.addAddressItem();
	}

	this.onHomeownerChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.updateHomeOwnerFields();
		this.onHomeownerLoanChange();
	}

	this.onHomeownerLoanChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.updateHomeOwnerLoanFields();
	}

	this.onLoanAmountAltChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var value = jQuery(senderElement).val();

		jQuery('#loan-amount-text').val(value);
	}

	this.onLoanPeriodAltChange = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var value = jQuery(senderElement).val();

		jQuery('#loan-period-select').val(value);
		jQuery('#loan-period-select').selectmenu('refresh');
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

		this.pushViewState('#search', true);

		if (this.isHiddenProfileContainer()) {
			this.hideSearchForm();
		}

		this.hideSearchResultContainer(150, function() {
			self.showSearchResultLoader(150);

			self.submitSearchForm(function() {
				self.initSearchResultElements();

				self.hideSearchResultLoader(150, function() {
					self.showSearchForm();
					self.hideLoanDetailsContainer();
					self.hideYourDetailsContainer();
					self.hideEmploymentStatusContainer();
					self.hidePropertyDetailsContainer();

					self.showProfileContainer();
					self.showFilterContainer();

					self.showSearchResultContainer(150);
				});
			});
		});
	}

	this.onAmendDetailsClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		this.pushViewState('#section1');

		this.hideSearchResultContainer(0);

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

		if (jQuery(senderElement).attr('data-action') == 'more') {
			jQuery(senderElement).html('Less&nbsp;details <i class="fa fa-angle-down"></i>');
			jQuery(senderElement).attr('data-action', 'less');
		} else {
			jQuery(senderElement).html('More&nbsp;details <i class="fa fa-angle-right"></i>');
			jQuery(senderElement).attr('data-action', 'more');
		}

		this.slideToggleMoreDetailsContainer(itemIndex);
	}

	this.onApplyClick = function(event, senderElement) {
		if (typeof event != 'undefined') {
			event.preventDefault();
		}

		var itemIndex = jQuery(senderElement).attr('data-index');

		var resultMetadataElement = jQuery('#result-metadata');
		var itemMetadataElement = jQuery('#item-metadata-' + itemIndex);
    var fulfilmentDescription = jQuery(itemMetadataElement).find('[data-key=fulfilment-description]').attr('data-value');

		if (fulfilmentDescription == 'URL' || fulfilmentDescription == 'Instant lender decision') {
			this.autoSubmitApplyForm(itemIndex);
		} else {
			this.showApplyConfirmDialog(itemIndex);
		}
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
	this.navMenu = new navMenuController();

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.showView = function() {
		jQuery('#page').show();
	}

	this.hideView = function() {
		jQuery('#page').hide();
	}

	this.submitApplyRequestForm = function() {
    jQuery('#apply-request-form').submit();
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.navMenu.init();

		if (jQuery('#apply-request-form').length > 0) {
			setTimeout(function() {
				self.submitApplyRequestForm();
			}, 1000);
		}

		jQuery('html, body').scrollTop(0);

		this.showView();
	}
	/* */

	this.init();
}

var blogPageController = function() {
	var self = this;
	this.objectId = 'blog-page';
	this.navMenu = new navMenuController();

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.showView = function() {
		jQuery('#page').show();
	}

	this.hideView = function() {
		jQuery('#page').hide();
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.navMenu.init();

		jQuery('html, body').scrollTop(0);

		this.showView();
	}
	/* */

	this.init();
}

var qaPageController = function() {
	var self = this;
	this.objectId = 'qa-page';
	this.navMenu = new navMenuController();

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.showView = function() {
		jQuery('#page').show();
	}

	this.hideView = function() {
		jQuery('#page').hide();
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.navMenu.init();

		jQuery('html, body').scrollTop(0);

		this.showView();
	}
	/* */

	this.init();
}

var faqPageController = function() {
	var self = this;
	this.objectId = 'faq-page';
	this.navMenu = new navMenuController();

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.showView = function() {
		jQuery('#page').show();
	}

	this.hideView = function() {
		jQuery('#page').hide();
	}

	this.hideAllFaqAnswers = function() {
		jQuery('.faq-answer').hide();
	}

	this.slideToggleFaqAnswer = function(itemId) {
		var faqItem = jQuery('#faq-item-' + itemId);

		jQuery(faqItem).find('.faq-answer').slideToggle(500);
		jQuery(faqItem).find('i').toggleClass('fa-minus').toggleClass('fa-plus');
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.navMenu.init();

		this.hideAllFaqAnswers();

		jQuery('.faq-question').click(function(event) {
			self.onFaqQuestionClick(event, this);
		});

		jQuery('html, body').scrollTop(0);

		this.showView();

		jQuery(window).trigger('resize');
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

var defaultPageController = function() {
	var self = this;
	this.objectId = 'default-page';
	this.navMenu = new navMenuController();

	/* METHODS */
	this.init = function() {
		this.bindEvents();
	}

	this.bindEvents = function() {
		jQuery(document).ready(function() {
			self.onViewReady();
		});
	}

	this.showView = function() {
		jQuery('#page').show();
	}

	this.hideView = function() {
		jQuery('#page').hide();
	}
	/* */

	/* EVENTS */
	this.onViewReady = function() {
		this.navMenu.init();

		jQuery('html, body').scrollTop(0);

		this.showView();
	}
	/* */

	this.init();
}

var app = {
	homePageController: null,
	loanSearchController: null,
	loanSmartSearchController: null,
	loanApplyController: null,
	blogPageController: null,
	qaPageController: null,
	faqPageController: null,
	defaultPageController: null,

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
		} else if (pathname.match(/^\/blog(\/)?$/)) {
			this.blogPageController = new blogPageController();
		} else if (pathname.match(/^\/qa(\/)?$/) || pathname.match(/^\/node\/14(\/)?$/)) {
			this.qaPageController = new qaPageController();
		} else if (pathname.match(/^\/faq(\/)?$/)) {
			this.faqPageController = new faqPageController();
		} else {
			this.defaultPageController = new defaultPageController();
		}
	}
}
app.init();



//GOOGLE ANALYTICS TRACKING CODES
jQuery(document).ready(function($) {
	/* Apply Direct Button */
	$('.apply-btn').on('click', function() {
	  ga('send', 'event', 'link', 'click', 'applydirectly');
	});
	/* Apply Direct Button */
	$('.get-smart-results').on('click', function() {
	  ga('send', 'event', 'link', 'click', 'results');
	});
	/* UK Credit Rating Ad */
	$('.advert-container a').on('click', function() {
	  	ga('send','event','link','click','ukcreditrating');
	});
	/* PIGGYBANK LOAN PAYDAY LOANS */
	$('#PiggyBank a').on('click', function() {
		//alert('piggybankapply');
	  	ga('send', 'event', 'link', 'click', 'piggybankapply');
	});
	/* TIDEUOVER LOAN PAYDAY LOANS */
	$('#TIDEUOVER a').on('click', function() {
		//alert('tideuoverapply');
		ga('send', 'event', 'link', 'click', 'tideuoverapply');
	});
	/* Wageme LOAN PAYDAY LOANS */
	$('#Wageme > a:nth-child(1)').on('click', function() {
		//alert('wagemeapply');
		ga('send', 'event', 'link', 'click', 'wagemeapply');
	});
	/* QuickQuid LOAN PAYDAY LOANS */
	$('#QuickQuid > a:nth-child(1)').on('click', function() {
		//alert('quickquidapply');
		ga('send', 'event', 'link', 'click', 'quickquidapply');
	});
});
