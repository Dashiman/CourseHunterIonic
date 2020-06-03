import { TakenOffer, JobOffer } from "./jobOffer";
import { Users } from './users';

export class ProfileData {
  public takenByUser: TakenOffer[];
  public addedByUser: JobOffer[];
  public addandTaken: TakenOffer[]
  public editingProfile:boolean;
  public user: Users;
}