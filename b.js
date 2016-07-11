function sendformcheck(){
	$('#formCheck').val('1');
}
function relativeTime(secondsLeft) {
	var claimText = '0 satoshi';
	var tmpClaim = 0;
	var tmpPeriod = 0;
	if (secondsLeft >= directSat[directSat.length - 1][0]) {
		tmpClaim = directSat[directSat.length - 1][1];
	} else {
		for (var i = 0; i < directSat.length; i++) {
			var dirSat = directSat[i];
			if (secondsLeft < dirSat[0]) {
				tmpClaim = tmpClaim
						+ Math
								.round((secondsLeft - tmpPeriod)
										* ((dirSat[1] - tmpClaim) / (dirSat[0] - tmpPeriod)));
				break;
			} else {
				tmpClaim = dirSat[1];
				tmpPeriod = dirSat[0];
				if (secondsLeft == dirSat[0])
					break;
			}
		}
	}
	claimText = tmpClaim + ' satoshi';
	$('#ClaimAmount').html(claimText);
	$('#ClaimAmount').show();
	//$('#SubmitButton').toggle(secondsLeft > directSat[0][0]);
}

function showPop(namePop) {
	$(namePop).bPopup({
		fadeSpeed : 'slow',
		followSpeed : 1500,
		modalColor : '#FFCE54'
	});
}
function showCaptcha() {
	var t = true;
	$('#CaptchaPopup').bPopup({
		fadeSpeed : 'slow',
		followSpeed : 1500,
		modalColor : '#FFCE54',
		appending : false,
		appendTo : '#MainForm'
	});
	$("#adcopy_response").focus();


	if (t) {
		$('#ClaimButton').show();
		$('#ClaimButtonTest').show();
	}
	$('#SignInSubmitButton').hide();
}
function showSignInCaptcha() {
	$('#CaptchaPopup').bPopup({
		fadeSpeed : 'slow',
		followSpeed : 1500,
		modalColor : '#FFCE54',
		appending : false,
		appendTo : '#MainForm'
	});
	$("#adcopy_response").focus();
	$('#ClaimButton').hide();
	$('#ClaimButtonTest').hide();
	$('#SignInSubmitButton').show();
}
function refreshClaim(interval) {
	var isStop = false;
	var paymentAddress = $('#ClaimePaymentAddress').val();
	if (paymentAddress !== undefined && paymentAddress.length > 0) {
		$('#TimerLoader').hide();
		$('#ClaimAmountLoader').hide();
		var ret = "";
		var date = new Date();
		var now = date.getTime() / 1000;
		var secondsLeft = parseInt(now - directStartT) + directTime;
		var formatd = 'HMS';
		if (secondsLeft > 86400)
			formatd = 'DHMS';
		if (secondsLeft > 2419200)
			secondsLeft = 2419200;
		$('#Timer').countdown({
			since : -secondsLeft,
			format : formatd
		}).show();
		relativeTime(secondsLeft);
		setTimeout(function() {
			refreshClaim(interval);
		}, interval);
	} else {
		$('#Timer').html('---').show();
	}
}

$(function() {
	$('#signUse').val('12093894587293843');
	$.ajaxSetup({
		cache : false
	});
	refreshClaim(1000);
});
