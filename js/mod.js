let modInfo = {
	name: "The Illion Tree",
	id: "mymod",
	author: "NalmTheNam",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "1 More Layer!",
}

let changelog = `
                    <h1>Changelog:</h1><br><br>
					<h3>v0.2: 1 More Layer!</h3><br>
					- Added 1 more layer.<br>
					- Endgame is now 15 types of googols.<br>
					- Added extra text in the top that shows the endgame.<br>
					- Added 1 GB layer upgrade.<br><br>
		            <h4>v0.1.4</h4>
		            <h5>- Added 2 more I layer upgrades.</h5><br><br>
                    <h5>v0.1.3.1</h5>
                    <h6>- Fixed the cost amount of G layer.</h6><br><br>
		            <h4>v0.1.3: The Googol"bang" Update</h4>
                    <h5>- Added the GB layer.<br>
                    - Added 1 more I layer upgrade.<br>
                    - Added 2 G layer upgrades.</h5><br><br>
	                <h5>v0.1.2.1: The Balancing Update</h5>
                    <h6>- Balanced the I upgrade 3.<br>
		            - Balanced the G layer first milestone.</h6><br><br>
		            <h4>v0.1.2</h4>
		            <h5>- Fixed G layer cost a bit.</h5><br><br>
                    <h4>v0.1.1: The Upgrading Update</h4>
                    <h5>- Added 2 more I layer upgrade<br>
		            - Added 4 G layer milestones.</h5><br><br>
	                <h3>v0.1: Basic Illions</h3><br>
		            - Added 2 layers.<br>
                    - Added first I layer upgrade.
                `

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1).times(tmp.gb.effect).times(tmp.m.effect)
	if (hasUpgrade('i', 11)) gain = gain.times(upgradeEffect('i', 11))
	if (hasUpgrade('i', 12)) gain = gain.cube()
	if (hasUpgrade('i', 13)) gain = gain.sqr()
	if (hasUpgrade('i', 14)) gain = gain.times(upgradeEffect('i', 14))
	if (hasMilestone("g", 0)) gain = gain.times(Math.sqrt(Math.log2(player.i.points + 3)))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = ["Current endgame: 15 types of googols"]

// Determines when the game "ends"
function isEndgame() {
	return player.g.points.gte(new Decimal(15))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
