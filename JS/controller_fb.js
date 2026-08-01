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

        function upd_passkey(key, val) {
            update(ref(db, dbKey + "_passkey"), {
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
          //console.log(this.id);
          upd(bid, 1);
        })
      
        $(".autoname").click(function(){
          upd(this.id, 1);
        });
      
        function getRandomIntInclusive(min, max) {
          const minCeiled = Math.ceil(min);
          const maxFloored = Math.floor(max);
          return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
        }
      
        function ForbiddenButton (button) {
          $(button).css("background-color", "red");
          setTimeout(function(){
            $(button).css("background-color", "black");
          }, 250);
        }
      
        // Popup - Passkey
      
        const player_url = "player-unca.html";
        const chaser_url = "chaser-gapo.html";
        const host_url = "host-qwet.html";
      
        $(".popup-close").click(function(){
          $(".popup").css("top", "1920px");
        });
      
        $(".edit-passkey").click(function(){
          $(".popup").css("top", "1920px");
          $("#popup-passkey").css("top", "0px");
        });
      
        $(".ppp-input").keyup(function(e){
          if((e.keyCode || e.which) == 13) { 
            var id = "#" + $(this).parent().attr("id");
            var pass_inp = $(this).val();
            pass_inp = pass_inp.slice(0, -1);
            $(id + " .ppp-input").val(pass_inp);
            $(id + " .ppp-submit").click();
          }
        });
      
        $(".ppp-random").click(function(){
          var id = "#" + $(this).parent().attr("id");
          var who = id.substr(5);
          var passkey = String.fromCharCode(getRandomIntInclusive(97,122),getRandomIntInclusive(97,122),getRandomIntInclusive(97,122),getRandomIntInclusive(97,122),getRandomIntInclusive(97,122),getRandomIntInclusive(97,122));
          
          upd_passkey(who + "_passkey", passkey);
        });
      
        $(".ppp-submit").click(function(){
          var id = "#" + $(this).parent().attr("id");
          var who = id.substr(5);
          var passkey = $(id + " .ppp-input").val();
          upd_passkey(who + "_passkey", passkey);
        });
      
        upd_passkey("player_url", player_url);
        upd_passkey("chaser_url", chaser_url);
        upd_passkey("host_url", host_url);
      
        onValue(ref(db, dbKey + "_passkey"), (snapshot) => {
            const data = snapshot.val();
          
            var pp_copy_string = "";
            for (var i = 1; i <= 4; i++) {
              con.TextUpdateData("#ppp_player_" + i + " .ppp-pass", eval("data.player_" + i + "_passkey"), 1);
              pp_copy_string += "Mã NC" + i + ": " + eval("data.player_" + i + "_passkey") + "\n";
            }
            con.TextUpdateData("#ppp_chaser .ppp-pass", data.chaser_passkey, 1);
            pp_copy_string += "Mã TS: " + data.chaser_passkey + "\n";
            con.TextUpdateData("#ppp_host .ppp-pass", data.host_passkey, 1);
            pp_copy_string += "Mã DCT: " + data.host_passkey + "\n";
            $(".popup-passkey-copy").html(pp_copy_string);
        });
      
        //
      
        var mode = 0;  

        var contestants = [];
        var cont_order = [1, 2, 3, 4];

        var fc_cont_left = 0;

        var player_now = 0;
        var fc_turn_now = 1;

        var cb_current_ques = 0;
        var h2h_current_ques = 0;
        var fc_current_ques = 0;

        var temp_money = 0;
        var total_money = 0;

        var player_step_now = 0;
        var chaser_step_now = 0;

        var ho_offer = 0;
        var lo_offer = 0;

        var cb_questions = [];
        var h2h_questions = [];
        var fc_questions = [];

        var final_ans_player = "";
        var final_ans_chaser = "";

        var ic_wins = 0;

        var initial_steps_counter = 0;

        var blue_steps = 0;
        var red_steps = 0;

        var player_finished_ic = [false, false, false, false];
      
        //
      
        con.ScaleText = function(){
          
        }
      
        $(".reload").click(function(){
          upd("reload", 1);
        });
      
        $(".reload-player").click(function(){
          upd("reload_player", 1);
        });
      
        $(".reload-main").click(function(){
          upd("reload_main", 1);
        });
      
        $(".reload-ladder").click(function(){
          upd("reload_ladder", 1);
        });
      
        $(".reload-team").click(function(){
          upd("reload_team", 1);
        });
      
        $(".reload-auth").click(function(){
          upd("reload_auth", 1);
        });

        function ResetQuestionsData() {
          upd("question", "");
          upd("question_line_1", "");
          upd("question_line_2", "");
          upd("answer_a", "");
          upd("answer_b", "");
          upd("answer_c", "");
          upd("correct_ans", "");
          upd("correct_ans_text", "");
          upd("note", "");
          final_ans_player = "";
          final_ans_chaser = "";
          upd("final_ans_player", "");
          upd("final_ans_chaser", "");
        }

        function UpdateCBQuestionsData(index) {
          var r = cb_current_ques - 1;
          if (index == 0) {
            upd("question", "");
            upd("question_line_1", "");
            upd("question_line_2", "");
            upd("answer_a", "");
            upd("answer_b", "");
            upd("answer_c", "");
            upd("correct_ans", "");
            upd("correct_ans_text", "");
            upd("note", "");
            final_ans_player = "";
            final_ans_chaser = "";
            upd("final_ans_player", "");
            upd("final_ans_chaser", "");
          }
          else if (index == 1) {
            upd("question", cb_questions[player_now - 1][r].Question);
            upd("question_line_1", "");
            upd("question_line_2", "");
            upd("answer_a", "");
            upd("answer_b", "");
            upd("answer_c", "");
            upd("correct_ans", "");
            upd("correct_ans_text", cb_questions[player_now - 1][r].CorrectAnsText);
            upd("note", cb_questions[player_now - 1][r].Note);
            final_ans_player = "";
            final_ans_chaser = "";
            upd("final_ans_player", "");
            upd("final_ans_chaser", "");
          }
        }

        function UpdateH2HQuestionsData(index) {
          var r = h2h_current_ques - 1;
          if (index == 0) {
            upd("question", "");
            upd("question_line_1", "");
            upd("question_line_2", "");
            upd("answer_a", "");
            upd("answer_b", "");
            upd("answer_c", "");
            upd("correct_ans", "");
            upd("correct_ans_text", "");
            upd("note", "");
            final_ans_player = "";
            final_ans_chaser = "";
            upd("final_ans_player", "");
            upd("final_ans_chaser", "");
          }
          else if (index == 1) {
            upd("question", "");
            upd("question_line_1", h2h_questions[player_now - 1][r].Question_LineOne);
            upd("question_line_2", h2h_questions[player_now - 1][r].Question_LineTwo);
            upd("answer_a", "");
            upd("answer_b", "");
            upd("answer_c", "");
            upd("correct_ans", "");
            upd("correct_ans_text", "");
            upd("note", "");
            final_ans_player = "";
            final_ans_chaser = "";
            upd("final_ans_player", "");
            upd("final_ans_chaser", "");
          }
          else if (index == 2) {
            upd("question", "");
            upd("question_line_1", h2h_questions[player_now - 1][r].Question_LineOne);
            upd("question_line_2", h2h_questions[player_now - 1][r].Question_LineTwo);
            upd("answer_a", h2h_questions[player_now - 1][r].AnswerA);
            upd("answer_b", h2h_questions[player_now - 1][r].AnswerB);
            upd("answer_c", h2h_questions[player_now - 1][r].AnswerC);
            upd("correct_ans", h2h_questions[player_now - 1][r].CorrectAns);
            upd("correct_ans_text", "");
            upd("note", h2h_questions[player_now - 1][r].Note);
            final_ans_player = "";
            final_ans_chaser = "";
            upd("final_ans_player", "");
            upd("final_ans_chaser", "");
          }
        }

        function UpdateFCQuestionsData(index) {
          var r = fc_current_ques - 1;
          if (index == 0) {
            upd("question", "");
            upd("question_line_1", "");
            upd("question_line_2", "");
            upd("answer_a", "");
            upd("answer_b", "");
            upd("answer_c", "");
            upd("correct_ans", "");
            upd("correct_ans_text", "");
            upd("note", "");
            final_ans_player = "";
            final_ans_chaser = "";
            upd("final_ans_player", "");
            upd("final_ans_chaser", "");
          }
          else if (index == 1) {
            upd("question", fc_questions[fc_turn_now - 1][r].Question);
            upd("question_line_1", "");
            upd("question_line_2", "");
            upd("answer_a", "");
            upd("answer_b", "");
            upd("answer_c", "");
            upd("correct_ans", "");
            upd("correct_ans_text", fc_questions[fc_turn_now - 1][r].CorrectAnsText);
            upd("note", fc_questions[fc_turn_now - 1][r].Note);
            final_ans_player = "";
            final_ans_chaser = "";
            upd("final_ans_player", "");
            upd("final_ans_chaser", "");
          }
        }

        function Init(){          
          remove(ref(db, dbKey));

          for (var i = 1; i <= 4; i++) {
            contestants[i - 1] = {
              Name: "",
              EliStatus: 0,
              BuzzLockStatus: 0
            };
          }
          
          for (var i = 1; i <= 4; i++) {
            upd("cont_name_" + i, "");
            upd("cont_eli_status_" + i, 0);
            upd("cont_lock_buzzer_status_" + i, 0);
            upd("cont_order_" + i, i);
          }

          upd("mode", 0);

          temp_money = total_money = 0;
          upd("temp_money", 0);
          upd("total_money", 0);

          upd("buzzer_number", 0);
          upd("buzzer_allow", 0);
          for (var i = 1; i <= 4; i++) {
            upd("buzz_epoch_" + i, 0);
          }

          upd("cb_timer", 60);
          con.TextUpdateData("#cb-timer-holder .timer", con.formatTimer(60), 1);

          upd("h2h_timer", 5);
          con.TextUpdateData("#h2h-timer-holder .timer", con.formatTimer(5), 1);

          ho_offer = lo_offer = 0;
          upd("high_offer", 0);
          upd("low_offer", 0);

          upd("controller_message", "");

          upd("player_step_now", player_step_now);
          upd("chaser_step_now", chaser_step_now);

          upd("player_now", player_now);

          upd("act_player_moves", 0);
          upd("act_chaser_moves", 0);

          upd("act_modify_blue_steps", -1);
          upd("act_modify_red_steps", -1);

          upd("player_ladder_mode", 0);
          upd("tags_mode", 0);

          upd("fc_turn_now", fc_turn_now);

          ResetQuestionsData();
        }

        function ChangeMainHolderMode(m){
          $(".ch-round").css("top", "1000%");

          if (m == 1) {
            $("#chr-home").css("top", "0%");
          }
          else if (m == 2) {
            $("#chr-ic").css("top", "0%");
          }
          else if (m == 3) {
            $("#chr-fc").css("top", "0%");
          }
        }

        function ResetIC(flag = true) {
          dib(".cb-reveal-gpx");
          dib(".cb-start-timer");
          dib(".cb-correct");
          dib(".cb-wrong");
          dib(".cb-pause-timer");
          dib(".cb-resume-timer");
          dib(".cb-hide-gpx");
          dib(".cb-chaser-walk-on");

          dib(".ladder-init");
          dib(".show-low-offer");
          dib(".show-high-offer");
          dib(".choose-high-offer");
          dib(".choose-medium-offer");
          dib(".choose-low-offer");
          dib(".the-chase-is-on");
          dib(".h2h-reveal-ques");
          dib(".h2h-reveal-ans");
          dib(".h2h-reveal-cont-ans");
          dib(".h2h-reveal-correct-ans");
          dib(".h2h-player-move");
          dib(".h2h-reveal-chaser-ans");
          dib(".h2h-chaser-move");
          dib(".h2h-hide-ques");

          upd("cb_timer", 60);
          con.TextUpdateData("#cb-timer-holder .timer", con.formatTimer(60), 1);

          upd("h2h_timer", 5);
          con.TextUpdateData("#h2h-timer-holder .timer", con.formatTimer(5), 1);

          ho_offer = lo_offer = 0;
          upd("high_offer", 0);
          upd("low_offer", 0);

          $(".ho-adjust").val();
          $(".lo-adjust").val();

          upd("allow_answering", 0);

          upd("player_ladder_mode", 0);

          ic_wins = 0;
          player_now = 0;
          upd("player_now", 0);

          if (flag == true) {
            enb(".select-player");
            player_finished_ic = [false, false, false, false];
          }

          ResetQuestionsData();
        }

        function ResetFC() {
          fc_turn_now = 1;
          upd("fc_turn_now", fc_turn_now);

          dib(".fc-chaser-start");
          enb(".fc-reveal-steps");
          dib(".fc-reveal-timer");
          dib(".fc-start-timer");
          dib(".fc-correct");
          dib(".fc-wrong");
          dib(".fc-pause-timer");
          dib(".fc-resume-timer");
          dib(".fc-hide-gpx");
          dib(".fc-lose-money");
          dib(".fc-stop-cooldown");
          dib(".fc-player-correct");
          dib(".fc-continue");

          dib(".s-player-up");
          dib(".s-player-down");
          dib(".s-player-step-submit");
          dib(".s-chaser-up");
          dib(".s-chaser-down");
          dib(".s-chaser-step-submit");
          dib(".fc-check-lose");

          upd("fc_timer", 120);
          con.TextUpdateData("#fc-timer-holder .timer", con.formatTimer(120), 1);

          blue_steps = 0;
          red_steps = 0;
          upd("blue_steps", blue_steps);
          upd("red_steps", red_steps);

          ResetQuestionsData();
        }

        function ResetBuzzer() {
          for (var i = 1; i <= 4; i++) {
            upd("buzz_epoch_" + i, 0);
          }
          upd("buzzer_number", 0);
        }

        $(".change-main").click(function(){
          enb(".change-main, .change-team, .change-ladder");
          $(".screen-iframe").css("opacity", 0);
          dib(".change-main");
          $("#i-main").css("opacity", 1);
        });

        $(".change-team").click(function(){
          enb(".change-main, .change-team, .change-ladder");
          $(".screen-iframe").css("opacity", 0);
          dib(".change-team");
          $("#i-team").css("opacity", 1);
        });

        $(".change-ladder").click(function(){
          enb(".change-main, .change-team, .change-ladder");
          $(".screen-iframe").css("opacity", 0);
          dib(".change-ladder");
          $("#i-ladder").css("opacity", 1);
        });

        $("#sm-home").click(function(){
          enb(".select-mode");
          dib(this);
          mode = 1;
          upd("mode", mode);
          ChangeMainHolderMode(mode);
        });

        $("#sm-ic").click(function(){
          enb(".select-mode");
          dib(this);
          mode = 2;
          upd("mode", mode);
          ChangeMainHolderMode(mode);
        });

        $("#sm-fc").click(function(){
          enb(".select-mode");
          dib(this);
          mode = 3;
          upd("mode", mode);
          ChangeMainHolderMode(mode);
        });

        $(".temp-money-submit").click(function(){
          var value = Number($(".temp-money-adjust").val());
          temp_money = value;
          upd("temp_money", value);
        });

        $(".te-money-submit").click(function(){
          var value = Number($(".te-money-adjust").val());
          total_money = value;
          upd("total_money", value);
        });

        $(".te-player-modify-update").click(function(){
          for (var i = 1; i <= 4; i++) {
            contestants[i - 1].Name = $("#te-pmni-" + i).val();
            cont_order[i - 1] = Number($("#te-pmoi-" + i).val());

            upd("cont_name_" + i, contestants[i - 1].Name);
            upd("cont_order_" + i, cont_order[i - 1]);
          }
        });

        $(".te-reset").click(function(){
          cont_order = [1, 2, 3, 4];
          for (var i = 1; i <= 4; i++) {
            contestants[i - 1] = {
              Name: "",
              EliStatus: 0,
              BuzzLockStatus: 0
            };
            upd("cont_name_" + i, "");
            upd("cont_order_" + i, i);
            upd("cont_eli_status_" + i, 0);
            upd("cont_lock_buzzer_status_" + i, 0);
            $("#te-pe-" + i).css("background-color", "black");
            $("#te-pe-" + i).html("Loại");
            $("#te-plb-" + i).css("background-color", "black");
            $("#te-plb-" + i).html("Khoá chuông");
            enb("#te-plb-" + i);
            upd("total_money", 0);
            upd("buzzer_allow", 0);
          }
        });

        var name_tags_opacity_counter = 0;
        $(".te-show-hide-tags").click(function(){
          if (name_tags_opacity_counter == 0) {
            upd("act_hide_name_tags", 1);
            $(this).css("background-color", "#146200FF");
            name_tags_opacity_counter = 1;
          }
          else {
            upd("act_reveal_name_tags", 1);
            $(this).css("background-color", "black");
            name_tags_opacity_counter = 0;
          }
        });

        var temp_money_opacity_counter = 0;
        $(".te-show-hide-money").click(function(){
          if (temp_money_opacity_counter == 0) {
            upd("act_hide_team_money", 1);
            $(this).css("background-color", "#146200FF");
            temp_money_opacity_counter = 1;
          }
          else {
            upd("act_reveal_team_money", 1);
            $(this).css("background-color", "black");
            temp_money_opacity_counter = 0;
          }
        });

        var rearrange_tags_opacity_counter = 0;
        $(".te-rearrange-tags").click(function(){
          if (rearrange_tags_opacity_counter == 0) {
            upd("tags_mode", 1);
            $(this).css("background-color", "#146200FF");
            rearrange_tags_opacity_counter = 1;
          }
          else {
            upd("tags_mode", 0);
            $(this).css("background-color", "black");
            rearrange_tags_opacity_counter = 0;
          }
        });
      
        $(".te-player-eliminate").click(function(){
          var num = $(this).attr("id")[6];
          for (var i = 1; i <= 4; i++) {
            if (cont_order[i - 1] == num) {
              num = i;
              break;
            }
          }
          contestants[num - 1].EliStatus = 1 - contestants[num - 1].EliStatus;
          upd("cont_eli_status_" + num, contestants[num - 1].EliStatus);
          if (contestants[num - 1].EliStatus == 0) {
            $(this).html("Loại");
            $(this).css("background-color", "black");
            enb("#te-plb-" + num);
          }
          else {
            $(this).html("Bỏ loại");
            $(this).css("background-color", "red");
            dib("#te-plb-" + num);
          }
        });
      
        $(".te-player-lock-buzzer").click(function(){
          var num = $(this).attr("id")[7];
          for (var i = 1; i <= 4; i++) {
            if (cont_order[i - 1] == num) {
              num = i;
              break;
            }
          }
          contestants[num - 1].BuzzLockStatus = 1 - contestants[num - 1].BuzzLockStatus;
          upd("cont_lock_buzzer_status_" + num, contestants[num - 1].BuzzLockStatus);
          if (contestants[num - 1].BuzzLockStatus == 0) {
            $(this).html("Khoá chuông");
            $(this).css("background-color", "black");
          }
          else {
            $(this).html("Mở chuông");
            $(this).css("background-color", "red");
          }
        });
      
        $(".load-c-info").click(function(){
          $(".get-c-info").val('').click();
        });

        $(".load-q-info").click(function(){
          $(".get-q-info").val('').click();
        });

        function UpdateContestantsInfo() {
          for (var i = 1; i <= 4; i++) {
            upd("cont_name_" + i, contestants[i - 1].Name);
          }
        }
      
        $(".get-c-info").on("change", function(e){
          var file = e.target.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(e.target.result);
            var sheet = workbook.Sheets[workbook.SheetNames[0]];

            contestants = [];

            for(var i = 1; i <= 4; i++) {
              contestants.push({
                Name: sheet['B' + (i + 3)].v,
                EliStatus: 0,
                BuzzLockStatus: 0
              });
              $("#te-pmni-" + i).val(contestants[i - 1].Name);
              $("#te-pmoi-" + i).val(cont_order[i - 1]);
            }

            UpdateContestantsInfo();

            enb(".select-player");
          };   

          reader.readAsArrayBuffer(file);
        });

        function UpdateCBQuestionNowText() {
          $("#qlh-cb .ques-using-index").html(cb_current_ques);
        }

        function UpdateH2HQuestionNowText() {
          $("#qlh-h2h .ques-using-index").html(h2h_current_ques);
        }

        function UpdateFCQuestionNowText() {
          $("#qlh-fc .ques-using-index").html(fc_current_ques);
        }

        function UpdateCBQuestionIndex(index) {
          cb_current_ques = index;
          $("#qlh-cb .ques-list option").eq(index - 1).prop("selected", true);
          $("#qlh-cb .ques-submit").click();
        }

        function UpdateH2HQuestionIndex(index) {
          h2h_current_ques = index;
          $("#qlh-h2h .ques-list option").eq(index - 1).prop("selected", true);
          $("#qlh-h2h .ques-submit").click();
        }

        function UpdateFCQuestionIndex(index) {
          fc_current_ques = index;
          $("#qlh-fc .ques-list option").eq(index - 1).prop("selected", true);
          $("#qlh-fc .ques-submit").click();
        }

        function FillQuestionsToCBList() {
          if (1 <= player_now && player_now <= 4) {
            $("#qlh-cb .ques-list").empty();
            for(var i = 0; i < 50; i++){
              $("#qlh-cb .ques-list").append('<option value="' + (i + 1) + '">' + (i + 1) + '. ' + (cb_questions[player_now - 1][i].Question) + '</option>');
            }
          }
          
          enb("#qlh-cb .ques-prev");
          enb("#qlh-cb .ques-submit");
          enb("#qlh-cb .ques-next");
        }

        function FillQuestionsToH2HList() {
          if (1 <= player_now && player_now <= 4) {
            $("#qlh-h2h .ques-list").empty();
            for(var i = 0; i < 50; i++){
              $("#qlh-h2h .ques-list").append('<option value="' + (i + 1) + '">' + (i + 1) + '. ' + (h2h_questions[player_now - 1][i].Question_LineOne + h2h_questions[player_now - 1][i].Question_LineTwo) + '</option>');
            }
          }
          
          enb("#qlh-h2h .ques-prev");
          enb("#qlh-h2h .ques-submit");
          enb("#qlh-h2h .ques-next");
        }

        function FillQuestionsToFCList() {
          if (1 <= fc_turn_now && fc_turn_now <= 2) {
            $("#qlh-fc .ques-list").empty();
            for(var i = 0; i < 100; i++){
              $("#qlh-fc .ques-list").append('<option value="' + (i + 1) + '">' + (i + 1) + '. ' + (fc_questions[fc_turn_now - 1][i].Question) + '</option>');
            }
          }
          
          enb("#qlh-fc .ques-prev");
          enb("#qlh-fc .ques-submit");
          enb("#qlh-fc .ques-next");
        }
      
        $(".get-q-info").on("change", function(e){
          var file = e.target.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(e.target.result);
            var sheet;

            cb_questions = [];
            h2h_questions = [];
            fc_questions = [];

            cb_questions.push([]);
            cb_questions.push([]);
            cb_questions.push([]);
            cb_questions.push([]);

            h2h_questions.push([]);
            h2h_questions.push([]);
            h2h_questions.push([]);
            h2h_questions.push([]);

            fc_questions.push([]);
            fc_questions.push([]);

            for (var no = 1; no <= 4; no++) {
              sheet = workbook.Sheets[workbook.SheetNames[2 * (no - 1)]];

              for (var i = 1; i <= 50; i++) {
                cb_questions[no - 1].push({
                  Question: (sheet['B' + (i + 3)].v == ".") ? "" : sheet['B' + (i + 3)].v,
                  CorrectAnsText: (sheet['C' + (i + 3)].v == ".") ? "" : sheet['C' + (i + 3)].v,
                  Note: (sheet['D' + (i + 3)].v == ".") ? "" : sheet['D' + (i + 3)].v
                });
              }
            }

            for (var no = 1; no <= 4; no++) {
              sheet = workbook.Sheets[workbook.SheetNames[2 * (no - 1) + 1]];

              for (var i = 1; i <= 50; i++) {
                var ca = "";
                if (sheet['C' + (2 * i + 3)].v == "x") {
                  ca = "a";
                }
                else if (sheet['D' + (2 * i + 3)].v == "x") {
                  ca = "b";
                }
                else if (sheet['E' + (2 * i + 3)].v == "x") {
                  ca = "c";
                }

                h2h_questions[no - 1].push({
                  Question_LineOne: (sheet['B' + (2 * i + 2)].v == ".") ? "" : sheet['B' + (2 * i + 2)].v,
                  Question_LineTwo: (sheet['B' + (2 * i + 3)].v == ".") ? "" : sheet['B' + (2 * i + 3)].v,
                  AnswerA: (sheet['C' + (2 * i + 2)].v == ".") ? "" : sheet['C' + (2 * i + 2)].v,
                  AnswerB: (sheet['D' + (2 * i + 2)].v == ".") ? "" : sheet['D' + (2 * i + 2)].v,
                  AnswerC: (sheet['E' + (2 * i + 2)].v == ".") ? "" : sheet['E' + (2 * i + 2)].v,
                  CorrectAns: ca,
                  Note: (sheet['F' + (2 * i + 2)].v == ".") ? "" : sheet['F' + (2 * i + 2)].v
                });
              }
            }

            for (var no = 1; no <= 2; no++) {
              sheet = workbook.Sheets[workbook.SheetNames[no + 7]];

              for (var i = 1; i <= 100; i++) {
                fc_questions[no - 1].push({
                  Question: (sheet['B' + (i + 3)].v == ".") ? "" : sheet['B' + (i + 3)].v,
                  CorrectAnsText: (sheet['C' + (i + 3)].v == ".") ? "" : sheet['C' + (i + 3)].v,
                  Note: (sheet['D' + (i + 3)].v == ".") ? "" : sheet['D' + (i + 3)].v
                });
              }
            }
            
            FillQuestionsToCBList();
            FillQuestionsToH2HList();
            FillQuestionsToFCList();

            UpdateFCQuestionIndex(1);

            ResetQuestionsData();

            //console.log(cb_questions);
            //console.log(h2h_questions);
            //console.log(fc_questions);
          };   

          reader.readAsArrayBuffer(file);
        });
      
        $("#qlh-cb .ques-prev").click(function(){
          if (cb_current_ques > 1) {
            UpdateCBQuestionIndex(cb_current_ques - 1);
          }
        });
      
        $("#qlh-cb .ques-next").click(function(){
          if (cb_current_ques < 50) {
            UpdateCBQuestionIndex(cb_current_ques + 1);
          }
        });

        $("#qlh-cb .ques-submit").click(function(){
          cb_current_ques = parseInt($('#qlh-cb .ques-list').val());
          UpdateCBQuestionNowText();
        });
      
        $("#qlh-h2h .ques-prev").click(function(){
          if (h2h_current_ques > 1) {
            UpdateH2HQuestionIndex(h2h_current_ques - 1);
          }
        });
      
        $("#qlh-h2h .ques-next").click(function(){
          if (h2h_current_ques < 50) {
            UpdateH2HQuestionIndex(h2h_current_ques + 1);
          }
        });

        $("#qlh-h2h .ques-submit").click(function(){
          h2h_current_ques = parseInt($('#qlh-h2h .ques-list').val());
          UpdateH2HQuestionNowText();
        });
      
        $("#qlh-fc .ques-prev").click(function(){
          if (fc_current_ques > 1) {
            UpdateFCQuestionIndex(fc_current_ques - 1);
          }
        });
      
        $("#qlh-fc .ques-next").click(function(){
          if (fc_current_ques < 100) {
            UpdateFCQuestionIndex(fc_current_ques + 1);
          }
        });

        $("#qlh-fc .ques-submit").click(function(){
          fc_current_ques = parseInt($('#qlh-fc .ques-list').val());
          UpdateFCQuestionNowText();
        });

        var allow_buzzer_counter = 0;
        $(".te-allow-buzzer").click(function(){
          if (allow_buzzer_counter == 0) {
            $(this).css("background-color", "#146200FF").html("Khoá chuông");
            ResetBuzzer();
            upd("buzzer_allow", 1);
            allow_buzzer_counter = 1;
          }
          else {
            $(this).css("background-color", "black").html("Mở chuông");
            upd("buzzer_allow", 0);
            allow_buzzer_counter = 0;
          }
        });

        let cb_clock = 60;
        let cb_clock_running = false;
        let cb_clock_paused = false;

        let cb_clock_startTime = 0;
        let cb_clock_pauseStart = 0;
        let cb_clock_pausedTime = 0;
        let cb_clock_timerId = null;

        function ResetCBClock() {
            if (cb_clock_timerId !== null) {
                clearInterval(cb_clock_timerId);
                cb_clock_timerId = null;
            }

            cb_clock_running = false;
            cb_clock_paused = false;

            cb_clock_startTime = 0;
            cb_clock_pauseStart = 0;
            cb_clock_pausedTime = 0;

            cb_clock = 60;

            upd("cb_timer", cb_clock);
            con.TextUpdateData(
                "#cb-timer-holder .timer",
                con.formatTimer(cb_clock),
                1
            );
        }

        function RunCBClock() {
            cb_clock_startTime = Date.now();
            cb_clock_pausedTime = 0;
            cb_clock_running = true;
            cb_clock_paused = false;

            cb_clock_timerId = setInterval(UpdateCBClock, 50);
        }

        function UpdateCBClock() {
            if (!cb_clock_running || cb_clock_paused)
                return;

            const elapsed = Math.floor((Date.now() - cb_clock_startTime - cb_clock_pausedTime) / 1000);
            const remaining = Math.max(0, 60 - elapsed);

            if (remaining !== cb_clock) {
                cb_clock = remaining;

                upd("cb_timer", cb_clock);
                con.TextUpdateData(
                    "#cb-timer-holder .timer",
                    con.formatTimer(cb_clock),
                    1
                );
            }

            if (remaining === 0) {
                clearInterval(cb_clock_timerId);
                cb_clock_running = false;

                upd("sfx_stop_timer", 1);
                dib(".cb-correct, .cb-wrong, .cb-pause-timer, .cb-resume-timer");
                enb(".cb-hide-gpx");
            }
        }

        function PauseCBClock() {
            if (!cb_clock_running || cb_clock_paused)
                return;

            cb_clock_paused = true;
            cb_clock_pauseStart = Date.now();
        }

        function ResumeCBClock() {
            if (!cb_clock_running || !cb_clock_paused)
                return;

            cb_clock_pausedTime += Date.now() - cb_clock_pauseStart;
            cb_clock_paused = false;
        }

        let h2h_clock = 5;
        let h2h_clock_running = false;
        let h2h_clock_paused = false;

        let h2h_clock_startTime = 0;
        let h2h_clock_pauseStart = 0;
        let h2h_clock_pausedTime = 0;
        let h2h_clock_timerId = null;

        function ResetH2HClock() {
            if (h2h_clock_timerId !== null) {
                clearInterval(h2h_clock_timerId);
                h2h_clock_timerId = null;
            }

            h2h_clock_running = false;
            h2h_clock_paused = false;

            h2h_clock_startTime = 0;
            h2h_clock_pauseStart = 0;
            h2h_clock_pausedTime = 0;

            h2h_clock = 5;

            upd("h2h_timer", h2h_clock);
            con.TextUpdateData(
                "#h2h-timer-holder .timer",
                con.formatTimer(h2h_clock),
                1
            );
        }

        function RunH2HClock() {
            h2h_clock_startTime = Date.now();
            h2h_clock_pausedTime = 0;
            h2h_clock_running = true;
            h2h_clock_paused = false;

            h2h_clock_timerId = setInterval(UpdateH2HClock, 50);
        }

        function UpdateH2HClock() {
            if (!h2h_clock_running || h2h_clock_paused)
                return;

            const elapsed = Math.floor((Date.now() - h2h_clock_startTime - h2h_clock_pausedTime) / 1000);
            const remaining = Math.max(0, 5 - elapsed);

            if (remaining !== h2h_clock) {
                h2h_clock = remaining;

                upd("h2h_timer", h2h_clock);
                con.TextUpdateData(
                    "#h2h-timer-holder .timer",
                    con.formatTimer(h2h_clock),
                    1
                );
            }

            if (remaining === 0) {
                clearInterval(h2h_clock_timerId);
                h2h_clock_running = false;

                upd("sfx_h2h_out_of_time", 1);
                setTimeout(function() {
                    upd("act_hide_h2h_tags", 1);
                }, 1000);
                upd("allow_answering", 0);
                if (final_ans_player != "") {
                  enb(".h2h-reveal-cont-ans");
                }
                else {
                  enb(".h2h-reveal-correct-ans");
                }
            }
        }

        function PauseH2HClock() {
            if (!h2h_clock_running || h2h_clock_paused)
                return;

            h2h_clock_paused = true;
            h2h_clock_pauseStart = Date.now();
        }

        function ResumeH2HClock() {
            if (!h2h_clock_running || !h2h_clock_paused)
                return;

            h2h_clock_pausedTime += Date.now() - h2h_clock_pauseStart;
            h2h_clock_paused = false;
        }

        let fc_clock = 120;
        let fc_clock_running = false;
        let fc_clock_paused = false;

        let fc_clock_startTime = 0;
        let fc_clock_pauseStart = 0;
        let fc_clock_pausedTime = 0;
        let fc_clock_timerId = null;

        function ResetFCClock() {
            if (fc_clock_timerId !== null) {
                clearInterval(fc_clock_timerId);
                fc_clock_timerId = null;
            }

            fc_clock_running = false;
            fc_clock_paused = false;

            fc_clock_startTime = 0;
            fc_clock_pauseStart = 0;
            fc_clock_pausedTime = 0;

            fc_clock = 120;

            upd("fc_timer", fc_clock);
            con.TextUpdateData(
                "#fc-timer-holder .timer",
                con.formatTimer(fc_clock),
                1
            );
        }

        function RunFCClock() {
            fc_clock_startTime = Date.now();
            fc_clock_pausedTime = 0;
            fc_clock_running = true;
            fc_clock_paused = false;

            fc_clock_timerId = setInterval(UpdateFCClock, 50);
        }

        function UpdateFCClock() {
            if (!fc_clock_running || fc_clock_paused)
                return;

            const elapsed = Math.floor((Date.now() - fc_clock_startTime - fc_clock_pausedTime) / 1000);
            const remaining = Math.max(0, 120 - elapsed);

            if (remaining !== fc_clock) {
                fc_clock = remaining;

                upd("fc_timer", fc_clock);
                con.TextUpdateData(
                    "#fc-timer-holder .timer",
                    con.formatTimer(fc_clock),
                    1
                );
            }

            if (remaining === 0) {
                clearInterval(fc_clock_timerId);
                fc_clock_running = false;

                if (fc_turn_now == 1) {
                  upd("act_fc_hide_timer", 1);

                  if (allow_buzzer_counter == 1) {
                    $(".te-allow-buzzer").click();
                  }
                  else {
                    upd("buzzer_allow", 0);
                  }
                }
                else {
                  upd("sfx_player_win", 1);
                  setTimeout(function() {
                    upd("act_fc_player_win", 1);
                  }, 750);
                }

                upd("sfx_stop_timer", 1);
                dib(".fc-correct, .fc-wrong, .fc-pause-timer, .fc-resume-timer");
                enb(".fc-hide-gpx");
            }
        }

        function PauseFCClock() {
            if (!fc_clock_running || fc_clock_paused)
                return;

            fc_clock_paused = true;
            fc_clock_pauseStart = Date.now();
        }

        function ResumeFCClock() {
            if (!fc_clock_running || !fc_clock_paused)
                return;

            fc_clock_pausedTime += Date.now() - fc_clock_pauseStart;
            fc_clock_paused = false;
        }

        $(".select-player").click(function() {
          var num = $(this).attr("id")[3];
          player_now = num;
          upd("player_now", player_now);
          dib(".select-player");
          FillQuestionsToCBList();
          FillQuestionsToH2HList();
          UpdateCBQuestionIndex(1);
          UpdateH2HQuestionIndex(1);
          ResetQuestionsData();
          ResetCBClock();
          enb(".cb-reveal-gpx, .ladder-init");
          player_step_now = 3;
          chaser_step_now = 0;

          upd("player_step_now", player_step_now);
          upd("chaser_step_now", chaser_step_now);

          upd("act_reset_ladder", 1);
        });

        $(".cb-reveal-gpx").click(function() {
          dib(this);
          enb(".cb-start-timer");
          upd("act_reveal_cb_gpx", 1);
          upd("sfx_cb_strap_on", 1);
        });

        $(".cb-start-timer").click(function() {
          dib(this);
          upd("sfx_cb_timer", 1);
          UpdateCBQuestionsData(1);
          setTimeout(function() {
            enb(".cb-correct, .cb-wrong, .cb-pause-timer");
            RunCBClock();
          }, 1000);
        });

        function AddCBMoney(old_money, i = 1) {
          temp_money = old_money + Math.round(1000 / 12 * i);
          upd("temp_money", temp_money);          
          if (i < 12) {
            setTimeout(function(){
              AddCBMoney(old_money, i + 1);
            }, 500 / 12);
          }
        }

        function AddTotalMoney(old_money, new_money, i = 1) {
          total_money = old_money + Math.round((new_money - old_money) / 24 * i);
          upd("total_money", total_money);          
          if (i < 24) {
            setTimeout(function(){
              AddTotalMoney(old_money, new_money, i + 1);
            }, 1000 / 24);
          }
        }

        $(".cb-correct").click(function() {
          AddCBMoney(temp_money);
          upd("sfx_add_cash", 1);
          dib(this);
          dib(".cb-wrong");
          $("#qlh-cb .ques-next").click();
          UpdateCBQuestionsData(1);
          if (cb_clock_running) {
            enb(".cb-correct");
            enb(".cb-wrong");
          }
        });

        $(".cb-wrong").click(function() {
          $("#qlh-cb .ques-next").click();
          UpdateCBQuestionsData(1);
        });

        $(".cb-pause-timer").click(function() {
          PauseCBClock();
          dib(this);
          enb(".cb-resume-timer");
          upd("pause_timer", 1);
        });

        $(".cb-resume-timer").click(function() {
          ResumeCBClock();
          dib(this);
          enb(".cb-pause-timer");
          upd("resume_timer", 1);
        });

        $(".cb-hide-gpx").click(function() {
          upd("act_hide_cb_gpx", 1);
          upd("sfx_wipe_off", 1);
          dib(this);
          enb(".cb-chaser-walk-on");
        });

        $(".cb-chaser-walk-on").click(function() {
          UpdateH2HQuestionsData(0);
          upd("sfx_chaser_walk_on", 1);
          dib(this);
          upd("allow_answering", 0);
        });

        $(".update-offer").click(function() {
          ho_offer = Number($(".ho-adjust").val());
          upd("high_offer", ho_offer);
          lo_offer = Number($(".lo-adjust").val());
          upd("low_offer", lo_offer);
        });

        $(".ladder-init").click(function() {
          dib(".cb-reveal-gpx");
          dib(this);
          upd("sfx_reveal_ladder", 1);
          upd("act_init_ladder", 1);
          enb(".show-low-offer");
          dib(".cb-chaser-walk-on");
          UpdateH2HQuestionsData(0);
          upd("allow_answering", 0);

          upd("player_ladder_mode", 1);
        });

        $(".show-low-offer").click(function() {
          dib(this);
          upd("sfx_show_low_offer", 1);
          upd("act_show_low_offer", 1);
          enb(".show-high-offer");

          upd("player_ladder_mode", 2);
        });

        $(".show-high-offer").click(function() {
          dib(this);
          upd("sfx_show_high_offer", 1);
          upd("act_show_high_offer", 1);
          enb(".choose-high-offer, .choose-medium-offer, .choose-low-offer");

          upd("player_ladder_mode", 3);
        });

        $(".choose-high-offer").click(function() {
          dib(".choose-high-offer, .choose-medium-offer, .choose-low-offer");
          upd("sfx_choose_high_offer", 1);
          upd("act_choose_high_offer", 1);
          setTimeout(function() {
            temp_money = ho_offer;
            upd("temp_money", ho_offer);
            upd("change_ladder_mode_to_2", 1);
            enb(".the-chase-is-on");
            player_step_now = 2;
            upd("player_step_now", player_step_now);

            upd("player_ladder_mode", 4);
          }, 1000);
        });

        $(".choose-medium-offer").click(function() {
          dib(".choose-high-offer, .choose-medium-offer, .choose-low-offer");
          upd("sfx_choose_medium_offer", 1);
          upd("act_choose_medium_offer", 1);
          setTimeout(function() {
            upd("change_ladder_mode_to_2", 1);
            enb(".the-chase-is-on");
            player_step_now = 3;
            upd("player_step_now", player_step_now);
          }, 1000);

          upd("player_ladder_mode", 4);
        });

        $(".choose-low-offer").click(function() {
          dib(".choose-high-offer, .choose-medium-offer, .choose-low-offer");
          upd("sfx_choose_low_offer", 1);
          upd("act_choose_low_offer", 1);
          setTimeout(function() {
            temp_money = lo_offer;
            upd("temp_money", lo_offer);
            upd("change_ladder_mode_to_2", 1);
            enb(".the-chase-is-on");
            player_step_now = 4;
            upd("player_step_now", player_step_now);
          }, 1000);

          upd("player_ladder_mode", 4);
        });

        $(".the-chase-is-on").click(function() {
          dib(this);
          upd("sfx_tcio", 1);
          UpdateH2HQuestionIndex(1);
          chaser_step_now = 0;
          upd("chaser_step_now", chaser_step_now);
          enb(".h2h-reveal-ques");

          upd("player_ladder_mode", 4);
        });

        $(".h2h-reveal-ques").click(function() {
          dib(this);
          UpdateH2HQuestionsData(1);
          setTimeout(function() {
            enb(".h2h-reveal-ans");
          }, 1000);
          upd("sfx_woosh_on", 1);
          upd("sfx_h2h_bed", 1);
          upd("act_h2h_reveal_question", 1);
          ResetH2HClock();
        });

        $(".h2h-reveal-ans").click(function() {
          dib(this);
          UpdateH2HQuestionsData(2);
          upd("allow_answering", 1);
          upd("act_h2h_reveal_ans", 1);
        });

        $(".h2h-reveal-cont-ans").click(function() {
          upd("act_reveal_cont_ans", 1);
          upd("sfx_reveal_cont_ans", 1);
          dib(this);
          enb(".h2h-reveal-correct-ans");
        });

        $(".h2h-reveal-correct-ans").click(function() {
          dib(this);
          upd("act_reveal_correct_ans", 1);
          upd("sfx_reveal_correct_ans", 1);

          if (final_ans_player == h2h_questions[player_now - 1][h2h_current_ques - 1].CorrectAns) {
            if (player_step_now == 7) {
              setTimeout(function() {
                player_step_now++;
                upd("player_step_now", player_step_now);
                upd("act_player_wins_h2h", 1);
                upd("sfx_player_win", 1);
                enb(".h2h-hide-ques");
                ic_wins = 1;
              }, 1000);
            }
            else {
              enb(".h2h-player-move");
              if (final_ans_chaser == "") {
                enb(".h2h-hide-ques");
              }
            }
          }
          else {
            if (final_ans_chaser != "") {
              setTimeout(function() {
                upd("sfx_h2h_chaser_bed", 1);
              }, 1000);
              enb(".h2h-reveal-chaser-ans");
            }
            else {
              enb(".h2h-hide-ques");
            }
          }
        });

        $(".h2h-player-move").click(function() {
          upd("act_player_moves", player_step_now + 1);
          player_step_now++;
          upd("player_step_now", player_step_now);
          upd("sfx_player_moves", 1);
          dib(this);
          if (final_ans_chaser != "") {
            enb(".h2h-reveal-chaser-ans");
          }
        });

        $(".h2h-reveal-chaser-ans").click(function() {
          dib(this);
          upd("act_reveal_chaser_ans", 1);
          upd("sfx_reveal_chaser_ans", 1);

          if (final_ans_chaser == h2h_questions[player_now - 1][h2h_current_ques - 1].CorrectAns) {
            if (player_step_now == chaser_step_now + 1) {
              setTimeout(function() {
                chaser_step_now++;
                upd("chaser_step_now", chaser_step_now);
                upd("act_player_caught_h2h", 1);
                upd("sfx_player_lose", 1);
                enb(".h2h-hide-ques");
                ic_wins = 2;
              }, 1000);
            }
            else {
              enb(".h2h-hide-ques");
              enb(".h2h-chaser-move");
            }
          }
          else {
            enb(".h2h-hide-ques");
          }
        });

        $(".h2h-chaser-move").click(function() {
          upd("act_chaser_moves", chaser_step_now + 1);
          chaser_step_now++;
          upd("chaser_step_now", chaser_step_now);
          upd("sfx_chaser_moves", 1);
          dib(this);
        });

        $(".h2h-hide-ques").click(function() {
          upd("act_h2h_hide_question", 1);
          upd("sfx_wipe_off", 1);

          UpdateH2HQuestionsData(0);
          dib(this);

          if (ic_wins == 1) {
            player_finished_ic[player_now - 1] = true;

            if (total_money == 0) {
              upd("act_reveal_team_money_first_time", 1);
              total_money += temp_money;
              upd("total_money", total_money);
            
              setTimeout(function() {
                temp_money = 0;
                upd("temp_money", 0);
              }, 1000);

              player_now = 0;
              upd("player_now", 0);
            }
            else {
              AddTotalMoney(total_money, total_money + temp_money);
            
              setTimeout(function() {
                temp_money = 0;
                upd("temp_money", 0);
              }, 1000);

              upd("sfx_add_cash", 1);
              setTimeout(function() {
                upd("sfx_add_cash", 1);
              }, 500);
              player_now = 0;
              upd("player_now", 0);
            }

            upd("change_ladder_mode_to_0", 1);

            for (var i = 1; i <= 4; i++) {
              var ord = cont_order[i - 1];
              if (player_finished_ic[i - 1] == 1) {
                dib("#sp-" + ord);
              }
              else {
                enb("#sp-" + ord);
              }
            }

            upd("player_ladder_mode", 0);
          }
          else if (ic_wins == 2) {
            player_finished_ic[player_now - 1] = true;
            
            setTimeout(function() {
              temp_money = 0;
              upd("temp_money", 0);
            }, 1000);

            var num = cont_order[player_now - 1];
            if (contestants[player_now - 1].EliStatus == 0) {
              $("#te-pe-" + num).click();
            }

            player_now = 0;
            upd("player_now", 0);

            upd("change_ladder_mode_to_0", 1);

            for (var i = 1; i <= 4; i++) {
              var ord = cont_order[i - 1];
              if (player_finished_ic[i - 1] == 1) {
                dib("#sp-" + ord);
              }
              else {
                enb("#sp-" + ord);
              }
            }

            upd("player_ladder_mode", 0);
          }
          else {
            $("#qlh-h2h .ques-next").click();
            enb(".h2h-reveal-ques");
          }

          ic_wins = 0;
        });

        $(".l-player-up").click(function() {
          var new_num = player_step_now - 1;
          if (1 <= new_num && new_num <= 8 && chaser_step_now <= new_num) {
            player_step_now = new_num;
            upd("player_step_now", player_step_now);
            upd("act_modify_ladder", 1);
          }
        });

        $(".l-player-down").click(function() {
          var new_num = player_step_now + 1;
          if (1 <= new_num && new_num <= 8 && chaser_step_now <= new_num) {
            player_step_now = new_num;
            upd("player_step_now", player_step_now);
            upd("act_modify_ladder", 1);
          }
        });

        $(".l-chaser-up").click(function() {
          var new_num = chaser_step_now - 1;
          if (0 <= new_num && new_num <= 7 && new_num <= player_step_now) {
            chaser_step_now = new_num;
            upd("chaser_step_now", chaser_step_now);
            upd("act_modify_ladder", 1);
          }
        });

        $(".l-chaser-down").click(function() {
          var new_num = chaser_step_now + 1;
          if (0 <= new_num && new_num <= 7 && new_num <= player_step_now) {
            chaser_step_now = new_num;
            upd("chaser_step_now", chaser_step_now);
            upd("act_modify_ladder", 1);
          }
        });

        $(".ic-check-win-lose").click(function() {
          if (player_step_now == 8) {
            upd("act_player_wins_h2h", 1);
            upd("sfx_player_win", 1);

            player_finished_ic[player_now - 1] = true;

            if (total_money == 0) {
              upd("act_reveal_team_money_first_time", 1);
              total_money += temp_money;
              upd("total_money", total_money);
            
              setTimeout(function() {
                temp_money = 0;
                upd("temp_money", 0);
              }, 1000);

              player_now = 0;
              upd("player_now", 0);

              upd("sfx_wipe_off", 1);
            }
            else {
              AddTotalMoney(total_money, total_money + temp_money);
            
              setTimeout(function() {
                temp_money = 0;
                upd("temp_money", 0);
              }, 1000);

              upd("sfx_add_cash", 1);
              setTimeout(function() {
                upd("sfx_add_cash", 1);
              }, 500);
              player_now = 0;
              upd("player_now", 0);
            }

            upd("change_ladder_mode_to_0", 1);

            for (var i = 1; i <= 4; i++) {
              var ord = cont_order[i - 1];
              if (player_finished_ic[i - 1] == 1) {
                dib("#sp-" + ord);
              }
              else {
                enb("#sp-" + ord);
              }
            }

            ResetIC(false);

            UpdateH2HQuestionsData(0);
          }
          else if (chaser_step_now == player_step_now) {
            upd("act_player_caught_h2h", 1);
            upd("sfx_player_lose", 1);
            player_finished_ic[player_now - 1] = true;
            
            setTimeout(function() {
              temp_money = 0;
              upd("temp_money", 0);
            }, 1000);

            var num = cont_order[player_now - 1];
            if (contestants[player_now - 1].EliStatus == 0) {
              $("#te-pe-" + num).click();
            }

            player_now = 0;
            upd("player_now", 0);

            upd("change_ladder_mode_to_0", 1);

            for (var i = 1; i <= 4; i++) {
              var ord = cont_order[i - 1];
              if (player_finished_ic[i - 1] == 1) {
                dib("#sp-" + ord);
              }
              else {
                enb("#sp-" + ord);
              }
            }
            
            ResetIC(false);

            UpdateH2HQuestionsData(0);
          }
        });

        $(".ic-reset").click(function() {
          ResetIC();
        });

        $(".fc-reveal-steps").click(function() {
          ResetFCClock();

          enb(".s-player-up");
          enb(".s-player-down");
          enb(".s-player-step-submit");
          enb(".s-chaser-up");
          enb(".s-chaser-down");
          enb(".s-chaser-step-submit");
          enb(".fc-check-lose");

          UpdateFCQuestionIndex(1);
          UpdateFCQuestionsData(0);
          FillQuestionsToFCList();

          if (fc_turn_now == 1) {
            if (initial_steps_counter == 1) {
              fc_cont_left = 0;
              for (var i = 1; i <= 4; i++) {
                if (contestants[i - 1].EliStatus == 0) {
                  fc_cont_left++;
                }
              }

              blue_steps = fc_cont_left;
              upd("blue_steps", blue_steps);
              red_steps = 0;
              upd("red_steps", red_steps);

              upd("act_fc_reveal_gpx_first_turn", 1);
            }
            else {
              upd("act_fc_reveal_gpx_first_turn_no_initial_steps", 1);
            }

            if (temp_money_opacity_counter == 0) {
              $(".te-show-hide-money").click();
            }
          }
          else {
            upd("act_fc_reveal_gpx_second_turn", 1);
          }

          dib(this);
          enb(".fc-reveal-timer");
          upd("sfx_woosh_on", 1);
        });

        $(".fc-reveal-timer").click(function() {
          dib(this);
          upd("act_fc_reveal_timer", 1);
          upd("sfx_fc_reveal_timer", 1);
          enb(".fc-start-timer");
        });

        $(".fc-start-timer").click(function() {
          dib(this);
          upd("sfx_fc_timer", 1);
          UpdateFCQuestionsData(1);

          if (fc_turn_now == 1) {
            if (fc_cont_left > 1) {
              if (allow_buzzer_counter == 0) {
                $(".te-allow-buzzer").click();
              }
              else {
                ResetBuzzer();
              }
            }
          }

          enb(".fc-correct, .fc-wrong, .fc-pause-timer");
          RunFCClock();
        });

        $(".fc-correct").click(function() {
          dib(this);
          dib(".fc-wrong");
          $("#qlh-fc .ques-next").click();
          UpdateFCQuestionsData(1);

          if (fc_turn_now == 1) {
            if (fc_cont_left > 1) {
              if (allow_buzzer_counter == 0) {
                $(".te-allow-buzzer").click();
              }
              else {
                ResetBuzzer();
              }
            }
          }

          if (fc_turn_now == 1) {
            upd("sfx_fc_player_correct", 1);
            blue_steps++;
            upd("blue_steps", blue_steps);
            upd("act_modify_blue_steps", blue_steps);

            setTimeout(function() {
              if (fc_clock_running) {
                enb(".fc-correct");
                enb(".fc-wrong");
              }
            }, 500);
          }
          else {
            upd("sfx_fc_chaser_correct", 1);
            red_steps++;
            upd("red_steps", red_steps);
            upd("act_modify_red_steps", red_steps);

            if (red_steps == blue_steps) {
              PauseFCClock();
              dib(".fc-correct, .fc-wrong, .fc-pause-timer, .fc-resume-timer");
              enb(".fc-hide-gpx");
              enb(".fc-lose-money");

              upd("sfx_fc_player_caught", 1);
              setTimeout(function() {
                upd("act_fc_player_caught", 1);
              }, 750);
            }
            else {
              setTimeout(function() {
                if (fc_clock_running) {
                  enb(".fc-correct");
                  enb(".fc-wrong");
                }
              }, 500);
            }
          }
        });

        $(".fc-wrong").click(function() {
          if (fc_turn_now == 1) {
            $("#qlh-fc .ques-next").click();
            UpdateFCQuestionsData(1);

            if (fc_turn_now == 1) {
              if (fc_cont_left > 1) {
                if (allow_buzzer_counter == 0) {
                  $(".te-allow-buzzer").click();
                }
                else {
                  ResetBuzzer();
                }
              }
            }
          }
          else {
            PauseFCClock();
            dib(".fc-correct, .fc-wrong");
            dib(".fc-pause-timer, .fc-resume-timer");
            enb(".fc-stop-cooldown");
            upd("pause_timer", 1);
            upd("sfx_fc_cooldown", 1);
            upd("act_fc_timer_red", 1);
            setTimeout(function() {
              upd("sfx_fc_cooldown_bed", 1);
            }, 500);
          }
        });

        $(".fc-stop-cooldown").click(function() {
          dib(this);
          upd("sfx_fc_stop_cooldown", 1);
          enb(".fc-player-correct, .fc-continue");
        });

        $(".fc-player-correct").click(function() {
          dib(this);
          upd("act_fc_pushback_ani", 1);
          setTimeout(function() {
            upd("sfx_fc_pushback", 1);
            if (red_steps > 0) {
              red_steps--;
              upd("red_steps", red_steps);
              upd("act_modify_red_steps", red_steps);
            }
            else {
              blue_steps++;
              upd("blue_steps", blue_steps);
              upd("act_modify_blue_steps", blue_steps);
            }
          }, 1500);
        });

        $(".fc-continue").click(function() {
          dib(".fc-player-correct, .fc-continue");
          upd("resume_timer", 1);
          ResumeFCClock();
          enb(".fc-pause-timer");
          enb(".fc-correct, .fc-wrong");
          upd("act_fc_timer_red", 0);
        });

        $(".fc-pause-timer").click(function() {
          PauseFCClock();
          dib(this);
          enb(".fc-resume-timer");
          upd("pause_timer", 1);
        });

        $(".fc-resume-timer").click(function() {
          ResumeFCClock();
          dib(this);
          enb(".fc-pause-timer");
          upd("resume_timer", 1);
        });

        $(".fc-hide-gpx").click(function() {
          upd("act_fc_hide_gpx", 1);
          upd("sfx_wipe_off", 1);
          dib(this);

          dib(".fc-correct, .fc-wrong");

          if (fc_turn_now == 1) {
            enb(".fc-chaser-start");

            if (temp_money_opacity_counter == 1) {
              $(".te-show-hide-money").click();
            }
          }
          else {
            dib(".s-player-up");
            dib(".s-player-down");
            dib(".s-player-step-submit");
            dib(".s-chaser-up");
            dib(".s-chaser-down");
            dib(".s-chaser-step-submit");
            dib(".fc-check-lose");
          }
        });

        $(".fc-chaser-start").click(function() {
          fc_turn_now = 2;
          upd("fc_turn_now", fc_turn_now);

          upd("sfx_tcio", 1);
          dib(this);
          
          enb(".fc-reveal-steps");
          FillQuestionsToH2HList();
        });

        $(".fc-lose-money").click(function() {
          dib(this);
          if (temp_money_opacity_counter == 0) {
            $(".te-show-hide-money").click();
          }
          upd("sfx_wipe_off", 1);
          setTimeout(function() {
            total_money = 0;
            upd("total_money", total_money);
          }, 1000);
        });

        $(".fc-auto-set-steps").click(function(){
          if (initial_steps_counter == 0) {
            $(this).css("background-color", "#146200FF");
            initial_steps_counter = 1;
          }
          else {
            upd("act_reveal_name_tags", 1);
            $(this).css("background-color", "black");
            initial_steps_counter = 0;
          }
        });

        $(".s-player-up").click(function() {
          var new_num = blue_steps + 1;
          if (0 <= new_num && red_steps <= new_num) {
            blue_steps = new_num;
            upd("blue_steps", blue_steps);
            upd("act_modify_steps", 1);
          }
        });

        $(".s-player-down").click(function() {
          var new_num = blue_steps - 1;
          if (0 <= new_num && red_steps <= new_num) {
            blue_steps = new_num;
            upd("blue_steps", blue_steps);
            upd("act_modify_steps", 1);
          }
        });

        $(".s-player-step-submit").click(function() {
          var new_num = Number($(".s-player-step-adjust").val());
          if (0 <= new_num && red_steps <= new_num) {
            blue_steps = new_num;
            upd("blue_steps", blue_steps);
            upd("act_modify_steps", 1);
          }
        });

        $(".s-chaser-up").click(function() {
          var new_num = red_steps + 1;
          if (0 <= new_num && new_num <= blue_steps) {
            red_steps = new_num;
            upd("red_steps", red_steps);
            upd("act_modify_steps", 1);
          }
        });

        $(".s-chaser-down").click(function() {
          var new_num = red_steps - 1;
          if (0 <= new_num && new_num <= blue_steps) {
            red_steps = new_num;
            upd("red_steps", red_steps);
            upd("act_modify_steps", 1);
          }
        });

        $(".s-chaser-step-submit").click(function() {
          var new_num = Number($(".s-chaser-step-adjust").val());
          if (0 <= new_num && new_num <= blue_steps) {
            red_steps = new_num;
            upd("red_steps", red_steps);
            upd("act_modify_steps", 1);
          }
        });

        $(".fc-check-lose").click(function() {
          if (blue_steps == red_steps) {
            dib(".fc-correct, .fc-wrong, .fc-pause-timer, .fc-resume-timer");
            enb(".fc-lose-money");

            upd("sfx_fc_player_caught", 1);
            setTimeout(function() {
              upd("act_fc_player_caught", 1);
            }, 750);

            dib(".s-player-up");
            dib(".s-player-down");
            dib(".s-player-step-submit");
            dib(".s-chaser-up");
            dib(".s-chaser-down");
            dib(".s-chaser-step-submit");
            dib(".fc-check-lose");
          }
        });

        $(".fc-reset").click(function() {
          ResetFC();
        });
      
        $(".message-to-host-submit").click(function(){
          upd("controller_message", $(".message-to-host").val());
        });
      
        /*
        function ResetTimer(){
          clearInterval(timer_int);
          is_timer_running = false;
          timer = 0;
          upd("timer", timer);
        }
        function PlayTimer(secs) {
          ResetTimer();
          is_timer_running = true;
          timer = secs;
          upd("timer", timer);
          timer_int = setInterval(function () {
            if(is_timer_running && timer == 0){
              ResetTimer();
            }
            else if (is_timer_running && timer != 0) {
              timer--;
              upd("timer", timer);
              if(timer == 0 && is_revealing_main_question) {
                upd("hide_no_pass_now_money", 1);
                $("#h4s-main-3").html("Chạy đồng hồ");
                timer_counter = 0;        
                upd("sfx_stop_timer", 1);

                if (lifeline_on_pass == true && auto_pass_if_times_up == true) {
                  $("#h4s-main-4").click();
                }
                else {
                  final_ans = "";
                  upd("final_ans", final_ans);
                  correct_ans = main_questions[main_q_using - 1].CorrectAns;
                  UpdateMainQuestionsData(2);
                  enb("#h4s-main-10");
                  
                  setTimeout(function(){
                    upd("stop_q_bed", 1);
                  }, 500);
                }                
              }
            }
          }, 1000);
        }
        function PauseTimer(){
          is_timer_running = false;
        }
        function ResumeTimer(){
          is_timer_running = true;
        }
        */
      
        //
      
        Init();
        ResetIC();
        ResetFC();

        $("#sm-home").click();
        $(".change-main").click();
        $(".fc-auto-set-steps").click();
      
        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();
            
            con.ScaleText();
          
            for (var i = 1; i <= 4; i++) {
              var ord = eval("data.cont_order_" + i);
              con.TextUpdateData("#sp-" + ord, eval("data.cont_name_" + i), 1);
              if (player_now == ord) {
                $("#sp-" + ord).css("background-color", "#146200FF");
              }
              else {
                $("#sp-" + ord).css("background-color", "black");
              }
              con.TextUpdateData("#te-pn-" + ord, eval("data.cont_name_" + i).toUpperCase(), 1);
              if (data.buzzer_number == i) {
                $("#te-pn-" + ord).css("background-color", "yellow");
                $("#te-pn-" + ord + " svg text").css("fill", "black");
              }
              else if (eval("data.cont_eli_status_" + i) == 1) {
                $("#te-pn-" + ord).css("background-color", "#620000");
                $("#te-pn-" + ord + " svg text").css("fill", "white");
              }
              else if (eval("data.cont_lock_buzzer_status_" + i) == 1) {
                $("#te-pn-" + ord).css("background-color", "#9d3700");
                $("#te-pn-" + ord + " svg text").css("fill", "white");
              }
              else {
                $("#te-pn-" + ord).css("background-color", "#146200FF");
                $("#te-pn-" + ord + " svg text").css("fill", "white");
              }

              if (eval("data.cont_eli_status_" + i) == 1) {
                $("#te-pn-" + ord).css("opacity", 0.5);
              }
              else {
                $("#te-pn-" + ord).css("opacity", 1);
              }
            }

            if (data.question != "") {
              $(".icq-q-text, .fcq-q-text").html(data.question);
            }
            else {
              var len = data.question_line_1.length;
              if (len > 0 && data.question_line_1[len - 1] != " ") {
                $(".icq-q-text, .fcq-q-text").html(data.question_line_1 + " " + data.question_line_2);
              }
              else {
                $(".icq-q-text, .fcq-q-text").html(data.question_line_1 + data.question_line_2);
              }
            }

            $("#icq-at-a").html(data.answer_a);
            $("#icq-at-b").html(data.answer_b);
            $("#icq-at-c").html(data.answer_c);

            $(".icq-correct-ans, .fcq-correct-ans").html(data.correct_ans_text);

            $(".icq-ans-text").css("color", "white");
            if (data.correct_ans == "a") {
              $("#icq-at-a").css("color", "lime");
            }
            else if (data.correct_ans == "b") {
              $("#icq-at-b").css("color", "lime");
            }
            else if (data.correct_ans == "c") {
              $("#icq-at-c").css("color", "lime");
            }

            $(".icq-note, .fcq-note").html(data.note);

            final_ans_player = data.final_ans_player;
            final_ans_chaser = data.final_ans_chaser;

            if (data.act_start_h2h_timer == 1) {
              RunH2HClock();
              upd("sfx_h2h_timer", 1);
              upd("act_start_h2h_timer", 0);
            }

            if (data.act_stop_h2h_timer == 1) {
              PauseH2HClock();
              upd("sfx_stop_h2h_timer", 1);
              upd("act_stop_h2h_timer", 0);
              if (data.final_ans_player != "") {
                enb(".h2h-reveal-cont-ans");
              }
              else {
                enb(".h2h-reveal-correct-ans");
              }
            }

            $(".ladder-step").css("background-color", "#006c8e");
            $(".ladder-step svg text").css("fill", "white");

            for (var i = 1; i <= 7; i++) {
              con.TextUpdateData("#ladder-step-" + i, "", 1);
            }

            if (data.player_ladder_mode == 1) {
              con.TextUpdateData("#ladder-step-3", accounting.formatMoney(data.temp_money), 1);

              $("#ladder-step-3").css("background-color", "#000e62");
            }
            else if (data.player_ladder_mode == 2) {
              con.TextUpdateData("#ladder-step-3", accounting.formatMoney(data.temp_money), 1);
              con.TextUpdateData("#ladder-step-4", accounting.formatMoney(data.low_offer), 1);

              $("#ladder-step-3").css("background-color", "#000e62");
              $("#ladder-step-4").css("background-color", "#00ffc3");

              if (data.low_offer < 0) {
                $("#ladder-step-4 svg text").css("fill", "red");
              }
              else {
                $("#ladder-step-4 svg text").css("fill", "black");
              }
            }
            else if (data.player_ladder_mode == 3) {
              con.TextUpdateData("#ladder-step-2", accounting.formatMoney(data.high_offer), 1);
              con.TextUpdateData("#ladder-step-3", accounting.formatMoney(data.temp_money), 1);
              con.TextUpdateData("#ladder-step-4", accounting.formatMoney(data.low_offer), 1);

              $("#ladder-step-2").css("background-color", "#00ffc3");
              $("#ladder-step-3").css("background-color", "#000e62");
              $("#ladder-step-4").css("background-color", "#00ffc3");

              $("#ladder-step-2 svg text").css("fill", "black");
              if (data.low_offer < 0) {
                $("#ladder-step-4 svg text").css("fill", "red");
              }
              else {
                $("#ladder-step-4 svg text").css("fill", "black");
              }
            }
            else if (data.player_ladder_mode == 4) {
              $(".ladder-step").css("background-color", "#00ffc3");

              for (var i = 1; i < data.chaser_step_now; i++) {
                $("#ladder-step-" + i).css("background-color", "#ff0000");
              }

              for (var i = data.player_step_now; i <= 7; i++) {
                $("#ladder-step-" + i).css("background-color", "#000e62");
              }

              $("#ladder-step-" + data.chaser_step_now).css("background-color", "#620000");
              con.TextUpdateData("#ladder-step-" + data.chaser_step_now, "THỢ SĂN", 1);

              if (data.player_step_now > data.chaser_step_now) {
                con.TextUpdateData("#ladder-step-" + data.player_step_now, accounting.formatMoney(data.temp_money), 1);
              }
            }

            if (data.player_ladder_mode == 4) {
              enb(".l-player-up, .l-player-down, .l-chaser-up, .l-chaser-down, .ic-check-win-lose");
            }
            else {
              dib(".l-player-up, .l-player-down, .l-chaser-up, .l-chaser-down, .ic-check-win-lose");
            }

            if (data.fc_turn_now == 1) {
              $(".fc-turn").css("background-color", "#006c8eFF");
              con.TextUpdateData(".fc-turn", "NGƯỜI CHƠI", 1);
            }
            else {
              $(".fc-turn").css("background-color", "#620000");
              con.TextUpdateData(".fc-turn", "THỢ SĂN", 1);
            }

            var HTMLBarString = "";
            for (var i = 1; i <= data.blue_steps; i++) {
              HTMLBarString += '<div class="fc-step" id="fc-step-' + i + '">';
              HTMLBarString += '<svg data-scale="true" data-lines="1">';
              HTMLBarString += '<text x="50%" y="50%" text-anchor="middle" lengthAdjust="spacingAndGlyphs" id="line_1" dominant-baseline="central">' + i + '</text>';
              HTMLBarString += "</svg>";
              HTMLBarString += "</div>";
            }
            $(".fc-bar").html(HTMLBarString);

            for (var i = 1; i <= data.blue_steps; i++) {
              $("#fc-step-" + i).css({"width" : (100 / data.blue_steps) + "%", "left" : ((100 / data.blue_steps) * (i - 1)) + "%"});
              $("#fc-step-" + i).css("background-color", "#006c8e");
              con.TextUpdateData("#fc-step-" + i, "", 1);
            }
            $("#fc-step-" + data.blue_steps).css("background-color", "aqua");
            con.TextUpdateData("#fc-step-" + data.blue_steps, data.blue_steps, 1);
            for (var i = 1; i <= data.red_steps; i++) {
              $("#fc-step-" + i).css("background-color", "red");
            }

            $("#fc-step-" + data.red_steps).css("background-color", "#ff7676");
            con.TextUpdateData("#fc-step-" + data.red_steps, data.red_steps, 1);

            con.TextUpdateData(".temp-money", accounting.formatMoney(data.temp_money), 1);
            con.TextUpdateData(".total-money", accounting.formatMoney(data.total_money), 1);

            // Check buzzer
            for (var i = 1; i <= 4; i++) {
              if (data.buzzer_allow == 1 && eval("data.buzz_epoch_" + i) != 0) {
                var who = 0, mx = -1;
                if (allow_buzzer_counter == 1) {
                  $(".te-allow-buzzer").click();
                }
                else {
                  upd("buzzer_allow", 0);
                }

                for (var j = 1; j <= 4; j++) {
                  var val = eval("data.buzz_epoch_" + j);
                  if (val != 0) {
                    if (mx == -1 || mx > val) {
                      mx = val;
                      who = j;
                    }
                  }
                }

                upd("buzzer_number", who);
                upd("act_fc_buzz_effect", 1);
                upd("sfx_buzzer", 1);
              }
            }
        });    

    }(window.CONTROLLER = window.CONTROLLER || {}));
});