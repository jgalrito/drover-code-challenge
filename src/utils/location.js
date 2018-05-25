const
	autoCompleteService = new window.google.maps.places.AutocompleteService(),
	geocoderService = new window.google.maps.Geocoder()

export const getPredictions = (options, callback) => new Promise(resolve => autoCompleteService.getPlacePredictions(options, resolve))

export const reverseGeocode = location => console.log(location) || new Promise(resolve => geocoderService.geocode({location}, resolve))