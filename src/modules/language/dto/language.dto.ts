import { IsNotEmpty } from 'class-validator';

export class LanguageDTO {
  @IsNotEmpty()
  name: string;
}
