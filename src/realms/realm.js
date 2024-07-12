import {createRealmContext} from '@realm/react';
import VideoRealm from 'realms/videoRealm';
import SearchRealm from 'realms/searchRealm';

const RealmContext = createRealmContext({
  schema: [VideoRealm, SearchRealm],
  schemaVersion: 2,
});

export default RealmContext;
