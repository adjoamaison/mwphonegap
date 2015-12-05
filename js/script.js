$.support.cors=true;

$(document).ready(
  validateLogin()
);

document.addEventListerner('deviceready', onDeviceReady, false);
function onDeviceReady(){console.log(navigator.camera);}

function validateLogin(){
  if(localStorage.getItem("chef")==null){
    window.location.assign("index.html");
  }
}

function logout(){
  localStorage.removeItem("chef");
  window.location.assign("index.html");
}


function sendRequest(u){
    var obj=$.ajax({url:u,async:false});
    var result=$.parseJSON(obj.responseText);
    return result;  //return object
}

function recipeForm(){
  $("#form").attr("class", "active");
	$("#view").attr("class", "");
  var form="";
  form += "<div style='padding:30px'>";
  form += "<form class='form-horizontal'><fieldset><legend>Add New Recipe</legend>";

  form += "<div class='form-group'><label for='mealname' class='col-lg-2 control-label'>Recipe Name</label>";
  form += "<div class='col-lg-10'><input type='text' class='form-control' id='mealname' placeholder='Name'>";
  form += "</div></div>";

  form += "<div class='form-group'><label for='overview' class='col-lg-2 control-label'>Overview</label>";
  form += "<div class='col-lg-10'><textarea class='form-control' rows='3' id='overview'></textarea></div></div>";

  form += "<div class='form-group'><label for='ingr' class='col-lg-2 control-label'>Ingredients</label>";
  form += "<div class='col-lg-10'><textarea class='form-control' rows='3' id='ingr'></textarea></div></div>";

  form += "<div class='form-group'><label for='instruction0' class='col-lg-2 control-label'>Instruction</label>";
  form += "<div class='col-lg-10'><a href='#' onclick='addInst()' class='btn btn-primary btn-sm'>add</a>";
  form += "<div id='inst'><input type='text' class='form-control' id='instruction0' placeholder='Instruction'></div>";
  form += "</div></div>";

  form += "<div class='form-group'><label for='cat' class='col-lg-2 control-label'>Category</label>";
  form += "<div class='col-lg-10'><input type='text' class='form-control' id='cat' placeholder='Category'>";
  form += "<br></div>";

  form += "<div class='form-group'><label for='input-ids' class='col-lg-2 control-label'>Image</label>";
  form += "<div class='col-lg-10'><a href='#' onclick='addImage()' class='btn btn-primary'>Select Image</a>";
  form += "</div></div>";//image
  form += "<img class='form-group' id='myImage'>";
  form += "<div class='form-group'><div class='col-lg-10 col-lg-offset-2'>";
  form += "<button type='reset' onclick='viewRecipe()' class='btn btn-default'>Cancel</button>";
  form += "<input type='button' onclick='addRecipe()' class='btn btn-primary' value='Submit'></div></div>";

  form += "</fieldset></form></div>";

  $("#content").html(form);
}
  var count = 1;
function addInst(){
  var form = "";

  form += "<input type='text' class='form-control' id='instruction"+count+"' placeholder='Instruction'>";
  $("#inst").append(form);
  count++;
}

function displayUname(){
    $("#uname").html(localStorage.getItem("chef"));
}

function recipeDetails(id){
  var strUrl = "http://cs.ashesi.edu.gh/~csashesi/class2016/agatha-maison/MWC/mwfinal/response.php?cmd=3&id="+id;
		var objResult=sendRequest(strUrl);
		if(objResult.result==1){
      var recipe="";
      recipe += "<legend>"+objResult.recipe[0].mealname+"</legend><br>";
      recipe += "<div class='panel panel-default'><div class='panel-heading'>OVERVIEW</div>";
      recipe += "<div class='panel-body'>"+objResult.recipe[0].overview+"</div></div>";

      recipe += "<div class='panel panel-default'><div class='panel-heading'>INGREDIENTS</div>";
      recipe += "<div class='panel panel-default'><div class='panel-body'>";
      recipe += objResult.recipe[0].ingredients+"</div></div></div>";

      strUrl = "http://cs.ashesi.edu.gh/~csashesi/class2016/agatha-maison/MWC/mwfinal/response.php?cmd=13&id="+id;
    		var objResult=sendRequest(strUrl);
    		if(objResult.result==1){
          recipe += "<div class='panel panel-default'><div class='panel-heading'>INSTRUCTIONS</div>";
          for (var i = 0; i < objResult.instructions.length; i++) {
            recipe += "<div class='panel panel-default'><div class='panel-body'><b>";
            recipe += (i+1) +".</b>  "+objResult.instructions[i].instruction+"</div></div>";
          }
          recipe += "</div>";
        }
      $("#content").html(recipe);
    }else{
			msg = "";
	    msg += "<div class='alert alert-warning alert-dismissible' role='alert'>";
	    msg += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
	    msg += "<span aria-hidden='true'>&times;</span></button>";
	    msg += "No Details to Show.</div>";
      $("#alert").html(msg);
		}
}




//view recipe
function viewRecipe(){
  $("#view").attr("class", "active");
  $("#form").attr("class", "");
	var msg="";
	var strUrl = "http://cs.ashesi.edu.gh/~csashesi/class2016/agatha-maison/MWC/mwfinal/response.php?cmd=2";
		var objResult=sendRequest(strUrl);
		if(objResult.result==1){
			var list ="";
	    for ( var i = 0; i<objResult.recipes.length; i++) {
  			list += "<div class='col-md-4'><div class='card'><div class='card-image' style='cursor: pointer' onclick=recipeDetails('"+objResult.recipes[i].recipe_id+"')>";
        list += "<img width='100%' class='img-responsive' src='"+objResult.recipes[i].meal_image +"'>";
        list += "</div>";
        list += "<div class='card-content' style='cursor: pointer'onclick=recipeDetails('"+objResult.recipes[i].recipe_id+"')>";
        list += "<span class='card-title'>"+objResult.recipes[i].mealname+"</span>";
        list += "</div></div></div>";
      }
	    $("#content").html(list);
    }else{
			msg = "";
	    msg += "<div class='alert alert-warning alert-dismissible' role='alert'>";
	    msg += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
	    msg += "<span aria-hidden='true'>&times;</span></button>";
	    msg += "No Recipes available.</div>";
      $("#alert").html(msg);
		}
}

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function addRecipe(){
  var id = makeid();
  var name=mealname.value;
  var over=overview.value;
  var ingredient=ingr.value;
  var inst=instruction;
  var instruction =[];
  var chef=localStorage.getItem("chef");
  var c=cat.value;
  var img = "img/meal2.jpg";


  for (var i = 0; i < count; i++) {
    testd = "instruction";
    var countd = testd.concat(i);
    instruction[i]= document.getElementById(countd).value;
    var strUrl = "http://cs.ashesi.edu.gh/~csashesi/class2016/agatha-maison/MWC/mwfinal/response.php?cmd=12&recipe="+id+"&instruction="+instruction[i];
  		var objResult=sendRequest(strUrl);
  }
  var msg="";
	var strUrl = "http://cs.ashesi.edu.gh/~csashesi/class2016/agatha-maison/MWC/mwfinal/response.php?cmd=1&id="+id+"&name="+name+"&chef="+chef+"&overview="+over+"&ingr="+ingredient+"&image="+img+"&cat="+c;
		var objResult=sendRequest(strUrl);
		if(objResult.result==1){
      msg = "";
      msg += "<div class='alert alert-warning alert-dismissible' role='alert'>";
      msg += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
      msg += "<span aria-hidden='true'>&times;</span></button>";
      msg += "Recipe succefully added.</div>";

    }else{
			msg = "";
	    msg += "<div class='alert alert-warning alert-dismissible' role='alert'>";
	    msg += "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>";
	    msg += "<span aria-hidden='true'>&times;</span></button>";
	    msg += "Could not add recipe.</div>";
		}
    $("#alert").html(msg);
    $("html, body").animate({
      scrollTop:0}, "slow");
}

var recipeImage;
function addImage(){
  // alert(addImage);
  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });
}

    function onSuccess(imageURI) {
      var image = document.getElementById('myImage');
      image.src = imageURI;
      recipeImage = imageURI;
      alert(recipeImage+" ...image uri");
    }

  function onFail(message) {
      alert('Failed because: ' + message);
  }

