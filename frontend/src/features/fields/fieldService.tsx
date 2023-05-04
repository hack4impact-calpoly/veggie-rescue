import axios from 'axios';

const API_URL = '/api/fields/';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

interface fieldServiceObject {
    EntityType: [String],
    LocationType: [String],
    CombinedAreaName: [String],
    OrgStructure: [String],
    DemographicsServed: [String],
    FoodDistModel: [String],
    FoodTypes: [String],
}

const getFields = async (token: string) => {

};

const getFieldByName = async (token: string) => {

};

const createField = async (token: string) => {

};

const editField = async (token: string) => {

};

const deleteField = async (token: string) => {

};

const fieldService = {
    getFields,
    getFieldByName,
    createField,
    editField,
    deleteField,
};

export default fieldService;