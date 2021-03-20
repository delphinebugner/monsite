class AppBackend {
  static cloudinaryControllerEntrypoint: string = 'cloud';

  static getUrlServeur(): string {
    return process.env.REACT_APP_SERVER_BASE_URL
      ? process.env.REACT_APP_SERVER_BASE_URL
      : 'http://localhost:5000';
  }

  static async testServeur(): Promise<void> {
    const response = await fetch(AppBackend.getUrlServeur());
    console.log('Statut de la connection au serveur : ', response.status);
  }
}

export default AppBackend;
