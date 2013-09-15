function check_mail(address) {
	  if (window.RegExp) {
	    var notvalid = "(@.*@)|(\\.\\.)|(@\\.)|(\\.@)|(^\\.)";
	    var valid = "^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
	    var regnv = new RegExp(notvalid);
	    var regv = new RegExp(valid);
	    if (!regnv.test(address) && regv.test(address)) return true;
	    return false;
	 } else {
	    if(address("@") >= 0) return true;
	    return false;
	 }
}

function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

function try_register() {
	var privacy_ischecked = document.newsletterform.trattamento_privacy[0].checked;
	if (!privacy_ischecked) {
		alert("E' obbligatorio acconsentire all'informativa della privacy!");
		_gaq.push(['_trackEvent', 'Newsletter Articolo', 'Errore: no privacy', _newslettertitle_, 0, true]);
		return false;
	}
	var inviadem_ischecked = document.newsletterform.n_inviadem[0].checked;
	if (!document.newsletterform.n_inviadem[0].checked && !document.newsletterform.n_inviadem[1].checked) {
		alert("Devi selezionare almeno un valore sul trattamento dei dati personali!");
		_gaq.push(['_trackEvent', 'Newsletter Articolo', 'Errore: no trattamento dati personali', _newslettertitle_, 0, true]);
		return false;
	}
	var mail_address = document.newsletterform.n_email.value;
	if (mail_address=="" || !check_mail(mail_address)) {
		alert("Devi inserire una mail valida!");
		_gaq.push(['_trackEvent', 'Newsletter Articolo', 'Errore: mail errata', _newslettertitle_, 0, true]);
		return false;
	}
	var privacy = getCheckedValue(document.newsletterform.trattamento_privacy);
	var inviadem = getCheckedValue(document.newsletterform.n_inviadem);
	do_registration(mail_address, privacy, inviadem);
	return true;
}

function do_registration(mail_address, privacy, inviadem) {
	jQuery.ajax({
		type: 'POST',
		url: _ajaxurl_,
		data: 'action=newsletter_subscribe&email=' + mail_address + '&privacy=' + privacy + '&inviadem=' + inviadem,
		success: function (res) {
			// iscrizione OK
			if (res == "OK") {
				jQuery("#newsletter_box").html("<form><strong>Iscrizione effettuata</strong><br />Grazie per aver richiesto l'iscrizione alla nostra newsletter.</form>");
				_gaq.push(['_trackEvent', 'Newsletter Articolo', 'Ok', _newslettertitle_, 1, true]);
			} else if( res == 'KO' ) {
				jQuery("#newsletter_box").html("<p id=\"risposta\"><strong>Iscrizione non effettuata</strong><br />Grazie per aver richiesto i nostri aggiornamenti.</p>");
				_gaq.push(['_trackEvent', 'Newsletter Articolo', 'Errore: ' + res, _newslettertitle_, 0, true]);
			} else {
				jQuery("#newsletter_box").html("<form><strong>Iscrizione non effettuata</strong><br />Grazie per aver richiesto i nostri aggiornamenti.</form>");
				_gaq.push(['_trackEvent', 'Newsletter Articolo', 'Errore: ' + res, _newslettertitle_, 0, true]);
			}
			window.setTimeout( 'replace_html();', 6000 );
		},
		error: function (res) {
			// errore
			jQuery("#newsletter_box").html("<form><strong>Iscrizione non effettuata</strong><br />Grazie per aver richiesto i nostri aggiornamenti.</form>");
			_gaq.push(['_trackEvent', 'Newsletter Articolo', 'Errore: ' + res, _newslettertitle_, 0, true]);
		}
	});

	return false;
}

function replace_html() {
	jQuery('#newsletter_box').html( old_html );
}

function init() {
	old_html = jQuery("#newsletter_box").html();
}

var old_html;
jQuery( document ).ready( init );