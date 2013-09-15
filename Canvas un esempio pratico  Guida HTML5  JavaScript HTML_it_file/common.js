if( typeof it == 'undefined' ){ it = new Object(); };if( typeof it.html == 'undefined' ){ it.html = new Object(); };if( typeof it.html.hlab == 'undefined' ){ it.html.hlab = new Object(); };
if( typeof it.html.hlab.advertising == 'undefined' )
{
	it.html.hlab.advertising = new Object();
	it.html.hlab.advertising.commonHiddenElements = new Array
	(
		'.banner-content', '.video-content'
	);

	/**
	 * Show all elements in the param array
	 *
	 * @param elements, array, required, The array of elements to show
	 * @param showCommon, boolean, required, True to show common elements
	**/
	it.html.hlab.advertising.showElements = function( elements, showCommon )
	{
		var e = new Array();
		if( typeof elements != 'undefined' )
		{
			e = e.concat( elements );
		}
		if( showCommon )
		{
			e = e.concat( it.html.hlab.advertising.commonHiddenElements );
		}
		jQuery( e.join( ', ' ) ).setVisible( true );
	};

	/**
	 * Hide all elements in the param array
	 *
	 * @param elements, array, required, The array of elements to show
	 * @param hideCommon, boolean, required, True to hide common elements
	**/
	it.html.hlab.advertising.hideElements = function( elements, hideCommon )
	{
		var e = new Array();
		if( typeof elements != 'undefined' )
		{
			e = e.concat( elements );
		}
		if( hideCommon )
		{
			e = e.concat( it.html.hlab.advertising.commonHiddenElements );
		}
		jQuery( e.join( ', ' ) ).setVisible( false );
	};

	/**
	 * Append all trackers images to body element
	 *
	 * @param trackers, array, required, The array trackers imgs to append
	**/
	it.html.hlab.advertising.appendTrackers = function( trackers )
	{
		for( var i = 0; i < trackers.length; i++ )
		{
			jQuery( '<img border="0" alt="" id="sponsor-img-' + i + '" style="display:none;" />' ).appendTo( 'body' ).attr( 'src', trackers[ i ] );
		}
	};

	/**
	 * Writes a message to the firebug console
	 *
	 * @param message, string, required, The message to write
	**/
	it.html.hlab.advertising.debug = function( message )
	{
		if ( window.console && window.console.log )
		{
			window.console.log( message );
		} else {
			alert( message );
		}
	};

	/**
	 * Trace an object properties
	 *
	 * @param object, mixed, required, The the object to dump
	**/
	it.html.hlab.advertising.dump = function( object )
	{
		for( var prop in object )
		{
			it.html.hlab.advertising.debug( prop + ": " + object[prop] );
		}
	};

	/**
	 * Check if browser is IE6
	 *
	 * @return boolean
	**/
	it.html.hlab.advertising.getIsIE6 = function()
	{
		return jQuery.browser.msie && Number( jQuery.browser.version.split('.')[0] ) <= 6;
	};

	/**
	 * Open a link href attribute content to a new window
	 *
	 * @return boolean
	**/
	it.html.hlab.advertising.openExternal = function()
	{
		window.open( jQuery( this ).attr( 'href' ), '_blank' );
		return false;
	};

	/**
	 * Creates an iframe document
	 *
	 * @param parent, object, optional, The element which append the iframe to
	 *
	 * @return jQuery object
	**/
	it.html.hlab.advertising.createIFrame = function( parent )
	{
		var iframe = jQuery.forge( 'iframe' );

		if( parent == null )
		{
			parent = jQuery( 'body' );
		}
		parent.append( iframe );
		iframe = iframe.get( 0 );
		iframe.doc = null;
		if( iframe.contentDocument )
		{
			iframe.doc = iframe.contentDocument;
		}
		else if ( iframe.contentWindow )
		{
			iframe.doc = iframe.contentWindow.document;
		}
		else if ( iframe.document )
		{
			iframe.doc = iframe.document;
		}
		if( iframe.doc == null )
		{
			return null;
		}
		iframe.doc.open();
		iframe.doc.close();
		iframe = jQuery( iframe );
		iframe.getBody = function()
		{
			return jQuery( jQuery( this ).get( 0 ).doc.body );
		};
		return iframe;
	};

	/**
	 * Check if a cookie exists with the valid value
	 *
	 * @param cookie, string, required, The cookie name
	 * @param lifetime, string, required, The cookie lifetime
	 * @param setter, boolean, optional, True to set the cookie if missing
	 *
	 * @return boolean
	**/
	it.html.hlab.advertising.hasValidSession = function( cookie, lifetime, setter )
	{
		var exists = false;
		if( it.html.hlab.advertising.getCookie( cookie ) == '1' )
		{
			exists = true;
		}
		if( setter !== false )
		{
			var now = new Date(), multiplier, expire;
			var tokens = lifetime.split( ' ' );
			var time = parseInt( tokens[0] );
			var unit = tokens[ tokens.length - 1 ];
			if ( time == 0 || unit == 'sessione' )
			{
				expire = null;
			} else {
				expire = new Date();

				switch( unit )
				{
					case 'secondo':case 'secondi': multiplier = 1000;     break;
					case 'minuto':case 'minuti':   multiplier = 60000;    break;
					case 'ora':case 'ore':         multiplier = 3600000;  break;
					case 'giorno':case 'giorni':   multiplier = 86400000; break;
				}
				expire.setTime( now.getTime() + ( multiplier * time ) );
			}
			it.html.hlab.advertising.setCookie( cookie, '1', expire );
		}
		return exists;
	};

	/**
	 * Sets a browser cookie
	 *
	 * @param name, string, required, The cookie name
	 * @param value, string, required, The cookie value
	 * @param expire, number, optional, The expire time
	 * @param path, string, optional, The cookie path
	**/
	it.html.hlab.advertising.setCookie = function( name, value, expire, path )
	{
		var e = expire == null ? '' : ' expires=' + expire.toGMTString();
		var p = ' path=' + ( path == null ? '/' : path );
		document.cookie = name + '=' + escape( value ) + ';' + p + ';' + e;
	};

	/**
	 * Returns a browser cookie value
	 *
	 * @param name, string, required, The cookie name

	 * @return string
	**/
	it.html.hlab.advertising.getCookie = function( name )
	{
		var search = name + '=';
		if ( document.cookie.length > 0 )
		{
			var offset = document.cookie.indexOf( search );
			if ( offset != -1 )
			{
				offset += search.length;
				var end = document.cookie.indexOf( ';', offset );
				if ( end == -1 )
				{
					end = document.cookie.length;
				}
				return unescape( document.cookie.substring( offset, end ) );
			} else {
				return '';
			}
		} else {
			return '';
		}
	};
};