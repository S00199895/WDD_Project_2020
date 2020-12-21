$(document).ready(function(){
    //**
    // Begin : all the code between Begin and End is executed on page load
    //**
      
    // set the checkout figure
    if (localStorage.getItem('checkout') == null) {  
        localStorage.setItem('checkout',0);
    }
    $("#checkout" ).html(localStorage.getItem('checkout'));

    // check if user is logged in or logged out..
    var loggedin=localStorage.getItem('loggedIn'); 

      
    if (loggedin==1) {
        // change the text from Login to Logout
        $("#loginlogout" ).html("Logout" );
        // hide User details nav item by applying bootstrap d-none which hides the nav item
        $( "#accountdetails" ).removeClass( "d-none" );   
         $( "#accountdetails" ).removeClass( "show" ); // this is put in automatically by bootstrap so we have to remove the class
      
    } else{
        // use addClass to hide the display of User Details
        $( "#accountdetails" ).addClass( "d-none" );
        // change the text from Logout to Login
        $( "#loginlogout" ).html("Login" );
        // set the href propery to point to login.html if user clicks on it
        $("#loginlogout" ).prop("href", "login.html");
    } 

        

    // this code is run everytime this js file is loaded.   
      
    /* localstroage is a javascript object that allows us to store key/value pairs 
    https://javascript.info/localstorage */
    if (localStorage.getItem('userdetails') === null) {  
        // if userdetails is null, that means it has not been loaded before. we not initialise userdetails object
        var userDetails = {firstName:"Nissa", lastName:"Revane", dob:"1993-01-01",address1:"Bala Ged", address2:"Zendikar", address3:"Zendikar"};
        // now we store the userdetails object as a localstorage object but localstore only stores text and userdetails is a javascript object
        // we convert a javascript object ot a string using JSON.stringify - we are being expedient!
        localStorage.setItem('userdetails',JSON.stringify(userDetails));
    } else {
        // if localstorage variable userdetails is already created - load it to javascript oject. JSON.parse turns it back into an javascript object
        userDetails=JSON.parse(localStorage.getItem('userdetails'));
    }

    // we only run this code if an id of udetails is on the html page we are currently on - makes the code a little bit more efficient
    // if the length > 0 it means we are on the right page - and we can populdate the form fields!!!
    if ($('#udetails').length > 0) {
        $('input[name="firstname"]').val(userDetails.firstName);         
        $('input[name="lastname"]').val(userDetails.lastName);
        $('input[name="dob"]').val(userDetails.dob);
        $('input[name="address1"]').val(userDetails.address1);
        $('input[name="address2"]').val(userDetails.address2);
        $('input[name="address3"]').val(userDetails.address3);
    }
      
    //** 
    // End : all the code abouve is executed on page load
    //**  

      
    // All code below is executed by event - e.g. form submit event, click event

    // wait for loginlogout button to be clicked - a click here means the user has chosen to logout
    $("#loginlogout").button().click(function(){
        if (loggedin==1) {
            // set the flag so that user is not logged in
            localStorage.setItem('loggedIn',0);
            window.location.href = "login.html";
        }  else 
            window.location.href = "login.html";

    });       
      
      
    // wait for submit button to be clicked on login form - this code only invoked if login form submit button clicked
    $('form[name="login"]' ).submit(function( event ) {
        var email=$('input[name="email"]').val();
        var password =$('input[name="password"]').val();
        if (email=="nissa@zendikar.com" && password=="password")  {   
            // successful login, user redirected to shop.html
            localStorage.setItem('loggedIn',1);    
            window.location.href = "shop.html";  // redirect to shop page
        }
        else {
            // login unsuccessful, error message appears
            localStorage.setItem('loggedIn',0);
            $( "#loginerror" ).addClass( "d-block" );
        }
        return false;
    });     


    // wait for submit button to be clicked on userdetails update form
    $('form[name="userdetails"]' ).submit(function( event ) {
        // if the user updates the user details - we update the userDetails javascript object
        userDetails.firstName=$('input[name="firstname"]').val();
        userDetails.lastName=$('input[name="lastname"]').val();
        userDetails.address1=$('input[name="address1"]').val(); 
        userDetails.address2=$('input[name="address2"]').val();   
        userDetails.address3=$('input[name="address3"]').val();    
        // finally we convert the javascript object to a string with JSON.stringify and save it to localstorage
        localStorage.setItem('userdetails',JSON.stringify(userDetails));
        return false;
    }); 

    // wait for submit button to be clicked on userdetails update form
    $('form[name="paymentdetails"]' ).submit(function( event ) {
        var cardnumber=$('input[name="cardnumber"]').val();
        if (cardnumber=="1234 5678 9102 3456") {
            $( "#payment-failure" ).addClass( "d-none" );
            $( "#payment-success" ).removeClass( "d-none" );
            $( "#buy-button" ).addClass( "d-none" );
            var total=0;
            localStorage.setItem('checkout',0); // makes sure that when we goto another page - the total help in localstorage is zero
            $( "#checkout" ).html(total);
            localStorage.clear();
        } else {
            $( "#payment-failure" ).removeClass( "d-none" );
        }
        return false;
    }); 
      

    $(".addtocart").click(function(){
        var total=localStorage.getItem('checkout');
        total++;
        localStorage.setItem('checkout',total);
        $("#checkout" ).html(total );
    });
    
    
    
}); 

  var totalCheckout = (localStorage.setItem("total", 0));

function AddProduct1() {
        localStorage.setItem("product1Called", "true");
        localStorage.setItem('title1', 'Core 2021 Boosters');
        localStorage.setItem('price1', 3.99);
        localStorage.setItem("total", totalCheckout+4);
    }

function AddProduct2() {
        localStorage.setItem("product2Called", "true");
        localStorage.setItem('title2', 'Final Adventure Challenger Deck');
        localStorage.setItem('price2', 24.99);
        localStorage.setItem("total", totalCheckout+25);

    }
function AddProduct3() {
        localStorage.setItem("product3Called", "true");
        localStorage.setItem('title3', 'Timeless Wisdom');
        localStorage.setItem('price3', 40.00);
        localStorage.setItem("total", totalCheckout+40);
    }

function ShowBasket() {
    var itemDets = document.createElement('p');
    itemDets.classList.add('text-white');
    itemDets.innerText = 'Total : ' + parseInt(localStorage.getItem("total"));
    if (localStorage.getItem("product1Called") == "true")
        {
            var itemsContainer = document.getElementById('itemsContainer');
        
            itemsContainer.appendChild(itemDets);
            itemDets.innerText += '\n' +  localStorage.getItem('title1');
            itemDets.innerText += ' -  €' + localStorage.getItem('price1');
        }
    if (localStorage.getItem("product2Called") == "true")
        {
            itemDets.innerText += '\n' + localStorage.getItem('title2');
            itemDets.innerText += ' -  €' + localStorage.getItem('price2');
        }
    if (localStorage.getItem("product3Called") == "true")
        {
            itemDets.innerText += '\n' + localStorage.getItem('title3');
            itemDets.innerText += ' -  €' + localStorage.getItem('price3');
        }
}

function showMessage() {
    var alert = document.getElementById('alertSent');
    alert.classList.remove('d-none');
    alert.classList.add('d-block');
}