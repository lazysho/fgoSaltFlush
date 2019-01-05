
// GLOABALS
var alertOut = false;
var bgNo;

// FUCTIONS

function summon(noOfRolls) {
    var banner = document.getElementById('banner').value;
    console.log(banner + " " + noOfRolls) // for debugging

    // if no banner is selected, don't proceed
    if(banner=="none") {
        if(alertOut == false) {
            // remove alert as a child of alertSpace
            var alertSpace = document.getElementById('alertSpace');
            while(alertSpace.firstChild) {
                alertSpace.removeChild(alertSpace.firstChild)
            }

            // to avoid multiple alerts
            alertOut = true;

            // create alert div
            var error = '<strong> Too excited, Master. </strong>' +
                        'Please choose a banner to summon from first!';
            
            createElement('div', 'alert', 'w-75 alert alert-danger fade mx-auto',
                error, 'child', 'alertSpace');
            
            // show alert
            $('#alert').addClass('animated fadeInDown');

            // auto close
            $('#alert').fadeTo(1500, 250).slideUp(500, function () {
                $('#alert').slideUp(250);
                alertOut = false;

                // remove alert as a child of alertSpace
                var alertSpace = document.getElementById('alertSpace');
                while(alertSpace.firstChild) {
                    alertSpace.removeChild(alertSpace.firstChild)
                }
                });
        }
        return;
    }

    // create query string to pass values to another page
    var query = "?banner=" + banner + "&noOfRolls=" + noOfRolls + "&bgNo=" + bgNo;
    // redirect to next page
    window.location.href = "pages/summon.html" + query;
}

function createElement(type, id, className, content, hierarchy, parent) 
{
    var element = document.createElement(type);
	element.setAttribute('id', id);
	element.setAttribute('class', className);
	element.innerHTML = content;

	if(hierarchy=='parent') // if element is parent, append straight
		document.body.appendChild(element);
	else if(hierarchy=='child') // if not, append to parent
		document.getElementById(parent).appendChild(element);
}

function randomBackground() {
    bgNo = Math.floor(Math.random() * 8) + 1;
    var bgUrl = "url('assets/images/bg/BG_" + bgNo + ".png')";

    console.log(bgUrl);
    $('body').css('background-image', bgUrl);

    // if background is to dark, lighten text
    var darkbgs = [3, 5, 8];
    if(darkbgs.includes(bgNo)) {
        lightenTexts(bgNo);
        console.log("Changing text color...");
    }
}

function lightenTexts(bgNo) {
    // bg 3 has a light part near these divs
    if(bgNo != 3) {
        $('#master-msg-title').css('color', '#fff');
        $('#master-msg').css('color', '#fff');
    }

    // disclaimer
    $('#disclaimer').css('color', '#fff');
}

function autoOverflow() {
    $('body').css('overflow', 'auto');
}

function resizeBtnGroup() {
    var width = window.screen.width;
    console.log("Screen Size: " + width);

    if(width <= 375) {
        $('#menu').addClass('w-75');
        $('#menu').addClass('btn-group-vertical');
        $('#menu').addClass('btn-block');
        $('#menu').removeClass('float-right');
        


        if(bgNo == 3) {
            $('#master-msg-title').css('color', '#fff');
            $('#master-msg').css('color', '#fff');
        }
    }
}

function goToGithub() {
    window.location.href = "https://github.com/lazysho/fgoSaltFlush/blob/master/README.md";
}

function hideBannerInfos() {
        // auto close
        $('#bannerInfo').fadeTo(1000, 500).slideUp(1000, function () {
            $('#bannerInfo').slideUp(500);
            alertOut = false;

            // remove alert as a child of alertSpace
            var alertSpace = document.getElementById('alertSpace');
            while(alertSpace.firstChild) {
                alertSpace.removeChild(alertSpace.firstChild)
            }

            console.log("Closing alert...")
        });
}

// ROOT
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    randomBackground();
    setTimeout(autoOverflow, 2000);
    resizeBtnGroup();
});