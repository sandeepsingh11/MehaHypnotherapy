$(document).ready(function() {
	console.log("start doc");
	
		

	// THESE 'GET CONTENT' FUNCTIONS HAVE TO BE IN DOC.READY AS IT FIRES BEFORE CONTENT IS LOADED
	
	// get navigation / banner and footer content
	// nav & banner
	var banner = $('#banner');
	$.get('../html/banner.html', function(content) {
		console.log("loading banner");
		banner.html(content);
		console.log("now binding click");

		// function navClick()
		var bars = $('#bars');
		bars.click(function() {
			// navigation functionality
			
			// show / hide the nav menu when the dashes / X is clicked on
			var navContainer = document.getElementById("navContainer");
			navContainer.classList.toggle("change");
			
			// nav container dropdown
			var nav = document.getElementById("nav");
			if (nav.style.display == "block") {
				// hide navbar
				nav.style.display = "none";
				navContainer.style.backgroundColor = "transparent";
			}
			else {
				// show navbar
				nav.style.display = "block";
				navContainer.style.backgroundColor = "#FCFBE3";
			}

			// get coordinates for "Services" nav element and set postion of "subNav"
			var rect = nav.children[2].getBoundingClientRect();
			var subNav = document.getElementById("subNav");
			subNav.style.left = rect.left + "px";
			subNav.style.top = (rect.height + rect.top) + "px";

			// services dropdown (both for services and the subNav)
			nav.children[2].onmouseenter = function() {
				document.getElementById("subNav").style.display = "block";
			}
			nav.children[2].onmouseleave = function() {
				document.getElementById("subNav").style.display = "none";
			}
			subNav.onmouseenter = function() {
				document.getElementById("subNav").style.display = "block";
			}
			subNav.onmouseleave = function() {
				document.getElementById("subNav").style.display = "none";
			}
		})

		// get path to set 'active' nav
		var path = document.location.pathname;
		switch(path) {
			case '/':
			console.log(nav.children[0]);
			nav.children[0].addClass('active');
			break;
			
		}
	})

	// footer
	var footer = $('#footer');	
	$.get('../html/footer.html', function(content) {
		console.log("loading footer");
		footer.html(content);
	})




	$.post('/getstate', function(res, status)
	{
		//get username and logged in status
		userInfo.username = res.username;
		userInfo.loggedin = res.loggedin;
		
		//turn log in to log out if logged in
		if(userInfo.loggedin)
		{
			//$("#loginbutton").text("Log out");
			$("#loginbutton").hide();
			$("#logoutbutton").show();
		}
		else
		{
			$("#logoutbutton").hide();
			$("#loginbutton").show();
		}
	}).fail(function()
	{
		// alert("Something went wrong??");
	});

	let userInfo =
	{
		username: "",
		loggedin: false
	}

	function logout()
	{
		$.post("/logout", function (res, status) {
		  window.location.replace('/login');
	     }).fail(function () {
	          alert("Something went wrong??");
	     })
	}
	



	console.log("done with doc");
})

// window.addEventListener("load", function() {
// 	console.log("start window");


	

// 	console.log("done with window");
// });
