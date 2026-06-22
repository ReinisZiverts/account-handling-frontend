import { bootstrapApplication } from '@angular/platform-browser';
import { configuration } from './app/configuration';
import { AccountHandling } from './app/account-handling';
import {configureDayJs} from '../dayjs.config';

configureDayJs();

bootstrapApplication(AccountHandling, configuration)
  .catch((err) => console.error(err));
