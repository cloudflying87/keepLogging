
import API from '../../utils/API'

const getAircraftTypesFunction = async () => {
    API.getAircraftTypes()
        .then(({ data }) => {
            let filteredResults = []
            let uniqueId = []
            for (let i = 0; i < data.length; i++) {
                if (!uniqueId.includes(data[i].AircraftId)) {
                    if (data[i]['Aircraft.tailNumber'] != null) {
                        // filteredResults.push(data[i]['Aircraft.tailNumber'] + ' ' + data[i]['Aircraft.AircraftModel.description'])
                        filteredResults.push(data[i])
                        uniqueId.push(data[i].AircraftId)
                    }
                }

            }

            console.log(filteredResults.sort((a) => a.AircraftId))
            return filteredResults
        })
};

export default getAircraftTypesFunction;