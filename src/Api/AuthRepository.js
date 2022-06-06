import axios from "./config";
// import cookies from "js-cookie";
class AuthRepository {
    async UserRegister(params) {
        
        const reponse = await axios.post(`/register`, params)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
        return reponse;
    }

    async UserLogin(credentials) {
        
        const reponse = await axios.post(`/login`, credentials)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
        return reponse;
    }

    async BookRegister(params) {
        
        const reponse = await axios.post(`/admin/add_books`, params)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error.response;
        });
        return reponse;
    }
    async userBooksListing() {
        const data = localStorage.getItem("userId");
        const reponse = await axios.get(`admin/get_books/${data}`)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            console.log(error.response);
            return error.response;
          });
        return reponse;
      }


      async bookUpdate(data) {
          console.log("data",data)
          const id = localStorage.getItem("BookId");
          const reponse = await axios.post(`admin/update/${id}`,data)
          .then((response) => {
              return response;
          })
          .catch((error) => {
              return error.response;
          });

          return reponse;
      }

      async AddFaculty(params) {
        const reponse = await axios.post(`admin/add_faculty` ,params)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });

        return reponse;
    }

    async FacultyList() {
        const data = localStorage.getItem("userId");
        const reponse = await axios.get(`admin/get_faculty/${data}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });

        return reponse;
    }
      

}
export default new AuthRepository();