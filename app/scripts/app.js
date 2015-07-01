/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
    app.selected = 0;
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    console.log('web components are ready');
  });

  app.ready = function(){
    this.locationPerm = false;
    this.hasdata = null;
    this.buttonState = 'waiting';
    this.showBadge = false;
    app.selected = 0;
    //app.fblocation = 'https://blazing-fire-6426.firebaseio.com/ophaal/user/'+app.userid+'/';
    
  },

  app.handleResponse = function(e){
    var yo = e.detail.response;
    this.datameld = [];
    for (var i = yo.length - 1; i >= 0; i--) {
      console.log(yo[i]);
    };
  };

  app.ondata = function(){
    console.log('firebase is heere');
  },

  app._next = function(){
    console.log('next function activated');
    app.selected = 1;
  },

  app.select = function(){

    console.log('trigger select: ',this.select1, this.select2, this.select3);
    if(this.select1||this.select2||this.select3==true){
      app.itemselected = true;
    } else {
      app.itemselected = false;
    }

  },

  app._confirm = function(){
    app.selected = 2;
  },

  app.askLocPerm = function(){
    this.buttonState = 'thinking';
    this.locationPerm = true;
    if(this.latitude){
      this.selected = 1;
    };
  },

  app.verzenden = function(){
    console.log('shit verzenden');
    this.selected = 0;
    this.showBadge = true;
    this.buttonState = 'waiting';
    this.locationPerm;
    this.select1 = false;
    this.select2 = false;
    this.select3 = false;

    if(this.userid==null){
      this.userid = uuid.v1();
    };

    console.log('ik ga saven: ', this.longitude, this.latitude, this.filedata);

    var today = Date.now();

    var testFB = new Firebase('https://blazing-fire-6426.firebaseio.com/ophaal/meldingen');

    var userid = this.userid;

    var testID = testFB.push({'lon':this.longitude, 
                              'lat':this.latitude, 
                              'image':this.filedata, 
                              'tijd': today, 
                              'user': userid,
                               'tags': { '1': this.select1, '2': this.select2, '3': this.select3 }
                             });

    var newKey = testID.key();

    console.log(newKey);

    var userMelding = new Firebase('https://blazing-fire-6426.firebaseio.com/ophaal/user/'+userid);

    var usermeldingID = userMelding.push({'key': newKey });

    this.imageval = null;

    this.comment = '';

  },

  app.refreshMap = function(){
    console.log('click refresh');
    var gmap = document.getElementById('gmap');
    console.log(gmap);
    gmap._updateMarkers();
  },

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

})(document);
