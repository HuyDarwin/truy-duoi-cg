import { getDatabase, ref, set, update, onValue, remove, get } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

$(function () {
    "use strict";

    window.CONTROLLER = window.CONTROLLER || {};

    (function (con) {
        //

        const db = getDatabase();
		const dbID = "truy-duoi-cg";
        const dbKey = dbID + "/controller";

        //

        function upd(key, val) {
            update(ref(db, dbKey), {
                [key]: val
            })
        }

        function enb(key) {
            $(key).removeAttr('disabled')
        }

        function dib(key) {
            $(key).attr('disabled', true);
        }
      
        $('button [name="autoname_class"]').click(function(){
          var bid = this.class;
          upd(bid, 1);
        })
      
        $('button [name="autoname"]').click(function(){
          var bid = this.id;
          upd(bid, 1);
        })
      
        //
      
        var inner_int = "";

        var fc_blue_steps = 0;
        var fc_red_steps = 0;
      
        //

        $.keyframe.define([
            {
                name: 'reset'
            },
            {
                name: 'wipe-ani',
                '0%': {
                    'background-position-y': '0px'
                },
                '100%': {
                    'background-position-y': '-6171px'
                }
            },
            {
                name: 'cb-reveal',
                '0%': {
                    'background-position-y': '0px'
                },
                '100%': {
                    'background-position-y': '-505px'
                }
            },
            {
                name: 'cb-hide',
                '0%': {
                    'background-position-y': '-505px'
                },
                '100%': {
                    'background-position-y': '0px'
                }
            },
            {
                name: 'q-gpx-reveal',
                '0%': {
                    'background-position-y': '0px'
                },
                '100%': {
                    'background-position-y': '-1208px'
                }
            },
            {
                name: 'q-gpx-hide',
                '0%': {
                    'background-position-y': '-1208px'
                },
                '100%': {
                    'background-position-y': '0px'
                }
            },
            {
                name: 'ans-lock-ani',
                '0%': {
                    'background-position-y': '0px'
                },
                '100%': {
                    'background-position-y': '-4350px'
                }
            },
            {
                name: 'ans-lock-text-ani',
                '0%': {
                    "fill" : "white",
                    "text-shadow": "-2px -2px 7px rgba(0,0,0,1)",
                    "filter" : "blur(0)"
                },
                '25%': {
                    "fill" : "black",
                    "text-shadow": "-2px -2px 7px rgba(255,255,255,1)",
                    "filter" : "blur(0)"
                },
                '75%': {
                    "fill" : "white",
                    "text-shadow": "-2px -2px 7px rgba(0,0,0,1)",
                    "filter" : "blur(0)"
                },
                '100%': {
                    "fill" : "black",
                    "text-shadow": "-2px -2px 7px rgba(255,255,255,1)",
                    "filter" : "blur(0)"
                }
            },
            {
                name: 'ans-correct-ani',
                '0%': {
                    'background-position-y': '0px'
                },
                '100%': {
                    'background-position-y': '-3600px'
                }
            },
            {
                name: 'ans-correct-text-ani',
                '0%': {
                    "fill" : "white",
                    "text-shadow": "-2px -2px 7px rgba(0,0,0,1)",
                    "filter" : "blur(0)"
                },
                '40%': {
                    "fill" : "black",
                    "text-shadow": "-2px -2px 7px rgba(255,255,255,1)",
                    "filter" : "blur(0)"
                },
                '70%': {
                    "fill" : "white",
                    "text-shadow": "-2px -2px 7px rgba(0,0,0,1)",
                    "filter" : "blur(0)"
                },
                '100%': {
                    "fill" : "black",
                    "text-shadow": "-2px -2px 7px rgba(255,255,255,1)",
                    "filter" : "blur(0)"
                }
            },
            {
                name: 'chase-ish-reveal',
                '0%': {
                    'opacity': '0',
                    'transform': 'scaleX(1.35)',
                    'filter': 'blur(14px) brightness(1.2)'
                },
                '100%': {
                    'opacity': '1',
                    'transform': 'scaleX(1)',
                    'filter': 'blur(0)'
                }
            },
            {
                name: 'chase-ish-hide',
                '0%': {
                    'opacity': '1',
                    'transform': 'scaleX(1)',
                    'filter': 'blur(0)'
                },
                '100%': {
                    'opacity': '0',
                    'transform': 'scaleX(1.35)',
                    'filter': 'blur(14px) brightness(1.2)'
                }
            }
        ]);
      
        //
      
        con.ScaleText = function(){
          con.SVGTextCustomize(".cb-money");
          con.SVGTextCustomize(".cb-timer");
          con.SVGTextCustomize(".q-text");
          con.SVGTextCustomize(".ans-letter-a");
          con.SVGTextCustomize(".ans-letter-b");
          con.SVGTextCustomize(".ans-letter-c");
          con.SVGTextCustomize(".ans-text-a");
          con.SVGTextCustomize(".ans-text-b");
          con.SVGTextCustomize(".ans-text-c");
          con.SVGTextCustomize("#name-tag-player");
          con.SVGTextCustomize("#name-tag-chaser");
          con.SVGTextCustomize("#fc-step-holder-blue .fc-step");
          con.SVGTextCustomize("#fc-step-holder-red .fc-step");
          con.SVGTextCustomize(".fc-timer");
        }

        //

        con.WipeonAnimation = function() {
            $(".wipeon").css("opacity", 1);
            $(".wipeon-keyframe").playKeyframe({
                name: 'wipe-ani',
                duration: '1000ms',
				easing: 'linear',
                timingFunction: 'steps(33)',
                complete: function() {
                    $(".wipeon").css("opacity", 0);
                }
            });
        }

        con.ResetCBGpx = function() {
            $(".cb-gpx-keyframe, .cb-gpx-still, .cb-money, .cb-timer").css("opacity", 0);
        }

        con.RevealCBGpx = function() {
            $(".wipeon").css({'top': '82.6%', 'height' : '12.8%'});
            con.WipeonAnimation();
            setTimeout(function() {
                $(".cb-money, .cb-timer").animate({"opacity": "1"}, {duration : 350, queue : false});
                $(".cb-gpx-keyframe").css("opacity", 1);
                $(".cb-gpx-keyframe").playKeyframe({
                    name: 'cb-reveal',
                    duration: '350ms',
                    easing: 'linear',
                    timingFunction: 'steps(5)',
                    complete: function() {
                        $(".cb-gpx-keyframe").css("opacity", 0);
                        $(".cb-gpx-still").css("opacity", 1);
                    }
                });
            }, 500);
        }

        con.HideCBGpx = function() {
            $(".cb-money, .cb-timer").animate({"opacity": "0"}, {duration : 350, queue : false});
            $(".cb-gpx-still").css("opacity", 0);
            $(".cb-gpx-keyframe").css("opacity", 1);
            $(".cb-gpx-keyframe").playKeyframe({
                name: 'cb-hide',
                duration: '350ms',
                easing: 'linear',
                timingFunction: 'steps(5)',
                complete: function() {
                    $(".cb-gpx-keyframe").css("opacity", 0);
                }
            });
        }

        con.ResetH2HGpx = function() {
            $(".q-gpx-keyframe, .q-gpx-still, .q-text").css("opacity", 0);
            $(".q-gpx").css({"opacity" : "0", "top": "81.2%"});
            $(".ans-gpx, .ans-lock, .ans-correct, .ans-chaser").css("opacity", 0);
            $(".ans-letter svg text, .ans-text svg text").playKeyframe("reset");
            $(".ans-lock-keyframe, .ans-correct-keyframe").playKeyframe("reset");
            $(".ans-letter svg text").css({"fill" : "white", "text-shadow": "0 0 5px white", "filter" : "blur(0.75px)"});
            $(".ans-text svg text").css({"fill" : "white", "text-shadow": "-2px -2px 7px rgba(0,0,0,1)"});
            $(".name-tag").css("opacity", 0);
            $("#ans-content-holder-lower .ans-content").css("opacity", 1);
            $("#ans-content-holder-upper .ans-content").css("opacity", 0);
        }

        con.RevealH2HQuesGpx = function() {
            $("#ans-content-holder-lower .ans-content").css("opacity", 1);
            $("#ans-content-holder-upper .ans-content").css("opacity", 0);
            $(".wipeon").css({'top': '81.2%', 'height' : '14%'});
            con.WipeonAnimation();
            $(".q-gpx").css("opacity", 1);
            setTimeout(function() {
                $(".q-text").animate({"opacity": "1"}, {duration : 350, queue : false});
                $(".q-gpx-keyframe").css("opacity", 1);
                $(".q-gpx-keyframe").playKeyframe({
                    name: 'q-gpx-reveal',
                    duration: '350ms',
                    easing: 'linear',
                    timingFunction: 'steps(8)',
                    complete: function() {
                        $(".q-gpx-keyframe").css("opacity", 0);
                        $(".q-gpx-still").css("opacity", 1);
                    }
                });
            }, 500);
        }

        con.RevealH2HAnsGpx = function() {
            $(".ans-gpx").css("opacity", 1);
            $(".q-gpx").animate({"top": "74%"}, {duration : 350, queue : false});
        }

        con.RevealPlayerTag = function() {
            $("#name-tag-player").css("opacity", 1);
        }

        con.RevealChaserTag = function() {
            $("#name-tag-chaser").css("opacity", 1);
        }

        con.HideTags = function() {
            $(".name-tag").animate({"opacity" : "0"}, {duration : 350, queue : false});
        }

        con.AnswerLock = function(answer) {
            $("#ans-lock-" + answer).css("opacity", 1);
            $("#ans-content-holder-lower #ans-content-" + answer).css("opacity", 0);
            $("#ans-content-holder-upper #ans-content-" + answer).css("opacity", 1);
            $("#ans-lock-" + answer + " .ans-lock-keyframe").playKeyframe({
                name: 'ans-lock-ani',
                duration: '1000ms',
                easing: 'linear',
                timingFunction: 'steps(29)'
            });
            $("#ans-letter-" + answer + " svg text, #ans-text-" + answer + " svg text").playKeyframe({
                name: 'ans-lock-text-ani',
                duration: '414ms',
                easing: 'linear'
            });
        }

        con.AnswerCorrect = function(answer) {
            $("#ans-lock-" + answer).css("opacity", 0);
            $("#ans-correct-" + answer).css("opacity", 1);
            $("#ans-content-holder-lower #ans-content-" + answer).css("opacity", 0);
            $("#ans-content-holder-upper #ans-content-" + answer).css("opacity", 1);
            $("#ans-correct-" + answer + " .ans-correct-keyframe").playKeyframe({
                name: 'ans-correct-ani',
                duration: '1000ms',
                easing: 'linear',
                timingFunction: 'steps(24)'
            });
            $("#ans-letter-" + answer + " svg text, #ans-text-" + answer + " svg text").playKeyframe({
                name: 'ans-correct-text-ani',
                duration: '417ms',
                easing: 'linear'
            });
        }

        con.AnswerChaser = function(answer) {
            $("#ans-chaser-" + answer).css("opacity", 1);
        }

        con.HideH2HGpx = function() {
            $(".q-text").animate({"opacity": "0"}, {duration : 350, queue : false});
            $(".q-gpx-still").css("opacity", 0);
            $(".q-gpx-keyframe").css("opacity", 1);
            $(".q-gpx-keyframe").playKeyframe({
                name: 'q-gpx-hide',
                duration: '350ms',
                easing: 'linear',
                timingFunction: 'steps(8)',
                complete: function() {
                    $(".q-gpx-keyframe").css("opacity", 0);
                    $(".q-gpx").css("opacity", 0);
                }
            });
            $(".ans-gpx").playKeyframe({
                name: 'chase-ish-hide',
                duration: '350ms',
				easing: 'swing',
                complete: function() {
                    $(".ans-gpx").playKeyframe("reset");
                    $(".ans-gpx").css("opacity", 0);
                }
            });
            $(".name-tag").css("opacity", 0);
        }

        con.ResetFinalClock = function() {
            $(".fc-timer").css("top", "82.6%");
            $(".fc-timer").css("opacity", "0");
            $("#fc-timer-bg-green").css("opacity", "1");
            $("#fc-timer-bg-red").css("opacity", "0");
        }

        con.RevealFinalClock = function() {
            $(".fc-timer").css("opacity", "1");
            $(".fc-timer").animate({"top": "73.8%"}, {duration : 500, queue : false});
        }

        con.PauseFinalClock = function() {
            $("#fc-timer-bg-green").css("opacity", "0");
            $("#fc-timer-bg-red").css("opacity", "1");
        }

        con.ResumeFinalClock = function() {
            $("#fc-timer-bg-green").css("opacity", "1");
            $("#fc-timer-bg-red").css("opacity", "0");
        }

        con.HideFinalClock = function() {
            $(".fc-timer").animate({"top": "82.6%"}, {duration : 500, queue : false, complete : function() {
                $(".fc-timer").css("opacity", 0);
            }});
        }

        con.RevealStep = function() {
            $(".wipeon").css({'top': '82.6%', 'height' : '12.8%'});
            con.WipeonAnimation();
            setTimeout(function() {
                $(".fc-bar").playKeyframe({
                    name: 'chase-ish-reveal',
                    duration: '350ms',
                    easing: 'swing'
                });
            }, 500);
        }

        con.HideStep = function() {
            $(".fc-bar").playKeyframe({
                name: 'chase-ish-hide',
                duration: '350ms',
				easing: 'swing'
            });
            $(".fc-timer").animate({"opacity" : "0"}, {duration : 350, queue : false});
        }

        con.ModifyStepBlue = function(nownum, type = 0) {
            var dur = (type == 0) ? 750 : 0;

            var lastnum = $('#fc-step-holder-blue .fc-step').length;
            var init_pen = (lastnum <= nownum) ? 100 : 0;
            
            var first_divider_width = 7.2;
            var step_divider_width = 1.6;
            var ratio = 0.92;

            var old_div_width = (lastnum <= 1) ? first_divider_width : (first_divider_width + step_divider_width * Math.pow(ratio, lastnum - 1) * (lastnum - 2));
            var new_div_width = (nownum <= 1) ? first_divider_width : (first_divider_width + step_divider_width * Math.pow(ratio, nownum - 1) * (nownum - 2));

            var new_ratio = 1;
            if (nownum > 1) {
                new_ratio = 100 / (100 * nownum + new_div_width * (nownum - 1));
            }

            var old_ratio = 1;
            if (lastnum > 1) {
                old_ratio = 100 / (100 * lastnum + old_div_width * (lastnum - 1));
            }

            if (init_pen == 100) {
                for (var i = lastnum + 1, pen = 0; i <= nownum; i++) {
                    if (i > 1) {
                        $("#fc-step-holder-blue").append('<div class="divider" id="divider-' + (i - 1) + '"></div>');
                        $("#fc-step-holder-red").append('<div class="divider" id="divider-' + (i - 1) + '"></div>');
                    }

                    $("#fc-step-holder-blue").append('<div class="fc-step" id="fc-step-' + i + '"><div class="fc-step-now-holder" id="fc-step-now-holder-blue"><div class="fc-step-now" id="fc-step-now-blue"></div></div><svg data-ypos="0" data-scale="true"><text x="50%" text-anchor="middle" lengthAdjust="spacingAndGlyphs" id="line_' + i + '" y="50%" dominant-baseline="central"></text></svg></div>');
                    $("#fc-step-holder-red").append('<div class="fc-step" id="fc-step-' + i + '"><div class="fc-step-now-holder" id="fc-step-now-holder-red"><div class="fc-step-now" id="fc-step-now-red"></div></div><svg data-ypos="0" data-scale="true"><text x="50%" text-anchor="middle" lengthAdjust="spacingAndGlyphs" id="line_' + i + '" y="50%" dominant-baseline="central"></text></svg></div>');

                    con.TextUpdateData("#fc-step-holder-blue .fc-step", i, i);
                    con.TextUpdateData("#fc-step-holder-red .fc-step", i, i);

                    if (i > 1) {
                        $(".fc-step-holder #divider-" + (i - 1)).css("left", (init_pen + pen * old_ratio) + "%");
                        $(".fc-step-holder #divider-" + (i - 1)).css("width", (old_div_width * old_ratio) + "%");
                        pen += old_div_width;
                    }
                    $(".fc-step-holder #fc-step-" + i).css("left", (init_pen + pen * old_ratio) + "%");
                    $(".fc-step-holder #fc-step-" + i).css("width", (100 * old_ratio) + "%");
                    if (i == nownum && init_pen == 100) {
                        $("#fc-light-blue").css("left", (init_pen + pen * old_ratio) + "%");
                        $("#fc-light-blue").css("width", (100 * old_ratio) + "%");
                    }
                    pen += 100;
                }

                if (lastnum == 0) {
                    $(".fc-step-holder").append('<div class="divider-0"></div>');
                    var old_width = first_divider_width;
                    var new_width = new_div_width * new_ratio;
                    $(".fc-step-holder .divider-0").css("left", "100%");
                    $(".fc-step-holder .divider-0").css("width", old_width + "%");
                    $(".fc-step-holder .divider-0").css("opacity", (lastnum == 0) ? 1 : 0);
                    $(".fc-step-holder .divider-0").animate({"left": "-" + new_width + "%", "width": new_width + "%"}, dur, function(){
                        $(".fc-step-holder .divider-0").remove();
                    });
                }
            }
            else {
                if (nownum == 0) {
                    $(".fc-step-holder").append('<div class="divider-0"></div>');
                    var old_width = old_div_width * old_ratio;
                    var new_width = first_divider_width;
                    $(".fc-step-holder .divider-0").css("left", -old_width + "%");
                    $(".fc-step-holder .divider-0").css("width", old_width + "%");
                    $(".fc-step-holder .divider-0").css("opacity", (lastnum == 0) ? 1 : 0);
                    $(".fc-step-holder .divider-0").animate({"left": "100%", "width": new_width + "%"}, dur, function(){
                        $(".fc-step-holder .divider-0").remove();
                    });
                }
            }

            for (let i = 0; i <= dur; i += 50) {
                setTimeout(function () {
                    con.SVGTextCustomize("#fc-step-holder-blue .fc-step");
                    con.SVGTextCustomize("#fc-step-holder-red .fc-step");
                }, i);
            }

            if (lastnum > 0) {
                $("#fc-step-holder-blue #fc-step-" + lastnum + " .fc-step-now-holder").animate({"opacity": 0}, dur);
                $("#fc-step-holder-blue #fc-step-" + lastnum + " svg").animate({"opacity": 0}, dur);
            }

            $("#fc-step-holder-blue #fc-step-" + nownum + " .fc-step-now-holder").animate({"opacity": 1}, dur);
            $("#fc-step-holder-blue #fc-step-" + nownum + " svg").animate({"opacity": 1}, dur);

            if (init_pen == 100) {
                for (var i = 1, pen = 0; i <= nownum; i++) {
                    if (i > 1) {
                        $(".fc-step-holder #divider-" + (i - 1)).animate({"left": (pen * new_ratio) + "%", "width": (new_div_width * new_ratio) + "%"}, dur);
                        pen += new_div_width;
                    }
                    $(".fc-step-holder #fc-step-" + i).animate({"left": (pen * new_ratio) + "%", "width": (100 * new_ratio) + "%"}, dur);
                    if (i == nownum) {
                        $("#fc-light-blue").animate({"left": (pen * new_ratio) + "%", "width": (100 * new_ratio) + "%"}, {duration : dur, queue: false});
                        $("#fc-light-blue").animate({"opacity": 1}, 2 / 3 * dur, function(){
                            $("#fc-light-blue").animate({"opacity": 0}, 2 / 3 * dur);
                        });
                    }
                    pen += 100;
                }
            }
            else {
                for (var i = 1, pen = 0; i <= lastnum; i++) {
                    if (i > 1) {
                        $(".fc-step-holder #divider-" + (i - 1)).animate({"left": (pen * new_ratio) + "%", "width": (new_div_width * new_ratio) + "%"}, dur);
                        pen += new_div_width;
                    }
                    $(".fc-step-holder #fc-step-" + i).animate({"left": (pen * new_ratio) + "%", "width": (100 * new_ratio) + "%"}, dur);
                    pen += 100;
                }

                setTimeout(function () {   
                    for (var i = nownum + 1; i <= lastnum; i++) {
                        if (i > 1) {
                            $(".fc-step-holder #divider-" + (i - 1)).remove();
                        }
                        $(".fc-step-holder #fc-step-" + i).remove();
                    }
                }, dur);
            }

            /*
            var olds = 100 * old_ratio;
            var news = 100 * new_ratio;
            var oldd = old_div_width * old_ratio;
            var newd = new_div_width * new_ratio;
            var lastr = "inset(-1000% " + (100 - (olds * fc_red_steps + oldd * Math.max(0, fc_red_steps - 1))) + "% -1000% -1000%)";
            var nowr = "inset(-1000% " + (100 - (news * fc_red_steps + newd * Math.max(0, fc_red_steps - 1))) + "% -1000% -1000%)";
            var lastb = "inset(-1000% -1000% -1000% " + (olds * fc_red_steps + oldd * Math.max(0, fc_red_steps - 1)) + "%)";
            var nowb = "inset(-1000% -1000% -1000% " + (news * fc_red_steps + newd * Math.max(0, fc_red_steps - 1)) + "%)";
            if (fc_red_steps == lastnum && lastnum > 0) {
                lastr = "inset(-1000% -1000% -1000% -1000%)";
            }
            if (fc_red_steps == nownum && nownum > 0) {
                nowr = "inset(-1000% -1000% -1000% -1000%)";
            }
            if (fc_red_steps == 0) {
                lastb = "inset(-1000% -1000% -1000% -1000%)";
                nowb = "inset(-1000% -1000% -1000% -1000%)";
            }
			$.keyframe.define([
				{
					name: 'red',
                    '0%': {
                        'clip-path' : lastr
                    },
					'100%': {
						'clip-path' : nowr
					}
				},
				{
					name: 'blue',
                    '0%': {
                        'clip-path' : lastb
                    },
					'100%': {
						'clip-path' : nowb
					}
				}
			]);
            $("#fc-bar-holder-red, #fc-shine-holder-red, #fc-shine-holder-blue").playKeyframe('reset');
            $("#fc-bar-holder-red, #fc-shine-holder-red").playKeyframe({
				name: 'red',
				duration: dur + 'ms',
				easing: 'swing',
				complete: function() {
					$(obj).css('clip-path', nowr);
				}
			});
            $("#fc-shine-holder-blue").playKeyframe({
				name: 'blue',
				duration: dur + 'ms',
				easing: 'swing',
				complete: function() {
					$(obj).css('clip-path', nowb);
				}
			});
            */

            setTimeout(function(){
                con.ModifyStepRed(fc_red_steps, 1);
            }, 750)

            fc_blue_steps = nownum;
        }

        con.ModifyStepRed = function(nownum, type = 0) {
            var dur = (type == 0) ? 250 : 0;

            var lastnum = fc_red_steps;
            
            var first_divider_width = 7.2;
            var step_divider_width = 1.6;
            var ratio = 0.92;
            
            var new_div_width = (fc_blue_steps <= 1) ? first_divider_width : (first_divider_width + step_divider_width * Math.pow(ratio, fc_blue_steps - 1) * (fc_blue_steps - 2));

            var new_ratio = 1;
            if (fc_blue_steps > 1) {
                new_ratio = 100 / (100 * fc_blue_steps + new_div_width * (fc_blue_steps - 1));
            }

            var step_width = 100 * new_ratio;
            var div_width = new_div_width * new_ratio;

            if (lastnum > 0) {
                $("#fc-step-holder-red #fc-step-" + lastnum + " .fc-step-now-holder").animate({"opacity": 0}, dur);
                $("#fc-step-holder-red #fc-step-" + lastnum + " svg").animate({"opacity": 0}, dur);
            }

            setTimeout(function(){
                $("#fc-step-holder-red #fc-step-" + nownum + " .fc-step-now-holder").animate({"opacity": 1}, dur);
                $("#fc-step-holder-red #fc-step-" + nownum + " svg").animate({"opacity": 1}, dur);
            }, dur / 2);

            if (nownum > 0) {
                $("#fc-light-red").css({"left": (step_width + div_width) * (nownum - 1) + "%", "width" : step_width + "%"});
                $("#fc-light-red").animate({"opacity": 1}, 4 / 3 * dur, function(){
                    $("#fc-light-red").animate({"opacity": 0}, 4 / 3 * dur);
                });
            }

            if (nownum == fc_blue_steps && nownum > 0) {
                $("#fc-bar-holder-red, #fc-shine-holder-red").css("clip-path", "inset(-1000% -1000% -1000% -1000%)");
            }
            else {
                $("#fc-bar-holder-red, #fc-shine-holder-red").css("clip-path", "inset(-1000% " + (100 - (step_width * nownum + div_width * Math.max(0, nownum - 1))) + "% -1000% -1000%)");
            }

            if (nownum == 0) {
                $("#fc-shine-holder-blue").css("clip-path", "inset(-1000% -1000% -1000% -1000%)");
            }
            else {
                $("#fc-shine-holder-blue").css("clip-path", "inset(-1000% -1000% -1000% " + (step_width * nownum + div_width * Math.max(0, nownum - 1)) + "%)");
            }

            fc_red_steps = nownum;
        }

        con.PushbackAnimation = function() {
            $.keyframe.define([
				{
					name: 'briup',
                    '0%': {
                        'filter' : 'brightness(100%)'
                    },
					'100%': {
                        'filter' : 'brightness(115%)'
					}
				},
				{
					name: 'bridown',
                    '0%': {
                        'filter' : 'brightness(115%)'
                    },
					'100%': {
                        'filter' : 'brightness(100%)'
					}
				},
				{
					name: 'move',
                    '0%': {
                        'background-position' : '0%'
                    },
					'100%': {
                        'background-position' : '40%'
					}
				}
			]);

            $("#fc-bar-bg-blue").playKeyframe({
				name: 'briup',
				duration: '250ms',
				easing: 'swing'
			});
            $(".fc-bar-pushback").animate({'opacity' : '1'}, {duration : 250, queue : false});
            $(".fc-bar-pushback").playKeyframe({
				name: 'move',
				duration: '2000ms',
                timingFunction: 'linear'
			});
            setTimeout(function() {
                $("#fc-bar-bg-blue").playKeyframe({
                    name: 'bridown',
                    duration: '250ms',
                    easing: 'swing'
                });
                 $(".fc-bar-pushback").animate({'opacity' : '0'}, {duration : 250, queue : false});
            }, 1750);
        }

        con.RedWinAnimation = function() {
            $.keyframe.define([
				{
					name: 'firstani',
                    '0%': {
                        'background-position-y' : '0px'
                    },
					'100%': {
                        'background-position-y' : '-3636px'
					}
				},
				{
					name: 'loopani',
                    '0%': {
                        'background-position-y' : '-1515px'
                    },
					'100%': {
                        'background-position-y' : '-3636px'
					}
				},
				{
					name: 'pop',
                    '0%': {
                        'transform' : 'scale(1)'
                    },
					'50%': {
                        'transform' : 'scale(0.9)'
					},
					'100%': {
                        'transform' : 'scale(1)'
					}
				}
			]);   

            $("#fc-bar-win-red").css("opacity", 1);
            $("#fc-bar-win-keyframe-red").playKeyframe({
                name: 'firstani',
                duration: '1028ms',
                easing: 'linear',
                timingFunction: 'steps(36)',
                complete: function() {
                    $("#fc-bar-win-keyframe-red").playKeyframe({
                        name: 'loopani',
                        duration: '735ms',
                        easing: 'linear',
                        timingFunction: 'steps(21)',
                        iterationCount: 'infinite'
                    });
                }
            });
            $("#fc-step-holder-red #fc-step-" + fc_red_steps + " svg").playKeyframe({
                name: 'pop',
                duration: '250ms',
                easing: 'linear',
                iterationCount: 'infinite'
            });
        }

        con.KillRedWinAnimation = function() {
            $("#fc-bar-win-red").animate({"opacity" : "0"}, {duration : 250, queue : false}, function() {
                $("#fc-bar-win-keyframe-red").playKeyframe("reset");
            });
            $("#fc-step-holder-red #fc-step-" + fc_red_steps + " svg").on("animationiteration", function(){
                $(this).playKeyframe("reset");
            })
        }

        con.ResetStep = function() {
            fc_blue_steps = 0;
            fc_red_steps = 0;
            con.ModifyStepBlue(0, 1);
            con.ModifyStepRed(0, 1);
            con.KillRedWinAnimation();
            $(".fc-bar").css("opacity", 0);
        }

        con.ResetFinalChase = function() {
            con.ResetFinalClock();
            con.ResetStep();
        }
        //

        con.ResetCBGpx();
        con.ResetH2HGpx();
        con.ResetFinalChase();

        /*
        setTimeout(function() {
            con.ResetH2HGpx();
            con.TextUpdateData(".q-text", "Who is Le Dac Bao Chau?", 1);
            con.TextUpdateData("#ans-text-a", "The wheel on the bus go round and round", 1);
            con.TextUpdateData("#ans-text-b", "An adventurer", 1);
            con.TextUpdateData("#ans-text-c", "An astronaut", 1);
            con.TextUpdateData("#name-tag-player", "DINH DONG", 1);
            con.RevealH2HQuesGpx();
        }, 1000);

        setTimeout(function() {
            con.RevealH2HAnsGpx();
        }, 3000);

        setTimeout(function() {
            con.RevealPlayerTag();
        }, 5000);

        setTimeout(function() {
            con.RevealChaserTag();
        }, 5500);

        setTimeout(function() {
            con.HideTags();
        }, 6500);

        setTimeout(function() {
            con.AnswerLock('b');
        }, 8000);

        setTimeout(function() {
            con.AnswerCorrect('b');
        }, 10000);

        setTimeout(function() {
            con.AnswerChaser('c');
        }, 12000);

        setTimeout(function() {
            con.HideH2HGpx();
        }, 15000);

        setTimeout(function() {
            con.RevealH2HQuesGpx();
        }, 1000);

        setTimeout(function() {
            con.RevealH2HAnsGpx();
        }, 3000);

        setTimeout(function() {
            con.RevealCBGpx();
        }, 1000);

        setTimeout(function() {
            con.HideCBGpx();
        }, 3000);

        setTimeout(function() {
            con.RevealStep();
            setTimeout(function() {
                con.RevealFinalClock();
                setTimeout(function() {
                    con.HideFinalClock();
                    con.HideStep();
                }, 1000);
            }, 1000);
        }, 1000);
        */

        /*
        con.ModifyStepBlue(8, 1);
        con.ModifyStepRed(8, 1);

        setTimeout(function() {
            con.RedWinAnimation();
        }, 1000);

        setTimeout(function() {
            con.KillRedWinAnimation();
        }, 4321);
        */

        /*
        setTimeout(function () {
            con.ModifyStepBlue(8);
        }, 1000);

        for (var i = 1; i <= 5; i++) {
            setTimeout(function (num) {
                con.ModifyStepRed(num);
            }, 2000 + i * 1500, i);
        }
        */
      
        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();
            
            con.ScaleText();

            con.TextUpdateData(".cb-money", accounting.formatMoney(data.temp_money), 1);
            con.TextUpdateData(".cb-timer", con.formatTimer(data.cb_timer), 1);

            con.TextUpdateData(".fc-timer", con.formatTimer(data.fc_timer), 1);

            con.TextUpdateData(".q-text", data.question_line_1, 1);
            con.TextUpdateData(".q-text", data.question_line_2, 2);

            con.TextUpdateData("#ans-letter-a", "A", 1);
            con.TextUpdateData("#ans-letter-b", "B", 1);
            con.TextUpdateData("#ans-letter-c", "C", 1);
            con.TextUpdateData("#name-tag-chaser", "THỢ SĂN", 1);
            
            con.TextUpdateData("#ans-text-a", data.answer_a, 1);
            con.TextUpdateData("#ans-text-b", data.answer_b, 1);
            con.TextUpdateData("#ans-text-c", data.answer_c, 1);

            if (1 <= data.player_now && data.player_now <= 4) {
                con.TextUpdateData("#name-tag-player", eval("data.cont_name_" + data.player_now).toUpperCase(), 1);
            }
            else {
                con.TextUpdateData("#name-tag-player", "", 1);
            }

            if(data.reload == 1) {
              location.reload();
              upd("reload", 0);
            }   

            if(data.reload_main == 1) {
              location.reload();
              upd("reload_main", 0);
            }       

            if(data.act_reveal_cb_gpx == 1) {
                con.ResetCBGpx();
                con.RevealCBGpx();
                upd("act_reveal_cb_gpx", 0);
            }
            if(data.act_hide_cb_gpx == 1) {
                con.HideCBGpx();
                upd("act_hide_cb_gpx", 0);
            }

            if(data.act_h2h_reveal_question == 1) {
                con.ResetH2HGpx();
                con.RevealH2HQuesGpx();
                upd("act_h2h_reveal_question", 0);
            }
            if(data.act_h2h_reveal_ans == 1) {
                con.RevealH2HAnsGpx();
                upd("act_h2h_reveal_ans", 0);
            }
            if(data.act_player_has_answered == 1) {
                con.RevealPlayerTag();
                upd("act_player_has_answered", 0);
            }
            if(data.act_chaser_has_answered == 1) {
                con.RevealChaserTag();
                upd("act_chaser_has_answered", 0);
            }
            if(data.act_hide_h2h_tags == 1) {
                con.HideTags();
                upd("act_hide_h2h_tags", 0);
            }
            if(data.act_h2h_hide_question == 1) {
                con.HideH2HGpx();
                upd("act_h2h_hide_question", 0);
            }
            if(data.act_reveal_cont_ans == 1) {
                con.AnswerLock(data.final_ans_player);
                upd("act_reveal_cont_ans", 0);
            }
            if(data.act_reveal_correct_ans == 1) {
                con.AnswerCorrect(data.correct_ans);
                upd("act_reveal_correct_ans", 0);
            }
            if(data.act_reveal_chaser_ans == 1) {
                con.AnswerChaser(data.final_ans_chaser);
                upd("act_reveal_chaser_ans", 0);
            }

            if (data.act_fc_reveal_gpx_first_turn == 1) {
                con.ResetStep();
                con.ModifyStepBlue(data.blue_steps, 1);
                con.ModifyStepRed(data.red_steps, 1);
                con.RevealStep();
                upd("act_fc_reveal_gpx_first_turn", 0);
            }
            if (data.act_fc_reveal_gpx_first_turn_no_initial_steps == 1) {
                con.ResetStep();
                con.RevealStep();
                upd("act_fc_reveal_gpx_first_turn_no_initial_steps", 0);
            }
            if (data.act_fc_reveal_gpx_second_turn == 1) {
                con.ModifyStepBlue(data.blue_steps, 1);
                con.ModifyStepRed(data.red_steps, 1);
                con.RevealStep();
                upd("act_fc_reveal_gpx_second_turn", 0);
            }

            if (data.act_modify_blue_steps > -1) {
                con.ModifyStepBlue(data.act_modify_blue_steps);
                upd("act_modify_blue_steps", -1);
            }
            if (data.act_modify_red_steps > -1) {
                con.ModifyStepRed(data.act_modify_red_steps);
                upd("act_modify_red_steps", -1);
            }
            if (data.act_modify_steps == 1) {
                con.ModifyStepBlue(data.blue_steps, 1);
                con.ModifyStepRed(data.red_steps, 1);
                upd("act_modify_steps", 0);
            }

            if (data.act_fc_reveal_timer == 1) {
                con.ResetFinalClock();
                con.RevealFinalClock();
                upd("act_fc_reveal_timer", 0);
            }
            if (data.act_fc_hide_timer == 1) {
                con.HideFinalClock();
                upd("act_fc_hide_timer", 0);
            }
            if (data.act_fc_hide_gpx == 1) {
                con.HideStep();
                upd("act_fc_hide_gpx", 0);
            }
            if (data.act_fc_pushback_ani == 1) {
                con.PushbackAnimation();
                upd("act_fc_pushback_ani", 0);
            }
            if (data.act_fc_player_caught == 1) {
                con.RedWinAnimation();
                setTimeout(function() {
                    con.KillRedWinAnimation();
                }, 5000);
                upd("act_fc_player_caught", 0);
            }

            if (data.act_fc_timer_red == 1) {
                $("#fc-timer-bg-green").css("opacity", "0");
                $("#fc-timer-bg-red").css("opacity", "1");
            }
            else {
                $("#fc-timer-bg-green").css("opacity", "1");
                $("#fc-timer-bg-red").css("opacity", "0");
            }
        });    

    }(window.CONTROLLER = window.CONTROLLER || {}));
});