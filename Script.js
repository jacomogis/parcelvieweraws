require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/layers/Layer", "esri/widgets/Search","esri/widgets/BasemapGallery", "esri/widgets/Expand", "esri/widgets/Print", "esri/widgets/LayerList", "esri/layers/MapImageLayer", "esri/widgets/Home", "esri/widgets/DistanceMeasurement2D", "esri/widgets/AreaMeasurement2D", "esri/core/watchUtils", "esri/layers/GroupLayer"], 
(Map, MapView, FeatureLayer, Layer, Search, BasemapGallery, Expand, Print, LayerList, MapImageLayer, Home, DistanceMeasurement2D, AreaMeasurement2D, watchUtils, GroupLayer) => {
	
	theMap = new Map({
		basemap: "topo-vector"
	});
	theView = new MapView({
		container: "viewDiv",
		map: theMap,
		zoom: 11,
		center: [-94.35, 39.01]
	});

	var getPropertyInfoThisAction = {
		className: "decoy_button",
		id: "propertyInfo",
	};

	var popuptemplAddrPts = {
		title: "<h6><b>Basic Information</b></h6>",
		outFields: ["*"],
		expressionInfos: [{
			name: "address-inside-parcels-arcade",
			title: "<b>Address:</b>",
			visible: true,
			expression: "var addressintersect = Intersects(FeatureSetByName($map,'Address Points'), $feature); var cnt = Count(addressintersect);var result = 'There are  ' + cnt + '  addresses at this parcel:';for (var addressloc in addressintersect){result += TextFormatting.NewLine + TextFormatting.NewLine + addressloc.FULLADDR + ' ' + addressloc.MUNICIPALITY + ' MO, ' + addressloc.ZIP;}return result + TextFormatting.NewLine",
		},
		{
			name: "tca-arcade",
			title: "<b>Tax Code Area:</b>",
			visible: true,
			expression: "var tcaintersect = First(Intersects($feature, FeatureSetByName($map, 'Tax Code Areas'))); return tcaintersect.Name;",
		},
		{
			name: "school-arcade",
			title: "<b>School District:</b>",
			visible: true,
			expression: "var schoolintersect = First(Intersects($feature, FeatureSetByName($map, 'School District'))); return schoolintersect.SCHOOL;",
		},
		{
			name: "water-arcade",
			title: "<b>Water District:</b>",
			visible: true,
			expression: "var waterintersect = First(Intersects($feature, FeatureSetByName($map, 'Water District'))); return waterintersect.WATER;",
		},
		{
			name: "fire-arcade",
			title: "<b>Fire District:</b>",
			visible: true,
			expression: "var fireintersect = First(Intersects($feature, FeatureSetByName($map, 'Fire District'))); return fireintersect.FIRE;",
		},
		{
			name: "library-arcade",
			title: "<b>Library District:</b>",
			visible: true,
			expression: "var libraryintersect = First(Intersects($feature, FeatureSetByName($map, 'Library District'))); return libraryintersect.LIBRARY;",
		},
		{
			name:  "measurement-arcade",
			title: "<b>Parcel Area:</b>",
			visible: true,
			expression: "var acres = Round(AreaGeodetic($feature, 'acres'), 2) + ' Acres'; var sqft = Text(AreaGeodetic($feature, 'square-feet'), '#,###.0') + ' Sq Ft'; var result = sqft + TextFormatting.NewLine +  acres; return result;",
		}],
		lastEditInfoEnabled: false,
		content: [
			{
				type: "fields",
				fieldInfos: [
				{
					fieldName: "ADDPTKEY",
					visible: true,
					label: "<b>Parcel Number:</b>",
				},
				{
					fieldName: "expression/address-inside-parcels-arcade",
					visible: true
				},
				{
					fieldName: "expression/tca-arcade",
					visible: true
				},
				{
					fieldName: "expression/school-arcade",
					visible: true
				},
				{
					fieldName: "expression/water-arcade",
					visible: true
				},
				{
					fieldName: "expression/fire-arcade",
					visible: true
				},
				{
					fieldName: "expression/library-arcade",
					visible: true
				},
				{
					fieldName:  "expression/measurement-arcade",
					visible: true
				}
			]}
		],
		actions: [getPropertyInfoThisAction]
	};

	var popuptemplParcels = {
		title: "<h6><b>Basic Information</b></h6>",
		outFields: ["*"],
		expressionInfos: [{
			name: "address-inside-parcels-arcade",
			title: "<b>Address:</b>",
			visible: true,
			expression: "var addressintersect = Intersects(FeatureSetByName($map,'Address Points'), $feature); var cnt = Count(addressintersect);var result = 'There are  ' + cnt + '  addresses at this parcel:';for (var addressloc in addressintersect){result += TextFormatting.NewLine + TextFormatting.NewLine + addressloc.FULLADDR + ' ' + addressloc.MUNICIPALITY + ' MO, ' + addressloc.ZIP;}return result + TextFormatting.NewLine",
		},
		{
			name: "tca-arcade",
			title: "<b>Tax Code Area:</b>",
			visible: true,
			expression: "var tcaintersect = First(Intersects($feature, FeatureSetByName($map, 'Tax Code Areas'))); return tcaintersect.Name;",
		},
		{
			name: "school-arcade",
			title: "<b>School District:</b>",
			visible: true,
			expression: "var schoolintersect = First(Intersects($feature, FeatureSetByName($map, 'School District'))); return schoolintersect.SCHOOL;",
		},
		{
			name: "water-arcade",
			title: "<b>Water District:</b>",
			visible: true,
			expression: "var waterintersect = First(Intersects($feature, FeatureSetByName($map, 'Water District'))); return waterintersect.WATER;",
		},
		{
			name: "fire-arcade",
			title: "<b>Fire District:</b>",
			visible: true,
			expression: "var fireintersect = First(Intersects($feature, FeatureSetByName($map, 'Fire District'))); return fireintersect.FIRE;",
		},
		{
			name: "library-arcade",
			title: "<b>Library District:</b>",
			visible: true,
			expression: "var libraryintersect = First(Intersects($feature, FeatureSetByName($map, 'Library District'))); return libraryintersect.LIBRARY;",
		},
		{
			name:  "measurement-arcade",
			title: "<b>Parcel Area:</b>",
			visible: true,
			expression: "var acres = Round(AreaGeodetic($feature, 'acres'), 2) + ' Acres'; var sqft = Text(AreaGeodetic($feature, 'square-feet'), '#,###.0') + ' Sq Ft'; var result = sqft + TextFormatting.NewLine +  acres; return result;",
		}],
		lastEditInfoEnabled: false,
		content: [
			{
				type: "fields",
				fieldInfos: [
				{
					fieldName: "Name",
					visible: true,
					label: "<b>Parcel Number:</b>",
				},
				{
					fieldName: "expression/address-inside-parcels-arcade",
					visible: true
				},
				{
					fieldName: "expression/tca-arcade",
					visible: true
				},
				{
					fieldName: "expression/school-arcade",
					visible: true
				},
				{
					fieldName: "expression/water-arcade",
					visible: true
				},
				{
					fieldName: "expression/fire-arcade",
					visible: true
				},
				{
					fieldName: "expression/library-arcade",
					visible: true
				},
				{
					fieldName:  "expression/measurement-arcade",
					visible: true
				}
			]}
		],
		actions: [getPropertyInfoThisAction]
	};

	theView.popup.on("trigger-action", function(event)
	{
		if (event.action.id === "propertyInfo")
		{
			getData();
		}
	});
	// this is needed to prevent the popup from automatically collapsing on mobile devices
	theView.popup.collapseEnabled = false;

	var addressPtsLayer = new FeatureLayer({
		url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer_Pub/FeatureServer/17",
		minScale: 10000,
		title: "Address Points",
		popupTemplate: popuptemplAddrPts
	});
	var parcelsren = {
		type: "simple",
		symbol: {
		type: "simple-fill",
		outline: { width: 1.5, color: [255, 170, 0, 0.5] },
		color: [255, 255, 255, 0]
	}};	
	parcelsLayer = new FeatureLayer({
		url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer_Pub/FeatureServer/18",
		outFields: ["Name"],
		minScale: 10000,
		title: "Tax Parcels",
		popupTemplate: popuptemplParcels,
		renderer: parcelsren
	});
	var dimensions = new MapImageLayer({
		url: "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/LotsAndDimensions/MapServer",
		title:"Property Features",
		visible: false,
		sublayers: [
		{
			id: 1,
			visible: true,
			title: "Builder Block Number",
		},{
			id: 3,
			visible: true,
			title: "Property Dimensions",
		},{
			id: 4,
			visible: true,
			title: "Lot Corners",
		},{
			id: 7,
			visible: true,
			title: "Lot Numbers",
		}]
	});

	var pastyearparcels = new MapImageLayer({
		url: "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/PastYearParcels/MapServer",
		outFields: ["Name"],
		minScale: 5000,
		title:"Past Year Parcels",
		visible: false
	});

	var oldLots = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/LotsAndDimensions/MapServer/8",
		visible: true,
		minScale: 5000,
		title: "Old Lots"
	});

	var newLots = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/portal/rest/services/Hosted/LotsPubView/FeatureServer/0",
		visible: true,
		minScale: 5000,
		title: "New Lots"
	});

	var lotsLayers = new GroupLayer({
		layers: [oldLots, newLots],
		visible: false,
		title: "Old and New Lots"
	});
	
	var cityboundaries = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/portal/rest/services/Hosted/MunicipalitiesPublic/FeatureServer/29",
		title:"City Boundaries",
		visible: true
	});

	var zoning = new MapImageLayer({
		url: "https://jcgis.jacksongov.org/arcgis/rest/services/PublicWorks/UnincorporatedZoning/MapServer",
		title:"Unincorporated Zoning",
		visible: false
	});

	var TIFplan = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/portal/rest/services/Hosted/TIF_District_Public_View/FeatureServer/0",
		//url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer/FeatureServer/33",
		title: "Tax Increment Financing (TIF) Districts",
		visible: false
	});
	var TIFproject = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/portal/rest/services/Hosted/TIF_Projects/FeatureServer/0",
		//url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer/FeatureServer/36",
		title: "Tax Increment Financing (TIF) Projects",
		visible: false
	});
	var CIDlayer = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/portal/rest/services/Hosted/CID/FeatureServer/0",
		//url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer/FeatureServer/35",
		title: "Community Improvement Districts",
		visible: false
	});
	var TDDlayer = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/portal/rest/services/Hosted/TDD_Public_View/FeatureServer/0",
		//url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer/FeatureServer/34",
		title: "Transportation Development Districts",
		visible: false
	});

	var specialassessment = new GroupLayer({
		layers: [TDDlayer, TIFproject, TIFplan, CIDlayer],
		title: "Special Assessment Districts",
		visible: false
	});

	var tcaren = {
		type: "simple",
		symbol: {
			type: "simple-fill",
			outline: { width: 2, color: [197, 63, 0, 0.5] },
			color: [255, 255, 255, 0]
		}
	};	

	var tcalayer = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/portal/rest/services/Hosted/TaxDistrictsPublicView/FeatureServer/0",
		//url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer/FeatureServer/30",
		title:"Tax Code Areas",
		visible: false,
		renderer: tcaren
	});

	// --------- this is lame to have to do this - can u not access layers in a group layer in Arcade??? ------
	var schoollayer = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/Parcel_Viewer_Layers/FeatureServer/28",
		//url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer/FeatureServer/28",
		title:"School District",
		visible: false
	});
	schoollayer.listMode = "hide";

	var firelayer = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/Parcel_Viewer_Layers/FeatureServer/27",
		//url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer/FeatureServer/27",
		title:"Fire District",
		visible: false
	});
	firelayer.listMode = "hide";

	var waterlayer = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/Parcel_Viewer_Layers/FeatureServer/26",
		//url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer/FeatureServer/26",
		title:"Water District",
		visible: false
	});
	waterlayer.listMode = "hide";

	var librarylayer = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/Parcel_Viewer_Layers/FeatureServer/31",
		//url: "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer/FeatureServer/31",
		title:"Library District",
		visible: false
	});
	librarylayer.listMode = "hide";
	// ----------------------- End of lame stuff ----------------

	var districtLayers = new MapImageLayer({
		url: "https://jcgis.jacksongov.org/arcgis/rest/services/Cadastral/Parcel_Viewer_Layers/MapServer",
		title: "School, Water, Library & Fire Districts",
		visible: false,
		sublayers: [
		{
			id: 27,
			visible: false,
			title: "Fire Districts"
		},{
			id: 31,
			visible: false,
			title: "Library Districts",
		},{
			id: 26,
			visible: false,
			title: "Water Districts"
		},{
			id: 28,
			visible: false,
			title: "School Districts"
		}]
	});

	var townshipsection = new MapImageLayer({
		url: "https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer",
		title: "Section-Township-Range",
		visible: false
	});

	const book = "$feature.Book";
	var subdivisionRen = {
		type: "unique-value",
		valueExpression: `When(${book}[3] == '1', 1, ${book}[3] == '2', 2,  ${book}[3] == '2', 2,  ${book}[3] == '3', 3,  ${book}[3] == '4', 4,  ${book}[3] == '5', 5,  ${book}[3] == '6', 6,  ${book}[3] == '7', 7,  ${book}[3] == '8', 8, ${book}[3] == '9', 9, 0)`,
		uniqueValueInfos: [
		{
			value: "0",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [128, 128, 128, 1] },
				color: [128, 128, 128, 0.6] // gray
			}
		},{
			value: "1",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [255, 0, 0, 1] },
				color: [255, 0, 0, 0.6] // red
			}
		},{
			value: "2",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [0, 255, 0, 1] },
				color: [0, 255, 0, 0.6] // green
			}
		},{
			value: "3",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [0, 0, 255, 1] },
				color: [0, 0, 255, 0.6] // blue
			}
		},{
			value: "4",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [128, 0, 0, 1] },
				color: [128, 0, 0, 0.6] // maroon
			}
		},{
			value: "5",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [128, 0, 128, 1] },
				color: [128, 0, 128, 0.6] // purple
			}
		},{
			value: "6",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [255, 255, 0, 1] },
				color: [255, 255, 0, 0.6] // yellow
			}
		},{
			value: "7",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [0, 255, 255, 1] },
				color: [0, 255, 255, 0.6] // aqua
			}
		},{
			value: "8",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [255, 0, 255, 1] },
				color: [255, 0, 255, 0.6] // fuschia
			}
		},{
			value: "9",
			symbol: {
				type: "simple-fill",
				outline: { width: 2, color: [0, 128, 128, 1] },
				color: [0, 128, 128, 0.6] // teal
			}
		}
	]        
	}; // end of subdivisionRen	
	var subdivisionsLayer = new FeatureLayer({
		url: "https://jcgis.jacksongov.org/portal/rest/services/Hosted/SubdivisionsPublic/FeatureServer/0",
		title: "Subdivisions",
		renderer: subdivisionRen,
		visible: false
	});

	var CountyOutlineLayer = Layer.fromPortalItem({
		portalItem: { id: "bb4ba391fbfa4e74881ed659fa54ee14" }
	});

	theMap.add(CountyOutlineLayer);
	theMap.add(townshipsection);
	theMap.add(districtLayers);
	theMap.add(tcalayer);
	theMap.add(specialassessment);
	theMap.add(subdivisionsLayer);
	theMap.add(zoning);
	theMap.add(cityboundaries);
	theMap.add(lotsLayers);
	theMap.add(pastyearparcels);
	theMap.add(dimensions);
	theMap.add(addressPtsLayer);
	theMap.add(parcelsLayer);
	// ---- lame layers ---
	theMap.add(schoollayer);
	theMap.add(firelayer);
	theMap.add(waterlayer);
	theMap.add(librarylayer);
	// end of lame layers ---

	var homeBtn = new Home({
		view: theView
	});
	theView.ui.add(homeBtn, "top-leading");

	// Search widget
	searchWidget = new Search({
		view: theView,
		sources: 
		[{
			layer: addressPtsLayer,
			searchFields: ["FULLADDR"],
			searchTerm: ["FULLADDR"],
			suggestionTemplate: "{FULLADDR}, {MUNICIPALITY} {ZIP}",
			exactMatch: false,
			placeholder: "Search by street address",
			name: "Search by Street Address",
			maxResults: 12,
			maxSuggestions: 12,
			suggestionsEnabled: true,
			minSuggestCharacters: 3,
			popupEnabled: true,
			sourceIndex: 0
		},{
			layer: parcelsLayer,
			searchFields: ["Name"],
			searchTerm: ["Name"],
			suggestionTemplate: "{Name}",
			exactMatch: true,
			placeholder: "Search by tax parcel #",
			name: "Search by Parcel #",
			maxResults: 12,
			maxSuggestions: 12,
			suggestionsEnabled: true,
			minSuggestCharacters: 3,
			popupEnabled: true,
			sourceIndex: 1
		}],
		searchAllEnabled: true,
		allPlaceholder: "Search by street address or tax parcel #",
		includeDefaultSources: false
	})

	// Basemap widget
	var basemapGallery = new BasemapGallery({
		view: theView,
		container: document.createElement("div")
	});
	var bgExpand = new Expand({
		view: theView,
		expandTooltip: "Basemap",
		content: basemapGallery
	});

	// Layer list widget
	var layerList = new LayerList({
		view: theView
	});
	var layerlistExpand = new Expand({
		view: theView,
		expandTooltip: "Layer List",
		content: layerList
	});

	// Measure widget functions
	// ------------------------------------
	var activeWidget = null;
	document.getElementById("distanceButton").addEventListener("click", function()
	{
		setActiveWidget(null);
		if (!this.classList.contains("active")) setActiveWidget("distance");
		else setActiveButton(null);
	});
	document.getElementById("areaButton").addEventListener("click", function()
	{
		setActiveWidget(null);
		if (!this.classList.contains("active")) setActiveWidget("area");
		else setActiveButton(null);
	});
	function setActiveWidget(type)
	{
		switch (type)
		{
		case "distance":
			activeWidget = new DistanceMeasurement2D({
				view: theView,
				unit: "us-feet"
			});
			activeWidget.viewModel.start();
			theView.ui.add(activeWidget, "top-right");
			setActiveButton(document.getElementById("distanceButton"));
			break;
		case "area":
			activeWidget = new AreaMeasurement2D({
				view: theView,
				unit: "square-us-feet"
			});
			activeWidget.viewModel.start();
			theView.ui.add(activeWidget, "top-right");
			setActiveButton(document.getElementById("areaButton"));
			break;
		case null:
			if (activeWidget)
			{
				theView.ui.remove(activeWidget);
				activeWidget.destroy();
				activeWidget = null;
			}
			break;
		} 
	}
	function setActiveButton(selectedButton)
	{
		theView.focus();
		var elements = document.getElementsByClassName("active");
		for (var i = 0; i < elements.length; i++)
			elements[i].classList.remove("active");
		if (selectedButton)
			selectedButton.classList.add("active");
	}
	var measureExpand = new Expand({
		view: theView,
		expandIconClass: "esri-icon-measure",
		expandTooltip: "Measurement",
		content: measureDiv
	});
	// end of measure widget functions
	// --------------------------------------------

	// Print widget
	var thePrint = new Print({
		view: theView,
		printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
	});
	var printExpand = new Expand({
		view: theView,
		content: thePrint
	});

	//-------------------------------------------------------------------
	//	The next section collapses the other tools when one is selected
	//-------------------------------------------------------------------
	OnlyBasemap = watchUtils.pausable(bgExpand, "expanded", function(newValue, oldValue)
	{
		if(newValue == true)
		{
			if(bgExpand.expanded)
			{
				printExpand.collapse();
				layerlistExpand.collapse();
				measureExpand.collapse();
			}
		}
	});

	OnlyLayer = watchUtils.pausable(layerlistExpand, "expanded", function(newValue, oldValue)
	{
		if(newValue == true)
		{
			if(layerlistExpand.expanded)
			{
				bgExpand.collapse();
				printExpand.collapse();
				measureExpand.collapse();
			}
		}
	});

	OnlyMeasure = watchUtils.pausable(measureExpand, "expanded", function(newValue, oldValue)
	{
		if(newValue == true)
		{
			if(measureExpand.expanded)
			{
				bgExpand.collapse();
				printExpand.collapse();
				layerlistExpand.collapse();
			}
		}
	});

	OnlyPrint = watchUtils.pausable(printExpand, "expanded", function(newValue, oldValue)
	{
		if(newValue == true)
		{
			if(printExpand.expanded)
			{
				bgExpand.collapse();
				layerlistExpand.collapse();
				measureExpand.collapse();
			}
		}
	});
	//-------------------------------------------------------------------
	//	End of widget collapse section
	//-------------------------------------------------------------------

	//	This adds the widgets to the view	
	theView.ui.add([
	{
		component: searchWidget,
		position: "top-right",
		index: 0
	}, {
		component: bgExpand,
		position: "top-right",
		index: 1
	}, {
		component: layerlistExpand,
		position: "top-right",
		index: 2
	}, {
		component: measureExpand,
		position: "top-right",
		index: 3
	}, {
		component: printExpand,
		position: "top-right",
		index: 4
	}, {
		component: helpbutton,
		position: "top-right",
		index: 5
	}, {
		component: questionsbutton,
		position: "top-right",
		index: 6
	}
	]);

	// this is exclusively for handling clicking on a parcel
	theView.on("click", (event) =>
	{
		// first, unselect any currently selected parcels (except if it's the first thing a user does after a page load)
		if(parcelnum != null) unselectParcel();
		// turn off info panel when new search is made
		document.getElementById("infoDiv").style.display = "none";

		// get the parcel number from the selected parcel
		theView.hitTest(event).then((response) =>
		{
			// get the parcel number
			parcelnum = response.results[0].graphic.attributes.Name;
			// then select the parcel
			selectParcel();
		});
	});

	searchWidget.on("search-start", function()
	{
		// unselect any currently selected parcels when the user starts a new search (except if it's the first thing a user does after a page load)
		if(parcelnum != null) unselectParcel();
		// turn off info panel when new search is made
		document.getElementById("infoDiv").style.display = "none";
	});

	// this handles getting the address or tax parcel # from the search widget
	searchWidget.on("select-result", function()
	{
		var searchexpression = new RegExp("^([0-9]{2}-)");
		var testexp	= searchexpression.test(searchWidget.searchTerm);
		if(testexp == false) // searching address points layer
		{
			selectParcelFromAddressPts();
			// Zoom to the selected parcel
			theView.goTo({ scale: 800 });
			//theView.goTo(theExtent);
		}
		if(testexp == true) // searching tax parcels layer
		{
			parcelnum = searchWidget.searchTerm;
			selectParcel();
		}
	});
/* 		
		if(searchWidget.selectedResult  == -1) // searching address points layer
		{
			selectParcelFromAddressPts();
			// Zoom to the selected parcel
			theView.goTo({ scale: 800 });
			//theView.goTo(theExtent);
		}
		if(searchWidget.activeSourceIndex == 1) // searching tax parcels layer
		{
			parcelnum = searchWidget.searchTerm;
			selectParcel();
		}
	}); */

	// this is called from the searchWidget.on handler above when user searches via address
	function selectParcelFromAddressPts()
	{
		var temp = searchWidget.searchTerm;
		var addr = temp.split(",")[0];

		var ptsQuery = addressPtsLayer.createQuery();
		ptsQuery.where = "FULLADDR = '" + addr + "'";
		ptsQuery.outFields = ["ADDPTKEY"];

		addressPtsLayer.queryFeatures(ptsQuery).then(function(response)
		{
			parcelsQuery = parcelsLayer.createQuery();
			parcelnum = response.features[0].attributes["ADDPTKEY"];
			parcelsQuery.where = "Name = '" + parcelnum + "'";

			parcelsLayer.queryFeatures(parcelsQuery).then(function(newresponse)
			{
				theView.whenLayerView(parcelsLayer).then(function(layerView)
				{
					var feature = newresponse.features[0];
					selectedParcel = layerView.highlight(feature.attributes["OBJECTID"]);

					// open the popup
					theView.popup.open(
					{
						features: newresponse.features
					});
				});
			});
		});
	}
}); // end of require

function getData()
{
	// first get the xcoord and ycoord for the econ districts and elected officials, then need to call the other functions from inside the fetch statement to make it wait for xcoord and ycoord to finish
	// this is done by getting the centroid of the parcel using the parcel number
	var XYurl = "https://services3.arcgis.com/4LOAHoFXfea6Y3Et/arcgis/rest/services/ParcelViewer_Pub/FeatureServer/18/query?where=Name%3D%27" + parcelnum + "%27&geometryType=esriGeometryPolygon&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=true&outFields=*&returnGeometry=true&returnCentroid=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&returnZ=false&returnM=false&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson";
	
	spinner.style.display = "block";
	
	fetch(XYurl).then(data => data.json()).then((result) =>
	{
		var obj1 = JSON.stringify(result);
		var obj2 = JSON.parse(obj1);

		xcoord = obj2.features[0].centroid.x;
		ycoord = obj2.features[0].centroid.y;

		getInfoAndPhotos();
		getEconDistricts();
		getElectedOfficials();

		document.getElementById("basicvalueinfo").className = "container-fluid tab-pane active";
		document.getElementById("basicvaluetab").className = "nav-link active";
		document.getElementById("ownertab").className = "nav-link";
		document.getElementById("econtab").className = "nav-link";
		document.getElementById("photostab").className = "nav-link";
		document.getElementById("toolstab").className = "nav-link";
		document.getElementById("electedtab").className = "nav-link";
		document.getElementById("faqtab").className = "nav-link";
		
	}).then(() => // doing this, plus the one second delay below, makes the bottom info panel delay showing long enough to wait for all the data to load
	{	
		setTimeout(function()
		{
			spinner.style.display = "none";
			infoDiv.style.display = "block";
		},1000);
	});
	theView.popup.close(); // hide the popup
}

function selectParcel()
{
	parcelsQuery = parcelsLayer.createQuery();
	parcelsQuery.where = "Name = '" + parcelnum + "'";

	parcelsLayer.queryFeatures(parcelsQuery).then(function(response)
	{
		theView.whenLayerView(parcelsLayer).then(function(layerView)
		{
			var feature = response.features[0];
			selectedParcel = layerView.highlight(feature.attributes["OBJECTID"]);
		});
	});
}

function unselectParcel()
{
	if(selectedParcel) selectedParcel.remove();
}

// This is for the info container resizing functionality
$(document).ready(function ()
{
	$(".resizable").resizable({ handles: {'n': '#infoDivHeader' }});
});

function closeMe(id)
{
	if(id == "videoContainer")
	{
		helpVideo.pause();
		helpVideo.currentTime = 0;
	}
	document.getElementById(id).style.display = "none";
}

function openHelp()
{
	helpContainer.style.display = "block";
}

function openVideo()
{
	videoContainer.style.display = "block";
}

function question()
{
	window.open("https://arcg.is/1zWmnK");
}

function correctPropertyInfo()
{
	window.open("https://survey123.arcgis.com/share/6f3b43141488445688e75d6aeb816cc6?" + "field:parcelnum=" + parcelnum + "&field:mailaddress=" + situs_address + "&field:land_area=" + lot_sqft); // done
}

function changeAddress()
{
	window.open("https://survey123.arcgis.com/share/080b056084104f4399fc75f3620f0e41?" + "field:property_number_from_tax_bill=" + parcelnum); // done
}

function mergeProperty()
{
	window.open("http://www.google.com"); // placeholder
}

function PrintStuff()
{
	var mapImg;
	var printWindow = window.open('', '', 'height=600px,width=800px');
	printWindow.document.write('<html><body>');
	var timestamp = Date(Date.now());
	printWindow.document.write('<b>Report Created: </b> ' + timestamp.toString() + '<br/>');

	if (chkInfo.checked == true)
	{
		var divParcelNum = document.getElementById("lblParcelNum").innerText;
		var divSitusAddr = document.getElementById("lblSitusAddr").innerText;
		var divSitusCityStateZip = document.getElementById("lblSitusCityStateZip").innerText;
		var divLotSize = document.getElementById("lblLotSize").innerText;
		var divBldgSqFt = document.getElementById("lblBldgSqFt").innerText;
		var divNumBeds = document.getElementById("lblNumBR").innerText;
		var divNumBaths = document.getElementById("lblNumBaths").innerText;
		var divYearBuilt = document.getElementById("lblYearBuilt").innerText;
		var divTCA = document.getElementById("lblTCA").innerText;
		var divusecode = document.getElementById("lblUseCode").innerText;
		var divExemption = document.getElementById("lblExemption").innerText;
		var divLegalDescr = document.getElementById("lblLegalDescr").innerText;

		printWindow.document.write('<table style="width:100%">');
		printWindow.document.write('<tr><h1><b>Basic Information</b></h1></tr>');
		printWindow.document.write('<tr><td><b>Parcel #</b></td><td>' + divParcelNum + '</td></tr>');
		printWindow.document.write('<tr><td><b>Address:</b></td><td>' + divSitusAddr + '</td></tr>');
		printWindow.document.write('<tr><td></td><td>' + divSitusCityStateZip + '</td></tr>');
		printWindow.document.write('<tr><td><b>Lot Size:</b></td><td>' + divLotSize + '</td></tr>');
		printWindow.document.write('<tr><td><b>Bldg sq ft:</b></td><td>' + divBldgSqFt + '</td></tr>');
		printWindow.document.write('<tr><td><b>#Beds:&nbsp&nbsp&nbsp</b>' + divNumBeds + '</td><td><b>#Baths:&nbsp&nbsp&nbsp</b>' + divNumBaths + '</td></tr>');
		printWindow.document.write('<tr><td><b>Year Built:</b></td><td>' + divYearBuilt + '</td></tr>');
		printWindow.document.write('<tr><td><b>Tax Code Area:</b></td><td>' + divTCA + '</td></tr>');
		printWindow.document.write('<tr><td><b>Land Use Code:</b></td><td>' + divusecode + '</td></tr>');
		printWindow.document.write('<tr><td><b>Exemption:</b></td><td>' + divExemption + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2><b>Legal Description:</b></td></tr>');
		printWindow.document.write('<tr><td colspan=2>' + divLegalDescr + '</td></tr>');
		printWindow.document.write('</table>');

		var divYear0 = document.getElementById("lblYear0").innerText;
		var divYear1 = document.getElementById("lblYear1").innerText;
		var divYear2 = document.getElementById("lblYear2").innerText;
		var divYear3 = document.getElementById("lblYear3").innerText;

		var divYear0AgLand = document.getElementById("lblYear0AgLand").innerText;		var divYear1AgLand = document.getElementById("lblYear1AgLand").innerText;		var divYear2AgLand = document.getElementById("lblYear2AgLand").innerText;		var divYear3AgLand = document.getElementById("lblYear3AgLand").innerText;
		var divYear0CommLand = document.getElementById("lblYear0CommLand").innerText;	var divYear1CommLand = document.getElementById("lblYear1CommLand").innerText;	var divYear2CommLand = document.getElementById("lblYear2CommLand").innerText;	var divYear3CommLand = document.getElementById("lblYear3CommLand").innerText;
		var divYear0ResLand = document.getElementById("lblYear0ResLand").innerText;	var divYear1ResLand = document.getElementById("lblYear1ResLand").innerText;	var divYear2ResLand = document.getElementById("lblYear2ResLand").innerText;	var divYear3ResLand = document.getElementById("lblYear3ResLand").innerText;
		
		var divYear0AgImp = document.getElementById("lblYear0AgImp").innerText;		var divYear1AgImp = document.getElementById("lblYear1AgImp").innerText;		var divYear2AgImp = document.getElementById("lblYear2AgImp").innerText;		var divYear3AgImp = document.getElementById("lblYear3AgImp").innerText;
		var divYear0CommImp = document.getElementById("lblYear0CommImp").innerText;	var divYear1CommImp = document.getElementById("lblYear1CommImp").innerText;	var divYear2CommImp = document.getElementById("lblYear2CommImp").innerText;	var divYear3CommImp = document.getElementById("lblYear3CommImp").innerText;
		var divYear0ResImp = document.getElementById("lblYear0ResImp").innerText;		var divYear1ResImp = document.getElementById("lblYear1ResImp").innerText;		var divYear2ResImp = document.getElementById("lblYear2ResImp").innerText;		var divYear3ResImp = document.getElementById("lblYear3ResImp").innerText;
		
		var divYear0AgNC = document.getElementById("lblYear0AgNC").innerText;			var divYear1AgNC = document.getElementById("lblYear1AgNC").innerText;			var divYear2AgNC = document.getElementById("lblYear2AgNC").innerText;			var divYear3AgNC = document.getElementById("lblYear3AgNC").innerText;
		var divlblYear0CommNC = document.getElementById("lblYear0CommNC").innerText;	var divlblYear1CommNC = document.getElementById("lblYear1CommNC").innerText;	var divlblYear2CommNC = document.getElementById("lblYear2CommNC").innerText;	var divlblYear3CommNC = document.getElementById("lblYear3CommNC").innerText;
		var divYear0ResNC = document.getElementById("lblYear0ResNC").innerText;		var divYear1ResNC = document.getElementById("lblYear1ResNC").innerText;		var divYear2ResNC = document.getElementById("lblYear2ResNC").innerText;		var divYear3ResNC = document.getElementById("lblYear3ResNC").innerText;
		
		var divYear0TMV = document.getElementById("lblYear0TMV").innerText;			var divYear1TMV = document.getElementById("lblYear1TMV").innerText;			var divYear2TMV = document.getElementById("lblYear2TMV").innerText;			var divYear3TMV = document.getElementById("lblYear3TMV").innerText;
		var divYear0TAV = document.getElementById("lblYear0TAV").innerText;			var divYear1TAV = document.getElementById("lblYear1TAV").innerText;			var divYear2TAV = document.getElementById("lblYear2TAV").innerText;			var divYear3TAV = document.getElementById("lblYear3TAV").innerText;
		var divYear0TTV = document.getElementById("lblYear0TTV").innerText;			var divYear1TTV = document.getElementById("lblYear1TTV").innerText;			var divYear2TTV = document.getElementById("lblYear2TTV").innerText;			var divYear3TTV = document.getElementById("lblYear3TTV").innerText;
			
		var divOwner1Name = document.getElementById("lblOwner1Name").innerText;
		var divOwner1Addr = document.getElementById("lblOwner1Address").innerText;
		//var divOwner1CityStateZip = document.getElementById("lblowner1citystatezipcountry").innerText;

		printWindow.document.write('<table style="width:100%">');
		printWindow.document.write('<tr><h1><b>Property Values</b></h1></tr>');
		printWindow.document.write('<tr><td colspan=2><b>Value Type</b></td><td><b>' + divYear0 + '</b></td><td><b>' + divYear1 + '</b></td><td><b>' + divYear2 + '</b></td><td><b>' + divYear3 + '</b></td></tr>');
		printWindow.document.write('<tr><td colspan=2><u>Land Value</u></td><td colspan=4></td></tr>');
		printWindow.document.write('<tr><td colspan=2>Agricultural:</td><td>' + divYear0AgLand + '</td><td>' + divYear1AgLand + '</td><td>' + divYear2AgLand + '</td><td>' + divYear3AgLand + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Commercial:</td><td>' + divYear0CommLand + '</td><td>' + divYear1CommLand + '</td><td>' + divYear2CommLand + '</td><td>' + divYear3CommLand + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Residential:</td><td>' + divYear0ResLand + '</td><td>' + divYear1ResLand + '</td><td>' + divYear2ResLand + '</td><td>' + divYear3ResLand + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2><u>Improvements Value</u></td><td colspan=4</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Agricultural:</td><td>' + divYear0AgImp + '</td><td>' + divYear1AgImp + '</td><td>' + divYear2AgImp + '</td><td>' + divYear3AgImp + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Commercial:</td><td>' + divYear0CommImp + '</td><td>' + divYear1CommImp + '</td><td>' + divYear2CommImp + '</td><td>' + divYear3CommImp + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Residential:</td><td>' + divYear0ResImp + '</td><td>' + divYear1ResImp + '</td><td>' + divYear2ResImp + '</td><td>' + divYear3ResImp + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2><u>New Construction Value</u></td><td colspan=4</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Agricultural:</td><td>' + divYear0AgNC + '</td><td>' + divYear1AgNC + '</td><td>' + divYear2AgNC + '</td><td>' + divYear3AgNC + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Commercial:</td><td>' + divlblYear0CommNC + '</td><td>' + divlblYear1CommNC + '</td><td>' + divlblYear2CommNC + '</td><td>' + divlblYear3CommNC + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Residential:</td><td>' + divYear0ResNC + '</td><td>' + divYear1ResNC + '</td><td>' + divYear2ResNC + '</td><td>' + divYear3ResNC + '</td></tr>');
		printWindow.document.write('</table>');
		printWindow.document.write('<hr>');
		printWindow.document.write('<table style="width:100%">');
		printWindow.document.write('<tr><td colspan=2>Total Market Value:</td><td>' + divYear0TMV + '</td><td>' + divYear1TMV + '</td><td>' + divYear2TMV + '</td><td>' + divYear3TMV + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Total Assessed Value:</td><td>' + divYear0TAV + '</td><td>' + divYear1TAV + '</td><td>' + divYear2TAV + '</td><td>' + divYear3TAV + '</td></tr>');
		printWindow.document.write('<tr><td colspan=2>Total Taxable Value:</td><td>' + divYear0TTV + '</td><td>' + divYear1TTV + '</td><td>' + divYear2TTV + '</td><td>' + divYear3TTV + '</td></tr>');
		printWindow.document.write('</table>');

		printWindow.document.write('<table style="width:100%">');
		printWindow.document.write('<tr><h1><b>Primary Owner</b></h1></tr>');
		printWindow.document.write('<tr><td>' + divOwner1Name + '</td></tr>');
		printWindow.document.write('<tr><td>' + divOwner1Addr + '</td></tr>');
		//printWindow.document.write('<tr><td>' + divOwner1CityStateZip + '</td></tr>');
		printWindow.document.write('</table>');
	}
	if (chkPhotos.checked == true)
	{
		// always put this on a new page
		printWindow.document.write('<p style="page-break-before: always;">&nbsp;</p>');
			
		printWindow.document.write('<h1><b>Photos</b></h1>');
		for(var i = 0; i < photoCount; i++)
		{
			printWindow.document.write("<img src='" + photos_array[i] + "' style='width:100%'/>");
		}
	}

	if (chkMap.checked == true)
	{
		// always put this on a new page
		printWindow.document.write('<p style="page-break-before: always;">&nbsp;</p>');

		theView.takeScreenshot().then(function(screenshot)
		{
			mapImg = screenshot.dataUrl;
			printWindow.document.write('<h1><b>Map</b></h1>');
			printWindow.document.write("<img src='" + mapImg + "' style='width:100%,height:100%;'/>");		
		});
	}

	printWindow.document.write('</body></html>');
	
	//delay just slightly - 0.5 seconds - this ensures that map and photos load into browser's print preview
	printWindow.setTimeout(function()
	{	
		printWindow.print();

	}, 500);

} // end of PrintStuff function

// This is called when the user clicks on one of the buttons to do a BOE appeal
function doAppeal(appealtype)
{
	var LatLongServiceURL = "https://jcgis.jacksongov.org/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102698&outSR=4326&geometries=%7B%0D%0A++%22geometryType%22+%3A+%22esriGeometryPoint%22%2C%0D%0A++%22geometries%22+%3A+%5B%0D%0A+++++%7B%0D%0A+++++++%22x%22+%3A+" + xcoord + "%2C++++++++%22y%22+%3A+" + ycoord + "%0D%0A+++++%7D%0D%0A++%5D%0D%0A%7D&transformation=&transformForward=true&vertical=false&f=pjson";

	fetch(LatLongServiceURL).then(data => data.json()).then((result) =>
	{
		var obj1 = JSON.stringify(result);
		var obj2 = JSON.parse(obj1);
		lat = obj2.geometries[0].x;
		lon = obj2.geometries[0].y;
	}).then(() => // force it to wait for lat and lon to arrive
	{
		if(appealtype == "formal")
			window.open("https://survey123.arcgis.com/share/717d975e6b914f53b2a0fa7c546331a7?" + "field:situs_or_location_address=" + situs_address + 
				"&field:parcel_number=" + parcelnum + "&field:tax2=" + legaldescription + "&field:ownerappellant=" + owner + 
				"&field:prop_use_jan=" + landusecode + "&field:tca=" + TCA + "&field:nbhd=" + nhood + "&field:exemption=" + exemption + "&field:ascend_bldg_sqft=" + bldg_sqft + 
				"&field:ascend_num_beds=" + num_beds + "&field:ascend_num_baths=" + num_baths +  "&field:bv_ag_lnd=" + land_ag_val + 
				"&field:bv_com_lnd=" + land_com_val + "&field:bv_res_lnd=" + land_res_val + "&field:bv_ag_imp=" + imp_ag_val + "&field:bv_com_imp=" + imp_com_val + 
				"&field:bv_res_imp=" + imp_res_val + "&field:bv_ag_nc=" + newcon_ag_val + "&field:bv_com_nc=" + newcon_com_val + "&field:bv_res_nc=" + newcon_res_val + 
				"&field:bv_tm=" + TMV + "&field:bv_ta=" + TAV + "&field:bv_tt=" + TTV + "&field:ascend_year_built=" + year_built + "&center=" + lon + "," + lat, '_self');
		else //appealtype == "informal"
			window.open("https://survey123.arcgis.com/share/5d04b51f6a4748568e64cc86c1462183?" + "field:situs_or_location_address=" + situs_address + 
				"&field:parcel_number=" + parcelnum + "&field:tax2=" + legaldescription + "&field:ownerappellant=" + owner + 
				"&field:prop_use_jan=" + landusecode + "&field:tca=" + TCA + "&field:nbhd=" + nhood + "&field:exemption=" + exemption + "&field:ascend_bldg_sqft=" + bldg_sqft + 
				"&field:ascend_num_beds=" + num_beds + "&field:ascend_num_baths=" + num_baths +  "&field:bv_ag_lnd=" + land_ag_val + 
				"&field:bv_com_lnd=" + land_com_val + "&field:bv_res_lnd=" + land_res_val + "&field:bv_ag_imp=" + imp_ag_val + "&field:bv_com_imp=" + imp_com_val + 
				"&field:bv_res_imp=" + imp_res_val + "&field:bv_ag_nc=" + newcon_ag_val + "&field:bv_com_nc=" + newcon_com_val + "&field:bv_res_nc=" + newcon_res_val + 
				"&field:bv_tm=" + TMV + "&field:bv_ta=" + TAV + "&field:bv_tt=" + TTV + "&field:ascend_year_built=" + year_built + "&center=" + lon + "," + lat, '_self');
	});
}