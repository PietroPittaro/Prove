if( typeof( jQuery ) != 'undefined' )
{
	jQuery.extend
	(
		{
			forge: function( tag )
			{
				return jQuery( document.createElement( tag ) );
			}
		}
	);
	jQuery.fn.setVisible = function( flag )
	{
		return this.each
		(
			function()
			{
				jQuery( this ).css( 'visibility', flag ? 'visible' : 'hidden' );
			}
		);
	};
	jQuery.fn.tagName = function()
	{
		return this.get(0).tagName.toLowerCase();
	};
}