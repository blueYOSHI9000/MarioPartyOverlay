/*
# GLOBAL EVENTS
- addAlly
- other (I guess)

## specialEvent
- poisonmushroom (move to global)

- vs (maybe - customizable)
- boobell (customizable)

# x
- misc.js popoutClosed()
- misc.js mpoSettingsPopout()
- misc.js showHideSettings()
- misc.js windowOnClick()
- misc.js prepareShortcut()
- misc.js closeSettings()
- misc.js shortcutSettings()

- slots.js loadSlot()
- saving.js saveAssist()
- boot.js var defSettings



# Types
- 'addCoins'
- 'removeCoins'
- 'addToDice' - adds to running


- 'addAlly' - opens Ally dialogue

- 'chooseEvent' - uses current game and value (type of event like lucky space) to create a simple dropdown with events to choose from
- 'specialEvent' - Special custom made event - possibly replace with several more fitting types
	- 'vs' - VS space in SMP
	- 'poisonmushroom' - SMP item
	- 'coinado' - SMP item





dont forget the star price change on smp kamek

assist.js - general stuff
assist_core.js - actually doing all the things when a button gets pressed
assist_data.js - data
assist_load_data - loads data

assistInfo.starPriceMultiplier used in: assist_buyStar
*/

var assistData = {
	mp7: {
		misc: {
			boardList: ['grandCanal', 'pagodaPeak', 'pyramidPark', 'neonHeights', 'windmillville', 'bowsersEnchantedInferno'],
			starsIcon: 'img/stars.png',
			stars: [
				{
					src: 'img/stars.png',
					name: 'defaultStar',
					stages: ['grandCanal', 'bowsersEnchantedInferno'],
					price: 20,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{
					src: 'img/stars.png',
					name: 'pagodaPeakStar',
					stages: ['pagodaPeak'],
					price: [10, 20, 30, 40],
					priceLoop: true,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{
					src: 'img/stars.png',
					name: 'pyramidParkStar',
					stages: ['pyramidPark'],
					price: 0,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				/*{
					src: 'img/stars.png',
					name: 'windmillvilleStar',
					stages: ['windmillville'],
					monopoly: true
				},*/

				{ //Treasure chests (neon heights)
					src: 'img/stars.png',
					name: 'treasureChestStar',
					stages: ['pyramidPark'],
					price: 10,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{
					src: 'img/stars.png',
					name: 'treasureChestCoins',
					stages: ['pyramidPark'],
					price: 10,
					event: {
						type: 'addCoins',
						value: 20
					}
				},
				{
					src: 'img/stars.png',
					name: 'treasureChestFail',
					stages: ['pyramidPark'],
					price: 10,
					/*event: {
						type: 'sendToStart'
					}*/
				}
			],
			secondaryDices: [ //Chain Chomps (pyramid stage)
				{
					src: 'img/stars.png',
					name: 'singleChomp',
					stages: ['pyramidPark'],
					event: {
						type: 'secondaryDice',
						value: {
							price: 10
						}
					}
				},
				{
					src: 'img/stars.png',
					name: 'doubleChomp',
					stages: ['pyramidPark'],
					event: {
						type: 'secondaryDice',
						value: {
							diceAmount: 2,
							price: 20
						}
					}
				},
				{
					src: 'img/stars.png',
					name: 'redChomp',
					stages: ['pyramidPark'],
					event: {
						type: 'secondaryDice',
						value: {
							diceAmount: 3,
							price: 10
						}
					}
				}
			],
			starStartAmount: {
				pyramidPark: 3
			}
		}
	},
	mp8: {
		misc: {
			boardList: ['dksTreetopTemple', 'goombasBootyBoardwalk', 'kingBoosHauntedHideaway', 'shyguysPerplexExpress', 'koopasTycoonTown', 'bowsersWarpedOrbit'],
			starsIcon: 'img/stars.png',
			stars: [
				{
					src: 'img/stars.png',
					name: 'defaultStar',
					stages: ['dksTreetopTemple', 'shyguysPerplexExpress'],
					price: 20,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{
					src: 'img/stars.png',
					name: 'goombaStar',
					stages: ['goombasBootyBoardwalk'],
					price: 0,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{ //dk space will give replace one star with a free one - done manually
					src: 'img/stars.png',
					name: 'kingBooStar',
					stages: ['kingBoosHauntedHideaway'],
					price: 10,
					event: {
						type: 'addStar',
						value: 1
					}
				}/*,
				{
					stages: ['koopasTycoonTown'],
					monopoly: true
				}*/
			],
			coinStartAmount: {
				default: 10
			},
			starStartAmount: {
				bowsersWarpedOrbit: 5
			}
		}
	},
	mpds: {
		misc: {
			boardList: ['wigglersGarden', 'toadettesMusicRoom', 'dksStoneStatue', 'kameksLibrary', 'bowsersPinballMachine'],
			starsIcon: 'img/stars.png',
			stars: [
				{ // Default star
					src: 'img/stars.png',
					name: 'defaultStar',
					stages: ['wigglersGarden', 'bowsersPinballMachine'],
					price: 20,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{ // Music Notes (toadette stage)
					src: 'img/assist/mpds/bluenote.png',
					name: 'blueNote',
					stages: ['toadettesMusicRoom'],
					price: 5,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{
					src: 'img/assist/mpds/greennote.png',
					name: 'greenNote',
					stages: ['toadettesMusicRoom'],
					price: 10,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{
					src: 'img/assist/mpds/yellownote.png',
					name: 'yellowNote',
					stages: ['toadettesMusicRoom'],
					price: 15,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{
					src: 'img/assist/mpds/orangenote.png',
					name: 'orangeNote',
					stages: ['toadettesMusicRoom'],
					price: 20,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{
					src: 'img/assist/mpds/rednote.png',
					name: 'redNote',
					stages: ['toadettesMusicRoom'],
					price: 30,
					event: {
						type: 'addStar',
						value: 1
					}
				},

				{ // DK star - buy multiple
					src: 'img/stars.png',
					name: 'defaultStar',
					stages: ['dksStoneStatue'],
					buyMultiple: true,
					price: 20,
					event: {
						type: 'addStar',
						value: 1
					}
				},

				{ // Magic Jars (kamek stage)
					src: 'img/assist/mpds/magicjarstar.png',
					name: 'magicJarStar',
					stages: ['kameksLibrary'],
					price: 10,
					event: {
						type: 'addStar',
						value: 1
					}
				},
				{
					src: 'img/assist/mpds/magicjarcoin.png',
					name: 'magicJarCoins',
					stages: ['kameksLibrary'],
					price: 10,
					event: {
						type: 'addCoins',
						value: 5
					}
				},
				{
					src: 'img/assist/mpds/magicjarfail.png',
					name: 'magicJarFail',
					stages: ['kameksLibrary'],
					price: 10,
					/*event: {
						type: 'sendToStart'
					}*/
				}
			],
			coinStartAmount: {
				default: 10
			}
		},
		dice: {
			default: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		},
		shopping: {
			prices: [1, 2, 3, 7, 6, 15, 20, 25]
		},
		items: {
			doubleDice: {
				src: 'img/assist/mpds/double.png',
				event: {
					type: 'multipleDice',
					value: 2
				}
			},
			tripleDice: {
				src: 'img/assist/mpds/triple.png',
				event: {
					type: 'multipleDice',
					value: 3
				}
			},
			tripleDice: {
				src: 'img/assist/mpds/half.png',
				event: {
					type: 'reduceDice',
					value: 5
				}
			},
			hex: {
				src: 'img/assist/mpds/hex.png'
			},
			other: {
				available: true
			}
		},
		spaces: {
			blue: {
				src: 'img/assist/mpds/bluespace.png',
				event: {
					type: 'addCoins',
					value: 3
				}
			},
			red: {
				src: 'img/assist/smp/redspace.png',
				event: {
					type: 'removeCoins',
					value: 3
				}
			},
			happening: {
				src: 'img/assist/smp/happeningspace.png'
			},
			friend: {
				src: 'img/assist/smp/friendspace.png',
				event: {
					type: 'specialEvent',
					value: 'friendship'
				}
			},
			duel: {
				src: 'img/assist/smp/duelspace.png',
				event: {
					type: 'specialEvent',
					value: 'duel'
				}
			},
			bowser: {
				src: 'img/assist/smp/bowserspace.png',
				event: {
					type: 'chooseEvent',
					value: 'bowser'
				}
			}
		},
		hex: {
			coin10: {
				event: {
					type: 'coins',
					value: 10
				}
			},
			coin20: {
				event: {
					type: 'coins',
					value: 20
				}
			},
			coinSwap: {
				event: {
					type: 'coins',
					value: 'swap'
				}
			},
			star1: {
				event: {
					type: 'stars',
					value: 1
				}
			},
			star2: {
				event: {
					type: 'stars',
					value: 2
				}
			},
			spaceSwap: {
			},
			coinBlock: {
				event: {
					type: 'coinBlock'
				}
			},
			starBlock: {
				event: {
					type: 'starBlock'
				}
			}
		},
		events: {
			duel: {
				options: [
					{
						name: '10 Coins',
						type: 'coins',
						value: 10
					},
					{
						name: '20 Coins',
						type: 'coins',
						value: 20
					},
					{
						name: 'Half your coins',
						type: 'coins',
						value: 'half'
					},
					{
						name: 'All your coins',
						type: 'coins',
						value: 'all'
					},
					{
						name: '1 Star',
						type: 'stars',
						value: 1
					},
					{
						name: '2 Stars',
						type: 'stars',
						value: 2
					}
				]
			},
			bowser: {
				options: [
					{
						name: 'Gimme Coins!',
						type: 'coins'
					},
					{
						name: 'Gimme Stars!',
						type: 'stars'
					},
					{
						name: 'Gimme Charity!',
						type: 'charity'
					},
					{
						name: 'Gimme Equality!',
						type: 'equality'
					}
				]
			}
		},
		minigame: {
		}
	},
	smp: {
		misc: {
			boardList: ['whompsDominoRuins', 'kingBobOmbsPowderkegMine', 'megafruitParadise', 'kameksTantalizingTower'],
			starsIcon: 'img/stars.png',
			stars: {
				src: 'img/stars.png',
				name: 'defaultStar',
				//stages: ['wigglersGarden', 'dksStoneStatue', 'bowsersPinballMachine'],
				price: 20,
				event: {
					type: 'addStar',
					value: 1
				}
			},
			coinStartAmount: {
				default: 10
			},
			steal: {
				available: true,
				canStealStars: true,
				canStealCoins: true,
				starPrice: 30,
				defaultCoinPrice: 7
			},
			allies: {
				available: true
			}
		},
		dice: {
			default:	[1, 2, 3, 4, 5, 6],

			mario:		[1, 3, 3, 3, 5, 6],
			luigi:		[1, 1, 1, 5, 6, 7],
			peach:		[0, 2, 4, 4, 4, 6],
			daisy:		[3, 3, 3, 3, 4, 4],
			wario:		['-2', '-2', 6, 6, 6, 6],
			waluigi:	['-3', 1, 3, 5, 5, 7],
			yoshi:		[0, 1, 3, 3, 5, 7],
			rosalina:	['+2', '+2', 2, 3, 4, 8],
			dk:			['+5', 0, 0, 0, 10, 10],
			diddy:		['+2', 0, 0, 7, 7, 7],
			bowser:		['-3', '-3', 1, 8, 9, 10],
			goomba:		['+2', '+2', 3, 4, 5, 6],
			shyguy:		[0, 4, 4, 4, 4, 4],
			koopa:		[1, 1, 2, 3, 3, 10],
			monty:		['+1', 2, 3, 4, 5, 6],
			bowserjr:	[1, 1, 1, 4, 4, 9],
			boo:		['-2', '-2', 5, 5, 7, 7],
			hammerbro:	['+3', 1, 1, 5, 5, 5],
			drybones:	[1, 1, 1, 6, 6, 6],
			pompom:		[0, 3, 3, 3, 3, 8],
			bobomb:		[0, 0, 0, 0, 0, 0]
		},
		shopping: {
			prices: [3, 5, 6, 10]
		},
		items: {
			mushroom: {
				src: 'img/assist/smp/mushroom.png',
				event: {
					type: 'addToDice',
					value: 3
				}
			},
			goldmushroom: {
				src: 'img/assist/smp/goldmushroom.png',
				event: {
					type: 'addToDice',
					value: 5
				}
			},
			poisonmushroom: {
				src: 'img/assist/smp/poisonmushroom.png',
				event: {
					type: 'specialEvent',
					value: 'poisonmushroom'
				}
			},
			coinado: {
				src: 'img/assist/smp/coinado.png',
				event: {
					type: 'specialEvent',
					value: 'boobell'
				}
			},
			allyphone: {
				src: 'img/assist/smp/allyphone.png',
				event: {
					type: 'addAlly'
				}
			},
			other: {
				available: true
			}
		},
		spaces: {
			blue: {
				src: 'img/assist/smp/bluespace.png',
				event: {
					type: 'addCoins',
					value: 3
				}
			},
			red: {
				src: 'img/assist/smp/redspace.png',
				event: {
					type: 'removeCoins',
					value: 3
				}
			},
			happening: {
				src: 'img/assist/smp/happeningspace.png'
			},
			ally: {
				src: 'img/assist/smp/allyspace.png',
				event: {
					type: 'addAlly'
				}
			},
			item: {
				src: 'img/assist/smp/itemspace.png'
			},
			lucky: {
				src: 'img/assist/smp/luckyspace.png',
				event: {
					type: 'chooseEvent',
					value: 'lucky'
				}
			},
			badluck: {
				src: 'img/assist/smp/badluckspace.png',
				event: {
					type: 'chooseEvent',
					value: 'badluck'
				}
			},
			extrabadluck: {
				src: 'img/assist/smp/extrabadluckspace.png',
				event: {
					type: 'chooseEvent',
					value: 'badluck'
				}
			},
			vs: {
				src: 'img/assist/smp/vsspace.png',
				event: {
					type: 'specialEvent',
					value: 'vs'
				}
			}
		},
		events: {
			lucky: {
				options: [
					{
						name: 'Steal one ally from a rival',
						type: 'stealAlly'
					},
					{
						name: 'Receive 3 coins.',
						type: 'addCoins',
						value: 3
					},
					{
						name: 'Receive 5 coins.',
						type: 'addCoins',
						value: 5
					},
					{
						name: 'Make a rival lose 5 coins.',
						type: 'stealCoins',
						value: 5
					},
					{
						name: 'Make a rival lose 10 coins.',
						type: 'stealCoins',
						value: 10
					},
					{
						name: 'Receive item(s).',
						type: 'receiveItem'
					}
				]
			},
			badluck: {
				options: [
					{
						name: 'Lose 5 coins.',
						type: 'removeCoins',
						value: 5
					},
					{
						name: 'Lose 10 coins.',
						type: 'removeCoins',
						value: 10
					},
					{
						name: 'Give 3 coins to all other players.',
						type: 'giveCoinsToOthers',
						value: 3
					},
					{
						name: 'Give 5 coins to all other players.',
						type: 'giveCoinsToOthers',
						value: 5
					},
					{
						name: 'Give 5 coins to the last-place player.',
						type: 'giveCoinsToLastPlace',
						value: 5
					},
					{
						name: 'Give 10 coins to the last-place player.',
						type: 'giveCoinsToLastPlace',
						value: 10
					},
					{
						name: 'Give 5 coins to a random player.',
						type: 'giveCoinsToRandomPlayer',
						value: 5
					},
					{
						name: 'The Star moves.',
						type: 'moveStar'
					},
					{
						name: 'Raise the coin cost for a Star.',
						type: 'raiseStarCost'
					}
				]
			},
			vs: {
				coinAmount: [5, 7, 10, 15, 20, 25, 30], //the amount everyone has to pay
				default: 2 //array index of coinAmount, indicates which one is selected by default
			},
			boobell: {
				coinAmountRange: [5, 10] //everything 5-10
			}
		},
		minigame: {
		}
	},
	default: {
		star: { // Default star
			src: 'img/stars.png',
			//name: 'defaultStar',
			price: 20,
			event: {
				type: 'addStar',
				value: 1
			}
		}
	}
}