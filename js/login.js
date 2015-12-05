$.support.cors=true;

$(document).ready(
  validateLogin()
);

function validateLogin(){
  if(localStorage.getItem("chef")!=null){
    window.location.assign("recipeDashboard.html");
  }
}

function sendRequest(u){
    var obj=$.ajax({url:u,async:false});
    var result=$.parseJSON(obj.responseText);
    return result;  //return object
}
function login(){
  var name = username.value;
  var pword = inputPassword.value;
  var strUrl = "cs.ashesi.edu.gh/~csashesi/class2016/agatha-maison/MWC/mwfinal/response.php?cmd=16&name="+name+"&pword="+pword;
  var objResult=sendRequest(strUrl);
  if(objResult.chef!=false){
    // alert(objResult.chef.chef_name);
    localStorage.setItem("chef", objResult.chef.chef_name);
    window.location.assign("recipeDashboard.html");
  }
}

function addChef(){
  var name = username.value;
  var pword = inputPassword.value;
  var num = number.value;
  var ad = add.value;
  var cemail = email.value;
  var strUrl = "cs.ashesi.edu.gh/~csashesi/class2016/agatha-maison/MWC/mwfinal/response.php?cmd=5&name="+name+"&pword="+pword+"&number="+num+"&address="+ad+"&email="+cemail;
  var objResult=sendRequest(strUrl);
  if(objResult.result==1){
    localStorage.setItem("chef", name);
    window.location.assign("recipeDashboard.html");
  }
}

function chefSignUpForm(){
  var form ="";
  form += "<div class='container' ><div class='row'><div class='well well-lg'><form class='form-horizontal'>";
  form += "<fieldset><legend><em>Cuisine Chef Sign up</em></legend><div class='form-group'>";
  form += "<label for='username' class='col-lg-2 control-label'>Username</label><div class='col-lg-10'>";
  form += "<input type='text' class='form-control' id='username' placeholder='username'></div></div>";
  form += "<div class='form-group'><label for='inputPassword' class='col-lg-2 control-label'>Password</label>";
  form += "<div class='col-lg-10'><input type='password' class='form-control' id='inputPassword' placeholder='Password'>";
  form += "</div></div><div class='form-group'><label for='number' class='col-lg-2 control-label'>Phone Number</label>";
  form += "<div class='col-lg-10'><input type='number' class='form-control' id='number' placeholder='233123456789'>";
  form += "</div></div>";
  form += "<div class='form-group'><label for='add' class='col-lg-2 control-label'>Address</label>";
  form += "<div class='col-lg-10'><input type='text' class='form-control' id='add' placeholder='location'>";
  form += "</div></div>";
  form += "<div class='form-group'><label for='email' class='col-lg-2 control-label'>Email</label>";
  form += "<div class='col-lg-10'><input type='text' class='form-control' id='email' placeholder='email'>";
  form += "</div></div>";
  form += "<div class='col-lg-10 col-lg-offset-2'><a href='#' onclick='addChef()' class='btn btn-default btn-lg btn-block'>Sign up</a>";
  form += "</div></fieldset></form></div></div></div>";

  $('#contain').html(form);
}
