//Check If There IS Local Storage Color Option
let mainColors = localStorage.getItem( "color_option" );
if ( mainColors !== null )
{
    //Set Color On Root
    document.documentElement.style.setProperty( '--main-color', mainColors );

    //Remove Active Class From All Childrens 
    document.querySelectorAll( ".colors-list li" ).forEach( element =>
    {
        element.classList.remove( "active" );
        if ( element.dataset.color === mainColors )
        {
            element.classList.add( "active" );
        }
    } );
}

//Random Background Option
let backgroundOption = true;

//Variable To Control The Background Interval 
let backgroundInterval;

//check If there is  LocalStorage Random background Item
let backgroundLocalItem = localStorage.getItem( "background_option" );

//check if radom background local storage not empty
if ( backgroundLocalItem !== null )
{
    if ( backgroundLocalItem === 'true' )
    {
        backgroundOption = true;
    } else
    {
        backgroundOption = false;
    }
    //Remove Active Class From All Spans 
    document.querySelectorAll( ".random-backgrounds span" ).forEach( element =>
    {
        element.classList.remove( "active" );
    } );

    if ( backgroundOption === true )
    {
        document.querySelector( ".random-backgrounds .yes" ).classList.add( "active" );
    } else
    {
        document.querySelector( ".random-backgrounds .no" ).classList.add( "active" );
    }


}

//Toggle Spin Class On Icon 
document.querySelector( ".setting-icon .fa-cog" ).onclick = function ()
{
    //Toggle Class Fa-spin For Rotation On Self
    this.classList.toggle( "fa-spin" );
    //Toggle Class Open On Main Settings Box
    document.querySelector( ".settings-box" ).classList.toggle( "open" );
};

//Switch Colors
const colorsLi = document.querySelectorAll( ".colors-list li" );
//Loop On List Items
colorsLi.forEach( li =>
{
    //Click On Every List Items
    li.addEventListener( "click", ( e ) =>
    {
        //Set Color On Root
        document.documentElement.style.setProperty( '--main-color', e.target.dataset.color );
        //Set Color On Local Storage
        localStorage.setItem( "color_option", e.target.dataset.color );
        //Remove Active Class From All Childrens 
        e.target.parentElement.querySelectorAll( ".active" ).forEach( element =>
        {
            element.classList.remove( "active" );
        } );
        //Add Active Class For Target Element
        e.target.classList.add( "active" );
    } );
} );


//Switch Random Background Option
const randomBackEl = document.querySelectorAll( ".random-backgrounds span" );
//Loop On All Spans
randomBackEl.forEach( span =>
{
    //Click On Every Span
    span.addEventListener( "click", ( e ) =>
    {

        //Remove Active Class From All Childrens 
        e.target.parentElement.querySelectorAll( ".active" ).forEach( element =>
        {
            element.classList.remove( "active" );
        } );
        //Add Active Class For Target Element
        e.target.classList.add( "active" );

        if ( e.target.dataset.background === "yes" )
        {
            backgroundOption = true;
            randomizeImgs();

            //Add background Option To Local Storage
            localStorage.setItem( "background_option", true );
        } else
        {
            backgroundOption = false;
            clearInterval( backgroundInterval );
            //Add background Option To Local Storage
            localStorage.setItem( "background_option", false );

        }
    } );
} );
randomizeImgs();

//Select Landing Page Element

let landingPage = document.querySelector( ".landing-page" );

//Get Array Of Images

let imgsArray = [ "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg" ];


//Function To Randomize Imgs 
function randomizeImgs ()
{
    if ( backgroundOption === true )
    {
        backgroundInterval = setInterval( () =>
        {
            //Get Random Number
            let randomNumber = Math.floor( Math.random() * imgsArray.length );

            //Change Background Images Url 
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[ randomNumber ] + '")';
        }, 1000 );

    }
}


//Select Skills Selector
let ourSkills = document.querySelector( ".skills" );

window.onscroll = function ()
{
    //skills Offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Height 
    let windowHeight = this.innerHeight;

    //window scrollTop
    let windowScrollTop = this.pageYOffset;

    if ( windowScrollTop > ( ( skillsOffsetTop + skillsOuterHeight ) - windowHeight ) )
    {
        let allSkills = document.querySelectorAll( ".skill-box .skill-progress span" );
        allSkills.forEach( skill =>
        {
            skill.style.width = skill.dataset.progress;
        } );
    }
};

//Create Popup With The Image

let ourGallery = document.querySelectorAll( ".gallery .images-box img" );

ourGallery.forEach( img =>
{
    img.addEventListener( 'click', ( e ) =>
    {
        //create Overlay Element 
        let overlay = document.createElement( "div" );
        //Add Class To Overlay
        overlay.classList.add( "popup-overlay" );
        //Append  Overlay To body
        document.body.appendChild( overlay );
        //Create Popup
        let popupBox = document.createElement( "div" );
        //Add Class To Popup Box 
        popupBox.className = "popup-box";

        if ( img.alt !== null )
        {
            //create Heading
            let imgHeading = document.createElement( "h3" );
            //Create Text For Heading 
            let imgText = document.createTextNode( img.alt );
            //Append Text To The Heading 
            imgHeading.appendChild( imgText );
            //Append The Heading To Popup Box
            popupBox.appendChild( imgHeading );
        }

        //Create The Img 
        let popupImage = document.createElement( "img" );
        //Set Img Source 
        popupImage.src = img.src;
        //Add Img To Popup Box 
        popupBox.appendChild( popupImage );
        document.body.appendChild( popupBox );

        //Create The Close Span 
        let closeButton = document.createElement( "span" );
        //Create The Close Button Text 
        let closeButtonText = document.createTextNode( "X" );
        //Append Text To Close Button 
        closeButton.appendChild( closeButtonText );
        //Add Class To Close Button 
        closeButton.className = "close-button";
        //Add Close Button To Popup Box 
        popupBox.appendChild( closeButton );

    } );
} );

//Close Popup 
document.addEventListener( "click", function ( e )
{
    if ( e.target.className === "close-button" )
    {
        //Remove The Current Popup
        e.target.parentElement.remove();
        //Remove The Overlay
        document.querySelector( ".popup-overlay" ).remove();
    }

} );

