import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * App main controller
 *
 * @export
 * @class AppController
 * @typedef {AppController}
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // Nothing here
}
