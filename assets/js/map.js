// (function() {
//
//
//   setTimeout(function () {
//     var request = new XMLHttpRequest();
//
//     request.open('GET', '/get/localisation');
//     request.onload = function () {
//       if(request.status === 200){
//         var res = JSON.parse(response);
//
//         var mymap = L.map('mapid').setView([6.39187,2.36579], 15);
//
//         L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//           attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//           maxZoom: 50,
//           id: 'mapbox.streets',
//           accessToken: 'pk.eyJ1IjoibmF6aWYiLCJhIjoiY2pmOGZjZGRpMGpwYjQ0bG51cWhkaDQ5NiJ9.M99Kkj88FxSIrkxesKt0OQ'
//         }).addTo(mymap);
//
//         var marker = L.circle([res.result[0].lat,res.result[0].lng], {
//           color: 'blue',
//           fillColor: '#51ff7e',
//           fillOpacity: 0.5,
//           radius: 10
//         }).addTo(mymap);
//
//       }else alert('sfg' + request.status);
//     };
//     request.send();
//   }, 2000)
//
//
// })();
