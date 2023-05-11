import axios from 'axios';

const API_URL = '/api/fields/';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const API_URL = '${SERVER_URL}/api/fields/';

interface FieldServiceObject {
  EntityType: [String];
  LocationType: [String];
  CombinedAreaName: [String];
  OrgStructure: [String];
  DemographicsServed: [String];
  FoodDistModel: [String];
  FoodTypes: [String];
}

const getFields = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getFieldByName = async (fieldName: string, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    const response = await axios.get(`${API_URL}?name=${fieldName}`, config);
    return response.data;
};

const createField = async (fieldData: fieldServiceObject, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post(API_URL, fieldData, config);
      return response.data;
};

const editField = async (fieldData: fieldServiceObject, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post(API_URL, fieldData, config);
      return response.data;
};

const deleteField = async (fieldId: string, token: string) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    const response = await axios.delete(`${API_URL}${fieldId}/`, config);
    return response.data;
};

const fieldService = {
  getFields,
  getFieldByName,
  createField,
  editField,
  deleteField
};

export default fieldService;
