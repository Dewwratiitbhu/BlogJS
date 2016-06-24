var baseUrl = "http://54.191.251.207:8085/";
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
    headers: {"token": localStorage.getItem("tokenData")},
    crossDomain:true
  }).success(function(res) {
    console.log(res);
  }).error(function(res) {
    console.log(res);   
  });
  window.localStorage.removeItem("tokenData");
  localStorage.clear();
  window.location.replace("../");
} 

function alertAction(event,address){
  event.preventDefault();
  $.ajax({
    url: "http://54.191.251.207:8085/api/blogs/?category_id="+ address,
    data:{
      format: 'json'
    },
    dataType: 'json',
    type : 'GET',
    headers: {"token": localStorage.getItem("tokenData")},
    success : function(data){
      console.log(data);
      printBlog(data);
    },
    error: function(error){
          debugger
    }
  });
}

function printBlog(json_obj){
  $('#blogSpace').empty();
  var no_blog=json_obj.length;
  console.log(no_blog);
  for(var i=0;i<no_blog;i++){
    $('#blogSpace').append("<h3><a  href=\"#section" + json_obj[i].blog_id + "\" onclick=\"openBlogAction(event," + 
    json_obj[i].blog_id + ")\">" + json_obj[i].blog_title + "</a></h3><br><p>" + json_obj[i].username + " , " +
    json_obj[i].published_date + "</p> <hr>");
  }
}

$(document).ready(function(){
  $.ajax({
    url: "http://54.191.251.207:8085/api/blogs/categories",
    data:{
      format: 'json'
    },
    dataType: 'json',
    type : 'GET',
    headers: {"token": localStorage.getItem("tokenData")},
    success : function(data){
      console.log(data);
      printCategories(data);
    },
    error: function(error){
          debugger
    }
  });
  $.ajax({
    url: "http://54.191.251.207:8085/api/blogs",
    data:{
      format: 'json'
    },
    dataType: 'json',
    type : 'GET',
    headers: {"token": localStorage.getItem("tokenData")},
    success : function(data){
      console.log(data);
      printBlog(data);
    },
    error: function(error){
          debugger
    }
  });
});

function printCategories(json_obj){
  var no_categories=json_obj.length;
  console.log(no_categories);
  for(var j=0;j<no_categories;j++){
    $('#categorySpace').append("<li><a  href=\"#section" + json_obj[j].category_id + "\" onclick=\"alertAction(event," + 
      json_obj[j].category_id + ")\">"+ json_obj[j].category_name +"</a></li>");
  }
}

function openBlogAction(event,blog_id){
  $('#blogSpace').empty();
  $.ajax({
    url: "http://54.191.251.207:8085/api/blogs/"+blog_id,
    data:{
      format: 'json'
    },
    dataType: 'json',
    type : 'GET',
    headers: {"token": localStorage.getItem("tokenData")},
    success : function(data){
      console.log(data);
      printBlogById(data);
    },
    error: function(error){
          debugger
    }
  });
}

function printBlogById(json_obj){
  $('#blogSpace').append(
    "<h2>" + json_obj.blog_title + "</h2>" +
    "<h5><span class='glyp hicon glyphicon-time'></span> Post by " + json_obj.username + " , " + json_obj.published_date + "</h5>"+
    "<h5><span class=\"label label-success\">" + json_obj.category_name + "</span></h5><hr>" +
    "<p><img src=\"" + baseUrl + json_obj.image_path + "\" align=\"center\" style=\"width:304px; height:228px;\"></p>" +
    "<p>" + json_obj.blog_body + "</p><br><br>" );
}
function submitAction(event){
  window.location.replace("../../server/");
}
