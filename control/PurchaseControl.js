import { AddNewPurchaseToCurrentSheet } from '../redux/SheetsSlice';
import { savePurchaseAndGetIdAsync } from '../persistance/local_persistance/PurchaseDAO';

export const createPurchaseControl = async (dispatch, newPurchaseInputDataObject) => {

  let newPurchaseId = -1;
  // Check if all required properties are present and not null
  if (
    newPurchaseInputDataObject &&
    newPurchaseInputDataObject.currentCategoryId != null &&
    newPurchaseInputDataObject.currentItemId != null &&
    newPurchaseInputDataObject.purchase != null
  ) {
    // Insert purchase to local DB
    try {
      newPurchaseId = await savePurchaseAndGetIdAsync(newPurchaseInputDataObject.purchase);
      console.log('Purchase created in local database');
    } catch (error) {
      console.error('Error creating purchase in local DB in control', error);
    }
    // Dispatch the purchase to Redux store
    newPurchaseInputDataObject.purchase.id = newPurchaseId; // First set the new id to purchase object 
    dispatch(AddNewPurchaseToCurrentSheet(newPurchaseInputDataObject));

  } else {
    throw new Error('One or more required properties are missing or null in createPurchaseControl');
  }
};



