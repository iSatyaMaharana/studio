import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

export class UserInMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
        {
            'id': 1,
            'firstName': 'Satya',
            'lastName': 'Maharana',
            'email': 'satya.maharana@outlook.com',
            'mobile': '9668708899',
            'password':'',
            'confirmPassword':''
        },
        {
            'id': 2,
            'firstName': 'Mukti',
            'lastName': 'Maharana',
            'email': 'mukti_mms@yahoo.co.in',
            'mobile': '8013415922',
            'password':'',
            'confirmPassword':''
        }
    ];
    return {users};
  }
}