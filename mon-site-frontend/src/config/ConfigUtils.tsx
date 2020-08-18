class ConfigUtils {
  static getYearFromId(id :number) :number {
    return Math.floor(id / 10000 );
  }

  static getDateLabelFromId(id :number) :string {
    const year = ConfigUtils.getYearFromId(id);
    const month = Math.floor(( id % 10000 ) / 100) - 1 ; // month are from 0 to 11 in DateFormat
    const date = new Date(year, month);
    const s = date.toLocaleDateString('fr', {"year":"numeric", "month":"long"});
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

export default ConfigUtils;