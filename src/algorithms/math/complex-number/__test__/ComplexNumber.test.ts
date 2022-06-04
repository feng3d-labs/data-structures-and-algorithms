import { deepEqual } from 'assert';
import { ComplexNumber } from '../ComplexNumber';

describe('ComplexNumber', () =>
{
  it('should create complex numbers', () =>
  {
    const complexNumber = new ComplexNumber({ re: 1, im: 2 });

    deepEqual(!!complexNumber, true);
    deepEqual(complexNumber.re, 1);
    deepEqual(complexNumber.im, 2);

    const defaultComplexNumber = new ComplexNumber();
    deepEqual(defaultComplexNumber.re, 0);
    deepEqual(defaultComplexNumber.im, 0);
  });

  it('should add complex numbers', () =>
  {
    const complexNumber1 = new ComplexNumber({ re: 1, im: 2 });
    const complexNumber2 = new ComplexNumber({ re: 3, im: 8 });

    const complexNumber3 = complexNumber1.add(complexNumber2);
    const complexNumber4 = complexNumber2.add(complexNumber1);

    deepEqual(complexNumber3.re, 1 + 3);
    deepEqual(complexNumber3.im, 2 + 8);

    deepEqual(complexNumber4.re, 1 + 3);
    deepEqual(complexNumber4.im, 2 + 8);
  });

  it('should add complex and natural numbers', () =>
  {
    const complexNumber = new ComplexNumber({ re: 1, im: 2 });
    const realNumber = new ComplexNumber({ re: 3 });

    const complexNumber3 = complexNumber.add(realNumber);
    const complexNumber4 = realNumber.add(complexNumber);
    const complexNumber5 = complexNumber.add(3);

    deepEqual(complexNumber3.re, 1 + 3);
    deepEqual(complexNumber3.im, 2);

    deepEqual(complexNumber4.re, 1 + 3);
    deepEqual(complexNumber4.im, 2);

    deepEqual(complexNumber5.re, 1 + 3);
    deepEqual(complexNumber5.im, 2);
  });

  it('should subtract complex numbers', () =>
  {
    const complexNumber1 = new ComplexNumber({ re: 1, im: 2 });
    const complexNumber2 = new ComplexNumber({ re: 3, im: 8 });

    const complexNumber3 = complexNumber1.subtract(complexNumber2);
    const complexNumber4 = complexNumber2.subtract(complexNumber1);

    deepEqual(complexNumber3.re, 1 - 3);
    deepEqual(complexNumber3.im, 2 - 8);

    deepEqual(complexNumber4.re, 3 - 1);
    deepEqual(complexNumber4.im, 8 - 2);
  });

  it('should subtract complex and natural numbers', () =>
  {
    const complexNumber = new ComplexNumber({ re: 1, im: 2 });
    const realNumber = new ComplexNumber({ re: 3 });

    const complexNumber3 = complexNumber.subtract(realNumber);
    const complexNumber4 = realNumber.subtract(complexNumber);
    const complexNumber5 = complexNumber.subtract(3);

    deepEqual(complexNumber3.re, 1 - 3);
    deepEqual(complexNumber3.im, 2);

    deepEqual(complexNumber4.re, 3 - 1);
    deepEqual(complexNumber4.im, -2);

    deepEqual(complexNumber5.re, 1 - 3);
    deepEqual(complexNumber5.im, 2);
  });

  it('should multiply complex numbers', () =>
  {
    const complexNumber1 = new ComplexNumber({ re: 3, im: 2 });
    const complexNumber2 = new ComplexNumber({ re: 1, im: 7 });

    const complexNumber3 = complexNumber1.multiply(complexNumber2);
    const complexNumber4 = complexNumber2.multiply(complexNumber1);
    const complexNumber5 = complexNumber1.multiply(5);

    deepEqual(complexNumber3.re, -11);
    deepEqual(complexNumber3.im, 23);

    deepEqual(complexNumber4.re, -11);
    deepEqual(complexNumber4.im, 23);

    deepEqual(complexNumber5.re, 15);
    deepEqual(complexNumber5.im, 10);
  });

  it('should multiply complex numbers by themselves', () =>
  {
    const complexNumber = new ComplexNumber({ re: 1, im: 1 });

    const result = complexNumber.multiply(complexNumber);

    deepEqual(result.re, 0);
    deepEqual(result.im, 2);
  });

  it('should calculate i in power of two', () =>
  {
    const complexNumber = new ComplexNumber({ re: 0, im: 1 });

    const result = complexNumber.multiply(complexNumber);

    deepEqual(result.re, -1);
    deepEqual(result.im, 0);
  });

  it('should divide complex numbers', () =>
  {
    const complexNumber1 = new ComplexNumber({ re: 2, im: 3 });
    const complexNumber2 = new ComplexNumber({ re: 4, im: -5 });

    const complexNumber3 = complexNumber1.divide(complexNumber2);
    const complexNumber4 = complexNumber1.divide(2);

    deepEqual(complexNumber3.re, -7 / 41);
    deepEqual(complexNumber3.im, 22 / 41);

    deepEqual(complexNumber4.re, 1);
    deepEqual(complexNumber4.im, 1.5);
  });

  it('should return complex number in polar form', () =>
  {
    const complexNumber1 = new ComplexNumber({ re: 3, im: 3 });
    deepEqual(complexNumber1.getPolarForm().radius, Math.sqrt((3 ** 2) + (3 ** 2)));
    deepEqual(complexNumber1.getPolarForm().phase, Math.PI / 4);
    deepEqual(complexNumber1.getPolarForm(false).phase, 45);

    const complexNumber2 = new ComplexNumber({ re: -3, im: 3 });
    deepEqual(complexNumber2.getPolarForm().radius, Math.sqrt((3 ** 2) + (3 ** 2)));
    deepEqual(complexNumber2.getPolarForm().phase, 3 * (Math.PI / 4));
    deepEqual(complexNumber2.getPolarForm(false).phase, 135);

    const complexNumber3 = new ComplexNumber({ re: -3, im: -3 });
    deepEqual(complexNumber3.getPolarForm().radius, Math.sqrt((3 ** 2) + (3 ** 2)));
    deepEqual(complexNumber3.getPolarForm().phase, -3 * (Math.PI / 4));
    deepEqual(complexNumber3.getPolarForm(false).phase, -135);

    const complexNumber4 = new ComplexNumber({ re: 3, im: -3 });
    deepEqual(complexNumber4.getPolarForm().radius, Math.sqrt((3 ** 2) + (3 ** 2)));
    deepEqual(complexNumber4.getPolarForm().phase, -1 * (Math.PI / 4));
    deepEqual(complexNumber4.getPolarForm(false).phase, -45);

    const complexNumber5 = new ComplexNumber({ re: 5, im: 7 });
    deepEqual(complexNumber5.getPolarForm().radius - 8.60 < 0.0001, true);
    deepEqual(complexNumber5.getPolarForm().phase - 0.95 < 0.0001, true);
    deepEqual(complexNumber5.getPolarForm(false).phase - 54.46 < 0.0001, true);

    const complexNumber6 = new ComplexNumber({ re: 0, im: 0.25 });
    deepEqual(complexNumber6.getPolarForm().radius - 0.25 < 0.0001, true);
    deepEqual(complexNumber6.getPolarForm().phase - 1.57 < 0.0001, true);
    deepEqual(complexNumber6.getPolarForm(false).phase - 90 < 0.0001, true);

    const complexNumber7 = new ComplexNumber({ re: 0, im: -0.25 });
    deepEqual(complexNumber7.getPolarForm().radius - 0.25 < 0.0001, true);
    deepEqual(complexNumber7.getPolarForm().phase - -1.57 < 0.0001, true);
    deepEqual(complexNumber7.getPolarForm(false).phase - -90 < 0.0001, true);

    const complexNumber8 = new ComplexNumber();
    deepEqual(complexNumber8.getPolarForm().radius - 0 < 0.0001, true);
    deepEqual(complexNumber8.getPolarForm().phase - 0 < 0.0001, true);
    deepEqual(complexNumber8.getPolarForm(false).phase - 0 < 0.0001, true);

    const complexNumber9 = new ComplexNumber({ re: -0.25, im: 0 });
    deepEqual(complexNumber9.getPolarForm().radius - 0.25 < 0.0001, true);
    deepEqual(complexNumber9.getPolarForm().phase - Math.PI < 0.0001, true);
    deepEqual(complexNumber9.getPolarForm(false).phase - 180 < 0.0001, true);

    const complexNumber10 = new ComplexNumber({ re: 0.25, im: 0 });
    deepEqual(complexNumber10.getPolarForm().radius - 0.25 < 0.0001, true);
    deepEqual(complexNumber10.getPolarForm().phase - 0 < 0.0001, true);
    deepEqual(complexNumber10.getPolarForm(false).phase - 0 < 0.0001, true);
  });
});
