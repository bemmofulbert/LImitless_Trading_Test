import IUser from '../interfaces/user';

export default class User implements IUser {
  id!: number;
  username = 'unknown';
  photo = 'assets/person.png';

  constructor(options: any = null) {
    if (options != null) {
      this.id = options.id;
      this.username = options.username;
      this.photo = options.photo;
    }
  }

  copy() {
    return Object.assign(new User(), this);
  }
  static fromJson(userJson: IUser): User {
    return Object.assign(new User(), userJson);
  }
  toJson(): IUser {
    const userJson: IUser = Object.assign({}, this);
    delete userJson.id;
    return userJson;
  }
}
