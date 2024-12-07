// @angular-package/type.
import { NumberBetween, StringOfLength } from '@angular-package/type';
/**
 * 
 */
export class Random {
  public number = <Max extends number>(
    max: Max
  ): NumberBetween<0, Max> => Math.floor(Math.random() * max);

  public string = <Length extends number>(
    length: Length,
    chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  ): StringOfLength<0, Length>  => {
    let randomStringOfLength = '';
    for (let i = 0; i <= length; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      randomStringOfLength += chars.substring(randomNumber, randomNumber + 1);
    }
    return randomStringOfLength.slice(0, -1);
  };
}
