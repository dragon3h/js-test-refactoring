import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('City Data Processing Test', () => {
  let consoleLogSpy;
  let originalLog;

  beforeEach(() => {
    // Save original console.log
    originalLog = console.log;
    // Create a spy to track console.log calls
    consoleLogSpy = vi.fn();
    console.log = consoleLogSpy;
  });

  afterEach(() => {
    // Restore original console.log
    console.log = originalLog;
    // Clear mocks
    vi.clearAllMocks();
  });

  it('should process city data correctly', async () => {
    // Import main.js which will execute the code
    await import('./main.js');

    // Verify number of rows printed
    expect(consoleLogSpy).toHaveBeenCalledTimes(9);

    // Check first row (should be Lagos with highest density)
    expect(consoleLogSpy.mock.calls[0][0]).toContain('Lagos');
    expect(consoleLogSpy.mock.calls[0][0]).toContain('100');

    // Check some middle rows
    expect(consoleLogSpy.mock.calls[1][0]).toContain('Delhi');
    expect(consoleLogSpy.mock.calls[2][0]).toContain('New York City');

    // Check last row (should be Istanbul with lowest density percentage)
    expect(consoleLogSpy.mock.calls[9][0]).toContain('Istanbul');
    expect(consoleLogSpy.mock.calls[9][0]).toContain('19');

    // Check formatting of a row to ensure proper alignment
    const expectedFormat = /^.{18}\s{10}\d+\s{8}\d+\s{8}\d+\s{18}[A-Za-z\s]+\s{6}\d+$/;
    expect(consoleLogSpy.mock.calls[0][0]).toMatch(expectedFormat);

    // Verify exact content of one row for precise testing
    expect(consoleLogSpy.mock.calls[0][0]).toBe('  Lagos           16060303   1171  13712             Nigeria  100');
  });
});
