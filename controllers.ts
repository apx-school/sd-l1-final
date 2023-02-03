import { type } from "os";
import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
class PelisController {
  constructor() { }
}
export { PelisController, Options };
