//creating the main ship object

var Ship={
	IMO: 9000000,
	MainDimensions: {LoA: 106.5, Lpp: 101.9, B: 24.5, D: 11.5, d: 8},
}

//defining constructors to handle the SFI objects that will be created

function General(name) { 
	this.name=name;
};

function SubGroup(name,hours) {
	this.name=name;
	this.hours=hours;
};

function DetailCode(name) { 
	this.name=name;
};

function IdTag(name,cost) {
	this.name=name;
	this.cost=cost;
};

/*After that, we insert methods inside the constructor prototypes, which will inherit those methods to all instances. The methods 
should sum the cost and hours recursively until the last level of the hierarchy. We choose to insert them directly into the prototype 
to keep the efficiency when generating many instances and to allow easy modification of all instances on later steps, if necessary.*/

General.prototype.hours = function() {
		var totalHours=0; //initial sum.
		for (var prop in this) {
			if (isNaN(prop)===false) { //if the variable prop is a number, it means that it is a SFI code and therefore should be checked for the person-hours.
				//when summing the hours to the totalHours var, we have to check if they come as a number or as a method in order to send the correct command to the object.
				if (typeof this[prop].hours === "function") { 
					totalHours+=this[prop].hours();
				} else if (typeof this[prop].hours === "number") {
					totalHours+=this[prop].hours;
				};
			 };
		};
		return totalHours;
	};

General.prototype.cost = function() {
		var totalCost=0;
		for (var prop in this) {
			if (isNaN(prop)===false) {
				if (typeof this[prop].cost === "function") {
					totalCost+=this[prop].cost();
				} else if (typeof this[prop].cost === "number") {
					totalCost+=this[prop].cost;
				};
			 };
		};
		return totalCost;
	};

//the Detail Code objects are simpler because they only have one or more IdTags attached to them.
DetailCode.prototype.cost = function() {
		var totalCost=0;
		for (var prop in this) {
			if (isNaN(prop)===false) {
				totalCost+=this[prop].cost;
			 };
		};
		return totalCost;
	};
	
//inherit all the General methods to the SubGroup objects.
SubGroup.prototype = new General();

//creating the SFI objects
Ship.SFI= new General();

Ship.SFI[1]=new General("Ship general");
	Ship.SFI[1][1]=new General("Insurance, Fees, Certificates, Representation");
		Ship.SFI[1][1][2]=new SubGroup("Classification & Statutory Fees and Certificates",5);
			Ship.SFI[1][1][2][35]=new DetailCode("IMO certificates");
				Ship.SFI[1][1][2][35][1]=new IdTag("IMO code - 9619373",20);				
				
Ship.SFI[2]=new General("Hull");
	Ship.SFI[2][0]=new General("Hull materials, general hull work");
		Ship.SFI[2][0][1]=new SubGroup("Hull materials",5);
			Ship.SFI[2][0][1][1]=new DetailCode("Ship steel plates");
				Ship.SFI[2][0][1][1][1]=new IdTag("Inner bottom plate 1", 40);
				
Ship.SFI[3]=new General("Equipment for cargo");
	Ship.SFI[3][3]=new General("Deck cranes for cargo");
		Ship.SFI[3][3][1]=new SubGroup("Rotating cranes with crane pillars",50);
			Ship.SFI[3][3][1][1]=new DetailCode("Rotating cranes with crane pillars");
				Ship.SFI[3][3][1][1][1]=new IdTag("GPOKac 5000-135-30",60);
				
Ship.SFI[4]=new General("Ship equipment");
	Ship.SFI[4][0]=new General("Manoeuvring machinery & equipment");
		Ship.SFI[4][0][4]=new SubGroup("Side thrusters",70);
			Ship.SFI[4][0][4][1]=new DetailCode("Brunvoll side thrusters");
				Ship.SFI[4][0][4][1][1]=new IdTag("Brunvoll side thruster 1",80);
				
Ship.SFI[5]=new General("Equipment for crew and passengers");
	Ship.SFI[5][0]=new General("Lifesaving, Protection & Medical Equipment");
		Ship.SFI[5][0][1]=new SubGroup("Lifeboats with equipment",90);
			Ship.SFI[5][0][1][1]=new DetailCode("Open lifeboats");
				Ship.SFI[5][0][1][1][1]=new IdTag("FRC lifeboat 1",100);
				
Ship.SFI[6]=new General("Machinery main components");
	Ship.SFI[6][0]=new General("Diesel engines for propulsion");
		Ship.SFI[6][0][1]=new SubGroup("Diesel engines",110);
			Ship.SFI[6][0][1][1]=new DetailCode("Main diesel engine, compl.");
				Ship.SFI[6][0][1][1][1]=new IdTag("MaK 9M32C 1", 120);
				Ship.SFI[6][0][1][1][2]=new IdTag("MaK 6M25C 2", 100);
				
Ship.SFI[7]=new General("System for machinery main components");
	Ship.SFI[7][0]=new General("Fuel systems");
		Ship.SFI[7][0][1]=new SubGroup("Fuel oil transfer and drain systems",130);
			Ship.SFI[7][0][1][1]=new DetailCode("Fuel oil transfer systems");
				Ship.SFI[7][0][1][1][1]=new IdTag("Oil transfer 1",140);
				
Ship.SFI[8]=new General("Ship common systems");
	Ship.SFI[8][0]=new General("Ballast & bilge water systems, gutter pipes outside accommod.");
		Ship.SFI[8][0][1]=new SubGroup("Ballast systems, solid ballast",150);
			Ship.SFI[8][0][1][15]=new DetailCode("Ballast water filters");
				Ship.SFI[8][0][1][15][1]=new IdTag("Alfa Laval Nordic 1",160);
