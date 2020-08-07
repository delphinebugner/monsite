
export class AppBackend {

  static cloudinaryControllerEntrypoint :string = "cloud";

  static getUrlServeur() :string {
    return  process.env.REACT_APP_SERVER_BASE_URL ? process.env.REACT_APP_SERVER_BASE_URL : "http://localhost:5000";
  };

  static async testServeur() :Promise<void> {
    const response = await fetch(AppBackend.getUrlServeur());
    console.log("Statut de la connection au serveur : ", response.status) ;
  }

  static async getUrlImage(name :string) :Promise<string>{
    const response = await fetch(process.env.REACT_APP_SERVER_BASE_URL + "/" + AppBackend.cloudinaryControllerEntrypoint + "/");
    return await response.text();
  }

}

// AppBackend.urlServeur() :string {
//   return  process.env.REACT_APP_SERVER_BASE_URL ? process.env.REACT_APP_SERVER_BASE_URL : "http://localhost:5000";
// }

// const response = await fetch(process.env.REACT_APP_SERVER_BASE_URL + "/test");
// const data = await response.text();

// AppBackend.testBackend = async () => {
//   const response = await fetch(AppBackend.urlServeur());
//   return response.status === 200;
// }

export default AppBackend;