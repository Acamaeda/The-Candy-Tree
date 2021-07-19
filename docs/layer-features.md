# Layer Features

This is a more comprehensive list of established features to add to layers. You can add more freely, if you want to have other functions or values associated with your layer. These have special functionality, though.

You can make almost any value dynamic by using a function in its place, including all display strings and styling/color features.

## Layer Definition features

- layer: **assigned automagically**. It's the same value as the name of this layer, so you can do `player[this.layer].points` or similar to access the saved value. It makes copying code to new layers easier. It is also assigned to all upgrades and buyables and such.

- name: **optional**. used in reset confirmations (and the default infobox title). If absent, it just uses the layer's id.

- startData(): A function to return the default save data for this layer. Add any variables you have to it. Make sure to use `Decimal` values rather than normal numbers.

    Standard values:
        - Required:
            - unlocked: a bool determining if this layer is unlocked or not
            - points: a Decimal, the main currency for the layer
        - Optional:
            - total: A Decimal, tracks total amount of main prestige currency. Always tracked, but only shown if you add it here.
            - best: A Decimal, tracks highest amount of main prestige currency. Always tracked, but only shown if you add it here.
            - unlockOrder: used to keep track of relevant layers unlocked before this one.
            - resetTime: A number, time since this layer was last prestiged (or reset by another layer)

- color: A color associated with this layer, used in many places. (A string in hex format with a #)

- row: The row of the layer, starting at 0. This affects where the node appears on the standard tree, and which resets affect the layer.

    Using "side" instead of a number will cause the layer to appear off to the side as a smaller node (useful for achievements and statistics). Side layers are not affected by resets unless you add a doReset to them.

- displayRow: **OVERRIDE** Changes where the layer node appears without changing where it is in the reset order.

- resource: Name of the main currency you gain by resetting on this layer.

- effect(): **optional**. A function that calculates and returns the current values of any bonuses inherent to the main currency. Can return a value or an object containing multiple values. *You will also have to implement the effect where it is applied.*

- effectDescription: **optional**. A function that returns a description of this effect. If the text stays constant, it can just be a string.

- layerShown(): **optional**, A function returning a bool which determines if this layer's node should be visible on the tree. It can also return "ghost", which will hide the layer, but its node will still take up space in the tree.
    Defaults to true.

- hotkeys: **optional**. An array containing information on any hotkeys associated with this layer:

    ```js
    hotkeys: [
        {
            key: "p", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "p: reset your points for prestige points", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.p.unlocked) doReset("p") },
            unlocked() {return hasMilestone('p', 3)} // Determines if you can use the hotkey, optional
        }
    ]
    ```

- style: **optional**. a "CSS object" where the keys are CSS attributes, containing any CSS that should affect this layer's entire tab.

- tabFormat: **optional**. use this if you want to add extra things to your tab or change the layout. [See here for more info.](custom-tab-layouts.md)

- midsection: **optional**, an alternative to `tabFormat`, which is inserted in between Milestones and Buyables in the standard tab layout. (cannot do subtabs)

## Big features (all optional)

- upgrades: A set of one-time purchases which can have unique upgrade conditions, currency costs, and bonuses. [See here for more info.](upgrades.md)

- milestones: A list of bonuses gained upon reaching certain thresholds of a resource. Often used for automation/QOL. [See here for more info.](milestones.md)

- challenges: The player can enter challenges, which make the game harder. If they reach a goal and beat the challenge, they recieve a bonus. [See here for more info.](challenges.md)

- buyables: Effectively upgrades that can be bought multiple times, and are optionally respeccable. Many uses. [See here for more info.](buyables.md)

- clickables: Extremely versatile and generalized buttons which can only be clicked sometimes. [See here for more info.](clickables.md)

- microtabs: An area that functions like a set of subtabs, with buttons at the top changing the content within. (Advanced) [See here for more info.](subtabs-and-microtabs.md)

- bars: Display some information as a progress bar, gague, or similar. They are highly customizable, and can be vertical as well. [See here for more info.](bars.md)

- achievements: Kind of like milestones, but with a different display style and some other differences. Extra features are on the way at a later date! [See here for more info.](achievements.md)

- achievementPopups, milestonePopups: **optional**, If false, disables popup message when you get the achievement/milestone. True by default.

- infoboxes: Displays some text in a box that can be shown or hidden. [See here for more info.](infoboxes.md)

- grid: A grid of buttons that behave the same, but have their own data.[See here for more info.](grids.md)

## Prestige formula features

- type: **optional**. Determines which prestige formula you use. Defaults to "none".

    - "normal": The amount of currency you gain is independent of its current amount (like Prestige). The formula before bonuses is based on `baseResource^exponent`
    - "static": The cost is dependent on your total after reset. The formula before bonuses is based on `base^(x^exponent)`
    - "custom": You can define everything, from the calculations to the text on the button, yourself. (See more at the bottom)
    - "none": This layer does not prestige, and therefore does not need any of the other features in this section.

- baseResource: The name of the resource that determines how much of the main currency you gain on reset.

- baseAmount(): A function that gets the current value of the base resource.

- requires: A Decimal, the amount of the base needed to gain 1 of the prestige currency. Also the amount required to unlock the layer. You can instead make this a function, to make it harder if another layer was unlocked first (based on unlockOrder).

- exponent: Used as described above.

- base: **sometimes required**. required for "static" layers, used as described above. If absent, defaults to 2. Must be greater than 1.

- roundUpCost: **optional**. a bool, which is true if the resource cost needs to be rounded up. (use if the base resource is a "static" currency.)

- gainMult(), gainExp(): **optional**. For normal layers, these functions calculate the multiplier and exponent on resource gain from upgrades and boosts and such. Plug in most bonuses here.
    For static layers, they instead multiply and roots the cost of the resource. (So to make a boost you want to make gainMult smaller and gainExp larger.)

- directMult(): **optional**. Directly multiplies the resource gain, after exponents and softcaps. For static layers, actually multiplies resource gain instead of reducing the cost.

- softcap, softcapPower: **optional**. For normal layers, gain beyond [softcap] points is put to the [softcapPower]th power
    Default for softcap is e1e7, and for power is 0.5.

## Other prestige-related features

- canBuyMax(): **sometimes required**. required for static layers, function used to determine if buying max is permitted.

- onPrestige(gain): **optional**. A function that triggers when this layer prestiges, just before you gain the currency.  Can be used to have secondary resource gain on prestige, or to recalculate things or whatnot.

- resetDescription: **optional**. Use this to replace "Reset for " on the Prestige button with something else.

- prestigeButtonText(): **sometimes required**. Use this to make the entirety of the text a Prestige button contains. Only required for custom layers, but usable by all types.

- passiveGeneration(): **optional**, returns a regular number. You automatically generate your gain times this number every second (does nothing if absent)
        This is good for automating Normal layers.

- autoPrestige(): **optional**, returns a boolean, if true, the layer will always automatically do a prestige if it can.
        This is good for automating Static layers.

## Tree/node features

- symbol: **optional**. The text that appears on this layer's node. Default is the layer id with the first letter capitalized.

- image: **override**. The url (local or global) of an image that goes on the node. (Overrides symbol)

- position: **optional**. Determines the horizontal position of the layer in its row in a standard tree. By default, it uses the layer id, and layers are sorted in alphabetical order.

- branches: **optional**. An array of layer/node ids. On a tree, a line will appear from this layer to all of the layers in the list. Alternatively, an entry in the array can be a 2-element array consisting of the layer id and a color value. The color value can either be a string with a hex color code, or a number from 1-3 (theme-affected colors). A third element in the array optionally specifies line width.

- nodeStyle: **optional**. A CSS object, where the keys are CSS attributes, which styles this layer's node on the tree.

- tooltip() / tooltipLocked(): **optional**. Functions that return text, which is the tooltip for the node when the layer is unlocked or locked, respectively. By default the tooltips behave the same as in the original Prestige Tree.
    If the value is "", the tooltip will be disabled.

- marked: **optional** Adds a mark to the corner of the node. If it's "true" it will be a star, but it can also be an image URL.

## Other features

- doReset(resettingLayer): **optional**. Is triggered when a layer on a row greater than or equal to this one does a reset. The default behavior is to reset everything on the row, but only if it was triggered by a layer in a higher row. `doReset` is always called for side layers, but for these the default behavior is to reset nothing.
                
    If you want to keep things, determine what to keep based on `resettingLayer`, `milestones`, and such, then call `layerDataReset(layer, keep)`, where `layer` is this layer, and `keep` is an array of the names of things to keep. It can include things like "points", "best", "total" (for this layer's prestige currency), "upgrades",  any unique variables like "generatorPower", etc. If you want to only keep specific upgrades or something like that, save them in a separate variable, then call `layerDataReset`, and then set `player[this.layer].upgrades` to the saved upgrades.

- update(diff): **optional**. This function is called every game tick. Use it for any passive resource production or time-based things. `diff` is the time since the last tick. 

- autoUpgrade: **optional**, a boolean value, if true, the game will attempt to buy this layer's upgrades every tick. Defaults to false.

- automate(): **optional**. This function is called every game tick, after production. Use it to activate automation things that aren't otherwise supported. 

- resetsNothing: **optional**. Returns true if this layer shouldn't trigger any resets when you prestige.

- increaseUnlockOrder: **optional**. An array of layer ids. When this layer is unlocked for the first time, the `unlockOrder` value for any not-yet-unlocked layers in this list increases. This can be used to make them harder to unlock.

- shouldNotify: **optional**. A function to return true if this layer should be highlighted in the tree. The layer will automatically be highlighted if you can buy an upgrade whether you have this or not.

- glowColor: **optional**. The color that this layer will be highlighted if it should notify. The default is red. You can use this if you want several different notification types!

- componentStyles: **optional**. An object that contains a set of functions returning CSS objects. Each of these will be applied to any components on the layer with the type of its id. Example:

```js
componentStyles: {
    "challenge"() { return {'height': '200px'} },
    "prestige-button"() { return {'color': '#AA66AA'} }
}
```

- leftTab: **optional**, if true, this layer will use the left tab instead of the right tab.

- previousTab: **optional**, a layer's id. If a layer has a previousTab, the layer will always have a back arrow and pressing the back arrow on this layer will take you to the layer with this id. 

- deactivated: **optional**, if this is true, hasUpgrade, hasChallenge, hasAchievement, and hasMilestone will return false for things in the layer, and you will be unable to buy or click things, or gain achievements/milestones on the layer. You will have to disable effects of buyables, the innate layer effect, and possibly other things yourself.

- paused: **optional**, if this is true, all layer functionality will be frozen, and you will be unable to buy or sell things, or gain achievements/milestones on the layer. All data, upgrades, and effects will remain unchanged, and any functions other than "paused" will not be called as part of the update loop. Visual components, however, will still be updated as long as the layer is being viewed, and any toggles or miscellaneous buttons will remain active.

## Custom Prestige type  
(All of these can also be used by other prestige types)

- getResetGain(): **mostly for custom prestige type**. Returns how many points you should get if you reset now. You can call `getResetGain(this.layer, useType = "static")` or similar to calculate what your gain would be under another prestige type (provided you have all of the required features in the layer).

- getNextAt(canMax=false): **mostly for custom prestige type**. Returns how many of the base currency you need to get to the next point. `canMax` is an optional variable used with Static-ish layers to differentiate between if it's looking for the first point you can reset at, or the requirement for any gain at all (Supporting both is good). You can also call `getNextAt(this.layer, canMax=false, useType = "static")` or similar to calculate what your next at would be under another prestige type (provided you have all of the required features in the layer).

- canReset(): **mostly for custom prestige type**. Return true only if you have the resources required to do a prestige here.

- prestigeNotify(): **mostly for custom prestige types**, returns true if this layer should be subtly highlighted to indicate you
        can prestige for a meaningful gain.