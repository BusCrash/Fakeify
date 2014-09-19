var newident = true;

function updateIds()
{
	var ids =
	{
		username:["username", "user_login", "user-id","new_username", "strUsername"],
		fullName:["fullName", "full-name", "user_full_name", "name"],
		firstName:["firstName", "iFirstName", "FirstName","firstname", "first_name", "strFirstName", "id_first_name","userFirstName"],
		lastName:["lastName", "iLastName", "LastName","lastname", "last_name", "strSurname", "id_last_name","userLastName"],
		email:["email", "EmailAddress", "user_email", "user_email_confirmation", "strEmail", "userEmail"],
		addressStreet:["address1"],
		addressCity:["city"],
		addressState:["state"],
		addressCountry:["country", "iCountry"],
		addressZip:["zip", "iZipCode"],
		birthdayDay:["day", "iBirthDay", "BirthDay"],
		birthdayMonth:["month","iBirthMonth", "BirthMonth"],
		birthdayYear:["year", "iBirthYear", "BirthYear"]
	};
	chrome.storage.local.set({'ids': ids});
}

function fakeify()
{
	if(newident == true)
	{
		updateIdentity();
	}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {action: "fakeify"}, function(response) {
    
  	});
	});

}

function updateIdentity()
{
	var i = 1;
	var identity =
	{
		username:'',
		firstName:'',
		lastName:'',
		fullName:'',
		email:'',
		addressStreet:'',
		addressCity:'',
		addressState:'',
		addressCountry:'',
		addressZip:'',
		birthdayDay:'',
		birthdayMonth:'',
		birthdayYear:'',
		Gender:''

	}
	$.ajax({
   url:"http://www.fakenamegenerator.com/",
   type:'GET',
   success: function(data){
      data = jQuery(data);
      identity["firstName"] = data.find(".address h3").html().trim().split(" ")[0]
      identity["lastName"] = data.find(".address h3").html().trim().split(" ")[2]
      identity["fullName"] = identity["firstName"] + " " + identity["lastName"]
      identity["email"] = identity["lastName"] + identity["firstName"] +"@mailinator.com" 
      identity["addressStreet"]=data.find(".adr").html().trim().split("<br>")[0];
      identity["addressCity"]=data.find(".adr").html().trim().split("<br>")[1].split(",")[0];
      identity["addressState"]=data.find(".adr").html().trim().split("<br>")[1].split(",")[1].split(" ")[1];
      identity["addressCountry"]="United States"
      identity["addressZip"]=data.find(".adr").html().trim().split("<br>")[1].split(",")[1].split(" ")[2];
      identity["birthdayDay"]=data.find(".bday").html().trim().split(" ")[1].split(",")[0];
      identity["birthdayMonth"]=data.find(".bday").html().trim().split(" ")[0];
      identity["birthdayYear"]=data.find(".bday").html().trim().split(" ")[2];
      identity["Gender"] = data.find(".content img")[1].alt;
      identity["username"] = identity["lastName"] + identity["firstName"] + Math.floor(Math.random() * 100);;
      console.log(identity);
      chrome.storage.local.set({'identity': identity});
   }
});

}

chrome.runtime.onInstalled.addListener(function() {

	updateIds();
	updateIdentity();
	var contextId = chrome.contextMenus.create({"title": "Fakeify", "contexts":["all"]});
	var contextFakeify = chrome.contextMenus.create({"title": "Fakeify!", "parentId":contextId, "onclick":fakeify});
	var contextIdentity = chrome.contextMenus.create({"type":"checkbox","checked":true,"title": "New Identity", "parentId":contextId, "onclick":function(context){newident = context["checked"]}});
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
});