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

        var final_ans_player = "";
        var final_ans_chaser = "";

        var ladder_mode = 0;
      
        var inner_int = "";

        var fc_blue_steps = 0;
        var fc_red_steps = 0;

        var mode = 0;
            
        var holders = ["#holder-2", "#holder-3", "#holder-2-chaser", "#holder-2-host", "#holder-3-chaser", "#holder-3-host"];
      
        //

        $(".ans-submit").click(function() {
            var ans = $(this).attr("id")[11];
            if (number_of_player <= 4) {
                upd("final_ans_player", ans);
                upd("sfx_player_answer", 1);
                if (final_ans_chaser == "") {
                    upd("act_start_h2h_timer", 1);
                }
                else {
                    upd("act_stop_h2h_timer", 1);
                    upd("allow_answering", 0);
                    setTimeout(function() {
                        upd("act_hide_h2h_tags", 1);
                    }, 1000);
                }
                upd("act_player_has_answered", 1);
            }
            else if (number_of_player == 5) {
                upd("final_ans_chaser", ans);
                upd("sfx_chaser_answer", 1);
                if (final_ans_player == "") {
                    upd("act_start_h2h_timer", 1);
                }
                else {
                    upd("act_stop_h2h_timer", 1);
                    upd("allow_answering", 0);
                    setTimeout(function() {
                        upd("act_hide_h2h_tags", 1);
                    }, 1000);
                }
                upd("act_chaser_has_answered", 1);
            }
        });

        con.ResetH2HGpx = function() {
            $(".ans-lock, .ans-correct, .ans-chaser").css("opacity", 0);
            $(".ans-letter svg text").css({"fill" : "white", "text-shadow": "0 0 5px white", "filter" : "blur(0.75px)"});
            $(".ans-text svg text").css({"fill" : "white", "text-shadow": "-2px -2px 7px rgba(0,0,0,1)"});
            $(".name-tag").css("opacity", 0);
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

            fc_blue_steps = nownum;
        }

        con.ModifyStepRed = function(nownum, type = 0) {
            console.log(nownum);
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

        $(".player-buzzer").click(function() {
            upd("buzz_epoch_" + number_of_player, Date.now());
            upd("buzzer_allow", 0);
        });

        $(".update-offer").click(function() {
            upd("high_offer", Number($(".ho-adjust").val()));
            upd("low_offer", Number($(".lo-adjust").val()));
            $(".ho-adjust, .lo-adjust").val("");
        });
      
        //
      
        con.ScaleText = function(){
          
        }
      
        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();
            
            con.ScaleText();

            if(data.reload == 1) {
              location.reload();
              upd("reload", 0);
            }     

            if(data.reload_player == 1) {
              location.reload();
              upd("reload_player", 0);
            }     

            final_ans_player = data.final_ans_player;
            final_ans_chaser = data.final_ans_chaser;

            con.TextUpdateData(".cb-money", accounting.formatMoney(data.temp_money), 1);
            con.TextUpdateData(".cb-timer", con.formatTimer(data.cb_timer), 1);

            con.TextUpdateData(".total-money", accounting.formatMoney(data.total_money), 1);

            if (data.mode == 2) {
                $("#holder-1, #holder-3, #holder-3-chaser, #holder-3-host").css("top", "1000%");
                $("#holder-2, #holder-2-chaser, #holder-2-host").css("top", "0%");
            }
            else if (data.mode == 3) {
                $("#holder-1, #holder-2, #holder-2-chaser, #holder-2-host").css("top", "1000%");
                $("#holder-3, #holder-3-chaser, #holder-3-host").css("top", "0%");
            }
            else {
                $("#holder-2, #holder-2-chaser, #holder-2-host, #holder-3, #holder-3-chaser, #holder-3-host").css("top", "1000%");
                $("#holder-1").css("top", "0%");
            }
          
            for (var i = 1; i <= 4; i++) {
              var ord = eval("data.cont_order_" + i);
              con.TextUpdateData("#holder-2 #player-tag-" + i, eval("data.cont_name_" + ord).toUpperCase(), 1);
              con.TextUpdateData("#holder-3 #player-tag-" + i, eval("data.cont_name_" + ord).toUpperCase(), 1);
              con.TextUpdateData("#holder-2-chaser #player-tag-" + i, eval("data.cont_name_" + ord).toUpperCase(), 1);
              con.TextUpdateData("#holder-3-chaser #player-tag-" + i, eval("data.cont_name_" + ord).toUpperCase(), 1);
              con.TextUpdateData("#holder-2-host #player-tag-" + i, eval("data.cont_name_" + ord).toUpperCase(), 1);
              con.TextUpdateData("#holder-3-host #player-tag-" + i, eval("data.cont_name_" + ord).toUpperCase(), 1);
            }

            con.TextUpdateData("#holder-2 .round-mode", "INDIVIDUAL CHASE", 1);
            con.TextUpdateData("#holder-3 .round-mode", "FINAL CHASE", 1);
            con.TextUpdateData("#holder-2-chaser .round-mode", "INDIVIDUAL CHASE", 1);
            con.TextUpdateData("#holder-3-chaser .round-mode", "FINAL CHASE", 1);
            con.TextUpdateData("#holder-2-host .round-mode", "INDIVIDUAL CHASE", 1);
            con.TextUpdateData("#holder-3-host .round-mode", "FINAL CHASE", 1);

            if (number_of_player <= 4) {
                var ord = eval("data.cont_order_" + number_of_player);
                con.TextUpdateData("#holder-2 .player-number", "Người chơi " + ord, 1);
                con.TextUpdateData("#holder-2 .player-name", eval("data.cont_name_" + ord).toUpperCase(), 1);
                con.TextUpdateData("#holder-3 .player-number", "Người chơi " + ord, 1);
                con.TextUpdateData("#holder-3 .player-name", eval("data.cont_name_" + ord).toUpperCase(), 1);

                if (eval("data.cont_eli_status_" + number_of_player) == 1 || eval("data.cont_lock_buzzer_status_" + number_of_player) == 1 || data.buzzer_allow == 0) {
                    dib(".player-buzzer");
                }
                else {
                    enb(".player-buzzer");
                }

                $(".ans-submit").css("background-color", "black");
                if (data.player_now == number_of_player && data.final_ans_player != "") {
                    $("#ans-submit-" + data.final_ans_player).css("background-color", "#146200FF");
                }
            }
            else if (number_of_player == 5) {
                con.TextUpdateData("#holder-2-chaser .player-number", "Thợ săn", 1);
                con.TextUpdateData("#holder-3-chaser .player-number", "Thợ săn", 1);

                $(".ans-submit").css("background-color", "black");
                if (data.final_ans_chaser != "") {
                    $("#ans-submit-" + data.final_ans_chaser).css("background-color", "#146200FF");
                }
            }
            else if (number_of_player == 6) {
                con.TextUpdateData("#holder-2-host .player-number", "Dẫn chương trình", 1);
                con.TextUpdateData("#holder-3-host .player-number", "Dẫn chương trình", 1);
            }

            if (data.question != "") {
                con.TextUpdateData("#holder-2 .q-text", data.question, 0);
                con.TextUpdateData("#holder-3 .q-text", data.question, 0);
                con.TextUpdateData("#holder-2-chaser .q-text", data.question, 0);
                con.TextUpdateData("#holder-3-chaser .q-text", data.question, 0);
                con.TextUpdateData("#holder-2-host .q-text", data.question, 0);
                con.TextUpdateData("#holder-3-host .q-text", data.question, 0);
            }
            else {
                con.TextUpdateData("#holder-2 .q-text", data.question_line_1, 1);
                con.TextUpdateData("#holder-2 .q-text", data.question_line_2, 2);
                con.TextUpdateData("#holder-3 .q-text", data.question_line_1, 1);
                con.TextUpdateData("#holder-3 .q-text", data.question_line_2, 2);
                con.TextUpdateData("#holder-2-chaser .q-text", data.question_line_1, 1);
                con.TextUpdateData("#holder-2-chaser .q-text", data.question_line_2, 2);
                con.TextUpdateData("#holder-3-chaser .q-text", data.question_line_1, 1);
                con.TextUpdateData("#holder-3-chaser .q-text", data.question_line_2, 2);
                con.TextUpdateData("#holder-2-host .q-text", data.question_line_1, 1);
                con.TextUpdateData("#holder-2-host .q-text", data.question_line_2, 2);
                con.TextUpdateData("#holder-3-host .q-text", data.question_line_1, 1);
                con.TextUpdateData("#holder-3-host .q-text", data.question_line_2, 2);
            }

            if (data.answer_a == "" && data.answer_b == "" && data.answer_c == "") {
                $(".ans-gpx").css("opacity", 0);
                $(".ans-submit").css("display", "none");
                $(".nhac-nguoi-choi-3").css("opacity", 0);
                if (data.question != "") {
                    $(".nhac-nguoi-choi").css("opacity", 1);
                }
                else {
                    $(".nhac-nguoi-choi").css("opacity", 0);
                }
            }
            else {
                $(".ans-gpx").css("opacity", 1);
                $(".nhac-nguoi-choi").css("opacity", 0);
                $(".nhac-nguoi-choi-3").css("opacity", 1);

                $(".ans-submit").css("display", "initial");
            }

            if (data.allow_answering == 1) {
                $(".nhac-nguoi-choi-2").css("opacity", 1);
            }
            else {
                $(".nhac-nguoi-choi-2").css("opacity", 0);
            }

            con.TextUpdateData("#ans-letter-a", "A", 1);
            con.TextUpdateData("#ans-letter-b", "B", 1);
            con.TextUpdateData("#ans-letter-c", "C", 1);
            con.TextUpdateData("#name-tag-chaser", "THỢ SĂN", 1);
            
            con.TextUpdateData("#ans-text-a", data.answer_a, 1);
            con.TextUpdateData("#ans-text-b", data.answer_b, 1);
            con.TextUpdateData("#ans-text-c", data.answer_c, 1);

            $(".correct-ans").html(data.correct_ans_text);

            $(".note").html(data.note);

            $(".controller-message").html(data.controller_message);

            mode = data.mode;

            if (data.allow_answering == 1) {
                if (number_of_player <= 4 && data.player_now == number_of_player && data.final_ans_player == "") {
                    enb(".ans-submit");
                }
                else if (number_of_player == 5 && data.final_ans_chaser == "") {
                    enb(".ans-submit");
                }
                else {
                    dib(".ans-submit");
                }
            }
            else {
                dib(".ans-submit");
            }

            if (number_of_player == 5) {
                if (data.chaser_offering_mode == 1) {
                    enb(".ho-adjust, .lo-adjust");
                    enb(".update-offer");
                }
                else {
                    dib(".ho-adjust, .lo-adjust");
                    dib(".update-offer");
                }
            }

            holders.forEach((holder_name) => {
                $(holder_name + " " + ".player-tag").css("opacity", 1);          
                for (var i = 1; i <= 4; i++) {
                    var ord = eval("data.cont_order_" + i);
                    if (eval("data.cont_eli_status_" + i) == 1) {
                        $(holder_name + " " + "#player-tag-" + ord).css("opacity", 0.5);
                    }
                    else {
                        $(holder_name + " " + "#player-tag-" + ord).css("opacity", 1);
                    }
                }
                $(holder_name + " " + ".player-tag svg text").css("fill", "white");
                if (1 <= data.player_now && data.player_now <= 4) {
                    var ord = eval("data.cont_order_" + data.player_now);
                    $(holder_name + " " + "#player-tag-" + ord + " svg text").css("fill", "yellow");
                }
            });

            if (1 <= data.player_now && data.player_now <= 4) {
                con.TextUpdateData("#name-tag-player", eval("data.cont_name_" + data.player_now).toUpperCase(), 1);
            }
            else {
                con.TextUpdateData("#name-tag-player", "", 1);
            }

            if (number_of_player == 6) {
                con.TextUpdateData(".h2h-time-left", "Đếm ngược: " + con.formatTimer(data.h2h_timer), 1);
            }
            else {
                con.TextUpdateData(".h2h-time-left", "Bạn còn: " + con.formatTimer(data.h2h_timer), 1);
            }
            
            if (data.act_start_h2h_timer == 1) {
                if (number_of_player == 6 || (data.final_ans_player == "" && number_of_player == data.player_now) || (final_ans_chaser == "" && number_of_player == 5)) {
                    $(".h2h-time-left").css("opacity", 1);
                }
                upd("act_start_h2h_timer", 0);
            }

            if(data.act_h2h_reveal_question == 1) {
                con.ResetH2HGpx();
                upd("act_h2h_reveal_question", 0);
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
                $(".h2h-time-left").animate({"opacity" : "0"}, {duration : 350, queue : false});
                upd("act_hide_h2h_tags", 0);
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
            if(data.act_h2h_hide_question == 1) {
                con.ResetH2HGpx();
                upd("act_h2h_hide_question", 0);
            }

            $(".player-tag-red-gpx").css("opacity", 0);
            for (var i = 1; i <= 4; i++) {
                if (data.buzzer_number == i) {
                    $("#player-tag-" + i + " .player-tag-red-gpx").css("opacity", 1);
                }
            }

            con.TextUpdateData(".high-offer-title", "High: " + accounting.formatMoney(data.high_offer), 1);
            con.TextUpdateData(".low-offer-title", "Low: " + accounting.formatMoney(data.low_offer), 1);

            $(".ls-normal, .ls-player, .ls-chaser, .ls-chaser-now, .ls-arrow, .lc-money, .lc-start, .lc-arrow-holder").css("opacity", 0);
            $(".ls-empty").css("opacity", 1);

            if (data.player_ladder_mode == 1) {
                con.TextUpdateData("#ladder-step-2 .lc-money", accounting.formatMoney(data.high_offer), 1);
                con.ChangeLadderTextType(2, 1);
                con.TextUpdateData("#ladder-step-3 .lc-money", accounting.formatMoney(data.temp_money), 1);
                con.ChangeLadderTextType(3, 3);
                con.TextUpdateData("#ladder-step-4 .lc-money", accounting.formatMoney(data.low_offer), 1);
                con.ChangeLadderTextType(4, (data.low_offer < 0) ? 2 : 1);

                $("#ladder-step-3 .lc-money").css("opacity", 1);

                $("#ladder-step-3 .ls-player").css("opacity", 1);
            }
            else if (data.player_ladder_mode == 2) {
                con.TextUpdateData("#ladder-step-2 .lc-money", accounting.formatMoney(data.high_offer), 1);
                con.ChangeLadderTextType(2, 1);
                con.TextUpdateData("#ladder-step-3 .lc-money", accounting.formatMoney(data.temp_money), 1);
                con.ChangeLadderTextType(3, 3);
                con.TextUpdateData("#ladder-step-4 .lc-money", accounting.formatMoney(data.low_offer), 1);
                con.ChangeLadderTextType(4, (data.low_offer < 0) ? 2 : 1);

                $("#ladder-step-3 .lc-money").css("opacity", 1);
                $("#ladder-step-4 .lc-money").css("opacity", 1);

                $("#ladder-step-3 .ls-player").css("opacity", 1);
                $("#ladder-step-4 .ls-normal").css("opacity", 1);
            }
            else if (data.player_ladder_mode == 3) {
                con.TextUpdateData("#ladder-step-2 .lc-money", accounting.formatMoney(data.high_offer), 1);
                con.ChangeLadderTextType(2, 1);
                con.TextUpdateData("#ladder-step-3 .lc-money", accounting.formatMoney(data.temp_money), 1);
                con.ChangeLadderTextType(3, 3);
                con.TextUpdateData("#ladder-step-4 .lc-money", accounting.formatMoney(data.low_offer), 1);
                con.ChangeLadderTextType(4, (data.low_offer < 0) ? 2 : 1);

                $("#ladder-step-2 .lc-money").css("opacity", 1);
                $("#ladder-step-3 .lc-money").css("opacity", 1);
                $("#ladder-step-4 .lc-money").css("opacity", 1);

                $("#ladder-step-2 .ls-normal").css("opacity", 1);
                $("#ladder-step-3 .ls-player").css("opacity", 1);
                $("#ladder-step-4 .ls-normal").css("opacity", 1);
            }
            else if (data.player_ladder_mode == 4) {
                $(".ls-normal").css("opacity", 1);

                for (var i = 1; i <= 7; i++) {
                    con.TextUpdateData("#ladder-step-" + i + " .lc-money", accounting.formatMoney(data.temp_money), 1);
                    con.ChangeLadderTextType(i, 3);
                }

                for (var i = 1; i <= data.chaser_step_now; i++) {
                    $("#ladder-step-" + i + " .ls-chaser").css("opacity", 1);
                }

                $("#ladder-step-" + data.chaser_step_now + " .ls-chaser-now").css("opacity", 1);
                $("#ladder-step-" + data.chaser_step_now + " .ls-arrow").css("opacity", 1);

                $("#ladder-step-" + data.player_step_now + " .lc-money").css("opacity", 1);

                for (var i = data.player_step_now; i <= 7; i++) {
                    $("#ladder-step-" + i + " .ls-player").css("opacity", 1);
                }
            }

            if (data.change_ladder_mode_to_2 == 1) {
                ladder_mode = 2;
                upd("change_ladder_mode_to_2", 0);
            }
            if (data.change_ladder_mode_to_0 == 1) {
                ladder_mode = 0;
                upd("change_ladder_mode_to_0", 0);
            }

            if (data.act_fc_timer_red == 1) {
                $("#fc-timer-bg-green").css("opacity", "0");
                $("#fc-timer-bg-red").css("opacity", "1");
            }
            else {
                $("#fc-timer-bg-green").css("opacity", "1");
                $("#fc-timer-bg-red").css("opacity", "0");
            }

            if (data.fc_turn_now == 1) {
              $(".current-turn").css("background-color", "#006c8eFF");
              con.TextUpdateData(".current-turn", "NGƯỜI CHƠI", 1);
            }
            else {
              $(".current-turn").css("background-color", "#620000");
              con.TextUpdateData(".current-turn", "THỢ SĂN", 1);
            }

            if (fc_blue_steps != data.blue_steps) {
                con.ModifyStepBlue(data.blue_steps, 1);
            }
            if (fc_red_steps != data.red_steps) {
                con.ModifyStepRed(data.red_steps, 1);
            }

            if (data.buzzer_number == number_of_player) {
                $(".player-buzzer").css("background-color", "#146200FF");
            }
            else {
                $(".player-buzzer").css("background-color", "black");
            }

            con.TextUpdateData(".fc-timer", con.formatTimer(data.fc_timer), 1);
        });

        //
        var delta = 50;
        var last = 0;
      
        $(document).on('keydown',function(e){
            if(e.keyCode == 13){
            var now = new Date();
            if(now - last > delta && $(".player-buzzer").prop("disabled") != true && mode == 3) {
              $(".player-buzzer").click();
              last = now;
            }
          }
          else if(e.keyCode == 49 || e.keyCode == 65){
            var now = new Date();
            if(now - last > delta && $("#ans-submit-a").prop("disabled") != true && mode == 2) {
              $("#ans-submit-a").click();
              last = now;
            }
          }
          else if(e.keyCode == 50 || e.keyCode == 66){
            var now = new Date();
            if(now - last > delta && $("#ans-submit-b").prop("disabled") != true && mode == 2) {
              $("#ans-submit-b").click();
              last = now;
            }
          }
          else if(e.keyCode == 51 || e.keyCode == 67){
            var now = new Date();
            if(now - last > delta && $("#ans-submit-c").prop("disabled") != true && mode == 2) {
              $("#ans-submit-c").click();
              last = now;
            }
          }
        });      

    }(window.CONTROLLER = window.CONTROLLER || {}));
});