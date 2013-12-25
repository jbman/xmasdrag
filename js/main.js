"use strict";

(function xmasGuess() {

  var successCount = 0;

  var updateMessageFn = function() {
      var messageElement = $('.message-' + successCount);
      // Does a message fur current number of solved photos exist?
      if (messageElement) {
        $('*[class*="message"]').hide();
        messageElement.show();
      }  
  };
  
  // Show first message with class="message-0":
  updateMessageFn();
  
  $('.circle').pep({
    droppable: ".photo",
    constrainTo: 'window',
    cssEaseDuration: 500,
    /* Overlap only when drggable is contained more then half in droppable */
    overlapFunction: function($a, $b){
        var rect1 = $a[0].getBoundingClientRect();
        var rect2 = $b[0].getBoundingClientRect();
        var halfWidth = (rect2.right - rect2.left) / 2;
        var halfHeight = (rect2.bottom - rect2.top) / 2;
        return (  rect2.left + halfWidth > rect1.left  && 
                  rect2.right < rect1.right + halfWidth && 
                  rect2.top + halfHeight > rect1.top   && 
                  rect2.bottom  < rect1.bottom + halfHeight);
    },
    revert: true,
    revertAfter: 'ease',
    revertIf: function() {
      var $draggedElement = $('.pep-active');
      var $dropElement = $('.pep-dpa');
      
      var success = $draggedElement.attr('match') === $dropElement.attr('match');
      if (success) {
        $dropElement.addClass('success');
        $draggedElement.addClass('success');
        successCount++;
      }
      $('.pep-dpa').removeClass('pep-dpa');
      
      updateMessageFn();
      
      return !success
    }  
  });

}());
