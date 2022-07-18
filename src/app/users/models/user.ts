export interface Users {
  idUser: number;
  name: string;
  email: string;
  status: string;
}

export interface UserDTO extends Partial<Users> {}
