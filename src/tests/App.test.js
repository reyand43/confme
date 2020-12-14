import React from 'react'
import { numberValidator } from '../helpers/validators';

describe('editProfile testing', () => {
  test('validates a correct age', () => {
    const age = '21';
    expect(numberValidator(age)).toBe(true);
  });
  test('validates an incorrect age', () => {
    const age = 'rrr';
    expect(()=>numberValidator(age)).toBe(false);
  });
  test('validates an incorrect age', () => {
    const age = 'rrr';
    expect(()=>numberValidator(age)).toBe(false);
  });

})
  

