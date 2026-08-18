import { getDatabase, ref, set, update, onValue, remove, get } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

$(function () {
    "use strict";

    window.CONTROLLER = window.CONTROLLER || {};

    (function (con) {
        //

        const db = getDatabase();
		const dbID = "truy-duoi-cg";
        const dbKey = dbID + "/controller";

        // Variables

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

        //
      
        function SoundsPreload() {
            const audioTracks = [
                "Sounds/Chase_Pre_Titles.wav",
                "Sounds/Bumper.mp3",
                "Sounds/CashBuilder_sting.wav",
                "Sounds/who_is_chaser.wav",
                "Sounds/chaser_walk_on.wav",
                "Sounds/THE_CHASE_IS_ON.wav",
                "Sounds/Player Wins Original.mp3",
                "Sounds/PLAYER_WINS.wav",
                "Sounds/CHASER_WINS_THEME.wav",
                "Sounds/PLAYER_CAUGHT_THEME.wav",
                "Sounds/closing_titles_extended.wav",
                "Sounds/post_titles_bed.wav",
                "Sounds/Chat_bed LOUDER.mp3",
                "Sounds/decision_bed.wav",
                "Sounds/FINAL_CHASE_WIN_SEQUENCE.wav",
                "Sounds/INDIVIDUAL_CHASE_THEME.wav",
                "Sounds/INDIVIDUAL_CHASE_CHASER_CAN_CATCH.wav",
                "Sounds/CashBuilder_bed.wav",
                "Sounds/FinalChase_bed.wav",
                "Sounds/cb_strap_on.wav",
                "Sounds/WOOSH_ON.wav",
                "Sounds/WIPE_OFF.wav",
                "Sounds/cb_cash_up.wav",
                "Sounds/tree_reveal.wav",
                "Sounds/LADDER_SHOW_LOW_OFFER.wav",
                "Sounds/LADDER_SHOW_HIGH_OFFER.wav",
                "Sounds/LADDER_HIGH_OFFER_SELECTED.wav",
                "Sounds/LADDER_MIDDLE_OFFER_SELECTED.wav",
                "Sounds/LADDER_LOW_OFFER_SELECTED.wav",
                "Sounds/cb_time_up.wav",
                "Sounds/PLAYER_LOCKS_ANSWER.wav",
                "Sounds/CHASER_LOCKS_ANSWER.wav",
                "Sounds/IC_COUNTDOWN.wav",
                "Sounds/IC_COUNTDOWN_FINISHED.wav",
                "Sounds/contestant_choice.wav",
                "Sounds/contestant_correct.wav",
                "Sounds/LADDER_CONTESTANT_MOVES.wav",
                "Sounds/CHASER_ANSWER_REVEAL.wav",
                "Sounds/LADDER_CHASER_MOVES.wav",
                "Sounds/SHOW_CLOCK.wav",
                "Sounds/FC_BLUE_STEP_ADDED.wav",
                "Sounds/FC_RED_STEP_ADDED.wav",
                "Sounds/CHASER_WINS_THEME.wav",
                "Sounds/FC_STOP_THE_CLOCK.wav",
                "Sounds/Buzzer.mp3",
                "Sounds/Name Player/Name Player 1.mp3",
                "Sounds/Name Player/Name Player 2.mp3",
                "Sounds/Name Player/Name Player 3.mp3",
                "Sounds/Name Player/Name Player 4.mp3"
            ];

            const preloadAudio = (url) => {
                return new Promise((resolve, reject) => {
                    const audio = new Audio();

                    audio.preload = "auto";

                    audio.addEventListener("canplaythrough", () => {
                        resolve(audio);
                    }, { once: true });

                    audio.addEventListener("error", () => {
                        reject(new Error(`Failed to load: ${url}`));
                    }, { once: true });

                    audio.src = url;
                    audio.load();
                });
            };

            Promise.all(audioTracks.map(preloadAudio))
                .then(() => {
                    console.log("All audio files preloaded successfully!");
                })
                .catch(error => {
                    console.error(error);
                });
        }

        SoundsPreload();   

        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();

            if (data.sfx_intro == 1) {
                con.PlaySound("Sounds/Chase_Pre_Titles.wav", 1);
                upd("sfx_intro", 0);
            }
            if (data.sfx_bumper == 1) {
                con.PlaySound("Sounds/Bumper.mp3", 1);
                upd("sfx_bumper", 0);
            }
            if (data.sfx_cb_sting == 1) {
                con.PlaySound("Sounds/CashBuilder_sting.wav", 1);
                upd("sfx_cb_sting", 0);
            }
            if (data.sfx_who_is_chaser == 1) {
                con.PlaySound("Sounds/who_is_chaser.wav", 1);
                upd("sfx_who_is_chaser", 0);
            }
            if (data.sfx_chaser_walk_on == 1) {
                con.PlaySound("Sounds/chaser_walk_on.wav", 1);
                upd("sfx_chaser_walk_on", 0);
            }
            if (data.sfx_tcio == 1) {
                con.PlaySound("Sounds/THE_CHASE_IS_ON.wav", 1);
                upd("sfx_tcio", 0);
            }
            if (data.sfx_player_win == 1) {
                con.PlaySound("Sounds/Player Wins Original.mp3", 1);
                upd("sfx_player_win", 0);
            }
            if (data.sfx_player_win_alt == 1) {
                con.PlaySound("Sounds/PLAYER_WINS.wav", 1);
                upd("sfx_player_win_alt", 0);
            }
            if (data.sfx_player_lose == 1) {
                con.PlaySound("Sounds/CHASER_WINS_THEME.wav", 1);
                upd("sfx_player_lose", 0);
            }
            if (data.sfx_player_out == 1) {
                con.PlaySound("Sounds/PLAYER_CAUGHT_THEME.wav", 1);
                upd("sfx_player_out", 0);
            }
            if (data.sfx_credits == 1) {
                con.PlaySound("Sounds/closing_titles_extended.wav", 1);
                upd("sfx_credits", 0);
            }
            if (data.sfx_post_intro_bed == 1) {
                con.PlaySound("Sounds/post_titles_bed.wav", 5);
                upd("sfx_post_intro_bed", 0);
            }
            if (data.sfx_chat_bed == 1) {
                con.PlaySound("Sounds/Chat_bed LOUDER.mp3", 5);
                upd("sfx_chat_bed", 0);
            }
            if (data.sfx_chaser_bed == 1) {
                con.PlaySound("Sounds/decision_bed.wav", 5);
                upd("sfx_chaser_bed", 0);
            }
            if (data.sfx_fc_win_bed == 1) {
                con.PlaySound("Sounds/FINAL_CHASE_WIN_SEQUENCE.wav", 5);
                upd("sfx_fc_win_bed", 0);
            }
            if (data.sfx_h2h_bed_outlaw == 1) {
                con.PlaySound("Sounds/INDIVIDUAL_CHASE_THEME.wav", 3);
                upd("sfx_h2h_bed_outlaw", 0);
            }
            if (data.sfx_h2h_chaser_bed_outlaw == 1) {
                con.PlaySound("Sounds/INDIVIDUAL_CHASE_CHASER_CAN_CATCH.wav", 3);
                upd("sfx_h2h_chaser_bed_outlaw", 0);
            }
            if (data.sfx_cb_timer_outlaw == 1) {
                con.PlaySound("Sounds/CashBuilder_bed.wav", 3);
                upd("sfx_cb_timer_outlaw", 0);
            }
            if (data.sfx_fc_timer_outlaw == 1) {
                con.PlaySound("Sounds/FinalChase_bed.wav", 3);
                upd("sfx_fc_timer_outlaw", 0);
            }

            if (data.sfx_h2h_bed == 1) {
                con.PlaySound("Sounds/INDIVIDUAL_CHASE_THEME.wav", 3);
                upd("sfx_h2h_bed", 0);
            }
            if (data.sfx_h2h_chaser_bed == 1) {
                con.PlaySound("Sounds/INDIVIDUAL_CHASE_CHASER_CAN_CATCH.wav", 3);
                upd("sfx_h2h_chaser_bed", 0);
            }
            if (data.sfx_cb_timer == 1) {
                con.PlaySound("Sounds/CashBuilder_bed.wav", 3);
                upd("sfx_cb_timer", 0);
            }
            if (data.sfx_fc_timer == 1) {
                con.PlaySound("Sounds/FinalChase_bed.wav", 3);
                upd("sfx_fc_timer", 0);
            }
            if (data.sfx_fc_cooldown_bed == 1) {
                con.PlaySound("Sounds/tension_hold.wav", 4);
                upd("sfx_fc_cooldown_bed", 0);
            }
            if (data.sfx_fc_stop_cooldown == 1) {
                con.DecreaseSoundVolume(4, 0.45, 0.05, 500);
                setTimeout(function() {
                    con.StopSound(4);
                }, 500);
                upd("sfx_fc_stop_cooldown", 0);
            }

            if (data.sfx_cb_strap_on == 1) {
                con.PlaySound("Sounds/cb_strap_on.wav", 2);
                upd("sfx_cb_strap_on", 0);
            }
            if (data.sfx_woosh_on == 1) {
                con.PlaySound("Sounds/WOOSH_ON.wav", 2);
                upd("sfx_woosh_on", 0);
            }
            if (data.sfx_wipe_off == 1) {
                con.PlaySound("Sounds/WIPE_OFF.wav", 2);
                upd("sfx_wipe_off", 0);
            }
            if (data.sfx_add_cash == 1) {
                con.PlaySound("Sounds/cb_cash_up.wav", 2);
                upd("sfx_add_cash", 0);
            }
            if (data.sfx_reveal_ladder == 1) {
                con.PlaySound("Sounds/tree_reveal.wav", 2);
                upd("sfx_reveal_ladder", 0);
            }
            if (data.sfx_show_low_offer == 1) {
                con.PlaySound("Sounds/LADDER_SHOW_LOW_OFFER.wav", 2);
                upd("sfx_show_low_offer", 0);
            }
            if (data.sfx_show_high_offer == 1) {
                con.PlaySound("Sounds/LADDER_SHOW_HIGH_OFFER.wav", 2);
                upd("sfx_show_high_offer", 0);
            }
            if (data.sfx_choose_high_offer == 1) {
                con.PlaySound("Sounds/LADDER_HIGH_OFFER_SELECTED.wav", 2);
                upd("sfx_choose_high_offer", 0);
            }
            if (data.sfx_choose_medium_offer == 1) {
                con.PlaySound("Sounds/LADDER_MIDDLE_OFFER_SELECTED.wav", 2);
                upd("sfx_choose_medium_offer", 0);
            }
            if (data.sfx_choose_low_offer == 1) {
                con.PlaySound("Sounds/LADDER_LOW_OFFER_SELECTED.wav", 2);
                upd("sfx_choose_low_offer", 0);
            }
            if (data.sfx_stop_timer == 1) {
                setTimeout(function() {
                    con.StopSound(3);
                }, 100);
                con.PlaySound("Sounds/cb_time_up.wav", 2);
                upd("sfx_stop_timer", 0);
            }
            if (data.sfx_player_answer == 1) {
                con.PlaySound("Sounds/PLAYER_LOCKS_ANSWER.wav", 2);
                upd("sfx_player_answer", 0);
            }
            if (data.sfx_chaser_answer == 1) {
                con.PlaySound("Sounds/CHASER_LOCKS_ANSWER.wav", 2);
                upd("sfx_chaser_answer", 0);
            }
            if (data.sfx_h2h_timer == 1) {
                con.PlaySound("Sounds/IC_COUNTDOWN.wav", 4);
                upd("sfx_h2h_timer", 0);
            }
            if (data.sfx_stop_h2h_timer == 1) {
                con.StopSound(4);
                upd("sfx_stop_h2h_timer", 0);
            }
            if (data.sfx_h2h_out_of_time == 1) {
                setTimeout(function() {
                    con.StopSound(4);
                }, 100);
                con.PlaySound("Sounds/IC_COUNTDOWN_FINISHED.wav", 2);
                upd("sfx_h2h_out_of_time", 0);
            }
            if (data.sfx_reveal_cont_ans == 1) {
                con.PlaySound("Sounds/contestant_choice.wav", 2);
                upd("sfx_reveal_cont_ans", 0);
            }
            if (data.sfx_reveal_correct_ans == 1) {
                setTimeout(function() {
                    con.StopSound(3);
                }, 100);
                con.PlaySound("Sounds/contestant_correct.wav", 2);
                upd("sfx_reveal_correct_ans", 0);
            }
            if (data.sfx_player_moves == 1) {
                con.PlaySound("Sounds/LADDER_CONTESTANT_MOVES.wav", 2);
                upd("sfx_player_moves", 0);
            }
            if (data.sfx_reveal_chaser_ans == 1) {
                setTimeout(function() {
                    con.StopSound(3);
                }, 100);
                con.PlaySound("Sounds/CHASER_ANSWER_REVEAL.wav", 2);
                upd("sfx_reveal_chaser_ans", 0);
            }
            if (data.sfx_chaser_moves == 1) {
                con.PlaySound("Sounds/LADDER_CHASER_MOVES.wav", 2);
                upd("sfx_chaser_moves", 0);
            }
            if (data.sfx_fc_reveal_timer == 1) {
                con.PlaySound("Sounds/SHOW_CLOCK.wav", 2);
                upd("sfx_fc_reveal_timer", 0);
            }
            if (data.sfx_fc_player_correct == 1) {
                con.PlaySound("Sounds/FC_BLUE_STEP_ADDED.wav", 2);
                upd("sfx_fc_player_correct", 0);
            }
            if (data.sfx_fc_chaser_correct == 1) {
                con.PlaySound("Sounds/FC_RED_STEP_ADDED.wav", 2);
                upd("sfx_fc_chaser_correct", 0);
            }
            if (data.sfx_fc_player_caught == 1) {
                setTimeout(function() {
                    con.StopSound(3);
                }, 100);
                con.PlaySound("Sounds/CHASER_WINS_THEME.wav", 1);
                upd("sfx_fc_player_caught", 0);
            }
            if (data.sfx_fc_cooldown == 1) {
                con.PlaySound("Sounds/FC_STOP_THE_CLOCK.wav", 2);
                upd("sfx_fc_cooldown", 0);
            }
            if (data.sfx_fc_pushback == 1) {
                con.PlaySound("Sounds/contestant_correct.wav", 2);
                upd("sfx_fc_pushback", 0);
            }
            if (data.sfx_buzzer == 1) {
                con.PlaySound("Sounds/Buzzer.mp3", 2);
                setTimeout(function() {
                    if (1 <= data.buzzer_number && data.buzzer_number <= 4) {
                        con.PlaySound("Sounds/Name Player/Name Player " + data.buzzer_number + ".mp3", 2);
                    }
                }, 500);
                upd("sfx_buzzer", 0);
            }

            if (data.pause_timer == 1) {
                con.StopSound(3, 1);
                upd("pause_timer", 0);
            }
            if (data.resume_timer == 1) {
                con.ResumeSound(3);
                upd("resume_timer", 0);
            }
          
            if(data.pause_bed == 1) {
              con.StopSound(3,1);
              con.StopSound(4,1);
              con.StopSound(5,1);
              upd("pause_bed", 0);
            }
            if(data.resume_bed == 1) {
              con.ResumeSound(3);
              con.ResumeSound(4);
              con.ResumeSound(5);
              upd("resume_bed", 0);
            }
            if(data.stop_sounds == 1) {
              con.StopSound();
              upd("stop_sounds", 0);
            }
        });
        
      
    }(window.CONTROLLER = window.CONTROLLER || {}));
});
