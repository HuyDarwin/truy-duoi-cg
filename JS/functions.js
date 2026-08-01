import { getDatabase, ref, set, update, onValue, remove } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

$(function () {
	"use strict";

	window.CONTROLLER = window.CONTROLLER || {};

	(function (con) {
        //

        const db = getDatabase();
		    const dbID = "truy-duoi-cg";
        const dbKey = dbID + "/controller";
      
        //

        $.keyframe.define([
          {
            name: 'reset'
          }
        ]);

		// Sound

		var at = '';
		var at2 = '';
		var at3 = '';
		var at4 = '';
		var at5 = '';

		con.PlaySound = function (filename, n) {
			if (n == 1) {
				try {
					at = new Audio(filename);
					at.play();
					at.volume = 0.6;
				}
				catch (e) {
					// do nothing
				}
			}
			else if (n == 2) {
				try {
					at2 = new Audio(filename);
					at2.play();
					at2.volume = 0.6;
				}
				catch (e) {
					// do nothing
				}
			}
			else if (n == 3) {
				try {
					at3 = new Audio(filename);
					at3.play();
					at3.volume = 0.6;
				}
				catch (e) {
					// do nothing
				}
			}
			else if (n == 4) {
				try {
					at4 = new Audio(filename);
					at4.play();
					at4.volume = 0.45;
				}
				catch (e) {
					// do nothing
				}
			}
			else if (n == 5) {
				try {
					at5 = new Audio(filename);
					at5.play();
					at5.volume = 0.3;
				}
				catch (e) {
					// do nothing
				}
			}
		};

		con.StopSound = function (a, b) {
			try {
				if (a == 1 && at != '') {
					at.pause();
					if (b != 1) {
						at.currentTime = 0;
						at = '';
					}
				}
				if (a == 2 && at2 != '') {
					at2.pause();
					if (b != 1) {
						at2.currentTime = 0;
						at2 = '';
					}
				}
				if (a == 3 && at3 != '') {
					at3.pause();
					if (b != 1) {
						at3.currentTime = 0;
						at3 = '';
					}
				}
				if (a == 4 && at4 != '') {
					at4.pause();
					if (b != 1) {
						at4.currentTime = 0;
						at4 = '';
					}
				}
				if (a == 5 && at5 != '') {
					at5.pause();
					if (b != 1) {
						at5.currentTime = 0;
						at5 = '';
					}
				}
				if (a != 1 && a != 2 && a != 3 && a != 4 && a != 5) {
					if (at != '') {
						at.pause();
						if (b != 1) {
							at.currentTime = 0;
							at = '';
						}
					}
					if (at2 != '') {
						at2.pause();
						if (b != 1) {
							at2.currentTime = 0;
							at2 = '';
						}
					}
					if (at3 != '') {
						at3.pause();
						if (b != 1) {
							at3.currentTime = 0;
							at3 = '';
						}
					}
					if (at4 != '') {
						at4.pause();
						if (b != 1) {
							at4.currentTime = 0;
							at4 = '';
						}
					}
					if (at5 != '') {
						at5.pause();
						if (b != 1) {
							at5.currentTime = 0;
							at5 = '';
						}
					}
				}
			}
			catch (e) {
				// swallow
			}
		};

        con.ResumeSound = function(a) {
          try {
            if(a == 1 && at != ''){
              at.play();
            }
            if(a == 2 && at2 != ''){
              at2.play();
            }
            if(a == 3 && at3 != ''){
              at3.play();
            }
            if(a == 4 && at4 != ''){
              at4.play();
            }
            if(a == 5 && at5 != ''){
              at5.play();
            }
            if(a != 1 && a != 2 && a != 3 && a != 4 && a != 5){
              if(at != ''){
                at.play();
              }
              if(at2 != ''){
                at2.play();
              }
              if(at3 != ''){
                at3.play();
              }
              if(at4 != ''){
                at4.play();
              }
              if(at5 != ''){
                at5.play();
              }
            }
          }
          catch(e){
            // swallow
          }
        };	
      
        con.DecreaseSoundVolume = function(a, sta, fin, dur){
          var each_decrease = (sta - fin) / (dur / 25);
          var vol = sta;
          var dsv_int = setInterval(function(){
            if(vol <= fin) {
              vol = fin;
              clearInterval(dsv_int);
            }
            else {
              vol -= each_decrease;
            }
            if (a == 1) {
              at.volume = vol;
            }
            else if (a == 2) {
              at2.volume = vol;
            }
            else if (a == 3) {
              at3.volume = vol;
            }
            else if (a == 4) {
              at4.volume = vol;
            }
            else if (a == 5) {
              at5.volume = vol;
            }
          }, 25);
        }

		    // SVG Text
      
        con.SVGTextCustomize = function (destination) {
          if ($(destination).length === 0) {
            return;
          }

          var lines = Number($(destination + " svg").attr("data-lines"));

          if (lines == null || Number.isNaN(lines)) {
            lines = Number($(destination + " svg").length);
          }
          
          var numlines;
          for (numlines = lines; numlines >= 1; numlines--) {
            if ($(destination + " svg #line_" + numlines).html() != "") {
              break;
            }
          }
          
          if (numlines > 0) {
            var top = Number($(destination + " svg").attr("data-top"));
            var ypos = Number($(destination + " svg").attr("data-ypos"));
            if ($(destination + " svg").attr("data-center") == "true") {
              $(destination + " svg").css("top", (top + (lines - numlines) * ypos) + "%");
            }
            else {
              $(destination + " svg").css("top", top + "%");
            }
            
            for (var i = 1; i <= numlines; i++) {
              $(destination + " svg #line_" + i).removeAttr("textLength");
            }
            
            var maxwidth = 0;
            for (var i = 1; i <= numlines; i++) {
              maxwidth = Math.max(maxwidth, $(destination + " svg #line_" + i).get(0).getBBox().width);
            }
            
            for (var i = 1; i <= numlines; i++) {
              var width = Math.min($(destination + " svg #line_" + i).get(0).getBBox().width / $(destination + " svg").width() * 100, 100);

              if (maxwidth != 0) {
                width = Math.min(width, $(destination + " svg #line_" + i).get(0).getBBox().width / maxwidth * 100);
              }
              $(destination + " svg #line_" + i).attr("textLength", width + "%");
            }
          }
        }
      
        con.TextUpdateData = function (destination, text, line = 0) {
          if ($(destination).length === 0) {
            return;
          }

          if (line == 0) {
            var numlines = $(destination + " svg").attr("data-lines");
            var svglen = $(destination + " svg").width();
            var words = text.split(" ");
            var ok = 1;
            
            for (var i = 1; i <= numlines; i++) {
              $(destination + " svg #line_" + i).removeAttr("textLength").html("");
            }
            
            for (var i = 0, lin = 1, sen = ""; i < words.length; i++) {
              var tmp = sen + words[i];
              if (i != words.length - 1) {
                tmp += " ";
              }
              $(destination + " svg #line_" + lin).html(tmp);

              if ($(destination + " svg #line_" + lin).get(0).getBBox().width > $(destination + " svg").width()) {
                if (i == words.length - 1){
                  $(destination + " svg #line_" + lin).html(sen);
                }
                else {
                  $(destination + " svg #line_" + lin).html(sen + " ");
                }
                lin++;
                sen = "";
                i--;
                if (lin > numlines){
                  ok = 0;
                  break;
                }
              }
              else {
                sen = tmp;
              }
            }  
            
            if (ok == 1) {
              con.SVGTextCustomize(destination);
              return;
            }
            
            for (var i = 1; i <= numlines; i++) {
              $(destination + " svg #line_" + i).removeAttr("textLength").html("");
            }
            
            for (var i = 0; i < words.length; i++) {
              $(destination + " svg #line_1").append(words[i]);
              if (i != words.length - 1) {
                $(destination + " svg #line_1").append(" ");
              }
            }
            var maxwidth = $(destination + " svg #line_1").get(0).getBBox().width / numlines + words.length;
            
            $(destination + " svg #line_1").html("");
            
            for (var i = 0, lin = 1, sen = ""; i < words.length; i++) {
              var tmp = sen + words[i];
              if (i != words.length - 1) {
                tmp += " ";
              }
              $(destination + " svg #line_" + lin).html(tmp);
              if ($(destination + " svg #line_" + lin).get(0).getBBox().width > maxwidth){
                if (i == words.length - 1){
                  $(destination + " svg #line_" + lin).html(sen);
                }
                else {
                  $(destination + " svg #line_" + lin).html(sen + " ");
                }
                if (lin < numlines) {
                  sen = "";
                  lin++;
                  i--;
                }
                else{
                  sen = tmp;
                  if (i == words.length - 1){
                    $(destination + " svg #line_" + lin).html(sen);
                  }
                  else {
                    $(destination + " svg #line_" + lin).html(sen + " ");
                  }
                }
              }
              else {
                sen = tmp;
              }
            }
          }
          else {
            $(destination + " svg #line_" + line).html(text);
          }

          con.SVGTextCustomize(destination);
        }

		con.BasicKeyframeAnimate = function(obj, type, value, dur) {
			$.keyframe.define([
				{
					name: 'left',
					'100%': {
						'left': value
					}
				},
				{
					name: 'width',
					'100%': {
						'width': value
					}
				},
				{
					name: 'opacity',
					'100%': {
						'opacity': value
					}
				}
			]);

			$(obj).playKeyframe('reset');
			
			$(obj).playKeyframe({
				name: type,
				duration: dur + 'ms',
				easing: 'swing',
				fillMode: 'forwards',
				complete: function() {
					$(obj).css(type, value);
				}
			});
		}

        //
        
        con.formatTimer = function(total_secs) {
          var mins = Number.parseInt(total_secs / 60);
          var secs = Number.parseInt(total_secs % 60);
          var res = mins + ":";
          if (secs < 10) {
            res = res + "0";
          }
          res = res + secs;
          return res;
        }
		
		//

        const promises = [];

        for (const font of document.fonts) {
            promises.push(document.fonts.load(`50px "${font.family}"`));
        }

        Promise.all(promises).then(() => {
            con.ScaleText?.();
        });

        //

        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
        });

	}(window.CONTROLLER = window.CONTROLLER || {}));
});