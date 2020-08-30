class AppBackend {

  static cloudinaryControllerEntrypoint :string = "cloud";

  static getUrlServeur() :string {
    return  process.env.REACT_APP_SERVER_BASE_URL ? process.env.REACT_APP_SERVER_BASE_URL : "http://localhost:5000";
  };

  static async testServeur() :Promise<void> {
    const response = await fetch(AppBackend.getUrlServeur());
    console.log("Statut de la connection au serveur : ", response.status) ;
  }

  static async getUrl(src :string, size :number, isSquared = false, isHeight= false) :Promise<string> {
    let path = process.env.REACT_APP_SERVER_BASE_URL + "/" + AppBackend.cloudinaryControllerEntrypoint + "/url/" + src;
    path += isSquared ? "" : (isHeight ? "/height" : "/width");
    path += size > 0 ? "/" + size : "";
    console.log(path);
    const response = await fetch(path);
    return await response.text();
    // const testUrlResponse = await fetch(url);
    // return testUrlResponse.status === 200 ? url : "NOT_FOUND";
  }

  static async getUrlFullSize(src :string) :Promise<{ src: string, url: string }> {
    const url :string = await AppBackend.getUrl(src, -1);
    return { src, url };
  }

  static async getUrlSquared(src :string, size :number) :Promise<{ src: string, url: string }>{
    const url :string = await AppBackend.getUrl(src, size, true);
    return {src, url};
  }

  static async getUrlFixedHeight(src :string, size :number) :Promise<{ src: string, url: string }>{
    const url :string = await AppBackend.getUrl(src, size, false, true);
    return {src, url};
  }

  static async getUrlFixedWidth(src :string, size :number) :Promise<{ src: string, url: string }>{
    const url :string = await AppBackend.getUrl(src, size, false, false);
    return {src, url};
  }
}

export default AppBackend;