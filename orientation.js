// State for the orientation sensing
var prevAlpha = null;
var prevBeta = null;

// window.addEventListener("deviceorientation", update, true);


// function update(event) {
//   if (prevAlpha === null || prevBeta === null) {
//     prevAlpha = event.alpha;
//     prevBeta = event.beta;
//     return;
//   }
//   stars.filter(function(star) {
//     return star.x < -15;
//   }).map(function(star) {
//     star.x = WIDTH + Math.random() * 15;
//   });
//   stars.filter(function(star) {
//     return star.x > WIDTH + 15;
//   }).map(function(star) {
//     star.x = Math.random() * -15;
//   });
//   stars.filter(function(star) {
//     return star.y < -15;
//   }).map(function(star) {
//     star.y = HEIGHT + Math.random() * 15;
//   });
//   stars.filter(function(star) {
//     return star.y > HEIGHT + 15;
//   }).map(function(star) {
//     star.y = -15 * Math.random();
//   });
//   stars.map(function(star) {
//     var diffAlpha = event.alpha - prevAlpha;
//     if (Math.abs(diffAlpha) > 100) {
//       diffAlpha = 0;
//     }
//     var diffBeta = event.beta - prevBeta;
//     if (Math.abs(diffBeta) > 100) {
//       diffBeta = 0;
//     }
//     star.x += diffAlpha * 4;
//     star.y += diffBeta * 4;
//   });
//   prevAlpha = event.alpha;
//   prevBeta = event.beta;
// }
