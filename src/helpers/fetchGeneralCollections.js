import { withAsync } from "./withAsync";
import { fetchExpensesCategories } from "../api/generalApi";

export const  getExpenseCategories = async () => {
    const { response, error } = await withAsync(fetchExpensesCategories);

    if ( error ) {
        return null
    }
    
    return response.data.data
}