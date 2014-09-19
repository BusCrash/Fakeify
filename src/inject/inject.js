var	ids = {},
	username,
	fullName,
	firstName,
	lastName,
	email,
	addressStreet,
	addressCity,
	addressState,
	addressCountry,
	addressZip,
	birthdayDay,
	birthdayMonth,
	birthdayYear
var months = 
{
	"January":1,
	"February":2,
	"March":3,
	"April":4,
	"May":5,
	"June":6,
	"July":7,
	"August":8,
	"September":9,
	"October":10,
	"November":11,
	"December":12

}

function getInputs () 
{
    var temp;

    for (name in ids) 
    {
        for(id in ids[name])
        {	
        	
        	temp = document.getElementById(ids[name][id]);
        	if(temp != null)
        	{
        		if(name=="username")
        		{
        			username = temp
        		}
	        	if(name=="firstName")
	        	{
	        		firstName = temp;

	        	}
	        	else if(name=="fullName")
	        	{
	        		fullName = temp;

	        	}
	        	else if(name=="lastName")
	        	{
	        		lastName = temp;

	        	}
	        	else if(name=="email")
	        	{
	        		email = temp;

	        	}
	        	else if(name=="addressStreet")
	        	{
	        		addressStreet = temp;

	        	}
	        	else if(name=="addressCity")
	        	{
	        		addressCity = temp;

	        	}
	        	else if(name=="addressState")
	        	{
	        		addressState = temp;

	        	}
	        	else if(name=="addressCountry")
	        	{
	        		addressCountry = temp;

	        	}
	        	else if(name=="addressZip")
	        	{
	        		addressZip = temp;

	        	}
	        	else if(name=="birthdayDay")
	        	{
	        		birthdayDay = temp;

	        	}
	        	else if(name=="birthdayMonth")
	        	{
	        		birthdayMonth = temp;

	        	}
	        	else if(name=="birthdayYear")
	        	{
	        		birthdayYear = temp;

	        	}
	        }

        }
    };
}
    chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.action == "fakeify")
			{

	    		fakeify();

	    	}
  });
    


function fakeify()
{
	chrome.storage.local.get('identity', function (result) {
    var temp = result.identity;
    for(item in temp)
    {
    	if (item =="firstName") 
    	{
    		if (firstName != undefined)
    			firstName.value = temp[item];
    	}
    	else if (item =="lastName") 
    	{
    		if (lastName != undefined)
    			lastName.value = temp[item];
    	}
    	else if (item =="fullName") 
    	{
    		if (fullName != undefined)
    			fullName.value = temp[item];
    	}
    	else if (item =="email") 
    	{
    		if (email != undefined)
    			email.value = temp[item];
    	}
    	else if (item =="username") 
    	{
    		if (username != undefined)
    			username.value = temp[item];
    	}
    	else if(item == "addressStreet")
    	{
    		if (addressStreet != undefined)
    			addressStreet.value = temp[item];
    	}
    	else if(item == "addressCity")
    	{
    		if (addressCity != undefined)
    			addressCity.value = temp[item];
    	}
    	else if(item == "addressZip")
    	{
    		if (addressZip != undefined)
    			addressZip.value = temp[item];
    	}
    	else if (item =="addressCountry") 
    	{
    		if (addressCountry != undefined)
    		{
	    		for(num in addressCountry)
	    		{
	    			if(addressCountry[num].value == "US")
	    			{
	    				addressCountry.selectedIndex = num
	    				break;
	    			}
	    		}
	    	}
    	}
    	else if (item =="birthdayMonth") 
    	{
    		if(birthdayMonth != undefined)
    		{
	    		for(num in birthdayMonth)
	    		{
	    			if(birthdayMonth[num].value == months[temp[item]])
	    			{
	    				birthdayMonth.selectedIndex = num
	    				break;
	    			}
	    		}
    		}
    	}
    	else if (item =="birthdayDay") 
    	{
    		if(birthdayDay != undefined)
    		{
	    		for(num in birthdayDay)
	    		{
	    			if(birthdayDay[num].value == temp[item])
	    			{
	    				birthdayDay.selectedIndex = num
	    				break;
	    			}
	    		}
	    	}
    	}
    	else if (item =="birthdayYear") 
    	{
    		if(birthdayYear != undefined)
    		{
	    		for(num in birthdayYear)
	    		{
	    			if(birthdayYear[num].value == temp[item])
	    			{
	    				birthdayYear.selectedIndex = num
	    				break;
	    			}
	    		}
	    	}
    	};
    }
});

}

chrome.storage.local.get('ids', function (result) {
        ids = result.ids;
        getInputs(); 
});

