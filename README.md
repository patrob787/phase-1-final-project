# phase-1-final-project

# Be Your Own Bartender (a.k.a. BYOB)

“Be Your Own Bartender” or “BYOB, is a page designed to be a fun and interactive way to educate people on the craft of making classic cocktails.  If I know little about cocktails, this should be a fun way to experiment with a variety of ingredients to learn about classic cocktails.  Could be a useful resource to get suggestions for parties or something new to try if you are out at a bar.  The structure of the page is divided into three sections: "The Well", "The Shaker" and "The Bar-top".

Upon loading, the DOM will have three prompts to choose from in the well on the left:
	-Start Mixing
	-Search for a bevy
	-Suprise me!

## Start Mixing

This is the main interactive part of the app.  Clicking this button will 5 draggable base liquors to the Well using JavaScript: Vodka, Gin, Rum, Whiskey and Tequila.  When you drag a base liquor to the Shaker and drop it, the liquor will stay in the shaker while JavaScript re-renders the well to give you a new selection of draggable mixers.  You can drag up to 2 mixers into the shaker.  Once you have dragged your ingredients, you can click on the SHAKE button below the Shaker.  This will render a drink card associated with these ingredients to the Bar-Top.  This card will include the name of the beverage, an image, ingredients and a short description.  For instance, if you select Vodka, Cranberry and Triple Sec, JavaScript will render a card to the Bar top for a Cosmopolitan.  Once this is done, the well will reset.

## Search for a Bevy

When you click the SEARCH button, a form will open on the well allowing you to type in the name of a cocktail you are trying to learn about.  Pressing submit will render that beverage card to the Bar top.  The clear button will clear the form and the bar top, allowing you to start over.

## Suprise Me!

Don’t feel like mixing or trying to type out Cosmopolitan?  Surprise me Bartender!!  A random beverage card will be selected and rendered to the “Bar top” for you.  CHEERS!

## Countdown to Happy Hour

Stuck at work and looking forward to that post shift libation?  There is a countdown clock to 5pm located conveneiently at the bottom of the page.  Rendered using a new Date() function that will fast forard 24 hours automatically if it is already after 5pm.

## Possible Future Additions:
-Create a cocktail Section - adding a form that would allow you to be your own mixologist and upload you own creation to the database.

-Refined Search function - ability to search by keyword or ingredient, with suggestions appearing no matter what you type in the search bar.

-“My list” or “Happy Hour” or something that will “save” your created drinks or drinks you like to revisit somewhere on the page.

-Animation on the shaker before displaying the beverage.