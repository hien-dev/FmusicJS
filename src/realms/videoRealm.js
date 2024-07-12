import Realm from 'realm';

export default class VideoRealm extends Realm.Object {
  static schema = {
    name: 'VideoRealm',
    properties: {
      videoId: 'string',
      title: 'string',
      poster: 'mixed',
      favourite: {type: 'bool', default: false},
      createDate: {type: 'date', default: new Date()},
    },
    primaryKey: 'videoId',
  };
}
