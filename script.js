function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
var tokenData;
var messageData;
var json_obj
function loginAction(event){
    event.preventDefault();
    var username = document.getElementById("login_username").value;
    var password = document.getElementById("login_password").value;
    var JSONObject={"username": username, "password": password};
    $.ajax({
        url: 'http://54.191.251.207:8085/api/accounts/login',
        type: 'post',
        data: JSON.stringify(JSONObject),
        contentType: 'json',
        headers: {
            "Content-Type": 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            json_obj=data;
            tokenData=json_obj['token'];
            messageData=json_obj['message'];
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("tokenData", tokenData);
                localStorage.setItem("messageData",messageData);
                window.location.href='testblogCategory/index.html';
            } 
            else {
            }
        },
        error: function(error){
         
        }
    });
    $('#login_username').val('');
    $('#login_password').val('');
}
function registerAction(){
    var username = document.getElementById("register_username").value;
    var email = document.getElementById("register_email").value;
    var password = document.getElementById("register_password").value;
    var JSONObject= {"username":username,"email":email, "password":password };   
    if(isEmail(email)){
        var request = $.ajax({
            url: "http://192.168.9.70:8085/api/accounts/register",
            type: "post",
            data: JSON.stringify(JSONObject),
            contentType: "json",
            headers: {
                "Content-Type": 'application/json'
            },
            success: function (data) {
                debugger
                console.log(data);
            },
            error: function(error){
              debugger
            }
        });
    }
    else{
        alert("Enter a valid email");
    } 
    $('#register_username').val('');
    $('#register_email').val('');
    $('#register_password').val('');
}

function logoutAction(event) {
  console.log('ge');
  event.preventDefault();
  var URL = 'http://54.191.251.207:8085/api/accounts/logout';
  $.ajax({
    url : URL,
    type: "POST",
    xhrFields: {
      withCredentials: true
    },
    headers: {"tokenData": localStorage.getItem("tokenData")},
    crossDomain:true
  }).success(function(res) {
    console.log(res);
  }).error(function(res) {
    console.log(res);   
  });
  window.localStorage.removeItem("tokenData");
  window.alert("You are loggedout");
} 
