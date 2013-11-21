var collapsedIcon = "\u229E"; // Squared Plus ("⊞")
var expandedIcon = "\u229F"; // Squared Minus ("⊟")

// /html/body/center/table/tbody/tr[3]/td/table[2]
$( 'body > center > table > tbody > tr:eq(2) > td > table:last > tbody > tr' ).each(function() {
    var $tr = $(this); // Comment row.
    $tr.find( 'table:first > tbody > tr > td[valign]' )
        .css({
            'position' : 'relative'
        })
        .append([
            '<a',
                ' href=""',
                ' style="',
                    'bottom: 0;',
                    'left: -500px;',
                    'border-right: 1px solid orange;',
                    'padding-right: 4px;',
                    'position: absolute;',
                    'right: 15px;',
                    'text-align: right;',
                    'top: 0;',
                '"',
                '>',
                expandedIcon,
            '</a>',
        ''].join( '' ))
        .find( 'a' )
            .click(function( event ) {
                event.preventDefault();

                var collapsed = $(this).data( 'collapsed' );
                var indentation = $(this).parents( 'td' ).prev().find( 'img' ).prop( 'width' );

                var $parent = $(this).parents( 'tr' );
                var $tdUpVote = $parent.find( '> td[valign]' );
                var $center = $tdUpVote.find( '> center' );

                if ( ! collapsed ) {
                    $center.css({
                        'pointer-events' : 'none',
                        'opacity' : '0'
                    });

                    $tr
                        .find( '.comment' )
                            .css({
                                'background-color' : '#e0e0e0',
                                'display' : 'block',
                                'height' : '16px',
                                'opacity' : '.5',
                                'overflow' : 'hidden'
                            })
                        .next()
                            .hide();

                    $(this).text( collapsedIcon );
                    $(this).data( 'collapsed', true );
                }
                else {
                    $center.css({
                        'pointer-events' : 'auto',
                        'opacity' : '1'
                    });

                    $tr
                        .find( '.comment' )
                            .css({
                                'background-color' : 'transparent',
                                'height' : 'auto',
                                'opacity' : '1',
                                'overflow' : 'visible'
                            })
                        .next()
                            .show();

                    $(this).text( expandedIcon );
                    $(this).data( 'collapsed', false );
                }

                var $next = $tr.next();
                while ( $next.length ) {
                    // Collapse next
                    var nextIndentation = $next.find( 'td > table > tbody > tr > td:first > img' ).prop( 'width' );
                    if ( nextIndentation > indentation ) {
                        if ( collapsed ) {
                            $next.show();
                        }
                        else {
                            $next.hide();
                        }

                        $next = $next.next();
                    }
                    else {
                        break;
                    }
                }
            })
            .hover(
                function() {
                    $(this).css({ 'background-color' : '#ccc' });
                },
                function() {
                    $(this).css({ 'background-color' : 'transparent' });
                }
            );
});
