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
        } else
        {
            backgroundOption = false;
            clearInterval( backgroundInterval );
        }
    } );
} );


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



