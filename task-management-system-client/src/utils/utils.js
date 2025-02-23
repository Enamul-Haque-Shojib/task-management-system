
export const setTokenIntoLocalStorage = async (token) => {

    console.log('token-->>', token)
   
      localStorage.setItem('TaskManagementSystemToken', JSON.stringify(token));
  }