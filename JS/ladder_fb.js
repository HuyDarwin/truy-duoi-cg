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

        var ladder_mode = 0;
        var player_step_now = 0;
        var chaser_step_now = 0;
      
        //

        $.keyframe.define([
            {
                name: 'reset'
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
            },
            {
                name: 'ArrowLeftMove',
                '0%': {
                    'transform': 'translateX(0%)'
                },
                '50%': {
                    'transform': 'translateX(30%)'
                },
                '100%': {
                    'transform': 'translateX(0%)'
                }
            },
            {
                name: 'ArrowRightMove',
                '0%': {
                    'transform': 'scaleX(-1) translateX(0%)'
                },
                '50%': {
                    'transform': 'scaleX(-1) translateX(30%)'
                },
                '100%': {
                    'transform': 'scaleX(-1) translateX(0%)'
                }
            },
            {
                name: "ZoomLCText",
                '0%': {
                    "opacity" : "0",
                    "transform" : "scale(0)",
                },
                '25%': {
                    "opacity" : "1",
                    "transform" : "scale(1)",
                },
                '50%': {
                    "opacity" : "1",
                    "transform" : "scale(1)",
                },
                '75%': {
                    "opacity" : "1",
                    "transform" : "scale(1)",
                },
                '100%': {
                    "opacity" : "0",
                    "transform" : "scale(0)",
                }
            },
            {
                name: "ShadowLCText",
                '0%': {
                    "text-shadow" : "-2px -2px 7px rgba(0,0,0,1)"
                },
                '25%': {
                    "text-shadow" : "-2px -2px 7px rgba(255,255,255,1)"
                },
                '50%': {
                    "text-shadow" : "-2px -2px 7px rgba(255,255,255,1)"
                },
                '75%': {
                    "text-shadow" : "-2px -2px 7px rgba(0,0,0,1)"
                },
                '100%': {
                    "text-shadow" : "-2px -2px 7px rgba(0,0,0,1)"
                }
            },
            {
                name: "ZoomLCTextFinal",
                '0%': {
                    "opacity" : "0",
                    "transform" : "scale(0)",
                },
                '50%': {
                    "opacity" : "1",
                    "transform" : "scale(1)",
                },
                '100%': {
                    "opacity" : "1",
                    "transform" : "scale(1)",
                }
            },
            {
                name: "ZoomOutLCTextFinal",
                '0%': {
                    "opacity" : "1",
                    "transform" : "scale(1)",
                },
                '50%': {
                    "opacity" : "1",
                    "transform" : "scale(1)",
                },
                '100%': {
                    "opacity" : "0",
                    "transform" : "scale(0)",
                }
            },
            {
                name: "TextChangeColor",
                '0%': {
                    "fill" : "black",
                    "text-shadow" : "none",
                },
                '100%': {
                    "fill" : "white",
                    "text-shadow" : "-2px -2px 7px rgba(0,0,0,1)",
                }
            },
            {
                name: "ChaserArrowReveal",
                '0%': {
                    "top" : "-100%",
                },
                '100%': {
                    "top" : "0%",
                }
            }
        ]);
      
        //
      
        con.ScaleText = function(){
            for (var i = 1; i <= 7; i++) {
                con.SVGTextCustomize("#ladder-step-" + i + " .lc-money");
            }
            con.SVGTextCustomize("#ladder-step-2 .lc-money");
        }

        con.ResetLadder = function() {
            player_step_now = 3;
            chaser_step_now = 0;
            $(".ls-normal, .ls-player, .ls-chaser, .ls-chaser-now, .ls-arrow, .lc-money, .lc-start, .lc-arrow-holder").css("opacity", 0);
            $(".ls-empty").css("opacity", 1);
            con.TextUpdateData("#ladder-step-3 .lc-start", "XUẤT PHÁT", 1);
        }

        con.ChangeLadderTextType = function(num, type) {
            if (type == 1) {
                $("#ladder-step-" + num + " svg text").css("fill", "black");
                $("#ladder-step-" + num + " svg text").css("text-shadow", "none");
            }
            else if (type == 2) {
                $("#ladder-step-" + num + " svg text").css("fill", "red");
                $("#ladder-step-" + num + " svg text").css("text-shadow", "-2px -2px 7px rgba(0,0,0,1)");
            }
            else if (type == 3) {
                $("#ladder-step-" + num + " svg text").css("fill", "white");
                $("#ladder-step-" + num + " svg text").css("text-shadow", "-2px -2px 7px rgba(0,0,0,1)");
            }
        }

        con.RevealPlayerStepNow = function(step) {

        }

        con.ChangePlayerStepNow = function(new_step) {
            if (new_step == player_step_now) {
                return;
            }

            player_step_now = new_step;
        }

        con.InitLadder = function() {
            con.ResetLadder();
            ladder_mode = 1;
            var dur = 75;
            var j = 0;
            for (let i = 7; i >= 1; i--) {
                setTimeout(function() {
                    $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "1"}, {duration : 375, queue : false});
                    //console.log("xin chao");
                }, j);
                j += dur;
            }
            for (let i = 7; i >= 1; i--) {
                setTimeout(function() {
                    if (i == 3) {
                        $("#ladder-step-" + i + " #lcah-left").animate({"opacity" : "1"}, {duration : 250, queue : false});
                        $("#ladder-step-" + i + " #lca-left").playKeyframe({
                            name: 'ArrowLeftMove',
                            duration: '2000ms'/*,
                            iterationCount: 'infinite'*/
                        });
                        $("#ladder-step-" + i + " #lcah-right").animate({"opacity" : "1"}, {duration : 250, queue : false});
                        $("#ladder-step-" + i + " #lca-right").playKeyframe({
                            name: 'ArrowRightMove',
                            duration: '2000ms'/*,
                            iterationCount: 'infinite'*/
                        });
                        $("#ladder-step-" + i + " .lc-money").playKeyframe({
                            name: 'ZoomLCText',
                            duration: '1500ms',
                            complete: function() {
                                $("#ladder-step-" + i + " .lc-start").playKeyframe({
                                    name: 'ZoomLCText',
                                    duration: '1500ms',
                                    complete: function() {
                                        $("#ladder-step-" + i + " .lc-money").playKeyframe({
                                            name: 'ZoomLCTextFinal',
                                            duration: '750ms',
                                            complete: function() {
                                                $("#ladder-step-" + i + " .lc-money").playKeyframe("reset");
                                                $("#ladder-step-" + i + " .lc-money").css({"opacity" : "1", "transform" : "scale(1)"});
                                                $("#ladder-step-" + i + " .lc-money svg text").css("text-shadow", "-2px -2px 7px rgba(0,0,0,1)").css("fill", "white");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        $("#ladder-step-" + i + " .lc-money svg text").playKeyframe({
                            name: 'ShadowLCText',
                            duration: '1500ms',
                            complete: function() {
                                $("#ladder-step-" + i + " .lc-start svg text").playKeyframe({
                                    name: 'ShadowLCText',
                                    duration: '1500ms'
                                });
                            }
                        });
                    }
                    else {
                        $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "0"}, {duration : dur, queue : false});
                    }
                }, j);
                j += dur;
            }
        }

        con.ShowLowOffer = function() {
            $("#ladder-step-4 .ls-normal").animate({"opacity" : "1"}, {duration : 375, queue : false});
            $("#ladder-step-4 .lc-money").playKeyframe({
                name: 'ZoomLCTextFinal',
                duration: '750ms',
                complete: function() {
                    $("#ladder-step-4 .lc-money").playKeyframe("reset");
                    $("#ladder-step-4 .lc-money").css({"opacity" : "1", "transform" : "scale(1)"});
                }
            });
        }

        con.ShowHighOffer = function() {
            $("#ladder-step-2 .ls-normal").animate({"opacity" : "1"}, {duration : 375, queue : false});
            $("#ladder-step-2 .lc-money").playKeyframe({
                name: 'ZoomLCTextFinal',
                duration: '750ms',
                complete: function() {
                    $("#ladder-step-2 .lc-money").playKeyframe("reset");
                    $("#ladder-step-2 .lc-money").css({"opacity" : "1", "transform" : "scale(1)"});
                }
            });
        }

        con.ChooseHighOffer = function() {
            var dur = 75;
            var j = 0;
            for (let i = 1; i <= 1; i++) {
                setTimeout(function() {
                    $("#ladder-step-" + i + " .ls-normal").animate({"opacity" : "1"}, {duration : 375, queue : false});
                    $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "0"}, {duration : 375, queue : false});
                }, j);
                j += dur;
            }
            for (let i = 2; i <= 7; i++) {
                setTimeout(function() {
                    $("#ladder-step-" + i + " .ls-normal").animate({"opacity" : "0"}, {duration : 375, queue : false});
                    $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "1"}, {duration : 375, queue : false});
                    if (i == 2) {
                        $("#ladder-step-" + i + " .lc-money svg text").playKeyframe({
                            name: 'TextChangeColor',
                            duration: '375ms',
                            complete : function() {
                                $("#ladder-step-" + i + " .lc-money svg text").playKeyframe("reset");
                                con.ChangeLadderTextType(i, 3);
                            }
                        });
                        $("#ladder-step-" + i + " #lcah-left").css("opacity", 1);
                        $("#ladder-step-" + i + " #lca-left").playKeyframe({
                            name: 'ArrowLeftMove',
                            duration: '2000ms'/*,
                            iterationCount: 'infinite'*/
                        });
                        $("#ladder-step-" + i + " #lcah-right").css("opacity", 1);
                        $("#ladder-step-" + i + " #lca-right").css("opacity", 1).playKeyframe({
                            name: 'ArrowRightMove',
                            duration: '2000ms'/*,
                            iterationCount: 'infinite'*/
                        });
                    }
                    if (i == 3) {
                        $("#ladder-step-" + i + " #lcah-left").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                            $("#ladder-step-" + i + " #lca-left").playKeyframe("reset");
                        }});
                        $("#ladder-step-" + i + " #lcah-right").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                            $("#ladder-step-" + i + " #lca-right").playKeyframe("reset");
                        }});
                    }
                    if (i == 3 || i == 4) {
                        $("#ladder-step-" + i + " .lc-money").playKeyframe({
                            name: 'ZoomOutLCTextFinal',
                            duration: '750ms',
                            complete: function() {
                                $("#ladder-step-" + i + " .lc-money").playKeyframe("reset");
                                $("#ladder-step-" + i + " .lc-money").css({"opacity" : "0"});
                            }
                        });
                    }
                }, j);
                j += dur;
            }
        }

        con.ChooseMediumOffer = function() {
            var dur = 75;
            var j = 0;
            for (let i = 1; i <= 2; i++) {
                setTimeout(function() {
                    $("#ladder-step-" + i + " .ls-normal").animate({"opacity" : "1"}, {duration : 375, queue : false});
                    $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "0"}, {duration : 375, queue : false});
                    if (i == 2) {
                        $("#ladder-step-2 .lc-money").playKeyframe({
                            name: 'ZoomOutLCTextFinal',
                            duration: '750ms',
                            complete: function() {
                                $("#ladder-step-2 .lc-money").playKeyframe("reset");
                                $("#ladder-step-2 .lc-money").css({"opacity" : "0"});
                            }
                        });
                    }
                }, j);
                j += dur;
            }
            for (let i = 3; i <= 7; i++) {
                setTimeout(function() {
                    $("#ladder-step-" + i + " .ls-normal").animate({"opacity" : "0"}, {duration : 375, queue : false});
                    $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "1"}, {duration : 375, queue : false});
                    if (i == 4) {
                        $("#ladder-step-4 .lc-money").playKeyframe({
                            name: 'ZoomOutLCTextFinal',
                            duration: '750ms',
                            complete: function() {
                                $("#ladder-step-4 .lc-money").css({"opacity" : "0"});
                            }
                        });
                    }
                }, j);
                j += dur;
            }
        }

        con.ChooseLowOffer = function() {
            var dur = 75;
            var j = 0;
            for (let i = 1; i <= 3; i++) {
                setTimeout(function() {
                    $("#ladder-step-" + i + " .ls-normal").animate({"opacity" : "1"}, {duration : 375, queue : false});
                    $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "0"}, {duration : 375, queue : false});
                    if (i == 3) {
                        $("#ladder-step-" + i + " #lcah-left").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                            $("#ladder-step-" + i + " #lca-left").playKeyframe("reset");
                        }});
                        $("#ladder-step-" + i + " #lcah-right").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                            $("#ladder-step-" + i + " #lca-right").playKeyframe("reset");
                        }});
                    }
                    if (i == 2 || i == 3) {
                        $("#ladder-step-" + i + " .lc-money").playKeyframe({
                            name: 'ZoomOutLCTextFinal',
                            duration: '750ms',
                            complete: function() {
                                $("#ladder-step-" + i + " .lc-money").playKeyframe("reset");
                                $("#ladder-step-" + i + " .lc-money").css({"opacity" : "0"});
                            }
                        });
                    }
                }, j);
                j += dur;
            }
            for (let i = 4; i <= 7; i++) {
                setTimeout(function() {
                    $("#ladder-step-" + i + " .ls-normal").animate({"opacity" : "0"}, {duration : 375, queue : false});
                    $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "1"}, {duration : 375, queue : false});
                    if (i == 4) {
                        $("#ladder-step-" + i + " .lc-money svg text").playKeyframe({
                            name: 'TextChangeColor',
                            duration: '375ms',
                            complete : function() {
                                $("#ladder-step-" + i + " .lc-money svg text").playKeyframe("reset");
                                con.ChangeLadderTextType(i, 3);
                            }
                        });
                        $("#ladder-step-" + i + " #lcah-left").css("opacity", 1);
                        $("#ladder-step-" + i + " #lca-left").playKeyframe({
                            name: 'ArrowLeftMove',
                            duration: '2000ms'/*,
                            iterationCount: 'infinite'*/
                        });
                        $("#ladder-step-" + i + " #lcah-right").css("opacity", 1);
                        $("#ladder-step-" + i + " #lca-right").css("opacity", 1).playKeyframe({
                            name: 'ArrowRightMove',
                            duration: '2000ms'/*,
                            iterationCount: 'infinite'*/
                        });
                    }
                }, j);
                j += dur;
            }
        }

        con.PlayerMovesOneStep = function(old_step) {
            if (old_step >= 7) {
                return;
            }

            if (old_step >= 1) {
                $("#ladder-step-" + old_step + " #lcah-left").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                    $("#ladder-step-" + old_step + " #lca-left").playKeyframe("reset");
                }});
                $("#ladder-step-" + old_step + " #lcah-right").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                    $("#ladder-step-" + old_step + " #lca-right").playKeyframe("reset");
                }});
                $("#ladder-step-" + old_step + " .ls-normal").animate({"opacity" : "1"}, {duration : 375, queue : false});
                $("#ladder-step-" + old_step + " .ls-player").animate({"opacity" : "0"}, {duration : 375, queue : false});
                $("#ladder-step-" + old_step + " .lc-money").playKeyframe("reset");
                $("#ladder-step-" + old_step + " .lc-money").animate({"opacity" : "0"}, {duration : 250, queue : false});
            }

            $("#ladder-step-" + (old_step + 1) + " #lcah-left").animate({"opacity" : "1"}, {duration : 250, queue : false});
            $("#ladder-step-" + (old_step + 1) + " #lca-left").playKeyframe({
                name: 'ArrowLeftMove',
                duration: '2000ms'/*,
                iterationCount: 'infinite'*/
            });
            $("#ladder-step-" + (old_step + 1) + " #lcah-right").animate({"opacity" : "1"}, {duration : 250, queue : false});
            $("#ladder-step-" + (old_step + 1) + " #lca-right").playKeyframe({
                name: 'ArrowRightMove',
                duration: '2000ms'/*,
                iterationCount: 'infinite'*/
            });
            $("#ladder-step-" + (old_step + 1) + " .ls-normal").animate({"opacity" : "0"}, {duration : 375, queue : false});
            $("#ladder-step-" + (old_step + 1) + " .ls-player").animate({"opacity" : "1"}, {duration : 375, queue : false});

            $("#ladder-step-" + (old_step + 1) + " .lc-money").playKeyframe("reset");
            $("#ladder-step-" + (old_step + 1) + " .lc-money").animate({"opacity" : "1"}, {duration : 250, queue : false});
        }

        con.ChaserMovesOneStep = function(old_step) {
            if (old_step >= 7) {
                return;
            }
            
            if (old_step >= 1) {
                $("#ladder-step-" + old_step + " .ls-chaser-now").animate({"opacity" : "0"}, {duration : 375, queue : false});
                $("#ladder-step-" + old_step + " .ls-arrow").animate({"opacity" : "0"}, {duration : 375, queue : false});
            }

            $("#ladder-step-" + (old_step + 1) + " .ls-chaser").animate({"opacity" : "1"}, {duration : 375, queue : false});
            $("#ladder-step-" + (old_step + 1) + " .ls-chaser-now").animate({"opacity" : "1"}, {duration : 375, queue : false});
            $("#ladder-step-" + (old_step + 1) + " .ls-arrow").animate({"opacity" : "1"}, {duration : 375, queue : false});
            $("#ladder-step-" + (old_step + 1) + " .ls-arrow img").playKeyframe({
                name: 'ChaserArrowReveal',
                duration: '375ms',
                easing: 'linear'
            });
        }

        con.ModifyLadder = function(plnum, chnum) {
            con.ResetLadder();
            $(".ls-normal").css("opacity", 1);

            for (var i = 1; i <= chnum; i++) {
                $("#ladder-step-" + i + " .ls-chaser").css("opacity", 1);
            }

            $("#ladder-step-" + chnum + " .ls-chaser-now").css("opacity", 1);
            $("#ladder-step-" + chnum + " .ls-arrow").css("opacity", 1);

            for (var i = plnum; i <= 7; i++) {
                $("#ladder-step-" + i + " .ls-player").css("opacity", 1);
            }

            $("#ladder-step-" + plnum + " #lcah-left").css("opacity", 1);
            $("#ladder-step-" + plnum + " #lca-left").playKeyframe({
                name: 'ArrowLeftMove',
                duration: '2000ms'/*,
                iterationCount: 'infinite'*/
            });
            $("#ladder-step-" + plnum + " #lcah-right").css("opacity", 1);
            $("#ladder-step-" + plnum + " #lca-right").playKeyframe({
                name: 'ArrowRightMove',
                duration: '2000ms'/*,
                iterationCount: 'infinite'*/
            });

            $("#ladder-step-" + plnum + " .lc-money").playKeyframe("reset");
            $("#ladder-step-" + plnum + " .lc-money").css("opacity", 1);
        }

        con.PlayerWinsH2H = function() {
            $(".ladder-step #lcah-left").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                $(".ladder-step #lca-left").resetKeyframe();
            }});
            $(".ladder-step #lcah-right").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                $(".ladder-step #lca-right").resetKeyframe();
            }});
            $(".ladder-step .lc-money").resetKeyframe();
            $(".ladder-step .lc-money").animate({"opacity" : "0"}, {duration : 250, queue : false});
            $(".ladder-step .ls-chaser, .ladder-step .ls-arrow, .ladder-step .ls-chaser-now, .ladder-step .ls-player").animate({"opacity" : "0"}, {duration : 250, queue : false});
            $(".ladder-step .ls-normal").animate({"opacity" : "1"}, {duration : 250, queue : false, complete : function() {
                setTimeout(function() {
                    $(".ladder-step .ls-normal").animate({"opacity" : "0"}, {duration : 250, queue : false});
                    $(".ladder-step .ls-player").animate({"opacity" : "1"}, {duration : 250, queue : false});
                    var dur = 75, j = 0;
                    for (let k = 1; k <= 7; k++) {
                        for (let i = 7; i >= 1; i--) {
                            setTimeout(function() {
                                $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                                    $("#ladder-step-" + i + " .ls-player").animate({"opacity" : "1"}, {duration : 250, queue : false});
                                }});
                            }, j);
                            j += dur;
                        }
                    }
                }, 500);
            }});
        }

        con.ChaserWinsH2H = function() {
            $(".ladder-step #lcah-left").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                $(".ladder-step #lca-left").playKeyframe("reset");
            }});
            $(".ladder-step #lcah-right").animate({"opacity" : "0"}, {duration : 250, queue : false, complete : function() {
                $(".ladder-step #lca-right").playKeyframe("reset");
            }});
            $(".ladder-step .lc-money").playKeyframe("reset");
            $(".ladder-step .lc-money").animate({"opacity" : "0"}, {duration : 250, queue : false});
            $(".ladder-step .ls-arrow, .ladder-step .ls-chaser-now").animate({"opacity" : "0"}, {duration : 250, queue : false});
            var dur = 75, j = 0;
            for (let i = chaser_step_now; i <= 7; i++) {
                setTimeout(function() {
                    $("#ladder-step-" + i + " .ls-chaser").animate({"opacity" : "1"}, {duration : 250, queue : false});
                }, j);
                j += dur;
            }
        }

        //

        //

        con.ResetLadder();

        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();
            
            con.ScaleText();

            if(data.reload == 1) {
              location.reload();
              upd("reload", 0);
            }  

            if(data.reload_ladder == 1) {
              location.reload();
              upd("reload_ladder", 0);
            }        

            if (data.act_reset_ladder == 1) {
                con.ResetLadder();
                ladder_mode = 1;
                upd("act_reset_ladder", 0);
            }
            if (data.act_init_ladder == 1) {
                con.ResetLadder();
                ladder_mode = 1;
                con.InitLadder();
                upd("act_init_ladder", 0);
            }
            if (data.act_show_low_offer == 1) {
                con.ShowLowOffer();
                upd("act_show_low_offer", 0);
            }
            if (data.act_show_high_offer == 1) {
                con.ShowHighOffer();
                upd("act_show_high_offer", 0);
            }
            if (data.act_choose_high_offer == 1) {
                ladder_mode = 0;
                con.ChooseHighOffer();
                upd("act_choose_high_offer", 0);
            }
            if (data.act_choose_medium_offer == 1) {
                ladder_mode = 0;
                con.ChooseMediumOffer();
                upd("act_choose_medium_offer", 0);
            }
            if (data.act_choose_low_offer == 1) {
                ladder_mode = 0;
                con.ChooseLowOffer();
                upd("act_choose_low_offer", 0);
            }
            if (data.change_ladder_mode_to_2 == 1) {
                ladder_mode = 2;
                upd("change_ladder_mode_to_2", 0);
            }
            if (data.change_ladder_mode_to_0 == 1) {
                ladder_mode = 0;
                upd("change_ladder_mode_to_0", 0);
            }
            if (data.act_player_moves != 0) {
                con.PlayerMovesOneStep(data.act_player_moves - 1);
                upd("act_player_moves", 0);
            }
            if (data.act_chaser_moves != 0) {
                con.ChaserMovesOneStep(data.act_chaser_moves - 1);
                upd("act_chaser_moves", 0);
            }
            if (data.act_player_wins_h2h == 1) {
                con.PlayerWinsH2H();
                upd("act_player_wins_h2h", 0);
            }
            if (data.act_player_caught_h2h == 1) {
                con.ChaserWinsH2H();
                upd("act_player_caught_h2h", 0);
            }
            if (data.act_modify_ladder == 1) {
                con.ModifyLadder(data.player_step_now, data.chaser_step_now);
                upd("act_modify_ladder", 0);
            }

            if (ladder_mode == 1) {
                con.TextUpdateData("#ladder-step-2 .lc-money", accounting.formatMoney(data.high_offer), 1);
                con.ChangeLadderTextType(2, 1);
                con.TextUpdateData("#ladder-step-3 .lc-money", accounting.formatMoney(data.temp_money), 1);
                con.ChangeLadderTextType(3, 3);
                con.TextUpdateData("#ladder-step-4 .lc-money", accounting.formatMoney(data.low_offer), 1);
                con.ChangeLadderTextType(4, (data.low_offer < 0) ? 2 : 1);
            }
            else if (ladder_mode == 2) {
                for (var i = 1; i <= 7; i++) {
                    con.TextUpdateData("#ladder-step-" + i + " .lc-money", accounting.formatMoney(data.temp_money), 1);
                    con.ChangeLadderTextType(i, 3);
                }
            }
        });           

    }(window.CONTROLLER = window.CONTROLLER || {}));
});