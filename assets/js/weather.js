var urlFcc ;	//Url to get weather condition.
var city;       //Address of the request.
var tempratureC;	//Weather temprature(C) at that locations.
var tempratureF;	//Weather temprature(F) at that locations.
var unit;		//feranhitte or celcious
var main;		//Main weather condition.
var conditions; //Weather conditions.
var latitude;   //location latitude.
var longitude;	//location longitude.
var imgSrc;		//var to store img url.

//Get latitude and longitude.
navigator.geolocation.getCurrentPosition(function(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	urlFcc = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;

	console.log(latitude,longitude,"geo");

	contain();
});

//To Get the themprature in fahrenheit
function convertToF()
{
	tempratureF = (tempratureC)*(9/5) + 32;
	tempratureF = tempratureF.toFixed(1);
}


//To set the weather icon on the page
function setIcon()
{
	var date = new Date();
	var hour = date.getHours();

	$icon = $("#icon i");

	if((main.indexOf("Clear") !== -1) && (hour >= 6))
		$icon.attr("class","fa fa-sun-o");

	else if((main.indexOf("Clear") !== -1) && (hour < 6))
		$icon.attr("class","fa fa-moon-o");

	else if ( (main.indexOf("Clouds") !== -1) || (main.indexOf("Haze") !== -1)) 
		$icon.attr("class","fa fa-cloud");

	else if(main.indexOf("Rain") !== -1)
		$icon.attr("class","fa fa-umbrella");

	else if(main.indexOf("Snow") !== -1)
		$icon.attr("class","fa fa-snowflake-o");

	else if(main.indexOf("Thunderstorm") !== -1)
		$icon.attr("class","fa fa-bolt");

	else
		$icon.parent().html('<img src="' + imgSrc + '">');


}




function contain() 
{
	//Get weather conditions.
	var d1 = $.getJSON(urlFcc, function(data){
		
		unit = "C";
		tempratureC = data.main.temp;
		main = data.weather[0].main;
		conditions = data.weather[0].description;
		imgSrc = data.weather[0].icon;
		city = data.name + ", " + data.sys.country;

		convertToF();

		console.log(data.name,data.sys.country);

	});


	//Execute when AJAX requests completes
	$.when(d1).done(function(v1){

		$("#location h3").text(city);
		$("#temprature h2").text(tempratureC);
		$("#inner").text(unit);
		$("sup").text("o");
		$("#description h3").text(conditions);
		setIcon();

		//Toggle b/w F/C
		$("#unit").click(function(){
			

			if(unit === "C")
			{
				unit = "F";
				$("#temprature h2").text(tempratureF );
				$("#inner").text(unit);
			}
			else
			{	
				unit = "C";
				$("#temprature h2").text(tempratureC );
				$("#inner").text(unit);
			}
		});
	});

}




