import { Request } from 'express';
import { UserDoc } from 'src/users/interfaces/user.interface';

interface RequestWithUser extends Request {
  user: UserDoc;
}

export default RequestWithUser;
