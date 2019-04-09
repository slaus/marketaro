$(document).foundation();
// Set vars and utilities
// =================

var offsetPct = '';
var slider_value = 0;

var dataLayer = [{
    'Title': 'Pricing',
    'AppUserID':'undefined',
    'CanonicalUrl':'https://marketaro.com/pricing/',
    'Product':'NULL',
    'Section':'pricing',
    'Subsection':'index',
}];


// Return month name
function monthName(nth) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[nth];
}

// Function to format amounts with Commas
function CommaStyle(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}

// Read of create pricing cookie
// =================

function updatePricingCookie(key, value) {
    if(typeof $.cookie('pricingSelections') === 'undefined'){
        var cookieValues = new Object();
    } else {
        var cookieValues = JSON.parse($.cookie('pricingSelections'));
    }
    cookieValues[key] = value;
    $.cookie('pricingSelections', JSON.stringify(cookieValues), { path: '/', expires: 7, domain: window.location.hostname});
}

// Select plan
// =================

function selectPlan(plan) {
    // Unselect
    $('.selected').removeClass('selected');
    $('[data-plan] input[type="radio"]').prop('checked',false);
    // Select
    $('.plans').attr('data-selected',plan);
    $('[data-plan='+plan+']').addClass('selected');
    $('[data-plan='+plan+'] input[type="radio"]').prop('checked', true);
    $('.pricing-module').removeClass('selected-essentials selected-pro selected-premier').addClass('selected-'+plan);
}

// Enable or disable a plan
// =================

function disablePlan(plan) {
    $('table [data-plan='+plan+']').addClass('disabled');
    $('[data-plan='+plan+'] input[type="radio"]').attr('disabled', true)
}

function enablePlan(plan) {
    $('table [data-plan='+plan+']').removeClass('disabled');
    $('[data-plan='+plan+'] input[type="radio"]').attr('disabled', false)
}

// Set slider values
function setSliderValues (this_slider, slider_value) {
    var slider_max = this_slider.data('slider-max');
    var slider_wrap = this_slider.closest('.slider-wrap');
    var slider_count = slider_wrap.find('.slider-datapoint');

    if ( slider_value == slider_max ) {
        slider_wrap.addClass('maxed');
        slider_value = slider_value - 1;
        this_slider.attr('data-slider-value', slider_max);
    } else {
        slider_wrap.removeClass('maxed');
        this_slider.attr('data-slider-value', slider_value);
    }
    slider_count.html(CommaStyle(slider_value));
    slider_value = slider_value;
}




// Estimate cost
// =================

function estimate(specified) {

    // Readout Values
    var readout_values = {
        //Changed pricing parameters will need to be added here,
        //and referenced from this array. It is used to generate the values cookie.
        selected_plan : $('.plans').attr('data-selected'),
        email_volume : $('.volume-slider').attr('data-slider-value'),
        contact_count : $('.contact-slider').attr('data-slider-value')
    };

    var base_rate;
    var overage_rate;
    var emails_included;
    var plan_name;
    var plan_id;
    var email_cost;

    var essentials_40_rate = 9.95;
    var essentials_40_overage = .001;
    var essentials_40_volume = 40000;
    var essentials_40_overage_cost = (readout_values.email_volume - essentials_40_volume) > 0 ? (readout_values.email_volume - essentials_40_volume) * essentials_40_overage : 0;
    var essentials_40_estimate = essentials_40_rate + essentials_40_overage_cost;

    var essentials_100_rate = 19.95;
    var essentials_100_overage = .00075;
    var essentials_100_volume = 100000;
    var essentials_100_overage_cost = (readout_values.email_volume - essentials_100_volume) > 0 ? (readout_values.email_volume - essentials_100_volume) * essentials_100_overage : 0;
    var essentials_100_estimate = essentials_100_rate + essentials_100_overage_cost;

    var pro_100_rate = 79.95;
    var pro_100_overage = .00085;
    var pro_100_volume = 100000;
    var pro_100_overage_cost = (readout_values.email_volume - pro_100_volume) > 0 ? (readout_values.email_volume - pro_100_volume) * pro_100_overage : 0;
    var pro_100_estimate = pro_100_rate + pro_100_overage_cost;

    var pro_300_rate = 199.95;
    var pro_300_overage = .00050;
    var pro_300_volume = 300000;
    var pro_300_overage_cost = (readout_values.email_volume - pro_300_volume) > 0 ? (readout_values.email_volume - pro_300_volume) * pro_300_overage : 0;
    var pro_300_estimate = pro_300_rate + pro_300_overage_cost;

    var pro_700_rate = 399.95;
    var pro_700_overage = .00045;
    var pro_700_volume = 700000;
    var pro_700_overage_cost = (readout_values.email_volume - pro_700_volume) > 0 ? (readout_values.email_volume - pro_700_volume) * pro_700_overage : 0;
    var pro_700_estimate = pro_700_rate + pro_700_overage_cost;

    var pro_1_5_rate = 699.95;
    var pro_1_5_overage = .00045;
    var pro_1_5_volume = 1500000;
    var pro_1_5_overage_cost = (readout_values.email_volume - pro_1_5_volume) > 0 ? (readout_values.email_volume - pro_1_5_volume) * pro_1_5_overage : 0;
    var pro_1_5_estimate = pro_1_5_rate + pro_1_5_overage_cost;

    var pro_2_5_rate = 949.95;
    var pro_2_5_overage = .00045;
    var pro_2_5_volume = 2500000;
    var pro_2_5_overage_cost = (readout_values.email_volume - pro_2_5_volume) > 0 ? (readout_values.email_volume - pro_2_5_volume) * pro_2_5_overage : 0;
    var pro_2_5_estimate = pro_2_5_rate + pro_2_5_overage_cost;

    var email_volume_max = 4000000;

    // Disable and select proper plans (Automatically)

    if ( readout_values.email_volume > email_volume_max || readout_values.contact_count > 200000 ) {

        readout_values.selected_plan = 'premier';
        selectPlan('premier');
        disablePlan('essentials');
        disablePlan('pro');

    } else {

        if ( essentials_100_estimate > pro_300_estimate ) {
            enablePlan('pro');
            disablePlan('essentials');
            if ( specified != 'manually' || readout_values.selected_plan == 'essentials' ) {
                readout_values.selected_plan = 'pro';
                selectPlan('pro');
            }

        } else if ( essentials_100_estimate < pro_300_estimate ) {
            enablePlan('pro');
            enablePlan('essentials');
            if ( specified != 'manually' ) {
                readout_values.selected_plan = 'essentials';
                selectPlan('essentials');
            }

        } else {
            enablePlan('essentials');
            if ( specified != 'manually' ) {
                readout_values.selected_plan = 'essentials';
                selectPlan('essentials');
            }
        }
    }

    // Set plan IDs and properties

    if ( essentials_40_estimate < essentials_100_estimate ) {
        essentials_base_rate = essentials_40_rate;
        essentials_overage_rate = essentials_40_overage;
        essentials_emails_included = essentials_40_volume;
        essentials_email_cost = essentials_40_estimate;
        essentials_plan_name = "Essentials 40K";
        essentials_plan_id = '8b9ce1c9-ce8a-11e4-b4e5-5fcde71ee009';
    } else {
        essentials_base_rate = essentials_100_rate;
        essentials_overage_rate = essentials_100_overage;
        essentials_emails_included = essentials_100_volume;
        essentials_email_cost = essentials_100_estimate;
        essentials_plan_name = "Essentials 100K";
        essentials_plan_id = '8b9cf53b-ce8a-11e4-b4e5-5fcde71ee009';
    }
    $('.price-essentials').html(CommaStyle(essentials_base_rate));
    $('.emails-included-essentials').text(CommaStyle(essentials_emails_included));
    $('.overage-rate-essentials').text(essentials_overage_rate);

    if ( pro_100_estimate < pro_300_estimate ) {
        pro_base_rate = pro_100_rate;
        pro_overage_rate = pro_100_overage;
        pro_emails_included = pro_100_volume;
        pro_email_cost = pro_100_estimate;
        pro_plan_id = '8b9d04af-ce8a-11e4-b4e5-5fcde71ee009';
        pro_plan_name = "Pro 100K";
    } else if ( pro_300_estimate < pro_700_estimate ) {
        pro_base_rate = pro_300_rate;
        pro_overage_rate = pro_300_overage;
        pro_emails_included = pro_300_volume;
        pro_email_cost = pro_300_estimate;
        pro_plan_name = "Pro 300K";
        pro_plan_id = '8b9d0cf5-ce8a-11e4-b4e5-5fcde71ee009';
    } else if ( pro_700_estimate < pro_1_5_estimate ) {
        pro_base_rate = pro_700_rate;
        pro_overage_rate = pro_700_overage;
        pro_emails_included = pro_700_volume;
        pro_email_cost = pro_700_estimate;
        pro_plan_name = "Pro 700K";
        pro_plan_id = '8b9d1f56-ce8a-11e4-b4e5-5fcde71ee009';
    } else if ( pro_1_5_estimate < pro_2_5_estimate ) {
        pro_base_rate = pro_1_5_rate;
        pro_overage_rate = pro_1_5_overage;
        pro_emails_included = pro_1_5_volume;
        pro_email_cost = pro_1_5_estimate;
        pro_plan_name = "Pro 1.5M";
        pro_plan_id = '0c37e79f-8c17-453a-b72d-061ca2fa5c54';
    } else {
        pro_base_rate = pro_2_5_rate;
        pro_overage_rate = pro_2_5_overage;
        pro_emails_included = pro_2_5_volume;
        pro_email_cost = pro_2_5_estimate;
        pro_plan_name = "Pro 2.5M";
        pro_plan_id = 'fddb569d-5745-48cd-af8c-e78ba8e3b478';
    }
    $('.price-pro').html(CommaStyle(pro_base_rate));
    $('.emails-included-pro').text(CommaStyle(pro_emails_included));
    $('.overage-rate-pro').text(pro_overage_rate);

    if (readout_values.selected_plan == 'essentials' ) {
        base_rate = essentials_base_rate
        overage_rate = essentials_overage_rate
        emails_included = essentials_emails_included
        plan_name = essentials_plan_name
        plan_id = essentials_plan_id
        email_cost = essentials_email_cost;
    } else if (readout_values.selected_plan == 'pro' ) {
        base_rate = pro_base_rate
        overage_rate = pro_overage_rate
        emails_included = pro_emails_included
        plan_name = pro_plan_name
        plan_id = pro_plan_id
        email_cost = pro_email_cost;
    } else if (readout_values.selected_plan == 'premier') {
        plan_name = "Premier";
        email_cost = ( essentials_email_cost > pro_email_cost ) ? pro_email_cost : essentials_email_cost;
    }

    // Do math for estimate
    var contact_rate = .001; // $10/10,000
    var overage = ( readout_values.email_volume - emails_included > 0 ) ? ( readout_values.email_volume - emails_included ) : 0;
    var overage_cost = overage * overage_rate;
    var overage_cost = Math.round(overage_cost*100)/100;
    var contact_cost = ( readout_values.contact_count - 2000 ) * contact_rate;
    var contact_cost = ( readout_values.contact_count > 2000 ) ? Math.ceil(contact_cost/10) * 10 : 0;
    var monthly_estimate = email_cost + contact_cost;
    var lowest_email_cost = ( essentials_email_cost > pro_email_cost ) ? pro_email_cost : essentials_email_cost;

    // Get Prorated Cost
    var current_date = new Date();
    var current_day = current_date.getDate();
    var current_year = current_date.getYear();
    var current_month = current_date.getMonth();
    var days_in_month = 32 - new Date(current_year, current_month, 32).getDate();
    var month_remaining = ( days_in_month - current_day + 1 ) / days_in_month;
    var prorated_cost = base_rate * month_remaining;
    var prorated_cost = (Math.round(prorated_cost*100)/100).toFixed(2);

    // Show free CTA in Readout
    if ( readout_values.email_volume <= 12000 && readout_values.contact_count <= 2000 ) {
        $('.readout-free-cta').removeClass('hide');
    } else {
        $('.readout-free-cta').addClass('hide');
    }

    // Show free Trial CTA in Readout
    if ( emails_included == 40000 && readout_values.selected_plan == 'essentials' ) {
        $('.readout-free-trial-cta').removeClass('hide');
    } else {
        $('.readout-free-trial-cta').addClass('hide');
    }

    // Readout Estimates

    if (readout_values.selected_plan != 'premier') {
        $('.contact-count-datapoint').html(CommaStyle(readout_values.contact_count));
        $('.email-volume-datapoint').html(CommaStyle(readout_values.email_volume));
        $('.plan-datapoint').html(plan_name);
        $('.monthly-estimate').html(CommaStyle(monthly_estimate));
        $('.prorated-cost').html(CommaStyle(prorated_cost));
        $('.prorated-month').html(monthName(current_month));
        $('.emails-included-datapoint').html(CommaStyle(emails_included));
        $('.base-rate-datapoint').html(CommaStyle(base_rate));
        $('.overage-datapoint').html(CommaStyle(overage));
        $('.overage-rate-datapoint').html(overage_rate);
        $('.overage-cost-datapoint').html(CommaStyle(overage_cost).toFixed(2));
        // $('.signup-button').attr('href','https://app.marketaro.com/signup?id=' + plan_id);
        $('.signup-button').attr('href','https://members.marketaro.com/index.php?page=register');
    }
    $('.email-cost-datapoint').html(CommaStyle(lowest_email_cost));
    $('.contact-cost-datapoint').html(CommaStyle(contact_cost).toFixed(2));

    return readout_values;
}

// Initialize sliders
// ===================

var sliders = document.getElementsByClassName('slider');

for ( var i = 0; i < sliders.length; i++ ) {
    var slider = $(sliders[i]);
    var slider_steps = slider.data('slider-steps');
    var startValue = slider.data('slider-steps')[0];

    if( $.cookie('pricingSelections') ) {
        var cookie_readout_values = JSON.parse($.cookie('pricingSelections'));

        //Changed pricing parameters will need to be added here
        if (slider.hasClass('volume-slider')) {
            startValue = cookie_readout_values['email_volume'];
        } else if (slider.hasClass('contact-slider')) {
            startValue = cookie_readout_values['contact_count'];
        }
    }

    if ( slider_steps.length == 5 ) {
        noUiSlider.create(sliders[i], {
            start: startValue,
            connect: [true, false],
            step: slider.data('slider-increments')[0],
            range: {
                'min': [ 0 ],
                '30%': [ slider.data('slider-steps')[1], slider.data('slider-increments')[1] ],
                '60%': [ slider.data('slider-steps')[2], slider.data('slider-increments')[2] ],
                '90%': [ slider.data('slider-steps')[3], slider.data('slider-increments')[3] ],
                '97%': [ slider.data('slider-steps')[4], slider.data('slider-increments')[4] ],
                'max': slider.data('slider-max')
            }
        });
    } else if  ( slider_steps.length == 6 ) {
        noUiSlider.create(sliders[i], {
            start: startValue,
            connect: [true, false],
            step: slider.data('slider-increments')[0],
            range: {
                'min': [ 0 ],
                '30%': [ slider.data('slider-steps')[1], slider.data('slider-increments')[1] ],
                '55%': [ slider.data('slider-steps')[2], slider.data('slider-increments')[2] ],
                '70%': [ slider.data('slider-steps')[3], slider.data('slider-increments')[3] ],
                '85%': [ slider.data('slider-steps')[4], slider.data('slider-increments')[4] ],
                '97%': [ slider.data('slider-steps')[5], slider.data('slider-increments')[5] ],
                'max': slider.data('slider-max')
            }
        });
    }
}

for ( var i = 0; i < sliders.length; i++ ) {

    sliders[i].noUiSlider.on('update', function() {
        var this_slider = $(this['target']);
        var slider_value = parseInt(this.get());
        setSliderValues(this_slider, slider_value);
        if( $.cookie('pricingSelections' )) {
            var prev_cookie_readout_values = JSON.parse($.cookie('pricingSelections'));
        } else {
            var prev_cookie_readout_values = false;
        }
        if(prev_cookie_readout_values && typeof prev_cookie_readout_values.specified !== 'undefined' ) {
            var estimate_readout_values = estimate(prev_cookie_readout_values['specified']);
            estimate_readout_values.selected_plan = prev_cookie_readout_values['selected_plan'];
            estimate_readout_values.specified = prev_cookie_readout_values['specified'];
        } else {
            var estimate_readout_values = estimate();
        }
        for(var propt in estimate_readout_values) {
            updatePricingCookie(propt, estimate_readout_values[propt]);
        }
        if(this_slider.hasClass('volume-slider')) {
            dataLayer.push({
                'event': 'pricingFunnel',
                'eventAction':'email_slider_interaction',
                // 'currentSelection':JSON.parse($.cookie('pricingSelections'))
            })
        }
        if(this_slider.hasClass('contact-slider')) {
            dataLayer.push({
                'event': 'pricingFunnel',
                'eventAction':'contact_slider_interaction',
                // 'currentSelection':JSON.parse($.cookie('pricingSelections'))
            })
        }
    });

}



// COOKIE -> Restore previous state from cookie
// ==================

$(document).ready( function() {

    if( $.cookie('pricingSelections') ) {

        var cookie_readout_values = JSON.parse($.cookie('pricingSelections'));
        //Changed pricing parameters will need to be added here
        setSliderValues($('.estimate-volume .slider-emails .slider'),cookie_readout_values['email_volume']);
        setSliderValues($('.estimate-volume .slider-contacts .slider'),cookie_readout_values['contact_count']);

        //console.log(cookie_readout_values['selected_plan']);
        previously_selected_plan = cookie_readout_values['selected_plan'];
        previously_specified = cookie_readout_values['specified'];
        selectPlan(previously_selected_plan);
        estimate(previously_specified);

        if(typeof cookie_readout_values['step'] !== 'undefined') {
            $('.pricing-module').removeClass('step-1').addClass(cookie_readout_values['step']);
            $('.estimate-volume').hide();
        }

        if(typeof cookie_readout_values['editing-estimate'] !== 'undefined') {
            if( cookie_readout_values['editing-estimate'] == true) {
                $('.pricing-module').addClass('editing-estimate');
                $('.estimate-volume').show();
            }
        }

    }

});

// Start Checkout

$('a.get-started').click(function(event){

    event.preventDefault();

    dataLayer.push({
        'event': 'pricingFunnel',
        'eventAction':'get_started_click',
        'currentSelection':JSON.parse($.cookie('pricingSelections'))
    });

    if ($(this).attr("disabled")) return;

    var planlvl = jQuery(this).attr('id');

    window.location.href = $(this).attr("href");

});

// Select Plan on click
$(document).delegate('th[data-plan] input[type="radio"], th[data-plan], td[data-plan]','click', function() {

    // If plan is not disabled
    if ( !$(this).hasClass('disabled') ) {

        // Select clicked plan
        var plan = $(this).attr('data-plan');
        selectPlan(plan);
        var estimate_readout_values = estimate('manually');
        updatePricingCookie('specified', 'manually');
        for(var propt in estimate_readout_values) {
            updatePricingCookie(propt, estimate_readout_values[propt]);
        }
        $('.pricing-module').addClass('selected-manually');
        dataLayer.push({
            'event': 'pricingFunnel',
            'eventAction':'plan_column_change',
            'currentSelection':JSON.parse($.cookie('pricingSelections'))
        });
    }

});

$('[data-module-toggle]').click( function() {
    var toggle = $(this).attr('data-module-toggle');
    $('.pricing-module').toggleClass(toggle);
    updatePricingCookie(toggle, $('.pricing-module').hasClass(toggle));
});

// Animations for each step
$('.next-step').click( function() {
    $('.estimate-volume').addClass('fade-out');
    $('.estimate-volume').slideUp();
    updatePricingCookie('step',$(this).attr('data-step'));
    dataLayer.push({
        'event': 'pricingFunnel',
        'eventAction':'choose_plan_click',
        'currentSelection':JSON.parse($.cookie('pricingSelections'))
    });
    MotionUI.animateIn('.choose-plan', 'fade-it-in');
});

$('.change-plan').click( function() {
    $('.estimate-volume').slideDown();
    $('.estimate-volume').removeClass('fade-out');
    dataLayer.push({
        'event': 'pricingFunnel',
        'eventAction':'change_click',
        'currentSelection':JSON.parse($.cookie('pricingSelections'))
    });
});
