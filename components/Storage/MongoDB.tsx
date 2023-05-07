// import Realm from 'realm';
// import {createRealmContext} from '@realm/react';

// export class User extends Realm.Object<User> {
//   _id: number = 1;
//   name!: string;
//   useremail!: string;
//   username: string = 'My Name';
//   dailyReminder: boolean = false;
//   ranking: boolean = false;
//   darkMode: boolean = false;
//   autoBreak: boolean = false;
//   autoNext: boolean = false;
//   vibrate: boolean = false;
//   premium: boolean = false;
//   alarmWork: number = 1;
//   alarmBreak: number = 2;
//   pomodoroLength: number = 25;
//   breakShortLength: number = 5;
//   breakLongLength: number = 15;
//   breakAfterLongLength: number = 25;
//   breakAfter: number = 4;
//   defaultDoroStr: string = 'monkdoro';
//   defaultDoroInt: number = 1;
//   avatarType: number = 0;

//   static schema = {
//     name: 'User',
//     properties: {
//       _id: 'int',
//       useremail: 'string',
//       username: {type: 'string', default: 'My Name'},
//       dailyReminder: {type: 'bool', default: false},
//       ranking: {type: 'bool', default: false},
//       darkMode: {type: 'bool', default: false},
//       autoBreak: {type: 'bool', default: false},
//       autoNext: {type: 'bool', default: false},
//       vibrate: {type: 'bool', default: false},
//       premium: {type: 'bool', default: false},
//       alarmWork: {type: 'int', default: 1},
//       alarmBreak: {type: 'int', default: 2},
//       pomodoroLength: {type: 'int', default: 25},
//       breakShortLength: {type: 'int', default: 5},
//       breakLongLength: {type: 'int', default: 15},
//       breakAfterLongLength: {type: 'int', default: 25},
//       breakAfter: {type: 'int', default: 4},
//       defaultDoroStr: {type: 'string', default: 'monkdoro'},
//       defaultDoroInt: {type: 'int', default: 1},
//       avatarType: {type: 'int', default: 0},
//     },
//     primaryKey: '_id',
//   };
// }

// export const realmUserConfig: Realm.Configuration = {
//   schema: [User],
//   schemaVersion: 1
// };

// const {RealmProvider, useRealm, useObject, useQuery} = 
// createRealmContext(realmUserConfig);

// export const UserRealmContext = createRealmContext({
//   schema: [User],
//   schemaVersion: 1
// })


