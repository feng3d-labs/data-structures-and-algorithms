import { deepEqual } from 'assert';
import { ComplexNumber } from '../../complex-number/ComplexNumber';

export const fourierTestCases = [
  {
    input: [
      { amplitude: 1 },
    ],
    output: [
      {
        frequency: 0, amplitude: 1, phase: 0, re: 1, im: 0,
      },
    ],
  },
  {
    input: [
      { amplitude: 1 },
      { amplitude: 0 },
    ],
    output: [
      {
        frequency: 0, amplitude: 0.5, phase: 0, re: 0.5, im: 0,
      },
      {
        frequency: 1, amplitude: 0.5, phase: 0, re: 0.5, im: 0,
      },
    ],
  },
  {
    input: [
      { amplitude: 2 },
      { amplitude: 0 },
    ],
    output: [
      {
        frequency: 0, amplitude: 1, phase: 0, re: 1, im: 0,
      },
      {
        frequency: 1, amplitude: 1, phase: 0, re: 1, im: 0,
      },
    ],
  },
  {
    input: [
      { amplitude: 1 },
      { amplitude: 0 },
      { amplitude: 0 },
    ],
    output: [
      {
        frequency: 0, amplitude: 0.33333, phase: 0, re: 0.33333, im: 0,
      },
      {
        frequency: 1, amplitude: 0.33333, phase: 0, re: 0.33333, im: 0,
      },
      {
        frequency: 2, amplitude: 0.33333, phase: 0, re: 0.33333, im: 0,
      },
    ],
  },
  {
    input: [
      { amplitude: 1 },
      { amplitude: 0 },
      { amplitude: 0 },
      { amplitude: 0 },
    ],
    output: [
      {
        frequency: 0, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
      },
      {
        frequency: 1, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
      },
      {
        frequency: 2, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
      },
      {
        frequency: 3, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
      },
    ],
  },
  {
    input: [
      { amplitude: 0 },
      { amplitude: 1 },
      { amplitude: 0 },
      { amplitude: 0 },
    ],
    output: [
      {
        frequency: 0, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
      },
      {
        frequency: 1, amplitude: 0.25, phase: -90, re: 0, im: -0.25,
      },
      {
        frequency: 2, amplitude: 0.25, phase: 180, re: -0.25, im: 0,
      },
      {
        frequency: 3, amplitude: 0.25, phase: 90, re: 0, im: 0.25,
      },
    ],
  },
  {
    input: [
      { amplitude: 0 },
      { amplitude: 0 },
      { amplitude: 1 },
      { amplitude: 0 },
    ],
    output: [
      {
        frequency: 0, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
      },
      {
        frequency: 1, amplitude: 0.25, phase: 180, re: -0.25, im: 0,
      },
      {
        frequency: 2, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
      },
      {
        frequency: 3, amplitude: 0.25, phase: 180, re: -0.25, im: 0,
      },
    ],
  },
  {
    input: [
      { amplitude: 0 },
      { amplitude: 0 },
      { amplitude: 0 },
      { amplitude: 2 },
    ],
    output: [
      {
        frequency: 0, amplitude: 0.5, phase: 0, re: 0.5, im: 0,
      },
      {
        frequency: 1, amplitude: 0.5, phase: 90, re: 0, im: 0.5,
      },
      {
        frequency: 2, amplitude: 0.5, phase: 180, re: -0.5, im: 0,
      },
      {
        frequency: 3, amplitude: 0.5, phase: -90, re: 0, im: -0.5,
      },
    ],
  },
  {
    input: [
      { amplitude: 0 },
      { amplitude: 1 },
      { amplitude: 0 },
      { amplitude: 2 },
    ],
    output: [
      {
        frequency: 0, amplitude: 0.75, phase: 0, re: 0.75, im: 0,
      },
      {
        frequency: 1, amplitude: 0.25, phase: 90, re: 0, im: 0.25,
      },
      {
        frequency: 2, amplitude: 0.75, phase: 180, re: -0.75, im: 0,
      },
      {
        frequency: 3, amplitude: 0.25, phase: -90, re: 0, im: -0.25,
      },
    ],
  },
  {
    input: [
      { amplitude: 4 },
      { amplitude: 1 },
      { amplitude: 0 },
      { amplitude: 2 },
    ],
    output: [
      {
        frequency: 0, amplitude: 1.75, phase: 0, re: 1.75, im: 0,
      },
      {
        frequency: 1, amplitude: 1.03077, phase: 14.03624, re: 0.99999, im: 0.25,
      },
      {
        frequency: 2, amplitude: 0.25, phase: 0, re: 0.25, im: 0,
      },
      {
        frequency: 3, amplitude: 1.03077, phase: -14.03624, re: 1, im: -0.25,
      },
    ],
  },
  {
    input: [
      { amplitude: 4 },
      { amplitude: 1 },
      { amplitude: -3 },
      { amplitude: 2 },
    ],
    output: [
      {
        frequency: 0, amplitude: 1, phase: 0, re: 1, im: 0,
      },
      {
        frequency: 1, amplitude: 1.76776, phase: 8.13010, re: 1.75, im: 0.25,
      },
      {
        frequency: 2, amplitude: 0.5, phase: 180, re: -0.5, im: 0,
      },
      {
        frequency: 3, amplitude: 1.76776, phase: -8.13010, re: 1.75, im: -0.24999,
      },
    ],
  },
  {
    input: [
      { amplitude: 1 },
      { amplitude: 2 },
      { amplitude: 3 },
      { amplitude: 4 },
    ],
    output: [
      {
        frequency: 0, amplitude: 2.5, phase: 0, re: 2.5, im: 0,
      },
      {
        frequency: 1, amplitude: 0.70710, phase: 135, re: -0.5, im: 0.49999,
      },
      {
        frequency: 2, amplitude: 0.5, phase: 180, re: -0.5, im: 0,
      },
      {
        frequency: 3, amplitude: 0.70710, phase: -134.99999, re: -0.49999, im: -0.5,
      },
    ],
  },
];

export class FourierTester
{
  /**
   * @param fourierTransform
   */
  static testDirectFourierTransform(fourierTransform: (n: number[]) => ComplexNumber[])
  {
    fourierTestCases.forEach((testCase) =>
    {
      const { input, output: deepEqualedOutput } = testCase;

      // Try to split input signal into sequence of pure sinusoids.
      const formattedInput = input.map((sample) => sample.amplitude);
      const currentOutput = fourierTransform(formattedInput);

      // Check the signal has been split into proper amount of sub-signals.
      deepEqual(currentOutput.length >= formattedInput.length, true);

      // Now go through all the signals and check their frequency, amplitude and phase.
      deepEqualedOutput.forEach((deepEqualedSignal, frequency) =>
      {
        // Get template data we want to test against.
        const currentSignal = currentOutput[frequency];
        const currentPolarSignal = currentSignal.getPolarForm(false);

        // Check all signal parameters.
        deepEqual(frequency, deepEqualedSignal.frequency);
        deepEqual(currentSignal.re - deepEqualedSignal.re < 0.0001, true);
        deepEqual(currentSignal.im - deepEqualedSignal.im < 0.0001, true);
        deepEqual(currentPolarSignal.phase - deepEqualedSignal.phase < 0.0001, true);
        deepEqual(currentPolarSignal.radius - deepEqualedSignal.amplitude < 0.0001, true);
      });
    });
  }

  /**
   * @param inverseFourierTransform
   */
  static testInverseFourierTransform(inverseFourierTransform: (n: ComplexNumber[]) => number[])
  {
    fourierTestCases.forEach((testCase) =>
    {
      const { input: deepEqualedOutput, output: inputFrequencies } = testCase;

      // Try to join frequencies into time signal.
      const formattedInput = inputFrequencies.map((frequency) =>
        new ComplexNumber({ re: frequency.re, im: frequency.im }));
      const currentOutput = inverseFourierTransform(formattedInput);

      // Check the signal has been combined of proper amount of time samples.
      deepEqual(currentOutput.length <= formattedInput.length, true);

      // Now go through all the amplitudes and check their values.
      deepEqualedOutput.forEach((deepEqualedAmplitudes, timer) =>
      {
        // Get template data we want to test against.
        const currentAmplitude = currentOutput[timer];

        // Check if current amplitude is close enough to the calculated one.
        deepEqual(currentAmplitude - deepEqualedAmplitudes.amplitude < 0.0001, true);
      });
    });
  }
}
