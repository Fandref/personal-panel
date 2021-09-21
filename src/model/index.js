import sampleData from "../mocks";

// All files in current directory just process imitation ©Andrew Stepanchuk

let localStorage = window.localStorage
export const API =  {
    loadModel(nameModel){
        let returnData = sampleData[nameModel];
        if(localStorage.getItem(nameModel)){
            returnData = JSON.parse(localStorage.getItem(nameModel))
        }
        else if(sampleData[nameModel]){
            this.saveModel(nameModel, returnData);
             
        }
        else{
            throw new Error(`Model "${nameModel}" not found`)
        }

        return new Promise((resolve) => {
            resolve(returnData)
        })
        
    },
    saveModel(nameModel, modelData){
        const modeldata = JSON.stringify(modelData);
        localStorage.setItem(nameModel, modeldata);

        return new Promise((resolve) => {
            resolve(true)
        });
    }
}
