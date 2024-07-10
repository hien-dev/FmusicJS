import Realm from 'realm';

export default class SearchRealm extends Realm.Object {
  static schema = {
    name: 'SearchRealm',
    properties: {
      text: 'string',
      createDate: 'date',
    },
    primaryKey: 'text',
  };
}
