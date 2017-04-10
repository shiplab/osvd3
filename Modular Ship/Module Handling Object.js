//ship object with main particulars defined upon the chosen modules.

var Ship={
	length:function() {
		var totalLength=this.bow.length+this.car.length+this.pro.length;
		return totalLength;
	},
	beam:function() {return this.car.beam},
	draft:function() {return this.car.draft},
	depth:function() {return this.car.depth},
	cost:function() {
		var totalCost=this.bow.cost+this.sup.cost+this.car.cost+this.pro.cost+this.cra.cost;
		return totalCost;
	},
	material: "Polyamide",
};

//defining constructors to handle the SFI objects that will be created

function Bow(length, bulb, cost, comment) {
	this.length=length;
	this.bulb=bulb;
	this.cost=cost;
	this.comment=comment;
};

function Superstructure(length, decks, cost, comment) {
	this.length=length;
	this.decks=decks;
	this.cost=cost;
	this.comment=comment;
};

function CargoHold(quant) {
	this.length=40*quant;
	this.beam=40;
	this.draft=20;
	this.depth=30;
	this.cost=27*quant;
	this.comment= quant + "x Basic unit";
};

function Propeller(length, cost, type, comment) {
	this.length=length;
	this.cost=cost;
	this.type=type;
	this.comment=comment;
};

function Crane(capacity, cost, comment) {
	this.capacity=capacity;
	this.cost=cost;
	this.comment=comment;
};

//module definition

B1 = new Bow(87, true, 61, "It does not have a proper bulb, but has a special bow");
B2 = new Bow(87, false, 58, "Conventional bow without bulb");

S1 = new Superstructure(40, 2, 24, "Bridge");
S2 = new Superstructure(40, 4, 36, "Bridge plus extra accommodation");

CH1 = new CargoHold(1);
CH2 = new CargoHold(2);
CH3 = new CargoHold(3);

P1 = new Propeller(40, 25, "Shaft", "Rudder needed");
P2 = new Propeller(40, 28, "Azipod", "Better maneuverability");

C1 = new Crane(400, 13, "Can rotate, has 3 moveable arms");
W1 = new Crane(40, 11, "For cargo or ROV deployment");

