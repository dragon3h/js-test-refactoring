import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('City Data Processing Test', () => {
  let consoleLogSpy;
  let originalLog;

  beforeEach(() => {
    originalLog = console.log;
    consoleLogSpy = vi.fn();
    console.log = consoleLogSpy;
  });

  afterEach(() => {
    console.log = originalLog;
    vi.clearAllMocks();
  });

  it('should process city data correctly', async () => {
    await import('./origin.js');

    // Verify number of rows printed (10 city rows)
    expect(consoleLogSpy).toHaveBeenCalledTimes(10);

    // Check Lagos (should be second row with highest density)
    expect(consoleLogSpy.mock.calls[1][0]).toContain('Lagos');
    expect(consoleLogSpy.mock.calls[1][0]).toContain('100');

    // Check some middle rows
    expect(consoleLogSpy.mock.calls[2][0]).toContain('Delhi');
    expect(consoleLogSpy.mock.calls[3][0]).toContain('New York City');

    // Check last row (should be Istanbul with lowest density percentage)
    expect(consoleLogSpy.mock.calls[9][0]).toContain('Istanbul');
    expect(consoleLogSpy.mock.calls[9][0]).toContain('19');

    // Verify exact content of one row for precise testing
    expect(consoleLogSpy.mock.calls[1][0]).toBe('  Lagos             16060303    1171   13712           Nigeria   100');
  });
});
