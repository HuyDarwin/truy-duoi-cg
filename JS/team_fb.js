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
        
        var tags_mode = 0;
      
        //

        $.keyframe.define([
            {
                name: 'reset'
            },
            {
                name: 'ttb-buzzer-light-ani',
                '0%': {
                    'transform': 'scale(1)',
                    'opacity': '1'
                },
                '100%': {
                    'transform': 'scale(0.5)',
                    'opacity': '0'
                }
            },
            {
                name: 'ttb-buzzer-name-ani',
                '0%': {
                    'opacity': '1'
                },
                '100%': {
                    'opacity': '0'
                }
            },
            {
                name: 'money-zoom-in-out',
                '0%': {
                    'transform': 'scale(1)'
                },
                '50%': {
                    'transform': 'scale(1.2)'
                },
                '100%': {
                    'transform': 'scale(1)'
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
            for (var i = 1; i <= 4; i++) { 
                con.SVGTextCustomize("#ttb-cont-name-" + i);
            }
            con.SVGTextCustomize(".team-table-money");
        }

        con.ContNameBuzzer = function(cont_id){
            $("#ttb-cont-name-" + cont_id + " .ttb-cont-name-red-gpx").playKeyframe({
				name: 'ttb-buzzer-name-ani',
				duration: '3000ms',
				easing: 'swing',
				fillMode: 'forwards'
			});
            $("#ttb-cont-name-" + cont_id + " .ttb-white-light").playKeyframe({
				name: 'ttb-buzzer-light-ani',
				duration: '3000ms',
				easing: 'swing',
				fillMode: 'forwards'
			});
        }

        //

        //

        con.RevealNameTags = function() {
            $(".ttb-cont-name-holder").css("opacity", 1);
        }

        con.HideNameTags = function() {
            $(".ttb-cont-name-holder").css("opacity", 0);
        }

        con.RevealTeamMoney = function() {
            $(".team-table-money").playKeyframe({
                name: 'chase-ish-reveal',
                duration: '350ms',
				easing: 'swing',
				fillMode: 'forwards',
                complete: function() {
                    $(this).css("opacity", 1);
                }
            });
        }

        con.HideTeamMoney = function() {
            $(".team-table-money").playKeyframe({
                name: 'chase-ish-hide',
                duration: '350ms',
				easing: 'swing',
				fillMode: 'forwards',
                complete: function() {
                    $(this).css("opacity", 0);
                }
            });
        }

        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();
            
            con.ScaleText();

            if(data.reload == 1) {
              location.reload();
              upd("reload", 0);
            }     

            if(data.reload_team == 1) {
              location.reload();
              upd("reload_team", 0);
            }     

            for (var i = 1; i <= 4; i++) {
                var ord = eval("data.cont_order_" + i);
                con.TextUpdateData("#ttb-cont-name-" + ord, eval("data.cont_name_" + i).toUpperCase(), 1);
                if (eval("data.cont_eli_status_" + i) == 1) {
                    $("#ttb-cont-name-" + ord).css("opacity", 0.5);
                } 
                else {
                    $("#ttb-cont-name-" + ord).css("opacity", 1);
                }
            }

            if (data.total_money == 0) {
                con.TextUpdateData(".team-table-money", "", 1);
            }
            else {
                con.TextUpdateData(".team-table-money", accounting.formatMoney(data.total_money), 1);
            }

            if (data.act_reveal_name_tags == 1) {
                con.RevealNameTags();
                upd("act_reveal_name_tags", 0);
            }
            if (data.act_hide_name_tags == 1) {
                con.HideNameTags();
                upd("act_hide_name_tags", 0);
            }
            if (data.act_reveal_team_money_first_time == 1) {
                $(".team-table-money").css("opacity", 0);
                con.RevealTeamMoney();
                upd("act_reveal_team_money_first_time", 0);
            }
            if (data.act_reveal_team_money == 1) {
                con.RevealTeamMoney();
                upd("act_reveal_team_money", 0);
            }
            if (data.act_hide_team_money == 1) {
                con.HideTeamMoney();
                upd("act_hide_team_money", 0);
            }
            if (data.act_fc_player_win == 1) {
                $(".team-table-money").playKeyframe({
                    name: 'money-zoom-in-out',
                    duration: '300ms',
                    easing: 'swing',
                    iterationCount: 15
                });
                upd("act_fc_player_win", 0);
            }
            if (data.act_fc_buzz_effect == 1) {
                con.ContNameBuzzer(data.buzzer_number);
                upd("act_fc_buzz_effect", 0);
            }

            if (data.tags_mode == 1) {
                var cont_left = [];
                for (var i = 1; i <= 4; i++) {
                    if(eval("data.cont_eli_status_" + i) == 1) {
                        $("#ttb-cont-name-" + i).css("visibility", "hidden");
                    }
                    else {
                        $("#ttb-cont-name-" + i).css("visibility", "visible");
                        cont_left.push(i);
                    }
                }

                if (cont_left.length == 1) {
                    $("#ttb-cont-name-" + cont_left[0]).css("right", "38.1%");
                }
                else if (cont_left.length == 2) {
                    $("#ttb-cont-name-" + cont_left[0]).css("right", "26.05%");
                    $("#ttb-cont-name-" + cont_left[1]).css("right", "50.15%");
                }
                else if (cont_left.length == 3) {
                    $("#ttb-cont-name-" + cont_left[0]).css("right", "1.95%");
                    $("#ttb-cont-name-" + cont_left[1]).css("right", "38.1%");
                    $("#ttb-cont-name-" + cont_left[2]).css("right", "74.25%");
                }
                else if (cont_left.length == 4) {
                    $("#ttb-cont-name-" + cont_left[0]).css("right", "1.95%");
                    $("#ttb-cont-name-" + cont_left[1]).css("right", "26.05%");
                    $("#ttb-cont-name-" + cont_left[2]).css("right", "50.15%");
                    $("#ttb-cont-name-" + cont_left[3]).css("right", "74.25%");
                }
            }
            else {
                $("#ttb-cont-name-1").css({"visibility" : "visible", "right" : "1.95%"});
                $("#ttb-cont-name-2").css({"visibility" : "visible", "right" : "26.05%"});
                $("#ttb-cont-name-3").css({"visibility" : "visible", "right" : "50.15%"});
                $("#ttb-cont-name-4").css({"visibility" : "visible", "right" : "74.25%"});
            }
        });           

    }(window.CONTROLLER = window.CONTROLLER || {}));
});