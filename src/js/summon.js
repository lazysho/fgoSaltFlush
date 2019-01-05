// GLOBALS
var summonfxInterval, summaryDisplayTimeout;
var spiritOriginList = [];
var ccindex = 0;
var skipSummonfx = false;

// FUCTIONS
function onPageLoad() {
    var queryString = decodeURIComponent(window.location.search);
    var querySplit = queryString.split('&'); // split parameters
    var values = [];
    
    // get exact values of query
    for (var i = 0; i < querySplit.length; i++) {
        temp = querySplit[i].split('=');
        values[i] = temp[1];
    }

    // check values if they're correct
    // values are : [0] = banner, [1] = noOfRolls, [2] = bgNo
    if(!(values[0] == 'classic' || values[0] == 'limited')
            || !(values[1] == '1' || values[1] == '10')) {
        backToIndex();
    } else {
        // rename values to avoid confusion
        var banner = values[0];
        var noOfRolls = values[1];
        var bgNo = values[2];

        // change background
        changeBackground(bgNo);

        // start summon
        summonSpiritron(banner, noOfRolls);
    }
}

function backToIndex() {
    $('body').addClass('fadeOutDownBig');
    $('body').css('overflow', 'hidden');
    setTimeout(back, 1500);
}

function back() {
    window.location.href = "../index.html"
}

function changeBackground(bgNo) {
    var bgUrl = "url('../assets/images/bg/BG_" + bgNo + ".png')";
    $('body').css('background-image', bgUrl);

    // if background is to dark, lighten text
    var darkbgs = [3, 5, 8];
    if(darkbgs.includes(parseInt(bgNo))) {
        lightenTexts('#disclaimer');
        console.log("Changing text color...");
    }
}

function lightenTexts(element) {
    $(element).css('color', '#fff');
}

function autoOverflow() {
    $('body').css('overflow', 'auto');
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

// SUMMON FUNCTIONS

function getBanner(banner) {
    // set arrays for banner
    var classic = [
        {"type": "Servant", "name": "Altria Pendragon", "class": "Saber", "rarity": 5},
        {"type": "Servant", "name": "Altria Pendragon (Alter)", "class": "Saber", "rarity": 4},
        {"type": "Servant", "name": "Nero Claudius", "class": "Saber", "rarity": 4},
        {"type": "Servant", "name": "Siegfried", "class": "Saber", "rarity": 4},
        {"type": "Servant", "name": "Gaius Julius Ceasar", "class": "Saber", "rarity": 3},
        {"type": "Servant", "name": "Altera", "class": "Saber", "rarity": 5},
        {"type": "Servant", "name": "Gilles de Rais", "class": "Saber", "rarity": 3},
        {"type": "Servant", "name": "Chevalier d'Eon", "class": "Saber", "rarity": 4},
        {"type": "Servant", "name": "Fergus mac Roich", "class": "Saber", "rarity": 3},
        {"type": "Servant", "name": "Mordred", "class": "Saber", "rarity": 5},
        {"type": "Servant", "name": "Rama", "class": "Saber", "rarity": 4},
        {"type": "Servant", "name": "Lancelot", "class": "Saber", "rarity": 4},
        {"type": "Servant", "name": "Gawain", "class": "Saber", "rarity": 4},
        {"type": "Servant", "name": "Bedivere", "class": "Saber", "rarity": 3},
        {"type": "Servant", "name": "Emiya", "class": "Archer", "rarity": 4},
        {"type": "Servant", "name": "Robin Hood", "class": "Archer", "rarity": 3},
        {"type": "Servant", "name": "Atalante", "class": "Archer", "rarity": 4},
        {"type": "Servant", "name": "Euryale", "class": "Archer", "rarity": 3},
        {"type": "Servant", "name": "Orion", "class": "Archer", "rarity": 5},
        {"type": "Servant", "name": "David", "class": "Archer", "rarity": 3},
        {"type": "Servant", "name": "Nikola Tesla", "class": "Archer", "rarity": 5},
        {"type": "Servant", "name": "Arjuna", "class": "Archer", "rarity": 5},
        {"type": "Servant", "name": "Gilgamesh (Child)", "class": "Archer", "rarity": 3},
        {"type": "Servant", "name": "Billy the Kid", "class": "Archer", "rarity": 3},
        {"type": "Servant", "name": "Tristan", "class": "Archer", "rarity": 4},
        {"type": "Servant", "name": "Tawara Touta", "class": "Archer", "rarity": 3},
        {"type": "Servant", "name": "Cu Chulainn", "class": "Lancer", "rarity": 3},
        {"type": "Servant", "name": "Elisabeth Bathory", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Cu Chulainn (Prototype)", "class": "Lancer", "rarity": 3},
        {"type": "Servant", "name": "Romulus", "class": "Lancer", "rarity": 3},
        {"type": "Servant", "name": "Hektor", "class": "Lancer", "rarity": 3},
        {"type": "Servant", "name": "Diarmuid Ua Duibhne", "class": "Lancer", "rarity": 3},
        {"type": "Servant", "name": "Altria Pendragon (Alter)", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Karna", "class": "Lancer", "rarity": 5},
        {"type": "Servant", "name": "Fionn mac Cumhaill", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Li Shuwen", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Altria Pendragon (Lancer)", "class": "Lancer", "rarity": 5},
        {"type": "Servant", "name": "Vlad III (EXTRA)", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Enkidu", "class": "Lancer", "rarity": 5},
        {"type": "Servant", "name": "Medusa", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Jaguar Warrior", "class": "Lancer", "rarity": 3},
        {"type": "Servant", "name": "Medusa", "class": "Rider", "rarity": 3},
        {"type": "Servant", "name": "Boudica", "class": "Rider", "rarity": 3},
        {"type": "Servant", "name": "Ushiwakamaru", "class": "Rider", "rarity": 3},
        {"type": "Servant", "name": "Alexander", "class": "Rider", "rarity": 3},
        {"type": "Servant", "name": "Marie Antoinette", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Saint Martha", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Francis Drake", "class": "Rider", "rarity": 5},
        {"type": "Servant", "name": "Anne Bonny & Mary Read", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Astolfo", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Queen Medb", "class": "Rider", "rarity": 5},
        {"type": "Servant", "name": "Ozymandias", "class": "Rider", "rarity": 5},
        {"type": "Servant", "name": "Quetzalcoatl", "class": "Rider", "rarity": 5},
        {"type": "Servant", "name": "Medea", "class": "Caster", "rarity": 3},
        {"type": "Servant", "name": "Gilles de Rais", "class": "Caster", "rarity": 3},
        {"type": "Servant", "name": "Mephistopheles", "class": "Caster", "rarity": 3},
        {"type": "Servant", "name": "Zhuge Liang (El-Melloi II", "class": "Caster", "rarity": 5},
        {"type": "Servant", "name": "Cu Chulainn", "class": "Caster", "rarity": 3},
        {"type": "Servant", "name": "Medea", "class": "Caster", "rarity": 3},
        {"type": "Servant", "name": "Medea (Lily)", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Nursery Rhyme", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Paracelsus von Hohenheim", "class": "Caster", "rarity": 3},
        {"type": "Servant", "name": "Charles Babbage", "class": "Caster", "rarity": 3},
        {"type": "Servant", "name": "Helena Blavatsky", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Thomas Edison", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Geronimo", "class": "Caster", "rarity": 3},
        {"type": "Servant", "name": "Xuanzang Sanzang", "class": "Caster", "rarity": 5},
        {"type": "Servant", "name": "Nitocris", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Gilgamesh", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Stheno", "class": "Assassin", "rarity": 4},
        {"type": "Servant", "name": "Jing Ke", "class": "Assassin", "rarity": 3},
        {"type": "Servant", "name": "Carmilla", "class": "Assassin", "rarity": 4},
        {"type": "Servant", "name": "Jack The Ripper", "class": "Assassin", "rarity": 5},
        {"type": "Servant", "name": "Henry Jekyll & Hyde", "class": "Assassin", "rarity": 3},
        {"type": "Servant", "name": "Emiya", "class": "Assassin", "rarity": 4},
        {"type": "Servant", "name": "Hassan of the Hundred Persona", "class": "Assassin", "rarity": 3},
        {"type": "Servant", "name": "Fuuma Kotarou", "class": "Assassin", "rarity": 3},
        {"type": "Servant", "name": "Hassan of the Serenity", "class": "Assassin", "rarity": 3},
        {"type": "Servant", "name": "Heracles", "class": "Berserker", "rarity": 4},
        {"type": "Servant", "name": "Lancelot", "class": "Berserker", "rarity": 4},
        {"type": "Servant", "name": "Lu Bu Fengxian", "class": "Berserker", "rarity": 3},
        {"type": "Servant", "name": "Vlad III", "class": "Berserker", "rarity": 5},
        {"type": "Servant", "name": "Darius III", "class": "Berserker", "rarity": 3},
        {"type": "Servant", "name": "Kiyohime", "class": "Berserker", "rarity": 3},
        {"type": "Servant", "name": "Tamamo Cat", "class": "Berserker", "rarity": 4},
        {"type": "Servant", "name": "Beowulf", "class": "Berserker", "rarity": 4},
        {"type": "Servant", "name": "Nightingale", "class": "Berserker", "rarity": 5},
        {"type": "Servant", "name": "Cu Chulainn (Alter)", "class": "Berserker", "rarity": 5},
        {"type": "Servant", "name": "Ibaraki-Douji", "class": "Berserker", "rarity": 4},
        {"type": "Servant", "name": "Jeanne d'Arc", "class": "Ruler", "rarity": 5},
        {"type": "Servant", "name": "Gorgon", "class": "Avenger", "rarity": 4},
        {"type": "CE", "name": "Azoth Blade", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "False Attendant's Writings", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "The Azure Black Keys", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "The Verdant Black Keys", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "The Crimson Black Keys", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Rins Pendant", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Spell Tome", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Dragon's Meridian", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Sorcery Ore", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Dragonkin", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Iron-Willed Training", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Primeval Curse", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Projection", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Gandr", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Verdant Sound of Destruction", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Gem Magecraft: Antumbra", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Be Elegant", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "The Imaginary Element", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Divine Banquet", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Angel's Song", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Formal Craft", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Imaginary Around", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Limited/Zero Over", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Kaleidoscope", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Heaven's Feel", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Parted Sea", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Seal Designation Enforcer", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Holy Shroud of Magdalene", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Prisma Cosmos", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Mooncell Automaton", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Runestone", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "With One Strike", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "The Black Grail", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Anchors Aweigh", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Code Cast", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Victor of the Moon", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Another Ending", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Demon Boar", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Knight's Dignity", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "A Fragment of 2030", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Clock Tower", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Necromancy", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Awakened Will", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "500-Year Obsession", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Trueshot", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Ryudoji Temple", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Mana Gauge", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Elixir of Love", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Storch Ritter", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Hermitage", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Motored Cuirassier", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Stuffed Lion", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Lugh's Halo", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Vessel of the Saint", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Golden Millenium Tree", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Mature Gentleman", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Grand Puppeteer", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Threefold Barrier", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Vivid Dance of Fists", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Mystic Eyes of Distortion", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Summer's Precognition", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Chorus", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Sprinter", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Repeat Magic", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Record Holder", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Beast of Billows", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Art of the Poisonous Snake", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Art of Death", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Gentle Affection", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Volumen Hydrargyrum", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Innocent Maiden", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Self Geass Scroll", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Reciting the Subscription List", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "All Three Together", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Bronze-Link Manipulator", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Ath nGabla", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Bygone Dream", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Extremely Spicy Mapo Tofu", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Jeweled Sword Zelretch", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Hidden Sword: Pheasant Reversal", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Origin Bullet", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Covering Fire", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Battle of Camlann", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Leisure Stroll", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Partake with the King", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Goldfish Scooping", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Fire Flower", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Shiny Goddess", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Knights of Marines", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Chaldea Lifesavers", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Meat Wars", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Shaved Ice (Void's Dust Flavor)", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Magical Girl of Sapphire", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Kill on Sight", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Zunga Zunga!", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Howl at the Moon", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Princess of the White Rose", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Joint Recital", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Fragarach", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Inverted Moon of the Heavens", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Hydra Dagger", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Count Romani Archaman's Hospitality", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Hero Elly's Adventure", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Wizard & Priest", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Mata Hari's Tavern", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "A Moment of Tranquility", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Reading on the Holy Night", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Saint's Invitation", "class": "CE", "rarity": 3},
        {"type": "CE", "name": "Devilish Bodhisattva", "class": "CE", "rarity": 5},
        {"type": "CE", "name": "Room Guard", "class": "CE", "rarity": 4},
        {"type": "CE", "name": "Seeker of Miracles", "class": "CE", "rarity": 3}
    ];
    var limited = [
        {"type": "Servant", "name": "Gilgamesh", "class": "Archer", "rarity": 5},
        {"type": "Servant", "name": "Sakata Kintoki", "class": "Berserker", "rarity": 5},
        {"type": "Servant", "name": "Okita", "class": "Saber", "rarity": 5},
        {"type": "Servant", "name": "Scathach", "class": "Lancer", "rarity": 5},
        {"type": "Servant", "name": "Mysterious Heroine X", "class": "Assassin", "rarity": 5},
        {"type": "Servant", "name": "Brynhild", "class": "Lancer", "rarity": 5},
        {"type": "Servant", "name": "Nero Claudius (Bride)", "class": "Saber", "rarity": 5},
        {"type": "Servant", "name": "Ryougi Shiki (Saber)", "class": "Saber", "rarity": 5},
        {"type": "Servant", "name": "Amakusa Shirou", "class": "Ruler", "rarity": 5},
        {"type": "Servant", "name": "Edmond Dantes", "class": "Avenger", "rarity": 5},
        {"type": "Servant", "name": "Jeanne d'Arc (Alter)", "class": "Avenger", "rarity": 5},
        {"type": "Servant", "name": "Iskandar", "class": "Rider", "rarity": 5},
        {"type": "Servant", "name": "Shuten-Douji", "class": "Assassin", "rarity": 5},
        {"type": "Servant", "name": "Minamoto-no-Raikou", "class": "Berserker", "rarity": 5},
        {"type": "Servant", "name": "Leonardo Da Vinci", "class": "Caster", "rarity": 5},
        {"type": "Servant", "name": "Tamamo-no-Mae", "class": "Lancer", "rarity": 5},
        {"type": "Servant", "name": "Altria Pendragon", "class": "Archer", "rarity": 5},
        {"type": "Servant", "name": "Marie Antoinette", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Anne Bonny & Mary Read (Archer)", "class": "Archer", "rarity": 4},
        {"type": "Servant", "name": "Martha", "class": "Ruler", "rarity": 4},
        {"type": "Servant", "name": "Mordred", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Kiyohime", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Illyasviel von Einzbern", "class": "Caster", "rarity": 5},
        {"type": "Servant", "name": "Cleopatra", "class": "Assassin", "rarity": 5},
        {"type": "Servant", "name": "Ishtar", "class": "Archer", "rarity": 5},
        {"type": "Servant", "name": "Merlin", "class": "Caster", "rarity": 5},
        {"type": "Servant", "name": "Elisabeth Bathory (Brave)", "class": "Saber", "rarity": 4},
        {"type": "Servant", "name": "Oda Nobunaga", "class": "Archer", "rarity": 4},
        {"type": "Servant", "name": "Chloe von Einzbern", "class": "Archer", "rarity": 4},
        {"type": "Servant", "name": "Jeanne d'Arc Alter Santa Lily", "class": "Lancer", "rarity": 4},
        {"type": "Servant", "name": "Altria Pendragon (Santa Alter)", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Sakata Kintoki", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Elisabeth Bathory (Halloween)", "class": "Rider", "rarity": 4},
        {"type": "Servant", "name": "Holy Grail", "class": "Caster", "rarity": 4},
        {"type": "Servant", "name": "Ryougi Shiki", "class": "Assassin", "rarity": 4},
        {"type": "Servant", "name": "Scathach", "class": "Assassin", "rarity": 4}
    ];

    limited = limited.concat(classic);

    // return banner
    return (banner=='classic') ? classic : limited;
}

function separatePool(summonPool) {
    var servantPool = [];
    var cePool = [];

    var servantCount = 0, ceCount = 0;
    for(var i = 0; i < summonPool.length; i++) {
        if(summonPool[i].type == "Servant") {
            servantPool[servantCount] = summonPool[i];
            servantCount++;
        } else if(summonPool[i].type == "CE") {
            cePool[ceCount] = summonPool[i];
            ceCount++;
        }
    }

    return {"servants": servantPool, "ces": cePool};
}

function summonSpiritron(banner, noOfRolls) {
    // get summon pool from banner type
    var summonPool = getBanner(banner);

    // separate pool
    var separatedPool = separatePool(summonPool);
    var servantPool = separatedPool.servants;
    var cePool = separatedPool.ces;

    // if roll is not yolo, get guaranteed place in result
    var position = 99;
    if(noOfRolls > 1) {
        position = Math.floor(Math.random() * 9);
        console.log("Guaranteed: Summon #" + (position + 1) );
        console.log(" ");
    }

    // determine card type and rarity
    var typeAndRarity = [];
    for(var i = 0; i < noOfRolls; i++) {
        var guaranty = false;
        if(position == i) { 
            guaranty = true;
        }

        console.log("Summon #" + (i + 1));
        typeAndRarity[i] = rollCard(guaranty);
    }

    // summon spirit origins
    var spiritOrigins = [];
    for(var i = 0; i < noOfRolls; i++) {
        if(typeAndRarity[i].type == "Servant") {
            spiritOrigins[i] = rollSpiritOrigin(typeAndRarity[i].rarity, servantPool);
        } else if(typeAndRarity[i].type == "CE") {
            spiritOrigins[i] = rollCraftEssence(typeAndRarity[i].rarity, cePool);
        }
    }

    console.log("Summon Details");
    for(var i = 0; i < noOfRolls; i++) {
        console.log((i + 1) + " : " + spiritOrigins[i].name + ", " + spiritOrigins[i].rarity + "*"
            + " " + spiritOrigins[i].type);
    }
    console.log(" ");

    // display result
    displaySummon(spiritOrigins);

    console.log("Welcome to fgoSaltFlush! I made this for myself because " +
        "I like rolling, I'm just so unlucky irl that fake rolls desalinate me." +
        " Anyway, I hope that's the case with you too! Hope you had fun!");
    console.log(" ");
    console.log("Please note that fgoSaltFlush is not accurate. I tried to make it as close as possible, " +
        "but I think it'll never be 100% similar to F/GO.");
    console.log("I just rely on Math.random().");
}

function rollCard(guaranty) {
    var cardType = ""; var rarity = 0;
    var rng = Math.random();
    console.log("Random Number: " + rng);
    
    var rngDec = rng;
    if(guaranty) {
        if((rngDec -= 0.01) < 0) {
            cardType = "Servant";
            rarity = 5;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant SSR");
            console.log(" ");
        } else if((rngDec -= 0.03) < 0) {
            cardType = "Servant";
            rarity = 4;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant SR");
            console.log(" "); 
        } else if((rngDec -= 0.04) < 0) {
            cardType = "CE";
            rarity = 5;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE SSR");
            console.log(" ");
        } else {
            cardType = "CE";
            rarity = 4;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("[Since Servant/CE R are excluded in guaranteed, " +
                        "I added the 80% to CE SR giving it 92% chance of dropping.]");
            console.log(rng + " - 0.92 = " + (rng -= 0.92));
            console.log("CE SR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE SR");
            console.log(" ");
        }
    } else {
        if((rngDec -= 0.01) < 0) {
            cardType = "Servant";
            rarity = 5;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant SSR");
            console.log(" ");
        } else if((rngDec -= 0.03) < 0) {
            cardType = "Servant";
            rarity = 4;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant SR");
            console.log(" ");
        } else if((rngDec -= 0.40) < 0) {
            cardType = "Servant";
            rarity = 3;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("Servant R?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: Servant R");
            console.log(" ");
        } else if((rngDec -= 0.04) < 0) {
            cardType = "CE";
            rarity = 5;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("Servant R?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE SSR");
            console.log(" ");
        } else if((rngDec -= 0.12) < 0) {
            cardType = "CE";
            rarity = 4;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("Servant R?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.12 = " + (rng -= 0.12));
            console.log("CE SR?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE SR");
            console.log(" ");
        } else {
            cardType = "CE";
            rarity = 3;

            console.log("--Process--");
            console.log(rng + " - 0.01 = " + (rng -= 0.01));
            console.log("Servant SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.03 = " + (rng -= 0.03));
            console.log("Servant SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("Servant R?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.04 = " + (rng -= 0.04));
            console.log("CE SSR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.12 = " + (rng -= 0.12));
            console.log("CE SR?? " + rng + " < 0 = " + (rng < 0));
            console.log(rng + " - 0.40 = " + (rng -= 0.40));
            console.log("CE R?? " + rng + " < 0 = " + (rng < 0));
            console.log("Summon Result: CE R");
            console.log(" ");
        }
    }
    
    return {"type": cardType, "rarity": rarity};
}

function rollSpiritOrigin(rarity, pool) {
    var spiritOrigin = "";

    if(rarity == 5) { // 5 star
        var fiveStar = splitRarity(pool, 5);
        var originNo = fetchOrigin(fiveStar);

        spiritOrigin = fiveStar[originNo];
    } else if(rarity == 4) { // 4 star
        var fourStar = splitRarity(pool, 4);
        var originNo = fetchOrigin(fourStar);

        spiritOrigin = fourStar[originNo];
    } else if(rarity == 3) { // 3 star
        var threeStar = splitRarity(pool, 3);
        var originNo = fetchOrigin(threeStar);

        spiritOrigin = threeStar[originNo];
    }

    return spiritOrigin;
}

function rollCraftEssence(rarity, pool) {
    var craftEssence = "";

    if(rarity == 5) { // 5 star
        var fiveStar = splitRarity(pool, 5);
        var originNo = fetchOrigin(fiveStar);

        craftEssence = fiveStar[originNo];
    } else if(rarity == 4) { // 4 star
        var fourStar = splitRarity(pool, 4);
        var originNo = fetchOrigin(fourStar);

        craftEssence = fourStar[originNo];
    } else if(rarity == 3) { // 3 star
        var threeStar = splitRarity(pool, 3);
        var originNo = fetchOrigin(threeStar);

        craftEssence = threeStar[originNo];
    }

    return craftEssence;
}

function splitRarity(pool, stars) {
    var starBasedPool = [];

    var poolCount = 0;
    for(i = 0; i < pool.length; i++) {
        if(pool[i].rarity == stars) {
            starBasedPool[poolCount] = pool[i];
            poolCount++;
        }
    }

    return starBasedPool;
}

function fetchOrigin(pool) {
    var max = pool.length - 1;
    var min = 0;
    
    return Math.floor(Math.random() * max) + min;
}

// ANIMATIONS
function displaySummon(spiritOrigins) {
    spiritOriginList = spiritOrigins;
    setTimeout(summonfx, 1500);
    summonfxInterval = setInterval(summonfx, 7900);

    if(spiritOriginList.length > 1) {
        summaryDisplayTimeout = setTimeout(displaySummary, 80000);
    } else {
        summaryDisplayTimeout = setTimeout(displaySummary, 8250);
    }
    
}

function portraitUrl(name) {
    var filename = name.split(' ').join('_');
    filename = filename.split('(').join('');
    filename = filename.split(')').join('');
    filename = filename.split(':').join('');
    filename = filename.split('/').join('_');
    filename = filename.split("'").join('');
    filename = filename.toLowerCase();
    return filename;
}

function summonfx() {
    flipClassCard(spiritOriginList[ccindex].type, spiritOriginList[ccindex].rarity, 
        spiritOriginList[ccindex].class);
    setImage(spiritOriginList[ccindex].type, spiritOriginList[ccindex].class, 
        spiritOriginList[ccindex].name);
    setFrame(spiritOriginList[ccindex].type, spiritOriginList[ccindex].rarity, 
        spiritOriginList[ccindex].class);
    setClassAndName(spiritOriginList[ccindex].type, spiritOriginList[ccindex].rarity, 
        spiritOriginList[ccindex].class, spiritOriginList[ccindex].name);
    setTimeout(cardFadeOut(spiritOriginList.length), 200);
}

function flipClassCard(type, rarity, cclass) {
   var classCard = "../assets/images/frames";
   var spark = Math.floor(Math.random() * 100) + 1;

   if(type == "CE") {
       if(rarity > 3) {
           classCard = classCard.concat("/gold/back1.png");
           classCard = "url('" + classCard + "')";
       } else {
           classCard = classCard.concat("/silver/back1.png");
           classCard = "url('" + classCard + "')";
       }
   } else {
       if(rarity > 3) {
           spark -=  100; // will spark if 25 and below
           if(spark < 0) {
               classCard = classCard.concat("/silver/");
               classCard = classCard.concat(cclass.toLowerCase());
               classCard = classCard.concat(".png")
               classCard = "url('" + classCard + "')";

               $('.servant-card').css('background-image', classCard);
               $('.servant-card').addClass('flipInY');
               $('.servant-card').fadeIn(750, function() {
                   classCard = "../assets/images/frames";
                   classCard = classCard.concat("/gold/");
                   classCard = classCard.concat(cclass.toLowerCase());
                   classCard = classCard.concat(".png")
                   classCard = "url('" + classCard + "')";
                   $('.servant-card').removeClass('flipInY');
                   $('.servant-card').addClass('flash infinite');
                   $('.servant-card').css('background-image', classCard);
                   $('.servant-card').removeClass('flash infinite');
               })
               
               $('.servant-card').delay(1250).fadeOut(200);
               return;
            } else {
                classCard = classCard.concat("/gold/");
            }
       } else {
           classCard = classCard.concat("/silver/");
       }
       
       classCard = classCard.concat(cclass.toLowerCase());
       classCard = classCard.concat(".png")
       classCard = "url('" + classCard + "')";
   }

   $('.servant-card').css('background-image', classCard);
   $('.servant-card').addClass('flipInY');
   $('.servant-card').fadeIn(250);
   $('.servant-card').delay(1500).fadeOut(500);
}

function setImage(type, cclass, name) {
    var image = "../assets/images/summon";
    var filename = portraitUrl(name);

    if(type == "CE") {
        image = image.concat("/ce/portrait/" + filename + ".jpg");
        
        // adjust size
        $('.servant-portrait').css('height', '48.92vh');
    } else {
        image = image.concat("/servants/portrait/" + cclass.toLowerCase());
        image = image.concat("/" + filename + ".png");

        // adjust size
        $('.servant-portrait').css('height', '48vh');
    }
    image = "url('" + image + "')";

    $('.servant-portrait').css('background-image', image);
    $('.servant-portrait').delay(2500).fadeIn(300);
    $('.servant-portrait').delay(2750).fadeOut(500);
}

function setFrame(type, rarity) {
    var frame = "../assets/images/frames";

    if(type == "CE") {
        if(rarity > 3) {
            frame = frame.concat("/gold/essence_card_0");
        } else {
            frame = frame.concat("/silver/essence_card_0");
        }

        frame = frame.concat(rarity);
        frame = frame.concat(".png");
        frame = "url('" + frame + "')";

        $('.servant-frame').css('height', '48vh');
        $('.servant-frame').css('margin-top', '-47.9vh');
    } else {
        if(rarity > 3) {
            frame = frame.concat("/gold/card_0");
        } else {
            frame = frame.concat("/silver/card_0");
        }

        frame = frame.concat(rarity + ".png");
        frame = "url('" + frame + "')";

        $('.servant-frame').css('height', '48vh');
        $('.servant-frame').css('margin-top', '-48vh');
    }

    $('.servant-frame').css('background-image', frame);
    $('.servant-frame').delay(2500).fadeIn(300);
    $('.servant-frame').delay(2750).fadeOut(500);
}

function setClassAndName(type, rarity, cclass, name) {
    if(type == "CE") {
        if(name.length <= 20) {
            $('.class-name').text(name);
            $('.class-name').delay(2500).fadeIn(300);
            $('.class-name').delay(2750).fadeOut(500);
        } else {
            $('.servant-name').text(name);
            $('.servant-name').css('font-size', '2vh')
            $('.servant-name').css('margin-top', '-8vh')
            $('.servant-name').delay(2500).fadeIn(300);
            $('.servant-name').delay(2750).fadeOut(500);
        }
    } else {
        var classIcon = '../assets/images/frames/class/';

        if(rarity > 3) {
            classIcon = classIcon.concat(cclass.toLowerCase() + "_gold.png");
            classIcon = "url('" + classIcon + "')";
        } else {
            classIcon = classIcon.concat(cclass.toLowerCase() + "_silver.png");
            classIcon = "url('" + classIcon + "')";
        }

        // change class icon
        $('.servant-class').css('background-image', classIcon);
        $('.servant-class').delay(2500).fadeIn(300);
        $('.servant-class').delay(2750).fadeOut(500);

        // change class name
        $('.class-name').text(cclass);
        $('.class-name').delay(2550).fadeIn(300);
        $('.class-name').delay(2750).fadeOut(500);

        $('.servant-name').text(name);
        $('.servant-name').css('font-size', '1.8vh')
        $('.servant-name').css('margin-top', '-1.5vh')
        $('.servant-name').delay(2500).fadeIn(300);
        $('.servant-name').delay(2750).fadeOut(500);
    }
}

function cardFadeOut(noOfRolls) {
    ccindex++;
    $('#rolls').val(ccindex);

    if(ccindex >= noOfRolls) {
        ccindex = 0;
        clearInterval(summonfxInterval);
    }
}

function skipSummon() {
    $('#skipButton').prop('disabled', true);

    $('.servant-card').css('display', 'none');
    $('.servant-portrait').delay(2250).css('display', 'none');
    $('.servant-frame').delay(2250).css('display', 'none');
    $('.class-name').delay(2250).css('display', 'none');
    $('.servant-name').delay(2250).css('display', 'none');

    setTimeout(function() {
        clearInterval(summonfxInterval);
        clearTimeout(summaryDisplayTimeout);
        displaySummary();
    }, 8000);
    
}

function displaySummary() {
    for(var i = 0; i < spiritOriginList.length; i++) {
        var url = "", filename = "", cclass = "";
        if(spiritOriginList[i].rarity > 3) {
            // change thumb bg
            url = "../assets/images/frames/gold/gold_bg.png";
            $(".thumb-bg-" + (i + 1)).attr('src', url);
            $(".thumb-bg-" + (i + 1)).fadeIn(800);

            // change frame
            if(spiritOriginList[i].type == "Servant") {
                // change portrait
                filename = portraitUrl(spiritOriginList[i].name);
                cclass = spiritOriginList[i].class;
                url = "../assets/images/summon/servants/thumb/";
                url = url + cclass.toLowerCase() + "/" + filename + ".png";
                $(".thumb-portrait-"+ (i + 1)).attr('src', url);
                $(".thumb-portrait-"+ (i + 1)).fadeIn(1200);

                url = "../assets/images/frames/gold/servant.png";
                $(".thumb-frame-"+ (i + 1)).attr('src', url);
                $(".thumb-frame-"+ (i + 1)).fadeIn(800);

                // change icon
                url = "../assets/images/frames/class/";
                url = url + cclass.toLowerCase() + "_" + "goldborder.png";
                $(".thumb-class-"+ (i + 1)).attr('src', url);
                $(".thumb-class-"+ (i + 1)).fadeIn(800);
            } else {
                // change portrait
                filename = portraitUrl(spiritOriginList[i].name);
                cclass = spiritOriginList[i].class;
                url = "../assets/images/summon/ce/thumb/";
                url = url + filename + ".png";
                $(".thumb-portrait-"+ (i + 1)).attr('src', url);
                $(".thumb-portrait-"+ (i + 1)).fadeIn(1200);

                url = "../assets/images/frames/gold/essence.png";
                $(".thumb-frame-"+ (i + 1)).attr('src', url);
                $(".thumb-frame-"+ (i + 1)).fadeIn(800);
            }
        } else {
            // change thumb bg
            url = "../assets/images/frames/silver/silver_bg.png";
            $(".thumb-bg-" + (i + 1)).attr('src', url);
            $(".thumb-bg-" + (i + 1)).fadeIn(800);

            // change frame
            if(spiritOriginList[i].type == "Servant") {
                // change portrait
                element = ".thumb-portrait-"+ (i + 1);
                filename = portraitUrl(spiritOriginList[i].name);
                cclass = spiritOriginList[i].class;
                url = "../assets/images/summon/servants/thumb/";
                url = url + cclass.toLowerCase() + "/" + filename + ".png";
                $(".thumb-portrait-"+ (i + 1)).attr('src', url);
                $(".thumb-portrait-"+ (i + 1)).fadeIn(1200);

                url = "../assets/images/frames/silver/servant.png";
                $(".thumb-frame-"+ (i + 1)).attr('src', url);
                $(".thumb-frame-"+ (i + 1)).fadeIn(800);

                // change icon
                url = "../assets/images/frames/class/";
                url = url + cclass.toLowerCase() + "_" + "silverborder.png";
                $(".thumb-class-"+ (i + 1)).attr('src', url);
                $(".thumb-class-"+ (i + 1)).fadeIn(800);
            } else {
                // change portrait
                filename = portraitUrl(spiritOriginList[i].name);
                cclass = spiritOriginList[i].class;
                url = "../assets/images/summon/ce/thumb/";
                url = url + filename + ".png";
                $(".thumb-portrait-"+ (i + 1)).attr('src', url);
                $(".thumb-portrait-"+ (i + 1)).fadeIn(1200);

                url = "../assets/images/frames/silver/essence.png";
                $(".thumb-frame-"+ (i + 1)).attr('src', url);
                $(".thumb-frame-"+ (i + 1)).fadeIn(800);
            }
        }
    }

    $('.summon-panel').css('overflow', 'auto');

    createElement('p', 'rollAgain', 'w-50 btn animated slideInDown bg-danger mt-3 mx-auto text-white shadow-sm',
        "Roll Again", 'child', 'alertSpace');
    $('#rollAgain').click(function() {
        location.reload();
    });
    $('#rollAgain').addClass('show');
    resizeFrames();
}

function resizeFrames() {
    var width = window.screen.width;
    var height = window.screen.height;

    for(var i = 1; i <= 10; i++) {
        if(width == 375 && height == 812) {
            $('.thumb-frame-' + i).css('height', '11.6vh');
            $('.thumb-frame-' + i).css('margin-top', '-12vh');

            $('.thumb-class-' + i).css('height', '3vh');
            $('.thumb-class-' + i).css('width', '3vh');
            $('.thumb-class-' + i).css('margin-top', '-26vh');

            return;
        }

        if(width == 1024 && height == 1366) {
            $('.thumb-frame-' + i).css('height', '8vh');
            $('.thumb-frame-' + i).css('margin-top', '-8vh');

            $('.thumb-class-' + i).css('height', '2.5vh');
            $('.thumb-class-' + i).css('width', '2.5vh');
            $('.thumb-class-' + i).css('margin-top', '-16.6vh');

            return;
        }

        if(width <= 320) {
            $('.thumb-frame-' + i).css('height', '13vh');
            $('.thumb-frame-' + i).css('margin-top', '-15vh');

            $('.thumb-class-' + i).css('height', '4vh');
            $('.thumb-class-' + i).css('width', '4vh');
            $('.thumb-class-' + i).css('margin-top', '-31vh');

            return;
        }
        
        if(width > 320 && width <= 375) {
            $('.thumb-frame-' + i).css('height', '14vh');
            $('.thumb-frame-' + i).css('margin-top', '-15vh');

            $('.thumb-class-' + i).css('height', '4vh');
            $('.thumb-class-' + i).css('width', '4vh');
            $('.thumb-class-' + i).css('margin-top', '-32vh');

            return;
        }
        
        if(width > 375 && width <= 414) {
            $('.thumb-frame-' + i).css('height', '15vh');
            $('.thumb-frame-' + i).css('margin-top', '-15vh');

            $('.thumb-class-' + i).css('height', '4vh');
            $('.thumb-class-' + i).css('width', '4vh');
            $('.thumb-class-' + i).css('margin-top', '-32vh');

            return;
        } 
        
        if(width > 414 && width <= 768) {
            $('.thumb-frame-' + i).css('height', '10vh');
            $('.thumb-frame-' + i).css('margin-top', '-11vh');

            $('.thumb-class-' + i).css('height', '3vh');
            $('.thumb-class-' + i).css('width', '3vh');
            $('.thumb-class-' + i).css('margin-top', '-22vh');

            return;
        }

        if(width > 768) {
            $('.thumb-frame-' + i).css('height', '14vh');
            $('.thumb-frame-' + i).css('margin-top', '-15vh');

            $('.thumb-class-' + i).css('height', '4vh');
            $('.thumb-class-' + i).css('width', '4vh');
            $('.thumb-class-' + i).css('margin-top', '-29.6vh');

            return;
        }
    }
}

// ROOT
$(document).ready(function () {
    onPageLoad();
    setTimeout(autoOverflow, 2000);
});