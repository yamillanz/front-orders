/** 
 * interface represents the users from the api
*/
export interface Users {
  idUser: number;
  name: string;
  email: string;
  status: string;
}
/** 
 * interface a partial from de users class base
*/
export interface UserDTO extends Partial<Users> {}
