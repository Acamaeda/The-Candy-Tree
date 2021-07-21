addLayer("i", {
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { 
        return {
            unlocked: true,
		    points: new Decimal(0),
        }
    },
    color: "#226b80",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "illions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {
        return player.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone("g", 11)) mult = mult.times(Math.sqrt(Math.log2(player.points + 3)))
        if (hasUpgrade(this.layer, 21)) mult = mult.times(upgradeEffect(this.layer, 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "i", 
            description: "I: Reset for illions", 
            onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return true
    },
    upgrades: {
	    11: {
		    title: "More Points",
            description: "Triple your point gain.",
            cost: new Decimal(1),
            effect() {
                let effect = new Decimal(3)
                if (hasUpgrade("g", 11)) effect = effect.times(1.5)
                return effect
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
	    },
	    12: {
		    title: "More and More Points",
            description: "Cube your point gain.",
            cost: new Decimal(5)
	    },
	    13: {
		    title: "More and More Points Again?",
            description: "Square your point gain.",
            cost: new Decimal(20)
	    },
        14: {
            title: "Advanced Illions",
            description: "Boost your point gain based on points.",
            cost: new Decimal(100),
            effect() {
                return Math.sqrt(Math.sqrt(Math.sqrt(player.points))) + 1
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            },
            unlocked() {
                return hasMilestone("g", 1)
            }
        },
        21: {
            title: "Too Much Illions!",
            description: "Boost your illion gain based on illions.",
            cost: new Decimal(250),
            effect() {
                return Math.sqrt(Math.sqrt(Math.sqrt(player[this.layer].points))) + 1
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            },
            unlocked() {
                return hasMilestone("g", 1)
            }
        },
        22: {
            title: "Unlock the New Layers!",
            description: "Unlock a new layer.",
            cost: new Decimal(1000),
            unlocked() {
                return hasUpgrade("g", 12)
            }
        }
    },
    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone("g", 1) && resettingLayer == "g") keep.push("upgrades")
        if (hasMilestone("g", 1) && resettingLayer == "gb") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("i", keep)
    }
})

addLayer("g", {
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["i"],
    startData() { 
        return {
            unlocked: layers.i.points >= 32,
		    points: new Decimal(0),
        }
    },
    color: "#1291b5",
    requires: new Decimal(32), // Can be a function that takes requirement increases into account
    resource: "types of googol", // Name of prestige currency
    baseResource: "illions", // Name of resource prestige is based on
    baseAmount() {
        return player.i.points
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1,
    base: new Decimal(10),
    roundUpCost: true,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "g", 
            description: "G: Reset for types of googol", 
            onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return true
    },
    upgrades: {
        11: {
            title: "Googolteen",
            description: "Multiply the I layer first upgrade effect by 1.5.",
            cost: new Decimal(2)
        },
        12: {
            title: "Googolbell",
            description: "Unlock 1 new I layer upgrade.",
            cost: new Decimal(3)
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 type of googol (Googol)",
            effectDescription: "Boost your point gain based on illions.",
            done() { return player.g.points.gte(1) }
        },
	    1: {
            requirementDescription: "2 types of googol (Googolchime)",
            effectDescription: "Boost your illion gain based on points, your upgrades doesn't reset when prestige and unlock 2 more I layer upgrades!",
            done() { return player.g.points.gte(2) }
        },
	    2: {
            requirementDescription: "3 types of googol (Googoltoll)",
            effectDescription: "Nothing currently.",
            done() { return player.g.points.gte(3) }
        },
	    3: {
            requirementDescription: "4 types of googol (Googolgong)",
            effectDescription: "Nothing currently.",
            done() { return player.g.points.gte(4) }
        }
    }
})

addLayer("gb", {
    symbol: "GB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["i"],
    startData() { 
        return {
            unlocked: layers.i.points >= 32,
		    points: new Decimal(0),
        }
    },
    color: "#15B76C",
    requires: new Decimal(32), // Can be a function that takes requirement increases into account
    resource: "googolbangs", // Name of prestige currency
    baseResource: "illions", // Name of resource prestige is based on
    baseAmount() {
        return player.i.points
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5,
    base: new Decimal(10),
    roundUpCost: true,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(0.5)
        if (hasUpgrade(this.layer, 11)) exp = exp.times(upgradeEffect(this.layer, 11))
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "G", 
            description: "Shift+G: Reset for googolbangs", 
            onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return hasUpgrade("i", 22)
    },
    effect() {
        return Math.sqrt(player.gb.points.add(1))
    },
    effectDescription() {
        return "which boosts point production by " + format(tmp.gb.effect) + "x"
    },
    upgrades: {
        11: {
            title: "Cost Divider",
            description: "Divides googolbang cost based on your points.",
            cost: new Decimal(10),
            effect() {
                return Math.sqrt(Math.sqrt(Math.sqrt(Math.sqrt(Math.sqrt(Math.log2(player.points + 3))))))
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"
            }
        }
    }
})

addLayer("m", {
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["g", "gb"],
    startData() { 
        return {
            unlocked: layers.g.points >= 4,
		    points: new Decimal(0),
        }
    },
    color: "#7B97CD",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
    resource: "maximusmillions", // Name of prestige currency
    baseResource: "types of googols", // Name of resource prestige is based on
    baseAmount() {
        return player.g.points
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1,
    base: new Decimal(2),
    roundUpCost: true,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "m", 
            description: "M: Reset for maximusmillions", 
            onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown(){
        return true
    },
    effect() {
        return player.m.points.add(1).times(2)
    },
    effectDescription() {
        return "which boosts point production by " + format(tmp.m.effect) + "x"
    },
    buyables: {}
})