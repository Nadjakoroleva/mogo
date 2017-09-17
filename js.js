(function() {

     'use strict';

    // Feature Test
    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

        // Function to animate the scroll
        var smoothScroll = function (anchor, duration) {

            // Calculate how far and how fast to scroll
            var startLocation = window.pageYOffset;
            var endLocation = anchor.offsetTop;
            var distance = endLocation - startLocation;
            var increments = distance/(duration/16);
            var stopAnimation;

            // Scroll the page by an increment, and check if it's time to stop
            var animateScroll = function () {
                window.scrollBy(0, increments);
                stopAnimation();
            };

            // If scrolling down
            if ( increments >= 0 ) {
                // Stop animation when you reach the anchor OR the bottom of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                        clearInterval(runAnimation);
                    }
                };
            }
            // If scrolling up
            else {
                // Stop animation when you reach the anchor OR the top of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( travelled <= (endLocation || 0) ) {
                        clearInterval(runAnimation);
                    }
                };
            }

            // Loop the animation function
            var runAnimation = setInterval(animateScroll, 16);

        };

        // Define smooth scroll links
        var scrollToggle = document.querySelectorAll('.scroll');

        // For each smooth scroll link
        [].forEach.call(scrollToggle, function (toggle) {

            // When the smooth scroll link is clicked
            toggle.addEventListener('click', function(e) {

                // Prevent the default link behavior
                e.preventDefault();

                // Get anchor link and calculate distance from the top
                var dataID = toggle.getAttribute('href');
                var dataTarget = document.querySelector(dataID);
                var dataSpeed = toggle.getAttribute('data-speed');

                // If the anchor exists
                if (dataTarget) {
                    // Scroll to the anchor
                    smoothScroll(dataTarget, dataSpeed || 500);
                }

            }, false);

        });

    }

 })();

 var tabsControl = document.querySelector('.tab-controls');

 tabsControl.addEventListener('click', function(evt){
   if(!evt.target.classList.contains('tab-control') || evt.target.classList.contains('tab-control--active')) {
     return;
   }

   var tabsControlArray = document.querySelectorAll('.tab-control');
   tabsControlArray = toArray(tabsControlArray);

 tabsControlArray.forEach(function(tabsControlItem) {
   if (tabsControlItem === evt.target) {
     tabsControlItem.classList.add('tab-control--active');
     } else {
       tabsControlItem.classList.remove('tab-control--active');
     }
   });

 var tabsContent = document.querySelectorAll('.tab-content');
 tabsContent = toArray(tabsContent);

   tabsContent.forEach(function(tabContent) {
     if (tabContent.classList.contains(evt.target.dataset.tab)) {
       tabContent.classList.add('tab-content--active');
     } else {
       tabContent.classList.remove('tab-content--active');
     }
   });
 });

 function toArray(collection) {
 return Array.prototype.slice.call(collection);
 }
