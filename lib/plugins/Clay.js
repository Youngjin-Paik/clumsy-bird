/*
 * MelonJS Game Engine
 * Copyright (C) 2011 - 2013, Olivier Biot, Jason Oster
 * http://www.melonjs.org
 *
 * Clay.io API plugin
 *
 */

(function($) {

  /**
   * @class
   * @public
   * @extends me.plugin.Base
   * @memberOf me
   * @constructor
   */
   Clayio = me.plugin.Base.extend({
    // minimum melonJS version expected
    version : "1.0.0",
    gameKey: null,
    debug: false,
    hideUI: false,

    init : function(gameKey) {
      // call the parent constructor
      this.parent();
      this.gameKey = gameKey;
      me.game.Clay = null;

      Clay = this.apiObject || {};
      Clay.gameKey = this.gameKey;
      Clay.readyFunctions = [];
      Clay.ready = function( fn ) {
        Clay.readyFunctions.push( fn );
      };

      Clay.options = {
        debug: this.debug,
        hideUI: this.hideUI,
        fail: function(error){
          console.log('Error: ' + error);
        }
      }

      window.onload = function() {
        var clay = document.createElement("script");
        //clay.async = true;
        clay.src = ( "https:" == document.location.protocol ? "https://" : "http://" ) + "cdn.clay.io/api.js";
        var tag = document.getElementsByTagName("script")[0];
        tag.parentNode.insertBefore(clay, tag);
      }
    },

    leaderboard: function(id, score, callback) {
      if (id == undefined || id == '') {
        throw "You must pass a leaderboard id";
      }
      // we can get the score directly from game.data.score
      if (!score){
        score = game.data.score;
      }
      var leaderboard = new Clay.Leaderboard({id: id});
      if (!callback) {
        leaderboard.post({score: score}, callback);
      }else{
        leaderboard.post({score: score});
      }
    },

    showLeaderBoard: function(id, options, callback) {
      if (!options){
          options = {};
      }
      if (options.limit === undefined){
          options.limit = 10;
      }

      var leaderboard = new Clay.Leaderboard({id: id});
      leaderboard.show(options, callback);
    }

  });
})(window);