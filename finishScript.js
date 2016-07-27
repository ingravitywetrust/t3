$(document).ready(function() {

$('#time_button').click(function(){
  var v_time = new Date();
  var v_h = v_time.getHours(),
      v_m = v_time.getMinutes(),
      v_s = v_time.getSeconds(),
      v_dt;

  if (v_h < 10) v_h = '0' + v_h;
  if (v_m < 10) v_m = '0' + v_m;
  if (v_s < 10) v_s = '0' + v_s;
  v_dt = v_h + ':' + v_m + ':' + v_s;
  $('#add_records_here').prepend(
    '<p><input class="time_class"  type="text"><input id="bob" class="bib_class"  type="text"></p>');
  $('#add_records_here > p > input:first').val(v_dt);

  $('#bob').focus();

});

  $('#add_records_here').keydown(function(e) {
    if (e.which == 9) {
      e.preventDefault();
      $('#time_button').focus();
    }
    });
});
